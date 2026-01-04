# E-commerce Pattern Card

Pattern name: Cart free‑shipping threshold messaging (progress + remaining amount)

Funnel stage: cart

Problem it solves: Low-AOV carts and shipping uncertainty create hesitation and abandonment (especially on mobile).

Why it works: A clear “spend X more for free shipping” cue gives shoppers an easy next step, can lift AOV, and reduces “surprise shipping cost” anxiety before checkout.

Evidence (required):
- Store: Carbon38
- Page URL: https://www.carbon38.com/cart
- Screenshot link: docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/carbon38/carbon38__desktop__cart__shipping-threshold__20251231.png
- Tier‑B snapshot (HTML, cart): `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-carbon38-cart.html`
- Notes (what the evidence proves):
  - Tier‑B cart HTML includes explicit threshold messaging + progress indicator (example string: “Spend … more and get free shipping!” + progress width/aria).
  - Tier‑A screenshot shows the real cart UI context where this messaging is surfaced (drawer/page UI depends on store/theme/locale).

Additional Tier‑B evidence (supporting examples):
- ThirdLove cart includes both “remaining amount” and “free shipping achieved” copy templates:
  - URL: https://www.thirdlove.com/cart
  - Snapshot: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-thirdlove-cart.html`

Additional Tier‑A examples (threshold copy surfaced in-cart or in-cart UI):
- ThirdLove cart (free shipping threshold copy) — https://www.thirdlove.com/cart
  - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/thirdlove/thirdlove__desktop__cart__shipping-threshold__20251231.png`
  - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/thirdlove/thirdlove__mobile__cart__shipping-threshold__20251231.png`
- Andie Swim cart (threshold surfaced as global “free shipping on orders $X+” cue while in-cart) — https://andieswim.com/cart
  - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/andie-swim/andie-swim__desktop__cart__shipping-threshold__20251231.png`
  - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/andie-swim/andie-swim__mobile__cart__shipping-threshold__20251231.png`
- Alo Yoga cart (threshold surfaced as global “free shipping over …” cue while in-cart) — https://www.aloyoga.com/cart
  - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/alo-yoga/alo-yoga__desktop__cart__shipping-threshold__20251231.png`
  - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/alo-yoga/alo-yoga__mobile__cart__shipping-threshold__20251231.png`
- Marine Layer cart (progress bar + “Spend $X more…” message) — https://www.marinelayer.com/cart
  - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/marine-layer/marine-layer__desktop__cart__shipping-threshold__20251231.png`

Implementation notes (for our builds):
- UI placement: near cart summary/subtotal; consider a compact progress bar; avoid “banner spam”.
- Copy guidance: show remaining amount + threshold; keep it short; avoid guilt-y language.
- Data required: region-aware thresholds, cart subtotal, promo stacking rules, shipping methods eligibility.
- Edge cases: thresholds vary by region/loyalty; discounts vs pre-discount subtotal; gift cards; bundles; split shipments; pickup vs ship; currency formatting.

Tradeoffs / risks:
- If threshold messaging doesn’t match checkout shipping rates (or eligibility rules), trust collapses.

Related patterns:
- Cart variant editing
- Checkout express buttons + trust cues above fold
- Global region routing (thresholds differ by locale)
