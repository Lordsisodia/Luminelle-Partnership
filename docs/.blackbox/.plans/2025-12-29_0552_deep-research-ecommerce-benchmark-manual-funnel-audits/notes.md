# Notes / Revisions

- <short log of changes to the plan, if needed>

- Added scaffolding:
  - canonical manual audit rubric + pattern library skeleton live in `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/`
  - per-store audit docs scaffolded in `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/`
  - scripts added to regenerate shortlist and stubs:
    - `docs/.blackbox/scripts/research/generate_womens_fashion_shortlist.py`
    - `docs/.blackbox/scripts/research/scaffold_store_audits.py`

- Added operational tooling:
  - `docs/.blackbox/scripts/research/validate_audit_scorecard.py` validates scorecard ranges/format
  - `docs/.blackbox/scripts/research/report_audit_progress.py` generates a progress report
  - `docs/.blackbox/scripts/research/score_funnel_audits.py` computes weighted rankings once scored
