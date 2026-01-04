---
status: active
updated_at_utc: 2025-12-30T10:55:32Z
owner: synthesis-agent-zero
batch: "02"
stores:
  - alo-yoga
  - summersalt
  - thirdlove
---

# Women’s Fashion Manual Audits — Capture TODO (Batch 02)

- Scope: capture **desktop + mobile** funnel evidence for:
  - `alo-yoga` (activewear)
  - `summersalt` (swimwear)
  - `thirdlove` (intimates)
- Output destination (screenshots):
  - `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence/<store>/`
- Output destination (notes + evidence index):
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/<store>.md`
- Naming convention (required for automation):
  - `<store>__<device>__<stage>__<feature>__YYYYMMDD.png`

## Target URLs (from Batch‑02 preflight)

- Alo Yoga:
  - home: `https://www.aloyoga.com`
  - PLP: `https://www.aloyoga.com/collections/best-sets-1`
  - cart: `https://www.aloyoga.com/cart`
  - size guide: `https://www.aloyoga.com/en-vn/pages/size-chart`
  - returns: `https://www.aloyoga.com/pages/returns-support`
  - help: `https://www.aloyoga.com/pages/help-center`
- Summersalt:
  - home: `https://www.summersalt.com`
  - PLP: `https://www.summersalt.com/collections/all-products`
  - PDP (example): `https://www.summersalt.com/products/the-silky-luxe-palazzo-pants-with-ties-in-sea-urchin`
  - size guide: `https://www.summersalt.com/pages/fit-guide`
  - shipping: `https://www.summersalt.com/pages/shipping-and-delivery`
  - returns: `https://www.summersalt.com/pages/choose-returns`
  - help: `https://www.summersalt.com/pages/choose-faq`
- ThirdLove:
  - home: `https://www.thirdlove.com`
  - PLP: `https://www.thirdlove.com/collections/all-bras-underwear`
  - PDP (example): `https://www.thirdlove.com/products/24-7-classic-t-shirt-bra-taupe`
  - cart: `https://www.thirdlove.com/cart`
  - size/fit: `https://www.thirdlove.com/pages/fitting-room`
  - returns: `https://www.thirdlove.com/pages/returns-center`
  - help: `https://www.thirdlove.com/pages/customer-support`

## Required screenshots (use per-store checklist)

- Alo Yoga checklist:
  - `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence/alo-yoga/CHECKLIST.md`
- Summersalt checklist:
  - `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence/summersalt/CHECKLIST.md`
- ThirdLove checklist:
  - `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence/thirdlove/CHECKLIST.md`

## After screenshots are added (run this)

- Postprocess each store (keeps pattern cards safe; dry-run optional):
  - `python3 .blackbox/scripts/research/postprocess_store_audit.py --store-slug alo-yoga`
  - `python3 .blackbox/scripts/research/postprocess_store_audit.py --store-slug summersalt`
  - `python3 .blackbox/scripts/research/postprocess_store_audit.py --store-slug thirdlove`
