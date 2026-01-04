---
step: 0022
created_at: "2025-12-31 11:27"
title: "Checkpoint: pattern-card gap closure"
---

# Step 0022: Checkpoint: pattern-card gap closure

## ✅ What I did (facts)

- Added 3 missing, high-impact pattern cards backed by Tier‑B snapshot evidence:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/cart-shipping-threshold-messaging.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-back-in-stock-waitlist.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-wishlist-saved-items.md`
- Converted these patterns into backlog rows with acceptance tests:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md`
- Promoted the patterns into the women’s fashion conversion feature checklist (so they’re discoverable from the “single pane of glass”):
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-conversion-feature-checklist.md`
- Updated plan artifacts so the run remains self-documenting:
  - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/patterns-summary.md`
  - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/summary.md`

## 🧠 What I learned (new information)

- Cart free‑shipping threshold mechanics can be proven in Tier‑B for some stores because the HTML includes explicit copy templates and/or progress UI markup:
  - Carbon38 cart snapshot: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-carbon38-cart.html`
  - ThirdLove cart snapshot: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-thirdlove-cart.html`
- Back‑in‑stock/waitlist tooling can show up outside the PDP (e.g., global BIS components and modal copy present on other pages), which makes detection feasible even with limited capture scopes:
  - Frankies Bikinis fit-guide snapshot (Klaviyo BIS modal): `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-frankies-bikinis-sizing.html`
- Wishlist capability can be inferred from global navigation + analytics events even when we don’t snapshot the wishlist page itself:
  - Ganni returns snapshot (wishlist link + `event.wishlist.*`): `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-ganni-returns.html`

## 🧭 What changes because of this

- The pattern library now covers three additional “confidence + retention” mechanics that repeatedly show up in women’s fashion and were previously missing from the build backlog.
- Product/engineering can estimate and implement these features with concrete acceptance tests before Tier‑A screenshots exist (Tier‑A is still needed for UI/placement proof).

## ➡️ Next step

- Promote these new patterns into the Top‑25 evidence-led backlog shortlist (so they appear in the default execution queue):
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-top25-apparel-first-backlog-shortlist.md`
- During Tier‑A screenshot audits, explicitly capture:
  - cart threshold UI (progress + copy)
  - wishlist/save entry points
  - OOS “notify me” flows (variant-specific)

## 🔗 Links / references

- New pattern cards:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/cart-shipping-threshold-messaging.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-back-in-stock-waitlist.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-wishlist-saved-items.md`
- Backlog mapping:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md`
