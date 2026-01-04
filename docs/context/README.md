# docs/context

This folder holds **local working context** and checkpoints generated while running work cycles (including `.blackbox` agent runs).

It is intentionally lightweight and meant to:
- preserve small, reusable context summaries (`context.md`)
- keep step/checkpoint notes that act like an audit trail (`steps/`)
- store compactions or review notes that keep long-running cycles manageable (`compactions/`, `reviews/`)

If you're looking for the OSS discovery artifacts and catalog, those live under:
- `docs/.blackbox/.plans/` (per-run outputs)
- `docs/.blackbox/oss-catalog/` (cross-run catalog + curation + rendered views)
