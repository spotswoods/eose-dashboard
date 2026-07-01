// EOSE data — sourced from primary SEC filings (Q1 2026 10-Q + 8-K filed May 13, 2026).
// Projections beyond Q1'26 are model assumptions consistent with management's
// reaffirmed FY2026 guidance ($300–400M revenue). Not investment advice.
//
// Last refresh: 2026-06-12
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

  // ────────── Morning / evening note (refreshed twice daily by scheduled task) ──────────
  // Refreshed by /equity-research:morning-note via a scheduled task in Cowork.
  // session = 'pre-open' (Swedish AM, ~07:00 CEST) | 'post-close' (Swedish PM, ~22:30 CEST)
  morningNote: {
    updatedAt: '2026-07-01T07:30:00+02:00',
    session:   'pre-open',
    headline:  'Rights Record Date Is TODAY — FPUSA Equity Stack Reaches $375M',
    takeaway:  'Today July 1 is the rights offering record date (5:00 PM ET); rights distribute tomorrow (Jul 2). Hudson Bay\'s $75M registered-direct into Eos + $50M into FPUSA (both priced Jun 30) completes a three-institution equity stack of ~$375M, structured to support >$1.5B in project deployment.',
    bullets: [
      'Record date live today at 5:00 PM ET — eligible holders of common stock and qualified warrants receive rights tomorrow (Jul 2) to subscribe at $5.481/unit (1 share + 0.4388 warrant, 10-yr cashless). Each right buys ~0.0714 of a Unit; over-subscription available.',
      'FPUSA equity now ~$375M: Cerberus $100M (Class A) + Hudson Bay $75M registered-direct + HBC $50M into JV (Class C) + Eos ~$150M via rights offering. At ~75% LTV the platform targets >$1.5B in deployable project capital — the largest LDES private-equity stack in the US.',
      'Pipeline execution moving: ~16 GWh FPUSA portfolio, 2.7 GWh high-probability conversion, ~1.2 GWh ready to sign; KKR Capital Markets building scalable project-finance framework; Ariel Green $1.5B tech-performance insurance in place. A portion near NTP in near term.',
      'Jun 30 tape: EOSE closed ~$5.89 (-3.3%) on dilution-overhang selling tied to the registered-direct pricing; pre-market Jul 1 showing ~$6.00, a partial recovery as known dilution replaces the open-ended overhang that weighed on shares the prior week.',
      'Subscribe-or-dilute decision opens tomorrow: rights at $5.481 are ~8% below ~$6.00 pre-market — economically rational to participate for FPUSA believers. HBC entered on these exact same terms. Non-subscribers face dilution from rights + ~30M new CCM/HBC warrants.'
    ],
    price:   { last: 6.00, changePct: null, note: 'Pre-market ~$6.00 (Jul 1); Jun 30 close ~$5.89 / -3.3% (dilution selling on registered-direct pricing)' },
    sources: [
      { label: 'Eos — Updated Rights Offering Terms (Jun 30)', url: 'https://www.globenewswire.com/news-release/2026/06/30/3319575/0/en/Eos-Energy-Announces-Updated-Terms-for-Rights-Offering.html' },
      { label: 'Eos — $125M Hudson Bay Investment, FPUSA equity to $375M (Jun 30)', url: 'https://www.globenewswire.com/news-release/2026/06/30/3319576/0/en/Eos-Announces-125-Million-Investment-for-Frontier-Power-USA-Bringing-Expected-Frontier-Equity-Investment-up-to-375-Million.html' },
      { label: 'SEC EDGAR — EOSE 8-K filings', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001805077&type=8-K' },
      { label: 'Eos Energy IR — news releases', url: 'https://investors.eose.com/news-releases/' }
    ]
  },

  // ────────── Live news feed (refreshed twice daily by scheduled routine) ──────────
  // Populated by CCR routines: pre-open 07:30 CEST, post-close 22:30 CEST (Mon–Fri).
  // Each item: { date, source, headline, url, summary, tag }
  // tag: 'catalyst' | 'sec-filing' | 'analyst' | 'general'
  newsItems: {
    updatedAt: '2026-05-28T20:30:00+02:00',
    session:   'post-close',
    items: [
      {
        date:     'May 28, 2026',
        source:   'GlobeNewsWire',
        headline: 'FPUSA and Stella Energy Solutions Announce Strategic Framework Across 2+ GWh Storage Pipeline',
        url:      'https://finance.yahoo.com/sectors/energy/articles/fpusa-stella-energy-solutions-announce-113000300.html',
        summary:  'Frontier Power USA names Stella its designated execution partner for LDES development and gains exclusive evaluation rights on Stella\'s 2+ GWh late-stage BESS pipeline — anchored in ERCOT, Texas. FPUSA will fund 100% of construction equity for eligible projects upon full capitalisation.',
        tag:      'catalyst'
      },
      {
        date:     'May 21, 2026',
        source:   'GlobeNewsWire',
        headline: 'FPUSA Converts 480 MWh of Long-Duration Energy Storage Projects from the Bimergen Energy Portfolio',
        url:      'https://www.globenewswire.com/news-release/2026/05/21/3299183/0/en/FPUSA-Converts-480-MWh-of-Long-Duration-Energy-Storage-Projects-from-the-Bimergen-Energy-Portfolio.html',
        summary:  'Frontier Power USA acquired and converted 480 MWh of late-stage BESS development projects from Bimergen Energy Corporation onto the FPUSA platform — the first concrete pipeline conversion since the JV was announced on May 13.',
        tag:      'catalyst'
      },
      {
        date:     'May 22, 2026',
        source:   'Needham',
        headline: 'Needham Initiates Eos Energy at Buy with $11 Price Target',
        url:      'https://stockanalysis.com/stocks/eose/forecast/',
        summary:  'Analyst Sean Milligan initiated coverage with a Buy rating and $11 PT — the highest on the Street — citing the Frontier Power USA JV and Q1 beat as transformative catalysts.',
        tag:      'analyst'
      },
      {
        date:     'May 19, 2026',
        source:   'J.P. Morgan',
        headline: 'J.P. Morgan Raises EOSE Price Target from $6 to $9, Maintains Neutral',
        url:      'https://stockanalysis.com/stocks/eose/forecast/',
        summary:  'Mark Strouse raised the PT 50% to $9 reflecting improved near-term visibility following the Q1 beat and Frontier Power USA announcement, while keeping a Neutral on execution risk.',
        tag:      'analyst'
      },
      {
        date:     'May 14, 2026',
        source:   'Stifel / TD Cowen',
        headline: 'Stifel Maintains Buy/$12, TD Cowen Raises to $8 — Post Q1 Analyst Roundup',
        url:      'https://stockanalysis.com/stocks/eose/forecast/',
        summary:  'Stifel (Stephen Gengaro) maintained Buy/$12. TD Cowen (Jeff Osborne) raised to $8 from $7. Roth MKM kept $6. Consensus PT now ~$9.43 across 10 analysts.',
        tag:      'analyst'
      },
      {
        date:     'May 13, 2026',
        source:   'Eos Energy IR',
        headline: 'Q1 2026: Revenue $57M (+445% YoY), Surprise EPS Beat of $0.12 vs. −$0.22 Consensus',
        url:      'https://www.stocktitan.net/news/EOSE/eos-energy-enterprises-reports-first-quarter-2026-financial-results-3n7ulb6smcd9.html',
        summary:  'Record production quarter with backlog of $644.6M and commercial pipeline of $24.3B. FY26 guidance of $300–400M reaffirmed. Adj. EPS beat by 154%.',
        tag:      'catalyst'
      },
      {
        date:     'May 13, 2026',
        source:   'Eos Energy / Cerberus',
        headline: 'Frontier Power USA Announced — Cerberus $100M Equity + Eos $150M Rights Offering for 2 GWh LDES Platform',
        url:      'https://www.stocktitan.net/news/EOSE/eos-energy-enterprises-and-cerberus-capital-management-announce-8d69f2s1x83w.html',
        summary:  'Frontier Power USA will deploy Eos Z3 zinc-bromide batteries at scale targeting data-center and utility customers. Closing contingent on DOE consent and authorized-share shareholder vote.',
        tag:      'catalyst'
      },
      {
        date:     'Apr 30, 2026',
        source:   'Eos Energy IR',
        headline: 'Eos Energy Appoints Alessandro Lagi as Chief Financial Officer',
        url:      'https://www.stocktitan.net/news/EOSE/eos-energy-enterprises-appoints-alessandro-lagi-as-chief-financial-jlj1mso677q5.html',
        summary:  'Lagi joins as CFO to lead financial strategy as the company scales manufacturing and closes the Frontier Power USA joint venture.',
        tag:      'general'
      },
      {
        date:     'Apr 15, 2026',
        source:   'Eos Energy / TURBINE-X',
        headline: 'Eos Energy & TURBINE-X Launch Private Power Infrastructure for AI Hyperscale Data Centers',
        url:      'https://www.stocktitan.net/news/EOSE/eos-energy-enterprises-turbine-x-launch-private-power-infrastructure-m4humszjfvgf.html',
        summary:  'JDA targets up to 2 GWh of Eos Indensity storage paired with gas-fired generation for AI data center customers. Initial deployments targeted for 2027.',
        tag:      'catalyst'
      }
    ]
  },

  // ────────── KPI strip — Q1'26 actuals ──────────
  // accent drives the card's left border (meaning-tied): pos | warn | neg | info
  kpis: [
    { label: 'Q1\'26 Revenue',      value: '$57.0M',     delta: '+445% YoY · cube deliv. +5.7×', tone: 'up',   accent: 'pos'  },
    { label: 'Adj. EPS surprise',   value: '$0.12',      delta: 'vs. −$0.22 cons. · beat 154%',  tone: 'up',   accent: 'pos'  },
    { label: 'Backlog (3/31/26)',   value: '$644.6M',    delta: '2.6 GWh · +2 GWh Frontier',     tone: 'up',   accent: 'pos'  },
    { label: 'Commercial Pipeline', value: '$24.3B',     delta: 'Proposals + LOIs · +56% YoY · not contracted', tone: 'up', accent: 'info' },
    { label: 'Total Cash',          value: '$472.4M',    delta: 'Q1 op. cash flow: −$119.7M',    tone: 'flat', accent: 'neg'  },
    { label: 'FY26 Guidance',       value: '$300–400M',  delta: 'Reaffirmed Q1\'26',              tone: 'up',   accent: 'warn' }
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

  // ────────── Manufacturing build-out roadmap (§06 visual) ──────────
  // Line-by-line status + the company-stated capacity ladder. Distinguishes
  // what's OPERATING from what's FUNDED (Project AMAZE / DOE Title 17 loan) from
  // what's a dashboard MODEL assumption. The 8 GWh-by-2027 and 4 GWh-by-end-2026
  // milestones are company/DOE-stated; the ~11 GWh full build-out is our model
  // (matches the `capacity` FY28 column above: 2+2+2.5+2.5+2 = 11).
  productionLines: {
    asOf: 'June 16, 2026',
    // Capacity ladder — `stated:true` = company/DOE-stated, false = dashboard model.
    milestones: [
      { when: 'Mid-2026 (now)', gwh: 2,  stated: true,  note: 'Line 1 at ~2 GWh nameplate, ramping to full output' },
      { when: 'End 2026',       gwh: 4,  stated: true,  note: 'Lines 1 + 2 combined — Line 2 commercial since Jun 16, full run-rate Q4\'26' },
      { when: '2027',           gwh: 8,  stated: true,  note: 'Project AMAZE adds capacity (DOE-backed) — company-stated 8 GWh target' },
      { when: 'FY28',           gwh: 11, stated: false, note: 'Full five-line build-out — dashboard model assumption, not company guidance' }
    ],
    peakGwh: 11,   // scale reference for the bars
    lines: [
      { name: 'Line 1',    gwh: 2.0, status: 'Ramping to full',          tone: 'live',   site: 'Turtle Creek (Thorn Hill), PA',
        note: 'Commercial since 2024. Exceeded its entire FY2025 output in the first 164 days of 2026 — the replication blueprint for every line that follows.' },
      { name: 'Line 2',    gwh: 2.0, status: 'Commercial · Jun 16, 2026', tone: 'live',   site: 'Turtle Creek (Thorn Hill), PA',
        note: 'Launched commercial production after Site Acceptance Testing, ahead of the end-Q2 target. Full run-rate targeted Q4 2026; layout cuts raw-material travel ~86% and line length ~40% vs. Line 1.' },
      { name: 'Lines 3–4', gwh: 4.0, status: 'Funded · Project AMAZE',    tone: 'funded', site: 'Marshall Township, PA — new 432,000 sq ft plant',
        note: 'The expansion leg of the $500M Project AMAZE, backed by a $303.5M U.S. DOE Title 17 loan (closed Dec 2024). Takes total capacity to a company-stated ~8 GWh by 2027; new plant complements the existing Turtle Creek site.' },
      { name: 'Line 5+',   gwh: 3.0, status: 'Modeled · not guidance',    tone: 'model',  site: 'TBD — additional Duquesne, PA lines possible',
        note: 'Dashboard model assumption toward ~11 GWh full build-out. Additional Duquesne lines may join the DOE loan guarantee pending LPO approvals and a NEPA Environmental Assessment.' }
    ],
    sources: [
      { label: 'Line 2 commercial production (Jun 16, 2026)', url: 'https://www.stocktitan.net/news/EOSE/eos-energy-enterprises-launches-commercial-production-at-second-v3wz0x81mbo8.html' },
      { label: 'Project AMAZE — $500M program', url: 'https://www.eose.com/eos-energy-enterprises-announces-project-amaze-a-500m-program-to-address-long-duration-energy-storage-demand/' },
      { label: '$303.5M DOE Title 17 loan close (Dec 2024)', url: 'https://investors.eose.com/news-releases/news-release-details/eos-energy-closes-3035-million-loan-guaranteed-us-department' },
      { label: 'DOE Loan Programs Office — Eos', url: 'https://www.energy.gov/edf/eos' },
      { label: 'Marshall Township plant (Oct 2025)', url: 'https://www.solarpowerworldonline.com/2025/10/eos-energy-to-build-second-zinc-battery-storage-manufacturing-plant-in-pittsburgh/' }
    ]
  },

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
    { stage: '+ Frontier USA 2 GWh reservation @ $225/kWh', value: 450,    label: '~$450M*' },
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
    // 2 GWh Frontier USA at $225/kWh = ~$450M added to Q1'26 backlog of $644.6M
    { q: '2Q26', v: 1095.0, type: 'projected' }
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
    // Frontier USA 2 GWh @ $225/kWh = ~$450M. Prior estimate used $450/kWh
    // which was out of line with Eos historical pricing (~$250/kWh per Iceberg
    // Research) and current LDES market benchmarks. See contracts methodology.
    { q: '2Q26', v: 450.0, type: 'projected' }
  ],

  // ────────── Contracts ──────────
  // Documented (publicly-named) Eos counterparties + post-Q1'26 deal additions.
  // All $ values marked * are conservative model estimates from disclosed MWh ×
  // $225/kWh. The $225 figure is anchored to two data points:
  //   - Iceberg Research (Oct 2024) documented Eos pricing at $250-$255/kWh
  //     from 1Q21-2Q24, with Pine Gate MSA "similarly priced at approximately
  //     $250/kWh"
  //   - BloombergNEF 2025 Li-ion BESS turnkey average: $117/kWh globally
  //     ($150/kWh in US), so $225/kWh represents a modest LDES premium —
  //     defensible, not aggressive
  // We use $225 (vs. $250 historical) to be conservative given continued
  // industry-wide price compression. Eos does not publicly disclose per-kWh
  // pricing on individual contracts.
  contracts: [
    { customer: 'Frontier Power Ltd. (UK) — first order',  mwh: 228,    region: 'UK',       status: 'Delivering',   value: '~$51M*' },
    { customer: 'Frontier Power Ltd. (UK) — 5 GWh framework', mwh: 5000, region: 'UK',     status: 'Framework',     value: '~$1.1B*' },
    { customer: 'Frontier Power USA — Redbird (first firm PO, ERCOT, in Bimergen portfolio)', mwh: 400, region: 'USA (TX)', status: 'Firm PO — Jun 18', value: '~$90M*' },
    { customer: 'Frontier Power USA — Bimergen Texas portfolio (3 ERCOT projects, incl. Redbird)', mwh: 480, region: 'USA (TX)', status: 'Converting — NTPs mid-2026', value: '~$108M*' },
    { customer: 'Frontier Power USA — remaining capacity reservation',                mwh: 1520, region: 'USA',     status: 'Reservation',          value: '~$342M*'  },
    { customer: 'Bridgelink — master supply agreement (FPUSA pipeline)',               mwh: 1000, region: 'USA',     status: '~50% fulfilled',       value: '~$225M*'  },
    { customer: 'CAPAC Energy — DACH master supply agreement (Indensity)', mwh: 750, region: 'Germany/AT/CH', status: 'Framework (MSA)', value: '~$169M*' },
    { customer: 'TURBINE-X Energy (JDA, AI data center)', mwh: '≤2000', region: 'USA', status: 'Negotiation',  value: 'TBD (JDA)' },
    { customer: 'MN8 Energy',                        mwh: '~590',  region: 'USA',     status: 'Delivering',   value: '~$133M*'  },
    { customer: 'Indian Energy / Viejas microgrid',  mwh: 300,     region: 'USA (CA)', status: 'Contracted',   value: '~$68M*'  },
    { customer: 'Southeast utility (4hr→10hr expansion)', mwh: 'expanded', region: 'USA (SE)', status: 'Delivering', value: 'undisclosed' },
    { customer: 'NYSERDA NYC project (zinc-halide cited)', mwh: '~MW-scale', region: 'USA (NY)', status: 'Contracted', value: 'undisclosed' },
    { customer: 'Other publicly-disclosed counterparties', mwh: '~500', region: 'USA / mixed', status: 'Mixed', value: '~$110M*' }
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
    { date: 'Apr 30, 2026', event: 'CFO appointment announced: Alessandro Lagi (from Johnson Controls, prior Baker Hughes)',  status: 'Reported [Company]',     tone: 'done'   },
    { date: 'May 13, 2026', event: 'Q1 2026 earnings · Frontier Power USA formation · S-3ASR shelf filed', status: 'Reported [Company]',         tone: 'done'   },
    { date: 'May 21, 2026', event: 'FPUSA converts 480 MWh from Bimergen (3 ERCOT projects) — first deployment under the 2 GWh reservation', status: 'Reported [Counterparty]', tone: 'done' },
    { date: 'Jun 18, 2026', event: 'First firm purchase order under FPUSA\'s 2 GWh reservation — Redbird (100 MW / 400 MWh, ERCOT, Z3); release also cites ~50% of a 1 GWh Bridgelink MSA fulfilled + 12 GWh dev pipeline (ERCOT/PJM/CAISO/MISO)', status: 'Reported [Company]', tone: 'done' },
    { date: 'Jun 22, 2026', event: 'Independent fire testing (Energy Safety Response Group) confirms Z3 system — no thermal runaway, no sustained fire, no propagation, no off-gas ignition; Eos also earns ISO 14001 certification', status: 'Reported [Company]', tone: 'done' },
    { date: 'Mid-2026',     event: 'Notices-to-Proceed (NTPs) on the 480 MWh Texas portfolio',              status: 'Watch [Counterparty]',     tone: 'soon'   },
    { date: 'Jun 8, 2026',  event: 'Lagi CFO effective date · Kroeker returns to CCO-only role',           status: 'Imminent [Company]',         tone: 'soon'   },
    { date: 'Jun 26, 2026', event: 'Ofgem "minded-to" (provisional) LDES Window 1 decisions — only 16 of 73 projects (7,645 MW) provisionally awarded; of Frontier UK\'s ~16 projects (~2.6 GW), just ONE (Frontier Legacy, 65 MW) made the list — and the doc\'s "VFB/Zn" category does not confirm Eos vs Invinity tech. A miss for the UK leg. Consultation to Aug 7', status: 'Reported [Regulator]', tone: 'soon' },
    { date: 'Jun 30, 2026', event: 'FPUSA JV recapitalised (8-K + 424B5): Hudson Bay Capital joins as third partner ($50M Class C + registered direct of Eos stock/warrants); rights offering PRICED at $5.481/unit (1 share + 0.4388 warrant, $5.481 strike); DOE + Cerberus-lender consents OBTAINED', status: 'Reported [Company]', tone: 'done' },
    { date: 'Jun 16, 2026', event: 'Line 2 LAUNCHED commercial production at Thorn Hill (after Site Acceptance Testing) — ahead of the end-Q2 target; ~4 GWh combined run-rate targeted by end-2026', status: 'Reported [Company]', tone: 'done' },
    { date: 'Jun 17, 2026', event: 'Germany/DACH entry: binding Master Supply Agreement with CAPAC Energy — exclusive Germany/Austria/Switzerland through 2031, 750 MWh committed (pathway to 2 GWh), first international Indensity framework; first projects target commercial ops late 2026', status: 'Reported [Company]', tone: 'done' },
    { date: 'Late 2026',    event: 'CAPAC\'s first German Indensity projects target commercial operation — purchase orders flow into reported backlog',  status: 'Watch [Counterparty]',  tone: 'soon' },
    { date: 'Jun 25, 2026', event: 'Frontier Power USA engages KKR Capital Markets as structuring agent — construction finance, tax equity + long-term project finance for the 2 GWh pipeline; de-risks FPUSA capitalisation alongside Cerberus\' $100M equity', status: 'Reported [Counterparty]', tone: 'done' },
    { date: 'Jul 1, 2026',  event: 'Rights offering record date (5 pm ET; announced Jun 11) — rights distributed Jul 2; units of stock + warrants at ~10–20% VWAP discount; exact ratio/price in the prospectus supplement', status: 'Announced [Company]', tone: 'soon' },
    { date: 'Q2 2026',      event: 'Frontier Power USA closing conditions (Cerberus warrants + controlling JV equity)',      status: 'Watch [Company]',            tone: 'soon'   },
    { date: 'After Aug 7, 2026', event: 'Ofgem FINAL cap & floor awards (Window 1) — follows the Aug 7 consultation close; this is the binding step where Frontier UK\'s Eos-tech projects are awarded the revenue floor or not', status: 'Catalyst [Regulator]', tone: 'soon' },
    { date: 'Jul 29, 2026', event: 'Q2 2026 earnings release (indicated)',                                  status: 'Scheduled [Company]',        tone: 'soon'   },
    { date: 'Q3 2026',      event: 'NYSERDA Bulk Storage Program ISCRFP25-1 awards (Eos qualifies for 8+ hr tier)', status: 'Catalyst [Regulator]', tone: 'soon' },
    { date: 'YE 2026',      event: 'Cerberus equity lock-up expiration (extended through year-end 2026)',  status: 'Confirmed [Company]',        tone: 'live'   },
    { date: 'YE 2026',      event: 'Treasury safe-harbor tables for 45X FEOC scoring (sets credit magnitude)', status: 'Watch [Regulator]',    tone: 'future' },
    { date: '2026–27',      event: 'TURBINE-X JDA execution (gas + storage hybrid, up to 2 GWh)',          status: 'Signed JDA [Company]',       tone: 'live'   },
    { date: 'FY2026',       event: 'Revenue $300–400M (management guidance, reaffirmed at Q1\'26)',        status: 'Guidance [Company]',         tone: 'live'   },
    { date: 'FY2027',       event: 'Gross margin positive — our model assumption, not company guidance',   status: 'Projected [Model]',          tone: 'future' },
    { date: 'FY2027–28',    event: 'Operating income breakeven — our model assumption, not company guidance', status: 'Projected [Model]',       tone: 'future' }
  ],

  // ────────── Key dates — concrete calendar entries (Today strip + .ics download) ──────────
  // Only events with a real YYYY-MM-DD belong here (the fuzzy ones live in
  // `catalysts` above). `est: true` marks window-end estimates (regulator
  // windows, earnings cadence) vs. announced/company-stated dates. Past dates
  // are filtered out automatically — append new ones as they're announced.
  // `short` is the compact chip label; `label` goes in the calendar file.
  keyDates: [
    { date: '2026-08-07', short: 'Ofgem consult close', est: false,
      label: 'Ofgem LDES Window 1 — minded-to consultation closes',
      detail: 'Ofgem published its "minded-to" (provisional) Window 1 cap & floor decisions on Jun 26, 2026; consultation runs to Aug 7, ahead of final binding awards. Confirm Frontier UK\'s Eos-tech project status against Ofgem\'s project list.' },
    { date: '2026-06-23', short: 'JPM conference',      est: false,
      label: 'J.P. Morgan Energy & Natural Resources Conference',
      detail: 'CEO fireside + 1x1s expected — the likely venue for rights-offering structure/timing color and CFO Lagi\'s first public investor appearance.' },
    // Line 2 initial-production target (was 2026-06-30) — ACHIEVED EARLY: commercial
    // production launched Jun 16, 2026. Removed from the upcoming-dates strip; the
    // milestone now lives in §06 Production and the news feed.
    { date: '2026-07-01', short: 'Rights record date',  est: false,
      label: 'Rights offering record date (5:00 pm ET)',
      detail: 'Holders of record as of 5 pm ET July 1 receive subscription rights for the ~$150M offering; announced June 11, 2026.' },
    { date: '2026-07-02', short: 'Rights distribution', est: false,
      label: 'Rights distribution date',
      detail: 'Subscription rights distributed to eligible holders; final ratio, price and transferability are set in the prospectus supplement at offering commencement.' },
    { date: '2026-07-29', short: 'Q2 earnings',  est: false,
      label: 'Q2 2026 earnings release',
      detail: 'Indicated for July 29, 2026. Street will watch the Line 1+2 production ramp and the first FPUSA reservation-to-revenue conversion.' },
    { date: '2026-09-22', short: 'Ofgem final awards',  est: true,
      label: 'Ofgem final cap & floor awards — Window 1',
      detail: 'Estimated timing for the FINAL, binding awards that follow the Aug 7 consultation close. Decides the regulated revenue floor for Frontier UK\'s Eos-tech pipeline.' },
    { date: '2026-09-30', short: 'NYSERDA awards',      est: true,
      label: 'NYSERDA Bulk Storage ISCRFP25-1 awards expected',
      detail: 'End of NYSERDA\'s stated Q3 2026 window (estimate). Eos qualifies for the 8+ hour duration tier.' }
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

  // (Static 'news' array retired — superseded by the auto-refreshed §01b EOSE
  //  News Feed and §03a Frontier Power USA news. §11 is now SEC filings only.)

  // ────────── Risk factors — focused bear thesis ──────────
  risks: [
    { title: 'Cash burn vs. shelf timing + rights offering',
      body: 'Total cash fell $152M from Q4\'25 ($624.6M) to Q1\'26 ($472.4M). On top of the S-3ASR shelf filed May 13, Eos announced it intends to fund its ~$150M Frontier USA contribution via a pro-rata rights offering to existing shareholders (subscription rights + warrants). The structure is designed to limit dilution for participating shareholders, but anyone who skips the rights offering will be diluted. Watch announcement of rights pricing, subscription period, and Cerberus\' warrant terms.' },
    { title: 'Cerberus structural dominance',
      body: 'Cerberus holds Series B preferred ($582.7M), warrant liabilities ($203.5M related-party), and convertible notes ($113.1M). The Series B remeasurement was +$778.9M in Q1\'26 alone — these are non-cash but the conversion math drives common-share dilution over time.' },
    { title: 'Customer concentration',
      body: 'In Q1\'26, 93.3% of revenue came from a handful of customers each individually >10% of total. Any single project slip materially moves quarterly numbers — even prior to Frontier becoming a counterparty itself.' },
    { title: 'Frontier funding execution',
      body: 'Frontier Power USA requires Eos to contribute ~$150M alongside Cerberus\' $100M. The release explicitly states this is "subject to the ability to raise funding" — an explicit dependence on capital markets access.' },
    { title: 'Margin trajectory',
      body: 'GM still −78% in Q1\'26. Line 2 reached commercial production Jun 16, 2026 — but the path to break-even still requires it to RAMP to full run-rate AND Z3 unit economics holding up at higher cube volumes. Commissioning is the start of that, not the finish. Watch fixed-cost absorption per cube.' },
    { title: 'Round-trip efficiency vs. Li-ion',
      body: 'Z3 RTE of ~75–80% vs. Li-ion ~85–90%. Eos wins where duration >6h or where safety/cycle-life offsets the RTE gap. Watch project-mix duration distribution.' },
    { title: 'IRA / 45X policy risk',
      body: '$21.4M 45X PTC grant receivable on the balance sheet; the credit is currently accrued as a COGS offset. A material policy reversal would compress reported GM by several hundred basis points.' },
    { title: 'Execution & uptime',
      body: 'Production uptime was 51.4% in Q4\'25. Line 2 is now commissioned (Jun 16, 2026), but sustained yields on Line 1 plus a clean Line 2 ramp remain operational risks. Slippage on either materially affects the FY26 guidance bridge.' }
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
      why:       'The UK has Ofgem\'s Cap & Floor LDES scheme — a regulated revenue floor specifically designed to make non-lithium long-duration storage bankable. Frontier UK has 11 GWh of projects (all using Eos Z3 zinc-bromide tech) that passed Window 1 eligibility and are in the second-round Project Assessment phase — approval not yet awarded. Ofgem Initial Decision List due Spring 2026; final awards Summer 2026. Eos is a primary technology supplier to a leading applicant in a state-supported program.',
      terms: [
        { k: 'Framework agreement',         v: '5 GWh between Eos and Frontier UK (April 2025)' },
        { k: 'First order booked',          v: '228 MWh of Z3™ systems (Oct 31, 2025)' },
        { k: 'Cerberus → Frontier UK',      v: '£159M strategic partnership (PwC-advised), separate from US' },
        { k: 'Ofgem Cap & Floor pipeline',  v: '~11 GWh in Window 1 second-round evaluation (approval pending), all using Eos technology' },
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
      summary:   'Stand-alone US development & investment company (JV entity: Frontier Power USA Parent, LLC) to build, own, and operate LDES projects deploying Eos\' Z3. Targeting Independent Power Producer (IPP) status. NOT to be confused with Frontier Power Ltd. (UK). A binding amended-and-restated term sheet (Jun 30, 2026) made it a THREE-way JV — Eos, Cerberus (CCM Frontier) and Hudson Bay Capital (HBC).',
      why:       'Combines (1) Eos\' vertically integrated technology, (2) institutional capital + operating muscle from TWO top-tier backers — Cerberus and now Hudson Bay Capital — plus KKR Capital Markets as structuring agent (Jun 25), and (3) a Technology Performance Insurance (TPI) wrap arranged with Ariel Green that lets project lenders treat Z3 output as financeable — unlocking project-finance for LDES that historically has been unbankable at scale.',
      terms: [
        { k: 'JV structure (A&R term sheet, Jun 30, 2026)', v: 'Three-way preferred-unit JV at $1.00/unit: Cerberus = Class A (founder equity + $100M Class A-2) + 20.0M CCM warrants; Hudson Bay (HBC) = $50M Class C + 10.0M HBC warrants; Eos = Class B, funded by (HBC registered-direct proceeds + rights-offering proceeds).' },
        { k: 'First deployment (May 21, 2026)', v: '480 MWh portfolio acquired from Bimergen Energy Corp. (NYSE: BESS) — 3 ERCOT projects (2× ~40 MWh "Texas 10" + 1× 100MW/400MWh). FPUSA holds 92.5%, Bimergen retains 7.5%. NTPs expected mid-2026. Stella Energy Solutions execution partner. First firm PO (Redbird, 400 MWh) booked Jun 18, 2026.' },
        { k: 'Cerberus commitment',           v: '$100M (Class A-2) + founder equity (Class A-1) + a CCM warrant (20,017,772 warrants); controlling stake' },
        { k: 'Hudson Bay (HBC) commitment',   v: 'NEW (Jun 30): $50M directly into the JV (Class C) + a registered direct purchase of Eos stock & warrants + an HBC warrant (10,008,886 warrants)' },
        { k: 'Eos target contribution',       v: '~$150M+ as Class B — funded by net proceeds of (a) the HBC registered direct offering and (b) the pro-rata rights offering to existing shareholders' },
        { k: 'Rights offering (priced Jun 30)', v: '$5.481 per unit = 1 Eos share + 0.4388 warrant; warrant strike $5.481, 10-yr, cashless; over-subscription right; $150M target' },
        { k: 'Closing conditions',            v: 'DOE consent — OBTAINED (2nd + 3rd Limited Consents, Jun 26 & 29); Cerberus lender consent — OBTAINED (Jun 29). Remaining: complete the rights offering + a Commercial Framework.' },
        { k: 'Anchor reservation',            v: '2 GWh firm capacity reservation agreement (480 MWh deployed May 21, 2026; 1,520 MWh remaining)' },
        { k: 'Pipeline target',               v: 'Multi-GWh across data center, utility, and industrial end markets' },
        { k: 'Tech Performance Insurance',    v: '~$1.5B project-level capacity · 15-year non-cancellable · written through Lloyd\'s of London consortium (A+/AA-) · arranged with Ariel Green (a division of Ariel Re)' },
        { k: 'Why the TPI matters',           v: 'The wrap allows Frontier USA project debt to achieve investment-grade characteristics at competitive terms — solves the LDES bankability bottleneck' },
        { k: 'Cerberus lock-up',              v: 'Extended through year-end 2026' },
        { k: 'Governance',                    v: 'Independent investment committee; arm\'s-length commercial terms with Eos; separates project capital from Eos\' corporate balance sheet' },
        { k: 'Additional debt financing',     v: 'Evaluating institutional placements (IG target) + commercial bank project facilities under TPI framework' }
      ],
      sources: [
        { label: 'Frontier Power USA 8-K (May 13)', url: 'https://www.sec.gov/Archives/edgar/data/1805077/000162828026034367/eosepressreleasefrontier.htm' },
        { label: 'Q1 2026 earnings release',          url: 'https://www.sec.gov/Archives/edgar/data/1805077/000162828026034367/eoseq1fy26earningsreleas.htm' },
        { label: 'Bimergen 480 MWh acquisition (May 21, 2026)', url: 'https://finance.yahoo.com/sectors/energy/articles/fpusa-converts-480-mwh-long-110000028.html' }
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
    framing: 'Three regulatory decisions sit within the next ~5 months that touch the project-finance bottleneck LDES has always had. Eos hardware is in the application stack on all three. The decisions don\'t guarantee Eos revenue — they shape it, in both directions. Note: as of late June 2026, Ofgem has NOT yet published its Window 1 Initial Decision List — the "Spring 2026" window has now elapsed with no announcement, so this is the most overdue item to watch.',
    upcoming: [
      {
        targetEnd: '2026-08-07',
        anchor:    'consultation to Aug 7',
        regulator: 'Ofgem (UK)',
        label:     'Minded-to (provisional) decision · LDES Cap & Floor Window 1',
        eosExposure: 'RESULT IN (Jun 26, 2026) — and it was a MISS for the UK leg. Ofgem is minded to award only 16 of 73 projects (7,645 MW), skewed to pumped hydro + long-duration (12–32h). Of Frontier UK\'s ~16 projects (~2.6 GW, all 8-hour), just ONE — Frontier Legacy, 65 MW in N Wales — is on the provisional list; the other ~2.5 GW were excluded. Caveat: the document\'s "VFB/Zn" (vanadium-flow / zinc) category does NOT attribute projects to Eos vs Invinity, so even that 65 MW is not confirmed as Eos tech. Provisional only — consultation to Aug 7, final awards Autumn 2026; a Window 2 is expected (decision by 2027).',
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
        { date: 'September 2025', event: '77 applications (28.7 GW) pass eligibility into Phase 2 (project assessment)' },
        { date: 'June 26, 2026',  event: '"Minded-to" (provisional) decisions published — out for consultation (catalyst)' },
        { date: 'August 7, 2026', event: 'Consultation on the minded-to decisions closes' },
        { date: 'After Aug 7',    event: 'FINAL cap & floor awards (Window 1) — the binding step' },
        { date: 'TBD',            event: 'Window 2 timing to be announced post-Window 1 learnings' }
      ],
      eosRelevance: 'Frontier Power Ltd. (UK) entered Window 1 with ~16 projects (~2.6 GW / ~20 GWh) using a mix of Eos Z3 zinc-bromide and Invinity vanadium-flow technology, all of which cleared the September 2025 eligibility round (77 projects / 28.7 GW). On June 26, 2026 Ofgem published its "minded-to" (provisional) decisions for Window 1, now out for consultation to Aug 7 ahead of final, binding awards. "Minded-to" means proposed, not yet awarded — confirm whether Frontier\'s Eos-tech projects are on the provisional list against Ofgem\'s published project tables. A final cap-and-floor award would underpin project-finance for those projects and flow to Eos hardware demand; exclusion would prune the UK pipeline.',
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
    note: 'The $868M shareholders\' deficit is driven by non-cash mark-to-market adjustments on Cerberus warrants and preferred instruments — it does not reflect cash consumed or owed. Series B preferred remeasurement alone was +$778.9M in Q1\'26 (non-cash). Reconcile against the 10-Q before acting on any single line item. <br/><br/><strong style="color:var(--warning)">Coming change to watch:</strong> Eos has stated (May 13, 2026 release) it intends to fund its ~$150M Frontier USA equity contribution via a pro-rata rights offering to existing shareholders (subscription rights + corresponding warrants). The structure is designed to limit dilution to <em>participating</em> shareholders — non-participants will be diluted. Cerberus is separately expected to receive Eos warrants in exchange for its $100M Frontier USA anchor. Pricing + timing TBD; watch for the supplemental prospectus filing.'
  },

  // ────────── NEW: Product family (Indensity / Cube / DawnOS) ──────────
  // Specs sourced directly from eose.com solution pages + ENF/NALA datasheet
  // exports of the original Cube spec sheet. Where a value is from secondary
  // datasheet rather than the current site, the source is labeled inline.
  products: {
    indensity: {
      name:        'Eos Indensity™',
      tagline:     'Stackable, high-density LDES architecture',
      launched:    'January 14, 2026',
      summary:     'New modular architecture that integrates Z3 modules, DawnOS controls, onboard cooling, and power management into a self-contained "Indensity Core™" — stackable horizontally and vertically into a steel superstructure. Designed for sites where conventional BESS footprints don\'t fit. On June 17, 2026 Indensity landed its first international commercial framework: an exclusive DACH-region (Germany/Austria/Switzerland) Master Supply Agreement with CAPAC Energy through 2031 — 750 MWh committed with a pathway to 2 GWh, first projects targeting commercial operation in late 2026.',
      attributes: [
        { k: 'Energy density',           v: '~1 GWh per acre',                       note: '~4× incumbent BESS (~250 MWh/acre)' },
        { k: 'Round-trip efficiency',    v: 'Up to 90%',                              note: 'Materially above legacy Cube (~75–80%) — driven by integrated DawnOS controls' },
        { k: 'Discharge duration',       v: '4 – 16+ hours',                          note: 'Cycle-by-cycle adjustable' },
        { k: 'Response time',            v: 'Millisecond-class',                      note: 'Supports complex cycling profiles' },
        { k: 'Capacity retention',       v: '~97% over 25-year life',                 note: 'Per Eos solution page' },
        { k: 'Operating range',          v: 'Freezing to blistering heat',            note: 'Exact temperature range not published on the solution page' },
        { k: 'Form factor',              v: 'Indensity Core™ slotted into steel superstructure',    note: 'Stacks horizontally AND vertically' },
        { k: 'Deployment',               v: 'Indoor + outdoor weather-ready',        note: 'Adapts to constrained site footprints' },
        { k: 'Integrated components',    v: 'Z3 modules + DawnOS + onboard cooling + power mgmt', note: 'Single self-contained unit' },
        { k: 'Safety',                   v: 'Non-flammable, recyclable, cyber-hardened via DawnOS', note: 'No thermal runaway risk — independently validated Jun 2026 (Energy Safety Response Group abuse testing: no thermal runaway, fire or propagation)' }
      ],
      applications: ['AI data centers', 'Military bases', 'Manufacturing facilities', 'Urban infrastructure', 'Grid support'],
      sources: [
        { label: 'eose.com · Indensity solution page',  url: 'https://www.eose.com/solutions/eos-indensity/' },
        { label: 'Eos IR · Indensity launch (Jan 2026)', url: 'https://investors.eose.com/news-releases/news-release-details/eos-energy-announces-indensitytm-breakthrough-battery-energy' },
        { label: 'CAPAC Energy DACH MSA (Jun 17, 2026)', url: 'https://www.stocktitan.net/news/EOSE/eos-energy-enterprises-establishes-strategic-entry-into-germany-mvli0yodpemn.html' }
      ]
    },
    cube: {
      name:        'Eos Cube™',
      tagline:     'Containerized BESS — the legacy commercial product',
      launched:    'Commercial since 2020 (Z3 module: 2023)',
      summary:     'Fully containerized BESS that loads 672 Z3 battery modules into an outdoor-rated container. The original commercial Eos product and the underlying hardware that Indensity now re-packages.',
      attributes: [
        { k: 'Container',                v: '8\' × 16\' outdoor-rated shipping container', note: 'Per eose.com Cube solution page' },
        { k: 'Container dimensions',     v: '2.50m W × 2.50m H × 5.03m D',           note: 'Per ENF datasheet export of original Cube spec' },
        { k: 'Container weight',         v: '~20,900 kg (~46,000 lb)',                note: 'Per ENF datasheet' },
        { k: 'Z3 modules per Cube',      v: '672',                                    note: 'eose.com Cube page' },
        { k: 'Usable energy',            v: '691–800 kWh',                            note: 'Per ENF datasheet — range reflects discharge duration setting' },
        { k: 'Max power',                v: '~191 kW',                                note: 'Per ENF datasheet — yields ~4 hr at 800 kWh' },
        { k: 'Discharge duration',       v: '4 – 16+ hours',                          note: 'Cycle-by-cycle adjustable depth + duration' },
        { k: 'Design life',              v: '25+ years',                              note: 'No moving parts; closed system' },
        { k: 'Capacity retention',       v: '~97% of rated capacity',                 note: 'eose.com Cube page' },
        { k: 'Hazmat classification',    v: '"Zero charge" for shipping',             note: 'Non-flammable, non-corrosive' },
        { k: 'Certifications',           v: 'UL 1973 + UL 9540A',                     note: 'Per Z3 module product sheet' },
        { k: 'Independent fire test',    v: 'No thermal runaway / fire / propagation', note: 'Energy Safety Response Group destructive-abuse testing, Jun 2026 — no off-gas ignition; supports NFPA 855 siting. Company also ISO 14001 certified.' }
      ],
      sources: [
        { label: 'eose.com · Cube solution page',           url: 'https://www.eose.com/solutions/eos-cube/' },
        { label: 'Z3 product sheet (PDF, May 2023)',         url: 'https://www.eose.com/wp-content/uploads/2023/05/eos_productsheet_Z3_050223.pdf' },
        { label: 'Eos Cube brochure (PDF, Sep 2022)',         url: 'https://cdn.enfsolar.com/z/pp/2023/10/g99ecrrdpy8x401q/eos-cube-brochure-090822.pdf' },
        { label: 'ENF datasheet export',                       url: 'https://www.enfsolar.com/pv/storage-system-datasheet/10797' }
      ]
    },
    z3Module: {
      name:        'Eos Z3™ Battery Module',
      tagline:     'Underlying building block — used in both Cube and Indensity',
      attributes: [
        { k: 'Chemistry',                v: 'Zinc hybrid cathode (Znyth®)',           note: 'Aqueous electrolyte using zinc bromide' },
        { k: 'Construction',             v: 'Bipolar electrodes in polymer casing',    note: 'No precious metals; non-CRM bill of materials' },
        { k: 'Voltage range',            v: '22 – 48 VDC',                            note: 'Per Z3 product sheet' },
        { k: 'Rated power',              v: '0.15 kW',                                note: 'Per module' },
        { k: 'Energy per module',        v: '0.8 kWh',                                note: 'Per module' },
        { k: 'Certifications',           v: 'UL 1973 + UL 9540A',                     note: 'Safety + fire propagation' },
        { k: 'Supply chain',             v: 'Zinc + bromine, US-sourced',              note: 'Qualifies for 45X PTC; no FEOC exposure' }
      ],
      sources: [
        { label: 'Z3 product sheet (PDF)', url: 'https://www.eose.com/wp-content/uploads/2023/05/eos_productsheet_Z3_050223.pdf' }
      ]
    },
    dawnos: {
      name:        'DawnOS™ Platform',
      tagline:     'US-developed BMS + controls + analytics layer',
      launched:    'September 8, 2025',
      summary:     'Proprietary battery management system, controls, and analytics platform. 100% US-developed with no foreign code and no external cloud dependencies. Now deployed in all new Eos projects; can be integrated into select legacy projects. The "controls IQ" layer that drove the recent RTE improvement.',
      capabilities: [
        { k: 'Scope',                    v: 'Manages thousands of modules in real time, individual module monitoring', note: 'Module-level granularity, not just string-level' },
        { k: 'State tracking',           v: 'State of Charge / State of Health / State of Energy per module', note: 'For grid dispatch + revenue optimization' },
        { k: 'Control actions',          v: 'Charge / discharge / bypass commands per module',  note: 'Active module-level routing' },
        { k: 'String voltage management',v: 'DC/DC converters maintain common voltage during module switching', note: 'Allows dynamic configuration without disrupting output' },
        { k: 'Balancing',                v: 'Independent module-balancing strategies',           note: 'Reduces need for field service visits' },
        { k: 'Anomaly detection',        v: 'Proactive, live in production',                     note: 'Plus predictive balancing + dynamic switching' },
        { k: 'DawnOS Insights',          v: 'AI-enabled analytics platform (Beta since Apr 2025)',note: 'Aggregated metrics + string/battery-level detail' },
        { k: 'Telemetry scale',          v: 'Processes 20+ billion signals across deployed fleet', note: 'Eos\' own stated figure' },
        { k: 'Hardware compatibility',   v: 'Z3 zinc-based systems (primary)',                  note: 'Designed specifically for Z3' }
      ],
      security: [
        '100% US-developed code — no foreign software in the stack',
        'No external cloud dependencies; hosted on US infrastructure',
        'Domestic data retention',
        'Designed for grid-resilience + national-security use cases',
        '"Designed by American minds, built by American hands, secured on American soil" (Eos messaging)'
      ],
      sources: [
        { label: 'eose.com · DawnOS solution page',           url: 'https://www.eose.com/solutions/dawnos/' },
        { label: 'Eos IR · DawnOS launch (Sep 8, 2025)',       url: 'https://investors.eose.com/news-releases/news-release-details/eos-energy-unlocks-advanced-control-and-system-optimization' }
      ]
    }
  },

  // ────────── NEW: Competitive landscape (refreshed May 2026) ──────────
  // Source narrative from PV Magazine USA (Apr 2026): "EOS and ESS showing
  // stress; Form Energy outpacing projections." Updated statuses reflect this.
  competitive: [
    { tech: 'Zinc-bromide (Znyth)',  lead: 'Eos Energy',           duration: '4–16+ hr', status: 'Commercial; 2 lines running',   edge: '— (this is Eos)' },
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
    asOf: 'Updated June 12, 2026',
    consensus: {
      // Aggregators genuinely disagree (different analyst sets + update timing):
      // stockanalysis $9.63 (10) · Benzinga $7.96 (15) · MarketBeat $10.94 (10).
      // We show MarketBeat's blended figure and surface the dispersion in the note.
      avgPriceTarget: 10.94,
      highTarget:     22.00,
      lowTarget:       5.00,
      coveringAnalysts: '10–15 (varies by source)',
      priorAvgTarget:  10.94,   // unchanged since the May 24 refresh
      ratingMix:       'Hold-skew (2 Strong Buy · 1 Buy · 7 Hold per StockAnalysis; MarketBeat adds 1 Sell). Newest voice is Needham\'s May 22 Buy/$11 initiation; avg PT runs $7.96–$10.94 by aggregator.'
    },
    recentActions: [
      { date: '2026-05-22', firm: 'Needham',       analyst: 'Sean Milligan', action: 'Initiated Buy, PT $11',      note: 'First new coverage post-Frontier announcement; most bullish recent call' },
      { date: '2026-05-14', firm: 'TD Cowen',      analyst: 'Jeff Osborne',  action: 'Maintains Hold, PT $7 → $8', note: 'First post-Q1\'26 action; modest raise, neutral stance' },
      { date: '2026-04-16', firm: 'JPMorgan',      analyst: 'Mark Strouse',  action: 'PT cut $9 → $6, Neutral',    note: 'Cited cash burn + Frontier capital-stack questions' },
      { date: 'Range',      firm: '10–15 covering',analyst: '—',             action: 'PT range $5–$22',            note: 'Wide dispersion; consensus avg $7.96–$10.94 depending on aggregator' }
    ],
    sentiment: {
      retail: 'Stocktwits "extremely bullish" post-Q1\'26 print',
      institutional: 'Cerberus dominant via Series B + warrants; tracking 13D/A filings for changes',
      shortInterest: 'Elevated — see Nasdaq short interest page (refreshed semi-monthly)'
    },
    sources: [
      { label: 'TD Cowen PT raise to $8 (May 14, 2026)', url: 'https://www.gurufocus.com/news/8859423/eose-maintained-by-td-cowen-price-target-raised-to-800' },
      { label: 'StockAnalysis EOSE forecast',        url: 'https://stockanalysis.com/stocks/eose/forecast/' },
      { label: 'MarketBeat EOSE forecast',           url: 'https://www.marketbeat.com/stocks/NASDAQ/EOSE/forecast/' },
      { label: 'Simply Wall St analyst forecasts',   url: 'https://simplywall.st/stocks/us/capital-goods/nasdaq-eose/eos-energy-enterprises/future' },
      { label: 'Benzinga analyst ratings',           url: 'https://www.benzinga.com/quote/EOSE/analyst-ratings' },
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
      allegations:    'Omitted manufacturing / operational problems that made its reaffirmed guidance unachievable — misrepresenting near-term revenue growth and the timing, execution, and feasibility of its manufacturing scale-up',
      trigger:        'The class period opens Nov 5, 2025 — the Q3\'25 earnings call where EOS posted a record $30.5M quarter and REAFFIRMED $150–160M FY25 guidance — and closes Feb 26, 2026, when EOS reported FY25 revenue of $114.2M (~$40M / ≈25% short) and the stock fell −39.4% to $6.74. The complaint (filed Mar 6, 2026) centers on that reaffirm-then-miss gap.',
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

  // ────────── NEW: Price-chart event markers ──────────
  // type: earnings | insider-buy | insider-sell | deal | regulatory
  // Dates are YYYY-MM-DD; the chart snaps each to the nearest trading bar.
  priceEvents: [
    { date: '2025-10-31', type: 'deal',        label: 'Frontier UK — first 228 MWh order',  detail: 'First order under the 5 GWh UK framework; final Cerberus milestone met' },
    { date: '2026-02-26', type: 'earnings',    label: 'FY2025 10-K filed',                  detail: 'Full-year results; >7× YoY revenue growth; FY26 guidance initiated' },
    { date: '2026-03-02', type: 'insider-buy', label: 'Director buy — Dimitrief 15,000 sh', detail: 'Open-market purchase @ ~$6.04' },
    { date: '2026-03-04', type: 'insider-buy', label: 'CEO buy — Mastrangelo 23,900 sh',    detail: 'Open-market purchase post-FY25 print' },
    { date: '2026-04-15', type: 'deal',        label: 'TURBINE-X JDA',                      detail: 'Gas + Eos Indensity for AI data centers; up to 2 GWh over 36 months (stock +12%)' },
    { date: '2026-04-30', type: 'deal',        label: 'CFO appointment',                    detail: 'Alessandro Lagi named CFO (eff. Jun 8); from Johnson Controls / Baker Hughes' },
    { date: '2026-05-13', type: 'earnings',    label: 'Q1 2026 earnings + Frontier USA',    detail: 'Rev $57.0M (+445% YoY); Frontier Power USA (Cerberus IPP) formed; S-3ASR shelf filed' }
  ],

  // ────────── NEW: Bull / Bear scorecard ──────────
  // Equal real estate, equal point-count, every point evidenced.
  // The page is balanced when a skeptic could read this and feel heard.
  scorecard: {
    bull: [
      { point: 'Q1\'26 revenue +445% YoY with adj. EPS beating consensus by 154 ppt ($0.12 vs −$0.22). Two consecutive quarters now exceed full FY25.', src: 'Q1\'26 8-K' },
      { point: 'Pipeline $24.3B (+56% YoY); backlog $644.6M; post-quarter +2 GWh Frontier USA reservation. Demand isn\'t the constraint.', src: '10-Q + Frontier 8-K' },
      { point: 'Frontier USA executing fast — and now CONVERTING: 480 MWh acquired via Bimergen (May 21), then on Jun 18 the first firm purchase order under the 2 GWh reservation (Redbird, 100 MW / 400 MWh, ERCOT, Z3). Reservation→order is the proof the vehicle pulls hardware. Release also cited ~50% of a 1 GWh Bridgelink MSA fulfilled + a 12 GWh ERCOT/PJM/CAISO/MISO pipeline.', src: 'Jun 18 first-PO release · May 21 Bimergen release' },
      { point: 'Two top-tier financial backers now in Frontier USA: Cerberus ($100M) AND, as of Jun 30, Hudson Bay Capital ($50M into the JV + a registered direct buy of Eos stock), with KKR Capital Markets as structuring agent. DOE + lender consents cleared and the rights offering is priced ($5.481). The JV funding is largely de-risked.', src: 'Jun 30 8-K + 424B5' },
      { point: 'Cerberus is doubling down on BOTH sides of the Atlantic: $100M into Frontier USA + £159M earlier into Frontier UK. Lock-up extended through YE 2026.', src: 'Frontier releases · PwC UK' },
      { point: 'Execution on schedule: Line 2 launched commercial production Jun 16, 2026 — ahead of the end-Q2 target — doubling the manufacturing base toward ~4 GWh/yr. Directly rebuts the "can\'t scale manufacturing" bear/lawsuit narrative. Margin trajectory backs it: GM −78% Q1\'26, +157 ppt YoY, +16 ppt sequentially; cube deliveries +5.7×.', src: 'Jun 16 Line 2 release · Q1\'26 release' },
      { point: 'Demand vectors broadening: AI/data-center via the TURBINE-X JDA (up to 2 GWh, first deployments 2027); and as of Jun 17, 2026 a first international framework — an exclusive DACH-region MSA with CAPAC Energy (750 MWh, pathway to 2 GWh, Indensity) through 2031. NYSERDA ISC awards (Q3 2026) add another near-term catalyst.', src: 'TURBINE-X / CAPAC releases · NYSERDA' },
      { point: '45X PTC preserved under OBBBA with FEOC guardrails — structurally favors US-content LDES vs. China-linked competitors. $21.4M grant receivable on Q1\'26 BS.', src: 'OBBBA / 10-Q' },
      { point: 'Short interest ~31% of float (~103.5M sh); ~3.4 days to cover. CEO Mastrangelo bought 23,900 shares post-FY25 crash; Director Dimitrief bought 15,000 at $6.04. Asymmetric setup on any clean catalyst.', src: 'Nasdaq SI · Form 4 / OpenInsider' }
    ],
    bear: [
      { point: 'Q1\'26 operating cash flow was −$119.7M (per cash flow statement — distinct from the −$79.3M operating loss on the P&L). At that pace, $472M total cash is ~4 quarters of runway absent new capital. S-3ASR shelf filed May 13 + a pro-rata rights offering targeting ~$150M to fund the Frontier USA contribution. Dilution is a "when," not "if."', src: '10-Q cash flow + S-3ASR + Frontier 8-K' },
      { point: 'GM still −78%. The path to mgmt\'s implied FY27 GM-positive requires both Line 2 ramping AND Z3 unit economics holding at higher volume. Neither proven yet.', src: 'Q1\'26 release' },
      { point: 'Active securities class action (Yung v. Eos, D.N.J. 26-cv-02372) alleging misrepresentation of FY25 production capacity. Settlement risk is material if certified.', src: 'court filings' },
      { point: 'Shares outstanding +18% trailing 12 months. Insiders sold $14M more than they bought over the same window — Stidolph $11.5M, Kroeker (interim CFO) $802k, Silberman (CLO) $739k.', src: 'OpenInsider / Simply Wall St' },
      { point: 'Customer concentration: 93.3% of Q1\'26 revenue from a handful of >10% customers. One project slip = guidance miss.', src: '10-Q footnotes' },
      { point: 'Dilution is now quantified and stacking: the Jun 30 deal adds a registered direct to Hudson Bay PLUS ~30M new warrants to Cerberus (20.0M) and HBC (10.0M), on top of the ~$150M rights offering (units = stock + 0.4388 warrant). The $5.481 subscription price sits below the recent tape and anchors it. Funded — but at real cost to non-participating holders.', src: 'Jun 30 8-K + 424B5' },
      { point: 'UK Ofgem was a miss: in the Jun 26 Window 1 minded-to decisions, only 1 of Frontier UK\'s ~16 projects (Frontier Legacy, 65 MW) made the provisional list — ~2.5 GW excluded — and even that one is not confirmed as Eos (vs Invinity) tech. A long-cited bull leg is largely off for Window 1.', src: 'Ofgem Window 1 minded-to decisions' },
      { point: 'No public hyperscaler customer despite the AI narrative. TURBINE-X is targeting hyperscalers; nothing closed. The "AI demand" thesis is bidding, not winning, today.', src: 'all public disclosures' },
      { point: 'JPMorgan cut PT $9→$6 (Neutral) post-FY25; Roth Capital $6 PT (Chip Moore). Consensus PT compressed from $9.71 to $8.86. Sell-side is skeptical.', src: 'JPMorgan, Roth Capital research' }
    ]
  },

  // ────────── NEW: Sentiment & positioning ──────────
  // Insider trades and short interest — concrete positioning data, mixed by nature.
  sentiment: {
    asOf: 'Short interest per latest semi-monthly settlement · refreshed June 12, 2026 — verify links for live figures',
    shortInterest: {
      pctOfFloat:    '~31% (latest reported)',
      sharesShort:   '~103.5M',
      daysToCover:   '~3.4',
      interpretation: 'Elevated. Above 20% is the "potential squeeze" threshold; below 5 days-to-cover means a clean positive catalyst can move price hard. Bears argue the level is deserved given execution history.',
      source: 'https://www.nasdaq.com/market-activity/stocks/eose/short-interest'
    },
    insiders: {
      // High-level summary — full transaction log lives in `insiderTrades` below
      // and renders as its own §09d section directly from SEC Form 4 filings.
      summary: 'Trailing 6 months show ~$693k of open-market buys (4 transactions, 3 insiders — all post-FY25 crash) against ~$14.4M of open-market sells (mostly Director Stidolph $11M in Dec 2025 + Officer sells in Jan 2026 at $14–18 — all BEFORE the −39% Feb 26 drop). The full transaction list with direct EDGAR links is in §09d below.',
      ctaText:  'See §09d Insider Trades — SEC Form 4 →',
      ctaHref:  '#insiders',
      source:   'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001805077&type=4'
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

  // ────────── NEW: Insider trades — sourced directly from SEC Form 4 ──────────
  // 14 most recent Form 4 filings (2025-12-04 through 2026-03-10), parsed from
  // EDGAR XML. Every row is linkable to the actual filing on SEC.gov.
  // Transaction codes follow the SEC Form 4 standard:
  //   P = open-market purchase     S = open-market sale
  //   A = grant/award (free)       M = exercise of derivative
  //   F = shares withheld to pay   G = bona fide gift
  //       option exercise/taxes    J = other acquisition/disposition
  // The "Open-market net" figure below uses ONLY P and S transactions —
  // i.e., the discretionary capital decisions, not vesting mechanics.
  insiderTrades: {
    asOf: 'Trailing ~6 months · pulled from SEC EDGAR (CIK 1805077, Form 4) · last refreshed June 15, 2026',
    // (pending block cleared June 12, 2026 — CFO Lagi's Form 3 + Form 4 filed
    //  June 9; they now appear as regular rows in the transaction log below.)
    summary: {
      openMarketBuys:    692962,        // 4 P transactions (unchanged since March)
      openMarketSells:  14470280,       // +$54,305 from Walters May 19 cashless-exercise sale
      taxWithholding:    2484687,       // +$706,875 June 12 CEO option-exercise tax withholding (F-code)
      grants:             159019,       // A-code grants — Nixon's 23,111 sh @ $6.88 implied
      vestingNetShares:   135864,       // Total May 19 RSU/option vesting NET of withholdings (shares retained by directors)
      buyCount: 4,
      sellCount: 8,                     // +1 (Walters May 19)
      buyersUnique: 3,                  // Mastrangelo, Dimitrief, Urban
      reading: 'Three clusters tell the story. (1) March 2026 post-crash: CEO Mastrangelo + 2 directors put $693k of fresh capital in at $5.75–$6.58 — discretionary buys, strongest insider signal. (2) Dec 2025/Jan 2026 pre-crash: Officer + Director sells of $14M at $14–$18 — well above current price. (3) May 19, 2026 routine annual director RSU vesting: 7 directors settled equity comp on the same day — mostly non-discretionary tax-withholding, just $54k in actual open-market selling (Walters\' cashless exercise). Most recent: on June 12, 2026 — right after the rights-offering record date was set — CEO Mastrangelo exercised 200,000 low-strike ($1.34) options and RETAINED the ~83k net shares after tax withholding rather than selling. Not a cash purchase, but a notable hold-not-sell at $6.06. No discretionary (P/S) insider activity since March.'
    },
    codeLegend: [
      { code: 'P', label: 'Open-market purchase', tone: 'buy', note: 'Discretionary buy — strongest insider signal' },
      { code: 'S', label: 'Open-market sale',     tone: 'sell',note: 'Discretionary sell — strongest negative signal' },
      { code: 'A', label: 'Grant / award',         tone: 'neutral', note: 'Comp — not a market signal' },
      { code: 'M', label: 'Derivative exercise',   tone: 'neutral', note: 'Option/RSU conversion — usually paired with F/D/S' },
      { code: 'F', label: 'Tax withholding',        tone: 'neutral', note: 'Non-discretionary — securities withheld to pay taxes' },
      { code: 'D', label: 'Disposition to issuer',  tone: 'neutral', note: 'Non-discretionary — shares disposed back to company (Rule 16b-3(e)). Mechanically similar to F' },
      { code: 'G', label: 'Bona fide gift',         tone: 'neutral', note: 'Charitable or estate transfer' }
    ],
    // Each row carries the SEC accession number so we can build the direct URL
    transactions: [
      // === June 12, 2026 — CEO option exercise (filed Jun 15) ===
      // Mastrangelo exercised 200k options at a $1.34 strike; 116,646 sh withheld
      // for taxes at $6.06, netting ~83,354 sh RETAINED (not sold) — a hold, days
      // after the rights-offering record date was announced.
      { date: '2026-06-12', name: 'Joe Mastrangelo',      role: 'CEO & Director',          code: 'M', ad: 'A', shares: 200000, price: 1.34,  value: 268000,   acc: '0001628280-26-043041', note: 'Stock-option exercise @ $1.34 strike (low-strike legacy option)' },
      { date: '2026-06-12', name: 'Joe Mastrangelo',      role: 'CEO & Director',          code: 'F', ad: 'D', shares: 116646, price: 6.06,  value: 706875,   acc: '0001628280-26-043041', note: 'Tax withholding on exercise — net ~83,354 sh retained, not sold' },

      // === June 2026 — CFO Lagi onboarding + annual director RSU grants ===
      // Lagi's Form 3 (filed Jun 9) shows 12,114 sh of initial common holdings.
      // All rows below are comp mechanics (A grants / M vests) — no P or S.
      { date: '2026-06-08', name: 'Alessandro Lagi',     role: 'CFO',                     code: 'A', ad: 'A', shares: 277773, price: 0,     value: 0,        acc: '0001628280-26-041912', note: 'Initial RSU grant per employment agreement (~$2M, 3-yr vest) — first day as CFO; Form 3 shows 12,114 sh held' },
      { date: '2026-06-05', name: 'Jeffrey S. Bornstein', role: 'Director',               code: 'A', ad: 'A', shares: 24289,  price: 0,     value: 0,        acc: '0001628280-26-041923', note: 'Annual director RSU grant' },
      { date: '2026-06-05', name: 'Joseph Nigro',         role: 'Director',               code: 'A', ad: 'A', shares: 24289,  price: 0,     value: 0,        acc: '0001628280-26-041922', note: 'Annual director RSU grant' },
      { date: '2026-06-05', name: 'Alexander Dimitrief',  role: 'Director',               code: 'A', ad: 'A', shares: 21253,  price: 0,     value: 0,        acc: '0001628280-26-041914', note: 'Annual director RSU grant' },
      { date: '2026-06-05', name: 'Marian Walters',       role: 'Director',               code: 'A', ad: 'A', shares: 21253,  price: 0,     value: 0,        acc: '0001628280-26-041917', note: 'Annual director RSU grant' },
      { date: '2026-06-05', name: 'Claude Demby',         role: 'Director',               code: 'A', ad: 'A', shares: 18217,  price: 0,     value: 0,        acc: '0001628280-26-041918', note: 'Annual director RSU grant' },
      { date: '2026-06-05', name: 'Jeff McNeil',          role: 'Director',               code: 'A', ad: 'A', shares: 18217,  price: 0,     value: 0,        acc: '0001628280-26-041920', note: 'Annual director RSU grant' },
      { date: '2026-06-05', name: 'Gregory S. Nixon',     role: 'Director',               code: 'A', ad: 'A', shares: 18217,  price: 0,     value: 0,        acc: '0001628280-26-041915', note: 'Annual director RSU grant' },
      { date: '2026-06-05', name: 'David Urban',          role: 'Director',               code: 'A', ad: 'A', shares: 18217,  price: 0,     value: 0,        acc: '0001628280-26-041916', note: 'Annual director RSU grant' },
      { date: '2026-06-02', name: 'Joseph Nigro',         role: 'Director',               code: 'M', ad: 'A', shares: 3565,   price: 0,     value: 0,        acc: '0001628280-26-040481', note: 'RSU vest' },
      { date: '2026-06-02', name: 'Marian Walters',       role: 'Director',               code: 'M', ad: 'A', shares: 1782,   price: 0,     value: 0,        acc: '0001628280-26-040476', note: 'RSU vest' },

      // === May 19, 2026 — Annual director RSU vesting cluster (7 filings) ===
      { date: '2026-05-19', name: 'Jeffrey S. Bornstein', role: 'Director',                code: 'M', ad: 'A', shares: 30815,  price: 0,     value: 0,        acc: '0001628280-26-036656', note: 'RSU vest' },
      { date: '2026-05-19', name: 'Jeffrey S. Bornstein', role: 'Director',                code: 'D', ad: 'D', shares: 12326,  price: 6.88,  value: 84803,   acc: '0001628280-26-036656', note: 'Tax withholding (Rule 16b-3(e))' },
      { date: '2026-05-19', name: 'Alexander Dimitrief',  role: 'Director',                code: 'M', ad: 'A', shares: 26963,  price: 0,     value: 0,        acc: '0001628280-26-036653', note: 'RSU vest' },
      { date: '2026-05-19', name: 'Alexander Dimitrief',  role: 'Director',                code: 'D', ad: 'D', shares: 10785,  price: 6.88,  value: 74201,   acc: '0001628280-26-036653', note: 'Tax withholding (Rule 16b-3(e))' },
      { date: '2026-05-19', name: 'Claude Demby',         role: 'Director',                code: 'M', ad: 'A', shares: 23111,  price: 0,     value: 0,        acc: '0001628280-26-036654', note: 'RSU vest' },
      { date: '2026-05-19', name: 'Claude Demby',         role: 'Director',                code: 'D', ad: 'D', shares: 9244,   price: 6.88,  value: 63599,   acc: '0001628280-26-036654', note: 'Tax withholding (Rule 16b-3(e))' },
      { date: '2026-05-19', name: 'Gregory S. Nixon',     role: 'Director',                code: 'A', ad: 'A', shares: 23111,  price: 0,     value: 0,        acc: '0001628280-26-036652', note: 'New RSU grant' },
      { date: '2026-05-19', name: 'Gregory S. Nixon',     role: 'Director',                code: 'D', ad: 'D', shares: 9244,   price: 6.88,  value: 63599,   acc: '0001628280-26-036652', note: 'Tax withholding (Rule 16b-3(e))' },
      { date: '2026-05-19', name: 'Marian Walters',       role: 'Director',                code: 'M', ad: 'A', shares: 23111,  price: 0,     value: 0,        acc: '0001628280-26-036651', note: 'RSU vest' },
      { date: '2026-05-19', name: 'Marian Walters',       role: 'Director',                code: 'M', ad: 'A', shares: 7681,   price: 1.18,  value: 9064,    acc: '0001628280-26-036651', note: 'Option exercise @ $1.18 strike' },
      { date: '2026-05-19', name: 'Marian Walters',       role: 'Director',                code: 'S', ad: 'D', shares: 7681,   price: 7.07,  value: 54305,   acc: '0001628280-26-036651', note: 'Cashless exercise sell (same-day)' },
      { date: '2026-05-19', name: 'Jeff McNeil',          role: 'Director',                code: 'M', ad: 'A', shares: 23111,  price: 0,     value: 0,        acc: '0001628280-26-036657', note: 'RSU vest' },
      { date: '2026-05-19', name: 'David Urban',          role: 'Director',                code: 'M', ad: 'A', shares: 23111,  price: 0,     value: 0,        acc: '0001628280-26-036648', note: 'RSU vest' },

      // === March 2026 — Post-FY25-crash discretionary buys ===
      { date: '2026-03-09', name: 'David Urban',          role: 'Director',                code: 'P', ad: 'A', shares: 16250,  price: 6.16,  value: 100100,  acc: '0001628280-26-016249' },
      { date: '2026-03-04', name: 'Joe Mastrangelo',       role: 'CEO & Director',          code: 'P', ad: 'A', shares: 23900,  price: 6.58,  value: 157262,  acc: '0001628280-26-015015' },
      { date: '2026-03-02', name: 'Joe Mastrangelo',       role: 'CEO & Director',          code: 'P', ad: 'A', shares: 60000,  price: 5.75,  value: 345000,  acc: '0001628280-26-014413' },
      { date: '2026-03-02', name: 'Alexander Dimitrief',   role: 'Director',                code: 'P', ad: 'A', shares: 15000,  price: 6.04,  value: 90600,   acc: '0001628280-26-013586' },
      { date: '2026-01-26', name: 'Nathan Kroeker',        role: 'CCO & Interim CFO',       code: 'S', ad: 'D', shares: 50000,  price: 16.04, value: 802000,  acc: '0001628280-26-003430' },
      { date: '2026-01-23', name: 'Nathan Kroeker',        role: 'CCO & Interim CFO',       code: 'M', ad: 'A', shares: 100000, price: 0,     value: 0,        acc: '0001628280-26-003430' },
      { date: '2026-01-23', name: 'Michael Silberman',     role: 'Chief Legal Officer',     code: 'S', ad: 'D', shares: 41667,  price: 17.74, value: 739173,  acc: '0001628280-26-003307' },
      { date: '2026-01-22', name: 'Michael Silberman',     role: 'Chief Legal Officer',     code: 'M', ad: 'A', shares: 83334,  price: 0,     value: 0,        acc: '0001628280-26-003307' },
      { date: '2025-12-08', name: 'Russell M. Stidolph',   role: 'Director',                code: 'S', ad: 'D', shares: 235367, price: 14.89, value: 3504615, acc: '0001628280-25-055938' },
      { date: '2025-12-08', name: 'Russell M. Stidolph',   role: 'Director',                code: 'S', ad: 'D', shares: 29999,  price: 15.36, value: 460785,  acc: '0001628280-25-055938' },
      { date: '2025-12-08', name: 'Russell M. Stidolph',   role: 'Director',                code: 'F', ad: 'D', shares: 60304,  price: 14.85, value: 895225,  acc: '0001628280-25-055938' },
      { date: '2025-12-08', name: 'Russell M. Stidolph',   role: 'Director',                code: 'M', ad: 'A', shares: 296439, price: 2.99,  value: 895261,  acc: '0001628280-25-055938' },
      { date: '2025-12-05', name: 'Russell M. Stidolph',   role: 'Director',                code: 'S', ad: 'D', shares: 500000, price: 14.99, value: 7495000, acc: '0001628280-25-055931' },
      { date: '2025-12-05', name: 'Jeffrey S. Bornstein',  role: 'Director',                code: 'S', ad: 'D', shares: 32328,  price: 15.05, value: 486536,  acc: '0001628280-25-055940' },
      { date: '2025-12-05', name: 'Alexander Dimitrief',   role: 'Director',                code: 'F', ad: 'D', shares: 17704,  price: 15.03, value: 266091,  acc: '0001628280-25-055940' },
      { date: '2025-12-04', name: 'Marian Walters',        role: 'Director',                code: 'S', ad: 'D', shares: 50000,  price: 15.81, value: 790500,  acc: '0001628280-25-055433' },
      { date: '2025-12-04', name: 'Marian Walters',        role: 'Director',                code: 'F', ad: 'D', shares: 16933,  price: 15.75, value: 266695,  acc: '0001628280-25-055433' },
      { date: '2025-12-04', name: 'Jeffrey S. Bornstein',  role: 'Director',                code: 'S', ad: 'D', shares: 8000,   price: 15.75, value: 126000,  acc: '0001628280-25-055930' }
    ],
    sources: [
      { label: 'SEC EDGAR — all Eos Form 4 filings (live)', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001805077&type=4&dateb=&owner=include&count=40' },
      { label: 'OpenInsider — EOSE summary',                  url: 'http://openinsider.com/search?q=eose' }
    ]
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
        claim: 'Short squeeze imminent — ~30% of float is short.',
        evidence: 'Short interest is real (~31% of float, ~3.4 days to cover per the latest settlement) and has risen from ~28% since May. Mechanically a squeeze is possible on any clean positive catalyst. But "possible" is not "imminent" — the stock has carried similar SI levels for months without breaking out.'
      },
      {
        claim: 'Frontier is a Cerberus-funded subsidy for Eos demand.',
        evidence: 'Partially fair framing: Cerberus is anchoring with $100M equity and structuring TPI-wrapped project finance that Eos couldn\'t access alone. But Eos must contribute ~$150M itself, and Frontier transactions are arm\'s-length per the release. Not a free ride. UPDATE May 21, 2026: FPUSA acquired the Bimergen 480 MWh Texas portfolio — first conversion of the reservation into firm projects, 8 days after FPUSA\'s formation. Independent evidence that FPUSA is operating like a real IPP (acquiring development pipeline, not just rubber-stamping Eos hardware orders).'
      }
    ],
    bear: [
      {
        claim: 'A dilutive secondary offering is coming "any day" via the S-3ASR shelf.',
        evidence: 'Confirmed in the Frontier release itself: Eos intends to fund its ~$150M Frontier USA contribution via a PRO-RATA RIGHTS OFFERING to existing shareholders — subscription rights to buy Eos securities + corresponding warrants. Structured to limit dilution to PARTICIPATING shareholders; anyone who skips will be diluted. Timing + pricing TBD. Separately, the S-3ASR shelf gives the company unlimited capacity for additional follow-ons.'
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
      date:  '2026-06-26',
      title: 'Ofgem publishes "minded-to" (provisional) LDES Window 1 cap & floor decisions',
      body:  'Ofgem published its "minded-to" decisions for the UK Long Duration Electricity Storage cap & floor scheme, Window 1 — the long-flagged UK regulatory catalyst, arriving in provisional form. "Minded-to" is regulator-speak for a proposed decision opened for consultation before it is finalised (the confusing part: it reads as suggestions, because that is exactly what it is — Ofgem\'s proposed list, not a binding award). Consultation runs to Aug 7, 2026, with final, binding cap & floor awards after. Frontier Power Ltd. (UK) entered Window 1 with ~16 projects (~2.6 GW / ~20 GWh) using Eos Z3 zinc-bromide and Invinity vanadium-flow, all of which cleared the Sept 2025 eligibility round; whether those specific projects are on the June 26 provisional award list should be confirmed against Ofgem\'s published project tables. A final award would underpin project finance for Frontier UK\'s Eos-tech pipeline; exclusion would prune it.',
      url:   'https://www.ofgem.gov.uk/consultation/long-duration-electricity-storage-window-1-minded-decisions'
    },
    {
      date:  '2026-06-25',
      title: 'Frontier Power USA engages KKR Capital Markets to structure its financing',
      body:  'FPUSA engaged KKR Capital Markets (KCM) as structuring agent to arrange construction finance, tax equity and long-term project finance for its 2 GWh development pipeline. KCM has arranged $2.5T+ of financings globally; the mandate materially de-risks FPUSA\'s capitalisation plan, which sits alongside Cerberus\' $100M equity anchor and the Ariel Green TPI wrap. It complements (does not replace) Eos\' own ~$150M rights-offering contribution. EOSE rose ~2.8% to $6.23 the next session.',
      url:   'https://www.globenewswire.com/news-release/2026/06/25/3317521/0/en/Frontier-Power-USA-Engages-KKR-Capital-Markets-to-Support-Scaled-Deployment-of-Long-Duration-Energy-Storage.html'
    },
    {
      date:  '2026-06-22',
      title: 'Independent fire testing validates Z3 safety; ISO 14001 certified',
      body:  'Independent destructive-abuse testing by the Energy Safety Response Group found the Eos Z3 system exhibited no thermal runaway, no sustained fire, no module-to-module propagation and no off-gas ignition under direct-flame and overcharge conditions — third-party validation of the safety profile that is Z3\'s core differentiator versus lithium-ion. Eos also received ISO 14001 environmental-management certification. Commercially this eases siting/permitting, supports insurance underwriting, and aligns with NFPA 855 — increasingly decisive for utility- and data-center-scale projects. It is the fifth catalyst in roughly two weeks, an unusually dense run of announcements landing just ahead of the Jul 1 rights-offering record date.',
      url:   'https://investors.eose.com/news-releases/news-release-details/independent-fire-testing-confirms-eos-z3-battery-system'
    },
    {
      date:  '2026-06-18',
      title: 'First firm purchase order under FPUSA\'s 2 GWh reservation — Redbird (400 MWh)',
      body:  'Eos booked its FIRST purchase order under the Frontier Power USA 2 GWh capacity reservation: the Redbird project — 100 MW / 400 MWh, four-hour duration, in ERCOT (Texas), on Eos Z3. This is the reservation-to-firm-order conversion the market had been waiting for — the proof that the FPUSA vehicle actually pulls Eos hardware (~$90M at our $225/kWh model basis). The release also disclosed, for the first time at this granularity, that ~50% of a 1 GWh Bridgelink master supply agreement is already fulfilled and that FPUSA is advancing a 12 GWh development pipeline across ERCOT, PJM, CAISO and MISO. Fourth catalyst in a remarkable week.',
      url:   'https://investors.eose.com/news-releases/news-release-details/eos-energy-enterprises-announces-first-purchase-order-under'
    },
    {
      date:  '2026-06-17',
      title: 'Germany/DACH entry: exclusive CAPAC Indensity framework — capping a ~19% two-day surge',
      body:  'Eos signed a binding Master Supply Agreement with German developer CAPAC Energy — exclusive across Germany, Austria and Switzerland through 2031, committing 750 MWh with a pathway to 2 GWh. It is Eos\' first international commercial framework for Indensity; first German projects target commercial operation in late 2026, with purchase orders flowing into reported backlog as issued. Landing one day after the Line 2 production launch, it drove EOSE ~+9.8% (to ~$7.68) on heavy volume — the back-to-back catalysts lifted the stock roughly +19% in two sessions off the ~$6.38 Jun 15 close. Framework value today; backlog conversion is the metric to watch.',
      url:   'https://www.stocktitan.net/news/EOSE/eos-energy-enterprises-establishes-strategic-entry-into-germany-mvli0yodpemn.html'
    },
    {
      date:  '2026-06-16',
      title: 'Line 2 launches commercial production — manufacturing base doubles, ahead of schedule',
      body:  'Battery Line 2 at Thorn Hill (Turtle Creek), PA began commercial production after passing Site Acceptance Testing — ahead of the end-of-Q2 target Eos guided to at Q1. It takes the two lines toward a combined ~4 GWh annual run-rate by end-2026 (Line 2 full run-rate targeted Q4\'26), with a layout that cuts raw-material travel ~86% and line length ~40% vs. Line 1. The single most important execution gate for the FY26 $300–400M guide — and it directly rebuts the "can\'t scale manufacturing" bear/lawsuit narrative. Stock rose to ~$6.81 on ~39M shares (vs. ~14M the prior session).',
      url:   'https://www.eose.com/eos-energy-enterprises-launches-commercial-production-at-second-manufacturing-facility/'
    },
    {
      date:  '2026-06-11',
      title: 'Rights offering record date set — July 1',
      body:  'Eos set the record date for the ~$150M rights offering funding its Frontier Power USA contribution: holders of record as of 5 pm ET July 1 receive subscription rights on July 2 to buy units of common stock + warrants at a ~10–20% discount to a 15–30 day VWAP, with an over-subscription privilege. It puts the long-flagged dilution overhang on a concrete schedule; the exact ratio and price land in the prospectus supplement at commencement. DOE and debt-holder consents remain. See the rights-offering explainer for the mechanics and dilution math.',
      url:   'https://www.eose.com/eos-energy-announces-record-date-for-rights-offering/'
    },
    {
      date:  '2026-05-21',
      title: 'Frontier Power USA converts 480 MWh from Bimergen — first deployment under the 2 GWh reservation',
      body:  'FPUSA (Cerberus-anchored Eos IPP) acquired a 480 MWh portfolio of three ERCOT-based BESS development projects from Bimergen Energy Corporation (NYSE: BESS) — two "Texas 10" projects (~40 MWh each) + one 100 MW / 400 MWh project. FPUSA holds 92.5% post-closing, Bimergen retains 7.5% economic interest + a development fee. Projects deploy Eos Z3 systems under the Ariel Green TPI framework. Notices-to-Proceed expected mid-2026. Stella Energy Solutions is execution partner. This is the FIRST conversion of the May 13 anchor reservation into firm projects — 480 / 2,000 MWh = 24% of the reservation deployed within 8 days of FPUSA\'s formation. No dollar values disclosed; at our $225/kWh model basis the order is ~$108M of Eos hardware demand.',
      url:   'https://finance.yahoo.com/sectors/energy/articles/fpusa-converts-480-mwh-long-110000028.html'
    },
    {
      date:  '2026-05-19',
      title: 'Annual director RSU vesting cluster (7 Form 4s)',
      body:  'Seven directors settled annual equity comp on the same day: ~177k shares of RSUs / options vested across Bornstein, Dimitrief, Demby, Nixon (new grant), Walters, McNeil, Urban. ~$350k in shares went back to the company as tax withholding (Rule 16b-3(e), code D), ~136k net shares retained by directors. The only discretionary trade was Walters\' cashless option exercise — sold 7,681 shares at $7.07 ($54k). Routine compensation event; reads dramatic in volume but only $54k was a capital decision.',
      url:   'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001805077&type=4&dateb=&owner=include&count=20'
    },
    {
      date:  '2026-04-03',
      title: 'New director: Nathaniel Fick',
      body:  'Nathaniel Fick filed a Form 3 (initial statement of beneficial ownership) — confirms appointment to the Eos board. Initial holdings: zero common shares (typical for an outside director joining; equity grant typically follows in next director comp cycle). Fick is a former US Ambassador-at-Large for Cyberspace and Digital Policy and an experienced national-security / technology executive.',
      url:   'https://www.sec.gov/Archives/edgar/data/1805077/000162828026023633/'
    },
    {
      date:  '2026-04-30',
      title: 'CFO appointment: Alessandro Lagi',
      body:  'Eos appointed Alessandro Lagi (ex-Johnson Controls Global FP&A, prior Baker Hughes/BHGE) as CFO effective June 8, 2026. Succeeds interim CFO Nathan Kroeker (who continues as CCO). Employment agreement dated Apr 28 sets $470K base salary, 100% target bonus, $2M initial RSU grant (3-yr vest), $1M annual LTI target. Stock dipped ~5% on the announcement — read variously as the market preferring continuity (Kroeker) or just normal exec-transition uncertainty.',
      url:   'https://investors.eose.com/news-releases/news-release-details/eos-energy-enterprises-appoints-alessandro-lagi-chief-financial'
    },
    {
      date:  '2026-04-15',
      title: 'TURBINE-X JDA announced',
      body:  'Joint development agreement for up to 2 GWh of Eos storage paired with gas-fired generation, targeting hyperscale AI data centers on accelerated timelines. First deployments expected 2027. Stock jumped ~13%.',
      url:   'https://www.globenewswire.com/news-release/2026/04/15/3274432/0/en/Eos-Energy-Enterprises-TURBINE-X-Launch-Private-Power-Infrastructure-Solution-for-AI-Delivering-Hyperscale-Capacity-in-Months-Not-Years.html'
    },
    {
      date:  '2026-02-26',
      title: 'FY2025 guidance miss · −39% one-day drop',
      body:  'The setup: at Q3 2025 (Nov 5, 2025) EOS posted a record $30.5M quarter (double Q2) and REAFFIRMED full-year guidance of $150–160M. The result: on Feb 26, 2026 it reported FY25 revenue of just $114.2M — ~$40M (≈25%) short — with the CFO acknowledging a key capacity milestone slipped ~5 weeks. Stock fell −39.4% in a day to $6.74. Context cuts both ways: $114.2M was still +632% YoY (FY24 $15.6M → a ~7× growth year) and a company record — the miss was against management\'s own reaffirmed target, not against the prior year. Adj. EBITDA loss $219.1M; net loss $969.6M (mostly non-cash). The Nov 5 reaffirmation → Feb 26 miss window is exactly the class period of the Yung v. Eos securities suit (see §11c Legal).',
      url:   'https://investors.eose.com/news-releases'
    },
    {
      date:  '2026-05-13',
      title: 'Q1 2026 beat · Frontier Power USA · S-3ASR shelf',
      body:  'Revenue $57.0M (+445% YoY), Adj. EPS $0.12 vs. −$0.22 consensus (beat by 154%). Cerberus JV formed with $100M anchor commitment. Stock +12% on the day on record ~300M vol. Frontier Power USA: $100M Cerberus equity + 2 GWh reservation + ~$150M Eos rights offering. Reaffirmed FY26 guidance $300–400M.',
      url:   'https://investors.eose.com/news-releases/news-release-details/eos-energy-enterprises-reports-first-quarter-2026-financial'
    }
  ]
};
