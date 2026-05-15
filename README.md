# EOSE Investor Dashboard

A single-file, self-contained investor dashboard for **Eos Energy Enterprises (NASDAQ: EOSE)** — charts, financials, production KPIs, pipeline, valuation, and live SEC EDGAR filings.

---

## Deploy to GitHub Pages (5 minutes)

1. Create a new GitHub repo — e.g. `eose-dashboard` (can be private or public)
2. Upload `index.html` to the root of the repo
3. Go to **Settings → Pages → Branch: `main` / folder: `/ (root)` → Save**
4. Your dashboard is live at: `https://YOUR-USERNAME.github.io/eose-dashboard`

---

## Updating data after earnings

Open `index.html` and find the `DATA` block near the top of the `<script>` tag. It is clearly marked:

```
// ╔═══════════════════════════════════════════════════════════════╗
// ║  DATA — Update these arrays after each earnings release      ║
```

After each quarterly earnings release, update:
- `revActual` — add the new quarterly revenue
- `gmActual` — add the new gross margin %
- `opActual` — add the new operating income
- `liqActual` — update the liquidity figure
- Extend `qActual` with the new quarter label (e.g. `'Q1\'26'`)
- Shift the first projected quarter from `qProj` / `revProj` / etc. to actual arrays

---

## Optional: Enable live news headlines

1. Get a free API key at [alphavantage.co](https://www.alphavantage.co/support/#api-key) (free tier: 25 req/day)
2. In `index.html`, find:
   ```js
   ALPHA_VANTAGE_KEY: '',
   ```
3. Paste your key between the quotes
4. The Filings & News tab will show live EOSE news headlines alongside SEC filings

---

## What's included

| Tab | Content |
|-----|---------|
| Overview | Revenue ramp, gross margin trend, annual revenue chart |
| Financials | Full quarterly history, operating income, liquidity, financial summary table |
| Production | GWh capacity by line, production uptime, graphite felt deliveries |
| Pipeline & Contracts | Opportunity funnel, backlog trend, bookings, signed contracts table |
| Valuation | P/S history, market cap, revenue/margin bridge, bull/base/bear scenarios |
| Filings & News | **Live** SEC EDGAR filings (10-K, 10-Q, 8-K) + optional news feed |

---

## Data sources

- Financial model: Google Sheets model (manual update each quarter)
- SEC filings: Live from [SEC EDGAR](https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001805077) (CIK 1805077)
- News: Alpha Vantage (optional, free API key required)
- Investor Relations: [ir.eosenergy.com](https://ir.eosenergy.com)

---

*Last model update: through Q4 2025 actuals. Q1 2026 earnings reported May 13, 2026 — update pending.*
