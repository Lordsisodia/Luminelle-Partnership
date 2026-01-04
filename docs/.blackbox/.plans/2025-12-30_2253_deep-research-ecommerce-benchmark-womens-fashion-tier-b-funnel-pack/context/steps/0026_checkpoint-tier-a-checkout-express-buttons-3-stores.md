---
step: 0026
created_at: "2025-12-31 18:24"
title: "Checkpoint: Tier-A checkout express buttons (3 stores)"
---

# Step 0026: Checkpoint: Tier-A checkout express buttons (3 stores)

## ✅ What I did (facts)

- Captured Tier‑A checkout screenshots proving “express checkout buttons above the fold” for 3 stores (desktop + mobile):
  - Andie Swim:
    - `docs/.blackbox/.plans/2025-12-30_2253.../artifacts/evidence/andie-swim/andie-swim__desktop__checkout__express-buttons__20251231.png`
    - `docs/.blackbox/.plans/2025-12-30_2253.../artifacts/evidence/andie-swim/andie-swim__mobile__checkout__express-buttons__20251231.png`
  - Carbon38:
    - `docs/.blackbox/.plans/2025-12-30_2253.../artifacts/evidence/carbon38/carbon38__desktop__checkout__express-buttons__20251231.png`
    - `docs/.blackbox/.plans/2025-12-30_2253.../artifacts/evidence/carbon38/carbon38__mobile__checkout__express-buttons__20251231.png`
  - ThirdLove:
    - `docs/.blackbox/.plans/2025-12-30_2253.../artifacts/evidence/thirdlove/thirdlove__desktop__checkout__express-buttons__20251231.png`
    - `docs/.blackbox/.plans/2025-12-30_2253.../artifacts/evidence/thirdlove/thirdlove__mobile__checkout__express-buttons__20251231.png`
- Documented the pattern with proof-grade evidence:
  - Updated `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/checkout-express-checkout.md` to replace `pending` with Tier‑A screenshot link + updated notes.
  - Added “Additional evidence” bullets to show the pattern repeats across stores (Carbon38 + ThirdLove).
- Promoted Tier‑A checkout proof into the canonical execution surfaces:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md` (Checkout express + trust row)
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-top25-apparel-first-backlog-shortlist.md` (Tier‑A proof captured section)
- Ran postprocess to refresh reports and keep the plan artifacts current:
  - `python3 .blackbox/scripts/research/postprocess_batch_audits.py ... --stores andie-swim carbon38 thirdlove`

## 🧠 What I learned (new information)

- For Shopify-based stores, hitting `/checkout` directly is unreliable in headless mode (often redirects to homepage); a stable path is:
  - `/<store>/cart/<variant_id>:1?checkout` → generates a real `checkouts/...` session URL.
- Express checkout modules are consistently top-of-page (Shop Pay / PayPal / G Pay) in this cohort, validating the Tier‑B “token presence” signals as **real UI placement**.
- Some stores surface additional pay options and trust cues inline (e.g., Afterpay appears in ThirdLove’s payment section), reinforcing the need to spec “minimal buttons + progressive disclosure” rather than a long button wall.

## 🧭 What changes because of this

- The “Checkout express + trust” backlog item is now backed by Tier‑A screenshots (not just HTML vendor tokens), which makes it safe to treat as a baseline checkout requirement.
- The capture workflow is now repeatable: we can scale checkout screenshot proof to the top 10 “checkout signal density” stores quickly.

## ➡️ Next step

- Capture `checkout__trust-cues` and `checkout__delivery-estimate` for the same 3–5 stores (these often require a scroll or reaching shipping step).
- Expand to the remaining stores in `BATCH-CHECKOUT.md` (Alo Yoga likely requires manual/browser-based capture due to bot protection).

## 🔗 Links / references

- Pattern card: `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/checkout-express-checkout.md`
- Evidence examples:
  - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/andie-swim/andie-swim__desktop__checkout__express-buttons__20251231.png`
  - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/carbon38/carbon38__desktop__checkout__express-buttons__20251231.png`
  - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/thirdlove/thirdlove__desktop__checkout__express-buttons__20251231.png`
