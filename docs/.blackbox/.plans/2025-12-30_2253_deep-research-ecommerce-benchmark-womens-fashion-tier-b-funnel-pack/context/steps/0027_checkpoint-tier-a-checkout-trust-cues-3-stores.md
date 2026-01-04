---
step: 0027
created_at: "2025-12-31 18:29"
title: "Checkpoint: Tier-A checkout trust cues (3 stores)"
---

# Step 0027: Checkpoint: Tier-A checkout trust cues (3 stores)

## ✅ What I did (facts)

- Captured Tier‑A checkout “trust cues” screenshots (desktop + mobile) for the same 3 high-signal stores:
  - Andie Swim:
    - `docs/.blackbox/.plans/2025-12-30_2253.../artifacts/evidence/andie-swim/andie-swim__desktop__checkout__trust-cues__20251231.png`
    - `docs/.blackbox/.plans/2025-12-30_2253.../artifacts/evidence/andie-swim/andie-swim__mobile__checkout__trust-cues__20251231.png`
  - Carbon38:
    - `docs/.blackbox/.plans/2025-12-30_2253.../artifacts/evidence/carbon38/carbon38__desktop__checkout__trust-cues__20251231.png`
    - `docs/.blackbox/.plans/2025-12-30_2253.../artifacts/evidence/carbon38/carbon38__mobile__checkout__trust-cues__20251231.png`
  - ThirdLove:
    - `docs/.blackbox/.plans/2025-12-30_2253.../artifacts/evidence/thirdlove/thirdlove__desktop__checkout__trust-cues__20251231.png`
    - `docs/.blackbox/.plans/2025-12-30_2253.../artifacts/evidence/thirdlove/thirdlove__mobile__checkout__trust-cues__20251231.png`
- Re-ran postprocess batch to refresh evidence coverage + reports:
  - `python3 .blackbox/scripts/research/postprocess_batch_audits.py ... --stores andie-swim carbon38 thirdlove`

## 🧠 What I learned (new information)

- On Shopify checkout, “trust cues” are typically expressed via:
  - explicit microcopy (“secure and encrypted”)
  - payment-brand iconography (cards + wallets)
  - footer policy links (refund/shipping/privacy/terms)
- These cues are often present without a dedicated “trust badge module”, which suggests we should spec **lightweight, native cues** rather than heavy “badge stacks”.

## 🧭 What changes because of this

- Evidence coverage for these 3 stores now includes both `checkout__express-buttons` and `checkout__trust-cues`, making it easier to enforce a minimum checkout evidence set while we work on delivery estimate capture.

## ➡️ Next step

- Implement a Tier‑A capture path for `checkout__delivery-estimate` that can fill the checkout form (address) to reach shipping-method step and screenshot the delivery promise.

## 🔗 Links / references

- Evidence coverage report (generated): `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence-coverage.md`
