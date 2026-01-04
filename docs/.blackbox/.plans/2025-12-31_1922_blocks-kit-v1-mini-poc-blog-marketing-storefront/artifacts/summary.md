# Summary

## Key takeaways
- Storefront/blog/sections OSS “repo discovery” is currently **saturated** (multiple targeted passes seeded 0 net-new items). The correct loop is now **mine → specify → POC**, not “search more”.
- We now have a single canonical **Blocks Kit contract spec** that defines implementable interfaces + a11y requirements for blog, marketing, and storefront blocks.
- We now have concrete OSS **file pointers** for the key blocks, so mining can be done quickly without cloning repos.

## Recommendation
- Execute a 1-day mini‑POC in this order (highest ROI):
  1) Blog/article kit: MDX/Markdown render pipeline + TOC + CodeBlock + Callout (prove a11y + deterministic rendering).
  2) Marketing sections: FAQ accordion + Pricing table + Newsletter signup (prove interactive states + success/error patterns).
  3) Storefront slice: ProductCard + CartDrawer shell + Facet UI skeleton (prove composition contracts; no backend required).
- Keep `license_bucket=verify` repos as reference-only (Spree/Solidus) until verified; prefer safe repos for any code copy.

## Links
- Run folder: `docs/.blackbox/.plans/2025-12-31_1922_blocks-kit-v1-mini-poc-blog-marketing-storefront`
- Canonical contracts: `docs/.blackbox/oss-catalog/blocks-kit-contracts.md`
- File pointers: `docs/.blackbox/oss-catalog/component-source-map.md`
