// Rights-offering payoff calculator (rights-offering.html).
// Adapted from a standalone tool: IDs are namespaced roi-*, and chart colors
// are read from the site's CSS variables so it matches the theme.
//
// Mechanics (from the June 30, 2026 8-K / 424B5):
//   1 right per share held · 1 right = 0.071193 unit (est., ~1 unit per 14 rights)
//   each unit = 1 share + 0.4388 warrant · subscription $5.481/unit · strike $5.481
// The plain-stock comparison spends the identical cash at ENTRY. Scenario math,
// not advice; warrants valued at intrinsic only (selling on market adds premium).
(function () {
  const STRIKE = 5.481, RATIO = 0.071193, WPU = 0.4388, ENTRY = 5.25;
  const $ = id => document.getElementById(id);
  const sharesEl = $('roi-shares'), priceEl = $('roi-price');
  if (!sharesEl || !priceEl) return;   // calculator not on this page

  const cssVar = n => getComputedStyle(document.body).getPropertyValue(n).trim();
  const fmt  = n => '$' + Math.round(n).toLocaleString('en-US');
  const fmt2 = n => '$' + n.toFixed(2);
  const num  = n => n.toLocaleString('en-US');

  function setProfit(id, pr, cost) {
    const el = $(id);
    const pct = cost > 0 ? (pr / cost * 100) : 0;
    el.textContent = (pr >= 0 ? '+' : '−') + '$' + Math.round(Math.abs(pr)).toLocaleString('en-US') +
      '  (' + (pr >= 0 ? '+' : '−') + Math.abs(pct).toFixed(0) + '%)';
    el.className = 'roi-profit ' + (pr > cost * 0.01 ? 'up' : pr < -cost * 0.01 ? 'down' : 'flat');
  }

  function draw() {
    const held = Math.max(0, Math.floor(+sharesEl.value || 0));
    const P = +priceEl.value;
    const units = Math.floor(held * RATIO);
    const cost = units * STRIKE;
    const warr = units * WPU;
    const intr = Math.max(0, P - STRIKE);
    const sShares = cost / ENTRY;

    $('roi-priceOut').textContent = fmt2(P);
    $('roi-fRights').textContent = num(held);
    $('roi-fUnits').textContent = num(units);
    $('roi-fCost').textContent = fmt(cost);
    $('roi-fShares').textContent = num(units);
    $('roi-fWarr').textContent = '~' + Math.round(warr);

    // subscribe card
    const uSh = units * P, uWa = warr * intr, uTot = uSh + uWa, uPr = uTot - cost;
    $('roi-uDesc').textContent = `${num(units)} sh + ${Math.round(warr)} wts for ${fmt(cost)}`;
    setProfit('roi-uProfit', uPr, cost);
    $('roi-uCostL').textContent = fmt(cost);
    $('roi-uSharesV').textContent = fmt(uSh);
    $('roi-uWarrV').textContent = fmt(uWa);
    $('roi-uTotal').textContent = fmt(uTot);

    // plain-stock card
    const sTot = sShares * P, sPr = sTot - cost;
    $('roi-sDesc').textContent = `${sShares.toFixed(0)} sh @ ${fmt2(ENTRY)} for ${fmt(cost)}`;
    setProfit('roi-sProfit', sPr, cost);
    $('roi-sCostL').textContent = fmt(cost);
    $('roi-sSharesV').textContent = fmt(sTot);
    $('roi-sTotal').textContent = fmt(sTot);

    // delta narrative
    const d = uPr - sPr, lead = $('roi-dLead'), txt = $('roi-dText');
    if (units === 0) {
      lead.textContent = 'Not enough rights';
      txt.innerHTML = 'Below ~14 shares the rights round down to zero units. Selling the rights on-market is the only way to extract value.';
    } else if (Math.abs(d) < Math.max(3, cost * 0.005)) {
      lead.textContent = 'Dead heat at this price';
      txt.innerHTML = `Both routes make about the same here — roughly the crossover point. Above it the warrants start paying; below it the plain-stock head start (${sShares.toFixed(0)} vs ${num(units)} shares) matters more.`;
    } else if (d > 0) {
      lead.textContent = `Subscribing beats stock by ${fmt(d)}`;
      txt.innerHTML = `At <b>${fmt2(P)}</b> the offering route makes <span class="win">${fmt(uPr)}</span> vs <b>${fmt(sPr)}</b> for plain stock. The gap is your ${Math.round(warr)} warrants: each is worth ${fmt2(intr)} up here, and they came bundled nearly free.`;
    } else {
      lead.textContent = `Plain stock ahead by ${fmt(-d)}`;
      txt.innerHTML = `At <b>${fmt2(P)}</b> plain stock makes <b>${fmt(sPr)}</b> vs <span class="lose">${fmt(uPr)}</span> for the offering. Below the crossover the extra shares beat the warrant kicker — and if your target is under $5.481, selling your rights beats both.`;
    }

    chart(P, units, warr, cost, sShares);
  }

  function chart(P, units, warr, cost, sShares) {
    const W = 800, H = 300, ML = 62, MR = 14, MT = 14, MB = 32, PMIN = 3, PMAX = 20;
    const cAccent = cssVar('--accent') || '#84D414';
    const cStock  = cssVar('--brand-violet') || '#7C7CFF';
    const cLine   = cssVar('--line-2') || '#26313F';
    const cFaint  = cssVar('--fg-3') || '#5F7359';
    const cMuted  = cssVar('--fg-2') || '#8FA585';
    const cNeg    = cssVar('--negative') || '#FF6B85';
    const cFg     = cssVar('--fg-0') || '#ECF6E0';
    const mono = 'var(--font-mono), ui-monospace, monospace';

    const uProfit = p => units * p + warr * Math.max(0, p - STRIKE) - cost;
    const sProfit = p => sShares * p - cost;
    const lo = Math.min(uProfit(PMIN), sProfit(PMIN)), hi = Math.max(uProfit(PMAX), sProfit(PMAX));
    const pad = (hi - lo) * 0.06 || 1;
    const Y = v => H - MB - ((v - (lo - pad)) / ((hi + pad) - (lo - pad))) * (H - MT - MB);
    const X = p => ML + (p - PMIN) / (PMAX - PMIN) * (W - ML - MR);
    let s = '';
    for (let g = 0; g <= 4; g++) {
      const v = (lo - pad) + ((hi + pad) - (lo - pad)) * g / 4, y = Y(v);
      s += `<line x1="${ML}" y1="${y}" x2="${W - MR}" y2="${y}" stroke="${cLine}"/>`;
      s += `<text x="${ML - 8}" y="${y + 4}" text-anchor="end" font-size="11" fill="${cFaint}" font-family="${mono}">${v >= 0 ? '+' : '−'}$${Math.round(Math.abs(v)).toLocaleString()}</text>`;
    }
    for (let xp = 4; xp <= 20; xp += 4)
      s += `<text x="${X(xp)}" y="${H - 11}" text-anchor="middle" font-size="11" fill="${cFaint}" font-family="${mono}">$${xp}</text>`;
    s += `<line x1="${ML}" y1="${Y(0)}" x2="${W - MR}" y2="${Y(0)}" stroke="${cMuted}" stroke-dasharray="3 5"/>`;
    s += `<line x1="${X(STRIKE)}" y1="${MT}" x2="${X(STRIKE)}" y2="${H - MB}" stroke="${cNeg}" stroke-dasharray="5 5" opacity=".6"/>`;
    const path = fn => { let d = ''; for (let i = 0; i <= 160; i++) { const xp = PMIN + (PMAX - PMIN) * i / 160; d += (i ? 'L' : 'M') + X(xp).toFixed(1) + ' ' + Y(fn(xp)).toFixed(1) + ' '; } return d; };
    s += `<path d="${path(sProfit)}" fill="none" stroke="${cStock}" stroke-width="2.2"/>`;
    s += `<path d="${path(uProfit)}" fill="none" stroke="${cAccent}" stroke-width="2.6"/>`;
    s += `<line x1="${X(P)}" y1="${MT}" x2="${X(P)}" y2="${H - MB}" stroke="${cFg}" opacity=".35"/>`;
    s += `<circle cx="${X(P)}" cy="${Y(sProfit(P))}" r="5" fill="${cStock}"/>`;
    s += `<circle cx="${X(P)}" cy="${Y(uProfit(P))}" r="5.5" fill="${cAccent}"/>`;
    $('roi-chart').innerHTML = s;
  }

  sharesEl.addEventListener('input', draw);
  priceEl.addEventListener('input', draw);
  draw();
})();
