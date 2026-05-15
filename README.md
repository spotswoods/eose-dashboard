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
  app.js                    ← rendering, live Stooq quote, CSV export, scroll-spy, theme toggle
  tweaks-panel.jsx          ← React-based design tweaks (palette, density, font, etc.)
  tweaks-app.jsx
```

---

## Deploy to GitHub Pages (5 minutes)

1. Create a new GitHub repo — e.g. `eose-dashboard`
2. Upload the entire folder (preserve the `css/`, `js/`, `assets/` structure)
3. **Settings → Pages → Branch: `main` / folder: `/ (root)` → Save**
4. Your dashboard is live at: `https://YOUR-USERNAME.github.io/eose-dashboard`

The page works fully without any API keys. The live quote uses [Stooq](https://stooq.com/q/?s=eose.us) (delayed, no key) — if Stooq is blocked the rest of the page still renders.

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
