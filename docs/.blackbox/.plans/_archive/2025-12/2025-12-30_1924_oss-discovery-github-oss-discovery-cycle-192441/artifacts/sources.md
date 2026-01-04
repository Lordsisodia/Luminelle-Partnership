# Sources

- Base query bank: `.blackbox/.local/github-search-queries.webhook-idempotency-dedupe-v1.md`
- Feature map: `.blackbox/.local/feature-map-webhooks-idempotency.md`
- Derived query bank: `.blackbox/.plans/2025-12-30_1924_oss-discovery-github-oss-discovery-cycle-192441/artifacts/feature-map-queries.md`
- Combined query bank: `.blackbox/.plans/2025-12-30_1924_oss-discovery-github-oss-discovery-cycle-192441/artifacts/query-bank.md`
- Live search report: `.blackbox/.plans/2025-12-30_1924_oss-discovery-github-oss-discovery-cycle-192441/artifacts/github-search.md`
- Search extracted JSON: `.blackbox/.plans/2025-12-30_1924_oss-discovery-github-oss-discovery-cycle-192441/artifacts/search-extracted.json`
- Merged search JSON: `.blackbox/.plans/2025-12-30_1924_oss-discovery-github-oss-discovery-cycle-192441/artifacts/search-extracted-merged.json`
- Repo tranche: `.blackbox/.plans/2025-12-30_1924_oss-discovery-github-oss-discovery-cycle-192441/oss/webhook-idempotency-dedupe-v2-2025-12-30-repos.txt`
- Raw metadata: `.blackbox/.plans/2025-12-30_1924_oss-discovery-github-oss-discovery-cycle-192441/oss/entries/*.json`
- Entry stubs: `.blackbox/.plans/2025-12-30_1924_oss-discovery-github-oss-discovery-cycle-192441/oss/entries/*.md`
- Deepening queue: `.blackbox/.plans/2025-12-30_1924_oss-discovery-github-oss-discovery-cycle-192441/artifacts/deepening-queue.md`
- Extracted candidates: `.blackbox/.plans/2025-12-30_1924_oss-discovery-github-oss-discovery-cycle-192441/artifacts/extracted.json`
- Coverage report: `.blackbox/.plans/2025-12-30_1924_oss-discovery-github-oss-discovery-cycle-192441/artifacts/coverage.md`
- Gap query suggestions: `.blackbox/.plans/2025-12-30_1924_oss-discovery-github-oss-discovery-cycle-192441/artifacts/gap-queries.md`
- Catalog gap queries (if used): `.blackbox/.plans/2025-12-30_1924_oss-discovery-github-oss-discovery-cycle-192441/artifacts/gap-queries.catalog.md`, `.blackbox/.plans/2025-12-30_1924_oss-discovery-github-oss-discovery-cycle-192441/artifacts/gap-queries.catalog.selected.md`, `.blackbox/.plans/2025-12-30_1924_oss-discovery-github-oss-discovery-cycle-192441/artifacts/gap-queries.catalog.selected.tags.json`
- Coverage quota queries (if used): `.blackbox/.plans/2025-12-30_1924_oss-discovery-github-oss-discovery-cycle-192441/artifacts/gap-queries.quota.md`, `.blackbox/.plans/2025-12-30_1924_oss-discovery-github-oss-discovery-cycle-192441/artifacts/gap-queries.quota.selected.md`, `.blackbox/.plans/2025-12-30_1924_oss-discovery-github-oss-discovery-cycle-192441/artifacts/gap-queries.quota.selected.tags.json`
- Auto picks: `.blackbox/.plans/2025-12-30_1924_oss-discovery-github-oss-discovery-cycle-192441/artifacts/auto-picks.md`
- Diagnostics: `.blackbox/.plans/2025-12-30_1924_oss-discovery-github-oss-discovery-cycle-192441/artifacts/diagnostics.md`

## Notes

- Token used: `yes` (set `GITHUB_TOKEN` to avoid rate limits)
- This cycle catalogs metadata only; it does not clone or vendor code.
- Search filters: min_stars=`5`, include_forks=`false`, include_archived=`false`
- Excludes: keywords=`wordpress,ghost,jekyll,hugo,drupal,magento,woocommerce,shopware,prestashop,workflow,bpmn,activiti`, regex=`(?i)\bworkflow\b|\bbpmn\b|\bactiviti\b|\bwordpress\b|\bghost\b|\bjekyll\b|\bhugo\b|\bdrupal\b`
- Query rotation: enabled=`false`, state_file=`/Users/shaansisodia/DEV/client-projects/lumelle/docs/.blackbox/.local/oss-discovery-state.json`
- Gap boost: enabled=`false`, max_total_queries=`8`, min_count=`1`
- Recent tag cache: window=`10`, state_recent_tags=`returns,auth,policy`
- Diagnostics snapshot: search_count=30, gap_count=0, merged_count=30, metadata_json_count=14
