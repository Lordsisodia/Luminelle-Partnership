# Sources

- Base query bank: `.blackbox/.local/github-search-queries.returns-shipping-v6-precision.md`
- Feature map: `/Users/shaansisodia/DEV/client-projects/lumelle/docs/05-planning/research/competitor-feature-map.md`
- Derived query bank: `.blackbox/.plans/2025-12-30_1734_oss-discovery-github-oss-discovery-cycle-173458/artifacts/feature-map-queries.md`
- Combined query bank: `.blackbox/.plans/2025-12-30_1734_oss-discovery-github-oss-discovery-cycle-173458/artifacts/query-bank.md`
- Live search report: `.blackbox/.plans/2025-12-30_1734_oss-discovery-github-oss-discovery-cycle-173458/artifacts/github-search.md`
- Search extracted JSON: `.blackbox/.plans/2025-12-30_1734_oss-discovery-github-oss-discovery-cycle-173458/artifacts/search-extracted.json`
- Merged search JSON: `.blackbox/.plans/2025-12-30_1734_oss-discovery-github-oss-discovery-cycle-173458/artifacts/search-extracted-merged.json`
- Repo tranche: `.blackbox/.plans/2025-12-30_1734_oss-discovery-github-oss-discovery-cycle-173458/oss/tranche-001-repos.txt`
- Raw metadata: `.blackbox/.plans/2025-12-30_1734_oss-discovery-github-oss-discovery-cycle-173458/oss/entries/*.json`
- Entry stubs: `.blackbox/.plans/2025-12-30_1734_oss-discovery-github-oss-discovery-cycle-173458/oss/entries/*.md`
- Deepening queue: `.blackbox/.plans/2025-12-30_1734_oss-discovery-github-oss-discovery-cycle-173458/artifacts/deepening-queue.md`
- Extracted candidates: `.blackbox/.plans/2025-12-30_1734_oss-discovery-github-oss-discovery-cycle-173458/artifacts/extracted.json`
- Coverage report: `.blackbox/.plans/2025-12-30_1734_oss-discovery-github-oss-discovery-cycle-173458/artifacts/coverage.md`
- Gap query suggestions: `.blackbox/.plans/2025-12-30_1734_oss-discovery-github-oss-discovery-cycle-173458/artifacts/gap-queries.md`
- Catalog gap queries (if used): `.blackbox/.plans/2025-12-30_1734_oss-discovery-github-oss-discovery-cycle-173458/artifacts/gap-queries.catalog.md`, `.blackbox/.plans/2025-12-30_1734_oss-discovery-github-oss-discovery-cycle-173458/artifacts/gap-queries.catalog.selected.md`, `.blackbox/.plans/2025-12-30_1734_oss-discovery-github-oss-discovery-cycle-173458/artifacts/gap-queries.catalog.selected.tags.json`
- Coverage quota queries (if used): `.blackbox/.plans/2025-12-30_1734_oss-discovery-github-oss-discovery-cycle-173458/artifacts/gap-queries.quota.md`, `.blackbox/.plans/2025-12-30_1734_oss-discovery-github-oss-discovery-cycle-173458/artifacts/gap-queries.quota.selected.md`, `.blackbox/.plans/2025-12-30_1734_oss-discovery-github-oss-discovery-cycle-173458/artifacts/gap-queries.quota.selected.tags.json`
- Auto picks: `.blackbox/.plans/2025-12-30_1734_oss-discovery-github-oss-discovery-cycle-173458/artifacts/auto-picks.md`
- Diagnostics: `.blackbox/.plans/2025-12-30_1734_oss-discovery-github-oss-discovery-cycle-173458/artifacts/diagnostics.md`

## Notes

- Token used: `yes` (set `GITHUB_TOKEN` to avoid rate limits)
- This cycle catalogs metadata only; it does not clone or vendor code.
- Search filters: min_stars=`30`, include_forks=`false`, include_archived=`false`
- Excludes: keywords=`cms,headless,content,blog,newsletter,publishing,portfolio,resume,cv,personal site,wordpress,drupal,jekyll,hugo,ghost,strapi,directus,keystone,contentful,course,tutorial,medical,segmentation,pokemon,neural,deep learning,crypto`, regex=`(?i)\b(cms|headless cms|newsletter|blog|publishing|portfolio|resume|curriculum vitae|personal site|medical|segmentation|pokemon|neural|deep learning|crypto)\b`
- Query rotation: enabled=`true`, state_file=`/Users/shaansisodia/DEV/client-projects/lumelle/docs/.blackbox/.local/oss-discovery-state.json`
- Gap boost: enabled=`false`, max_total_queries=`8`, min_count=`1`
- Recent tag cache: window=`10`, state_recent_tags=`returns,auth,policy`
- Diagnostics snapshot: search_count=18, gap_count=0, merged_count=18, metadata_json_count=5
