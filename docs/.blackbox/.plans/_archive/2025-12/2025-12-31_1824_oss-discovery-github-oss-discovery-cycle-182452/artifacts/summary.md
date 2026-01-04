	# Summary (OSS discovery cycle) — __SUMMARY_STATUS__
	
	Plan: `__PLAN_PATH__`
	
	This run produced **0 repos** after applying the current query bank + filters.
	
	If this was caused by GitHub Search API rate limiting, check `artifacts/search-extracted.json` for a `blocked` payload and re-run with `GITHUB_TOKEN`.
	
	## Suggested next run
	
	Try one of:
	
	- Increase recall:
	  - lower `--min-stars` (e.g. 10–25)
	  - reduce `--exclude-keywords`
	  - increase `--max-total-queries` (best with a token)
	- Increase breadth:
	  - leave rotation enabled (default) and run again (new slice of query bank)
	
	Start here:
	- Search report: `artifacts/github-search.md`
	- Diagnostics: `artifacts/diagnostics.md`
	EOF
	  perl -pe "s/__SUMMARY_STATUS__/$summary_status/g; s#__PLAN_PATH__#$plan_path#g" -i "$plan_path/artifacts/summary.md" 2>/dev/null || true

  cat >"$plan_path/artifacts/sources.md" <<EOF
# Sources

- Base query bank: \`$queries_md\`
- Feature map: \`$feature_map\`
- Derived query bank: \`$derived_queries\`
- Combined query bank: \`$combined_queries\`
- Rotated query bank: \`$rotated_queries\`
- Live search report: \`$search_report\`
- Search extracted JSON: \`$search_json\`
- Merged search JSON: \`$search_json_merged\`
- Repo tranche: \`$repo_list\`

## Notes

- Token used: \`$([[ -n "$token" ]] && echo "yes" || echo "no")\`
- Search filters: min_stars=\`$min_stars\`, include_forks=\`$include_forks\`, include_archived=\`$include_archived\`
- Excludes: keywords=\`$exclude_keywords\`, regex=\`$exclude_regex\`
- Query rotation: enabled=\`$enable_query_rotation\`, state_file=\`$state_file\`
- Gap boost: enabled=\`$enable_gap_boost\`, max_total_queries=\`$gap_boost_max_total_queries\`, min_count=\`$gap_boost_min_count\`
