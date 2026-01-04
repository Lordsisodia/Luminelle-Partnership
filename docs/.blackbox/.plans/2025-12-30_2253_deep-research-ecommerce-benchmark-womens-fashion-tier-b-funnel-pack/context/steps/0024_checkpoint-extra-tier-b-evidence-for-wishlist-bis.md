---
step: 0024
created_at: "2025-12-31 12:08"
title: "Checkpoint: extra Tier-B evidence for wishlist/BIS"
---

# Step 0024: Checkpoint: extra Tier-B evidence for wishlist/BIS

## ✅ What I did (facts)

- Captured 3 additional Tier‑B HTML snapshots to strengthen evidence for newly-added pattern cards without changing the baseline funnel pack counts:
  - Triangl wishlist page: `.blackbox/.plans/2025-12-30_2253.../artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-triangl-wishlist.html`
  - Frankies “Back in stock” collection: `.blackbox/.plans/2025-12-30_2253.../artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-frankies-bikinis-back-in-stock.html`
  - Ganni wishlist page (login-gated snapshot): `.blackbox/.plans/2025-12-30_2253.../artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-ganni-wishlist.html`
- Updated the pattern cards to reference the strongest direct evidence (Triangl wishlist page, Frankies BIS signals) and moved secondary examples into “Additional evidence” bullets:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-wishlist-saved-items.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-back-in-stock-waitlist.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/cart-shipping-threshold-messaging.md`
- Validated pattern cards pass evidence validation:
  - `python3 .blackbox/scripts/research/validate_pattern_cards.py --patterns-dir 05-planning/research/market-intelligence/ecommerce-benchmarking/patterns`

## 🧠 What I learned (new information)

- Triangl exposes a first-class wishlist page (`/pages/wishlist`) with explicit wishlist components in the HTML (stronger proof than “wishlist link exists somewhere”).
- Ganni’s wishlist route in this region appears to be login-gated (useful as an implementation tradeoff: account friction vs guest-friendly saves).
- Frankies’ “Back in stock” collection page is a concrete browseable re-entry point for demand capture (complements notify-me variant flows).

## 🧭 What changes because of this

- The wishlist and back‑in‑stock patterns are now backed by direct-page snapshots (higher evidence quality), making them safer to spec and prioritize even before Tier‑A screenshots.

## ➡️ Next step

- Start Tier‑A screenshot capture for these patterns (so the “pending” screenshot fields can be replaced with proof-grade evidence):
  - wishlist UI (PLP/PDP heart + wishlist page)
  - OOS “notify me” flow (variant-specific)
  - cart shipping threshold UI (progress + copy)

## 🔗 Links / references

- Extra seeds:
  - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifact-seeds/womens-top25-apparel-extra-pattern-seeds.txt`
- New snapshots:
  - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-triangl-wishlist.html`
  - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-frankies-bikinis-back-in-stock.html`
  - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-ganni-wishlist.html`
