# SEO Prelaunch Checklist (Lumelle)

Run this just before any production deploy.

## Crawl/index
- [ ] `robots.txt` allows crawl; sitemap URL correct (prod domain).
- [ ] `sitemap.xml` reachable (200) and contains key URLs only.
- [ ] Canonicals present and correct on all main routes.

## Structured data
- [ ] Product schema on `/product/shower-cap` (price/availability/brand/returns) validates in Rich Results Test.
- [ ] Organization + WebSite/SearchAction present on `/`.
- [ ] Breadcrumb on major pages (home, blog, PDP).
- [ ] Article + breadcrumb on blog posts; FAQ JSON-LD present (optional).

## Content/meta
- [ ] Titles (55–60 chars) and meta descriptions (150–170 chars) intent-matched for home, PDP, top blogs.
- [ ] H1 present and unique per page; question-first H2 on snippet-target sections.
- [ ] OG/Twitter image absolute URLs; canonical matches preferred URL.

## Performance
- [ ] LCP <2.5s, INP <200ms, CLS <0.1 (mobile) on `/`, `/product/shower-cap`, `/blog/lumelle-journal-launch` via PSI.
- [ ] Hero image preloaded; non-hero images lazy + decoding async; embeds lazy via `LazyVisible`.
- [ ] Service worker/analytics deferred to idle; route code splitting enabled.

## Merchant/feeds
- [ ] Merchant Center feed live (free listings), price/availability in sync.
- [ ] Return/shipping policies set in Merchant Center and match schema/feed.

## QA
- [ ] URL Inspection (GSC) for `/`, `/product/shower-cap`, `/blog/lumelle-journal-launch` reports “URL is on Google”.
- [ ] No 404/500 in server logs for main crawl paths.
- [ ] Favicon/logo display in SERP (cached) confirmed.
