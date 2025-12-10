# SEO Next Steps TODO (Working List)

Immediate (today)
- [ ] Run PSI (mobile) on `/`, `/product/shower-cap`, `/blog/lumelle-journal-launch`; log in `docs/perf-log.md`.
- [ ] Submit `https://lumelle.com/sitemap.xml` in GSC (Sitemaps) and check “Product results” & “Breadcrumb” for errors.
- [ ] Set `PSI_API_KEY` env and rerun `./scripts/run-psi.sh` to avoid quota blocks.

Short term (this sprint)
- [ ] Inline critical CSS for hero/header; test LCP delta.
- [ ] Audit bundle for unused Shopify/Clerk on public pages; if present, code-split providers where safe.
- [ ] Add author boxes (name/role/last-reviewed) to blog templates.
- [ ] Publish 3 cluster posts (silk press routine, protective styles shower guide, gym/sauna kit) with question-first H2s.
- [ ] Stand up Merchant Center feed (`docs/MERCHANT-CENTER-FEED.md`) and schedule daily fetch.

Stretch
- [ ] Lazy-load other third-party embeds (YouTube/IG if added later) via `LazyVisible`.
- [ ] Add `WebSite` SearchAction server-side for any future locale sites with hreflang.
- [ ] Monitor CWV weekly; keep `perf-log.md` updated; chase INP if >200ms (long tasks).
- [ ] Consider critters/vite-plugin-critical or manual critical CSS extraction for `/` and PDP.
