# SEO Validation Checklist (Rich Results + GSC)

Use this after each deploy to production (e.g., https://lumelle.com). All tests should be run on the live URLs.

## 1) Google Search Console
- Open GSC Domain property: `lumelle.com`.
- Sitemaps: submit/refresh `https://lumelle.com/sitemap.xml`, confirm “Success” status.
- Pages/Coverage: filter by “Submitted sitemap”; ensure no `Submitted URL blocked by robots` or `Soft 404`.
- Enhancements → Product results: expect 0 errors/0 warnings after recrawl.
- Enhancements → Breadcrumbs: expect 0 errors/0 warnings.
- (If using Merchant Center) check “Merchant listings” for data mismatches (price/availability).

## 2) Rich Results Test (RRT)
Run RRT for both “Googlebot Smartphone” and “Googlebot Desktop”:
- Product: `https://lumelle.com/product/shower-cap`
  - Expect: Product, Breadcrumb rich result detected; no critical warnings. Price, currency GBP, availability InStock, return policy present.
- Homepage: `https://lumelle.com/`
  - Expect: Organization, WebSite (SearchAction), Breadcrumb (via child links may not show), no errors.
- Blog index: `https://lumelle.com/blog`
  - Expect: Blog, Breadcrumb rich result; no errors.
- One blog post: `https://lumelle.com/blog/lumelle-journal-launch`
  - Expect: Article and Breadcrumb; FAQ may be detected but not guaranteed to render in SERP.

## 3) URL Inspection (GSC)
- Inspect `/product/shower-cap`, `/`, `/blog`, one blog post.
- Confirm “URL is on Google” and “Page is mobile-friendly”.

## 4) Core Web Vitals spot-check
- PageSpeed Insights (mobile) for `/` and `/product/shower-cap`.
  - Targets: LCP < 2.5s, INP < 200ms, CLS < 0.1.
  - Note any “Reduce main-thread work” or “Eliminate render-blocking resources” items.

## 5) After fixes
- Re-run RRT on affected URLs.
- In GSC Enhancements (Product/Breadcrumb), click “Validate Fix” if errors were present.
