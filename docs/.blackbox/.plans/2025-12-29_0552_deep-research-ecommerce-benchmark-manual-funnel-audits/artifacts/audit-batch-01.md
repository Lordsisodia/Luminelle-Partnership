# Audit Batch 01 (Start Here)

Goal: get the first high-signal funnel evidence (desktop + mobile) so rankings/triage become meaningful.

Batch stores (recommended):
1) Sezane
2) Reformation
3) SKIMS

## 0) Create a session + stamp scorecard rows

From `docs/`:

```bash
python3 .blackbox/scripts/research/start_audit_session_and_stamp.py \
  --plan-artifacts-dir .blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts \
  --scorecard 05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/scorecard.csv \
  --auditor "<your-name>" \
  --stores "Sezane,Reformation,SKIMS" \
  --notes "batch-01: desktop+mobile, evidence-first"
```

This prints a `session_id`. Keep it in your clipboard.

## 1) Capture screenshots (use checklists)

Evidence folders (drop screenshots here):
- `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence/sezane/`
- `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence/reformation/`
- `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence/skims/`

Each folder contains:
- `CHECKLIST.md` — exact filenames to use (so automation can detect coverage)

Naming convention (must match):
- `<store>__<device>__<stage>__<feature>__YYYYMMDD.png`

## 2) Fill the audit docs (at least the evidence index)

Per-store audit docs:
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/sezane.md`
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/reformation.md`
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/skims.md`

Minimum required for “useful”:
- Evidence index table filled (URLs + screenshot filenames)
- Top 3 patterns + top 3 pitfalls

## 3) Fill the scorecard (desktop + mobile rows)

Scorecard:
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/scorecard.csv`

Fill:
- 5 component scores (0–5) for desktop row
- 5 component scores (0–5) for mobile row
- `evidence_links` pointing to screenshots/anchors

## 4) Regenerate the full report suite

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

When ready to enforce quality gates:
- add `--strict`
