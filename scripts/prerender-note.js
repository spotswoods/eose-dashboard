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
          <p><span data-mn-session>${esc(sessionLabel)}</span></p>
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

  if (idx !== idxBefore) {
    fs.writeFileSync(idxPath, idx);
    changed.push('index.html');
  }

  // ---- sitemap.xml ----
  const smPath = path.join(ROOT, 'sitemap.xml');
  const smBefore = fs.readFileSync(smPath, 'utf8');
  const sm = replaceOnce(smBefore,
    /(<loc>https:\/\/eosesource\.com\/<\/loc>\s*<lastmod>)[^<]*(<\/lastmod>)/,
    `$1${isoDate}$2`,
    'homepage <lastmod>', 'sitemap.xml');
  if (sm !== smBefore) {
    fs.writeFileSync(smPath, sm);
    changed.push('sitemap.xml');
  }

  if (changed.length) console.log(changed.join(' '));
}

main();
