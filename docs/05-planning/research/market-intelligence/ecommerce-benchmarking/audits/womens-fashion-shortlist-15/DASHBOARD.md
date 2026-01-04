---
status: draft
last_reviewed: 2025-12-30
owner: growth
---

# Shortlist 15 — Audit Dashboard

This dashboard is the “single place” to run and review the manual audit workflow for the initial 15-store shortlist.

Quick links (context):
- Benchmark narrative: `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-benchmark.md`
- Niche playbook (model stores per niche): `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-niche-playbook.md`
- Feature adoption matrix (BNPL/reviews/returns/search tools): `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-feature-adoption-matrix.md`

## Inputs (humans fill these)

- Scorecard:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/scorecard.csv`
- Per-store audit docs:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/`
- Pattern cards:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/`

## Priority order (reachability-first)

Before starting a manual audit, check reachability based on our latest snapshots:
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/PRE-AUDIT-PRIORITY.md`

Recommendation:
- Start with any **0% blocked** stores (fastest path to copyable patterns).
- Treat **100% blocked** stores as “manual-only” and follow:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/bot-protection-playbook.md`

## Pattern capture (turn screenshots into backlog)

Use this during audits to map each required screenshot to:
- the pattern card to update
- the backlog row it supports

- `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/PATTERN-CAPTURE-CHECKLIST.md`
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/PATTERN-CAPTURE-CHECKLIST.md`

Helper (after you add screenshots):
- Run this to get “which pattern cards to update” + paste-ready backlog evidence strings:

```bash
python3 .blackbox/scripts/research/suggest_pattern_updates_from_evidence.py \
  --store-slug skims \
  --evidence-dir .blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence \
  --audit-doc 05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/skims.md \
  --pattern-capture-md 05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/PATTERN-CAPTURE-CHECKLIST.md \
  --out-md .blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/skims-pattern-update-suggestions.md
```

Auto-apply evidence to pattern cards (optional):
- This updates pattern cards by replacing `Screenshot link: pending...` with your captured screenshot path and adding a best-effort page URL from the audit doc preflight.

```bash
python3 .blackbox/scripts/research/apply_evidence_to_patterns.py \
  --store-slug skims \
  --evidence-dir .blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence \
  --audit-doc 05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/skims.md \
  --pattern-capture-md 05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/PATTERN-CAPTURE-CHECKLIST.md \
  --patterns-dir 05-planning/research/market-intelligence/ecommerce-benchmarking/patterns \
  --out-md .blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/skims-pattern-autoapply.md
```

One-command postprocess (recommended after each store audit):
- Validates evidence naming, generates suggestions, auto-applies to pattern cards, and refreshes backlog/rankings artifacts.

```bash
python3 .blackbox/scripts/research/postprocess_store_audit.py \
  --store-slug skims
```

## Outputs (generated)

These are generated into the manual-audits run artifacts folder:
- Progress: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/progress.md`
- Rankings: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/rankings.md`
- Scored CSV: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/scorecard.scored.csv`
- Store rollups: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/store-rollups.csv`
- Pattern summary: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/patterns-summary.md`
- Triage: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/triage.md`
- Evidence inventory: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence-inventory.md`
- Evidence coverage: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence-coverage.md`

Additional desk-research artifacts (automated HTML snapshots; useful for tooling detection):
- Batch 01 snapshot folder: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-01/`
- Batch 01 per-page signals: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/batch-01-snapshots-summary.csv`
- Batch 01 store rollup: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/batch-01-store-rollup.csv`
- Batch 01 findings note: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/batch-01-findings-by-store.md`
- Batch 02 target URLs: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/targets/batch-02-urls.txt`
- Batch 02 snapshot folder: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/`
- Batch 02 per-page signals: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/batch-02/batch-02-snapshots-summary.csv`
- Batch 02 store rollup: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/batch-02/batch-02-store-rollup.csv`
- Batch 02 findings note: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/batch-02/batch-02-findings-by-store.md`
- Batch 03 target URLs: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/targets/batch-03-urls.txt`
- Batch 03 snapshot folder: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-03/`
- Batch 03 per-page signals: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/batch-03/batch-03-snapshots-summary.csv`
- Batch 03 store rollup: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/batch-03/batch-03-store-rollup.csv`
- Batch 03 findings note: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/batch-03/batch-03-findings-by-store.md`

## Run it (one command)

```bash
python3 .blackbox/scripts/research/run_funnel_audit_reports.py \
  --scorecard 05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/scorecard.csv \
  --plan-artifacts-dir .blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts \
  --patterns-dir 05-planning/research/market-intelligence/ecommerce-benchmarking/patterns \
  --audits-dir 05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15 \
  --mapping-md 05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md \
  --progress-group-by-store \
  --group-by-store
```

Optional:
- Add `--strict` once you want the runner to fail if a scored row is missing `top_3_patterns`, `top_3_pitfalls`, or `evidence_links`.
- In strict mode, the runner also validates:
  - pattern cards in `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/`
  - backlog mapping evidence in `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md`

Tip:
- Use `.blackbox/scripts/research/stamp_scorecard.py` to quickly stamp `auditor` + `session_id` onto both device rows for a store (helps strict mode).
- Or use `.blackbox/scripts/research/start_audit_session_and_stamp.py` to create a session and stamp multiple stores in one command.

## How to interpret rankings

- Treat rankings as “who is best to copy” *only after*:
  - both desktop + mobile rows are filled for a store
  - evidence links exist (screenshots + URLs)
  - notes explain constraints (membership gates, region differences, bot protection)

## Store briefs (fast start per store)

These short briefs combine:
- preflight target URLs
- detected tooling signals
- reachability / bot-protection warnings
- suggested “extra” screenshots (BNPL, returns portal, fit quiz, etc.)

Generated into:
- `docs/.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/store-briefs/`

## Starting point (recommended “Batch 01” manual audits)

If you want the fastest path to “conversion patterns we can copy”:
- Start with: **SKIMS**, **Reformation**, **Sézane**
- Use the Batch 01 desk-research rollup to pre-choose what to look for:
  - SKIMS: BNPL (Afterpay + Klarna), reviews (Okendo), search/personalization (Algolia + Dynamic Yield)
  - Reformation: Afterpay on PDP (not necessarily everywhere), strong size/fit content
  - Sézane: strong gift cards + sustainability messaging + help center prominence

Then do the full manual funnel audit (PDP/cart/checkout) and capture screenshots using the checklists:
- `docs/.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence/<store>/CHECKLIST.md`

Timeboxed shortcut (recommended for first pass):
- Use the Batch‑01 “MVP evidence set” (7 core screenshots per device) to unblock the automation fast:
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/womens-fashion-capture-todo-batch-01.md`
- Once screenshots are saved, run:
  - `python3 .blackbox/scripts/research/postprocess_store_audit.py --store-slug <store>`

Batch helper (after you captured 2–3 stores):
- Runs postprocess only for stores that actually have evidence:

```bash
python3 .blackbox/scripts/research/postprocess_batch_audits.py \
  --plan-artifacts-dir .blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts \
  --stores skims reformation sezane
```
