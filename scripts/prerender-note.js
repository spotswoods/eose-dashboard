#!/usr/bin/env node
// Pre-renders the morning note from js/data.js into static HTML so crawlers
// (and no-JS readers) see the freshest content without executing JavaScript.
//
// What it rewrites, all derived from window.EOSE_DATA.morningNote:
//   index.html   — the block between <!-- mn:static:begin --> / <!-- mn:static:end -->
//                  inside #daily-note, the hero <time data-dash-updated> date,
//                  the article:modified_time meta, and the JSON-LD dateModified
//   sitemap.xml  — <lastmod> for the https://eosesource.com/ entry
//
// Invoked by the local .git/hooks/pre-commit hook on every commit; it is
// idempotent and prints the names of any files it changed (nothing if none),
// which the hook uses to decide whether to `git add` the results.
//
// app.js renders the same [data-mn-*] nodes from js/data.js on load, so the
// static snapshot and the live render can never disagree for JS users.

'use strict';

const fs = require('fs');
const os = require('os');
const cp = require('child_process');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');

function readData() {
  const src = fs.readFileSync(path.join(ROOT, 'js', 'data.js'), 'utf8');
  const sandbox = { window: {} };
  vm.runInNewContext(src, sandbox, { filename: 'js/data.js' });
  return sandbox.window.EOSE_DATA || {};
}

const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function stockholmStamp(iso) {
  try {
    const d = new Date(iso);
    if (isNaN(d)) return iso || '';
    // Mirrors app.js: sv-SE locale, Europe/Stockholm, 24h
    return d.toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm', hour12: false }) + ' (Stockholm)';
  } catch (e) { return iso || ''; }
}

function longDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function buildNoteHtml(mn) {
  const sessionLabel = mn.session === 'post-close' ? 'Post-close run · US session wrap'
    : mn.session === 'pre-open' ? 'Pre-open run · overnight setup'
    : (mn.session || '');

  const p = mn.price || {};
  let priceHtml = '';
  if (p.last != null) {
    const pct = p.changePct != null
      ? `${p.changePct >= 0 ? '+' : ''}${Number(p.changePct).toFixed(2)}%` : '';
    const cls = p.changePct >= 0 ? 'pos' : 'neg';
    priceHtml = `<b>$${Number(p.last).toFixed(2)}</b> <span class="${cls}">${pct}</span>` +
      (p.note ? ` · <span style="color:var(--fg-3)">${esc(p.note)}</span>` : '');
  } else if (p.note) {
    priceHtml = esc(p.note);
  }

  // Bullets are inserted as raw HTML to match app.js (innerHTML), so authored
  // markup like <b> keeps working in both the static and the live render.
  const bullets = (mn.bullets || []).map((b) => `<li>${b}</li>`).join('\n          ');

  const sources = (mn.sources || [])
    .map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:underline">${esc(s.label)}</a>`)
    .join(' · ');

  return `
      <div class="section__head">
        <div>
          <div class="section__num">00 · DAILY NOTE · AUTO-REFRESHED TWICE DAILY</div>
          <h2 data-mn-headline>${esc(mn.headline)}</h2>
          <p><span data-mn-session>${esc(sessionLabel)}</span> · <a href="notes.html" style="color:var(--accent);text-decoration:underline">📚 Past notes</a> · <a href="note-feed.xml" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:underline">🔖 Subscribe via RSS</a></p>
        </div>
        <div class="right" data-mn-meta style="font-size:12px;color:var(--fg-3)">Updated ${esc(stockholmStamp(mn.updatedAt))}</div>
      </div>
      <div class="card" style="border-left:3px solid var(--accent)">
        <p style="font-size:14.5px;line-height:1.65;color:var(--fg-0);margin:0 0 8px" data-mn-takeaway>${esc(mn.takeaway)}</p>
        <div class="mn-price" data-mn-price style="font-size:13px;color:var(--fg-2);margin:0 0 12px">${priceHtml}</div>
        <ul data-mn-bullets style="padding-left:18px;font-size:13.5px;line-height:1.65;color:var(--fg-1);margin:0;display:grid;gap:8px">
          ${bullets}
        </ul>
        <p data-mn-sources style="font-size:12px;color:var(--fg-3);margin-top:14px;border-top:1px solid var(--line-1);padding-top:10px">${sources ? 'Sources: ' + sources : ''}</p>
      </div>
      `;
}

function priceLine(mn) {
  const p = mn.price || {};
  if (p.last == null) return '';
  const pct = p.changePct != null
    ? ` · ${p.changePct >= 0 ? '+' : ''}${Number(p.changePct).toFixed(2)}%` : '';
  return `$${Number(p.last).toFixed(2)}${pct}`;
}

const xmlEsc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Stable per-note anchor shared by notes.html and the RSS item links,
// e.g. 'note-2026-06-11T2250'.
function noteAnchor(n) {
  return 'note-' + String(n.updatedAt).slice(0, 16).replace(/:/g, '');
}

function notePriceHtml(n) {
  const p = n.price || {};
  if (p.last == null) return p.note ? esc(p.note) : '';
  const pct = p.changePct != null
    ? `${p.changePct >= 0 ? '+' : ''}${Number(p.changePct).toFixed(2)}%` : '';
  const cls = p.changePct >= 0 ? 'pos' : 'neg';
  return `<b>$${Number(p.last).toFixed(2)}</b> <span class="${cls}">${pct}</span>` +
    (p.note ? ` · <span style="color:var(--fg-3)">${esc(p.note)}</span>` : '');
}

// Static archive page (notes.html) — fully pre-rendered from the rolling
// archive so crawlers and no-JS readers get every past note. Deterministic
// for a given archive, so reruns stay idempotent.
function buildArchivePage(archive) {
  const newest = archive.length ? archive[0].updatedAt : '';
  const cards = archive.map((n) => {
    const sess = n.session === 'post-close' ? 'Post-close run · US session wrap'
      : n.session === 'pre-open' ? 'Pre-open run · overnight setup' : (n.session || '');
    const bullets = (n.bullets || []).map((b) => `<li>${b}</li>`).join('\n          ');
    const price = notePriceHtml(n);
    return `
      <article class="card" id="${noteAnchor(n)}" style="margin-bottom:14px;border-left:3px solid var(--accent)">
        <div style="font-size:11.5px;color:var(--fg-3);text-transform:uppercase;letter-spacing:.08em;font-weight:700">${esc(stockholmStamp(n.updatedAt))} · ${esc(sess)}</div>
        <h2 style="font-size:18px;line-height:1.35;margin:8px 0 10px">${esc(n.headline)}</h2>
        <p style="font-size:14px;line-height:1.6;color:var(--fg-0);margin:0">${esc(n.takeaway)}</p>
        ${price ? `<div class="mn-price" style="font-size:13px;color:var(--fg-2);margin:10px 0 0">${price}</div>` : ''}
        <ul style="padding-left:18px;font-size:13.5px;line-height:1.65;color:var(--fg-1);margin:12px 0 0;display:grid;gap:8px">
          ${bullets}
        </ul>
      </article>`;
  }).join('\n');

  return `<!doctype html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>EOSE Daily Note Archive — Independent Investor Notes</title>
  <meta name="description" content="Archive of the twice-daily independent Eos Energy (EOSE) investor note: price action, SEC filings, catalysts and rights-offering coverage." />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <meta name="author" content="spotswoods (independent investor research)" />
  <link rel="canonical" href="https://eosesource.com/notes.html" />
  <meta name="theme-color" content="#02130E" />
  <link rel="icon" type="image/png" href="assets/eose-logo.png" />
  <link rel="alternate" type="application/rss+xml" title="EOSE Daily Investor Note — eosesource.com" href="note-feed.xml" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="EOSE Daily Note Archive — Independent Investor Notes" />
  <meta property="og:url" content="https://eosesource.com/notes.html" />
  <meta property="og:image" content="https://eosesource.com/assets/og-daily.png" />
  <meta property="article:modified_time" content="${esc(newest)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="EOSE Daily Note Archive — Independent Investor Notes" />
  <meta name="twitter:image" content="https://eosesource.com/assets/og-daily.png" />
  <script type="application/ld+json">
${JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Blog',
      '@id': 'https://eosesource.com/notes.html#blog',
      name: 'EOSE Daily Investor Note',
      description: 'Twice-daily independent Eos Energy (EOSE) market note: price action, SEC filings, catalysts.',
      url: 'https://eosesource.com/notes.html',
      inLanguage: 'en',
      dateModified: newest,
      author: { '@type': 'Person', name: 'spotswoods' },
      blogPost: archive.slice(0, 25).map((n) => ({
        '@type': 'BlogPosting',
        headline: n.headline,
        description: n.takeaway,
        datePublished: n.updatedAt,
        dateModified: n.updatedAt,
        url: `https://eosesource.com/notes.html#${noteAnchor(n)}`,
        author: { '@type': 'Person', name: 'spotswoods' },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'EOSE Investor Dashboard', item: 'https://eosesource.com/' },
        { '@type': 'ListItem', position: 2, name: 'Daily Note Archive', item: 'https://eosesource.com/notes.html' },
      ],
    },
  ],
}, null, 2)}
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" media="print" onload="this.media='all'" />
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" /></noscript>
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body>
  <main class="shell" style="max-width:880px;margin:0 auto;padding-top:28px">
    <section class="section">
      <div class="section__head">
        <div>
          <div class="section__num">EOSESOURCE.COM · DAILY NOTE ARCHIVE</div>
          <h1 style="font-size:clamp(24px,3vw,32px);letter-spacing:-0.02em;line-height:1.15;margin:6px 0 10px">EOSE Daily Investor Note — Archive</h1>
          <p style="max-width:640px">The last ${archive.length} editions of the twice-daily note from the <a href="./" style="color:var(--accent);text-decoration:underline">EOSE investor dashboard</a>, newest first. Auto-refreshed pre-open and post-close on US trading days. <a href="note-feed.xml" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:underline">🔖 Subscribe via RSS</a>. Independent research — <strong>not investment advice</strong>; verify against primary SEC sources linked on the dashboard.</p>
        </div>
      </div>
${cards}
      <p style="font-size:12.5px;color:var(--fg-3);margin-top:18px">© 2026 EOSE Investor Dashboard · <a href="./" style="color:var(--accent);text-decoration:underline">Back to the dashboard</a> · Questions &amp; corrections: <a href="mailto:info@eosesource.com" style="color:var(--accent)">info@eosesource.com</a></p>
    </section>
  </main>

  <!-- Cloudflare Web Analytics (cookieless, deferred) -->
  <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "7f21e028bb474554a12d8c8472c9cdb2"}'></script>
</body>
</html>
`;
}

// RSS 2.0 feed of the rolling note archive. Deterministic for a given
// archive (no wall-clock timestamps) so reruns stay idempotent.
function buildRss(archive) {
  const items = archive.map((n) => {
    const sess = n.session === 'post-close' ? 'Post-close' : n.session === 'pre-open' ? 'Pre-open' : '';
    const bullets = (n.bullets || []).map((b) => `<li>${b}</li>`).join('');
    const html = `<p>${n.takeaway || ''}</p>${bullets ? `<ul>${bullets}</ul>` : ''}<p><a href="https://eosesource.com/#daily-note">Full dashboard →</a></p>`;
    return [
      '    <item>',
      `      <title>${xmlEsc((sess ? sess + ': ' : '') + n.headline)}</title>`,
      `      <link>https://eosesource.com/notes.html#${noteAnchor(n)}</link>`,
      `      <guid isPermaLink="false">eose-note-${xmlEsc(n.updatedAt)}</guid>`,
      `      <pubDate>${new Date(n.updatedAt).toUTCString()}</pubDate>`,
      `      <description>${xmlEsc(html)}</description>`,
      '    </item>'
    ].join('\n');
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>EOSE Daily Investor Note — eosesource.com</title>
    <link>https://eosesource.com/#daily-note</link>
    <atom:link href="https://eosesource.com/note-feed.xml" rel="self" type="application/rss+xml"/>
    <description>Twice-daily independent EOSE market note: price action, filings, catalysts. Not investment advice.</description>
    <language>en-us</language>
    <lastBuildDate>${archive.length ? new Date(archive[0].updatedAt).toUTCString() : ''}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}

// Renders assets/og-daily.png via System.Drawing (Windows-only; the note is
// only ever refreshed on this machine). Failure is non-fatal — the page just
// keeps the previous card.
function renderOgCard(mn) {
  if (process.platform !== 'win32') return false;
  const outPng = path.join(ROOT, 'assets', 'og-daily.png');
  const tmp = path.join(os.tmpdir(), 'eose-og-input.json');
  const dateline = (() => {
    try {
      const d = new Date(mn.updatedAt);
      const sess = mn.session === 'post-close' ? 'post-close' : mn.session === 'pre-open' ? 'pre-open' : '';
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) + (sess ? ` · ${sess} note` : '');
    } catch (e) { return ''; }
  })();
  fs.writeFileSync(tmp, JSON.stringify({
    headline: mn.headline || '',
    priceline: priceLine(mn),
    dateline
  }));
  try {
    cp.execFileSync('powershell.exe', [
      '-NoProfile', '-ExecutionPolicy', 'Bypass',
      '-File', path.join(ROOT, 'scripts', 'render-og-card.ps1'),
      '-InputJson', tmp, '-OutPng', outPng
    ], { stdio: ['ignore', 'ignore', 'pipe'], timeout: 30000 });
    return fs.existsSync(outPng);
  } catch (e) {
    console.error('prerender-note: og card render failed — ' + (e.message || e));
    return false;
  }
}

function replaceOnce(haystack, regex, replacement, what, file) {
  if (!regex.test(haystack)) {
    console.error(`prerender-note: could not find ${what} in ${file} — skipped`);
    return haystack;
  }
  return haystack.replace(regex, replacement);
}

function main() {
  const mn = readData().morningNote;
  if (!mn || !mn.updatedAt) return; // nothing to render

  const isoDate = new Date(mn.updatedAt).toISOString().slice(0, 10);
  const isoInstant = new Date(mn.updatedAt).toISOString();
  const changed = [];

  // ---- rolling note archive (data/note-archive.json, newest first) ----
  const archPath = path.join(ROOT, 'data', 'note-archive.json');
  let archive = [];
  try { archive = JSON.parse(fs.readFileSync(archPath, 'utf8')); } catch (e) { /* first run */ }
  const noteChanged = !archive.length || archive[0].updatedAt !== mn.updatedAt;
  if (noteChanged) {
    archive.unshift({
      updatedAt: mn.updatedAt, session: mn.session || '',
      headline: mn.headline || '', takeaway: mn.takeaway || '',
      bullets: mn.bullets || [], price: mn.price || null
    });
    archive = archive.slice(0, 30);
    fs.writeFileSync(archPath, JSON.stringify(archive, null, 1) + '\n');
    changed.push('data/note-archive.json');
  }

  // ---- RSS feed of the archive (note-feed.xml) ----
  const rssPath = path.join(ROOT, 'note-feed.xml');
  const rss = buildRss(archive);
  const rssBefore = fs.existsSync(rssPath) ? fs.readFileSync(rssPath, 'utf8') : '';
  if (rss !== rssBefore) {
    fs.writeFileSync(rssPath, rss);
    changed.push('note-feed.xml');
  }

  // ---- static archive page (notes.html) ----
  const notesPath = path.join(ROOT, 'notes.html');
  const notesHtml = buildArchivePage(archive);
  const notesBefore = fs.existsSync(notesPath) ? fs.readFileSync(notesPath, 'utf8') : '';
  if (notesHtml !== notesBefore) {
    fs.writeFileSync(notesPath, notesHtml);
    changed.push('notes.html');
  }

  // ---- daily share card (assets/og-daily.png) ----
  const ogPng = path.join(ROOT, 'assets', 'og-daily.png');
  if (noteChanged || !fs.existsSync(ogPng)) {
    if (renderOgCard(mn)) changed.push('assets/og-daily.png');
  }
  const haveCard = fs.existsSync(ogPng);

  // ---- index.html ----
  const idxPath = path.join(ROOT, 'index.html');
  const idxBefore = fs.readFileSync(idxPath, 'utf8');
  let idx = idxBefore;

  idx = replaceOnce(idx,
    /(<!-- mn:static:begin[^>]*?-->)[\s\S]*?(<!-- mn:static:end -->)/,
    (_, a, b) => a + buildNoteHtml(mn) + b,
    'mn:static markers', 'index.html');

  idx = replaceOnce(idx,
    /(<time datetime=")[^"]*(" itemprop="dateModified" data-dash-updated>)[^<]*(<\/time>)/,
    `$1${isoDate}$2${longDate(mn.updatedAt)}$3`,
    'data-dash-updated <time>', 'index.html');

  // Today-strip headline (function replacement: headlines often contain "$")
  idx = replaceOnce(idx,
    /(<a class="today__headline" href="#daily-note" data-today-headline>)[^<]*(<\/a>)/,
    (_, a, b) => a + esc(mn.headline) + b,
    'today strip headline', 'index.html');

  idx = replaceOnce(idx,
    /(property="article:modified_time" content=")[^"]*(")/,
    `$1${isoInstant}$2`,
    'article:modified_time', 'index.html');

  idx = replaceOnce(idx,
    /("dateModified": ")[^"]*(")/,
    `$1${isoInstant}$2`,
    'JSON-LD dateModified', 'index.html');

  // Social share images → the daily card (only once it exists). The ?v=
  // version derives from updatedAt so scrapers re-fetch on each new note.
  if (haveCard) {
    const ogUrl = `https://eosesource.com/assets/og-daily.png?v=${isoInstant.replace(/\D/g, '').slice(0, 12)}`;
    idx = replaceOnce(idx,
      /(property="og:image" content=")[^"]*(")/,
      (_, a, b) => a + ogUrl + b, 'og:image', 'index.html');
    idx = replaceOnce(idx,
      /(property="og:image:alt" content=")[^"]*(")/,
      (_, a, b) => a + esc(mn.headline) + b, 'og:image:alt', 'index.html');
    idx = replaceOnce(idx,
      /(name="twitter:image" content=")[^"]*(")/,
      (_, a, b) => a + ogUrl + b, 'twitter:image', 'index.html');
    idx = replaceOnce(idx,
      /(name="twitter:image:alt" content=")[^"]*(")/,
      (_, a, b) => a + esc(mn.headline) + b, 'twitter:image:alt', 'index.html');
  }

  if (idx !== idxBefore) {
    fs.writeFileSync(idxPath, idx);
    changed.push('index.html');
  }

  // ---- sitemap.xml ----
  const smPath = path.join(ROOT, 'sitemap.xml');
  const smBefore = fs.readFileSync(smPath, 'utf8');
  let sm = replaceOnce(smBefore,
    /(<loc>https:\/\/eosesource\.com\/<\/loc>\s*<lastmod>)[^<]*(<\/lastmod>)/,
    `$1${isoDate}$2`,
    'homepage <lastmod>', 'sitemap.xml');
  sm = replaceOnce(sm,
    /(<loc>https:\/\/eosesource\.com\/notes\.html<\/loc>\s*<lastmod>)[^<]*(<\/lastmod>)/,
    `$1${isoDate}$2`,
    'notes.html <lastmod>', 'sitemap.xml');
  if (sm !== smBefore) {
    fs.writeFileSync(smPath, sm);
    changed.push('sitemap.xml');
  }

  if (changed.length) console.log(changed.join(' '));
}

main();
