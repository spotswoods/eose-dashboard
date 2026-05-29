#!/usr/bin/env node
// Pull Frontier Power USA press releases from its WordPress REST API
// (frontierpowerusa.com is WordPress; the REST API returns clean JSON, so no
// HTML scraping). Writes:
//   data/frontier-news.json  — consumed by the dashboard news section
//   frontier-news.xml        — a clean RSS 2.0 feed served from eosesource.com
// Headlines + short excerpts + links only (links point back to the source —
// we do not republish full article bodies).

const fs = require('node:fs');
const https = require('node:https');

const SRC  = 'https://www.frontierpowerusa.com/wp-json/wp/v2/posts?per_page=25&_fields=id,date,link,title,excerpt';
const SITE = 'https://eosesource.com';

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; eosesource-news-bot/1.0; +https://eosesource.com)', 'Accept': 'application/json' } }, res => {
      if (res.statusCode !== 200) { reject(new Error('HTTP ' + res.statusCode)); return; }
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
function xmlesc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

(async () => {
  const posts = JSON.parse(await get(SRC));
  const items = posts.map(p => {
    const ex = decode(p.excerpt && p.excerpt.rendered);
    return {
      date:    (p.date || '').slice(0, 10),
      iso:     p.date,
      title:   decode(p.title && p.title.rendered),
      link:    p.link,
      excerpt: ex.length > 280 ? ex.slice(0, 277).replace(/\s+\S*$/, '') + '…' : ex
    };
  }).filter(i => i.title && i.link);

  fs.mkdirSync('data', { recursive: true });
  fs.writeFileSync('data/frontier-news.json', JSON.stringify({
    meta: { _refreshed: new Date().toISOString(), source: 'frontierpowerusa.com (WordPress REST API)', count: items.length },
    items
  }, null, 2) + '\n');

  const now = new Date().toUTCString();
  const rss =
`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Frontier Power USA — News</title>
  <link>${SITE}/#frontier-news</link>
  <atom:link href="${SITE}/frontier-news.xml" rel="self" type="application/rss+xml" />
  <description>Press releases from Frontier Power USA (frontierpowerusa.com), aggregated for EOSE investors by eosesource.com. Links point to the original source.</description>
  <language>en-us</language>
  <lastBuildDate>${now}</lastBuildDate>
${items.map(i => `  <item>
    <title>${xmlesc(i.title)}</title>
    <link>${xmlesc(i.link)}</link>
    <guid isPermaLink="true">${xmlesc(i.link)}</guid>
    <pubDate>${i.iso ? new Date(i.iso).toUTCString() : now}</pubDate>
    <description>${xmlesc(i.excerpt)}</description>
  </item>`).join('\n')}
</channel>
</rss>
`;
  fs.writeFileSync('frontier-news.xml', rss);
  console.log('Wrote ' + items.length + ' news items (JSON + RSS).');
})().catch(e => { console.error('fetch-frontier-news failed:', e.message); process.exit(1); });
