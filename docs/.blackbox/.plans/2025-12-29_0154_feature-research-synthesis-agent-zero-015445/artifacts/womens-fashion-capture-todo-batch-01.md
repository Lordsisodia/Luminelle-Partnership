---
status: active
updated_at_utc: 2025-12-30T10:37:33Z
owner: synthesis-agent-zero
batch: "01"
stores:
  - skims
  - reformation
  - sezane
---

# Women’s Fashion Manual Audits — Capture TODO (Batch 01)

- Scope: capture **desktop + mobile** funnel evidence for:
  - `skims`
  - `reformation`
  - `sezane`
- Output destination (screenshots):
  - `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence/<store>/`
- Output destination (notes + evidence index):
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/<store>.md`
- Naming convention (required for automation):
  - `<store>__<device>__<stage>__<feature>__YYYYMMDD.png`
- Pattern mapping (optional but recommended):
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/PATTERN-CAPTURE-CHECKLIST.md`

## MVP evidence set (fastest path to “best stores to model after”)

If you only have ~20–30 minutes total, capture this **minimal** set first (per store, per device).
This is enough to generate:
- a first pass scorecard,
- “top 3 patterns / pitfalls” bullets,
- and unlock the postprocess automation.

Per store, per device (desktop + mobile):
- `home`: hero + primary nav + any promo/shipping/returns messaging above the fold
- `plp`: filters open + a product card grid (shows price, color swatches, reviews, quick-add if present)
- `pdp`: above-the-fold (media + price + size/variant picker + ATC area)
- `pdp`: fit/size guidance entry point (size guide / fit finder / “find your size”)
- `pdp`: returns/shipping reassurance surface (near ATC or in sticky area if present)
- `cart`: cart view with edit controls + totals + shipping threshold/upsell if present
- `checkout`: first checkout screen showing express buttons + guest/login gate + trust cues

Then, if time remains, capture the “nice-to-have” extras (reviews module, fabric/care, etc.).

## After screenshots are added (recommended commands)

Option A — per store:
- `python3 .blackbox/scripts/research/postprocess_store_audit.py --store-slug skims`
- `python3 .blackbox/scripts/research/postprocess_store_audit.py --store-slug reformation`
- `python3 .blackbox/scripts/research/postprocess_store_audit.py --store-slug sezane`

Option B — one command (recommended after you captured 2–3 stores):
- This prints screenshot counts per store and only runs postprocess for stores that have evidence.

```bash
python3 .blackbox/scripts/research/postprocess_batch_audits.py \
  --plan-artifacts-dir .blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts \
  --stores skims reformation sezane
```

## How to execute (fast, repeatable)

- For each store:
  - Open the “Target URLs” from the store brief (below) to speed-run the funnel.
  - Capture the **required** screenshots (desktop first, then mobile).
  - Save each PNG into the store’s evidence folder (above), using the exact filename from the checklist.
  - Paste the screenshot file path + the page URL into the store audit doc’s **Evidence index** table.
  - (Optional) For each captured screenshot that maps to a pattern card, replace `Screenshot link: pending...` with the screenshot path.

## Pattern cards to update (when present)

- PLP filters / “occasion filters”:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/plp-occasion-filters.md`
- PDP fit confidence + variant picker patterns:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-fit-confidence-module.md`
- PDP fabric / care clarity:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-fabric-confidence-module.md`
- PDP fit quiz entry points:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-fit-quiz.md`
- Reviews filters / “by fit”:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/reviews-filterable-by-fit.md`
- Cart variant editing:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/cart-variant-editing.md`
- Checkout express + trust:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/checkout-express-checkout.md`
- Global region routing / country selector:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/global-region-routing.md`
- Returns portal + help center:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/returns-self-serve-portal.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/help-center-contextual-faq.md`

## Store 01 — SKIMS (`skims`)

- Store brief: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/store-briefs/skims.md`
- Evidence folder:
  - `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence/skims/`
- Target URLs (start here):
  - home: `https://skims.com`
  - PLP (best sellers): `https://skims.com/collections/best-sellers`
  - PDP (example): `https://skims.com/products/fits-everybody-t-shirt-bra-onyx`
  - shipping: `https://skims.com/pages/shipping`
  - returns: `https://skims.com/pages/returns`
  - size guides: `https://skims.com/pages/size-guides`
- Required screenshots (desktop):
  - `skims__desktop__homepage__entry-points__YYYYMMDD.png`
  - `skims__desktop__homepage__shipping-returns__YYYYMMDD.png`
  - `skims__desktop__plp__filters-panel__YYYYMMDD.png`
  - `skims__desktop__plp__product-cards__YYYYMMDD.png`
  - `skims__desktop__plp__quick-add__YYYYMMDD.png`
  - `skims__desktop__pdp__fit-module__YYYYMMDD.png`
  - `skims__desktop__pdp__fabric-care__YYYYMMDD.png`
  - `skims__desktop__pdp__reviews-module__YYYYMMDD.png`
  - `skims__desktop__pdp__shipping-returns__YYYYMMDD.png`
  - `skims__desktop__pdp__variant-picker__YYYYMMDD.png`
  - `skims__desktop__cart__variant-edit__YYYYMMDD.png`
  - `skims__desktop__cart__promo__YYYYMMDD.png`
  - `skims__desktop__cart__shipping-threshold__YYYYMMDD.png`
  - `skims__desktop__checkout__express-buttons__YYYYMMDD.png`
  - `skims__desktop__checkout__delivery-estimate__YYYYMMDD.png`
  - `skims__desktop__checkout__trust-cues__YYYYMMDD.png`
- Required screenshots (mobile):
  - `skims__mobile__homepage__entry-points__YYYYMMDD.png`
  - `skims__mobile__homepage__shipping-returns__YYYYMMDD.png`
  - `skims__mobile__plp__filters-panel__YYYYMMDD.png`
  - `skims__mobile__plp__product-cards__YYYYMMDD.png`
  - `skims__mobile__plp__quick-add__YYYYMMDD.png`
  - `skims__mobile__pdp__fit-module__YYYYMMDD.png`
  - `skims__mobile__pdp__fabric-care__YYYYMMDD.png`
  - `skims__mobile__pdp__reviews-module__YYYYMMDD.png`
  - `skims__mobile__pdp__shipping-returns__YYYYMMDD.png`
  - `skims__mobile__pdp__variant-picker__YYYYMMDD.png`
  - `skims__mobile__cart__variant-edit__YYYYMMDD.png`
  - `skims__mobile__cart__promo__YYYYMMDD.png`
  - `skims__mobile__cart__shipping-threshold__YYYYMMDD.png`
  - `skims__mobile__checkout__express-buttons__YYYYMMDD.png`
  - `skims__mobile__checkout__delivery-estimate__YYYYMMDD.png`
  - `skims__mobile__checkout__trust-cues__YYYYMMDD.png`
- Optional “extras” (only if present):
  - `skims__desktop__pdp__fit-quiz__YYYYMMDD.png`
  - `skims__desktop__pdp__complete-the-set__YYYYMMDD.png`
  - `skims__desktop__post-purchase__returns-portal__YYYYMMDD.png`
  - `skims__desktop__post-purchase__help-center__YYYYMMDD.png`
  - `skims__mobile__pdp__fit-quiz__YYYYMMDD.png`
  - `skims__mobile__pdp__complete-the-set__YYYYMMDD.png`
  - `skims__mobile__post-purchase__returns-portal__YYYYMMDD.png`
  - `skims__mobile__post-purchase__help-center__YYYYMMDD.png`

## Store 02 — Reformation (`reformation`)

- Store brief: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/store-briefs/reformation.md`
- Evidence folder:
  - `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence/reformation/`
- Target URLs (start here):
  - home: `https://www.thereformation.com`
  - PLP (new dresses): `https://www.thereformation.com/new/new-dresses`
  - PDP (example): `https://www.thereformation.com/products/kastoria-dress/1310183DAL.html?dwvar_1310183DAL_color=DAL`
  - cart: `https://www.thereformation.com/cart`
  - size guide: `https://www.thereformation.com/fitting-and-sizes.html`
- Required screenshots (desktop):
  - `reformation__desktop__homepage__entry-points__YYYYMMDD.png`
  - `reformation__desktop__homepage__shipping-returns__YYYYMMDD.png`
  - `reformation__desktop__plp__filters-panel__YYYYMMDD.png`
  - `reformation__desktop__plp__product-cards__YYYYMMDD.png`
  - `reformation__desktop__plp__quick-add__YYYYMMDD.png`
  - `reformation__desktop__pdp__fit-module__YYYYMMDD.png`
  - `reformation__desktop__pdp__fabric-care__YYYYMMDD.png`
  - `reformation__desktop__pdp__reviews-module__YYYYMMDD.png`
  - `reformation__desktop__pdp__shipping-returns__YYYYMMDD.png`
  - `reformation__desktop__pdp__variant-picker__YYYYMMDD.png`
  - `reformation__desktop__cart__variant-edit__YYYYMMDD.png`
  - `reformation__desktop__cart__promo__YYYYMMDD.png`
  - `reformation__desktop__cart__shipping-threshold__YYYYMMDD.png`
  - `reformation__desktop__checkout__express-buttons__YYYYMMDD.png`
  - `reformation__desktop__checkout__delivery-estimate__YYYYMMDD.png`
  - `reformation__desktop__checkout__trust-cues__YYYYMMDD.png`
- Required screenshots (mobile):
  - `reformation__mobile__homepage__entry-points__YYYYMMDD.png`
  - `reformation__mobile__homepage__shipping-returns__YYYYMMDD.png`
  - `reformation__mobile__plp__filters-panel__YYYYMMDD.png`
  - `reformation__mobile__plp__product-cards__YYYYMMDD.png`
  - `reformation__mobile__plp__quick-add__YYYYMMDD.png`
  - `reformation__mobile__pdp__fit-module__YYYYMMDD.png`
  - `reformation__mobile__pdp__fabric-care__YYYYMMDD.png`
  - `reformation__mobile__pdp__reviews-module__YYYYMMDD.png`
  - `reformation__mobile__pdp__shipping-returns__YYYYMMDD.png`
  - `reformation__mobile__pdp__variant-picker__YYYYMMDD.png`
  - `reformation__mobile__cart__variant-edit__YYYYMMDD.png`
  - `reformation__mobile__cart__promo__YYYYMMDD.png`
  - `reformation__mobile__cart__shipping-threshold__YYYYMMDD.png`
  - `reformation__mobile__checkout__express-buttons__YYYYMMDD.png`
  - `reformation__mobile__checkout__delivery-estimate__YYYYMMDD.png`
  - `reformation__mobile__checkout__trust-cues__YYYYMMDD.png`
- Optional “extras” (only if present):
  - `reformation__desktop__pdp__fit-quiz__YYYYMMDD.png`
  - `reformation__desktop__pdp__complete-the-set__YYYYMMDD.png`
  - `reformation__desktop__post-purchase__returns-portal__YYYYMMDD.png`
  - `reformation__desktop__post-purchase__help-center__YYYYMMDD.png`
  - `reformation__mobile__pdp__fit-quiz__YYYYMMDD.png`
  - `reformation__mobile__pdp__complete-the-set__YYYYMMDD.png`
  - `reformation__mobile__post-purchase__returns-portal__YYYYMMDD.png`
  - `reformation__mobile__post-purchase__help-center__YYYYMMDD.png`

## Store 03 — Sézane (`sezane`)

- Store brief: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/store-briefs/sezane.md`
- Evidence folder:
  - `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence/sezane/`
- Target URLs (start here):
  - home (US): `https://www.sezane.com/us-en`
  - PLP dresses (US): `https://www.sezane.com/us-en/collection/dresses`
  - new in (US): `https://www.sezane.com/us-en/new-in`
  - help (US): `https://www.sezane.com/us-en/help`
- Required screenshots (desktop):
  - `sezane__desktop__homepage__entry-points__YYYYMMDD.png`
  - `sezane__desktop__homepage__shipping-returns__YYYYMMDD.png`
  - `sezane__desktop__plp__filters-panel__YYYYMMDD.png`
  - `sezane__desktop__plp__product-cards__YYYYMMDD.png`
  - `sezane__desktop__plp__quick-add__YYYYMMDD.png`
  - `sezane__desktop__pdp__fit-module__YYYYMMDD.png`
  - `sezane__desktop__pdp__fabric-care__YYYYMMDD.png`
  - `sezane__desktop__pdp__reviews-module__YYYYMMDD.png`
  - `sezane__desktop__pdp__shipping-returns__YYYYMMDD.png`
  - `sezane__desktop__pdp__variant-picker__YYYYMMDD.png`
  - `sezane__desktop__cart__variant-edit__YYYYMMDD.png`
  - `sezane__desktop__cart__promo__YYYYMMDD.png`
  - `sezane__desktop__cart__shipping-threshold__YYYYMMDD.png`
  - `sezane__desktop__checkout__express-buttons__YYYYMMDD.png`
  - `sezane__desktop__checkout__delivery-estimate__YYYYMMDD.png`
  - `sezane__desktop__checkout__trust-cues__YYYYMMDD.png`
- Required screenshots (mobile):
  - `sezane__mobile__homepage__entry-points__YYYYMMDD.png`
  - `sezane__mobile__homepage__shipping-returns__YYYYMMDD.png`
  - `sezane__mobile__plp__filters-panel__YYYYMMDD.png`
  - `sezane__mobile__plp__product-cards__YYYYMMDD.png`
  - `sezane__mobile__plp__quick-add__YYYYMMDD.png`
  - `sezane__mobile__pdp__fit-module__YYYYMMDD.png`
  - `sezane__mobile__pdp__fabric-care__YYYYMMDD.png`
  - `sezane__mobile__pdp__reviews-module__YYYYMMDD.png`
  - `sezane__mobile__pdp__shipping-returns__YYYYMMDD.png`
  - `sezane__mobile__pdp__variant-picker__YYYYMMDD.png`
  - `sezane__mobile__cart__variant-edit__YYYYMMDD.png`
  - `sezane__mobile__cart__promo__YYYYMMDD.png`
  - `sezane__mobile__cart__shipping-threshold__YYYYMMDD.png`
  - `sezane__mobile__checkout__express-buttons__YYYYMMDD.png`
  - `sezane__mobile__checkout__delivery-estimate__YYYYMMDD.png`
  - `sezane__mobile__checkout__trust-cues__YYYYMMDD.png`
- Optional “extras” (only if present):
  - `sezane__desktop__pdp__fit-quiz__YYYYMMDD.png`
  - `sezane__desktop__pdp__complete-the-set__YYYYMMDD.png`
  - `sezane__desktop__post-purchase__returns-portal__YYYYMMDD.png`
  - `sezane__desktop__post-purchase__help-center__YYYYMMDD.png`
  - `sezane__mobile__pdp__fit-quiz__YYYYMMDD.png`
  - `sezane__mobile__pdp__complete-the-set__YYYYMMDD.png`
  - `sezane__mobile__post-purchase__returns-portal__YYYYMMDD.png`
  - `sezane__mobile__post-purchase__help-center__YYYYMMDD.png`
