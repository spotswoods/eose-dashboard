# Renders the daily Open Graph share card (1200x630 PNG) for eosesource.com.
# Called by scripts/prerender-note.js (via the pre-commit hook) whenever the
# morning note changes, so links shared to Discord/X/Stocktwits unfurl with
# the day's headline instead of a static logo.
#
# Usage: powershell -File render-og-card.ps1 -InputJson <path> -OutPng <path>
# InputJson: { "headline": "...", "dateline": "...", "priceline": "..." }
param(
  [Parameter(Mandatory = $true)][string]$InputJson,
  [Parameter(Mandatory = $true)][string]$OutPng
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$data = Get-Content -Raw -Encoding UTF8 $InputJson | ConvertFrom-Json

$w = 1200; $h = 630
$bmp = New-Object System.Drawing.Bitmap($w, $h)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias

# Palette — mirrors the dark theme in css/styles.css
$bg      = [System.Drawing.ColorTranslator]::FromHtml('#02130E')
$bgCard  = [System.Drawing.ColorTranslator]::FromHtml('#061F18')
$accent  = [System.Drawing.ColorTranslator]::FromHtml('#84D414')
$fg0     = [System.Drawing.ColorTranslator]::FromHtml('#ECF6E0')
$fg2     = [System.Drawing.ColorTranslator]::FromHtml('#8FA585')
$fg3     = [System.Drawing.ColorTranslator]::FromHtml('#5F7359')

$g.Clear($bg)

# Subtle card panel + accent bar
$g.FillRectangle((New-Object System.Drawing.SolidBrush($bgCard)), 36, 36, $w - 72, $h - 72)
$g.FillRectangle((New-Object System.Drawing.SolidBrush($accent)), 36, 36, 10, $h - 72)

$brushAccent = New-Object System.Drawing.SolidBrush($accent)
$brushFg0    = New-Object System.Drawing.SolidBrush($fg0)
$brushFg2    = New-Object System.Drawing.SolidBrush($fg2)
$brushFg3    = New-Object System.Drawing.SolidBrush($fg3)

$fEyebrow  = New-Object System.Drawing.Font('Segoe UI', 21, [System.Drawing.FontStyle]::Bold)
$fHeadline = New-Object System.Drawing.Font('Segoe UI', 44, [System.Drawing.FontStyle]::Bold)
$fMeta     = New-Object System.Drawing.Font('Segoe UI', 24, [System.Drawing.FontStyle]::Regular)
$fFoot     = New-Object System.Drawing.Font('Segoe UI', 18, [System.Drawing.FontStyle]::Regular)

# [char]0xB7 = "middle dot"; kept out of string literals so the script stays
# pure ASCII (PowerShell 5.1 reads BOM-less files as ANSI and mangles UTF-8).
$dot = [string][char]0xB7
$g.DrawString(("EOSE {0} DAILY INVESTOR NOTE {0} EOSESOURCE.COM" -f $dot), $fEyebrow, $brushAccent, 84, 76)

# Headline wraps inside a layout rectangle
$rect = New-Object System.Drawing.RectangleF(84, 140, ($w - 180), 330)
$g.DrawString([string]$data.headline, $fHeadline, $brushFg0, $rect)

if ($data.priceline) { $g.DrawString([string]$data.priceline, $fMeta, $brushFg2, 84, 488) }
if ($data.dateline)  { $g.DrawString([string]$data.dateline,  $fMeta, $brushFg2, 84, 528) }
$g.DrawString(("Independent research {0} linked to primary SEC sources {0} not investment advice" -f $dot), $fFoot, $brushFg3, 84, 576)

$g.Dispose()
$bmp.Save($OutPng, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Output "og card written: $OutPng"
