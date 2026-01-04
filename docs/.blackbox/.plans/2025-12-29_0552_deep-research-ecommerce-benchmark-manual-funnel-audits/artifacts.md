# Artifacts (created/updated)

- `artifacts/shortlist-15.md` — 15-store manual audit shortlist + suggested order
- `artifacts/audit-scorecard-template.csv` — scorecard CSV template (ranking + notes)
- `artifacts/rankings.md` — generated ranking table from filled scorecards
- `artifacts/scorecard.scored.csv` — scorecard CSV with computed weighted scores
- `artifacts/progress.md` — generated progress report (what’s scored and what’s missing)
- `artifacts/patterns-summary.md` — generated summary table of pattern cards
- `artifacts/store-rollups.csv` — store-level rollups (desktop+mobile combined)
- `artifacts/audit-docs-progress.md` — audit doc completeness report (placeholders vs evidence)
- `artifacts/triage.md` — combined next-actions queue (scorecard + audit docs + blocked + evidence)
- `artifacts/backlog.csv` — exported backlog table from pattern-to-backlog mapping
- `artifacts/backlog.md` — short markdown view of the exported backlog
- `artifacts/evidence-inventory.md` — counts/listing of screenshot files per store evidence folder
- `artifacts/evidence-naming.md` — validation report for screenshot naming conventions
- `artifacts/store-slug-map.json` — mapping used to match store names to evidence folder slugs
- `artifacts/evidence-coverage.md` — baseline coverage of required screenshots per store (filename-driven)
- Evidence (manual screenshots):
  - `artifacts/evidence/<store-slug>/` — recommended screenshot folder structure
 
- Scripts:
  - `docs/.blackbox/scripts/research/generate_womens_fashion_shortlist.py` — regenerate shortlist
  - `docs/.blackbox/scripts/research/scaffold_store_audits.py` — scaffold per-store audit docs
  - `docs/.blackbox/scripts/research/score_funnel_audits.py` — compute weighted rankings from scorecard
  - `docs/.blackbox/scripts/research/validate_audit_scorecard.py` — validate scorecard format and score ranges
  - `docs/.blackbox/scripts/research/report_audit_progress.py` — generate progress markdown
  - `docs/.blackbox/scripts/research/scaffold_evidence_folders.py` — create per-store evidence folders in the plan
  - `docs/.blackbox/scripts/research/summarize_pattern_cards.py` — summarize pattern cards into a table
  - `docs/.blackbox/scripts/research/run_funnel_audit_reports.py` — run validate+progress+rankings+pattern summary in one command
 
- Canonical docs (human-facing):
  - `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/manual-funnel-audit-rubric.md`
  - `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-library.md`
  - `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/audits/README.md`
  - `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/`
  - `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/audits/evidence-capture-guide.md`
  - `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/audits/audit-session-runbook.md`
  - `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/audits/bot-protection-playbook.md`
  - `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/README.md`
  - `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md`

Suggested minimum:
- `artifacts/run-meta.yaml` — reproducibility metadata (inputs, model, outputs)
- `artifacts/sources.md` — URLs/paths + what each source supports
- `artifacts/summary.md` — short synthesis for humans
- `artifacts/extracted.json` — structured extraction (optional, but preferred)
- `artifacts/raw.md` — full raw output (optional; may be gitignored)
