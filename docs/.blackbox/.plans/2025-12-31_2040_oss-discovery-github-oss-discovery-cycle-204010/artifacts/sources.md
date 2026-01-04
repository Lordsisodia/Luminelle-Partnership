# Sources

- Base query bank: `.blackbox/snippets/research/github-search-queries-storefront-content.md`
- Feature map: `/Users/shaansisodia/DEV/client-projects/lumelle/docs/05-planning/research/competitor-feature-map.md`
- Derived query bank: `.blackbox/.plans/2025-12-31_2040_oss-discovery-github-oss-discovery-cycle-204010/artifacts/feature-map-queries.md`
- Combined query bank: `.blackbox/.plans/2025-12-31_2040_oss-discovery-github-oss-discovery-cycle-204010/artifacts/query-bank.md`
- Live search report: `.blackbox/.plans/2025-12-31_2040_oss-discovery-github-oss-discovery-cycle-204010/artifacts/github-search.md`
- Search extracted JSON: `.blackbox/.plans/2025-12-31_2040_oss-discovery-github-oss-discovery-cycle-204010/artifacts/search-extracted.json`
- Merged search JSON: `.blackbox/.plans/2025-12-31_2040_oss-discovery-github-oss-discovery-cycle-204010/artifacts/search-extracted-merged.json`
- Repo tranche: `.blackbox/.plans/2025-12-31_2040_oss-discovery-github-oss-discovery-cycle-204010/oss/storefront-content-001-repos.txt`
- Raw metadata: `.blackbox/.plans/2025-12-31_2040_oss-discovery-github-oss-discovery-cycle-204010/oss/entries/*.json`
- Entry stubs: `.blackbox/.plans/2025-12-31_2040_oss-discovery-github-oss-discovery-cycle-204010/oss/entries/*.md`
- Deepening queue: `.blackbox/.plans/2025-12-31_2040_oss-discovery-github-oss-discovery-cycle-204010/artifacts/deepening-queue.md`
- Extracted candidates: `.blackbox/.plans/2025-12-31_2040_oss-discovery-github-oss-discovery-cycle-204010/artifacts/extracted.json`
- Coverage report: `.blackbox/.plans/2025-12-31_2040_oss-discovery-github-oss-discovery-cycle-204010/artifacts/coverage.md`
- Gap query suggestions: `.blackbox/.plans/2025-12-31_2040_oss-discovery-github-oss-discovery-cycle-204010/artifacts/gap-queries.md`
- Catalog gap queries (if used): `.blackbox/.plans/2025-12-31_2040_oss-discovery-github-oss-discovery-cycle-204010/artifacts/gap-queries.catalog.md`, `.blackbox/.plans/2025-12-31_2040_oss-discovery-github-oss-discovery-cycle-204010/artifacts/gap-queries.catalog.selected.md`, `.blackbox/.plans/2025-12-31_2040_oss-discovery-github-oss-discovery-cycle-204010/artifacts/gap-queries.catalog.selected.tags.json`
- Coverage quota queries (if used): `.blackbox/.plans/2025-12-31_2040_oss-discovery-github-oss-discovery-cycle-204010/artifacts/gap-queries.quota.md`, `.blackbox/.plans/2025-12-31_2040_oss-discovery-github-oss-discovery-cycle-204010/artifacts/gap-queries.quota.selected.md`, `.blackbox/.plans/2025-12-31_2040_oss-discovery-github-oss-discovery-cycle-204010/artifacts/gap-queries.quota.selected.tags.json`
- Auto picks: `.blackbox/.plans/2025-12-31_2040_oss-discovery-github-oss-discovery-cycle-204010/artifacts/auto-picks.md`
- Diagnostics: `.blackbox/.plans/2025-12-31_2040_oss-discovery-github-oss-discovery-cycle-204010/artifacts/diagnostics.md`

## Notes

- Token used: `yes` (set `GITHUB_TOKEN` to avoid rate limits)
- This cycle catalogs metadata only; it does not clone or vendor code.
- Search filters: min_stars=`50`, include_forks=`false`, include_archived=`false`
- Excludes: keywords=`awesome,curated,list`, regex=``
- Query rotation: enabled=`true`, state_file=`/Users/shaansisodia/DEV/client-projects/lumelle/docs/.blackbox/.local/oss-discovery-state.json`
- Gap boost: enabled=`false`, max_total_queries=`8`, min_count=`1`
- Recent tag cache: window=`10`, state_recent_tags=`auth,policy,shipping,support,workflows,admin,cms,observability,commerce,analytics`
- Diagnostics snapshot: search_count=62, gap_count=0, merged_count=62, metadata_json_count=8
