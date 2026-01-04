---
status: draft
last_reviewed: 2025-12-31
owner: growth
---

# Evidence Capture Guide (Screenshots + Links)

Manual audits only become reusable if we capture evidence consistently.

This guide standardizes:
- what to capture
- how to name it
- where to store it

## 1) What to capture (minimum)

For each store, capture at least:
- **Homepage**: primary entry points + any shipping/returns messaging visible
- **PLP**: filters panel + product card design + quick-add behavior
- **PDP**:
  - fit/size module
  - fabric/care module
  - reviews module
  - “shipping/returns” surface
- **Cart**: variant edit controls + promo + shipping threshold messaging
- **Checkout**: express checkout buttons + delivery estimate / trust cues

## 2) Naming convention

Use this filename pattern:

`<store-slug>__<device>__<stage>__<feature>__YYYYMMDD.png`

Examples:
- `sezane__desktop__pdp__fit-module__20251228.png`
- `skims__mobile__cart__variant-edit__20251228.png`
- `mytheresa__desktop__plp__filters-panel__20251228.png`

## 3) Where to store evidence

Preferred: store screenshots as artifacts in the active `.blackbox` plan folder so they don’t clutter visible docs:
- `docs/.blackbox/.plans/<active-run>/artifacts/evidence/<store-slug>/`

Example (women’s fashion Top‑25 run):
- `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/<store-slug>/`

Then link to screenshots from:
- the per-store audit doc
- the matching pattern card in `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/`

## 4) Always include the URL

Every screenshot should have a matching entry in the per-store audit doc:
- the **exact page URL**
- a short note on what the screenshot proves

If a URL is stateful (filters, variant selection), note the steps to reproduce.

## 5) Validation (optional)

When running the reporting pipeline in strict mode, screenshot naming is validated automatically.
Fix naming issues before relying on triage/rankings.

Useful generated helpers (after any postprocess run):
- evidence naming rules: `docs/.blackbox/.plans/<active-run>/artifacts/evidence-naming.md`
- evidence coverage report: `docs/.blackbox/.plans/<active-run>/artifacts/evidence-coverage.md`
