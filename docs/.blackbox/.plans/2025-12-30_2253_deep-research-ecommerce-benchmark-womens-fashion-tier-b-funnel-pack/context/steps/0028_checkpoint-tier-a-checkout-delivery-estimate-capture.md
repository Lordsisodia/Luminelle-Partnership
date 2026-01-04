---
step: 0028
created_at: "2025-12-31 18:44"
title: "Checkpoint: Tier-A checkout delivery estimate capture"
---

# Step 0028: Checkpoint: Tier-A checkout delivery estimate capture

## ✅ What I did (facts)

- Extended the Tier‑A screenshot tool to support a best‑effort “reach shipping methods” interaction before screenshot:
  - `.blackbox/scripts/research/capture_tier_a_screenshot.py` now supports `--checkout-step delivery-estimate`
  - The helper fills address fields and attempts to continue to the “Shipping method” step before capturing the screenshot.
- Captured Tier‑A delivery estimate (shipping methods step) screenshots where possible:
  - Andie Swim:
    - `docs/.blackbox/.plans/2025-12-30_2253.../artifacts/evidence/andie-swim/andie-swim__desktop__checkout__delivery-estimate__20251231.png`
    - `docs/.blackbox/.plans/2025-12-30_2253.../artifacts/evidence/andie-swim/andie-swim__mobile__checkout__delivery-estimate__20251231.png`
  - STAUD:
    - `docs/.blackbox/.plans/2025-12-30_2253.../artifacts/evidence/staud/staud__desktop__checkout__delivery-estimate__20251231.png`
    - `docs/.blackbox/.plans/2025-12-30_2253.../artifacts/evidence/staud/staud__mobile__checkout__delivery-estimate__20251231.png`
  - Carbon38: capture attempt was blocked by a Shop Pay bot challenge overlay in headless mode (evidence file shows the challenge instead of shipping methods):
    - `docs/.blackbox/.plans/2025-12-30_2253.../artifacts/evidence/carbon38/carbon38__desktop__checkout__delivery-estimate__20251231.png`
- Promoted delivery estimate evidence into the checkout pattern card for build-ready spec:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/checkout-express-checkout.md`
- Re-ran postprocess to keep evidence coverage + reports current:
  - `python3 .blackbox/scripts/research/postprocess_batch_audits.py ... --stores andie-swim staud`
- Promoted delivery estimate evidence into the canonical mapping + shortlist:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-top25-apparel-first-backlog-shortlist.md`

## 🧠 What I learned (new information)

- Delivery promise evidence is not reliably accessible from `/checkout` alone; it often requires reaching the shipping-method step by filling address fields.
- Some stores trigger bot challenges during checkout flows (Carbon38 challenge appears via Shop Pay), which means we should treat “delivery estimate capture” as a mixed Tier‑A/Tier‑A+manual workflow.

## 🧭 What changes because of this

- We can now capture “delivery estimate / shipping method options” automatically for many Shopify checkouts, which closes a key evidence gap for the checkout pattern spec.
- Carbon38 (and likely similar) needs a different capture strategy (non-headless/manual, or more advanced challenge handling).

## ➡️ Next step

- Scale delivery estimate capture across additional checkout-signal-dense stores, prioritizing those without bot challenges.
- Add a distinct “blocked_evidence” label/workflow for checkout captures that are blocked by challenges, so they don’t get mistaken for real delivery estimate proof.

## 🔗 Links / references

- Updated capture tool: `.blackbox/scripts/research/capture_tier_a_screenshot.py`
- Pattern card: `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/checkout-express-checkout.md`
- Evidence examples:
  - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/andie-swim/andie-swim__desktop__checkout__delivery-estimate__20251231.png`
  - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/staud/staud__desktop__checkout__delivery-estimate__20251231.png`
