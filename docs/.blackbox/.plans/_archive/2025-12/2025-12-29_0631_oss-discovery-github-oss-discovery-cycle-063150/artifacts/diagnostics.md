# Diagnostics (OSS discovery cycle)

Plan: `.blackbox/.plans/2025-12-29_0631_oss-discovery-github-oss-discovery-cycle-063150`

## Counts

- Search (initial) candidates: 38
- Search (gap boost) candidates: 0
- Search (merged) candidates: 38
- Repo metadata fetched (*.json): 21

## Settings snapshot

- Token used: no
- Auto-tune: enabled=true (threshold=2, tuned_max_total_queries=4, tuned_max_repos=25)
- Rotation: enabled=true, state_file=`/Users/shaansisodia/DEV/client-projects/lumelle/docs/.blackbox/.local/oss-discovery-state.json`
- Gap boost: enabled=false, min_count=1, max_total_queries=8
- Gap boost retry: enabled=true, relaxed_min_stars=50
- Gap boost relax excludes: enabled=false
- Filters: min_stars=200, include_forks=false, include_archived=false
- Excludes: keywords="template,starter,boilerplate", regex=""
