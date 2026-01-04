# Diagnostics (OSS discovery cycle)

Plan: `.blackbox/.plans/2025-12-30_2314_oss-discovery-github-oss-discovery-cycle-231439`

## Counts

- Search (initial) candidates: 111
- Search (gap boost) candidates: 0
- Search (merged) candidates: 75
- Search (catalog gap boost) candidates: 0
- Search (coverage quota boost) candidates: 8
- Repo metadata fetched (*.json): 7
- Tranche repos (pre-filter): 75
- Tranche repos (post-filter): 7

## Settings snapshot

- Token used: yes
- Auto-tune: enabled=true (prev_failures_no_token=0, threshold=2, active=false, applied_max_total_queries=false, applied_max_repos=false)
- Rotation: enabled=true, state_file=`/Users/shaansisodia/DEV/client-projects/lumelle/docs/.blackbox/.local/oss-discovery-state.json`
- Gap boost: enabled=true, min_count=1, max_total_queries=8
- Gap boost retry: enabled=true, relaxed_min_stars=50
- Gap boost relax excludes: enabled=false
- Effective sizing: max_total_queries=40, max_repos=75, max_queries_per_group=4
- Filters: min_stars=100, include_forks=false, include_archived=false
- Excludes: keywords="template, starter, boilerplate, example, demo, awesome", regex=""
- Prefer-new: enabled=true, applied=true, used_fallback=false, catalog_file=`/Users/shaansisodia/DEV/client-projects/lumelle/docs/.blackbox/oss-catalog/catalog.json`
- Prefer-new details: removed_seen=68, kept_curated=7, curation_file=`/Users/shaansisodia/DEV/client-projects/lumelle/docs/.blackbox/oss-catalog/curation.json`, keep_statuses="adopt,poc,deepen"
- Recent gap-tag cache: window=10, recent_tags="returns,auth,policy,shipping,support"
- Catalog gap boost: enabled=true, applied=false, min_tranche_repos=12, max_total_queries=6, min_stars_relaxed=25, repo_delta=0
- Catalog gap boost selection: max_tags=3, rotation_start_index=0, total_gap_tags=0, selected_gap_tags=0, selected_query_lines=5, selected_tags="", avoid_recent_tags=true, excluded_recent_tags="returns,auth,policy"
- Catalog gap boost details: blocked=false, blocked_reason="", error_http_status=""
- Coverage quota boost: enabled=true, applied=true, min_count_per_tag=2, max_total_queries=6, min_stars_relaxed=25, repo_delta=0
- Coverage quota selection: max_tags=3, rotate_tags=true, rotation_start_index=0, total_gap_tags=5, selected_gap_tags=2, selected_query_lines=10, selected_tags="shipping,support", avoid_recent_tags=true, excluded_recent_tags="returns,auth,policy", excluded_tags="returns,auth,policy"
- Coverage quota boost details: blocked=false, blocked_reason="", error_http_status=""
