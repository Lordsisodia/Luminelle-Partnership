# Sources

- Base query bank: `/Users/shaansisodia/DEV/client-projects/lumelle/docs/.blackbox/snippets/research/github-search-queries.md`
- Feature map: `/Users/shaansisodia/DEV/client-projects/lumelle/docs/05-planning/research/competitor-feature-map.md`
- Derived query bank: `.blackbox/.plans/2025-12-29_0622_oss-discovery-github-oss-discovery-cycle-062221/artifacts/feature-map-queries.md`
- Combined query bank: `.blackbox/.plans/2025-12-29_0622_oss-discovery-github-oss-discovery-cycle-062221/artifacts/query-bank.md`
- Live search report: `.blackbox/.plans/2025-12-29_0622_oss-discovery-github-oss-discovery-cycle-062221/artifacts/github-search.md`
- Search extracted JSON: `.blackbox/.plans/2025-12-29_0622_oss-discovery-github-oss-discovery-cycle-062221/artifacts/search-extracted.json`
- Merged search JSON: `.blackbox/.plans/2025-12-29_0622_oss-discovery-github-oss-discovery-cycle-062221/artifacts/search-extracted-merged.json`
- Repo tranche: `.blackbox/.plans/2025-12-29_0622_oss-discovery-github-oss-discovery-cycle-062221/oss/tranche-diagnostics-test-repos.txt`
- Raw metadata: `.blackbox/.plans/2025-12-29_0622_oss-discovery-github-oss-discovery-cycle-062221/oss/entries/*.json`
- Entry stubs: `.blackbox/.plans/2025-12-29_0622_oss-discovery-github-oss-discovery-cycle-062221/oss/entries/*.md`
- Deepening queue: `.blackbox/.plans/2025-12-29_0622_oss-discovery-github-oss-discovery-cycle-062221/artifacts/deepening-queue.md`
- Extracted candidates: `.blackbox/.plans/2025-12-29_0622_oss-discovery-github-oss-discovery-cycle-062221/artifacts/extracted.json`
- Coverage report: `.blackbox/.plans/2025-12-29_0622_oss-discovery-github-oss-discovery-cycle-062221/artifacts/coverage.md`
- Gap query suggestions: `.blackbox/.plans/2025-12-29_0622_oss-discovery-github-oss-discovery-cycle-062221/artifacts/gap-queries.md`
- Auto picks: `.blackbox/.plans/2025-12-29_0622_oss-discovery-github-oss-discovery-cycle-062221/artifacts/auto-picks.md`
- Diagnostics: `.blackbox/.plans/2025-12-29_0622_oss-discovery-github-oss-discovery-cycle-062221/artifacts/diagnostics.md`

## Notes

- Token used: `no` (set `GITHUB_TOKEN` to avoid rate limits)
- This cycle catalogs metadata only; it does not clone or vendor code.
- Search filters: min_stars=`200`, include_forks=`false`, include_archived=`false`
- Excludes: keywords=`template,starter,boilerplate`, regex=``
- Query rotation: enabled=`true`, state_file=`/Users/shaansisodia/DEV/client-projects/lumelle/docs/.blackbox/.local/oss-discovery-state.json`
- Gap boost: enabled=`true`, max_total_queries=`1`, min_count=`1`
- Diagnostics snapshot: search_count=11, gap_count=0, merged_count=11, metadata_json_count=5
