// EOSE Investor Dashboard — main app
// Renders KPIs, tables, charts, plus the new sections we added in Q1'26 refresh:
//   • Frontier Power USA (terms + narrative)
//   • Capital structure (liabilities, equity, reading-guide note)
//   • Z3 product specs + competitive landscape
// Pulls a live delayed quote from Stooq (no API key) and overrides the ticker bar.
(function () {
  const D = window.EOSE_DATA;
  const C = window.EOSE_CHARTS;

  // ---------- Theme ----------
  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('eose-theme', t);
    document.querySelectorAll('[data-theme-icon]').forEach(el => { el.dataset.themeIcon = t; });
    setTimeout(() => renderAllCharts(), 50);
  }
  function initTheme() { setTheme(localStorage.getItem('eose-theme') || 'dark'); }

  // ---------- Ticker ----------
  function setEl(sel, txt) {
    const el = document.querySelector(sel);
    if (el) el.textContent = txt;
  }
  function renderTicker() {
    const t = D.ticker;
    if (t.price > 0) {
      setEl('[data-tk-price]', '$' + t.price.toFixed(2));
      const ch = document.querySelector('[data-tk-change]');
      if (ch) {
        const sign = t.change >= 0 ? '+' : '';
        ch.textContent = `${sign}${t.change.toFixed(2)} (${sign}${t.changePct.toFixed(2)}%)`;
        ch.className = 'ticker__item ' + (t.change >= 0 ? 'up' : 'down');
        ch.style.color = t.change >= 0 ? 'var(--positive)' : 'var(--negative)';
      }
      setEl('[data-tk-mcap]', '$' + (t.marketCap / 1000).toFixed(2) + 'B');
      setEl('[data-tk-vol]',  t.volume ? t.volume.toFixed(1) + 'M' : '—');
      setEl('[data-tk-52h]',  t.high52 ? '$' + t.high52.toFixed(2) : '—');
      setEl('[data-tk-52l]',  t.low52  ? '$' + t.low52.toFixed(2)  : '—');
    }
  }

  // ---------- Hero ----------
  function renderHero() {
    const t = D.ticker;
    if (t.price > 0) {
      setEl('[data-hero-price]', '$' + t.price.toFixed(2));
      const ch = document.querySelector('[data-hero-change]');
      if (ch) {
        const sign = t.change >= 0 ? '+' : '';
        const arrow = t.change >= 0
          ? '<svg width="10" height="10" viewBox="0 0 12 12"><path d="M2 8 L6 3 L10 8 Z" fill="currentColor"/></svg>'
          : '<svg width="10" height="10" viewBox="0 0 12 12"><path d="M2 4 L6 9 L10 4 Z" fill="currentColor"/></svg>';
        ch.innerHTML = `${arrow} ${sign}$${t.change.toFixed(2)} · ${sign}${t.changePct.toFixed(2)}%`;
        ch.style.background = t.change >= 0 ? 'var(--positive-soft)' : 'var(--negative-soft)';
        ch.style.color = t.change >= 0 ? 'var(--positive)' : 'var(--negative)';
      }
    }
    setEl('[data-hero-asof]', t.asOf);
  }

  // ---------- Live quote ----------
  // Strategy:
  //   1. Try data/quote.json (same-origin, refreshed by GitHub Action from a
  //      Google Sheet pulling =GOOGLEFINANCE("NASDAQ:EOSE", ...)). This works
  //      on GitHub Pages because there's no cross-origin request.
  //   2. Fallback: direct Stooq fetch (works on file:// + permissive browsers
  //      but is blocked by CORS from github.io — that's expected).
  //   3. If both fail, the page renders gracefully without a live price.
  function setQuoteUnavailable(reason) {
    setEl('[data-tk-price]', '$—');
    const ch = document.querySelector('[data-tk-change]');
    if (ch) ch.textContent = 'quote unavailable';
    setEl('[data-hero-price]', '$—');
    const hc = document.querySelector('[data-hero-change]');
    if (hc) hc.textContent = 'live quote unavailable — see your broker';
    setEl('[data-hero-asof]', reason || 'no source reachable');
  }

  function applyQuote(q, sourceLabel) {
    if (!q || !isFinite(q.price) || q.price <= 0) return false;
    D.ticker.price = q.price;
    D.ticker.change = isFinite(q.change) ? q.change : 0;
    D.ticker.changePct = isFinite(q.changePct) ? q.changePct
                       : (D.ticker.change && q.price ? (D.ticker.change / (q.price - D.ticker.change)) * 100 : 0);
    D.ticker.volume = isFinite(q.volume) ? q.volume : 0;
    D.ticker.high52 = isFinite(q.high52) ? q.high52 : 0;
    D.ticker.low52  = isFinite(q.low52)  ? q.low52  : 0;
    D.ticker.marketCap = isFinite(q.marketCap) && q.marketCap > 0
      ? q.marketCap
      : q.price * D.ticker.shares;
    D.ticker.asOf = sourceLabel + (q.asof ? ' · ' + q.asof : ' · ' + new Date().toLocaleString());
    renderTicker();
    renderHero();
    renderScenarios();  // recompute upside vs. live price
    return true;
  }

  async function loadFromGoogleSheetJson() {
    try {
      const r = await fetch('data/quote.json', { cache: 'no-store' });
      if (!r.ok) return false;
      const j = await r.json();
      if (j.price == null || !isFinite(j.price)) return false;
      // GOOGLEFINANCE returns volume as raw shares (e.g. 18400000). Normalize to millions.
      const volMillions = isFinite(j.volume) && j.volume > 0 ? j.volume / 1e6 : 0;
      const mcapMillions = isFinite(j.marketcap) && j.marketcap > 0 ? j.marketcap / 1e6 : 0;
      return applyQuote({
        price: j.price,
        change: j.change,
        changePct: j.changepct,
        volume: volMillions,
        high52: j.high52,
        low52: j.low52,
        marketCap: mcapMillions,
        asof: j._refreshed ? new Date(j._refreshed).toLocaleString() : null
      }, 'Google Finance via GitHub Action');
    } catch (e) {
      return false;
    }
  }

  async function loadFromStooq() {
    try {
      const r = await fetch('https://stooq.com/q/l/?s=eose.us&f=sd2t2ohlcv&h&e=csv');
      const txt = await r.text();
      const rows = txt.trim().split('\n');
      if (rows.length < 2) return false;
      const cells = rows[1].split(',');
      const o = parseFloat(cells[3]);
      const c = parseFloat(cells[6]);
      const v = parseInt(cells[7], 10);
      if (!isFinite(c) || c === 0) return false;
      const chg = c - o;
      const pct = o ? (chg / o) * 100 : 0;
      // Try 52w
      let high52 = 0, low52 = 0;
      try {
        const today = new Date();
        const past = new Date(); past.setFullYear(past.getFullYear() - 1);
        const fmt = d => d.toISOString().slice(0, 10).replace(/-/g, '');
        const hr = await fetch(`https://stooq.com/q/d/l/?s=eose.us&d1=${fmt(past)}&d2=${fmt(today)}&i=d`);
        const ht = await hr.text();
        const hrows = ht.trim().split('\n').slice(1);
        const closes = hrows.map(r => parseFloat(r.split(',')[4])).filter(isFinite);
        if (closes.length) { high52 = Math.max(...closes); low52 = Math.min(...closes); }
      } catch (e) { /* non-fatal */ }
      return applyQuote({
        price: c, change: chg, changePct: pct,
        volume: isFinite(v) ? v / 1e6 : 0,
        high52, low52, marketCap: c * D.ticker.shares
      }, 'Stooq (delayed)');
    } catch (e) {
      return false;
    }
  }

  async function loadQuote() {
    if (await loadFromGoogleSheetJson()) return;
    if (await loadFromStooq()) return;
    setQuoteUnavailable('Configure GOOGLEFINANCE sheet (see README) or run on a CORS-permissive origin');
  }

  // ---------- KPIs ----------
  function renderKpis() {
    const grid = document.querySelector('[data-kpis]');
    if (!grid) return;
    grid.innerHTML = '';
    const sparkData = [
      D.quarterlyRevenue.slice(-8).map(d => d.v),
      D.annualRevenue.map(d => d.v),
      D.backlog.slice(-8).map(d => d.v),
      D.funnel.map(d => d.value),
      D.liquidity.slice(-8).map(d => d.v),
      D.grossMargin.slice(-8).map(d => d.v),
    ];
    D.kpis.forEach((k, i) => {
      const node = document.createElement('div');
      node.className = 'kpi';
      const arrow = k.tone === 'up' ? '↑' : k.tone === 'down' ? '↓' : '→';
      node.innerHTML = `
        <div class="kpi__label">${k.label}</div>
        <div class="kpi__value">${k.value}</div>
        <div class="kpi__delta ${k.tone}">${arrow} ${k.delta}</div>
        <div class="kpi__spark" data-spark="${i}"></div>`;
      grid.appendChild(node);
    });
    sparkData.forEach((sd, i) => {
      const host = document.querySelector(`[data-spark="${i}"]`);
      if (host) C.sparkline(host, sd, { tone: D.kpis[i].tone });
    });
  }

  // ---------- Charts wiring ----------
  let chartTasks = [];
  function chart(selector, fn) { chartTasks.push({ selector, fn }); }
  function renderAllCharts() {
    chartTasks.forEach(t => {
      const host = document.querySelector(t.selector);
      if (host) t.fn(host);
    });
    renderKpis();
  }

  // ---------- Tables ----------
  function renderQuarterTable() {
    const tbody = document.querySelector('[data-q-table] tbody');
    if (!tbody) return;
    tbody.innerHTML = D.quarterTable.map(r => `
      <tr>
        <td><b>${r.q}</b></td>
        <td class="num">${C.fmtMoney(r.rev)}</td>
        <td class="num ${r.gm >= 0 ? 'pos' : 'neg'}">${r.gm.toFixed(0)}%</td>
        <td class="num ${r.op >= 0 ? 'pos' : 'neg'}">${C.fmtMoney(r.op)}</td>
        <td class="num">${C.fmtMoney(r.liq)}</td>
        <td><span class="pill ${r.type === 'A' ? 'delivering' : 'mixed'}">${r.type === 'A' ? 'Actual' : 'Projected'}</span></td>
      </tr>`).join('');
  }

  function renderContracts() {
    const tbody = document.querySelector('[data-contracts] tbody');
    if (!tbody) return;
    tbody.innerHTML = D.contracts.map(r => `
      <tr>
        <td><b>${r.customer}</b></td>
        <td class="num">${r.mwh}</td>
        <td>${r.region}</td>
        <td><span class="pill ${r.status.toLowerCase()}">${r.status}</span></td>
        <td class="num">${r.value}</td>
      </tr>`).join('');
  }

  function renderScenarios() {
    const grid = document.querySelector('[data-scenarios]');
    if (!grid) return;
    // Anchor upside math to live price (with $4.50 fallback if quote hasn't loaded).
    const live = D.ticker.price > 0;
    const anchor = live ? D.ticker.price : 4.50;
    const anchorLabel = live ? `current $${anchor.toFixed(2)}` : '$4.50 ref';
    grid.innerHTML = D.scenarios.map(s => {
      const pct = ((s.price - anchor) / anchor) * 100;
      const upStr = (pct >= 0 ? '+' : '') + pct.toFixed(0) + '%';
      const tone = pct >= 0 ? 'up' : 'down';
      return `<div class="scenario ${s.name.toLowerCase().replace(' ', '-')} ${s.name === 'Bull' ? 'bull' : ''}">
        <div class="scenario__name">${s.name} case</div>
        <div class="scenario__price">$${s.price.toFixed(2)}</div>
        <div class="scenario__upside ${tone}">${upStr} vs. ${anchorLabel}</div>
        <div class="scenario__row"><span class="k">FY28 Revenue</span><span class="v">${C.fmtMoney(s.rev)}</span></div>
        <div class="scenario__row"><span class="k">EV / Revenue</span><span class="v">${s.ev.toFixed(1)}x</span></div>
        <div class="scenario__row"><span class="k">Implied mcap</span><span class="v">$${(s.mcap / 1000).toFixed(2)}B</span></div>
      </div>`;
    }).join('');
  }

  function renderFunnel() {
    const host = document.querySelector('[data-funnel]');
    if (!host) return;
    host.innerHTML = D.funnel.map((f, i) => `
      <div class="funnel__row s${i + 1}">
        <div class="stage">${f.stage}</div>
        <div class="bar"></div>
        <div class="val">${f.label}</div>
      </div>`).join('');
  }

  function renderFilings() {
    const host = document.querySelector('[data-filings]');
    if (!host) return;
    host.innerHTML = D.filings.map(f => `
      <a class="list__item" href="${f.url || '#'}" target="_blank" rel="noopener">
        <div class="list__date">${f.date}</div>
        <div class="list__form">${f.form}</div>
        <div class="list__desc">${f.desc}</div>
        <div class="list__cta">View ↗</div>
      </a>`).join('');
  }

  function renderNews() {
    const host = document.querySelector('[data-news]');
    if (!host) return;
    host.innerHTML = D.news.map(n => `
      <a class="news__item" href="${n.url || '#'}" ${n.url ? 'target="_blank" rel="noopener"' : 'onclick="return false;"'}>
        <div class="list__date">${n.date}</div>
        <div class="news__src">${n.src}</div>
        <div class="news__title">${n.title}</div>
      </a>`).join('');
  }

  function renderCatalysts() {
    const host = document.querySelector('[data-catalysts]');
    if (!host) return;
    host.innerHTML = D.catalysts.map(c => `
      <div class="cat__row">
        <div class="cat__date">${c.date}</div>
        <div class="cat__event">${c.event}</div>
        <span class="pill ${c.tone}">${c.status}</span>
        <button class="cat__btn">+ Calendar</button>
      </div>`).join('');
  }

  function renderRisks() {
    const host = document.querySelector('[data-risks]');
    if (!host) return;
    host.innerHTML = D.risks.map(r => `
      <div class="risk">
        <h4 class="risk__title"><span class="dot"></span>${r.title}</h4>
        <p class="risk__body">${r.body}</p>
      </div>`).join('');
  }

  // ---------- NEW: Frontier section ----------
  function renderFrontier() {
    if (!D.frontier) return;
    const summary = document.querySelector('[data-frontier-summary]');
    const why     = document.querySelector('[data-frontier-why]');
    const terms   = document.querySelector('[data-frontier-terms] tbody');
    if (summary) summary.innerHTML = `<strong>${D.frontier.name}</strong> · ${D.frontier.announced}. ${D.frontier.summary}`;
    if (why)     why.textContent = D.frontier.why;
    if (terms)   terms.innerHTML = D.frontier.terms.map(t => `
      <tr><td style="color:var(--fg-2);width:42%">${t.k}</td><td><b>${t.v}</b></td></tr>`).join('');
  }

  // ---------- NEW: Capital structure ----------
  function fmtM(v) { return '$' + v.toFixed(1) + 'M'; }
  function renderCapStructure() {
    if (!D.capStructure) return;
    const cs = D.capStructure;
    setEl('[data-capstr-asof]', `As of ${cs.asOf}`);
    const liab = document.querySelector('[data-capstr-liab] tbody');
    if (liab) {
      liab.innerHTML = cs.liabilities.map(r => `
        <tr><td>${r.k}</td><td class="num"><b>${fmtM(r.v)}</b></td></tr>`).join('') +
        `<tr style="font-weight:700"><td>Total liabilities + preferred</td><td class="num"><b>${fmtM(cs.totalLiabPref)}</b></td></tr>`;
    }
    const eq = document.querySelector('[data-capstr-equity] tbody');
    if (eq) {
      eq.innerHTML = cs.equity.map(r => `
        <tr><td>${r.k}</td><td class="num"><b>${r.v}</b></td></tr>`).join('');
    }
    setEl('[data-capstr-note]', cs.note);
  }

  // ---------- NEW: Bull / Bear scorecard ----------
  function renderScorecard() {
    if (!D.scorecard) return;
    const renderList = (sel, arr) => {
      const host = document.querySelector(sel);
      if (!host) return;
      host.innerHTML = arr.map(p => `
        <li style="margin-bottom:10px">
          <span>${p.point}</span>
          <span style="display:block;font-size:11.5px;color:var(--fg-3);margin-top:3px">↳ ${p.src}</span>
        </li>`).join('');
    };
    renderList('[data-scorecard-bull]', D.scorecard.bull);
    renderList('[data-scorecard-bear]', D.scorecard.bear);
  }

  // ---------- NEW: Sentiment & positioning ----------
  function renderSentiment() {
    if (!D.sentiment) return;
    const s = D.sentiment;
    setEl('[data-sentiment-asof]', s.asOf || '');

    // Short interest
    const shortTb = document.querySelector('[data-sentiment-short] tbody');
    if (shortTb && s.shortInterest) {
      const si = s.shortInterest;
      shortTb.innerHTML = `
        <tr><td style="color:var(--fg-2)">% of float</td><td class="num"><b>${si.pctOfFloat}</b></td></tr>
        <tr><td style="color:var(--fg-2)">Shares short</td><td class="num"><b>${si.sharesShort}</b></td></tr>
        <tr><td style="color:var(--fg-2)">Days to cover</td><td class="num"><b>${si.daysToCover}</b></td></tr>`;
      setEl('[data-sentiment-short-note]', si.interpretation);
      const srcEl = document.querySelector('[data-sentiment-short-src]');
      if (srcEl) srcEl.href = si.source;
    }

    // Insiders
    if (s.insiders) {
      const ins = s.insiders;
      setEl('[data-sentiment-insider-net]', 'Net activity: ' + ins.trailing12moNet);
      const buys = document.querySelector('[data-sentiment-buys] tbody');
      if (buys) buys.innerHTML = ins.recentBuys.map(b => `
        <tr><td><b>${b.name}</b><div style="color:var(--fg-3);font-size:11.5px">${b.date} · ${b.kind}</div></td>
        <td class="num pos"><b>${b.value}</b><div style="color:var(--fg-3);font-size:11.5px">${b.shares.toLocaleString()} sh @ ${b.price}</div></td></tr>`).join('');
      const sells = document.querySelector('[data-sentiment-sells] tbody');
      if (sells) sells.innerHTML = ins.recentSells.map(r => `
        <tr><td><b>${r.name}</b><div style="color:var(--fg-3);font-size:11.5px">${r.date} · ${r.kind}</div></td>
        <td class="num neg"><b>${r.value}</b><div style="color:var(--fg-3);font-size:11.5px">${r.shares.toLocaleString()} sh @ ${r.price}</div></td></tr>`).join('');
      setEl('[data-sentiment-insider-summary]', ins.summary);
      const isrc = document.querySelector('[data-sentiment-insider-src]');
      if (isrc) isrc.href = ins.source;
    }

    // Institutional
    if (s.institutional) {
      setEl('[data-sentiment-inst-summary]', s.institutional.summary);
      const isrcs = document.querySelector('[data-sentiment-inst-sources]');
      if (isrcs) isrcs.innerHTML = s.institutional.sources.map(x =>
        `<a href="${x.url}" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:underline">${x.label}</a>`).join(' · ');
    }

    // Retail
    if (s.retail) {
      setEl('[data-sentiment-retail-summary]', s.retail.summary);
      const rsrc = document.querySelector('[data-sentiment-retail-src]');
      if (rsrc) rsrc.href = s.retail.source;
    }
  }

  // ---------- NEW: Rumors & open debates ----------
  function renderRumors() {
    if (!D.rumors) return;
    const renderSide = (sel, arr, sideColor) => {
      const host = document.querySelector(sel);
      if (!host) return;
      host.innerHTML = arr.map(r => `
        <div style="padding:14px 0;border-top:1px solid var(--line-1);font-size:13.5px;line-height:1.55">
          <div style="font-weight:600;color:var(--fg-0);margin-bottom:6px">${r.claim}</div>
          <div style="color:var(--fg-2)"><strong style="color:${sideColor}">Evidence:</strong> ${r.evidence}</div>
        </div>`).join('');
    };
    renderSide('[data-rumors-bull]', D.rumors.bull, 'var(--positive)');
    renderSide('[data-rumors-bear]', D.rumors.bear, 'var(--negative)');
  }

  // ---------- NEW: Recent history (3b timeline) ----------
  function renderHistory() {
    const host = document.querySelector('[data-history]');
    if (!host || !D.recentHistory) return;
    // sort newest first
    const items = [...D.recentHistory].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    host.innerHTML = items.map(h => `
      <div class="cat__row" style="grid-template-columns:140px 1fr 100px">
        <div class="cat__date">${h.date}</div>
        <div class="cat__event"><strong>${h.title}</strong><div style="color:var(--fg-2);font-size:12.5px;margin-top:4px;line-height:1.5">${h.body}</div></div>
        <a class="cat__btn" href="${h.url || '#'}" target="_blank" rel="noopener">Source ↗</a>
      </div>`).join('');
  }

  // ---------- NEW: Analyst coverage ----------
  function renderAnalysts() {
    if (!D.analystCoverage) return;
    const a = D.analystCoverage;
    setEl('[data-analyst-asof]', a.asOf || '');
    const cons = document.querySelector('[data-analyst-consensus] tbody');
    if (cons) {
      const c = a.consensus;
      cons.innerHTML = `
        <tr><td style="color:var(--fg-2)">Avg price target</td><td class="num"><b>$${c.avgPriceTarget.toFixed(2)}</b></td></tr>
        <tr><td style="color:var(--fg-2)">High target</td><td class="num pos"><b>$${c.highTarget.toFixed(2)}</b></td></tr>
        <tr><td style="color:var(--fg-2)">Low target</td><td class="num neg"><b>$${c.lowTarget.toFixed(2)}</b></td></tr>
        <tr><td style="color:var(--fg-2)">Covering analysts</td><td class="num"><b>${c.coveringAnalysts}</b></td></tr>
        <tr><td style="color:var(--fg-2)">Prior avg (pre-cuts)</td><td class="num"><b>$${c.priorAvgTarget.toFixed(2)}</b></td></tr>
        <tr><td style="color:var(--fg-2)">Rating mix</td><td><b style="font-size:12.5px">${c.ratingMix}</b></td></tr>`;
    }
    const acts = document.querySelector('[data-analyst-actions] tbody');
    if (acts) {
      acts.innerHTML = a.recentActions.map(r => `
        <tr>
          <td class="num">${r.date}</td>
          <td><b>${r.firm}</b></td>
          <td style="color:var(--fg-2)">${r.analyst}</td>
          <td><span class="pill ${r.action.includes('cut') ? 'negotiation' : 'mixed'}">${r.action}</span></td>
          <td style="color:var(--fg-2);font-size:12.5px">${r.note}</td>
        </tr>`).join('');
    }
    const sent = document.querySelector('[data-analyst-sentiment]');
    if (sent) {
      sent.innerHTML = `
        <div><div style="color:var(--fg-2);font-size:11.5px;text-transform:uppercase;letter-spacing:.08em;font-weight:600">Retail</div><div style="margin-top:6px">${a.sentiment.retail}</div></div>
        <div><div style="color:var(--fg-2);font-size:11.5px;text-transform:uppercase;letter-spacing:.08em;font-weight:600">Institutional</div><div style="margin-top:6px">${a.sentiment.institutional}</div></div>
        <div><div style="color:var(--fg-2);font-size:11.5px;text-transform:uppercase;letter-spacing:.08em;font-weight:600">Short interest</div><div style="margin-top:6px">${a.sentiment.shortInterest}</div></div>`;
    }
    const srcs = document.querySelector('[data-analyst-sources]');
    if (srcs) {
      srcs.innerHTML = a.sources.map(s => `<a href="${s.url}" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:underline">${s.label}</a>`).join(' · ');
    }
  }

  // ---------- NEW: Policy (45X / FEOC) ----------
  function renderPolicy() {
    if (!D.policy) return;
    setEl('[data-policy-title]', D.policy.title);
    setEl('[data-policy-summary]', D.policy.summary);
    setEl('[data-policy-impact]', D.policy.eosImpact);
    setEl('[data-policy-risk]', D.policy.riskNote);
    const srcs = document.querySelector('[data-policy-sources]');
    if (srcs) srcs.innerHTML = D.policy.sources.map(s =>
      `<a href="${s.url}" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:underline">${s.label}</a>`).join(' · ');
  }

  // ---------- NEW: Legal disclosure ----------
  function renderLegal() {
    if (!D.legal) return;
    const c = D.legal.case;
    const tbody = document.querySelector('[data-legal-case] tbody');
    if (tbody) {
      tbody.innerHTML = `
        <tr><td style="color:var(--fg-2);width:30%">Case</td><td><b>${c.name}</b></td></tr>
        <tr><td style="color:var(--fg-2)">Docket</td><td><b>${c.number}</b> · ${c.court}</td></tr>
        <tr><td style="color:var(--fg-2)">Class period</td><td>${c.classPeriod}</td></tr>
        <tr><td style="color:var(--fg-2)">Lead-plaintiff deadline</td><td>${c.leadDeadline}</td></tr>
        <tr><td style="color:var(--fg-2)">Status</td><td>${c.status}</td></tr>
        <tr><td style="color:var(--fg-2)">Allegations</td><td>${c.allegations}</td></tr>
        <tr><td style="color:var(--fg-2)">Trigger event</td><td>${c.trigger}</td></tr>`;
    }
    setEl('[data-legal-note]', D.legal.note);
    setEl('[data-legal-firms]', D.legal.advertisingFirms.join(' · '));
    const srcs = document.querySelector('[data-legal-sources]');
    if (srcs) srcs.innerHTML = D.legal.sources.map(s =>
      `<a href="${s.url}" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:underline">${s.label}</a>`).join(' · ');
  }

  // ---------- NEW: Product specs + competitive ----------
  function renderProduct() {
    const ps = document.querySelector('[data-product-specs] tbody');
    if (ps && D.productSpecs) {
      ps.innerHTML = D.productSpecs.map(r => `
        <tr><td style="color:var(--fg-2)">${r.k}</td><td><b>${r.v}</b></td><td style="color:var(--fg-2);font-size:12.5px">${r.why}</td></tr>`).join('');
    }
    const cb = document.querySelector('[data-competitive] tbody');
    if (cb && D.competitive) {
      cb.innerHTML = D.competitive.map(r => `
        <tr><td><b>${r.tech}</b></td><td style="color:var(--fg-2)">${r.lead}</td><td class="num">${r.duration}</td><td style="color:var(--fg-2);font-size:12.5px">${r.status}</td><td style="font-size:12.5px">${r.edge}</td></tr>`).join('');
    }
  }

  // ---------- CSV export ----------
  function exportCSV() {
    const rows = [['Quarter', 'Revenue $M', 'Gross Margin %', 'Operating Income $M', 'Cash $M', 'Type']];
    D.quarterTable.forEach(r => rows.push([r.q, r.rev, r.gm, r.op, r.liq, r.type === 'A' ? 'Actual' : 'Projected']));
    // also append full quarterly revenue series
    rows.push([]);
    rows.push(['Quarter', 'Revenue $M', 'Type']);
    D.quarterlyRevenue.forEach(r => rows.push([r.q, r.v, r.type]));
    const csv = rows.map(r => r.map(c => `"${c == null ? '' : c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `EOSE-data-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a); a.click(); a.remove();
  }

  // ---------- Section nav: scroll spy + URL hash ----------
  function initScrollSpy() {
    const links = document.querySelectorAll('.section-nav a');
    const sections = Array.from(links).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    function onScroll() {
      const y = window.scrollY + 220;
      let active = 0;
      sections.forEach((s, i) => { if (s && s.offsetTop <= y) active = i; });
      links.forEach((l, i) => l.classList.toggle('is-active', i === active));
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    links.forEach(l => l.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(l.getAttribute('href'));
      if (!target) return;
      const y = target.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: 'smooth' });
      if (history.replaceState) history.replaceState(null, '', l.getAttribute('href'));
    }));
    // Deep-link to anchor on initial load
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) setTimeout(() => {
        const y = target.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top: y });
      }, 50);
    }
  }

  // ---------- Filter buttons (revenue toggle) ----------
  function initToggles() {
    document.querySelectorAll('.form-pill').forEach(pill => {
      pill.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
          pill.querySelectorAll('button').forEach(b => b.classList.remove('is-active'));
          btn.classList.add('is-active');
          const mode = btn.dataset.mode;
          const target = pill.dataset.target;
          if (target === 'revenue') {
            const host = document.querySelector('[data-chart-revenue]');
            if (mode === 'quarterly') {
              C.barChart(host, D.quarterlyRevenue, { colorByType: true, height: 340 });
            } else {
              C.barChart(host, D.annualRevenue, { colorByType: true, height: 340 });
            }
          }
        });
      });
    });
  }

  // ---------- Init ----------
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderTicker();
    renderHero();
    renderKpis();
    renderQuarterTable();
    renderContracts();
    renderScenarios();
    renderFunnel();
    renderFilings();
    renderNews();
    renderCatalysts();
    renderRisks();
    renderFrontier();
    renderCapStructure();
    renderProduct();
    renderHistory();
    renderAnalysts();
    renderPolicy();
    renderLegal();
    renderScorecard();
    renderSentiment();
    renderRumors();

    // Charts
    chart('[data-chart-revenue]',  h => C.barChart(h, D.quarterlyRevenue, { colorByType: true, height: 340 }));
    chart('[data-chart-annual]',   h => C.barChart(h, D.annualRevenue,    { colorByType: true, height: 280 }));
    chart('[data-chart-margin]',   h => C.areaChart(h, D.grossMargin,     { clamp: [-350, 50], breakeven: true, height: 320, yFormat: v => v.toFixed(0) + '%', tipFormat: v => v.toFixed(0) + '%' }));
    chart('[data-chart-opincome]', h => C.barChart(h, D.opIncome,         { colorByType: true, profitColor: true, height: 320 }));
    chart('[data-chart-liquidity]',h => C.areaChart(h, D.liquidity,       { height: 280 }));
    chart('[data-chart-capacity]', h => C.stackedBars(h, D.capacity, {
      keys: ['l1','l2','l3','l4','l5'], height: 320,
      colors: ['#0E5D49', '#1F8556', '#4FB31E', '#84D414', '#B8EA4A']
    }));
    chart('[data-chart-uptime]',   h => C.areaChart(h, D.uptime, { height: 240, yFormat: v => v.toFixed(0) + '%', tipFormat: v => v.toFixed(1) + '%' }));
    chart('[data-chart-graphite]', h => C.barChart(h, D.graphite, { fill: 'var(--brand-violet)', height: 240, tipFormat: v => v.toFixed(0) + ' t', yFormat: v => v.toFixed(0) + ' t' }));
    chart('[data-chart-backlog]',  h => C.areaChart(h, D.backlog,  { height: 300 }));
    chart('[data-chart-bookings]', h => C.barChart(h, D.bookings,  { fill: 'var(--accent)', height: 240 }));
    chart('[data-chart-ps]',       h => C.areaChart(h, D.psMultiple, { height: 260, yFormat: v => v.toFixed(0) + 'x', tipFormat: v => v.toFixed(1) + 'x' }));
    chart('[data-chart-mcap]',     h => C.barChart(h, D.marketCap, { fill: 'var(--accent)', height: 260 }));
    chart('[data-chart-bridge]',   h => C.dualBridge(h, D.bridge,  { height: 320 }));
    renderAllCharts();

    initScrollSpy();
    initToggles();

    // Live quote (fire-and-forget; non-blocking)
    loadQuote();

    window.addEventListener('resize', () => {
      clearTimeout(window.__rt);
      window.__rt = setTimeout(renderAllCharts, 200);
    });

    // Theme toggle
    document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme');
      setTheme(cur === 'dark' ? 'light' : 'dark');
    });
  });

  // expose for tweaks panel + CSV button
  window.EOSE_APP = { setTheme, renderAllCharts, exportCSV };
})();
