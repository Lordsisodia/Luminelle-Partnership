---
status: draft
last_reviewed: 2025-12-29
owner: growth
---

# Batch 01 — Manual Audit Queue (recommended start)

This is the fastest “get real conversion patterns” batch for the shortlist.

Why these 3:
- **SKIMS** — modern DTC stack + heavy conversion tooling (BNPL, reviews, personalization)
- **Reformation** — premium fashion UX (fit, sustainability) + common friction points worth studying
- **Sézane** — European brand with strong merchandising + help/FAQ prominence

## Desk research (already captured)

Automated HTML snapshots + detected tooling signals (triage only):
- Snapshot signals CSV: `docs/.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/batch-01-snapshots-summary.csv`
- Findings note (by store): `docs/.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/batch-01-findings-by-store.md`

Notable signals to validate during manual audit:
- SKIMS: BNPL (**Afterpay + Klarna**), reviews (**Okendo**), search/personalization (**Algolia + Dynamic Yield**)
- Reformation: **Afterpay appears on PDP** (may be conditional), strong **size/fit** content surfaces broadly
- Sézane: **help/FAQ prominence**, gift cards + sustainability messaging; validate how they reduce sizing/returns anxiety

## What to do (per store)

For each store, do both **desktop** + **mobile**:
1) Homepage → PLP (category) → PDP (best-seller) → cart → checkout start → shipping/returns/size guide
2) Capture screenshots following the checklist:
   - `docs/.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence/<store>/CHECKLIST.md`
3) Fill the store audit doc:
   - `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/<store>.md`
4) Fill the scorecard rows (desktop + mobile):
   - `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/scorecard.csv`

## Target URLs (best-effort; may redirect by region)

These are the same URLs used for the Batch 01 snapshots:

### Sézane
- Home (US): `https://www.sezane.com/us-en`
- New in: `https://www.sezane.com/us-en/new-in`
- Dresses PLP: `https://www.sezane.com/us-en/collection/dresses`
- Help/FAQ: `https://www.sezane.com/us-en/help`

### Reformation
- Home: `https://www.thereformation.com`
- New dresses PLP: `https://www.thereformation.com/new/new-dresses`
- PDP sample: `https://www.thereformation.com/products/kastoria-dress/1310183DAL.html?dwvar_1310183DAL_color=DAL`
- Cart: `https://www.thereformation.com/cart`
- Size guide: `https://www.thereformation.com/fitting-and-sizes.html`

### SKIMS
- Home: `https://skims.com`
- Best sellers PLP: `https://skims.com/collections/best-sellers`
- PDP sample: `https://skims.com/products/fits-everybody-t-shirt-bra-onyx`
- Size guides: `https://skims.com/pages/size-guides`
- Shipping: `https://skims.com/pages/shipping`
- Returns: `https://skims.com/pages/returns`

