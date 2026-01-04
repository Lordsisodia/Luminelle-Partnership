# Diagnostics (OSS discovery cycle)

Plan: `.blackbox/.plans/2025-12-29_0639_oss-discovery-github-oss-discovery-cycle-063936`

## Counts

- Search (initial) candidates: 9
- Search (gap boost) candidates: 0
- Search (merged) candidates: 9
- Repo metadata fetched (*.json): 0

## Settings snapshot

- Token used: no
- Auto-tune: enabled=true (prev_failures_no_token=3, threshold=2, active=true, applied_max_total_queries=true, applied_max_repos=true)
- Rotation: enabled=true, state_file=`/Users/shaansisodia/DEV/client-projects/lumelle/docs/.blackbox/.local/oss-discovery-state.json`
- Gap boost: enabled=false, min_count=1, max_total_queries=8
- Gap boost retry: enabled=true, relaxed_min_stars=50
- Gap boost relax excludes: enabled=false
- Effective sizing: max_total_queries=4, max_repos=25, max_queries_per_group=4
- Filters: min_stars=50, include_forks=false, include_archived=false
- Excludes: keywords="template, starter, boilerplate, example, demo, awesome", regex=""
