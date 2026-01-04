# Output Index

## Cycle 1

- `.blackbox/.plans/2025-12-30_2154_deep-research-ecommerce-benchmark-adjacent-best-in-class-100/README.md` — initialized the plan with real steps + deliverables.
- `.blackbox/.plans/2025-12-30_2154_deep-research-ecommerce-benchmark-adjacent-best-in-class-100/context/context.md` — filled rolling context with constraints + hypotheses.
- `.blackbox/.plans/2025-12-30_2154_deep-research-ecommerce-benchmark-adjacent-best-in-class-100/artifacts/agent-plan.md` — cycle plan + next actions.
- `.blackbox/.plans/2025-12-30_2154_deep-research-ecommerce-benchmark-adjacent-best-in-class-100/artifacts/prompt-log.md` — cycle prompt record.
- `.blackbox/.plans/2025-12-30_2154_deep-research-ecommerce-benchmark-adjacent-best-in-class-100/artifacts/skills-log.md` — skills used log.
- `.blackbox/.plans/2025-12-30_2154_deep-research-ecommerce-benchmark-adjacent-best-in-class-100/artifact-seeds/adjacent-best-in-class-100.txt` — 100-store URL seed list (input to snapshotting).
- `.blackbox/.plans/2025-12-30_2154_deep-research-ecommerce-benchmark-adjacent-best-in-class-100/artifacts/snapshots/homepages/` — homepage HTML evidence snapshots (93/100 captured).
- `.blackbox/.plans/2025-12-30_2154_deep-research-ecommerce-benchmark-adjacent-best-in-class-100/artifacts/reports/store-snapshots-summary.csv` — extracted tooling signals from the HTML snapshots.
- `.blackbox/.plans/2025-12-30_2154_deep-research-ecommerce-benchmark-adjacent-best-in-class-100/artifacts/reports/store-snapshots-summary.md` — coverage + signal counts for the 100 list.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/adjacent-best-in-class-100.csv` — cross-niche best-in-class list (store/niche/notes).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/adjacent-best-in-class-100.enriched.csv` — merged snapshot signals + evidence paths into the 100 list.
- `.blackbox/scripts/research/generate_adjacent_best_in_class_playbook.py` — generalized the playbook generator to work for any enriched CSV (no hardcoded “30” sources).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/adjacent-best-in-class-playbook.md` — regenerated playbook to reflect the 100-store list (evidence-linked).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/README.md` — updated index to reference the 100-store adjacent list + this run’s artifacts.
- `08-meta/repo/docs-ledger.md` — appended ledger entries for the new adjacent (100) deliverables.
- `.blackbox/.plans/2025-12-30_2154_deep-research-ecommerce-benchmark-adjacent-best-in-class-100/context/steps/0001_checkpoint-built-adjacent-100-store-list-snapshots.md` — checkpointed progress with evidence pointers.
- `.blackbox/scripts/research/rank_adjacent_best_in_class.py` — heuristic scorer/ranker for the adjacent enriched CSV (top overall + per niche).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/adjacent-best-in-class-100.ranked.csv` — ranked view of the 100-store list (triage).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/adjacent-best-in-class-100.top-picks.md` — evidence-linked “top picks” shortlist (triage).
- `.blackbox/.plans/2025-12-30_2154_deep-research-ecommerce-benchmark-adjacent-best-in-class-100/context/steps/0002_checkpoint-ranked-top-picks-from-snapshot-signals.md` — checkpointed scoring + shortlist outputs.
- `.blackbox/scripts/research/generate_adjacent_feature_adoption_matrix.py` — generates a vendor/tooling + UX-cue adoption matrix for the adjacent list.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/adjacent-best-in-class-feature-adoption-matrix.md` — evidence-linked adoption matrix (adjacent 100 list).
- `.blackbox/.plans/2025-12-30_2154_deep-research-ecommerce-benchmark-adjacent-best-in-class-100/context/steps/0003_checkpoint-generated-adjacent-adoption-matrix.md` — checkpointed adoption matrix output.
- `.blackbox/scripts/research/build_funnel_snapshot_seeds_from_homepage.py` — extracts candidate URLs from homepage snapshots and writes a funnel snapshot seed set for Top‑N stores.
- `.blackbox/.plans/2025-12-30_2154_deep-research-ecommerce-benchmark-adjacent-best-in-class-100/artifact-seeds/adjacent-top15-funnel-seeds.txt` — seed URLs for Top‑15 funnel snapshots (collection/product/returns/shipping/support).
- `.blackbox/.plans/2025-12-30_2154_deep-research-ecommerce-benchmark-adjacent-best-in-class-100/artifacts/snapshots/funnel-top15/` — Tier‑B funnel snapshots (51/51 captured).
- `.blackbox/.plans/2025-12-30_2154_deep-research-ecommerce-benchmark-adjacent-best-in-class-100/artifacts/reports/adjacent-top15-funnel-snapshots-summary.md` — coverage + signal counts for the Top‑15 funnel snapshot pack.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/adjacent-top15-transferable-patterns.md` — build-oriented patterns to steal (Tier‑B evidence) mapped to women’s fashion.
- `.blackbox/.plans/2025-12-30_2154_deep-research-ecommerce-benchmark-adjacent-best-in-class-100/context/steps/0004_checkpoint-captured-funnel-snapshots-synthesized-patterns.md` — checkpointed funnel snapshot pack + pattern synthesis.
- `.blackbox/.plans/2025-12-30_2154_deep-research-ecommerce-benchmark-adjacent-best-in-class-100/artifact-seeds/adjacent-per-niche-funnel-seeds.txt` — per‑niche leader funnel seed set (diversified).
- `.blackbox/.plans/2025-12-30_2154_deep-research-ecommerce-benchmark-adjacent-best-in-class-100/artifacts/snapshots/funnel-per-niche/` — Tier‑B funnel snapshots for the per‑niche leader pack (73/73 captured).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/cross-niche-modeling-guide.md` — which niches to model for women’s fashion (high/medium/low transfer), evidence-linked.
- `.blackbox/.plans/2025-12-30_2154_deep-research-ecommerce-benchmark-adjacent-best-in-class-100/context/steps/0005_checkpoint-added-cross-niche-modeling-guide-diversified-funnel-pack.md` — checkpointed diversified niche pack + modeling guide.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md` — added cross‑niche backlog rows with Tier‑B evidence pointers.
- `.blackbox/.plans/2025-12-30_2154_deep-research-ecommerce-benchmark-adjacent-best-in-class-100/context/steps/0006_checkpoint-promoted-cross-niche-patterns-into-backlog-mapping.md` — checkpointed backlog mapping promotion.
