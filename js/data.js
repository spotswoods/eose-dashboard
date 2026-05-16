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
    { customer: 'Frontier Power Ltd. (UK) — first order',  mwh: 228,    region: 'UK',       status: 'Delivering',   value: '~$114M*' },
    { customer: 'Frontier Power Ltd. (UK) — 5 GWh framework', mwh: 5000, region: 'UK',     status: 'Framework',     value: '~$2.5B*' },
    { customer: 'Frontier Power USA (Cerberus JV)',  mwh: 2000,    region: 'USA',      status: 'Contracted',   value: '~$900M*'  },
    { customer: 'TURBINE-X Energy (JDA, AI data center)', mwh: '≤2000', region: 'USA', status: 'Negotiation',  value: 'TBD (JDA)' },
    { customer: 'MN8 Energy',                        mwh: '~590',  region: 'USA',     status: 'Delivering',   value: '~$295M*'  },
    { customer: 'Indian Energy / Viejas microgrid',  mwh: 300,     region: 'USA (CA)', status: 'Contracted',   value: '~$150M*'  },
    { customer: 'Southeast utility (4hr→10hr expansion)', mwh: 'expanded', region: 'USA (SE)', status: 'Delivering', value: 'undisclosed' },
    { customer: 'NYSERDA NYC project (zinc-halide cited)', mwh: '~MW-scale', region: 'USA (NY)', status: 'Contracted', value: 'undisclosed' },
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
    { date: 'Spring 2026',  event: 'Ofgem publishes Initial Decision List for LDES Cap & Floor Window 1 (UK)', status: 'Watch [Regulator]',        tone: 'soon'   },
    { date: 'End Q2 2026',  event: 'Line 2 initial production at Thorn Hill (per Q1\'26 release)',          status: 'In progress [Company]',      tone: 'soon'   },
    { date: 'Q2 2026',      event: 'Frontier Power USA closing conditions · Eos ~$150M funding plan',      status: 'Watch [Company]',            tone: 'soon'   },
    { date: 'Summer 2026',  event: 'Ofgem final cap & floor awards Window 1 — 11 GWh Frontier UK pipeline uses Eos tech', status: 'Catalyst [Regulator]', tone: 'soon' },
    { date: '~Aug 2026',    event: 'Q2 2026 earnings release (estimated cadence)',                         status: 'Pending',                    tone: 'future' },
    { date: 'Q3 2026',      event: 'NYSERDA Bulk Storage Program ISCRFP25-1 awards (Eos qualifies for 8+ hr tier)', status: 'Catalyst [Regulator]', tone: 'soon' },
    { date: 'YE 2026',      event: 'Cerberus equity lock-up expiration (extended through year-end 2026)',  status: 'Confirmed [Company]',        tone: 'live'   },
    { date: 'YE 2026',      event: 'Treasury safe-harbor tables for 45X FEOC scoring (sets credit magnitude)', status: 'Watch [Regulator]',    tone: 'future' },
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

  // ────────── NEW: Frontier Power platform — TWO distinct entities ──────────
  // These are NOT the same company:
  //   Frontier Power Ltd. (UK) — energy infra developer founded 2009; signed
  //     a 5 GWh framework with Eos in April 2025; placed first 228 MWh order
  //     in October 2025; has ~11 GWh advancing in Ofgem's Cap & Floor LDES
  //     Window 1 (UK regulated revenue floor scheme).
  //   Frontier Power USA — newly formed with Cerberus on May 13, 2026 as a
  //     US IPP; $100M Cerberus + ~$150M Eos contingent commitment; 2 GWh
  //     anchor reservation; Ariel Green TPI wrap.
  // Same brand family, different vehicles. The "11 GWh" figure often quoted
  // belongs to the UK entity's Ofgem submissions, not the US IPP.
  frontierPlatform: {
    uk: {
      name:      'Frontier Power Ltd. (UK)',
      founded:   '2009',
      announced: 'MoU: April 15, 2025 · First order: October 31, 2025',
      summary:   'UK energy infrastructure developer (est. 2009). In April 2025 signed a 5 GWh framework agreement with Eos covering UK long-duration storage. Booked first 228 MWh order under that framework on Oct 31, 2025 — concurrently meeting the final Cerberus milestone of the prior £159M strategic partnership (PwC Corporate Finance advised).',
      why:       'The UK has Ofgem\'s Cap & Floor LDES scheme — a regulated revenue floor specifically designed to make non-lithium long-duration storage bankable. Frontier UK has 11 GWh of projects (all using Eos Z3 zinc-bromide tech) advancing through Window 1 of that scheme. Ofgem Initial Decision List due Spring 2026; final awards Summer 2026. Eos is a primary technology supplier to a leading applicant in a state-supported program.',
      terms: [
        { k: 'Framework agreement',         v: '5 GWh between Eos and Frontier UK (April 2025)' },
        { k: 'First order booked',          v: '228 MWh of Z3™ systems (Oct 31, 2025)' },
        { k: 'Cerberus → Frontier UK',      v: '£159M strategic partnership (PwC-advised), separate from US' },
        { k: 'Ofgem Cap & Floor pipeline',  v: '~11 GWh advancing in Window 1, all using Eos technology' },
        { k: 'Window 1 timeline',           v: 'Initial Decision Spring 2026 · Final awards Summer 2026' },
        { k: 'UK manufacturing exploration',v: 'Partnership "opens the door" to local Eos manufacturing in UK' },
        { k: 'Battery tech in scope',       v: 'Zinc-bromine (Eos) + vanadium flow — first-of-kind dual-tech program' }
      ],
      sources: [
        { label: '5 GWh MoU (Apr 2025)',         url: 'https://www.globenewswire.com/news-release/2025/04/15/3061738/0/en/Eos-Energy-and-Frontier-Power-Announce-5-GWh-Memorandum-of-Understanding-to-Advance-Long-Duration-Energy-Storage-in-the-United-Kingdom.html' },
        { label: '228 MWh first order (Oct 31, 2025)', url: 'https://investors.eose.com/news-releases/news-release-details/eos-energy-secures-strategic-228-mwh-order-frontier-power-under' },
        { label: 'PwC: Cerberus £159M into Frontier UK', url: 'https://www.pwc.co.uk/services/deals/recent-deals/pwc-corporate-finance-advises-frontier-power-on-strategic-partnership-with-cerberus-capital-management.html' }
      ]
    },
    us: {
      name:      'Frontier Power USA',
      founded:   'May 13, 2026',
      announced: 'May 13, 2026 (8-K Ex. 99.2)',
      summary:   'Stand-alone US development & investment company formed with Cerberus to build, own, and operate LDES projects deploying Eos\' Z3. Targeting Independent Power Producer (IPP) status. NOT to be confused with Frontier Power Ltd. (UK).',
      why:       'Combines (1) Eos\' vertically integrated technology, (2) Cerberus institutional capital + operating muscle, and (3) a Technology Performance Insurance (TPI) wrap arranged with Ariel Green that lets project lenders treat Z3 output as financeable — unlocking project-finance for LDES that historically has been unbankable at scale.',
      terms: [
        { k: 'Cerberus equity commitment',    v: '$100M (subject to closing conditions)' },
        { k: 'Eos target contribution',       v: '~$150M (subject to ability to raise funding + third-party approvals)' },
        { k: 'Anchor reservation',            v: '2 GWh firm capacity reservation agreement' },
        { k: 'Pipeline target',               v: 'Multi-GWh across data center, utility, and industrial end markets' },
        { k: 'Tech Performance Insurance',    v: 'Ariel Green specialty insurer (project-lender wrap)' },
        { k: 'Cerberus lock-up',              v: 'Extended through year-end 2026' },
        { k: 'Governance',                    v: 'Independent investment committee; arm\'s-length commercial terms with Eos' },
        { k: 'Additional debt financing',     v: 'Evaluating institutional placements (IG target) + commercial bank project facilities under TPI framework' }
      ],
      sources: [
        { label: 'Frontier Power USA 8-K (May 13)', url: 'https://www.sec.gov/Archives/edgar/data/1805077/000162828026034367/eosepressreleasefrontier.htm' },
        { label: 'Q1 2026 earnings release',          url: 'https://www.sec.gov/Archives/edgar/data/1805077/000162828026034367/eoseq1fy26earningsreleas.htm' }
      ]
    }
  },

  // ────────── NEW: Near-term decision window ──────────
  // Three regulatory decisions land within ~5 months, all touching Eos
  // hardware demand through the project-finance bottleneck. Framing rules:
  //   - State the window the regulator actually announced
  //   - Compute days-out to the END of that window (conservative upper bound)
  //   - Describe Eos exposure factually
  //   - Pair "upside" + "downside" + "base" outcomes equally — don't predict
  catalystWindow: {
    framing: 'Three regulatory decisions sit within the next ~5 months that touch the project-finance bottleneck LDES has always had. Eos hardware is in the application stack on all three. The decisions don\'t guarantee Eos revenue — they shape it, in both directions.',
    upcoming: [
      {
        targetEnd: '2026-06-20',
        anchor:    'Spring 2026',
        regulator: 'Ofgem (UK)',
        label:     'Initial Decision List · LDES Cap & Floor Window 1',
        eosExposure: 'Frontier UK\'s ~11 GWh of Eos-based projects either advance to the shortlist or don\'t. A "yes" doesn\'t commit revenue; a "no" prunes the UK pipeline materially.',
        kind: 'preliminary'
      },
      {
        targetEnd: '2026-09-22',
        anchor:    'Summer 2026',
        regulator: 'Ofgem (UK)',
        label:     'Final cap & floor awards · Window 1',
        eosExposure: 'Final regulated revenue floor for awarded UK LDES projects. This is when the Frontier UK pipeline either becomes financeable at scale or doesn\'t.',
        kind: 'final'
      },
      {
        targetEnd: '2026-09-30',
        anchor:    'Q3 2026',
        regulator: 'NYSERDA (NY State)',
        label:     'Bulk Storage ISCRFP25-1 awards',
        eosExposure: 'NYSERDA already cites Eos zinc-halide chemistry in at least one funded project. Award mix determines whether the 8+ hr tier flows to Eos or competing chemistries.',
        kind: 'final'
      }
    ],
    scenarios: {
      upside: 'Frontier UK wins meaningful Window 1 share AND NYSERDA awards include 8+ hr projects using Eos. Adds contracted volume above the current FY27 model; project finance becomes available for those volumes — historically the binding constraint.',
      base:   'Partial wins on one or both sides. Eos benefits even at ~25% of the UK pipeline. The information itself is the pivot — markets will reprice once the rankings are public, regardless of magnitude.',
      downside: 'Frontier UK shut out of Window 1 AND NYSERDA skews to Li-ion or other chemistries. Doesn\'t kill the thesis — Frontier USA + TURBINE-X + existing US contracts remain — but pushes the project-finance unlock 2–4 quarters right.'
    },
    sourceNote: 'Decision windows are the regulators\' own stated timing (Ofgem: Spring/Summer 2026 per the LDES Cap & Floor scheme page; NYSERDA: Q3 2026 per the ISCRFP25-1 program page). Days-out below count to the END of the stated window — they\'re upper bounds, not predictions.'
  },

  // ────────── NEW: Regulated demand programs (US + UK) ──────────
  // Both NYSERDA's Index Storage Credit and Ofgem's Cap & Floor are
  // government-backed revenue-floor mechanisms specifically designed to
  // de-risk long-duration storage project finance. Both have explicit
  // near-term decision dates that act as concrete catalysts for Eos.
  regulatedPrograms: {
    nyserda: {
      title:     'NYSERDA Bulk Energy Storage Program · Index Storage Credit (ISCRFP25-1)',
      framework: 'New York State (NYSERDA) competitive solicitation for bulk storage. Index Storage Credit (ISC) provides contracted project owners with a market-based revenue mechanism — effectively a regulated revenue floor — to fund the state\'s 6 GW by 2030 goal.',
      timeline: [
        { date: 'July 28, 2025',    event: 'NYSERDA issues inaugural Index Storage Credit solicitation (ISCRFP25-1)' },
        { date: 'January 29, 2026', event: 'Bid proposals due' },
        { date: 'February 2026',    event: 'Bid evaluation concluded' },
        { date: 'Q3 2026',          event: 'Awards announcement expected (concrete near-term catalyst)' }
      ],
      eosRelevance: 'NYSERDA requires 8+ hr duration projects to be at TRL 8 or higher — Eos Z3 qualifies. NYSERDA-funded NYC battery storage project already specifies "Zinc Halide chemistry from EOS Energy Technology" in its public project summary. Eos\' NYSERDA relationship dates to 2013 (Con Edison pilot + $1M commercialization award).',
      sources: [
        { label: 'NYSERDA Bulk Storage Program',       url: 'https://www.nyserda.ny.gov/All-Programs/Energy-Storage-Program/Developers-and-Contractors/Bulk-Storage-Incentives' },
        { label: 'ISCRFP25-1 launch (Jul 2025)',        url: 'https://www.nyserda.ny.gov/About/Newsroom/2025-Announcements/2025-07-28-Gov-Hochul-Announces-First-Bulk-Energy_Storage-Solicitation-NY-Energy-Roadmap' },
        { label: 'NYC project summary (cites Eos)',      url: 'https://www.nyserda.ny.gov/-/media/Project/Nyserda/Files/Programs/Energy-Storage/Bulk-Storage-Incentives/NYC-Energy-Battery-Storage-Project_Att_B_Public_Project_Summary.pdf' }
      ]
    },
    ofgem: {
      title:     'Ofgem Cap & Floor LDES Scheme · UK',
      framework: 'UK regulated revenue floor (and cap) for long-duration storage. Designed to make non-lithium LDES bankable for project lenders. First-of-its-kind in Europe — analogous in spirit to NYSERDA\'s ISC but with both floor and cap.',
      timeline: [
        { date: 'April 8, 2025',  event: 'Window 1 application opens' },
        { date: 'September 2025', event: '77 applications pass eligibility screening into Phase 2 (project assessment)' },
        { date: 'Spring 2026',    event: 'Ofgem publishes Initial Decision List (catalyst)' },
        { date: 'Summer 2026',    event: 'Final cap & floor awards (Window 1) — concrete catalyst' },
        { date: 'TBD (Q1 2026+)', event: 'Window 2 timing to be announced post-Window 1 learnings' }
      ],
      eosRelevance: 'Frontier Power Ltd. (UK) has ~11 GWh of LDES projects advancing in Window 1 — all using Eos Z3 zinc-bromide technology. Eos is also one of two battery technologies named in the Cerberus £159M / Frontier UK partnership (the other being vanadium flow). Award outcomes flow directly to Eos hardware demand.',
      sources: [
        { label: 'Ofgem LDES Cap & Floor decision page',  url: 'https://www.ofgem.gov.uk/decision/long-duration-electricity-storage-cap-and-floor-application-window-1' },
        { label: 'Modo Energy — Window 1 project ranking', url: 'https://modoenergy.com/research/gb-great-britain-long-duration-energy-electricity-storage-ldes-cap-floor-ofgem-eligibility-september-2025-assessment-bess' },
        { label: 'Linklaters — scheme primer',              url: 'https://sustainablefutures.linklaters.com/post/102k8od/super-batteries-a-look-at-ofgems-new-cap-and-floor-regime' }
      ]
    }
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

  // ────────── NEW: Bull / Bear scorecard ──────────
  // Equal real estate, equal point-count, every point evidenced.
  // The page is balanced when a skeptic could read this and feel heard.
  scorecard: {
    bull: [
      { point: 'Q1\'26 revenue +445% YoY with adj. EPS beating consensus by 154 ppt ($0.12 vs −$0.22). Two consecutive quarters now exceed full FY25.', src: 'Q1\'26 8-K' },
      { point: 'Pipeline $24.3B (+56% YoY); backlog $644.6M; post-quarter +2 GWh Frontier USA reservation. Demand isn\'t the constraint.', src: '10-Q + Frontier 8-K' },
      { point: 'UK pipeline: Frontier Power Ltd. has ~11 GWh advancing through Ofgem Cap & Floor Window 1, all using Eos Z3 tech. Initial Decision Spring 2026; final awards Summer 2026 — regulated revenue floor de-risks project finance.', src: 'Ofgem / Modo Energy' },
      { point: 'Cerberus is doubling down on BOTH sides of the Atlantic: $100M into Frontier USA + £159M earlier into Frontier UK. Lock-up extended through YE 2026.', src: 'Frontier releases · PwC UK' },
      { point: 'Margin trajectory: GM −78% Q1\'26, +157 ppt YoY, +16 ppt sequentially. Cube deliveries +5.7×. Operational leverage actually arriving.', src: 'Q1\'26 release' },
      { point: 'AI/data-center demand vector: TURBINE-X JDA targets up to 2 GWh of hyperscale capacity with first deployments 2027. NYSERDA ISC awards (Q3 2026) is another concrete near-term catalyst.', src: 'TURBINE-X release · NYSERDA' },
      { point: '45X PTC preserved under OBBBA with FEOC guardrails — structurally favors US-content LDES vs. China-linked competitors. $21.4M grant receivable on Q1\'26 BS.', src: 'OBBBA / 10-Q' },
      { point: 'Short interest ~28% of float; ~3.5 days to cover. CEO Mastrangelo bought 23,900 shares post-FY25 crash; Director Dimitrief bought 15,000 at $6.04. Asymmetric setup on any clean catalyst.', src: 'Nasdaq SI · Form 4 / OpenInsider' }
    ],
    bear: [
      { point: 'Op cash burn $119.7M in Q1\'26 alone. At that pace, $472M total cash is ~4 quarters runway absent new capital. S-3ASR shelf filed May 13 — secondary offering is a when, not if.', src: '10-Q cash flow + S-3ASR' },
      { point: 'GM still −78%. The path to mgmt\'s implied FY27 GM-positive requires both Line 2 ramping AND Z3 unit economics holding at higher volume. Neither proven yet.', src: 'Q1\'26 release' },
      { point: 'Active securities class action (Yung v. Eos, D.N.J. 26-cv-02372) alleging misrepresentation of FY25 production capacity. Settlement risk is material if certified.', src: 'court filings' },
      { point: 'Shares outstanding +18% trailing 12 months. Insiders sold $14M more than they bought over the same window — Stidolph $11.5M, Kroeker (interim CFO) $802k, Silberman (CLO) $739k.', src: 'OpenInsider / Simply Wall St' },
      { point: 'Customer concentration: 93.3% of Q1\'26 revenue from a handful of >10% customers. One project slip = guidance miss.', src: '10-Q footnotes' },
      { point: 'Frontier needs Eos to fund ~$150M — explicitly "subject to ability to raise funding." That funding likely comes from the shelf. Bear: dilution wrapped in growth story.', src: 'Frontier release language' },
      { point: 'No public hyperscaler customer despite the AI narrative. TURBINE-X is targeting hyperscalers; nothing closed. The "AI demand" thesis is bidding, not winning, today.', src: 'all public disclosures' },
      { point: 'JPMorgan cut PT $9→$6 (Neutral) post-FY25; Roth Capital $6 PT (Chip Moore). Consensus PT compressed from $9.71 to $8.86. Sell-side is skeptical.', src: 'JPMorgan, Roth Capital research' }
    ]
  },

  // ────────── NEW: Sentiment & positioning ──────────
  // Insider trades and short interest — concrete positioning data, mixed by nature.
  sentiment: {
    asOf: 'Latest available — verify links for live figures',
    shortInterest: {
      pctOfFloat:    '~28% (latest reported)',
      sharesShort:   '~88.7M',
      daysToCover:   '~3.5',
      interpretation: 'Elevated. Above 20% is the "potential squeeze" threshold; below 5 days-to-cover means a clean positive catalyst can move price hard. Bears argue the level is deserved given execution history.',
      source: 'https://www.nasdaq.com/market-activity/stocks/eose/short-interest'
    },
    insiders: {
      trailing12moNet: '−$14M (insiders sold $14M more than they bought)',
      recentBuys: [
        { date: '2026-03-04', name: 'Joe Mastrangelo (CEO)',          shares: 23900,  price: '~$5.20', value: '~$124k', kind: 'open-market buy' },
        { date: '2026-03-02', name: 'Alexander Dimitrief (Director)', shares: 15000,  price: '$6.04',  value: '~$91k',  kind: 'open-market buy' }
      ],
      recentSells: [
        { date: 'Trailing 12 mo', name: 'Russell M. Stidolph',         shares: 766134, price: '—',    value: '~$11.47M', kind: '4 sales' },
        { date: 'Trailing 12 mo', name: 'Nathan Kroeker (Interim CFO)',shares: 50000,  price: '~$16',  value: '~$802k',   kind: 'open-market sell' },
        { date: 'Trailing 12 mo', name: 'Marian Walters',              shares: 50000,  price: '~$16',  value: '~$790k',   kind: 'open-market sell' },
        { date: 'Trailing 12 mo', name: 'Michael Silberman (CLO)',     shares: 41667,  price: '~$18',  value: '~$739k',   kind: 'open-market sell' }
      ],
      summary: '13 insider trades in trailing 6 months: 4 buys, 9 sells. Reading: top of house (CEO + a director) bought at the lows; middle and senior leadership were net sellers when the stock was higher. Mixed signal — both directions are real.',
      source: 'http://openinsider.com/search?q=eose'
    },
    institutional: {
      summary: 'Cerberus is the dominant structural holder via Series B preferred ($582.7M), warrants ($203.5M related-party), and notes ($113.1M). Track 13D/A filings on EDGAR for changes — most recent Cerberus 13D/A filed May 14, 2026.',
      sources: [
        { label: 'EDGAR — all 13D/13G filings',                url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001805077&type=SC+13' },
        { label: 'MarketBeat — institutional ownership',         url: 'https://www.marketbeat.com/stocks/NASDAQ/EOSE/institutional-ownership/' },
        { label: 'Quiver Quantitative — institutional flows',     url: 'https://www.quiverquant.com/stock/EOSE/institutions/' }
      ]
    },
    retail: {
      summary: 'Stocktwits sentiment classified "extremely bullish" post-Q1\'26 print (per Stocktwits aggregated mention data). Pre-market spike to +30% on the Frontier announcement, faded toward flat by close — classic news-pop pattern.',
      source: 'https://stocktwits.com/symbol/EOSE'
    }
  },

  // ────────── NEW: Rumors & open debates ──────────
  // Each rumor: what's being said + what the evidence actually shows.
  // Goal: address the rumor without endorsing it.
  rumors: {
    bull: [
      {
        claim: 'A hyperscaler MOU is coming (Microsoft, Amazon, Google, or Meta).',
        evidence: 'No public evidence of a closed deal with any named hyperscaler. The TURBINE-X JDA (Apr 15, 2026) explicitly targets hyperscale data centers and references "multiple large-scale projects in active development" — but no customer named. Treat as plausible direction, not booked fact.'
      },
      {
        claim: 'Cerberus is positioning for a take-private or strategic buyout.',
        evidence: 'No filings indicate this. Cerberus IS expanding its structural position (Series B preferred, warrants, Frontier $100M anchor, lock-up extension through YE 2026). That setup gives Cerberus optionality but doesn\'t evidence an acquisition.'
      },
      {
        claim: 'Short squeeze imminent — 28% of float is short.',
        evidence: 'Short interest is real (~28%, ~3.5 days to cover per Nasdaq). Mechanically a squeeze is possible on any clean positive catalyst. But "possible" is not "imminent" — the stock has carried similar SI levels for months without breaking out.'
      },
      {
        claim: 'Frontier is a Cerberus-funded subsidy for Eos demand.',
        evidence: 'Partially fair framing: Cerberus is anchoring with $100M equity and structuring TPI-wrapped project finance that Eos couldn\'t access alone. But Eos must contribute ~$150M itself, and Frontier transactions will be arm\'s-length per the release. Not a free ride.'
      }
    ],
    bear: [
      {
        claim: 'A dilutive secondary offering is coming "any day" via the S-3ASR shelf.',
        evidence: 'The May 13 S-3ASR is a "well-known seasoned issuer" automatic shelf — gives the company unlimited capacity to issue. Combined with $119.7M Q1 op-cash burn + the ~$150M Frontier funding contingency, a raise within 6-12 months is the consensus expectation. Timing and pricing unknown. The shelf is real; the raise is highly likely but not yet announced.'
      },
      {
        claim: 'The Yung v. Eos lawsuit will cost the company $50M+ to settle.',
        evidence: 'No basis for any specific dollar figure yet. Typical securities class action settlements for companies at this market cap range from $5M to $50M+ depending on class size and merits. The case is in lead-plaintiff selection (deadline passed May 5, 2026). Years of litigation ahead.'
      },
      {
        claim: 'Eos won\'t close its $150M Frontier commitment.',
        evidence: 'The release itself says the contribution is "subject to the ability to raise funding and certain other third-party approvals." That language is explicit conditionality — bears are reading the disclosure correctly. The question is timing of the raise, not whether it\'s contingent.'
      },
      {
        claim: 'The path to GM-positive in FY27 is fantasy.',
        evidence: 'GM was −78% in Q1\'26. To reach positive in 6-7 quarters requires roughly +12-15 ppt per quarter of GM expansion — Q1\'26 delivered +16 ppt QoQ, so the trajectory is technically defensible at recent pace. But Q4\'25 → Q1\'26 GM improvement reflected one-time SBC/D&A timing; the underlying product margin path is the open question.'
      }
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
