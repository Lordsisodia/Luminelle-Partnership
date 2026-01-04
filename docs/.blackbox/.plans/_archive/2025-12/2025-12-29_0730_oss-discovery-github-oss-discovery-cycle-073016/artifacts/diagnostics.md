# Diagnostics (OSS discovery cycle)

Plan: `.blackbox/.plans/2025-12-29_0730_oss-discovery-github-oss-discovery-cycle-073016`

## Counts

- Search (initial) candidates: 3
- Search (gap boost) candidates: 0
- Search (merged) candidates: 3
- Repo metadata fetched (*.json): 2
- Tranche repos (pre-filter): 3
- Tranche repos (post-filter): 2

## Settings snapshot

- Token used: no
- Auto-tune: enabled=true (prev_failures_no_token=5, threshold=2, active=true, applied_max_total_queries=false, applied_max_repos=false)
- Rotation: enabled=true, state_file=`/Users/shaansisodia/DEV/client-projects/lumelle/docs/.blackbox/.local/oss-discovery-state.json`
- Gap boost: enabled=false, min_count=1, max_total_queries=8
- Gap boost retry: enabled=true, relaxed_min_stars=50
- Gap boost relax excludes: enabled=false
- Effective sizing: max_total_queries=1, max_repos=5, max_queries_per_group=1
- Filters: min_stars=50, include_forks=false, include_archived=false
- Excludes: keywords="template, starter, boilerplate, example, demo, awesome", regex=""
- Prefer-new: enabled=true, applied=true, used_fallback=false, catalog_file=`/Users/shaansisodia/DEV/client-projects/lumelle/docs/.blackbox/oss-catalog/catalog.json`
