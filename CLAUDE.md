# eosesource.com — EOSE investor dashboard

Static GitHub Pages site (repo `spotswoods/eose-dashboard`, branch `main`).
Canonical host is **eosesource.com** (apex); `www.` 301-redirects to it — use the
apex (or `curl -L`) when checking the live site.

## Git rules for automated / scheduled sessions

- **Stale lock files block every commit.** If `git commit` fails with an
  `index.lock` / `HEAD.lock` / `refs/heads/main.lock` error and no git process
  is actually running, a previous run crashed — delete the stale `.git/*.lock`
  file(s) and retry. Do not leave work uncommitted because of this.
- **Always `git pull --rebase --autostash origin main` before pushing.** Remote
  GitHub Actions commit data refreshes many times a day, so local main is
  usually behind. If the autostash conflicts: take the **remote** version of
  `data/eose-news.json`, `data/frontier-news.json`, `data/history.json`,
  `data/quote.json`, and `frontier-news.xml` (the Actions own those); take the
  **local** version of `js/data.js` (local tasks own it).
- **Never commit changes under `.github/workflows/`** together with other work:
  the push credential lacks the `workflow` scope and GitHub rejects the entire
  push. Leave workflow edits uncommitted for the maintainer.
- Never hand-edit between `<!-- mn:static:begin -->` and `<!-- mn:static:end -->`
  in index.html. The local pre-commit hook runs `scripts/prerender-note.js`,
  which regenerates that block from `js/data.js` and also syncs: the hero
  "last updated" date, `article:modified_time`, JSON-LD `dateModified`,
  `og:image`/`twitter:image` (daily share card), the sitemap lastmod,
  `data/note-archive.json`, `note-feed.xml`, and `assets/og-daily.png`.

## Morning-note refresh (twice-daily scheduled task)

When updating the `morningNote` block in `js/data.js`, ALSO review the
`keyDates` block in the same file (it feeds the "Today" strip countdown chips
and the .ics calendar download):

- Add newly announced **concrete** dates — confirmed earnings date, investor
  conferences, rights-offering subscription window / prospectus dates,
  regulator decision dates. Format:
  `{ date: 'YYYY-MM-DD', short: '<chip label>', est: <bool>, label: '<full name>', detail: '<one sentence with sourcing>' }`
- `est: true` means an estimated window end (regulator windows, assumed
  earnings cadence), `est: false` means announced/company-stated.
- Correct any date that has been re-guided; remove cancelled events. Past
  dates filter out of the UI automatically, but prune entries older than a
  quarter to keep the block readable.
- Fuzzy, undated milestones belong in `catalysts`, not `keyDates`.

## Content conventions

- Every numeric claim links to a primary source (SEC EDGAR, Eos IR, Ofgem,
  NYSERDA). Modeled figures are flagged and explained in §12 Methodology.
- Bull and bear get equal real estate; the page must read fine to a skeptic.
- All dates in prose include the year (content stays up for months).
- "Not investment advice" framing is load-bearing — do not weaken it.
