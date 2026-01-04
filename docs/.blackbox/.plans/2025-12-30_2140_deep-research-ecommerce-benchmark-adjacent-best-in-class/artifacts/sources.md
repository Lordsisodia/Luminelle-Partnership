# Sources

Format:
- URL or file path
  - Supports: what claim/data this source backs
  - Accessed: YYYY-MM-DD
  - Confidence: High | Medium | Low

Example:
- https://example.com/pricing
  - Supports: pricing tiers + limits
  - Accessed: 2025-12-28
  - Confidence: High

## Adjacent best-in-class sources (this run)

- `05-planning/research/market-intelligence/ecommerce-benchmarking/adjacent-best-in-class-30.csv`
  - Supports: curated list (store + URL + why it matters + features to steal)
  - Accessed: 2025-12-30
  - Confidence: High

- `artifacts/snapshots/homepages/`
  - Supports: on-disk HTML evidence for snapshot signal detection (Tier C)
  - Accessed: 2025-12-30
  - Confidence: Medium (static HTML only; no JS execution)

- `artifacts/reports/store-snapshots-summary.csv`
  - Supports: automated signal extraction results (platform/BNPL/reviews/etc)
  - Accessed: 2025-12-30
  - Confidence: Medium (heuristics)

- `05-planning/research/market-intelligence/ecommerce-benchmarking/adjacent-best-in-class-30.enriched.csv`
  - Supports: joined “curated notes + snapshot signals + evidence file paths”
  - Accessed: 2025-12-30
  - Confidence: Medium (inherits snapshot heuristic limitations)
