# OSS Discovery Query Bank (combined)

## Base query bank

# GitHub Search Queries — Returns-only (v2, topic-qualified)
#
# Goal: focus on RMA/returns/store-credit primitives with less noise.
# Strategy: prefer `topic:` and explicit returns vocabulary; avoid generic "script"/"agreement"/"whitepaper" patterns.


## Topic-qualified returns/RMA (best signal when present)

- `topic:reverse-logistics topic:ecommerce`
- `topic:return-portal topic:ecommerce`
- `topic:rma topic:ecommerce`
- `topic:returns topic:ecommerce`

## Shopify returns apps / portals (narrower)

- `"exchange" "shopify app" "store credit"`
- `"return portal" "shopify app"`
- `"returns" "shopify app" "store credit"`

## Store credit primitives

- `"store credit" "returns" ecommerce`
- `"store credit" refund exchange`

## RMA workflow primitives


- `"return received" inspection restock`
- `"rma" "return reason" taxonomy`
- `"return request" "rma number"`

## Derived from competitor feature map

# OSS Discovery Queries (derived from feature map)

Source: `/Users/shaansisodia/DEV/client-projects/lumelle/docs/05-planning/research/competitor-feature-map.md`

These are auto-generated and intentionally capped per section.


## Admin UX primitives


- rbac open source
- approval workflow open source
- csv import mapping open source
- Bulk actions with preview dry-run open source

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


- Discount rules and stacking controls open source
- Free shipping thresholds and promos open source
- Checkout customization open source
- Multiple payment methods open source

## Content / CMS


- Asset QA open source
- Blog publishing + SEO workflows open source
- Social content planning open source
- Headless CMS integration open source

## Customer Support / CX


- Knowledge base + self-serve flows open source
- Unified customer timeline open source
- Macros + suggested replies open source
- Policy enforcement open source

## Orders / Fulfillment Ops


- Backorder handling workflows open source
- Cancellations and refunds with policy rules open source
- Exchanges open source
- Warehouse pick pack queues open source

## Returns / Exchanges


- returns portal ecommerce open source
- rma management open source
- wismo where is my order portal open source
- Return portal open source

## Storefront / Merchandising


- Size guides ingredient guides open source
- Theme page builder open source
- Landing page sections CMS blocks open source
- PDP templates by product type open source
