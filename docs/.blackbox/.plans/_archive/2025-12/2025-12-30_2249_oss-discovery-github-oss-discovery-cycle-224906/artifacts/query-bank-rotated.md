# OSS Discovery Query Bank (combined)

## Base query bank

# GitHub Search Queries — Returns / RMA (v3, low-stars, less topic strict)
#
# Goal: find OSS implementations of returns/RMA/store credit flows.
# Strategy: accept a lower star floor (returns OSS tends to be niche), but keep queries
# “implementation-shaped” to avoid generic programming "return" hits.
#
# Recommended run settings:
# - `--min-stars 10` (or 25 if you’re getting too much noise)
# - `--include-archived` (returns repos are often abandoned)
# - `--no-derived-queries` (lane-only)
# - use a strict `--exclude-regex` for coursework/portfolios/templates


## Topic signals (no topic:ecommerce; too strict in practice)

# Topic-list style: expands into `topic:<token>` queries automatically.

- `return-portal`, `reverse-logistics`, `store-credit`

## Shopify-centric (apps/portals/label + store credit vocabulary)


- `"returns portal" shopify`
- `"return label" shopify`
- `"exchange" shopify "store credit"`
- `"store credit" shopify returns`

## Cross-platform e-commerce primitives (RMA lifecycle vocabulary)


- `"store credit" returns ecommerce`
- `"return label" ecommerce`
- `"return merchandise authorization" ecommerce`
- `"rma" ecommerce returns`

## Other ecosystems (often where OSS returns modules exist)


- `"saleor" returns`
- `"magento2" rma`
- `"magento 2" rma`
- `"woocommerce" returns plugin`

## Derived from competitor feature map

# OSS Discovery Queries (derived from feature map)

_Disabled for this run._
