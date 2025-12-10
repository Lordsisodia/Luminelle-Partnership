# SEO Optimization Master Plan (Lumelle)

Scope: actions to achieve “SEO-optimal” coverage for lumelle.com across crawlability, structured data, CWV, and AI/SGE visibility. Phased for execution; each task is small, verifiable, and mapped to owners.

## Phase 0 — Prep & Ownership (Day 0)
- [ ] Confirm production hostname (`lumelle.com` or alt) and update `app/public/robots.txt`, `app/public/sitemap.xml`, `app/index.html` OG image URLs accordingly.
- [ ] Verify Search Console + Merchant Center access (owners, property set as Domain property).
- [ ] Create GA4 property with site search enabled; ensure anonymized IP if required.
- [ ] Set up monitoring stack: PageSpeed Insights API + CrUX dashboard; synthetic checks for LCP/INP/CLS on `/`, `/product/shower-cap`, `/blog/*`.

## Phase 1 — Crawl & Index Hygiene (Day 1–2)
- [ ] Submit updated `sitemap.xml` in Search Console; monitor Coverage for 200/404/soft-404.
- [ ] Keep `robots.txt` allowing crawl, blocking cart/checkout/admin; confirm no staging leakage.
- [ ] Ensure canonical tags on every route via `setMetaTags` (done for main pages; audit others).
- [ ] Fix redirect chains (http→https, non-www→www or vice versa) at edge/Vercel.
- [ ] Avoid duplicate parameters: add `rel="canonical"` on filtered/search pages; disallow infinite scroll traps.

## Phase 2 — Structured Data (Day 2–3)
- [ ] PDPs: server-render `Product` schema with `Offer` (price, currency, availability), `AggregateRating`, `brand`, `gtin/sku` if available, multiple `image` URLs. Validate in Rich Results Test.
- [ ] Sitewide: `Organization` + `BreadcrumbList` + `WebSite` (with `potentialAction` for SearchAction).
- [ ] Blog posts: `Article` + optional `FAQPage` (keep ≤5 Qs) + author box (name, role, reviewed date).
- [ ] Collections/landing (if added later): `ItemList` with `itemListElement` pointing to PDPs.
- [ ] Add return/shipping policy markup under Organization or Product where applicable.
- [ ] Re-run Rich Results / Merchant Listings reports weekly until “0 errors / 0 warnings”.

## Phase 3 — Content & Intent Coverage (Day 3–6)
- [ ] Map top queries → pages: commercial (`buy shower cap`, `luxury shower cap UK`), informational (`keep silk press dry`, `shower cap for braids`), brand (`lumelle cap review`).
- [ ] Rewrite H1/title/meta per intent (55–60 chars titles; 150–170 chars meta with benefit + CTA).
- [ ] Add question-first blocks (H2 phrased as query + 40–80 word answer) to top 10 posts/pages for featured snippets/SGE.
- [ ] Build cluster pages: “Silk press in shower”, “Protective styles in steam”, “Travel/gym sauna care”, each with internal links to PDP.
- [ ] Add author bios with credentials + last-reviewed date; keep posts updated when pricing/policies change.

## Phase 4 — Performance & CWV (Day 4–6)
- [ ] Target thresholds: LCP <2.5s, INP <200ms (desktop & mobile), CLS <0.1 on `/` and PDP.
- [ ] Inline critical CSS for above-the-fold hero; defer non-critical JS; tree-shake unused libs.
- [ ] Keep hero image preloaded; lazy-load below-the-fold media; set `fetchpriority="high"` only on first image/video.
- [ ] Audit long tasks (>200ms) via Lighthouse trace; split carousels to avoid blocking main thread.
- [ ] Serve AVIF/WebP with proper `sizes`/`srcset`; ensure `width/height` to stop layout shift.
- [ ] Enable HTTP/2/3 and compression; cache static assets aggressively on CDN.
- [ ] Add `preconnect` to font/CDN origins and preload key hero images (done in index.html).
- [ ] Add `loading="lazy"` + `decoding="async"` to non-hero images on content pages (done on blog + brand story).

## Phase 5 — Merchant Center & Feeds (Day 6–7)
- [ ] Create free listings feed (Content API or file) for the product; sync price/availability daily.
- [ ] Align schema and feed data (titles, price, availability) to avoid mismatches.
- [ ] Add return policy + shipping settings in Merchant Center for enhanced snippets.

## Phase 6 — UX/CTR Enhancers (Day 7–10)
- [ ] Favicon/logo 512×512 declared in `index.html`; verify brand SERP display.
- [ ] Breadcrumbs visible and marked up for sitelinks.
- [ ] Pros/cons markup only on editorial review posts (not PDP) to avoid spam signals.
- [ ] Add structured video (if any how-to clips) with key moments; host on fast CDN.
- [ ] Improve internal linking: from blog → PDP with descriptive anchors; from PDP → care/how-to posts.

## Phase 7 — Localization & International (Optional, post-Day 10)
- [ ] If expanding beyond UK: add `hreflang` for locales; one canonical per locale.
- [ ] Local business? Add GBP/region-specific shipping & returns; GMB profile if physical pickup exists.

## Phase 8 — Governance & Monitoring (Ongoing)
- [ ] Weekly: Search Console (Coverage, Product results, Merchant listings), crawl errors, core web vitals.
- [ ] Monthly: Refresh top posts, rotate FAQs, update prices/offers, revalidate structured data.
- [ ] Release checklist: run Lighthouse mobile, Rich Results Test, and visual QA before deploy.
- [ ] Logging: track 404s and search queries on-site to feed content roadmap.

## File & Code Tasks Checklist
- [ ] Update production URLs in `app/public/robots.txt` and `app/public/sitemap.xml`; redeploy.
- [ ] Add canonical/meta to any remaining routes (check `src/pages/*`).
- [ ] Implement server-side Product/Organization/Breadcrumb schema (avoid client-only injection for critical bits).
- [ ] Add `WebSite` SearchAction JSON-LD in layout head.
- [ ] Add author/last-reviewed fields to blog content model and render in templates.
- [ ] Create three new cluster posts (silk press, protective styles, gym/sauna) using question-first format.
- [ ] Performance pass: critical CSS + lazy-load audit + long-task split; verify INP/LCP via PSI.
- [ ] Set up Merchant Center free listings feed; schedule daily sync.

## Success Metrics
- Impressions/clicks for non-brand “shower cap” + long-tail frizz queries (Search Console).
- Eligibility: Product results + Merchant listings with 0 errors.
- CWV: 75th percentile LCP <2.5s, INP <200ms, CLS <0.1 (mobile).
- CTR uplift on branded + top 5 informational queries (compare 28-day windows).

## Owners (suggested)
- SEO lead: strategy, GSC/Merchant Center, content briefs.
- Dev: structured data, performance, feeds, deployment.
- Content: copy updates, author bios, FAQ upkeep.
