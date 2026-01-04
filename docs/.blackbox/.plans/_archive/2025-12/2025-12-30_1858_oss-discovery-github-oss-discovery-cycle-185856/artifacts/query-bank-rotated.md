# OSS Discovery Query Bank (combined)

## Base query bank

# GitHub Search Queries — TSV paste normalization + type coercion (v1)
#
# Goal: glue libraries/utilities for bulk-edit paste/import:
# - parse Excel/Google Sheets clipboard TSV reliably (quotes, newlines)
# - normalize rows/columns (ragged rows, empty trailing cols)
# - type coercion for common admin fields (dates, currency, ints, booleans)
# - schema coercion patterns (zod preprocess, transform pipelines)
#
# These should complement CSV parsers like PapaParse and grid components.


## TSV / Excel clipboard parsing

- `excel paste tsv parser javascript`
- `google sheets clipboard tsv parse`
- `parse tab delimited text typescript`
- `clipboard tsv parse normalize`

## Clipboard paste utilities (tabular)

- `clipboard parser typescript`
- `paste handler spreadsheet typescript`
- `parse clipboard table text`

## Type coercion (dates/numbers/currency/booleans)

- `coerce types zod preprocess`
- `zod coerce date`
- `zod coerce number`
- `zod preprocess csv`

## Validation + transforms (row pipelines)

- `schema transform validate rows`
- `row level validation typescript`
- `zod transform pipeline`

## Topic-qualified (when present)


- `topic:csv topic:typescript`
- `topic:zod`
- `topic:tsv`

## Derived from competitor feature map

# OSS Discovery Queries (derived from feature map)

Source: `/Users/shaansisodia/DEV/client-projects/lumelle/docs/05-planning/research/competitor-feature-map.md`

These are auto-generated and intentionally capped per section.


## Admin UX primitives


- approval workflow open source
- csv import mapping open source
- Bulk actions with preview dry-run open source
- Filter + saved views open source

## Analytics


- Anomaly detection open source
- Core commerce metrics open source
- Attribution open source
- Funnel analytics open source

## Automation / Workflows


- Replay simulate on historical events open source
- Run logs + debugging UI open source
- Alerting on failures open source
- Per-client playbooks as templates open source

## Checkout / Payments / Taxes


- Address validation open source
- Shipping rate logic + carrier integrations open source
- Discount rules and stacking controls open source
- Free shipping thresholds and promos open source

## Content / CMS


- Media library + image transformation open source
- Asset QA open source
- Blog publishing + SEO workflows open source
- Social content planning open source

## Customer Support / CX


- Knowledge base + self-serve flows open source
- Unified customer timeline open source
- Macros + suggested replies open source
- Policy enforcement open source

## Orders / Fulfillment Ops


- Batch label printing open source
- Carrier selection optimization open source
- Shipment tracking communications open source
- Delivery exceptions handling open source

## Returns / Exchanges


- rma management open source
- wismo where is my order portal open source
- Return portal open source
- Return reasons taxonomy open source

## Storefront / Merchandising


- Bundles kits sets open source
- Subscriptions open source
- Preorder backorder open source
- Back-in-stock alerts open source
