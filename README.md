# EOSE Investor Dashboard

A modern, self-hosted investor view of **Eos Energy Enterprises (NASDAQ: EOSE)** — charts, financials, capital structure, Frontier Power USA joint venture, product specs, competitive landscape, valuation scenarios, and live SEC EDGAR links.

Refreshed against the **Q1 2026 10-Q + 8-K filed May 13, 2026**.

---

## Files

```
index.html                  ← canonical dashboard (GitHub Pages serves this)
index-legacy.html           ← original single-file version, kept for reference
README.md
assets/
  eose-logo.png
css/
  styles.css                ← dark + light theme tokens, layout, components
js/
  data.js                   ← all data (Q1'26 actuals + projections + structures)
  charts.js                 ← custom SVG chart library (bar, area, stacked, sparkline, dual-bridge)
  app.js                    ← rendering, live quote (Finnhub poll + JSON fallback), CSV export, search, scroll-spy, theme
  tweaks-panel.jsx          ← React-based design tweaks (palette, density, font, etc.)
  tweaks-app.jsx
```

---

## Deploy to GitHub Pages (5 minutes)

1. Create a new GitHub repo — e.g. `eose-dashboard`
2. Upload the entire folder (preserve the `css/`, `js/`, `assets/` structure)
3. **Settings → Pages → Branch: `main` / folder: `/ (root)` → Save**
4. Your dashboard is live at: `https://YOUR-USERNAME.github.io/eose-dashboard`

The page works fully without any API keys.

---

## Live quote — two tiers

The dashboard resolves the quote in priority order, and never breaks if a tier is unavailable:

| Tier | Source | Cadence | Key? |
|---|---|---|---|
| 1 (best) | **Finnhub** REST poll | ~25s while tab is visible | Free key |
| 2 | **Google Sheets + GitHub Action** → `data/quote.json` | ~5 min | No key |
| 3 (local dev) | Stooq direct | on load | No key (CORS-blocked on github.io) |

### Tier 1 — Finnhub (near-live, recommended)

This is the "almost live" path. While the page is open it polls Finnhub every ~25 seconds (paused when the browser tab isn't visible, to conserve quota) and flashes the price green/red on each tick.

1. Get a free key (30s, no card) at [finnhub.io/register](https://finnhub.io/register).
2. Open `js/app.js`, find the `CONFIG` block near the top, paste your key into `FINNHUB_KEY: ''`.
3. Commit + push. Done.

Notes:
- Finnhub's free tier is **real-time for US equities**, 60 calls/min, CORS-enabled — so it works directly from the browser (unlike Stooq/Yahoo).
- The key is **read-only quote access** and will be visible in the public `app.js`. That's expected for a free quote key. If you'd rather not commit it, append `?finnhub=YOUR_KEY` to the URL or set `localStorage['eose-finnhub-key']` — both override the blank `CONFIG` value at runtime (handy for testing).
- If the key is blank, throttled, or the request fails, the page silently falls back to Tier 2 (`quote.json`). Nothing breaks.
- 52-week high/low comes from a one-time Finnhub `/stock/metric` call; volume falls back to the `quote.json` baseline (Finnhub's `/quote` endpoint doesn't include intraday volume).

### Tier 2 — Google Sheets + GitHub Action (keyless baseline)

Even with Finnhub on, keep this configured — it's the at-load baseline (volume, 52w range) and the fallback. GitHub Pages can't fetch Stooq/Yahoo directly (no CORS headers, and free public proxies are now paywalled), so this Action fetches a Google Sheet (populated with `=GOOGLEFINANCE("NASDAQ:EOSE", ...)`) every 5 minutes, writes the values into `data/quote.json`, and the dashboard reads that file same-origin.

### One-time setup (~5 minutes)

**1. Create the Google Sheet**

Open a new sheet at [sheets.new](https://sheets.new) and paste this into A1:

```
price      =GOOGLEFINANCE("NASDAQ:EOSE","price")
change     =GOOGLEFINANCE("NASDAQ:EOSE","change")
changepct  =GOOGLEFINANCE("NASDAQ:EOSE","changepct")
volume     =GOOGLEFINANCE("NASDAQ:EOSE","volume")
high52     =GOOGLEFINANCE("NASDAQ:EOSE","high52")
low52      =GOOGLEFINANCE("NASDAQ:EOSE","low52")
marketcap  =GOOGLEFINANCE("NASDAQ:EOSE","marketcap")
pe         =GOOGLEFINANCE("NASDAQ:EOSE","pe")
```

(Two-column key/value layout — column A is the field name, column B is the formula.)

**2. Share the sheet publicly**

File → Share → "Anyone with the link can view". This is required so the GitHub Action can read the CSV export without authentication.

**3. Copy the Sheet ID**

The ID is the long string in the URL between `/d/` and `/edit`:

```
https://docs.google.com/spreadsheets/d/  ←── this part ──→  /edit
                                       ^ID^
```

**4. Add the ID as a repository variable**

GitHub repo → **Settings → Secrets and variables → Actions → Variables tab → New repository variable**

- Name: `QUOTE_SHEET_ID`
- Value: *(paste the Sheet ID)*

(Optional: also set `QUOTE_SHEET_GID` if you put the data on a tab other than the first one. The default is `0`.)

**5. Trigger the first run**

Actions tab → "Update EOSE quote" → "Run workflow" → main. After ~20s you'll see a new commit `chore(quote): refresh $X.XX at YYYY-MM-DDTHH:MMZ` and the dashboard will pick it up on its next page load.

The Action runs every 5 minutes thereafter. It only commits when a field actually changes, so the commit history stays clean during off-hours.

### Caveats

- **Finnhub (Tier 1)** is the near-live path. Without it, the page is limited by Tier 2's floor: GOOGLEFINANCE is ~15–20 min delayed and GitHub Actions cron lags 5–15 min, so the keyless quote can be up to ~30 min stale.
- **GitHub Actions free tier** is unlimited for public repos. For private repos, this Action uses ~30s per run × 12 runs/hr × 24 = ~2 hr/day, well under the 2,000 min/month free tier.
- The dashboard **falls back to direct Stooq** for local development (`file://` and `localhost`). On `github.io`, only the JSON + Finnhub paths work (CORS).
- This is a "bonus" feature — the dashboard is research, not a trading terminal. The ~25s poll is intentionally relaxed.

---

## What's on the page (12 sections)

| # | Section | Content |
|---|---------|---------|
| 01 | Overview | Six Q1'26 KPI tiles with sparklines |
| 02 | Thesis | Market / Moat / Inflection — three-card framing |
| 03 | Frontier JV | Frontier Power USA (Cerberus IPV) — terms + narrative |
| 04 | Financials | Quarterly + annual revenue, gross margin, op income, total cash, summary table, CSV export |
| 05 | Cap Structure | Liabilities + preferred, equity + shares, reading guide for the $868M shareholders' deficit |
| 06 | Production | Five-line capacity ramp, uptime, graphite felt deliveries |
| 07 | Product | Z3® spec table + LDES competitive landscape |
| 08 | Pipeline | Funnel ($24.3B → $644.6M), backlog over time, bookings, top contracts |
| 09 | Valuation | P/S history, market cap, FY25→FY28 bridge, Bear/Base/Bull/Blue-Sky scenarios |
| 10 | Catalysts | Dated upcoming catalysts table |
| 11 | Filings & News | Direct EDGAR links to the Q1'26 10-Q, 8-K, S-3ASR, DEF 14A, FY25 10-K, etc. |
| 12 | Risks | Bear-thesis cheat sheet — eight focused risk cards |

---

## Updating data after the next earnings release

Open `js/data.js`. Each array carries an `{ type: 'actual' | 'projected' }` tag.

After each quarterly release:

1. Flip the most recent `projected` row to `actual` and replace the values with the disclosed numbers.
2. Update `kpis` at the top of `data.js` (six headline tiles).
3. Update `quarterTable` (recent quarters summary).
4. Update `funnel`, `backlog`, `bookings` with the disclosed pipeline/backlog/bookings.
5. Update `filings` and `news` with the new 8-K, 10-Q, etc.
6. Update `catalysts` — move "reported" items to `done`, surface the next gates.
7. Optionally update `capStructure` from the new 10-Q balance sheet.

The charts re-build from `data.js`; no chart code changes are typically needed.

---

## Data sources

- **Income statement & balance sheet**: [Q1 2026 10-Q](https://www.sec.gov/Archives/edgar/data/1805077/000162828026034368/eose-20260331.htm) (filed 2026-05-13)
- **Q1 2026 earnings release**: [8-K Ex. 99.1](https://www.sec.gov/Archives/edgar/data/1805077/000162828026034367/eoseq1fy26earningsreleas.htm)
- **Frontier Power USA**: [8-K Ex. 99.2](https://www.sec.gov/Archives/edgar/data/1805077/000162828026034367/eosepressreleasefrontier.htm)
- **FY 2025**: [FY2025 10-K](https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001805077&type=10-K) (filed 2026-02-26)
- **All filings**: [SEC EDGAR (CIK 1805077)](https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001805077)
- **Live quote**: [Stooq](https://stooq.com/q/?s=eose.us) (CSV, delayed, no key)
- **Investor Relations**: [ir.eosenergy.com](https://ir.eosenergy.com)

---

## Estimates &amp; projections

- Quarterly projections beyond Q1'26 are **model assumptions** consistent with management's reaffirmed FY2026 revenue guidance ($300–400M) and prior cadence — they are not company-issued forecasts.
- Contract values marked with `*` are **model estimates** derived from disclosed MWh sizes and an implied $400–500/kWh; formal $ values are not publicly disclosed for most counterparties.
- The "Frontier Power USA: ~$900M" entry in the contract table is an estimate (2 GWh × ~$450/kWh) — the 8-K describes a "firm capacity reservation," not a fixed-price purchase order.

---

## Not investment advice

This page is a personal research dashboard. Verify all figures against primary SEC filings before any investment decision. No affiliation with Eos Energy Enterprises, Inc.

---

*Last data refresh: Q1 2026 actuals through 3/31/26, incorporating the 10-Q, 8-K earnings release, and Frontier Power USA announcement filed May 13, 2026.*
