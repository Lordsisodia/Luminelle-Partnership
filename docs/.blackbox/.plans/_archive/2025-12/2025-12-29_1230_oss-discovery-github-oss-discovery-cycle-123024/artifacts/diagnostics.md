# Diagnostics (OSS discovery cycle)

Plan: `.blackbox/.plans/2025-12-29_1230_oss-discovery-github-oss-discovery-cycle-123024`

## Counts

- Search (initial) candidates: 6
- Search (gap boost) candidates: 0
- Search (merged) candidates: 6
- Search (catalog gap boost) candidates: 0
- Repo metadata fetched (*.json): 5
- Tranche repos (pre-filter): 6
- Tranche repos (post-filter): 6

## Settings snapshot

- Token used: no
- Auto-tune: enabled=true (prev_failures_no_token=0, threshold=2, active=false, applied_max_total_queries=false, applied_max_repos=false)
- Rotation: enabled=true, state_file=`/Users/shaansisodia/DEV/client-projects/lumelle/docs/.blackbox/.local/oss-discovery-state.json`
- Gap boost: enabled=false, min_count=1, max_total_queries=8
- Gap boost retry: enabled=true, relaxed_min_stars=50
- Gap boost relax excludes: enabled=false
- Effective sizing: max_total_queries=1, max_repos=10, max_queries_per_group=1
- Filters: min_stars=200, include_forks=false, include_archived=false
- Excludes: keywords="template, starter, boilerplate, example, demo, awesome", regex=""
- Prefer-new: enabled=true, applied=false, used_fallback=true, catalog_file=`/Users/shaansisodia/DEV/client-projects/lumelle/docs/.blackbox/oss-catalog/catalog.json`
- Prefer-new details: removed_seen=6, kept_curated=0, curation_file=`/Users/shaansisodia/DEV/client-projects/lumelle/docs/.blackbox/oss-catalog/curation.json`, keep_statuses="adopt,poc,deepen"
- Catalog gap boost: enabled=true, applied=false, min_tranche_repos=12, max_total_queries=6, min_stars_relaxed=25, repo_delta=0
