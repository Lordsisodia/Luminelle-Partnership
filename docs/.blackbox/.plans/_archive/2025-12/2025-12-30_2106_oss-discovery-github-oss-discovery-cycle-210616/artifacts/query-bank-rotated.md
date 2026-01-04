# OSS Discovery Query Bank (combined)

## Base query bank

# GitHub Search Queries — Storefront topics (v1)

Goal: find additional **storefront reference implementations** and **component patterns** via GitHub Topics
to avoid the “personal site” / “portfolio” noise in plain keyword searches.

Notes:

- Use a higher `--min-stars` (e.g. 100–300) to keep results high-signal.
- Each bullet below is a comma-separated list of backticked tokens.
- Our search tooling expands these into `topic:<token>` queries automatically.

## Shopify + Hydrogen


- `hydrogen`, `shopify-hydrogen`, `shopify-storefront`, `storefront-api`, `shopify-storefront-api`, `shopify`

## Headless commerce storefront ecosystems


- `medusajs`, `medusa`
- `vuestorefront`, `vue-storefront`
- `headless-commerce`, `ecommerce`, `e-commerce`, `storefront`, `commerce`
- `saleor`, `saleor-storefront`, `saleor-commerce`
- `vendure`, `vendure-commerce`

## Storefront UI patterns (occasionally tagged)


- `product-page`, `product-card`, `product-grid`, `cart`, `checkout`, `filters`, `facets`, `search`

## Derived from competitor feature map

# OSS Discovery Queries (derived from feature map)

Source: `/Users/shaansisodia/DEV/client-projects/lumelle/docs/05-planning/research/competitor-feature-map.md`

These are auto-generated and intentionally capped per section.


## Admin UX primitives


- Audit log for every change open source
- Role-based access control open source
- Approval workflows for high-impact changes open source
- Change requests tickets inside admin open source
- audit log open source
- rbac open source
- approval workflow open source
- csv import mapping open source

## Analytics


- Anomaly detection open source
- Core commerce metrics open source
- Attribution open source
- Funnel analytics open source
- Cohorts and retention curves open source
- Profit margin analytics open source
- Inventory analytics open source

## Automation / Workflows


- webhook ingestion open source
- Triggers Shopify webhooks schedules manual threshold crossed open source
- Conditions data-based rules segments inventory fraud signals open source
- Actions mutate Shopify notify create tasks call APIs write to DB open source
- Human-in-the-loop approvals open source
- Retries idempotency deduping open source
- Versioned workflow definitions open source
- Replay simulate on historical events open source

## Checkout / Payments / Taxes


- Tax calculation + nexus support open source
- Address validation open source
- Shipping rate logic + carrier integrations open source
- Discount rules and stacking controls open source
- Free shipping thresholds and promos open source
- Checkout customization open source
- Multiple payment methods open source
- Fraud checks risk rules open source

## Content / CMS


- Blog publishing + SEO workflows open source
- Social content planning open source
- Headless CMS integration open source
- Media library + image transformation open source
- Asset QA open source

## Customer Support / CX


- Knowledge base + self-serve flows open source
- Unified customer timeline open source
- Macros + suggested replies open source
- Policy enforcement open source
- Identity verification for high-risk actions open source
- Escalation and SLA routing open source
- Agent assist AI open source

## Orders / Fulfillment Ops


- Cancellations and refunds with policy rules open source
- Exchanges open source
- Warehouse pick pack queues open source
- Batch label printing open source
- Carrier selection optimization open source
- Shipment tracking communications open source
- Delivery exceptions handling open source
- Order routing rules open source

## Returns / Exchanges


- Fraud abuse signals open source
- Warehouse receiving workflows open source
- Inventory reconciliation on return open source
- Customer notifications + support deflection open source
- Reporting open source
- returns portal ecommerce open source
- rma management open source
- wismo where is my order portal open source

## Storefront / Merchandising


- PDP templates by product type open source
- Variant and option management open source
- Bundles kits sets open source
- Subscriptions open source
- Preorder backorder open source
- Back-in-stock alerts open source
- Size guides ingredient guides open source
- Theme page builder open source
