# Sources

- Base query bank: `.blackbox/.local/github-search-queries.blog-components-v3.md`
- Feature map: `/Users/shaansisodia/DEV/client-projects/lumelle/docs/05-planning/research/competitor-feature-map.md`
- Derived query bank: `.blackbox/.plans/2025-12-30_2202_oss-discovery-github-oss-discovery-cycle-220241/artifacts/feature-map-queries.md`
- Combined query bank: `.blackbox/.plans/2025-12-30_2202_oss-discovery-github-oss-discovery-cycle-220241/artifacts/query-bank.md`
- Live search report: `.blackbox/.plans/2025-12-30_2202_oss-discovery-github-oss-discovery-cycle-220241/artifacts/github-search.md`
- Search extracted JSON: `.blackbox/.plans/2025-12-30_2202_oss-discovery-github-oss-discovery-cycle-220241/artifacts/search-extracted.json`
- Merged search JSON: `.blackbox/.plans/2025-12-30_2202_oss-discovery-github-oss-discovery-cycle-220241/artifacts/search-extracted-merged.json`
- Repo tranche: `.blackbox/.plans/2025-12-30_2202_oss-discovery-github-oss-discovery-cycle-220241/oss/tranche-001-repos.txt`
- Raw metadata: `.blackbox/.plans/2025-12-30_2202_oss-discovery-github-oss-discovery-cycle-220241/oss/entries/*.json`
- Entry stubs: `.blackbox/.plans/2025-12-30_2202_oss-discovery-github-oss-discovery-cycle-220241/oss/entries/*.md`
- Deepening queue: `.blackbox/.plans/2025-12-30_2202_oss-discovery-github-oss-discovery-cycle-220241/artifacts/deepening-queue.md`
- Extracted candidates: `.blackbox/.plans/2025-12-30_2202_oss-discovery-github-oss-discovery-cycle-220241/artifacts/extracted.json`
- Coverage report: `.blackbox/.plans/2025-12-30_2202_oss-discovery-github-oss-discovery-cycle-220241/artifacts/coverage.md`
- Gap query suggestions: `.blackbox/.plans/2025-12-30_2202_oss-discovery-github-oss-discovery-cycle-220241/artifacts/gap-queries.md`
- Catalog gap queries (if used): `.blackbox/.plans/2025-12-30_2202_oss-discovery-github-oss-discovery-cycle-220241/artifacts/gap-queries.catalog.md`, `.blackbox/.plans/2025-12-30_2202_oss-discovery-github-oss-discovery-cycle-220241/artifacts/gap-queries.catalog.selected.md`, `.blackbox/.plans/2025-12-30_2202_oss-discovery-github-oss-discovery-cycle-220241/artifacts/gap-queries.catalog.selected.tags.json`
- Coverage quota queries (if used): `.blackbox/.plans/2025-12-30_2202_oss-discovery-github-oss-discovery-cycle-220241/artifacts/gap-queries.quota.md`, `.blackbox/.plans/2025-12-30_2202_oss-discovery-github-oss-discovery-cycle-220241/artifacts/gap-queries.quota.selected.md`, `.blackbox/.plans/2025-12-30_2202_oss-discovery-github-oss-discovery-cycle-220241/artifacts/gap-queries.quota.selected.tags.json`
- Auto picks: `.blackbox/.plans/2025-12-30_2202_oss-discovery-github-oss-discovery-cycle-220241/artifacts/auto-picks.md`
- Diagnostics: `.blackbox/.plans/2025-12-30_2202_oss-discovery-github-oss-discovery-cycle-220241/artifacts/diagnostics.md`

## Notes

- Token used: `yes` (set `GITHUB_TOKEN` to avoid rate limits)
- This cycle catalogs metadata only; it does not clone or vendor code.
- Search filters: min_stars=`100`, include_forks=`false`, include_archived=`false`
- Excludes: keywords=`template, starter, boilerplate, example, demo, awesome`, regex=``
- Query rotation: enabled=`true`, state_file=`/Users/shaansisodia/DEV/client-projects/lumelle/docs/.blackbox/.local/oss-discovery-state.json`
- Gap boost: enabled=`false`, max_total_queries=`8`, min_count=`1`
- Recent tag cache: window=`10`, state_recent_tags=`returns,auth,policy`
- Diagnostics snapshot: search_count=6, gap_count=0, merged_count=6, metadata_json_count=1
