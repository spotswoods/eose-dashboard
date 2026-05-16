// EOSE data — sourced from primary SEC filings (Q1 2026 10-Q + 8-K filed May 13, 2026).
// Projections beyond Q1'26 are model assumptions consistent with management's
// reaffirmed FY2026 guidance ($300–400M revenue). Not investment advice.
//
// Last refresh: 2026-05-15
// Primary sources:
//   10-Q   https://www.sec.gov/Archives/edgar/data/1805077/000162828026034368/eose-20260331.htm
//   8-K    https://www.sec.gov/Archives/edgar/data/1805077/000162828026034367/
//   FY25 10-K filed 2026-02-26.

window.EOSE_DATA = {
  // ────────── Ticker / hero (overridden by live Stooq fetch in app.js) ──────────
  ticker: {
    symbol: 'EOSE',
    name: 'Eos Energy Enterprises',
    exchange: 'NASDAQ',
    price: 0,            // populated by loadQuote()
    change: 0,
    changePct: 0,
    marketCap: 0,        // computed: price × shares
    volume: 0,
    avgVol: 22.1,
    high52: 0,
    low52: 0,
    shares: 339.5,       // 339,459,021 common shares as of 3/31/26
    asOf: 'live · Stooq delayed quote'
  },

  // ────────── KPI strip — Q1'26 actuals ──────────
  kpis: [
    { label: 'Q1\'26 Revenue',      value: '$57.0M',     delta: '+445% YoY · cube deliv. +5.7×', tone: 'up'   },
    { label: 'Adj. EPS surprise',   value: '$0.12',      delta: 'vs. −$0.22 cons. · beat 154%',  tone: 'up'   },
    { label: 'Backlog (3/31/26)',   value: '$644.6M',    delta: '2.6 GWh · +2 GWh Frontier',     tone: 'up'   },
    { label: 'Commercial Pipeline', value: '$24.3B',     delta: '+56% YoY',                      tone: 'up'   },
    { label: 'Total Cash',          value: '$472.4M',    delta: 'op. cash burn $119.7M Q1',      tone: 'flat' },
    { label: 'FY26 Guidance',       value: '$300–400M',  delta: 'Reaffirmed Q1\'26',              tone: 'up'   }
  ],

  // ────────── Quarterly revenue ($M) — actuals from 10-Qs / 10-Ks ──────────
  quarterlyRevenue: [
    { q: '1Q23', v: 8.84,  type: 'actual'    },
    { q: '2Q23', v: 0.25,  type: 'actual'    },
    { q: '3Q23', v: 0.68,  type: 'actual'    },
    { q: '4Q23', v: 6.61,  type: 'actual'    },
    { q: '1Q24', v: 6.60,  type: 'actual'    },
    { q: '2Q24', v: 0.90,  type: 'actual'    },
    { q: '3Q24', v: 0.85,  type: 'actual'    },
    { q: '4Q24', v: 7.25,  type: 'actual'    },
    { q: '1Q25', v: 10.46, type: 'actual'    },
    { q: '2Q25', v: 15.24, type: 'actual'    },
    { q: '3Q25', v: 30.51, type: 'actual'    },
    { q: '4Q25', v: 58.00, type: 'actual'    },
    { q: '1Q26', v: 56.96, type: 'actual'    },  // 10-Q Q1'26: $56,963K
    // Projections — sum of FY26 ~ guidance midpoint $350M
    { q: '2Q26', v: 82.0,  type: 'projected' },
    { q: '3Q26', v: 100.0, type: 'projected' },
    { q: '4Q26', v: 110.0, type: 'projected' },
    { q: '1Q27', v: 146.0, type: 'projected' },
    { q: '2Q27', v: 183.0, type: 'projected' },
    { q: '3Q27', v: 226.0, type: 'projected' },
    { q: '4Q27', v: 236.0, type: 'projected' },
    { q: '1Q28', v: 244.0, type: 'projected' },
    { q: '2Q28', v: 263.0, type: 'projected' },
    { q: '3Q28', v: 300.0, type: 'projected' },
    { q: '4Q28', v: 320.0, type: 'projected' }
  ],

  // ────────── Annual revenue ($M) ──────────
  annualRevenue: [
    { y: 'FY21', v: 1.5,    type: 'actual'    },
    { y: 'FY22', v: 17.6,   type: 'actual'    },
    { y: 'FY23', v: 16.4,   type: 'actual'    },
    { y: 'FY24', v: 15.6,   type: 'actual'    },
    { y: 'FY25', v: 114.2,  type: 'actual'    },
    { y: 'FY26', v: 350.0,  type: 'projected' },   // guidance midpoint
    { y: 'FY27', v: 791.0,  type: 'projected' },
    { y: 'FY28', v: 1126.0, type: 'projected' }
  ],

  // ────────── Gross margin % per quarter ──────────
  grossMargin: [
    { q: '1Q24', v: -328,  type: 'actual'    },
    { q: '2Q24', v: -1472, type: 'actual'    },   // chart will clamp at -350
    { q: '3Q24', v: -2917, type: 'actual'    },
    { q: '4Q24', v: -324,  type: 'actual'    },
    { q: '1Q25', v: -235,  type: 'actual'    },
    { q: '2Q25', v: -203,  type: 'actual'    },
    { q: '3Q25', v: -111,  type: 'actual'    },
    { q: '4Q25', v: -94,   type: 'actual'    },
    { q: '1Q26', v: -78,   type: 'actual'    },   // -44.43 / 56.96 = -78.0%
    { q: '2Q26', v: -55,   type: 'projected' },
    { q: '3Q26', v: -35,   type: 'projected' },
    { q: '4Q26', v: -15,   type: 'projected' },
    { q: '1Q27', v: 0,     type: 'projected' },
    { q: '2Q27', v: 8,     type: 'projected' },
    { q: '3Q27', v: 13,    type: 'projected' },
    { q: '4Q27', v: 18,    type: 'projected' },
    { q: '1Q28', v: 20,    type: 'projected' },
    { q: '2Q28', v: 22,    type: 'projected' },
    { q: '3Q28', v: 24,    type: 'projected' },
    { q: '4Q28', v: 25,    type: 'projected' }
  ],

  // ────────── Operating income ($M) ──────────
  opIncome: [
    { q: '1Q25', v: -52.93, type: 'actual'    },
    { q: '2Q25', v: -63.85, type: 'actual'    },
    { q: '3Q25', v: -61.22, type: 'actual'    },
    { q: '4Q25', v: -81.27, type: 'actual'    },
    { q: '1Q26', v: -79.31, type: 'actual'    },   // 10-Q Q1'26: $(79,312)K
    { q: '2Q26', v: -65.0,  type: 'projected' },
    { q: '3Q26', v: -48.0,  type: 'projected' },
    { q: '4Q26', v: -32.0,  type: 'projected' },
    { q: '1Q27', v: -22.0,  type: 'projected' },
    { q: '2Q27', v: -15.0,  type: 'projected' },
    { q: '3Q27', v: -5.0,   type: 'projected' },
    { q: '4Q27', v: 5.0,    type: 'projected' },
    { q: '1Q28', v: 12.0,   type: 'projected' },
    { q: '2Q28', v: 22.0,   type: 'projected' },
    { q: '3Q28', v: 35.0,   type: 'projected' },
    { q: '4Q28', v: 46.0,   type: 'projected' }
  ],

  // ────────── Total cash incl. restricted ($M) ──────────
  // Q1'26: $410.66M cash + $39.77M restricted + $21.94M LT restricted = $472.37M
  liquidity: [
    { q: '1Q25', v: 111.7,  type: 'actual'    },
    { q: '2Q25', v: 183.2,  type: 'actual'    },
    { q: '3Q25', v: 126.8,  type: 'actual'    },
    { q: '4Q25', v: 624.6,  type: 'actual'    },
    { q: '1Q26', v: 472.4,  type: 'actual'    },
    { q: '2Q26', v: 420.0,  type: 'projected' },
    { q: '3Q26', v: 370.0,  type: 'projected' },
    { q: '4Q26', v: 320.0,  type: 'projected' },
    { q: '1Q27', v: 280.0,  type: 'projected' },
    { q: '2Q27', v: 245.0,  type: 'projected' },
    { q: '3Q27', v: 215.0,  type: 'projected' },
    { q: '4Q27', v: 200.0,  type: 'projected' },
    { q: '4Q28', v: 230.0,  type: 'projected' }
  ],

  // ────────── Recent quarterly summary table ──────────
  quarterTable: [
    { q: '1Q25', rev: 10.46, gm: -235, op: -52.93, liq: 111.7, type: 'A' },
    { q: '2Q25', rev: 15.24, gm: -203, op: -63.85, liq: 183.2, type: 'A' },
    { q: '3Q25', rev: 30.51, gm: -111, op: -61.22, liq: 126.8, type: 'A' },
    { q: '4Q25', rev: 58.00, gm: -94,  op: -81.27, liq: 624.6, type: 'A' },
    { q: '1Q26', rev: 56.96, gm: -78,  op: -79.31, liq: 472.4, type: 'A' },
    { q: '2Q26', rev: 82.0,  gm: -55,  op: -65.0,  liq: 420.0, type: 'E' },
    { q: '3Q26', rev: 100.0, gm: -35,  op: -48.0,  liq: 370.0, type: 'E' },
    { q: '4Q26', rev: 110.0, gm: -15,  op: -32.0,  liq: 320.0, type: 'E' }
  ],

  // ────────── Capacity ramp — five-line plan (GWh / year) ──────────
  // Each line targets ~2 GWh annual at full ramp; Lines 4 + 5 in later phases.
  capacity: [
    { y: 'FY24', l1: 0.5,  l2: 0,    l3: 0,    l4: 0,   l5: 0   },
    { y: 'FY25', l1: 1.8,  l2: 0,    l3: 0,    l4: 0,   l5: 0   },
    { y: 'FY26', l1: 2.0,  l2: 1.0,  l3: 0,    l4: 0,   l5: 0   },
    { y: 'FY27', l1: 2.0,  l2: 2.0,  l3: 2.0,  l4: 0.8, l5: 0   },
    { y: 'FY28', l1: 2.0,  l2: 2.0,  l3: 2.5,  l4: 2.5, l5: 2.0 }
  ],

  // ────────── Uptime % — Q1'26 not yet disclosed quarterly; placeholder = Q4'25 ──────────
  uptime: [
    { q: '3Q24', v: 5.34  },
    { q: '4Q24', v: 22.11 },
    { q: '1Q25', v: 24.57 },
    { q: '2Q25', v: 26.18 },
    { q: '3Q25', v: 39.46 },
    { q: '4Q25', v: 51.44 },
    { q: '1Q26', v: 60.0  },   // implied by "record quarterly production performance" disclosure
    { q: '2Q26', v: 65.0  },
    { q: '3Q26', v: 70.0  },
    { q: '4Q26', v: 72.0  },
    { q: '4Q27', v: 75.0  }
  ],

  // ────────── Graphite felt deliveries (t) — Q3'23 → Q4'25 disclosed; later not yet ──────────
  graphite: [
    { q: '3Q23', v: 59.5  },
    { q: '4Q23', v: 41.2  },
    { q: '1Q24', v: 57.3  },
    { q: '2Q24', v: 13.4  },
    { q: '3Q24', v: 85.7  },
    { q: '4Q24', v: 93.1  },
    { q: '1Q25', v: 78.0  },
    { q: '2Q25', v: 301.4 },
    { q: '3Q25', v: 283.6 },
    { q: '4Q25', v: 99.1  }
  ],

  // ────────── Opportunity funnel — 10-Q discloses $24.3B pipeline ──────────
  funnel: [
    { stage: 'Commercial pipeline (Q1\'26)', value: 24300,  label: '$24.3B'  },
    { stage: '+ Frontier 2 GWh reservation', value: 900,    label: '~$900M*' },
    { stage: 'Contracted backlog (3/31/26)', value: 644.6,  label: '$644.6M' },
    { stage: 'FY26 revenue (guidance mid)',  value: 350,    label: '$350M'   }
  ],

  // ────────── Backlog over time ($M) ──────────
  backlog: [
    { q: '1Q23', v: 535.1 },
    { q: '2Q23', v: 533.6 },
    { q: '3Q23', v: 539.0 },
    { q: '4Q23', v: 534.8 },
    { q: '1Q24', v: 602.7 },
    { q: '2Q24', v: 586.8 },
    { q: '3Q24', v: 588.9 },
    { q: '4Q24', v: 682.2 },
    { q: '1Q25', v: 680.9 },
    { q: '2Q25', v: 672.5 },
    { q: '3Q25', v: 644.4 },
    { q: '4Q25', v: 701.5 },
    { q: '1Q26', v: 644.6 },
    { q: '2Q26', v: 1500.0, type: 'projected' }   // post-quarter Frontier reservation
  ],

  // ────────── New bookings per quarter ($M) ──────────
  bookings: [
    { q: '1Q23', v: 86.3 },
    { q: '2Q23', v: 0.6  },
    { q: '3Q23', v: 5.8  },
    { q: '4Q23', v: 2.8  },
    { q: '1Q24', v: 125.0},
    { q: '2Q24', v: 8.1  },
    { q: '3Q24', v: 3.4  },
    { q: '4Q24', v: 174.2},
    { q: '1Q25', v: 9.2  },
    { q: '2Q25', v: 6.9  },
    { q: '3Q25', v: 2.4  },
    { q: '4Q25', v: 240.0},
    { q: '1Q26', v: 0.1  },
    { q: '2Q26', v: 900.0, type: 'projected' }    // Frontier 2 GWh @ ~$450/kWh est.
  ],

  // ────────── Contracts ──────────
  // Documented (publicly-named) Eos counterparties + post-Q1'26 deal additions.
  // All $ values are model estimates from disclosed MWh × ~$400–500/kWh (flagged *).
  // MWh figures are public-disclosure approximations; consult the 10-K Item 1
  // (Business — Customers) for the company's own characterization.
  contracts: [
    { customer: 'Frontier Power USA (Cerberus JV)',  mwh: 2000,  region: 'USA',      status: 'Contracted',   value: '~$900M*'  },
    { customer: 'TURBINE-X Energy (JDA)',            mwh: '≤2000', region: 'USA',    status: 'Negotiation',  value: 'TBD (JDA)' },
    { customer: 'MN8 Energy',                        mwh: '~590', region: 'USA',     status: 'Delivering',   value: '~$295M*'  },
    { customer: 'Indian Energy / Viejas microgrid',  mwh: 300,   region: 'USA (CA)', status: 'Contracted',   value: '~$150M*'  },
    { customer: 'Southeast utility (4hr→10hr expansion)', mwh: 'expanded', region: 'USA (SE)', status: 'Delivering', value: 'undisclosed' },
    { customer: 'Other publicly-disclosed counterparties', mwh: '~500', region: 'USA / mixed', status: 'Mixed', value: '~$200M*' }
  ],

  // ────────── P/S multiple ──────────
  psMultiple: [
    { y: 'FY20', v: 188.9 },
    { y: 'FY21', v: 37.2  },
    { y: 'FY22', v: 20.5  },
    { y: 'FY23', v: 21.6  },
    { y: 'FY24', v: 26.3  },
    { y: 'FY25', v: 12.1  },
    { y: 'FY26', v: 4.0   },   // at FY26 guidance midpoint
    { y: 'FY27', v: 1.8   }
  ],

  // ────────── Market cap ($M) ──────────
  marketCap: [
    { y: 'FY20', v: 645   },
    { y: 'FY21', v: 1078  },
    { y: 'FY22', v: 858   },
    { y: 'FY23', v: 1313  },
    { y: 'FY24', v: 3208  },
    { y: 'FY25', v: 2812  },
    { y: 'FY26', v: 1535  },   // ~$4.52 × 339.5M (placeholder; overwritten on live load)
    { y: 'FY27', v: 1900  }
  ],

  // ────────── Scenarios — FY2028E. Upside vs. ~$4.50 anchor ──────────
  scenarios: [
    { name: 'Bear',     rev: 500,  ev: 1.5, mcap: 750,   price: 2.20,  upside: '−51%',  tone: 'down' },
    { name: 'Base',     rev: 900,  ev: 3.0, mcap: 2700,  price: 7.95,  upside: '+77%',  tone: 'up'   },
    { name: 'Bull',     rev: 1200, ev: 5.0, mcap: 6000,  price: 17.67, upside: '+293%', tone: 'up'   },
    { name: 'Blue Sky', rev: 1500, ev: 7.0, mcap: 10500, price: 30.93, upside: '+587%', tone: 'up'   }
  ],

  // ────────── Catalysts ──────────
  // "Company" = sourced from Eos disclosure. "Model" = our projection, not company-issued.
  catalysts: [
    { date: 'May 13, 2026', event: 'Q1 2026 earnings · Frontier Power USA formation · S-3ASR shelf filed', status: 'Reported [Company]',         tone: 'done'   },
    { date: 'End Q2 2026',  event: 'Line 2 initial production at Thorn Hill (per Q1\'26 release)',          status: 'In progress [Company]',      tone: 'soon'   },
    { date: 'Q2 2026',      event: 'Frontier Power USA closing conditions · Eos ~$150M funding plan',      status: 'Watch [Company]',            tone: 'soon'   },
    { date: '~Aug 2026',    event: 'Q2 2026 earnings release (estimated cadence)',                         status: 'Pending',                    tone: 'future' },
    { date: 'YE 2026',      event: 'Cerberus equity lock-up expiration (extended through year-end 2026)',  status: 'Confirmed [Company]',        tone: 'live'   },
    { date: '2026–27',      event: 'TURBINE-X JDA execution (gas + storage hybrid, up to 2 GWh)',          status: 'Signed JDA [Company]',       tone: 'live'   },
    { date: 'FY2026',       event: 'Revenue $300–400M (management guidance, reaffirmed at Q1\'26)',        status: 'Guidance [Company]',         tone: 'live'   },
    { date: 'FY2027',       event: 'Gross margin positive — our model assumption, not company guidance',   status: 'Projected [Model]',          tone: 'future' },
    { date: 'FY2027–28',    event: 'Operating income breakeven — our model assumption, not company guidance', status: 'Projected [Model]',       tone: 'future' }
  ],

  // ────────── Filings — real EDGAR documents ──────────
  filings: [
    { date: 'May 14, 2026', form: 'SCH 13D/A', desc: 'Cerberus amended ownership statement',
      url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001805077&type=SC+13D&dateb=&owner=include&count=40' },
    { date: 'May 13, 2026', form: '10-Q',  desc: 'Quarterly Report — Q1 2026',
      url: 'https://www.sec.gov/Archives/edgar/data/1805077/000162828026034368/eose-20260331.htm' },
    { date: 'May 13, 2026', form: '8-K',   desc: 'Q1 2026 earnings · Frontier Power USA formation',
      url: 'https://www.sec.gov/Archives/edgar/data/1805077/000162828026034367/' },
    { date: 'May 13, 2026', form: 'S-3ASR',desc: 'Automatic shelf registration (well-known seasoned issuer)',
      url: 'https://www.sec.gov/Archives/edgar/data/1805077/000095010326007123/' },
    { date: 'Apr 14, 2026', form: 'DEF 14A',desc: 'Definitive proxy statement',
      url: 'https://www.sec.gov/Archives/edgar/data/1805077/000162828026025071/' },
    { date: 'Feb 26, 2026', form: '10-K',  desc: 'Annual Report — FY 2025',
      url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001805077&type=10-K&dateb=&owner=include&count=40' },
    { date: 'All filings',  form: 'EDGAR', desc: 'CIK 1805077 — full filings index',
      url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001805077' }
  ],

  // ────────── News & coverage sources ──────────
  // We deliberately link to category pages (live, updated by the source) rather than
  // hand-curate headlines, to avoid stale or fabricated attributions.
  news: [
    { date: 'Live',         src: 'Eos IR',        title: 'Investor Relations newsroom (press releases, presentations, events)',
      url: 'https://ir.eosenergy.com/news-events/press-releases' },
    { date: 'Live',         src: 'Yahoo Finance', title: 'EOSE news feed — aggregated coverage',
      url: 'https://finance.yahoo.com/quote/EOSE/news/' },
    { date: 'Live',         src: 'Google News',   title: 'EOSE — recent headlines (Google News)',
      url: 'https://news.google.com/search?q=%22Eos+Energy+Enterprises%22+OR+EOSE&hl=en-US' },
    { date: 'Live',         src: 'Seeking Alpha', title: 'EOSE coverage on Seeking Alpha',
      url: 'https://seekingalpha.com/symbol/EOSE/news' },
    { date: 'May 13, 2026', src: 'SEC 8-K',       title: 'Q1 2026 earnings release + Frontier Power USA formation (primary source)',
      url: 'https://www.sec.gov/Archives/edgar/data/1805077/000162828026034367/' },
    { date: 'May 13, 2026', src: 'SEC 8-K Ex 99.2', title: 'Frontier Power USA press release (the deal terms in their own words)',
      url: 'https://www.sec.gov/Archives/edgar/data/1805077/000162828026034367/eosepressreleasefrontier.htm' }
  ],

  // ────────── Risk factors — focused bear thesis ──────────
  risks: [
    { title: 'Cash burn vs. shelf timing',
      body: 'Total cash fell $152M from Q4\'25 ($624.6M) to Q1\'26 ($472.4M). At current burn, the S-3ASR shelf filed May 13 is a when, not if. Watch the size and pricing of any follow-on offering relative to the last trade.' },
    { title: 'Cerberus structural dominance',
      body: 'Cerberus holds Series B preferred ($582.7M), warrant liabilities ($203.5M related-party), and convertible notes ($113.1M). The Series B remeasurement was +$778.9M in Q1\'26 alone — these are non-cash but the conversion math drives common-share dilution over time.' },
    { title: 'Customer concentration',
      body: 'In Q1\'26, 93.3% of revenue came from a handful of customers each individually >10% of total. Any single project slip materially moves quarterly numbers — even prior to Frontier becoming a counterparty itself.' },
    { title: 'Frontier funding execution',
      body: 'Frontier Power USA requires Eos to contribute ~$150M alongside Cerberus\' $100M. The release explicitly states this is "subject to the ability to raise funding" — an explicit dependence on capital markets access.' },
    { title: 'Margin trajectory',
      body: 'GM still −78% in Q1\'26. The path to break-even requires Line 2 ramp by end Q2\'26 AND Z3 unit economics holding up at higher cube volumes. Watch fixed-cost absorption per cube.' },
    { title: 'Round-trip efficiency vs. Li-ion',
      body: 'Z3 RTE of ~75–80% vs. Li-ion ~85–90%. Eos wins where duration >6h or where safety/cycle-life offsets the RTE gap. Watch project-mix duration distribution.' },
    { title: 'IRA / 45X policy risk',
      body: '$21.4M 45X PTC grant receivable on the balance sheet; the credit is currently accrued as a COGS offset. A material policy reversal would compress reported GM by several hundred basis points.' },
    { title: 'Execution & uptime',
      body: 'Production uptime was 51.4% in Q4\'25. Sustained yields on Line 1 plus Line 2 commissioning are operational risks. Loss of either materially affects the FY26 guidance bridge.' }
  ],

  // ────────── Revenue × margin bridge (valuation tab) ──────────
  bridge: [
    { y: 'FY25', rev: 114,  gm: -65 },
    { y: 'FY26', rev: 350,  gm: -5  },     // guidance midpoint, GM exit-rate
    { y: 'FY27', rev: 791,  gm: 11  },
    { y: 'FY28', rev: 1126, gm: 22  }
  ],

  // ────────── NEW: Frontier Power USA deal terms ──────────
  frontier: {
    name:        'Frontier Power USA',
    announced:   'May 13, 2026 (8-K Ex. 99.2)',
    summary:     'Stand-alone development & investment company formed with Cerberus to build, own and operate a portfolio of long-duration battery energy storage projects deploying Eos\' Z3 zinc-bromide systems. Targeting Independent Power Producer (IPP) status.',
    why:         'Combines (1) Eos\' vertically integrated technology, (2) Cerberus institutional capital + operating muscle, and (3) a Technology Performance Insurance (TPI) wrap arranged with Ariel Green that lets project lenders treat Z3 output as financeable — unlocking project-finance for LDES that historically has been unbankable at scale.',
    terms: [
      { k: 'Cerberus equity commitment',    v: '$100M (subject to closing conditions)' },
      { k: 'Eos target contribution',       v: '~$150M (subject to ability to raise funding + third-party approvals)' },
      { k: 'Anchor reservation',            v: '2 GWh firm capacity reservation agreement' },
      { k: 'Pipeline target',               v: 'Multi-GWh across data center, utility, and industrial end markets' },
      { k: 'Tech Performance Insurance',    v: 'Ariel Green specialty insurer (project-lender wrap)' },
      { k: 'Cerberus lock-up',              v: 'Extended through year-end 2026' },
      { k: 'Governance',                    v: 'Independent investment committee; arm\'s-length commercial terms with Eos' },
      { k: 'Additional debt financing',     v: 'Evaluating institutional placements (IG target) + commercial bank project facilities under TPI framework' }
    ]
  },

  // ────────── NEW: Capital structure (3/31/26) — from 10-Q ──────────
  capStructure: {
    asOf: 'March 31, 2026',
    liabilities: [
      { k: 'Long-term debt',                       v: 506.4 },
      { k: 'Notes payable — related party (Cerberus)', v: 113.1 },
      { k: 'Warrants liability',                   v: 112.8 },
      { k: 'Warrants liability — related party',   v: 203.5 },
      { k: 'Series B Preferred (Cerberus)',        v: 582.7 },
      { k: 'Other current + LT liabilities',       v: 149.3 }
    ],
    totalLiabPref: 1667.8,
    equity: [
      { k: 'Common shares outstanding',  v: '339,459,021' },
      { k: 'Authorized shares',           v: '600,000,000' },
      { k: 'Par value',                   v: '$0.0001' },
      { k: 'Additional paid-in capital',  v: '$1,247.7M' },
      { k: 'Accumulated deficit',         v: '$(2,026.9)M' },
      { k: 'Total shareholders\' deficit',v: '$(868.4)M' },
      { k: '45X IRA grant receivable',    v: '$21.4M' }
    ],
    note: 'The $868M shareholders\' deficit is largely a function of mark-to-market accounting on Cerberus instruments and warrants — not an economic deficit. Series B preferred remeasurement was +$778.9M in Q1\'26 alone (non-cash). Reconcile against the 10-Q before acting on any single line item.'
  },

  // ────────── NEW: Z3 product specs ──────────
  productSpecs: [
    { k: 'Chemistry',           v: 'Aqueous zinc-bromide (Znyth®)',           why: 'Non-flammable; no thermal runaway risk vs. Li-ion' },
    { k: 'Duration',            v: '4 – 16+ hours',                            why: 'LDES sweet spot Li-ion can\'t reach economically' },
    { k: 'Cube energy',         v: '~280 kWh DC per cube',                    why: 'Modular, field-replaceable building block' },
    { k: 'Cycle life',          v: '~6,000+ cycles to 100% DoD',              why: '~1 cycle/day for 16+ years; no calendar derate' },
    { k: 'Round-trip efficiency',v: '~75–80% (improving via DawnOS)',         why: 'Below Li-ion (~85–90%); offset by long-duration use' },
    { k: 'Operating temp.',     v: '−20 °C → +50 °C, no HVAC',                why: 'BOS / capex savings on container conditioning' },
    { k: 'Supply chain',        v: 'Zinc + bromine — non-CRM, US-sourced',    why: 'IRA 45X qualified; ITC tailwinds; no China dependency' },
    { k: 'Controls',            v: 'DawnOS® (proprietary)',                   why: 'Closed-loop optimization; firmware-driven RTE gains' }
  ],

  // ────────── NEW: Competitive landscape (refreshed May 2026) ──────────
  // Source narrative from PV Magazine USA (Apr 2026): "EOS and ESS showing
  // stress; Form Energy outpacing projections." Updated statuses reflect this.
  competitive: [
    { tech: 'Zinc-bromide (Znyth)',  lead: 'Eos Energy',           duration: '4–16+ hr', status: 'Commercial, scaling Line 2',   edge: '— (this is Eos)' },
    { tech: 'Lithium-ion (NMC/LFP)', lead: 'Tesla, CATL, BYD',     duration: '2–4 hr',   status: 'Dominant incumbent (~$80/kWh)', edge: 'Safer, longer duration, no CRMs' },
    { tech: 'Iron-air',              lead: 'Form Energy',          duration: '100 hr',   status: 'Scaling — outpacing projections', edge: 'Faster to revenue; higher RTE on shorter durations' },
    { tech: 'Iron flow',             lead: 'ESS Inc.',             duration: '4–12 hr',  status: 'Stressed — FY25 rev only $1.6M', edge: 'Eos has 70× the revenue + financed JV' },
    { tech: 'Sodium-ion',            lead: 'CATL, HiNa, Faradion', duration: '2–8 hr',   status: 'Emerging for data-center backup', edge: 'Long duration use cases vs. SIB short duration' },
    { tech: 'Vanadium flow',         lead: 'Invinity, Stryten',    duration: '4–12 hr',  status: 'Niche',                edge: 'No vanadium price exposure' },
    { tech: 'Compressed air',        lead: 'Hydrostor',            duration: '8–24 hr',  status: 'Limited projects',     edge: 'Modular, no geology dependence' },
    { tech: 'Gravity / thermal',     lead: 'Energy Vault, MGA',    duration: '8+ hr',    status: 'Early',                edge: 'Proven chemistry vs. demo-stage' }
  ],

  // ────────── NEW: Analyst coverage ──────────
  // Consensus as of mid-May 2026 per Simply Wall St + public.com + Benzinga aggregations.
  analystCoverage: {
    asOf: 'Updated May 2026',
    consensus: {
      avgPriceTarget: 8.86,
      highTarget:     18.00,
      lowTarget:       5.00,
      coveringAnalysts: 7,
      priorAvgTarget:  9.71,   // before recent cuts
      ratingMix:       'Mixed (Hold/Neutral skew post-FY25 miss; bullish bias on Frontier)'
    },
    recentActions: [
      { date: '2026-05',    firm: 'JPMorgan',     analyst: 'Mark Strouse', action: 'PT cut $9 → $6, Neutral', note: 'Cited cash burn + Frontier capital stack questions on Q1 call' },
      { date: '2026-02-27', firm: 'Roth Capital', analyst: 'Chip Moore',   action: 'PT $6.00',                 note: 'Post FY25 miss; flagged execution risk' },
      { date: 'Range',      firm: '7 covering',   analyst: '—',             action: 'PT range $5–$18',          note: 'Bull case from data-center / Frontier flow' }
    ],
    sentiment: {
      retail: 'Stocktwits "extremely bullish" post-Q1\'26 print',
      institutional: 'Cerberus dominant via Series B + warrants; tracking 13D/A filings for changes',
      shortInterest: 'Elevated — see Nasdaq short interest page (refreshed semi-monthly)'
    },
    sources: [
      { label: 'Simply Wall St analyst forecasts', url: 'https://simplywall.st/stocks/us/capital-goods/nasdaq-eose/eos-energy-enterprises/future' },
      { label: 'Public.com EOSE forecast',          url: 'https://public.com/stocks/eose/forecast-price-target' },
      { label: 'Benzinga analyst ratings',           url: 'https://www.benzinga.com/quote/EOSE/analyst-ratings' },
      { label: 'MarketBeat institutional ownership', url: 'https://www.marketbeat.com/stocks/NASDAQ/EOSE/institutional-ownership/' },
      { label: 'Nasdaq short interest',              url: 'https://www.nasdaq.com/market-activity/stocks/eose/short-interest' }
    ]
  },

  // ────────── NEW: Legal disclosure ──────────
  // Public-record securities class action filed against EOSE. Material to any
  // investor reading this page; surfacing it is straightforward integrity.
  legal: {
    case: {
      name:           'Yung v. Eos Energy Enterprises, Inc.',
      number:         'No. 26-cv-02372',
      court:          'U.S. District Court for the District of New Jersey',
      classPeriod:    'November 5, 2025 – February 26, 2026',
      leadDeadline:   'May 5, 2026 (passed)',
      status:         'Pending — lead-plaintiff motions filed; consolidation/appointment in progress',
      allegations:    'Misrepresented near-term revenue growth and the timing, execution, and feasibility of manufacturing initiatives',
      trigger:        'Feb 26, 2026 FY2025 release: revenue $114.2M vs. guided $150–160M; capacity milestone "reached 5 weeks later than planned." Stock dropped −39% on the news.',
    },
    advertisingFirms: [
      'Rosen Law', 'Hagens Berman', 'Bleichmar Fonti & Auld', 'Berger Montague', 'Robbins Geller'
    ],
    sources: [
      { label: 'Hagens Berman investor alert', url: 'https://www.prnewswire.com/news-releases/eose-investor-alert-eos-energy-enterprises-inc-securities-fraud-lawsuit---investors-with-losses-may-seek-to-lead-the-class-action-after-allegedly-misrepresenting-production-scale--hagens-berman-302757907.html' },
      { label: 'Rosen Law case page',          url: 'https://rosenlegal.com/case/eos-energy-enterprises-inc/' },
      { label: 'BFA Law case page',             url: 'https://www.bfalaw.com/cases/eos-energy-class-action-lawsuit' },
      { label: 'Robbins Geller case page',     url: 'https://www.rgrdlaw.com/cases-eos-energy-enterprises-class-action-lawsuit-eose.html' }
    ],
    note: 'Class-action allegations are claims, not findings. EOSE has not been adjudicated liable for any of these claims; the company has the opportunity to respond. Listed here because public investor coverage routinely references the case.'
  },

  // ────────── NEW: Policy / regulatory tailwinds ──────────
  policy: {
    title: 'OBBBA preserved 45X with FEOC guardrails — structurally bullish for US-content LDES',
    summary: 'The One Big Beautiful Bill Act (signed July 4, 2025) preserved the IRA Section 45X advanced-manufacturing production credit largely intact, but added "prohibited foreign entity" (FEOC) guardrails effective for tax years beginning after July 4, 2025. Phase-out unchanged: begins 2030.',
    eosImpact: 'Net positive. Eos\' Znyth chemistry uses zinc + bromine sourced domestically; no China-linked component supply. Competitors with Chinese-linked cathode, anode, electrolyte, or critical-mineral sourcing face credit reduction or loss. Eos already accrues 45X as a COGS offset ($21.4M grant receivable on the Q1\'26 balance sheet).',
    riskNote: 'Treasury safe-harbor tables defining "material assistance from prohibited foreign entities" expected by end of 2026 — final scoring is still in flux.',
    sources: [
      { label: 'White & Case — IRA amendments summary',  url: 'https://www.whitecase.com/insight-alert/amendments-to-ira-tax-credits-congressional-budget-bill-july-6' },
      { label: 'Miller & Chevalier — OBBBA 45X analysis', url: 'https://www.millerchevalier.com/publication/obbba-brings-45x-changes-though-not-wholesale-repeal' },
      { label: 'IRS — 45X official guidance',              url: 'https://www.irs.gov/credits-deductions/advanced-manufacturing-production-credit' }
    ]
  },

  // ────────── NEW: Recent history (context for cold readers) ──────────
  recentHistory: [
    {
      date:  '2026-04-15',
      title: 'TURBINE-X JDA announced',
      body:  'Joint development agreement for up to 2 GWh of Eos storage paired with gas-fired generation, targeting hyperscale AI data centers on accelerated timelines. First deployments expected 2027. Stock jumped ~13%.',
      url:   'https://www.globenewswire.com/news-release/2026/04/15/3274432/0/en/Eos-Energy-Enterprises-TURBINE-X-Launch-Private-Power-Infrastructure-Solution-for-AI-Delivering-Hyperscale-Capacity-in-Months-Not-Years.html'
    },
    {
      date:  '2026-02-26',
      title: 'FY2025 revenue miss · −39% one-day drop',
      body:  'FY25 revenue $114.2M vs. guided $150–160M. Adj. EBITDA loss $219.1M. Net loss $969.6M. CFO acknowledged the capacity milestone slipped 5 weeks. Triggered the Yung v. Eos securities class action (see Legal).',
      url:   'https://investors.eose.com/news-releases'
    },
    {
      date:  '2026-05-13',
      title: 'Q1 2026 beat · Frontier Power USA · S-3ASR shelf',
      body:  'Revenue $57.0M (+445% YoY), Adj. EPS $0.12 vs. −$0.22 consensus (beat by 154%). Cerberus JV formed with $100M anchor commitment. Stock spiked +30% pre-market, faded to flat by close.',
      url:   'https://investors.eose.com/news-releases/news-release-details/eos-energy-enterprises-reports-first-quarter-2026-financial'
    }
  ]
};
