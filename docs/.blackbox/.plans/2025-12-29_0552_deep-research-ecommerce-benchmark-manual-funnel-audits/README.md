# Plan: deep-research-ecommerce-benchmark-manual-funnel-audits

## Goal
Turn the women’s fashion benchmark shortlist into a repeatable *manual funnel audit* process (PDP/cart/checkout), with a scoring rubric and an evidence-indexed pattern library.

## Created
2025-12-29 05:52

## Target (optional)
Next: complete 15-store manual audits in 1–2 working days.

## Context
- Prompted by: homepage snapshots are useful but insufficient for conversion decisions (women’s fashion conversion is decided on PDP + cart + checkout).
- Constraints:
  - Bot protection blocks automated auditing for some stores.
  - Many “best” patterns are mobile-first; audits must include mobile.
- Done definition:
  - A shortlist exists and is prioritized
  - A rubric exists to score stores consistently
  - Templates exist so audits are fast
  - Evidence is captured (screenshots + URLs) and turned into a “patterns to steal” library

## Docs To Read (and why)
- [x] `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/manual-funnel-audit-rubric.md` — scoring system
- [x] `docs/07-templates/library/templates/ecommerce-funnel-audit.md` — per-store audit template
- [x] `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-benchmark.md` — baseline patterns and shortlist context

## Plan Steps
- [x] Step 1: Generate shortlist of 15 stores by archetype
- [x] Step 2: Create a scoring rubric + templates
- [x] Step 3: Scaffold per-store audit docs + a shared scorecard
- [ ] Step 4: Run manual audits (desktop + mobile) and fill scorecard
- [ ] Step 5: Capture patterns as cards + update mapping doc
- [ ] Step 6: Synthesize a “pattern library” (screenshots + what it proves)

## Artifacts (created/updated)
- `artifacts/shortlist-15.md` — manual audit shortlist + suggested order
- `artifacts/audit-scorecard-template.csv` — CSV scorecard template for ranking
- Canonical audit workspace:
  - `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/`
  - `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/scorecard.csv`

## Quick commands (end of session)

Validate + regenerate progress + rankings + pattern summary:

```bash
python3 docs/.blackbox/scripts/research/run_funnel_audit_reports.py \
  --scorecard docs/05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/scorecard.csv \
  --plan-artifacts-dir docs/.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts \
  --patterns-dir docs/05-planning/research/market-intelligence/ecommerce-benchmarking/patterns \
  --audits-dir docs/05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15 \
  --progress-group-by-store \
  --group-by-store
```

Optional:
- Add `--strict` to fail the run if any scored row is missing narrative fields (`top_3_patterns`, `top_3_pitfalls`, `evidence_links`).

## Information Routing (where outputs should live)
- Run artifacts (raw/sources/extractions): keep inside this plan folder under `artifacts/`
- Reusable knowledge: promote into `docs/.blackbox/deepresearch/`
- Docs-wide deliverables: place under the correct `docs/0X-*/` category and add a link in the nearest folder `README.md` or `INDEX.md`

## Open Questions / Risks
- <unknowns that could block progress>

## Notes / Revisions
- <short log of changes to the plan, if needed>
