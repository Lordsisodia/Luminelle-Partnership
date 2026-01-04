# OSS Discovery Query Bank (combined)

## Base query bank

# GitHub Search Queries — Storefront pattern mining (v3)
#
# Goal: find real storefront codebases that implement the UI patterns we want to mine:
# - cart drawer / minicart
# - variant selector (size/color)
# - collection filters / facets
# - search UI + instant search
# - product cards/grids + pagination
#
# Keep queries "implementation-shaped" to reduce generic CMS hits.


## Cart / minicart / cart drawer

- `"add to cart" "Shopify Storefront API" next`
- `"cart drawer" nextjs`
- `"cart drawer" react`
- `"minicart" react ecommerce`

## Variants / options selectors

- `"selectedOptions" Shopify Storefront API`
- `"variant selector" react ecommerce`
- `"product variants" selector nextjs`
- `"size selector" "color selector" react ecommerce`

## Collection filters / facets / PLP

- `"filter sidebar" ecommerce react`
- `"collection filters" nextjs ecommerce`
- `"facet filters" react ecommerce`
- `"product listing" filters nextjs`

## Search / autocomplete / instant search

- `"search suggestions" storefront`
- `"instantsearch" ecommerce storefront`
- `"algolia" storefront nextjs`
- `"search autocomplete" ecommerce react`

## Storefront starter codebases (broad, but commerce-oriented)


- `saleor storefront "cart"`
- `shopify storefront api "cart lines"`
- `hydrogen "cart" "drawer"`
- `medusa "cart" storefront nextjs`

## Derived from competitor feature map

# OSS Discovery Queries (derived from feature map)

Source: `/Users/shaansisodia/DEV/client-projects/lumelle/docs/05-planning/research/competitor-feature-map.md`

These are auto-generated and intentionally capped per section.


## Admin UX primitives


- Approval workflows for high-impact changes open source
- Change requests tickets inside admin open source
- audit log open source
- rbac open source

## Analytics


- Cohorts and retention curves open source
- Profit margin analytics open source
- Inventory analytics open source
- Anomaly detection open source

## Automation / Workflows


- Human-in-the-loop approvals open source
- Retries idempotency deduping open source
- Versioned workflow definitions open source
- Replay simulate on historical events open source

## Checkout / Payments / Taxes


- Tax calculation + nexus support open source
- Address validation open source
- Shipping rate logic + carrier integrations open source
- Discount rules and stacking controls open source

## Content / CMS


- Social content planning open source
- Headless CMS integration open source
- Media library + image transformation open source
- Asset QA open source

## Customer Support / CX


- Identity verification for high-risk actions open source
- Escalation and SLA routing open source
- Agent assist AI open source
- Knowledge base + self-serve flows open source

## Orders / Fulfillment Ops


- Delivery exceptions handling open source
- Order routing rules open source
- Partial fulfillment and split shipments open source
- Backorder handling workflows open source

## Returns / Exchanges


- Inventory reconciliation on return open source
- Customer notifications + support deflection open source
- Reporting open source
- returns portal ecommerce open source

## Storefront / Merchandising


- Subscriptions open source
- Preorder backorder open source
- Back-in-stock alerts open source
- Size guides ingredient guides open source
