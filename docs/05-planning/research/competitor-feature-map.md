# Competitor Feature Map (Lumelle / Shopify-connected AI Ops)

Date: 2025-12-28

This doc is a practical “feature universe” aggregated from the kinds of products that compete with a Shopify-connected, custom-built (but repeatable) commerce + admin + workflow stack.

The goal is not to copy any one competitor. The goal is to:
- Know what buyers expect as “table stakes”
- Identify the few areas where we can be meaningfully better
- Convert that into a repeatable build checklist (SaaS-shaped, even if delivered as custom builds)

---

## 1) Competitive Set (how buyers will compare you)

### A. Hosted commerce platforms (direct)
They solve “store + checkout + admin” end-to-end.

Examples: Shopify, BigCommerce, Adobe Commerce (managed), Shopware (SaaS).

### B. Composable / enterprise commerce (direct for larger clients)
They win on control + scale + multi-system integration and tend to have strong B2B/OMS needs.

Examples: commercetools, Spryker, Elastic Path, Salesforce Commerce Cloud.

### C. Open-source / self-host commerce (direct for cost/control buyers)
They win on “own the stack”, customization, and no platform tax (but require ops).

Examples: WooCommerce, Magento Open Source, Saleor, Medusa, Sylius, Vendure.

### D. “Ops layer” on top of Shopify (functional competitors)
These tools can replace big chunks of your differentiation if you don’t go deeper than “workflow automation + UI”.

Examples:
- automation: Shopify Flow, Zapier, Make, n8n, Workato
- retention: Klaviyo, Attentive, Postscript
- support: Gorgias, Zendesk
- subscriptions: Recharge, Skio
- shipping/returns: ShipStation, AfterShip, Loop Returns
- personalization/upsells: Rebuy, Nosto
- analytics attribution: Triple Whale, Northbeam

---

## 2) Feature Universe (what competitors collectively offer)

Use this as a master checklist. For each client, mark:
- **Needed now**
- **Needed later**
- **Not needed**

### 2.1 Storefront & Merchandising
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

### 2.2 Checkout, Payments, Taxes
- Checkout customization (limited in Shopify; deeper elsewhere)
- Multiple payment methods (cards, wallets, BNPL)
- Fraud checks / risk rules
- Tax calculation + nexus support
- Address validation
- Shipping rate logic + carrier integrations
- Discount rules and stacking controls
- Free shipping thresholds and promos

### 2.3 Orders & Fulfillment Ops
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

### 2.4 Returns & Exchanges (a major buyer pain)
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

### 2.5 Customer Support & CX
- Unified customer timeline (orders, tickets, returns, shipments, emails, SMS)
- Macros + suggested replies
- Policy enforcement (warranty, returns, shipping)
- Identity verification for high-risk actions
- Escalation and SLA routing
- Agent assist AI (grounded suggestions)
- Knowledge base + self-serve flows

### 2.6 Growth & Retention
- Email/SMS campaigns + flows
- Segmentation (RFM, cohorts, tags, events)
- Loyalty points and tiers
- Referral programs
- Post-purchase sequences
- Winback flows
- Review request flows
- A/B testing and experimentation
- Influencer/affiliate tracking

### 2.7 Content & Brand Ops
- Headless CMS integration
- Media library + image transformation
- Asset QA (resolution, compression, alt text)
- Blog publishing + SEO workflows
- Social content planning (optional)

### 2.8 Analytics & Finance
- Core commerce metrics (AOV, conversion, LTV, CAC)
- Attribution (first/last, modeled, blended)
- Funnel analytics (PDP → ATC → checkout)
- Cohorts and retention curves
- Profit & margin analytics (COGS, shipping, returns)
- Inventory analytics (stockouts, aging)
- Anomaly detection (refund spikes, chargebacks)

### 2.9 Admin UX (where you can be “best”)
- Bulk actions with preview/dry-run
- Filter + saved views
- Powerful search across admin objects
- Inline editing with validation
- CSV import/export with mapping
- Audit log for every change
- Role-based access control (RBAC)
- Approval workflows for high-impact changes
- Change requests / tickets inside admin

### 2.10 Automation & Workflows (core differentiator)
- Triggers: Shopify webhooks, schedules, manual, “threshold crossed”
- Conditions: data-based rules, segments, inventory, fraud signals
- Actions: mutate Shopify, notify, create tasks, call APIs, write to DB
- Human-in-the-loop approvals
- Retries, idempotency, deduping
- Versioned workflow definitions
- Replay/simulate on historical events
- Run logs + debugging UI
- Alerting (Slack/email) on failures
- Per-client “playbooks” as templates

### 2.11 Platform / DevOps Capabilities (SaaS-shaped)
- Multi-tenant separation (data + auth)
- Secrets management
- Environment separation (dev/stage/prod)
- Feature flags and staged rollouts
- Observability (logs/metrics/traces)
- Background jobs and queues
- Webhook ingestion at scale
- Rate limit protection and backpressure
- Data backfills and reconciliations

---

## 3) “Must Beat” for Beauty DTC (10k orders/month)

The fastest way to stand out is to crush painful, repetitive ops:

### Must Beat #1: Returns + Exchange economics
- Faster, policy-driven decisions
- Lower support load
- Better exchange conversion (keep revenue)

### Must Beat #2: Support timeline + AI grounded in customer data
- One page: customer → orders → shipments → returns → tickets
- AI suggests the next best action (refund? replacement? store credit?) with explanation

### Must Beat #3: Catalog ops speed (especially variants)
- Bulk edits with safe previews
- QA for titles/ingredients/images/SEO

### Must Beat #4: Workflow reliability and auditability
- Buyers will trust automation only if it’s observable and reversible

---

## 4) Packaging Idea (so custom builds “feel like SaaS”)

Offer modules that map to budgets/outcomes:
- **Catalog Ops**
- **Order Ops**
- **Returns Ops**
- **CX Ops**
- **Growth Ops**
- **Analytics Ops**
- **Platform Ops** (RBAC/audit/observability)

Each module should have:
- a default workflow set (playbooks)
- a UI surface (admin pages)
- an integration checklist (Shopify + others)

