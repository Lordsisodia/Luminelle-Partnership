---
status: active
updated_at_utc: 2025-12-30T10:29:30Z
owner: synthesis-agent-zero
session_id: 20251230-1727
auditor: growth
---

# Women’s Fashion Manual Audits — Session `20251230-1727` (run sheet)

## 🎯 Stores in scope (desktop + mobile)

- `skims`
- `reformation`
- `sezane`

Scorecard rows are already stamped with `auditor=growth` and `session_id=20251230-1727`:
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/scorecard.csv`

Session log (append-only):
- `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/audit-sessions.md`

## ✅ Preflight briefs (use these as the URL checklist)

- SKIMS: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/store-briefs/skims.md`
- Reformation: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/store-briefs/reformation.md`
- Sézane: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/store-briefs/sezane.md`

## 🧾 Evidence capture (minimum bar)

For each store, capture both desktop and mobile screenshots + URLs for:
- Home (top nav + promo surfaces)
- PLP/collection (filters/sort + merchandising)
- PDP (above fold + size/fit + shipping/returns + reviews + BNPL)
- Cart (threshold messaging, upsells, shipping estimates)
- Checkout (guest/express pay, error states if possible)

Use the per-store evidence checklist (these already exist):
- `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence/skims/CHECKLIST.md`
- `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence/reformation/CHECKLIST.md`
- `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence/sezane/CHECKLIST.md`

Batch-01 “single checklist” (stores + URLs + filenames + pattern card links):
- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/womens-fashion-capture-todo-batch-01.md`

## 🏃 Postprocess after each store (required)

After you capture screenshots and paste evidence links into the store audit doc, run:

- `python3 docs/.blackbox/scripts/research/postprocess_store_audit.py --store-slug skims`
- `python3 docs/.blackbox/scripts/research/postprocess_store_audit.py --store-slug reformation`
- `python3 docs/.blackbox/scripts/research/postprocess_store_audit.py --store-slug sezane`

This updates the manual-audits plan outputs (progress, triage, pattern suggestions, coverage reports).

## 📍 Audit docs to fill

- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/skims.md`
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/reformation.md`
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/sezane.md`
