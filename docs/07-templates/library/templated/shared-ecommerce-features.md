# Shared e‑commerce feature set (deployable across clients)

This doc lists the core modules we should keep portable when spinning up a new shop from the template. All are already implemented in the codebase; flip on/off per client.

## 1) Admin suite
- Product/catalog CRUD, pricing, media, tags, inventory hooks.
- Content blocks for hero, promos, FAQ, reviews.
- Order/discount toggles and feature flags.

## 2) Affiliates/creators
- Public onboarding page + form for creators/affiliates.
- Payout terms & FAQ, examples, and testimonial slots.
- Links into scripts/shotlists; optional approval queue.

## 3) Landing page
- Social proof bar, hero CTA, product spotlight slider, trust badges.
- Bundles/offer rows, FAQ, footer newsletter capture.

## 4) Product detail pages (PDP)
- Media gallery (img/video), badges, price/compare-at, buy/add CTAs.
- Details/ingredients, highlights, reviews, related products.
- Cart drawer trigger + free‑shipping progress.

## 5) Cart side drawer (global)
- Mini-cart with qty controls, upsells, free‑shipping meter.
- Tabs for menu/cart; sticky checkout CTA; drawer open events.

## 6) Blog
- Index + post pages with SEO meta, hero, and related posts.

## 7) Points / gamification system
- (Currently disabled per client) Earn on purchases, reviews, referrals.
- Tiering, points balance display, redemption hooks.

## 8) Social actions tracking
- (Disabled with rewards) Capture follows/likes/posts; award points once verified.

Notes
- Keep feature flags so we can enable/disable per client quickly.
- Shared components live under `src/domains/*` and `src/ui/providers`; check `docs/07-templates/library/templated/template-map.md` for wiring.
