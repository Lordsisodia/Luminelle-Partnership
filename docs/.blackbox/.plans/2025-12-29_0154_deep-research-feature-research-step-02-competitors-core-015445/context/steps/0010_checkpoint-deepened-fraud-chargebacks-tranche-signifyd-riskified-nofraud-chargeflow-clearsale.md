---
step: 0010
created_at: "2025-12-29 20:54"
title: "Checkpoint: deepened fraud/chargebacks tranche (Signifyd/Riskified/NoFraud/Chargeflow/ClearSale)"
---

# Step 0010: Checkpoint: deepened fraud/chargebacks tranche (Signifyd/Riskified/NoFraud/Chargeflow/ClearSale)

## ✅ What I did (facts)

- Snapshotted and extracted evidence for N=5 fraud/chargebacks competitors (home + Shopify listing/search/category pages where possible).
- Added tranche-06 deep dive sections to evidence notes (3 notable features, 2 workflows, 3 steal ideas, evidence gaps):
  - `competitors/evidence/signifyd.md`
  - `competitors/evidence/riskified.md`
  - `competitors/evidence/nofraud.md`
  - `competitors/evidence/chargeflow.md`
  - `competitors/evidence/clearsale.md`
- Normalized competitor-matrix entries so these tools compare on the same axes (guarantee posture, admin UX surfaces, rollout workflow).
- Fixed two key evidence gaps:
  - NoFraud Shopify handle drift: corrected from `apps.shopify.com/nofraud` to `apps.shopify.com/nofraud-chargeback-prevention-and-protection` using a Shopify category snapshot.
  - ClearSale domain drift: corrected vendor domain to `clear.sale` (prior `clearsale.com` resolved to an unrelated site).
- Updated tranche-06 sources and durable insights:
  - `artifacts/sources.md`
  - `artifacts/summary.md`

## 🧠 What I learned (new information)

- “Guarantee / liability” is a dominant value prop in fraud tooling (clear and merchant-readable), and it shows up consistently across multiple vendors.
- Shopify App Store listing screenshots are high-signal for what vendors want to highlight (dashboards, policy simulation, approval queues, alerts, evidence automation).
- Vendor sites in this category are frequently bot-protected or Cloudflare-challenged, so Shopify listing + category pages are often the most durable evidence sources.

## 🧭 What changes because of this

- Trust-ops “thin slice” candidate is clearer: start with admin UX primitives (review queue, policy simulation, explainability, alerts, analytics) rather than trying to build underwriting/guarantees first.
- “Handle drift” (Shopify listing handles != brand names) should be treated as a recurring evidence risk; category-page snapshots are a reliable recovery method.

## ➡️ Next step

- Choose the next tranche (N=3–6) from `artifacts/competitor-seeds.txt` (good next targets: payments/checkout, inventory/OMS, loyalty).
- Run validator after tranche completion: `python3 .blackbox/scripts/validate-feature-research-run.py --plan .blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445 --kind step-02`.

## 🔗 Links / references

- Matrix: `artifacts/competitor-matrix.md`
- Sources: `artifacts/sources.md`
- Summary: `artifacts/summary.md`
- Evidence:
  - `competitors/evidence/signifyd.md`
  - `competitors/evidence/riskified.md`
  - `competitors/evidence/nofraud.md`
  - `competitors/evidence/chargeflow.md`
  - `competitors/evidence/clearsale.md`
