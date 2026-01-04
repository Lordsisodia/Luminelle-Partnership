---
status: active
last_reviewed: 2025-12-28
owner: growth
---

# Manual Audits

This folder contains **manual funnel audits** (desktop + mobile) for benchmark stores.

Why:
- automated scans can’t reliably evaluate PDP/cart/checkout UX
- women’s fashion conversion is decided mostly by PDP confidence (fit, fabric, reviews) + checkout friction

## How to add a new audit

Runbook:
- `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/audits/audit-session-runbook.md`
Bot protection:
- `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/audits/bot-protection-playbook.md`

1) Pick a store from the shortlist:
   - `docs/.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/shortlist-15.md`
2) Create a new audit doc using the template:
   - `docs/07-templates/library/templates/ecommerce-funnel-audit.md`
3) Score it using the rubric:
   - `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/manual-funnel-audit-rubric.md`
4) Capture evidence (screenshots + URLs) using:
   - `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/audits/evidence-capture-guide.md`
5) Add screenshot links (and page URLs) under the “Evidence index” section.

## Scoring workflow (recommended)

1) Fill scores in the shared scorecard:
   - `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/scorecard.csv`
2) Validate the scorecard:
   - `python3 .blackbox/scripts/research/validate_audit_scorecard.py --csv 05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/scorecard.csv`
3) Generate progress + rankings:
   - `python3 .blackbox/scripts/research/report_audit_progress.py --in-csv 05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/scorecard.csv --out-md .blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/progress.md`
   - `python3 .blackbox/scripts/research/score_funnel_audits.py --in-csv 05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/scorecard.csv --out-csv .blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/scorecard.scored.csv --out-md .blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/rankings.md`

## Current sets

- `womens-fashion-shortlist-15/` — the first 15-store pass (recommended starting point)
- `womens-fashion-top25-apparel-first/` — the Top‑25 apparel-first reference set (Tier‑B preflight injected; ready for Tier‑A screenshots)
