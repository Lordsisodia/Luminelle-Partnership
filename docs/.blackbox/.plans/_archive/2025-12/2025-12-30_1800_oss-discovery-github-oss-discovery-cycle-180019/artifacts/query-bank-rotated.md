# OSS Discovery Query Bank (combined)

## Base query bank

# GitHub Search Queries — Returns + Shipping (v6, precision)


## RMA / returns primitives (topic-qualified)


- `"return label" "ecommerce"`
- `"return portal" "shopify"`
- `topic:rma topic:ecommerce`
- `topic:reverse-logistics topic:ecommerce`

## Shipping / fulfillment primitives (topic-qualified)


- `"carrier rates" ecommerce`
- `"tracking" "shopify" app`
- `topic:shipping topic:ecommerce`
- `topic:fulfillment topic:ecommerce`

## Concrete integration terms (reduce ambiguity)



- `"3pl" integration ecommerce`
- `"wms" integration ecommerce`
- `"shipping label" api ecommerce`
- `"shipment tracking" api ecommerce`

## Derived from competitor feature map

# OSS Discovery Queries (derived from feature map)

Source: `/Users/shaansisodia/DEV/client-projects/lumelle/docs/05-planning/research/competitor-feature-map.md`

These are auto-generated and intentionally capped per section.


## Admin UX primitives


- Role-based access control open source
- Approval workflows for high-impact changes open source
- Change requests tickets inside admin open source
- audit log open source

## Analytics


- Funnel analytics open source
- Cohorts and retention curves open source
- Profit margin analytics open source
- Inventory analytics open source

## Automation / Workflows


- Actions mutate Shopify notify create tasks call APIs write to DB open source
- Human-in-the-loop approvals open source
- Retries idempotency deduping open source
- Versioned workflow definitions open source

## Checkout / Payments / Taxes


- Fraud checks risk rules open source
- Tax calculation + nexus support open source
- Address validation open source
- Shipping rate logic + carrier integrations open source

## Content / CMS


- Blog publishing + SEO workflows open source
- Social content planning open source
- Headless CMS integration open source
- Media library + image transformation open source

## Customer Support / CX


- Policy enforcement open source
- Identity verification for high-risk actions open source
- Escalation and SLA routing open source
- Agent assist AI open source

## Orders / Fulfillment Ops


- Shipment tracking communications open source
- Delivery exceptions handling open source
- Order routing rules open source
- Partial fulfillment and split shipments open source

## Returns / Exchanges


- Warehouse receiving workflows open source
- Inventory reconciliation on return open source
- Customer notifications + support deflection open source
- Reporting open source

## Storefront / Merchandising


- Bundles kits sets open source
- Subscriptions open source
- Preorder backorder open source
- Back-in-stock alerts open source
