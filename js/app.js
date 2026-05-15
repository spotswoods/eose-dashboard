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

  // ---------- Live quote (Stooq, delayed, no key) ----------
  async function loadQuote() {
    try {
      const r = await fetch('https://stooq.com/q/l/?s=eose.us&f=sd2t2ohlcv&h&e=csv');
      const txt = await r.text();
      const rows = txt.trim().split('\n');
      if (rows.length < 2) throw new Error('no data');
      const cells = rows[1].split(',');
      const o = parseFloat(cells[3]);
      const c = parseFloat(cells[6]);
      const v = parseInt(cells[7], 10);
      if (!isFinite(c) || c === 0) throw new Error('stale');
      const chg = c - o;
      const pct = (chg / o) * 100;
      D.ticker.price = c;
      D.ticker.change = chg;
      D.ticker.changePct = pct;
      D.ticker.volume = isFinite(v) ? v / 1e6 : 0;
      D.ticker.marketCap = c * D.ticker.shares;
      D.ticker.asOf = 'Stooq · ' + new Date().toLocaleString();
      // 52-week range from daily history
      try {
        const today = new Date();
        const past = new Date(); past.setFullYear(past.getFullYear() - 1);
        const fmt = d => d.toISOString().slice(0, 10).replace(/-/g, '');
        const hr = await fetch(`https://stooq.com/q/d/l/?s=eose.us&d1=${fmt(past)}&d2=${fmt(today)}&i=d`);
        const ht = await hr.text();
        const hrows = ht.trim().split('\n').slice(1);
        const closes = hrows.map(r => parseFloat(r.split(',')[4])).filter(isFinite);
        if (closes.length) {
          D.ticker.high52 = Math.max(...closes);
          D.ticker.low52  = Math.min(...closes);
        }
      } catch (e) { /* non-fatal */ }
      renderTicker();
      renderHero();
    } catch (e) {
      setEl('[data-tk-price]', '$—');
      const ch = document.querySelector('[data-tk-change]');
      if (ch) ch.textContent = 'quote unavailable';
      setEl('[data-hero-price]', '$—');
      const hc = document.querySelector('[data-hero-change]');
      if (hc) hc.textContent = 'live quote unavailable — see your broker';
      setEl('[data-hero-asof]', 'Stooq blocked or offline');
    }
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
    grid.innerHTML = D.scenarios.map(s => `
      <div class="scenario ${s.name.toLowerCase().replace(' ', '-')} ${s.name === 'Bull' ? 'bull' : ''}">
        <div class="scenario__name">${s.name} case</div>
        <div class="scenario__price">$${s.price.toFixed(2)}</div>
        <div class="scenario__upside ${s.tone}">${s.upside} vs. $4.50</div>
        <div class="scenario__row"><span class="k">FY28 Revenue</span><span class="v">${C.fmtMoney(s.rev)}</span></div>
        <div class="scenario__row"><span class="k">EV / Revenue</span><span class="v">${s.ev.toFixed(1)}x</span></div>
        <div class="scenario__row"><span class="k">Implied mcap</span><span class="v">$${(s.mcap / 1000).toFixed(2)}B</span></div>
      </div>`).join('');
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
