---
status: active
updated_at_utc: 2025-12-30T11:01:41Z
owner: synthesis-agent-zero
batch: "03"
stores:
  - rouje
  - ganni
  - universal-standard
notes:
  - "Batch-03 snapshot set includes other stores (Doen, SSENSE, thredUP, Lululemon) but those snapshots are bot-challenges in this run; exclude until human capture works."
---

# Women’s Fashion Manual Audits — Capture TODO (Batch 03)

- Scope: capture **desktop + mobile** funnel evidence for:
  - `rouje` (premium DTC womenswear)
  - `ganni` (premium DTC / fashion brand)
  - `universal-standard` (inclusive sizing / fit-focused DTC)
- Output destination (screenshots):
  - `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence/<store>/`
- Output destination (notes + evidence index):
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/<store>.md`
- Naming convention (required for automation):
  - `<store>__<device>__<stage>__<feature>__YYYYMMDD.png`

## Target URLs (from preflight targets)

- Rouje:
  - home: `https://www.rouje.com`
  - PLP new-in: `https://www.rouje.com/collections/new-in`
  - PDP (example): `https://www.rouje.com/products/palo-bag`
  - cart: `https://www.rouje.com/cart`
  - size guide: `https://www.rouje.com/pages/size-guide`
  - returns: `https://www.rouje.com/a/return?utm_geoip=1`
  - help: `https://www.rouje.com/pages/contact-us`
- GANNI:
  - home: `https://www.ganni.com`
  - PLP new-in: `https://www.ganni.com/en-vn/new-in/`
  - cart: `https://www.ganni.com/en-vn/cart`
  - extended sizes: `https://www.ganni.com/en-vn/extended-sizes/`
  - shipping: `https://www.ganni.com/en-vn/help-and-information/delivery.html`
  - returns: `https://www.ganni.com/en-vn/help-and-information/returns.html`
  - help: `https://www.ganni.com/en-vn/legal/help-information.html`
- Universal Standard:
  - home: `https://www.universalstandard.com`
  - PLP new: `https://www.universalstandard.com/collections/new`
  - PDP (example): `https://www.universalstandard.com/products/lou-high-rise-barrel-leg-jeans-princeton-blue`
  - size/fit: `https://www.universalstandard.com/pages/fit-liberty-faq`
  - returns: `https://www.universalstandard.com/pages/help-center?hcUrl=%2Fen-US%2Fwhat-is-your-return-and-exchange-policy-for-a-domestic-order-389722`
  - help center: `https://www.universalstandard.com/pages/help-center`

## Required screenshots (use per-store checklist)

- Rouje checklist:
  - `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence/rouje/CHECKLIST.md`
- GANNI checklist:
  - `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence/ganni/CHECKLIST.md`
- Universal Standard checklist:
  - `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence/universal-standard/CHECKLIST.md`

## After screenshots are added (run this)

- Postprocess each store (keeps pattern cards safe; dry-run optional):
  - `python3 .blackbox/scripts/research/postprocess_store_audit.py --store-slug rouje`
  - `python3 .blackbox/scripts/research/postprocess_store_audit.py --store-slug ganni`
  - `python3 .blackbox/scripts/research/postprocess_store_audit.py --store-slug universal-standard`
