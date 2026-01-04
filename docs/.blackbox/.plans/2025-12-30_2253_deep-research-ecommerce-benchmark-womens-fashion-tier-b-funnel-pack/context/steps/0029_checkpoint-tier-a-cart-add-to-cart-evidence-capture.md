---
step: 0029
created_at: "2025-12-31 19:28"
title: "Checkpoint: Tier-A cart add-to-cart evidence capture"
---

# Step 0029: Checkpoint: Tier-A cart add-to-cart evidence capture

## ✅ What I did (facts)

- Extended the Tier‑A screenshot tool to support cart evidence capture via a Shopify “add to cart then screenshot” workflow:
  - `.blackbox/scripts/research/capture_tier_a_screenshot.py` now supports `--cart-step add-to-cart` + `--cart-variant-id`.
  - Flow: visit `/cart/add?id=<variant>&quantity=1`, then navigate to `/cart`, then capture the screenshot.
- Captured Tier‑A cart “shipping threshold” screenshots (desktop + mobile) using the new workflow:
  - Andie Swim cart — https://andieswim.com/cart
    - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/andie-swim/andie-swim__desktop__cart__shipping-threshold__20251231.png`
    - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/andie-swim/andie-swim__mobile__cart__shipping-threshold__20251231.png`
  - Carbon38 cart — https://www.carbon38.com/cart
    - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/carbon38/carbon38__desktop__cart__shipping-threshold__20251231.png`
    - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/carbon38/carbon38__mobile__cart__shipping-threshold__20251231.png`
  - ThirdLove cart — https://www.thirdlove.com/cart
    - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/thirdlove/thirdlove__desktop__cart__shipping-threshold__20251231.png`
    - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/thirdlove/thirdlove__mobile__cart__shipping-threshold__20251231.png`
  - Alo Yoga cart — https://www.aloyoga.com/cart
    - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/alo-yoga/alo-yoga__desktop__cart__shipping-threshold__20251231.png`
    - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/alo-yoga/alo-yoga__mobile__cart__shipping-threshold__20251231.png`
- Promoted the cart evidence into canonical docs so the backlog stays evidence-backed:
  - Updated pattern card: `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/cart-shipping-threshold-messaging.md`
  - Updated mapping: `05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md`
  - Updated shortlist: `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-top25-apparel-first-backlog-shortlist.md`
- Re-ran Top‑25 postprocess for updated stores to refresh evidence naming/coverage + reports:
  - `python3 .blackbox/scripts/research/postprocess_batch_audits.py ... --stores andie-swim carbon38 thirdlove alo-yoga staud`

## 🧠 What I learned (new information)

- Shopify cart evidence is significantly easier to capture headlessly than checkout evidence (fewer bot challenges), as long as we add a real variant first.
- “Free shipping threshold” messaging appears in multiple UX forms:
  - In-cart “spend X more” + progress (Carbon38 proven in Tier‑B HTML: `.blackbox/.plans/2025-12-30_2253.../artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-carbon38-cart.html`).
  - Global banners shown while in-cart (Alo/Andie examples), which still reduce shipping uncertainty but don’t provide “remaining amount” guidance.
- Locale can affect currency and threshold values; evidence should be treated as “pattern reference” rather than copying exact amounts.

## 🧭 What changes because of this

- We can now scale Tier‑A cart captures across the Top‑25 quickly (shipping threshold, promos, line-item controls), which was previously a major manual bottleneck.
- The “cart shipping threshold messaging” backlog item is now supported by both Tier‑A UI screenshots and Tier‑B code-level proof for the spend-more/progress mechanic.

## ➡️ Next step

- Capture Tier‑A proof for **Cart variant editing** (find a store that supports size/color edits in cart and capture `cart__variant-edit` with a non-empty cart).
- Add a lightweight “scroll-to-threshold” best-effort step (optional) so `cart__shipping-threshold` screenshots reliably include the message/progress area when it renders below the fold.

## 🔗 Links / references

- Capture tool: `.blackbox/scripts/research/capture_tier_a_screenshot.py`
- Pattern card: `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/cart-shipping-threshold-messaging.md`
- Mapping: `05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md`
- Shortlist: `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-top25-apparel-first-backlog-shortlist.md`
