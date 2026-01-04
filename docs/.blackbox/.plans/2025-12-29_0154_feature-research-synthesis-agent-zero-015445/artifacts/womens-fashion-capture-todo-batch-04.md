---
status: active
updated_at_utc: 2025-12-30T18:20:00Z
owner: synthesis-agent-zero
batch: "04"
stores:
  - mytheresa
  - rent-the-runway
notes:
  - "Mytheresa snapshots appear to be failover/bot pages; prioritize manual in-browser capture and record any blocks explicitly."
---

# Women’s Fashion Manual Audits — Capture TODO (Batch 04)

- Scope: capture **desktop + mobile** funnel evidence for:
  - `mytheresa` (luxury marketplace)
  - `rent-the-runway` (subscription rental)
- Output destination (screenshots):
  - `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence/<store>/`
- Output destination (notes + evidence index):
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/<store>.md`
- Naming convention (required for automation):
  - `<store>__<device>__<stage>__<feature>__YYYYMMDD.png`

## Target URLs (from preflight targets)

- Mytheresa:
  - home: `https://www.mytheresa.com`
  - women home: `https://www.mytheresa.com/us/en/women`
  - PLP clothing: `https://www.mytheresa.com/us/en/women/clothing`
  - PDP (example): `https://www.mytheresa.com/us/en/women/dolce-gabbana-fitted-midi-dress-black-p00849315`
  - returns: `https://www.mytheresa.com/us/en/customer-care/returns-exchanges`
  - ordering: `https://www.mytheresa.com/us/en/customer-care/order`
  - help/contact: `https://www.mytheresa.com/us/en/customer-care/contact`
- Rent the Runway:
  - home: `https://www.renttherunway.com`
  - PLP new arrivals: `https://www.renttherunway.com/shop/new_arrivals_app/products`
  - find your fit: `https://www.renttherunway.com/content/find-your-fit?action_type=footer_link`
  - returns: `https://www.renttherunway.com/returns?action_type=footer_link`
  - help/contact: `https://www.renttherunway.com/help/contact?_=1719328953125`

## Required screenshots (use per-store checklist)

- Mytheresa checklist:
  - `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence/mytheresa/CHECKLIST.md`
- Rent the Runway checklist:
  - `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence/rent-the-runway/CHECKLIST.md`

## After screenshots are added (run this)

- Postprocess each store (keeps pattern cards safe; dry-run optional):
  - `python3 .blackbox/scripts/research/postprocess_store_audit.py --store-slug mytheresa`
  - `python3 .blackbox/scripts/research/postprocess_store_audit.py --store-slug rent-the-runway`
