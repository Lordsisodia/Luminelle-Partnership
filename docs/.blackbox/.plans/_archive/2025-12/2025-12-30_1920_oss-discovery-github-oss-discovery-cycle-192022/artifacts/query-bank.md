# OSS Discovery Query Bank (combined)

## Base query bank

# GitHub Search Queries — Shopify inventory webhooks + reconciliation (v1)
#
# Goal: integration glue for inventory:
# - Shopify inventory endpoints + webhooks
# - multi-location stock sync
# - reconciliation/drift detection
# - idempotent webhook processing (dedupe + retries)
#
# Avoid workflow engines and generic CMS repos.

## Shopify inventory API surface (keywords)
- `"inventory_levels" shopify`
- `"inventoryLevel" shopify webhook`
- `"inventory_levels/set" shopify`
- `"inventory_levels/adjust" shopify`
- `"inventory_item_id" shopify inventory`
- `"location_id" shopify inventory`

## Webhook ingestion patterns
- `shopify webhook idempotency`
- `shopify webhook deduplication`
- `shopify webhook retry handler`
- `webhook signature verification shopify`
- `webhook queue worker shopify`

## Reconciliation / drift detection
- `inventory reconciliation shopify`
- `stock reconciliation job shopify`
- `inventory drift detection shopify`
- `inventory mismatch alert shopify`

## Multi-location + 3PL sync patterns
- `multi location inventory sync shopify`
- `shopify inventory sync 3pl`
- `shopify fulfillment inventory sync`


## Derived from competitor feature map

# OSS Discovery Queries (derived from feature map)

Source: `.blackbox/.local/feature-map-inventory-sync.md`

These are auto-generated and intentionally capped per section.

## Admin UX primitives

- audit log open source
- rbac open source
- approval workflow open source
- csv import mapping open source

## Automation / Workflows

- workflow engine open source
- job queue dashboard open source
- idempotency keys open source
- webhook ingestion open source

## Orders / Fulfillment Ops

- inventory sync open source
- stock reconciliation open source
- inventory adjustments open source
- multi-location inventory open source
- inventory drift detection open source
- cycle count open source
- stocktake open source

## Returns / Exchanges

- returns portal ecommerce open source
- rma management open source
- wismo where is my order portal open source

