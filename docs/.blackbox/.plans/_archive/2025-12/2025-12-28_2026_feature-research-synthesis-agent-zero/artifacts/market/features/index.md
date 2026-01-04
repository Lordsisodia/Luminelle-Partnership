# Feature Inventory (market-wide)

Scoring rubric: `../process/rubric.md`

Seed sources:
- `docs/05-planning/research/competitor-feature-map.md` (initial feature universe)

## Goal

Capture **all market features** we see (grouped), then score the winners for vibe-coding feasibility.

## Buckets

- Storefront & Merchandising
- Checkout, Payments & Promotions
- Orders, Fulfillment & Inventory Ops
- Returns & Exchanges
- Customer Support & CX
- Growth, Retention & Loyalty
- Content & Brand Ops
- Analytics & Reporting
- Experimentation & Feature Flags
- Admin UX & Platform Primitives
- Workflow Automation & AI Assist

---

## Storefront & Merchandising

- Theme / page builder
- Landing page sections, CMS blocks
- PDP templates by product type
- Variant and option management
- Bundles / kits / sets
- Gift cards
- Subscriptions (membership + subscribe-and-save)
- Preorder / backorder
- Back-in-stock alerts
- Size guides / ingredient guides
- UGC on PDP (reviews, photos, video)
- Cross-sell / upsell (PDP, cart, post-purchase)
- Personalization rules (segments → content)
- Multi-currency / multi-language (i18n)
- SEO controls (meta, structured data, canonical, redirects)
- Search (synonyms, typo tolerance, merch rules)
- Recommendations (“frequently bought together”, “you may also like”)

## Checkout, Payments & Promotions

- Checkout customization (platform-dependent)
- Multiple payment methods (cards, wallets, BNPL)
- Fraud checks / risk rules
- Tax calculation + nexus support
- Address validation
- Shipping rate logic + carrier integrations
- Discount rules and stacking controls
- Free shipping thresholds and promos
- Post-purchase upsell flows
- Store credit / wallet

## Orders, Fulfillment & Inventory Ops

- Order routing rules (by location, inventory, SLA)
- Partial fulfillment and split shipments
- Backorder handling workflows
- Cancellations and refunds with policy rules
- Exchanges
- Warehouse pick/pack queues
- Batch label printing
- Carrier selection optimization
- Shipment tracking communications
- Delivery exceptions handling
- “Where is my order” self-serve portal
- Inventory sync + reconciliation
- Stockout prevention + low-stock alerts

## Returns & Exchanges

- Return portal
- Return reasons taxonomy
- Refund vs store credit rules
- Exchange flows (variant selection)
- RMA labels and drop-off options
- Fraud/abuse signals (return rate, wardrobing)
- Warehouse receiving workflows
- Inventory reconciliation on return
- Customer notifications + support deflection
- Reporting (cost of returns, return drivers)

## Customer Support & CX

- Unified customer timeline (orders, tickets, returns, shipments, emails, SMS)
- Macros + suggested replies
- Policy enforcement (warranty, returns, shipping)
- Identity verification for high-risk actions
- Escalation and SLA routing
- Agent assist AI (grounded suggestions)
- Knowledge base + self-serve flows

## Growth, Retention & Loyalty

- Email/SMS campaigns + flows
- Segmentation (RFM, cohorts, tags, events)
- Loyalty points and tiers
- Referral programs
- Post-purchase sequences
- Winback flows
- Review request flows
- Influencer/affiliate tracking

## Content & Brand Ops

- Headless CMS integration
- Media library + image transformation
- Asset QA (resolution, compression, alt text)
- Blog publishing + SEO workflows
- Social content planning

## Analytics & Reporting

- Core commerce metrics (AOV, conversion, LTV, CAC)
- Attribution (first/last, modeled, blended)
- Funnel analytics (PDP → ATC → checkout)
- Cohorts and retention curves
- Profit & margin analytics (COGS, shipping, returns)
- Inventory analytics (stockouts, aging)
- Anomaly detection (refund spikes, chargebacks)

## Experimentation & Feature Flags

- A/B testing and experimentation
- Feature flags (per client / per segment / per environment)
- Rollout strategies (percentage, targeting rules)
- Holdouts + measurement

## Admin UX & Platform Primitives

- Role-based access control (RBAC) + permissions
- Audit logs + change history
- Activity timeline per entity (order/product/customer)
- Saved views, filters, segments
- Bulk actions, imports/exports
- Configurable “modules” per client (entitlements)
- Review/approval queues (publish gates)
- Commenting + collaboration (“ops notes”)

## Workflow Automation & AI Assist

- Workflow builder (if/then, triggers, schedules)
- Background jobs + retries + idempotency
- Webhook ingestion + replay
- Human-in-the-loop approvals
- AI suggestions with grounding (show sources)
- Automated classification (tickets, return reasons, feedback)
- “Explain why” logs for AI actions (auditability)

