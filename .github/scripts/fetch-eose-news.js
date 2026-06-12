#!/usr/bin/env node
// Build the EOSE news feed (dashboard §01b) from two structured, keyless,
// official sources — no HTML scraping, no LLM, no hallucination:
//
//   1. Eos Energy press releases — eose.com WordPress REST API
//      https://www.eose.com/wp-json/wp/v2/posts
//   2. SEC EDGAR material filings — data.sec.gov submissions JSON
//      https://data.sec.gov/submissions/CIK0001805077.json
//   3. data/manual-news.json (optional) — hand-curated items for news the
//      structured sources haven't published yet (e.g. a GlobeNewswire release
//      that lands before eose.com's WP post or the EDGAR filing). Deduped
//      against the auto feed by URL and by same-day headline match, so each
//      manual item drops out automatically once the canonical source appears;
//      an optional `expires` (YYYY-MM-DD) hard-drops it after that date.
//
// Merges, de-dupes, sorts newest-first, tags each item, and writes
//   data/eose-news.json  — consumed at runtime by renderEoseNews() in app.js
//
// Headlines + short excerpts + links only (links point back to the source —
// we never republish full article bodies). Because this writes a DATA file
// (not js/data.js), a bad run can never break the page: the renderer fetches
// it with try/catch and degrades gracefully.

const fs = require('node:fs');
const https = require('node:https');

const CIK = '0001805077';
const WP_SRC  = 'https://www.eose.com/wp-json/wp/v2/posts?per_page=20&_fields=id,date,link,title,excerpt';
const SEC_SRC = `https://data.sec.gov/submissions/CIK${CIK}.json`;
// SEC fair-access policy requires a descriptive UA with a contact address.
const UA = 'eosesource-news-bot/1.0 (contact@eosesource.com)';
const MAX_ITEMS = 14;
const MAX_AGE_DAYS = 120;   // drop anything older so the feed stays current

// SEC forms worth surfacing as "news" (material events). Everything else
// (Form 3/4/5 insider trades, 144 proposed sales, SD, etc.) is filtered out.
const MATERIAL_FORMS = new Set([
  '8-K', '8-K/A', '10-Q', '10-Q/A', '10-K', '10-K/A',
  'S-1', 'S-1/A', 'S-3', 'S-3/A', 'S-3ASR', 'S-8',
  '424B3', '424B4', '424B5', 'DEF 14A', 'DEFA14A', 'DEFM14A', '425',
  'SC 13D', 'SC 13D/A', 'SC 13G', 'SC 13G/A', '6-K'
]);

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': UA, 'Accept': 'application/json' } }, res => {
      if (res.statusCode !== 200) { reject(new Error(url + ' → HTTP ' + res.statusCode)); return; }
      let body = ''; res.on('data', c => body += c); res.on('end', () => resolve(body));
    }).on('error', reject);
  });
}

// Decode WordPress-rendered HTML to plain text (strip tags + decode entities).
function decode(s) {
  return String(s || '')
    .replace(/<[^>]*>/g, '')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#0?39;|&apos;|&#8217;/g, "'")
    .replace(/&#8211;/g, '–').replace(/&#8212;/g, '—').replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ').trim();
}
function clip(s, n) {
  return s.length > n ? s.slice(0, n - 3).replace(/\s+\S*$/, '') + '…' : s;
}
function daysAgo(iso) {
  return (Date.now() - new Date(iso).getTime()) / 86400000;
}

// Tag a press release by keyword so the dashboard badge stays meaningful.
function tagForPR(title) {
  const t = title.toLowerCase();
  if (/(q[1-4]|quarter|full year|fiscal|revenue|results|earnings|guidance)/.test(t)) return 'catalyst';
  if (/(frontier|cerberus|joint venture|jv|agreement|offering|storage|gwh|order|contract|turbine|data center)/.test(t)) return 'catalyst';
  if (/(appoint|board|officer|cfo|ceo|director|hire)/.test(t)) return 'general';
  return 'general';
}

// Human-readable description for an SEC form type.
const FORM_LABEL = {
  '8-K': 'Material event (8-K)', '8-K/A': 'Material event (8-K/A)',
  '10-Q': 'Quarterly report (10-Q)', '10-K': 'Annual report (10-K)',
  'S-1': 'Registration (S-1)', 'S-3': 'Shelf registration (S-3)', 'S-3/A': 'Shelf registration (S-3/A)',
  'S-3ASR': 'Automatic shelf (S-3ASR)', 'S-8': 'Equity plan registration (S-8)',
  '424B5': 'Prospectus (424B5)', '424B3': 'Prospectus (424B3)', '424B4': 'Prospectus (424B4)',
  'DEF 14A': 'Proxy statement (DEF 14A)', 'DEFA14A': 'Proxy materials (DEFA14A)',
  'DEFM14A': 'Merger proxy (DEFM14A)', '425': 'Business-combination disclosure (425)',
  'SC 13D': 'Beneficial ownership (SC 13D)', 'SC 13D/A': 'Beneficial ownership (SC 13D/A)'
};

async function fetchPressReleases() {
  try {
    const posts = JSON.parse(await get(WP_SRC));
    if (!Array.isArray(posts)) return [];
    return posts.map(p => {
      const title = decode(p.title && p.title.rendered);
      const summary = clip(decode(p.excerpt && p.excerpt.rendered), 240);
      return {
        iso:      p.date,
        date:     (p.date || '').slice(0, 10),
        source:   'Eos Energy (press release)',
        headline: title,
        url:      p.link,
        summary,
        tag:      tagForPR(title)
      };
    }).filter(i => i.headline && i.url);
  } catch (e) {
    console.error('press-release fetch failed:', e.message);
    return [];   // soft-fail: SEC filings alone still produce a valid feed
  }
}

async function fetchSecFilings() {
  try {
    const j = JSON.parse(await get(SEC_SRC));
    const r = (j.filings && j.filings.recent) || {};
    const n = (r.form || []).length;
    const out = [];
    for (let i = 0; i < n; i++) {
      const form = r.form[i];
      if (!MATERIAL_FORMS.has(form)) continue;
      const acc = (r.accessionNumber[i] || '').replace(/-/g, '');
      const doc = r.primaryDocument[i] || '';
      const url = `https://www.sec.gov/Archives/edgar/data/${Number(CIK)}/${acc}/${doc || ''}`;
      const items = (r.items && r.items[i]) ? r.items[i] : '';
      const desc = r.primaryDocDescription && r.primaryDocDescription[i];
      out.push({
        iso:      r.filingDate[i] + 'T12:00:00Z',
        date:     r.filingDate[i],
        source:   'SEC EDGAR',
        headline: FORM_LABEL[form] || `SEC filing (${form})`,
        url,
        summary:  decode(desc) || (items ? 'Reported items: ' + items : 'Filed with the SEC via EDGAR.'),
        tag:      'sec-filing'
      });
    }
    return out;
  } catch (e) {
    console.error('SEC EDGAR fetch failed:', e.message);
    return [];   // soft-fail: press releases alone still produce a valid feed
  }
}

// Normalized headline key for cross-source dedupe (manual vs. auto items
// share the official release title but never the URL).
function headKey(item) {
  return item.date + '|' + String(item.headline || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function readManualItems() {
  try {
    const arr = JSON.parse(fs.readFileSync('data/manual-news.json', 'utf8'));
    if (!Array.isArray(arr)) return [];
    const today = new Date().toISOString().slice(0, 10);
    return arr.filter(i => i && i.iso && i.headline && i.url && (!i.expires || i.expires >= today))
              .map(({ expires, ...item }) => item);   // expires is bookkeeping, not feed data
  } catch (e) {
    return [];   // absent or invalid — the auto feed alone is a valid result
  }
}

(async () => {
  const [prs, filings] = await Promise.all([fetchPressReleases(), fetchSecFilings()]);

  const auto = [...prs, ...filings];
  const autoUrls = new Set(auto.map(i => i.url));
  const autoKeys = new Set(auto.map(headKey));
  const manual = readManualItems()
    .filter(i => !autoUrls.has(i.url) && !autoKeys.has(headKey(i)));

  const merged = [...manual, ...auto]
    .filter(i => i.iso && daysAgo(i.iso) <= MAX_AGE_DAYS)
    .sort((a, b) => new Date(b.iso) - new Date(a.iso))
    .slice(0, MAX_ITEMS);

  if (!prs.length && !filings.length) {
    throw new Error('both sources returned nothing — refusing to overwrite with an empty feed');
  }

  fs.mkdirSync('data', { recursive: true });
  fs.writeFileSync('data/eose-news.json', JSON.stringify({
    meta: {
      _refreshed: new Date().toISOString(),
      sources: ['eose.com (WordPress REST API)', 'SEC EDGAR submissions API', 'curated (data/manual-news.json)'],
      counts: { pressReleases: prs.length, secFilings: filings.length, manual: manual.length, shown: merged.length }
    },
    items: merged
  }, null, 2) + '\n');

  console.log(`Wrote data/eose-news.json — ${merged.length} items (${prs.length} PRs, ${filings.length} filings, ${manual.length} manual).`);
})().catch(e => { console.error('fetch-eose-news failed:', e.message); process.exit(1); });
