---
status: draft
last_reviewed: 2025-12-29
owner: agent
---

# Sources (Step 01 — Feature Hunt + OSS Harvest)

Format per source:
- URL
  - Supports: what claim/data this backs
  - Accessed: YYYY-MM-DD
  - Confidence: High | Medium | Low

## Source index (stable IDs for cross-references)

- S1 — Shopify: Manage returns (admin workflow)
- S2 — Shopify: Create return labels (labels + tracking)
- S3 — Loop help center: Exchanges / store credit patterns (selected)
- S4 — AfterShip Returns: returns management positioning (portal + resolutions + analytics)
- S5 — AfterShip Returns: help docs on policies/resolutions (selected)
- S6 — ReturnGO: “any-to-any exchange” pattern
- S7 — Narvar: Returns & exchanges product positioning
- S8 — Happy Returns: Return Bar (drop-off network)
- S9 — Reuters: return fraud + AI trend signal
- S10 — Shopify: fulfill orders (single fulfillment + tracking number)
- S11 — Shopify: order statuses (fulfillment state machine basics)
- S12 — Shopify: fulfillment holds (hold/release)
- S13 — Shopify Flow: trigger “fulfillment service failed to complete fulfillment”
- S14 — AfterShip Tracking: delivery status enums (Exception, AttemptFail, Expired, etc.)
- S15 — AfterShip Tracking: notification delivery (event-driven notifications)
- S16 — EasyPost: tracking guide (trackers + updates)
- S17 — EasyPost: addresses (verification/deliverability tools)
- S18 — EasyPost: webhooks/events (receiving updates)
- S19 — 17TRACK: tracking status taxonomy (main + substatus patterns)
- S20 — Shopify: Locations (inventory + fulfillment contexts)
- S21 — Shopify: Order fulfillment for locations (routing rules + split)
- S22 — Shopify: Manage inventory across multiple locations
- S23 — Shopify: Viewing/searching inventory transfers
- S24 — Shopify POS: Receiving inventory transfers (barcode scanning)
- S25 — Shopify: Bulk editing inventory quantities
- S26 — Shopify: Selling when out of stock (overselling behavior)
- S27 — Shopify: Track inventory + continue selling option
- S28 — Shopify: Fulfilling orders individually (split/merge fulfillment)
- S29 — Shopify: Setting up fulfillable inventory (shipping zones + routability)
- S30 — Gorgias: Macros (canned actions/responses)
- S31 — Gorgias: Rules (automation: events + conditions + actions)
- S32 — Gorgias: Auto-assign tickets
- S33 — Chatwoot: Canned responses
- S34 — Chatwoot: Automation rules
- S35 — Zendesk: SLA policies (developer doc)
- S36 — Zendesk: Views (queues)
- S37 — Gorgias help: Metrics calculated (support analytics definitions)
- S38 — Intercom help: Teammate performance reporting
- S39 — Zendesk API: Satisfaction Ratings
- S40 — Zendesk Explore recipe: First reply time
- S41 — MaestroQA help: Rubric / scorecard / QA evaluation concepts
- S42 — Shopify help: Add search to your store
- S43 — Shopify help: Customize search results
- S44 — Shopify help: Shop app order status page (customer order tracking)
- S45 — Shopify help: Order status page customization
- S46 — Shopify help: Customer accounts (new/legacy overview)
- S47 — AfterShip Tracking: Tracking page / branded tracking (customer UX)
- S48 — AfterShip Tracking: Tracking API overview (customer tracking + webhooks)
- S49 — Help Center/Docs platform primitives (Docusaurus docs)
- S50 — n8n docs: Workflows (nodes/triggers/actions)
- S51 — Zapier docs: Triggers / actions / searches model
- S52 — Shopify Flow: Overview (automation in Shopify)
- S53 — Node-RED docs: Flows (flow-based programming)
- S54 — Activepieces docs: Pieces (open-source automation primitives)
- S55 — Temporal docs: Workflows (durable execution patterns)
- S56 — Shopify Help: Staff permissions (roles/permissions)
- S57 — Shopify Help: Two-step authentication (2FA)
- S58 — Okta docs: SAML overview (SSO)
- S59 — Microsoft Entra ID docs: SCIM provisioning overview
- S60 — Keycloak docs: Server Administration Guide
- S61 — OPA docs: Policy language + use cases (authorization)
- S62 — OpenFGA docs: Relationship-based access control
- S63 — OWASP ASVS: Security requirements baseline
- S64 — Stripe docs: Webhook signatures (verification)
- S65 — GitHub docs: Audit log events (audit trail patterns)
- S66 — Shopify Help: Purchase orders (Stocky / purchasing)
- S67 — Shopify Help: Stocky replenishment / forecasting concepts
- S68 — Odoo docs: Reordering rules (min/max)
- S69 — ERPNext docs: Material Request / Reorder level
- S70 — AWS docs: Forecast service overview (demand forecasting)
- S71 — Stripe docs: Billing overview (subscriptions)
- S72 — Stripe docs: Invoices (concepts)
- S73 — Stripe docs: Proration behavior (subscriptions)
- S74 — Stripe docs: Customer tax IDs / tax settings
- S75 — Paddle docs: Subscription lifecycle (merchant billing ops)
- S76 — Chargebee docs: Subscription changes and proration (concepts)
- S77 — Stripe docs: Radar (fraud prevention)
- S78 — Stripe docs: Disputes/chargebacks lifecycle
- S79 — Stripe docs: Dispute evidence submission
- S80 — Shopify Help: Fraud analysis (order risk)
- S81 — Visa: Chargeback reason codes (overview)
- S82 — Stripe docs: MRR metric (Revenue Recognition / MRR)
- S83 — Stripe docs: Churn and retention metrics (billing analytics)
- S84 — Baremetrics: SaaS metrics definitions (MRR, churn, LTV)
- S85 — Recurly: MRR and churn definitions (subscription analytics)
- S86 — OpenMetrics/Prometheus: metric types + naming conventions
- S87 — Stripe docs: Webhooks overview (events + signing)
- S88 — Segment docs: Sources and Destinations (integration hub model)
- S89 — Shopify Admin API: Webhooks overview (events)
- S90 — Shopify Admin API: Bulk operations (data export)
- S91 — Airbyte docs: Connectors (ELT model)
- S92 — Meltano docs: ELT and plugins model
- S93 — Svix docs: Webhook delivery and retries model
- S94 — Shopify POS: Barcode scanner and device requirements (retail ops)
- S95 — Shopify POS: Receive inventory transfers (barcode workflow)
- S96 — Apple docs: Background app refresh and push notifications (concepts)
- S97 — Firebase Cloud Messaging docs (push notifications)
- S98 — Expo docs: Offline support and data persistence (mobile patterns)
- S99 — React Native docs: AsyncStorage (offline persistence)
- S100 — Google ML Kit: Barcode scanning (mobile SDK reference)
- S101 — Asana guide: Tasks basics (task model)
- S102 — Jira docs: Workflow and issue transitions
- S103 — Notion docs: Database properties (lightweight task schema)
- S104 — GitHub docs: Issues and projects (work items)
- S105 — Slack docs: Workflow Builder (approvals + tasks via messaging)
- S106 — Shopify Help: Sell in multiple currencies (Shopify Payments)
- S107 — Shopify Help: Shopify Markets overview (multi-region)
- S108 — Unicode CLDR: Locale data (languages, currencies, formats)
- S109 — ICU User Guide: Internationalization and locale formats
- S110 — FormatJS docs: Intl message formatting
- S111 — i18next docs: Translation management and language detection
- S112 — Dinero.js docs: Money calculations and rounding
- S160 — AfterShip Returns docs: printerless return labels (QR code)
- S161 — Happy Returns: boxless/drop-off returns positioning
- S162 — Reuters: returns fraud / AI trend (UPS, 2025)
- S163 — Reshop: Instant Refunds (financing/instant payout) positioning
- S164 — Loop: Instant Returns beta positioning
- S165 — AfterShip Returns docs: set up instant exchanges
- S166 — AfterShip Returns docs: auto refunds rules
- S167 — Chargebee docs: subscriptions overview (status + lifecycle primitives)
- S168 — Chargebee docs: pause subscription workflow
- S169 — Chargebee docs: reactivation workflow
- S170 — Chargebee API docs: update subscription items (plan changes)
- S171 — Chargebee docs: bulk operations (batch changes)
- S172 — ReCharge: subscriptions product positioning (skip/swap/portal patterns)
- S173 — Appstle: subscriptions positioning (skip/swap/pause patterns)
- S174 — Skio: subscriptions platform positioning (customer portal + retention)
- S175 — Ordergroove: subscription platform positioning (retention + program ops)
- S176 — Appriss Retail: returns and claims abuse (return fraud cost signal)
- S177 — Stripe: Identity verification (KYC/IDV capability)
- S178 — Trulioo: identity verification solution positioning (IDV gating)
- S179 — EasyPost docs: Trackers object model (events + status details)
- S180 — USPS: Missing Mail help (lost package workflow)
- S181 — ShipEngine docs: tracking by label ID (tracking retrieval patterns)
- S182 — ShipEngine docs: tracking webhooks (event delivery patterns)
- S183 — ShipEngine docs: branded tracking page (customer comms UX baseline)
- S184 — Shippo docs: tracking overview (tracking objects model)
- S185 — Shippo docs: tracking webhooks (event delivery patterns)
- S186 — Shippo docs: webhook debugging (delivery retries + troubleshooting patterns)
- S187 — Chargebee docs: account hierarchy (parent/child accounts)
- S188 — Chargebee docs: quotes (sales-assisted pricing + approval flows)
- S189 — Chargebee docs: invoices (B2B invoice lifecycle + fields)
- S190 — Chargebee docs: advance invoices (invoice ahead of term)
- S191 — Recurly docs: accounts (B2B account model)
- S192 — Recurly docs: invoices (invoice lifecycle)
- S193 — Chargebee docs: entitlements / feature management (seat/feature gating primitives)
- S194 — GA4 developer docs: events reference (promotion events baseline)
- S195 — GrowthBook: OSS feature flag + experimentation platform (A/B + holdouts)
- S196 — Cube docs: semantic layer/metrics modeling (ROI dashboards)
- S197 — dbt: transformation workflow (metric tables, cohorts)
- S198 — PostHog docs: insights/cohorts (conversion + retention measurement)
- S199 — Snowplow: event tracking pipeline (behavioral analytics)
- S200 — Shopify Admin API (GraphQL): refundCreate mutation (refund execution primitive)
- S201 — Shopify Admin API (GraphQL): giftCardCreate mutation (store credit primitive)
- S202 — Shopify Admin API (GraphQL): Return + returnCreate (returns primitive)
- S203 — Shopify Admin API (GraphQL): Fulfillment object model (shipment + tracking fields)
- S204 — Shopify Admin API (GraphQL): FulfillmentOrder object model (fulfillment planning/routing primitive)
- S205 — Shopify Admin API (GraphQL): fulfillmentCreateV2 mutation (create fulfillment + attach tracking)
- S206 — Shopify Admin API (GraphQL): webhookSubscriptions query + WebhookSubscription object (webhook management primitives)
- S207 — Shopify Admin API (GraphQL): FulfillmentHold object model (hold reason/fields)
- S208 — Shopify Admin API (GraphQL): fulfillmentOrderHold mutation (place fulfillment hold)
- S209 — Shopify Admin API (GraphQL): fulfillmentOrderReleaseHold mutation (release fulfillment hold)
- S210 — Shopify Admin API (GraphQL): orders query / ordersCount (order data access for analytics joins)
- S211 — Shopify Admin API (GraphQL): bulkOperationRunQuery mutation + BulkOperation object (warehouse extraction pattern)
- S212 — Shopify Admin API (GraphQL): StaffMember object + staffMembers query (staff listing primitives)
- S213 — Shopify Admin API (GraphQL): AppInstallation + AccessScope (app scopes/permissions introspection primitives)
- S214 — Shopify Admin API (GraphQL): events query (admin events feed; useful for audit-style ingestion)
- S215 — OpenTelemetry: Collector docs (collection/processing pipeline)
- S216 — OpenTelemetry: What is OpenTelemetry (overview of logs/metrics/traces)
- S217 — OpenTelemetry: Metrics data model spec (metrics semantics and structure)
- S218 — Grafana docs (dashboards and exploration UI)
- S219 — Prometheus docs (metrics collection/querying model)
- S220 — Sentry docs (error tracking/issue workflow)
- S221 — Shopify Admin API (GraphQL): SubscriptionContract object model (subscription truth)
- S222 — Shopify Admin API (GraphQL): subscriptionContracts query (list/filter subscription contracts)
- S223 — Shopify Admin API (GraphQL): subscriptionContractUpdate mutation (change cadence/address/items via contract updates)
- S224 — Shopify Admin API (GraphQL): subscriptionContractCancel mutation (cancellation primitive)
- S225 — Shopify Admin API (GraphQL): SubscriptionBillingAttempt object model (billing attempt lifecycle)
- S226 — Shopify Admin API (GraphQL): subscriptionBillingAttempts query (failed billing attempts feed)
- S227 — Shopify Admin API (GraphQL): SubscriptionDraft + draft update/commit (edit staged changes flow)
- S228 — Shopify Apps docs: Subscriptions / purchase options (app model and concepts)
- S229 — BullMQ docs (Redis-backed job queues; retries/timers primitives)
- S230 — Quartz Scheduler docs (job scheduling primitives; enterprise scheduler baseline)
- S231 — Shopify Admin API (GraphQL): OrderRisk object model (order risk assessment primitives)
- S232 — React Admin docs (OSS admin scaffolding patterns)
- S233 — Refine docs (OSS “headless” admin framework patterns)
- S234 — TanStack Table repo (table/pagination/selection primitives)
- S235 — cmdk repo (command palette / ⌘K UI primitive)
- S236 — kbar repo (command palette / actions UI primitive)
- S237 — Meilisearch docs (OSS search engine; global search indexing primitive)
- S238 — Typesense docs (OSS search engine; fast fuzzy search primitive)
- S239 — Shopify Admin API (GraphQL): Product + products query (catalog feed for search index)
- S240 — Shopify Admin API (GraphQL): Collection + collections query (merchandising groupings for search/browse)
- S241 — Shopify Admin API (GraphQL): Metafield object model (attributes/signals for ranking/facets)
- S242 — Algolia docs: managing results / search UI & UX (merch rules, synonyms, curation patterns)
- S243 — Elastic docs: Elasticsearch getting started (search engine baseline for relevance, analyzers)
- S244 — Shopify Admin API (GraphQL): productCreate/productUpdate/productDelete/productSet (catalog mutation primitives)
- S245 — Shopify Admin API (GraphQL): productVariantsBulkCreate (variant bulk mutation primitive)
- S246 — Shopify Admin API (GraphQL): metafieldsSet (bulk attribute mutation primitive)
- S247 — Shopify Admin API (GraphQL): discountNodes query + count queries (discount inventory/list primitives)
- S248 — Expo docs: Notifications (push notifications integration patterns)
- S249 — Shopify dev: POS UI Extensions docs (POS extension surface reference)
- S250 — Shopify Admin API (GraphQL): shopifyPaymentsAccount query (payments account + payouts/disputes entry point)
- S251 — Shopify Admin API (GraphQL): ShopifyPaymentsAccount object model (payments account fields)
- S252 — Shopify Admin API (GraphQL): ShopifyPaymentsBalanceTransaction object model (fees/adjustments transaction feed)
- S253 — Shopify Admin API (GraphQL): OrderTransaction object model (order-level payment transaction primitives)
- S254 — Shopify Admin API (GraphQL): ShopifyPaymentsDispute object model (chargebacks/disputes primitives)
- S255 — Shopify Apps docs: Billing overview (billing requirements + concepts for apps)
- S256 — Shopify Admin API (GraphQL): appSubscriptionCreate mutation (create recurring app subscription charges)
- S257 — Shopify Admin API (GraphQL): appSubscriptionCancel mutation (cancel recurring app subscription charges)
- S258 — Shopify Admin API (GraphQL): appPurchaseOneTimeCreate mutation (create one-time app charges)
- S259 — Shopify Admin API (GraphQL): appUsageRecordCreate mutation (usage-based billing records)
- S260 — Shopify Admin API (GraphQL): Location object model (inventory/fulfillment node)
- S261 — Shopify Admin API (GraphQL): locations query (list locations)
- S262 — Shopify Admin API (GraphQL): InventoryItem object model (SKU-level inventory record)
- S263 — Shopify Admin API (GraphQL): InventoryLevel object model (inventory per location)
- S264 — Shopify Admin API (GraphQL): inventoryAdjustQuantity mutation (adjustments)
- S265 — Shopify Admin API (GraphQL): inventorySetOnHandQuantities mutation (set on-hand quantities)
- S266 — Shopify Admin API (GraphQL): inventoryActivate mutation (activate inventory at location)
- S267 — Stripe docs: Identity verification (IDV primitives for high-risk gating)

## GitHub (primary)

- https://github.com/medusajs/medusa
  - Supports: OSS pointer for returns/refunds primitives inside an e-commerce backend (deep mapping deferred to Step-04).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/saleor/saleor
  - Supports: OSS pointer for order management + refunds primitives in a GraphQL commerce platform (deep mapping deferred to Step-04).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/vendure-ecommerce/vendure
  - Supports: OSS pointer for order/fulfillment/refund primitives and extensions ecosystem (deep mapping deferred to Step-04).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/Sylius/Sylius
  - Supports: OSS pointer for commerce core patterns incl. refunds/returns plugin ecosystem (deep mapping deferred to Step-04).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/spree/spree
  - Supports: OSS pointer for legacy returns/RMA patterns (license + current relevance to be reviewed in Step-04).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/vtex-apps/return-app
  - Supports: OSS pointer for returns app patterns (UI + services) in a commerce ecosystem.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/OCA/rma
  - Supports: OSS pointer for ERP-style RMA workflow patterns (receipt/inspection/disposition).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/ChiliDevsTeam/woocommerce-return-warranty-management
  - Supports: OSS pointer for WooCommerce-style admin return processing plugin patterns.
  - Accessed: 2025-12-29
  - Confidence: Low (community plugin quality varies)

- https://github.com/karrioapi/karrio
  - Supports: OSS pointer for carrier/shipping API integration layer (labels/tracking abstractions) useful for shipping exceptions.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/openvenues/libpostal
  - Supports: OSS pointer for address parsing/normalization primitives (address correction + validation workflows).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/openaddresses/openaddresses
  - Supports: OSS pointer for address datasets/pipelines (adjacent to address verification/correction).
  - Accessed: 2025-12-29
  - Confidence: Low/Medium

- https://github.com/osm-search/Nominatim
  - Supports: OSS pointer for geocoding and address search; can power “address autocomplete” (license to verify in Step-04; commonly GPL).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/frappe/erpnext
  - Supports: OSS pointer for inventory + warehouse workflows (stock ledger, transfers, receiving) as pattern reference.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/odoo/odoo
  - Supports: OSS pointer for mature inventory/warehouse workflows (picking, transfers, replenishment) as pattern reference (license posture to verify in Step-04).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/openboxes/openboxes
  - Supports: OSS pointer for WMS-style receiving/picking/shipping workflows and exception handling patterns.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/InvenTree/InvenTree
  - Supports: OSS pointer for inventory tracking, stock adjustments, and parts-based warehouse patterns (adjacent).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/apache/ofbiz-framework
  - Supports: OSS pointer for order/inventory/warehouse patterns in an enterprise-grade OSS suite.
  - Accessed: 2025-12-29
  - Confidence: Low/Medium

- https://github.com/chatwoot/chatwoot
  - Supports: OSS pointer for omnichannel inbox + canned responses + automation rule patterns.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/zammad/zammad
  - Supports: OSS pointer for ticketing/helpdesk workflows (queues, triggers, SLAs) as pattern reference (license to verify; likely AGPL).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/freescout-helpdesk/freescout
  - Supports: OSS pointer for shared inbox/helpdesk workflows (macros, tags, customer threads) as pattern reference (license to verify; may be AGPL/other).
  - Accessed: 2025-12-29
  - Confidence: Low/Medium

- https://github.com/osTicket/osTicket
  - Supports: OSS pointer for ticket lifecycle patterns (states, assignments, SLAs) (license to verify).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/apache/superset
  - Supports: OSS pointer for BI dashboards and operational analytics (support KPIs, QA rollups) (license to verify in Step-04; typically Apache-2.0).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/metabase/metabase
  - Supports: OSS pointer for internal dashboards and ad-hoc reporting (license to verify in Step-04; **flag** AGPL/other).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/posthog/posthog
  - Supports: OSS pointer for product analytics + session replay patterns (can support “agent tooling usage” and deflection analysis) (license to verify in Step-04).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/grafana/grafana
  - Supports: OSS pointer for dashboards/alerts (SLA breach alerts, queue health monitoring) (license to verify in Step-04; typically AGPL/Apache mix).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/open-telemetry/opentelemetry-collector
  - Supports: OSS pointer for event/metrics pipelines (collect ticket events, SLA timers, automation executions) (license to verify in Step-04; typically Apache-2.0).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/facebook/docusaurus
  - Supports: OSS pointer for help center / docs site generation (search, versioning, IA) as self-serve deflection surface.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/algolia/docsearch
  - Supports: OSS pointer for documentation search experience (crawler + UI patterns) (license to verify in Step-04).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/meilisearch/meilisearch
  - Supports: OSS pointer for site search engine (help center search; store search) (license to verify in Step-04).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/typesense/typesense
  - Supports: OSS pointer for search engine (help center search) (**flag** license; often GPL) (verify in Step-04).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/n8n-io/n8n
  - Supports: OSS pointer for workflow automation builder (triggers/actions integrations) patterns.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/node-red/node-red
  - Supports: OSS pointer for flow-based automation builder UI + runtime patterns.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/activepieces/activepieces
  - Supports: OSS pointer for “Zapier-like” automation patterns (pieces, triggers/actions) (license to verify).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/temporalio/temporal
  - Supports: OSS pointer for durable workflow execution engine patterns (retries/timeouts/long-running jobs).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/keycloak/keycloak
  - Supports: OSS pointer for SSO (OIDC/SAML), MFA, and user/session management patterns (admin UX + policy surfaces).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/ory
  - Supports: OSS pointer umbrella for authn/authz building blocks (Kratos/Hydra/Keto) (license to verify per repo).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/open-policy-agent/opa
  - Supports: OSS pointer for policy-as-code authorization decisions (RBAC/ABAC) and “why denied” explanations patterns.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/openfga/openfga
  - Supports: OSS pointer for fine-grained authorization (relationship-based access control) and permission checks.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/casbin/casbin
  - Supports: OSS pointer for RBAC/ABAC policy models and enforcement library patterns.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/frappe/erpnext
  - Supports: OSS pointer for purchasing + inventory replenishment workflows (reorder levels, material requests, POs) as pattern reference.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/odoo/odoo
  - Supports: OSS pointer for mature replenishment workflows (min/max rules, lead times, procurement) as pattern reference.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/inventree/InvenTree
  - Supports: OSS pointer for stock control + reordering patterns (adjacent, parts-based) as reference.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/facebook/prophet
  - Supports: OSS pointer for time-series forecasting model (demand forecasting primitives) (license to verify in Step-04).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/statsmodels/statsmodels
  - Supports: OSS pointer for statistical forecasting/time-series tools (ARIMA/ETS) as baseline models (license to verify).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/darts/darts
  - Supports: OSS pointer for forecasting library abstractions (multiple models/backtesting) (license to verify).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/killbill/killbill
  - Supports: OSS pointer for subscription billing engine patterns (invoicing, proration, catalog/plans) (license to verify; often Apache-2.0).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/solidgate-tech/solidgate
  - Supports: OSS pointer for payments/billing platform patterns (verify relevance + license; may be SDKs not billing engine).
  - Accessed: 2025-12-29
  - Confidence: Low

- https://github.com/stripe/stripe-cli
  - Supports: OSS pointer for webhook testing and billing integration workflows (developer tooling patterns).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/stripe/stripe-mock
  - Supports: OSS pointer for API mocking/testing patterns for billing flows (developer workflow).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/maxmind/GeoIP2-python
  - Supports: OSS pointer for IP geolocation primitives (risk signals: country mismatch, IP reputation adjacency) (license to verify).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/tensorflow/decision-forests
  - Supports: OSS pointer for tabular classification models (fraud scoring experimentation) (license to verify).
  - Accessed: 2025-12-29
  - Confidence: Low/Medium

- https://github.com/shap/shap
  - Supports: OSS pointer for model explainability (“why flagged”) patterns for risk scoring systems (license to verify).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/metabase/metabase
  - Supports: OSS pointer for finance dashboards (MRR/churn/cohorts) (license to verify; **flag** AGPL/other).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/apache/superset
  - Supports: OSS pointer for finance analytics dashboards and reporting (license to verify; typically Apache-2.0).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/grafana/grafana
  - Supports: OSS pointer for dashboards/alerts on finance metrics pipelines (license to verify; **flag**).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/prometheus/prometheus
  - Supports: OSS pointer for metrics collection and naming conventions (useful for finance metric instrumentation).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/cube-js/cube
  - Supports: OSS pointer for semantic layer / metrics modeling for finance analytics (license to verify; **flag**).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/airbytehq/airbyte
  - Supports: OSS pointer for connector-based ELT integrations (sources/destinations, sync jobs) as pattern reference.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/meltano/meltano
  - Supports: OSS pointer for ELT orchestration and plugin model (Singer taps/targets) as integration admin reference.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/singer-io
  - Supports: OSS pointer for Singer tap/target ecosystem (connector packaging patterns) (license varies; verify in Step-04).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/svix/svix-webhooks
  - Supports: OSS pointer for webhook delivery infrastructure (retries, signing, observability) and admin surfaces.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/n8n-io/n8n
  - Supports: OSS pointer for integration connectors and automation building blocks (triggers/actions) (license to verify).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/expo/expo
  - Supports: OSS pointer for React Native tooling and offline/push patterns (mobile ops apps).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/firebase/firebase-js-sdk
  - Supports: OSS pointer for push + offline persistence patterns (client SDK; license to verify).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/react-native-async-storage/async-storage
  - Supports: OSS pointer for offline persistence (local storage) in React Native apps.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/zxing/zxing
  - Supports: OSS pointer for barcode scanning primitives/patterns (camera scanning workflows).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/point-of-sale/mobile-scanner
  - Supports: OSS pointer for barcode scanner integration patterns (verify relevance and license).
  - Accessed: 2025-12-29
  - Confidence: Low

- https://github.com/mattermost/mattermost
  - Supports: OSS pointer for notifications + approvals/tasking via messaging integrations (workflow patterns).
  - Accessed: 2025-12-29
  - Confidence: Low/Medium

- https://github.com/outline/outline
  - Supports: OSS pointer for lightweight knowledge base + tasks/docs linking (playbooks) patterns (license to verify).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/focalboard/focalboard
  - Supports: OSS pointer for kanban/project boards and task workflow patterns (license to verify).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/formatjs/formatjs
  - Supports: OSS pointer for Intl message formatting and locale-aware formatting patterns.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/i18next/i18next
  - Supports: OSS pointer for translation runtime patterns (namespaces, language detection, interpolation).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/dinerojs/dinero.js
  - Supports: OSS pointer for money calculations, currency precision, and rounding patterns.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/unicode-org/cldr-json
  - Supports: OSS pointer for CLDR locale data distribution (currency symbols, formats).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/unicode-org/icu
  - Supports: OSS pointer for ICU libraries implementing locale-aware formatting (dates, numbers, currencies).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://github.com/auditjs/auditjs
  - Supports: OSS pointer for audit log/event logging patterns (verify relevance + license in Step-04).
  - Accessed: 2025-12-29
  - Confidence: Low

## Web (secondary)

- https://help.shopify.com/en/manual/orders/fulfillment/returns/manage-returns
  - Supports: S1 — Shopify admin return creation + processing workflow primitives (return status, refund/exchange actions).
  - Accessed: 2025-12-29
  - Confidence: High

- https://help.shopify.com/en/manual/fulfillment/shopify-shipping/shipping-labels/return-labels/create-return-labels
  - Supports: S2 — return label creation flow + data needed (label + tracking).
  - Accessed: 2025-12-29
  - Confidence: High

- https://help.loopreturns.com/en/articles/1393290-starting-exchanges-instant-exchange
  - Supports: S3 — exchange-first workflow framing (instant exchange).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://help.loopreturns.com/en/articles/5196640-shop-now-keep-the-sale-on-return
  - Supports: S3 — “shop now” / keep-the-sale pattern for returns.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.aftership.com/returns
  - Supports: S4 — returns management positioning (branded portal, multiple resolutions, analytics framing).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.aftership.com/returns-center
  - Supports: S4/S5 — “returns center” positioning (branded portal + customer UX cues).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://support.aftership.com/article/599-return-policy-settings
  - Supports: S5 — policy configuration details (eligibility/rules) for returns automation.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://support.aftership.com/article/1296-return-resolutions
  - Supports: S5 — resolution types terminology (refund/exchange/store credit variants) as a feature universe input.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://returngo.ai/any-to-any-exchange/
  - Supports: S6 — “any-to-any exchange” as a named, marketable workflow.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://corp.narvar.com/returns-and-exchanges
  - Supports: S7 — enterprise returns/exchanges as a unified product area (portal + ops + insights framing).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.happyreturns.com/return-bar/
  - Supports: S8 — drop-off network (“Return Bar”) as a return method with scan-based handoff implications.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.reuters.com/business/retail-consumer/retailers-turn-ai-fight-growing-return-fraud-2024-07-01/
  - Supports: S9 — trend evidence that return fraud is rising and AI/risk scoring is being adopted.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.aftership.com/docs/returns/faq/return-labels#how-can-i-set-up-printerless-return-labels-with-qr-code-
  - Supports: S160 — printerless return labels via QR code (customer drop-off scan vs printing at home).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.happyreturns.com/resources/ship-faster-faqs/
  - Supports: S161 — boxless returns positioning (QR codes + drop-off implications for “scan-in / consolidated shipping” workflows).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.reuters.com/world/us/ups-using-ai-detect-price-return-fraud-2025-11-18/
  - Supports: S162 — returns fraud trend signal + “AI to detect return fraud” as justification for risk scoring + gating features.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.reshop.com/instant-refunds
  - Supports: S163 — instant refunds “financing layer” (refund before warehouse receipt) as a marketable workflow.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.loopreturns.com/instant-returns/
  - Supports: S164 — “instant returns” positioning as a named workflow (pre-approved return initiation + speed framing).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.aftership.com/docs/returns/how-to/set-up-instant-exchanges
  - Supports: S165 — instant exchange setup steps and configuration knobs for exchange-first workflows.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.aftership.com/docs/returns/how-to/set-up-auto-refunds
  - Supports: S166 — auto-refund automation as an explicit feature (rules/conditions + event-driven refunds).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.chargebee.com/docs/billing/2.0/subscriptions/subscriptions
  - Supports: S167 — subscription lifecycle primitives (status model, core subscription operations) for subscription ops admin features.
  - Accessed: 2025-12-29
  - Confidence: Medium/High

- https://www.chargebee.com/docs/billing/2.0/subscriptions/pause-subscription
  - Supports: S168 — pause/resume subscription workflow and constraints (pause duration, contract compatibility) for pause features.
  - Accessed: 2025-12-29
  - Confidence: Medium/High

- https://www.chargebee.com/docs/billing/2.0/subscriptions/reactivation
  - Supports: S169 — reactivation workflow concepts (resume after cancel/pause) for winback and restore-access admin flows.
  - Accessed: 2025-12-29
  - Confidence: Medium/High

- https://apidocs.chargebee.com/docs/api/subscriptions?lang=curl#update_subscription_for_items
  - Supports: S170 — subscription item update primitives for plan changes, swap flows, and “edit upcoming order” equivalents (API-level backing).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.chargebee.com/docs/billing/2.0/data-operations/bulk-operations
  - Supports: S171 — bulk operations patterns (batch changes) for subscription migrations, mass price updates, and policy rollouts.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://getrecharge.com/products/subscriptions/
  - Supports: S172 — subscription product positioning including customer portal and common subscriber actions (skip/swap/pause) as a market baseline.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://appstle.com/
  - Supports: S173 — subscription app positioning (customer portal + subscription actions) as market baseline for skip/swap/pause and upcoming order edits.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://skio.com/
  - Supports: S174 — subscription platform positioning (subscriber portal + retention) as baseline for customer self-serve subscription management.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.ordergroove.com/
  - Supports: S175 — subscription platform positioning emphasizing retention and subscription program ops as baseline for subscription ops workflows.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://apprissretail.com/blog/returns-and-claims-abuse-a-103b-finance-problem-retail-cfos-overlook/
  - Supports: S176 — return/claims abuse magnitude framing; supports why fraud gating and policy controls matter.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://stripe.com/identity
  - Supports: S177 — identity verification capability as a gating control for high-risk returns and “instant refund” eligibility.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.trulioo.com/solutions/identity-verification
  - Supports: S178 — identity verification positioning and workflow framing (IDV/KYC) for return fraud reduction/gating.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://docs.easypost.com/docs/trackers
  - Supports: S179 — tracking object model (events/updates) for exception detection like “no scan” and state normalization.
  - Accessed: 2025-12-29
  - Confidence: High

- https://www.usps.com/help/missing-mail.htm
  - Supports: S180 — “missing mail” flow framing (lost package workflow) for customer support/claims escalation paths.
  - Accessed: 2025-12-29
  - Confidence: Medium/High

- https://www.shipengine.com/docs/tracking/track-by-label-id/
  - Supports: S181 — tracking retrieval patterns and object framing (track by internal label identifier).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.shipengine.com/docs/tracking/webhooks/
  - Supports: S182 — webhook event delivery patterns for tracking updates (exception-driven workflows).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.shipengine.com/docs/tracking/branded-tracking-page/
  - Supports: S183 — branded tracking page UX patterns (customer comms + deflection) tied to shipping exceptions.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://docs.goshippo.com/docs/tracking/tracking/
  - Supports: S184 — tracking object model and tracking status fields (normalization + exception routing).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://docs.goshippo.com/docs/tracking/webhooks/
  - Supports: S185 — webhooks for tracking updates (event-driven notification and exception automation).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://docs.goshippo.com/docs/tracking/webhookdebugging/
  - Supports: S186 — webhook debugging/delivery troubleshooting patterns (retry visibility, investigation workflow).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.chargebee.com/docs/billing/2.0/customers/account-hierarchy
  - Supports: S187 — parent/child account hierarchy patterns (B2B billing accounts, consolidated invoicing).
  - Accessed: 2025-12-29
  - Confidence: Medium/High

- https://www.chargebee.com/docs/billing/2.0/invoices-credit-notes-and-quotes/quotes
  - Supports: S188 — quotes as a sales-assisted pricing and approval workflow (B2B procurement-friendly buying).
  - Accessed: 2025-12-29
  - Confidence: Medium/High

- https://www.chargebee.com/docs/billing/2.0/invoices-credit-notes-and-quotes/invoices
  - Supports: S189 — invoice lifecycle and fields (B2B invoice-based billing, downloads, statuses).
  - Accessed: 2025-12-29
  - Confidence: Medium/High

- https://www.chargebee.com/docs/billing/2.0/invoices-credit-notes-and-quotes/advance-invoices
  - Supports: S190 — advance invoices concept (invoice ahead of service period) for B2B contracting/procurement flows.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://docs.recurly.com/recurly-subscriptions/docs/accounts
  - Supports: S191 — account model patterns for subscription billing (B2B accounts, contacts, billing contexts).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://docs.recurly.com/recurly-subscriptions/docs/invoices
  - Supports: S192 — invoice lifecycle patterns and fields for billing admin surfaces.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.chargebee.com/docs/billing/2.0/entitlements/features-overview
  - Supports: S193 — entitlements/feature management patterns (seat and feature gating primitives for B2B subscriptions).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://developers.google.com/analytics/devguides/collection/ga4/reference/events
  - Supports: S194 — GA4 event taxonomy reference including promotion-related events; baseline for promotion attribution and funnels.
  - Accessed: 2025-12-29
  - Confidence: High

- https://github.com/growthbook/growthbook
  - Supports: S195 — A/B testing + feature flagging + experiment analysis patterns (holdouts, variants) for promotions measurement.
  - Accessed: 2025-12-29
  - Confidence: Medium/High

- https://cube.dev/docs/product/introduction
  - Supports: S196 — semantic layer and metrics modeling patterns for ROI/cohort dashboards with consistent definitions.
  - Accessed: 2025-12-29
  - Confidence: Medium/High

- https://www.getdbt.com/product/what-is-dbt
  - Supports: S197 — transformation workflows for building curated promo metrics tables and cohorts; common analytics pipeline pattern.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://posthog.com/docs/product-analytics/insights
  - Supports: S198 — product analytics “insights” patterns (funnels/trends) applicable to promotion conversion measurement.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://posthog.com/docs/data/cohorts
  - Supports: S198 — cohort definition patterns for measuring LTV/retention by promo exposure/redemption.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://snowplow.io/
  - Supports: S199 — event pipeline framing for analytics; useful as reference for instrumentation + tracking design (promos, checkout, redemption).
  - Accessed: 2025-12-29
  - Confidence: Low/Medium

- https://help.shopify.com/en/manual/fulfillment/fulfilling-orders/single-fulfillment
  - Supports: S10 — tracking number and carrier selection during fulfillment, and shipment notification basics.
  - Accessed: 2025-12-29
  - Confidence: High

- https://help.shopify.com/en/manual/fulfillment/managing-orders/order-status
  - Supports: S11 — order/fulfillment status concepts for building canonical internal states and queues.
  - Accessed: 2025-12-29
  - Confidence: High

- https://help.shopify.com/en/manual/fulfillment/fulfilling-orders/holding-fulfillments
  - Supports: S12 — explicit “hold fulfillment” and “release hold” operational workflow.
  - Accessed: 2025-12-29
  - Confidence: High

- https://help.shopify.com/en/manual/shopify-flow/reference/triggers/fulfillment-service-failed-to-complete-fulfillment
  - Supports: S13 — event trigger for fulfillment failures; supports exception alerting/task creation.
  - Accessed: 2025-12-29
  - Confidence: High

- https://www.aftership.com/docs/tracking/enum/delivery-statuses
  - Supports: S14 — canonical delivery statuses including Exception and Failed Attempt; supports normalized status model.
  - Accessed: 2025-12-29
  - Confidence: Medium/High

- https://support.aftership.com/en/tracking/article/notification-delivery-3isj87/
  - Supports: S15 — event-driven tracking notifications and supported notification triggers.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://docs.easypost.com/guides/tracking-guide
  - Supports: S16 — tracker updates model and tracking object concepts for webhook-driven pipelines.
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.easypost.com/docs/addresses
  - Supports: S17 — address verification and deliverability tooling concepts.
  - Accessed: 2025-12-29
  - Confidence: High

- https://support.easypost.com/hc/en-us/articles/360044528732-Webhooks-Events
  - Supports: S18 — webhook/event delivery mechanics for receiving shipment updates.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://help.17track.net/hc/en-us/articles/37471096573337-Understanding-Tracking-Status-Main-Status-Substatus
  - Supports: S19 — tracking status taxonomy patterns (main status + substatus) helpful for exception and messaging rules.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://help.shopify.com/en/manual/locations
  - Supports: S20 — locations as inventory + fulfillment contexts (warehouses, stores, apps as locations).
  - Accessed: 2025-12-29
  - Confidence: High

- https://help.shopify.com/en/manual/fulfillment/setup/locations/fulfillment
  - Supports: S21 — order routing rules + split across locations; assignment behavior when no single location can fulfill.
  - Accessed: 2025-12-29
  - Confidence: High

- https://help.shopify.com/en/manual/products/inventory/getting-started-with-inventory/multi-managed-inventory
  - Supports: S22 — inventory is tracked separately per location; assign locations to products/variants; fulfill based on priority/shipping profiles.
  - Accessed: 2025-12-29
  - Confidence: High

- https://help.shopify.com/en/manual/products/inventory/inventory-transfers/viewing-transfers
  - Supports: S23 — transfers list view (filters, columns) implying “transfer ops dashboard” feature patterns.
  - Accessed: 2025-12-29
  - Confidence: High

- https://help.shopify.com/en/manual/sell-in-person/shopify-pos/inventory-management/stocky/pos-inventory-management/receiving-transfers
  - Supports: S24 — receiving transfers with barcode scanner workflow (accept/reject, partial receive, finalize transfer).
  - Accessed: 2025-12-29
  - Confidence: High

- https://help.shopify.com/en/manual/products/inventory/managing-inventory-quantities/bulk-editing-inventory
  - Supports: S25 — bulk editor workflow for adjusting inventory quantities at scale.
  - Accessed: 2025-12-29
  - Confidence: High

- https://help.shopify.com/en/manual/products/inventory/getting-started-with-inventory/selling-when-out-of-stock
  - Supports: S26 — “continue selling when out of stock” and overselling considerations with multiple locations.
  - Accessed: 2025-12-29
  - Confidence: High

- https://help.shopify.com/en/manual/products/inventory/track_inventory
  - Supports: S27 — track inventory + option to continue selling when out of stock.
  - Accessed: 2025-12-29
  - Confidence: High

- https://help.shopify.com/en/manual/fulfillment/fulfilling-orders/single-fulfillment
  - Supports: S28 — split fulfillment and merge fulfillment workflows (line-item/quantity based) to handle partials/backorders.
  - Accessed: 2025-12-29
  - Confidence: High

- https://help.shopify.com/en/manual/fulfillment/setup/fulfillable-inventory
  - Supports: S29 — fulfillable inventory concept (customers can only buy inventory in locations that can ship to their zone).
  - Accessed: 2025-12-29
  - Confidence: High

- https://www.gorgias.com/help/macros
  - Supports: S30 — macros as a first-class support workflow primitive (templated responses + actions).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.gorgias.com/help/rules
  - Supports: S31 — automation rules structure (events/conditions/actions) for routing, tagging, and auto-replies.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.gorgias.com/help/auto-assign-tickets
  - Supports: S32 — auto-assignment patterns for ticket routing.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.chatwoot.com/hc/user-guide/articles/1677498548-how-to-create-and-use-canned-responses
  - Supports: S33 — canned responses (saved replies) workflow primitive.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.chatwoot.com/hc/user-guide/articles/1677705370-automation-rules
  - Supports: S34 — automation rules structure for inbox workflows (triggers/actions).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://developer.zendesk.com/documentation/ticketing/managing-tickets/about-sla-policies/
  - Supports: S35 — SLA policy concepts for ticketing and escalation tracking.
  - Accessed: 2025-12-29
  - Confidence: High

- https://developer.zendesk.com/documentation/ticketing/managing-tickets/using-views/
  - Supports: S36 — views/queues as first-class agent workflow primitives.
  - Accessed: 2025-12-29
  - Confidence: High

- https://www.gorgias.com/help/metrics-calculated
  - Supports: S37 — definitions of core support metrics (first response time, resolution time, etc.) as a feature universe reference.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.intercom.com/help/en/articles/10539231-teammate-performance-reporting
  - Supports: S38 — teammate performance metrics and reporting surface (volume, response times, etc.).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_satisfaction_ratings/
  - Supports: S39 — satisfaction rating objects and API shape (CSAT capture and reporting).
  - Accessed: 2025-12-29
  - Confidence: High

- https://support.zendesk.com/hc/en-us/articles/4408885665306-First-reply-time
  - Supports: S40 — first reply time metric definition and reporting recipe (agent performance KPI).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://help.maestroqa.com/en/articles/10578496-rubric
  - Supports: S41 — QA rubric/scorecard structure for support quality evaluation.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://help.shopify.com/en/manual/promoting-marketing/search
  - Supports: S42 — store search setup as self-serve discovery feature and deflection lever.
  - Accessed: 2025-12-29
  - Confidence: High

- https://help.shopify.com/en/manual/promoting-marketing/search/customize-search
  - Supports: S43 — search result customization as a self-serve UX lever (merchandising and deflection).
  - Accessed: 2025-12-29
  - Confidence: High

- https://help.shopify.com/en/manual/orders/status-tracking
  - Supports: S44 — customer order status tracking page concepts (where-is-my-order self-serve).
  - Accessed: 2025-12-29
  - Confidence: High

- https://help.shopify.com/en/manual/orders/status-tracking/customize-order-status
  - Supports: S45 — order status page customization (content + links for deflection).
  - Accessed: 2025-12-29
  - Confidence: High

- https://help.shopify.com/en/manual/customers/customer-accounts
  - Supports: S46 — customer accounts as a self-serve surface for orders/returns/address updates.
  - Accessed: 2025-12-29
  - Confidence: High

- https://www.aftership.com/track
  - Supports: S47 — customer-facing tracking page UX and deflection positioning (find shipment without contacting support).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.aftership.com/docs/tracking
  - Supports: S48 — tracking API concepts for customer tracking and integrations; supports event-driven status pages.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://docs.n8n.io/workflows/
  - Supports: S50 — workflow model: nodes, triggers, and step execution (automation primitives).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://docs.zapier.com/platform/build/trigger-and-action
  - Supports: S51 — trigger/action/search primitives model for automation platforms.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://help.shopify.com/en/manual/shopify-flow
  - Supports: S52 — Shopify Flow as a merchant automation surface; triggers/actions patterns.
  - Accessed: 2025-12-29
  - Confidence: Medium (site may block automated access)

- https://nodered.org/docs/user-guide/concepts
  - Supports: S53 — flow-based programming concepts (nodes, wires, messages) for automation builders.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.activepieces.com/docs/
  - Supports: S54 — “pieces” model and automation concepts for open-source automation tooling.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://docs.temporal.io/workflows
  - Supports: S55 — durable workflow concepts (retries, timers, long-running processes) useful for ops automation.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://help.shopify.com/en/manual/your-account/staff-accounts/staff-permissions
  - Supports: S56 — role/permission surfaces for merchant staff in an ecommerce admin (RBAC model).
  - Accessed: 2025-12-29
  - Confidence: Medium (site may block automated access)

- https://help.shopify.com/en/manual/your-account/account-security/two-step-authentication
  - Supports: S57 — 2FA as a standard admin security posture for staff accounts.
  - Accessed: 2025-12-29
  - Confidence: Medium (site may block automated access)

- https://developer.okta.com/docs/concepts/saml/
  - Supports: S58 — SAML concepts for SSO (IdP/SP, assertions) used in enterprise SSO.
  - Accessed: 2025-12-29
  - Confidence: High

- https://learn.microsoft.com/en-us/entra/identity/app-provisioning/user-provisioning
  - Supports: S59 — SCIM-style provisioning concepts (automated user lifecycle) for enterprise accounts.
  - Accessed: 2025-12-29
  - Confidence: High

- https://www.keycloak.org/documentation
  - Supports: S60 — Keycloak admin and realm management concepts for OSS SSO and identity workflows.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.openpolicyagent.org/docs/latest/
  - Supports: S61 — policy-as-code authorization concepts for centralized RBAC/ABAC evaluation.
  - Accessed: 2025-12-29
  - Confidence: High

- https://openfga.dev/docs
  - Supports: S62 — fine-grained authorization model and permission checks for multi-tenant apps.
  - Accessed: 2025-12-29
  - Confidence: High

- https://owasp.org/www-project-application-security-verification-standard/
  - Supports: S63 — baseline security requirements (useful for “security checklist” features and posture).
  - Accessed: 2025-12-29
  - Confidence: High

- https://stripe.com/docs/webhooks#verify-signatures
  - Supports: S64 — webhook signing and verification patterns for secure integrations.
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/audit-log
  - Supports: S65 — audit log event model and filtering patterns (admin audit surfaces).
  - Accessed: 2025-12-29
  - Confidence: High

- https://help.shopify.com/en/manual/sell-in-person/shopify-pos/inventory-management/stocky/purchase-orders
  - Supports: S66 — purchase order workflows (create PO, receive inventory) as a replenishment feature surface.
  - Accessed: 2025-12-29
  - Confidence: Medium (site may block automated access)

- https://help.shopify.com/en/manual/sell-in-person/shopify-pos/inventory-management/stocky/replenishment
  - Supports: S67 — replenishment concepts and workflows (reorder suggestions, lead times) in merchant ops tooling.
  - Accessed: 2025-12-29
  - Confidence: Medium (site may block automated access)

- https://www.odoo.com/documentation/17.0/applications/inventory_and_mrp/inventory/management/products/reordering_rules.html
  - Supports: S68 — reordering rules (min/max) pattern for replenishment automation.
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.erpnext.com/docs/user/manual/en/stock/stock-settings
  - Supports: S69 — reorder level and material request concepts (replenishment triggers) as workflow reference.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://docs.aws.amazon.com/forecast/latest/dg/what-is-forecast.html
  - Supports: S70 — demand forecasting service concepts (time-series forecasting, predictors) as reference for forecasting features.
  - Accessed: 2025-12-29
  - Confidence: High

- https://stripe.com/docs/billing
  - Supports: S71 — subscription billing concepts and feature surfaces (plans/products, invoices, proration, dunning).
  - Accessed: 2025-12-29
  - Confidence: High

- https://stripe.com/docs/billing/invoices
  - Supports: S72 — invoice lifecycle concepts and fields relevant to admin UIs.
  - Accessed: 2025-12-29
  - Confidence: High

- https://stripe.com/docs/billing/subscriptions/prorations
  - Supports: S73 — proration behavior concepts for plan changes and mid-cycle adjustments.
  - Accessed: 2025-12-29
  - Confidence: High

- https://stripe.com/docs/billing/customer/tax-ids
  - Supports: S74 — customer tax ID concepts and admin workflows.
  - Accessed: 2025-12-29
  - Confidence: High

- https://developer.paddle.com/
  - Supports: S75 — billing ops concepts for subscription lifecycle (vendor perspective); exact subpage references TBD.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.chargebee.com/docs/
  - Supports: S76 — billing ops concepts for subscription changes/proration and invoicing (vendor perspective); exact subpage references TBD.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://developer.paddle.com/subscriptions/overview
  - Supports: S75 — subscription lifecycle concepts in a MoR billing platform (overview).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.chargebee.com/docs/2.0/subscriptions.html
  - Supports: S76 — subscription lifecycle + changes/proration concepts (selected reference).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://stripe.com/docs/radar
  - Supports: S77 — fraud prevention features (rules, risk evaluation) and admin surfaces.
  - Accessed: 2025-12-29
  - Confidence: High

- https://stripe.com/docs/disputes
  - Supports: S78 — disputes/chargebacks lifecycle concepts (evidence, deadlines, outcomes).
  - Accessed: 2025-12-29
  - Confidence: High

- https://stripe.com/docs/disputes/categories
  - Supports: S79 — dispute categories and evidence patterns (what to submit, how it’s evaluated).
  - Accessed: 2025-12-29
  - Confidence: High

- https://help.shopify.com/en/manual/orders/manage-orders/fraud-analysis
  - Supports: S80 — fraud analysis surface in ecommerce admin (risk indicators and recommended actions).
  - Accessed: 2025-12-29
  - Confidence: Medium (site may block automated access)

- https://usa.visa.com/support/consumer/chargebacks.html
  - Supports: S81 — high-level chargeback concepts and consumer/bank framing (reason codes and dispute flows context).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://stripe.com/docs/revenue-recognition/metrics#mrr
  - Supports: S82 — MRR definition and metric framing in billing context.
  - Accessed: 2025-12-29
  - Confidence: High

- https://stripe.com/docs/billing/subscriptions/metrics
  - Supports: S83 — subscription metrics concepts (retention/churn) in billing context.
  - Accessed: 2025-12-29
  - Confidence: High

- https://baremetrics.com/academy/saas-metrics
  - Supports: S84 — SaaS metric definitions and relationships (MRR, churn, LTV) as vocabulary reference.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://recurly.com/resources/learn/saas-metrics/
  - Supports: S85 — subscription metrics definitions and interpretations (MRR, churn, etc.).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://openmetrics.io/
  - Supports: S86 — metric naming and exposition conventions; helpful for defining finance metric instrumentation.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://stripe.com/docs/webhooks
  - Supports: S87 — webhook event delivery concepts, signing, retries; integration admin patterns.
  - Accessed: 2025-12-29
  - Confidence: High

- https://segment.com/docs/connections/sources/
  - Supports: S88 — “sources and destinations” integration hub model and configuration surfaces.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-rest/2024-10/resources/webhook
  - Supports: S89 — webhook resource concepts in Shopify Admin API (events and subscriptions).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://shopify.dev/docs/api/usage/bulk-operations
  - Supports: S90 — bulk data operations patterns (export/import) for large datasets.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://docs.airbyte.com/
  - Supports: S91 — ELT connectors model and operational patterns (sync jobs, errors).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://docs.meltano.com/
  - Supports: S92 — plugin-based ELT model and orchestration surfaces.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://docs.svix.com/
  - Supports: S93 — webhook delivery model (retries, delivery attempts, endpoint health) for integration admin UX.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://help.shopify.com/en/manual/sell-in-person/hardware/barcode-scanners
  - Supports: S94 — barcode scanner hardware and usage patterns for Shopify POS (warehouse/retail scanning).
  - Accessed: 2025-12-29
  - Confidence: Medium (site may block automated access)

- https://help.shopify.com/en/manual/sell-in-person/shopify-pos/inventory-management/stocky/pos-inventory-management/receiving-transfers
  - Supports: S95 — receiving transfers workflow with barcode scanner (scan/receive/finalize).
  - Accessed: 2025-12-29
  - Confidence: High

- https://developer.apple.com/documentation/usernotifications
  - Supports: S96 — push notification concepts for mobile operational alerts.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://firebase.google.com/docs/cloud-messaging
  - Supports: S97 — push notification delivery concepts and device token management (FCM).
  - Accessed: 2025-12-29
  - Confidence: High

- https://docs.expo.dev/guides/offline-support/
  - Supports: S98 — offline support and data persistence patterns in mobile apps (sync when online).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://reactnative.dev/docs/0.74/asyncstorage
  - Supports: S99 — offline persistence pattern (local storage) for mobile apps.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://developers.google.com/ml-kit/vision/barcode-scanning
  - Supports: barcode scanning primitives for mobile ops; non-OSS reference (used in oss-catalog note).
  - Accessed: 2025-12-29
  - Confidence: High

- https://asana.com/guide/help/tasks/basics
  - Supports: S101 — task objects, assignees, due dates, and status patterns.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://support.atlassian.com/jira-software-cloud/docs/what-is-a-jira-workflow/
  - Supports: S102 — workflow/state transition concepts for tasks/approvals and playbooks.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.notion.so/help/guides/introducing-database-properties
  - Supports: S103 — lightweight schema for task tables (properties) as a reference for flexible task fields.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues
  - Supports: S104 — issue/work item model patterns (labels, assignees, states).
  - Accessed: 2025-12-29
  - Confidence: High

- https://slack.com/help/articles/360035692513-Guide-to-Workflow-Builder
  - Supports: S105 — workflow builder patterns for approvals and routing via messaging.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://help.shopify.com/en/manual/payments/shopify-payments/multi-currency
  - Supports: S106 — multi-currency selling and currency presentation concepts in ecommerce admin.
  - Accessed: 2025-12-29
  - Confidence: Medium (site may block automated access)

- https://help.shopify.com/en/manual/international
  - Supports: S107 — Shopify Markets and international selling concepts (regions, currencies, languages).
  - Accessed: 2025-12-29
  - Confidence: Medium (site may block automated access)

- https://cldr.unicode.org/
  - Supports: S108 — locale data source for currency symbols, number/date formats, and language names.
  - Accessed: 2025-12-29
  - Confidence: High

- https://unicode-org.github.io/icu/userguide/
  - Supports: S109 — ICU concepts and formatting behavior for i18n/l10n (dates/numbers/currencies).
  - Accessed: 2025-12-29
  - Confidence: High

- https://formatjs.io/docs/
  - Supports: S110 — message formatting, pluralization, and locale formatting patterns for UI.
  - Accessed: 2025-12-29
  - Confidence: High

- https://www.i18next.com/
  - Supports: S111 — translation runtime concepts (language detection, namespaces) for localization systems.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://dinerojs.com/
  - Supports: S112 — money calculation primitives and rounding for multi-currency pricing.
  - Accessed: 2025-12-29
  - Confidence: Medium

## Observability (logs, tracing, alerts, SLOs)

- https://opentelemetry.io/docs/
  - Supports: S113 — OpenTelemetry overview (metrics, logs, traces) for instrumentation and collection patterns.
  - Accessed: 2025-12-29
  - Confidence: High

- https://opentelemetry.io/docs/specs/semconv/
  - Supports: S114 — semantic conventions for consistent attribute naming (enables cross-service filtering and correlation).
  - Accessed: 2025-12-29
  - Confidence: Medium/High

- https://prometheus.io/docs/introduction/overview/
  - Supports: S115 — Prometheus model for scraping metrics, querying, and alerting concepts.
  - Accessed: 2025-12-29
  - Confidence: High

- https://prometheus.io/docs/alerting/latest/alertmanager/
  - Supports: S116 — Alertmanager routing, grouping, silences, and notifications for on-call workflows.
  - Accessed: 2025-12-29
  - Confidence: High

- https://grafana.com/docs/loki/latest/
  - Supports: S117 — log aggregation/search patterns (labels, queries) and operational logging workflows.
  - Accessed: 2025-12-29
  - Confidence: Medium/High

- https://grafana.com/docs/tempo/latest/
  - Supports: S118 — tracing storage/query and trace-view patterns (adjacent to distributed tracing UX).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.jaegertracing.io/docs/
  - Supports: S119 — distributed tracing concepts and trace visualization UX (spans, dependencies).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://docs.sentry.io/
  - Supports: S120 — error tracking concepts (issue grouping, stack traces) and remediation workflows.
  - Accessed: 2025-12-29
  - Confidence: Medium/High

- https://docs.datadoghq.com/service_management/service_level_objectives/
  - Supports: S121 — SLO concepts and dashboards (targets, burn rate, error budget framing).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.pagerduty.com/resources/learn/what-is-incident-management/
  - Supports: S122 — incident management lifecycle concepts (detection → response → resolution → postmortem).
  - Accessed: 2025-12-29
  - Confidence: Medium

## Admin IA (navigation, search, saved views, shortcuts)

- https://www.notion.so/help/views-filters-and-sorts
  - Supports: S123 — saved views with filters and sorts as an admin usability primitive (reused concept for “saved views” in ops UIs).
  - Accessed: 2025-12-29
  - Confidence: Medium/High

- https://www.notion.so/help/search
  - Supports: S124 — global search UX patterns (scope, filters) for large workspaces.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.notion.so/help/keyboard-shortcuts
  - Supports: S125 — keyboard shortcuts as a first-class power-user surface for admin/operator workflows.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://linear.app/docs/search
  - Supports: S126 — search UX patterns (quick find, structured query) used in modern admin tools.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://support.atlassian.com/jira-software-cloud/docs/use-advanced-search-with-jira-query-language-jql/
  - Supports: S127 — advanced search language patterns (query builder / power users) that map to admin filtering.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://docs.github.com/en/search-github/getting-started-with-searching-on-github/about-searching-on-github
  - Supports: S128 — search syntax, qualifiers, and scoping concepts (good model for admin “power search”).
  - Accessed: 2025-12-29
  - Confidence: High

- https://www.fusejs.io/
  - Supports: S129 — fuzzy search concepts for client-side quick find (useful for command palettes and small datasets).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://help.shopify.com/en/manual/shopify-admin/search
  - Supports: Shopify Admin search UX; evidence for admin global search in ecommerce tooling (blocked by automated access; still a valid reference URL).
  - Accessed: 2025-12-29
  - Confidence: Medium (blocked_evidence: HTTP 403 via curl)

## Data governance (data retention, exports, privacy requests)

- https://eur-lex.europa.eu/eli/reg/2016/679/oj
  - Supports: S130 — GDPR legal basis for data governance (rights, storage limitation, data subject requests).
  - Accessed: 2025-12-29
  - Confidence: High

- https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-of-access/
  - Supports: S131 — subject access request (SAR) guidance patterns (request handling, timelines) for admin DSAR workflows.
  - Accessed: 2025-12-29
  - Confidence: Medium (blocked_evidence: HTTP 405 for HEAD; GET allowed)

- https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-erasure/
  - Supports: S132 — erasure (“right to be forgotten”) guidance patterns; supports deletion/anonymization workflows.
  - Accessed: 2025-12-29
  - Confidence: Medium (blocked_evidence: HTTP 405 for HEAD; GET allowed)

- https://oag.ca.gov/privacy/ccpa
  - Supports: S133 — CCPA overview and consumer rights framing; supports privacy request intake and reporting.
  - Accessed: 2025-12-29
  - Confidence: Medium/High

- https://www.nist.gov/privacy-framework
  - Supports: S134 — NIST Privacy Framework concepts for privacy risk management and governance controls.
  - Accessed: 2025-12-29
  - Confidence: Medium/High

- https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html
  - Supports: S135 — retention via lifecycle policies (expiry, transitions) as a reference for “retention rules” UX.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html
  - Supports: S136 — legal hold / immutability patterns (object lock) useful for “legal hold” and audit preservation concepts.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html
  - Supports: S137 — audit logging and event history concepts (who did what, when) for governance/audit log surfaces.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.iso.org/standard/27001
  - Supports: ISO/ISMS framing as an evidence pointer for governance/compliance requirements (high-level).
  - Accessed: 2025-12-29
  - Confidence: Low/Medium

## Merchandising rules (search tuning, boosts, synonyms)

- https://www.algolia.com/doc/guides/managing-results/rules
  - Supports: S138 — merchandising rules/curation patterns (pin, hide, promote) for search results.
  - Accessed: 2025-12-29
  - Confidence: Medium (site uses redirects; content may be JS-heavy)

- https://www.algolia.com/doc/guides/managing-results/synonyms
  - Supports: S139 — synonyms management patterns for search relevance and matching.
  - Accessed: 2025-12-29
  - Confidence: Medium (site uses redirects; content may be JS-heavy)

- https://www.algolia.com/doc/guides/managing-results/ranking
  - Supports: S140 — relevance/ranking tuning concepts (ordering signals) for ecommerce search.
  - Accessed: 2025-12-29
  - Confidence: Medium (site uses redirects; content may be JS-heavy)

- https://typesense.org/docs/latest/api/search.html
  - Supports: S141 — search API parameters and relevance tuning surface area (filters, sort, facets).
  - Accessed: 2025-12-29
  - Confidence: Medium/High

- https://typesense.org/docs/latest/api/synonyms.html
  - Supports: S142 — synonyms management primitives as a reference for admin “synonyms” UI.
  - Accessed: 2025-12-29
  - Confidence: Medium/High

- https://typesense.org/docs/latest/api/curation.html
  - Supports: S143 — curation/override rules primitives (pin/promote) as a reference for “merchandising rules”.
  - Accessed: 2025-12-29
  - Confidence: Medium/High

- https://www.meilisearch.com/docs/learn/configuration/synonyms
  - Supports: S144 — synonyms configuration patterns (dictionary-like setting) for relevance tuning.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://docs.opensearch.org/latest/
  - Supports: S145 — OpenSearch search and relevance ecosystem as a reference for configurable search stacks.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://www.elastic.co/docs/reference/elasticsearch/rest-apis/search-suggesters
  - Supports: S146 — suggestion/autocomplete primitives (suggesters) for typeahead UX.
  - Accessed: 2025-12-29
  - Confidence: Medium

## Catalog governance (product QA, bulk edits, versioning)

- https://help.shopify.com/en/manual/products/bulk-edit-products-variants
  - Supports: Shopify bulk editor patterns for batch changes to products/variants (blocked by automated access; still a relevant evidence URL).
  - Accessed: 2025-12-29
  - Confidence: Medium (blocked_evidence: HTTP 403 via curl)

- https://help.shopify.com/en/manual/products/import-export/using-csv
  - Supports: Shopify CSV import/export patterns (blocked by automated access; still a relevant evidence URL).
  - Accessed: 2025-12-29
  - Confidence: Medium (blocked_evidence: HTTP 403 via curl)

- https://help.shopify.com/en/manual/products/details/product-status
  - Supports: Shopify product status/publishing lifecycle patterns (blocked by automated access; still a relevant evidence URL).
  - Accessed: 2025-12-29
  - Confidence: Medium (blocked_evidence: HTTP 403 via curl)

- https://help.shopify.com/en/manual/products/details/product-organization
  - Supports: Shopify product taxonomy/organization surfaces (product type, vendor, collections) (blocked by automated access; still a relevant evidence URL).
  - Accessed: 2025-12-29
  - Confidence: Medium (blocked_evidence: HTTP 403 via curl)

- https://shopify.dev/docs/api/admin-graphql/latest/objects/Product
  - Supports: S147 — product object fields and data model primitives used in admin/catalog systems.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/enums/ProductStatus
  - Supports: S148 — product status enum as a reference for catalog lifecycle and governance transitions.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://experienceleague.adobe.com/en/docs/commerce-admin/systems/data-transfer/import/data-import
  - Supports: S149 — import/data-transfer workflows (validation, mapping, and operational import surfaces) in a commerce admin.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://support.bigcommerce.com/s/article/Exporting-Products?language=en_US
  - Supports: S150 — product export workflows as a baseline for “export center” and operational catalog extraction.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://schema.org/Product
  - Supports: S151 — canonical product schema fields; useful for completeness checks and attribute governance concepts.
  - Accessed: 2025-12-29
  - Confidence: Medium/High

- https://www.gs1.org/standards/id-keys/gtin
  - Supports: GTIN/barcode governance concept pointer (blocked by automated access; still relevant for catalog QA in retail contexts).
  - Accessed: 2025-12-29
  - Confidence: Low/Medium (blocked_evidence: HTTP 403 via curl)

## Promotions admin (coupons, discounts, eligibility)

- https://help.shopify.com/en/manual/discounts
  - Supports: Shopify discounts concepts and admin surfaces (blocked by automated access; still a relevant evidence URL).
  - Accessed: 2025-12-29
  - Confidence: Medium (blocked_evidence: HTTP 403 via curl)

- https://shopify.dev/docs/api/admin-graphql/latest/objects/DiscountCodeNode
  - Supports: S152 — discount code object model for admin tooling (codes, usage, status).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/objects/DiscountAutomaticBasic
  - Supports: S153 — automatic discount object model (no code required) for eligibility-based promotions.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/mutations/discountCodeBasicCreate
  - Supports: S154 — mutation for creating discount codes; supports “create/publish discount” workflow mapping.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/mutations/discountAutomaticBasicCreate
  - Supports: S155 — mutation for creating automatic discounts; supports “rules-based discount” workflow mapping.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://woocommerce.com/document/coupon-management/
  - Supports: S156 — coupon management features and restrictions UI patterns (usage limits, product/category restrictions).
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://docs.stripe.com/api/coupons
  - Supports: S157 — coupon object model (percent/amount_off, duration, max_redemptions) for promotions primitives.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://docs.stripe.com/api/promotion_codes
  - Supports: S158 — promotion codes as user-facing codes linked to coupons; supports code lifecycle and redemption controls.
  - Accessed: 2025-12-29
  - Confidence: Medium

- https://docs.stripe.com/billing/subscriptions/discounts
  - Supports: S159 — applying discounts in billing contexts; useful for discount lifecycle + reporting patterns.
  - Accessed: 2025-12-29
  - Confidence: Medium (may be JS-heavy)


## “Awesome lists” / directories (fast discovery)

- (none used yet in tranche #1)

## Shopify Admin API primitives (returns/refunds/store credit)

- https://shopify.dev/docs/api/admin-graphql/latest/mutations/refundCreate
  - Supports: S200 — creating refunds (partial/line-item) as a Shopify source-of-truth action.
  - Accessed: 2025-12-30
  - Confidence: Medium/High

- https://shopify.dev/docs/api/admin-graphql/latest/mutations/giftCardCreate
  - Supports: S201 — creating gift cards (usable as “store credit” primitive where policy allows).
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/objects/Return
  - Supports: S202 — canonical Returns object model (states/fields) for building returns admin tooling against Shopify primitives.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/mutations/returnCreate
  - Supports: S202 — creating returns as a Shopify source-of-truth action (app-driven return initiation).
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/objects/Fulfillment
  - Supports: S203 — fulfillment/shipment object model (tracking info + shipment context) for shipping exception tooling.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/objects/FulfillmentOrder
  - Supports: S204 — fulfillment-order primitives for multi-location fulfillment planning and shipment lifecycle linkage.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/mutations/fulfillmentCreateV2
  - Supports: S205 — create fulfillment + attach tracking programmatically (foundation for “tracking edit/import” flows).
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/queries/webhookSubscriptions
  - Supports: S206 — list/query webhook subscriptions (admin tooling for delivery diagnostics).
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/objects/WebhookSubscription
  - Supports: S206 — webhook subscription object fields (status, endpoint) for webhook delivery observability surfaces.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/objects/FulfillmentHold
  - Supports: S207 — hold object model for “hold/unhold” operational workflows (reason + notes).
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/mutations/fulfillmentOrderHold
  - Supports: S208 — place a fulfillment hold via API (exception gating).
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/mutations/fulfillmentOrderReleaseHold
  - Supports: S209 — release a fulfillment hold via API (resume operations).
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/queries/orders
  - Supports: S210 — order querying primitive (join support ↔ orders ↔ shipping for analytics and drilldowns).
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/queries/ordersCount
  - Supports: S210 — order counting primitive (baseline KPI denominators; trend sanity checks).
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/mutations/bulkOperationRunQuery
  - Supports: S211 — bulk export pattern for building a warehouse copy of Shopify data for custom analytics.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/objects/BulkOperation
  - Supports: S211 — bulk operation status/progress fields used to track export jobs (success/failure, URL retrieval patterns).
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/objects/StaffMember
  - Supports: S212 — staff member object fields (who is a staff user) for “staff directory” style admin experiences.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/queries/staffMembers
  - Supports: S212 — listing staff members (inventory for access management workflows and reporting).
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/objects/AppInstallation
  - Supports: S213 — app installation context primitives (installed app identity) used for integration posture and permissions introspection.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/objects/AccessScope
  - Supports: S213 — access scopes model (what an app is allowed to do) useful for “integration security posture” surfaces.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/queries/appInstallation
  - Supports: S213 — query installed app context to show granted scopes and app identity.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/queries/events
  - Supports: S214 — events feed query for building an “activity feed” or ingesting admin events into our audit log pipeline (as input; not a substitute for our app audit log).
  - Accessed: 2025-12-30
  - Confidence: Medium

## Observability stack (OSS / hosted primitives)

- https://opentelemetry.io/docs/collector/
  - Supports: S215 — OpenTelemetry Collector as a standard collection/processing pipeline for logs/metrics/traces.
  - Accessed: 2025-12-30
  - Confidence: High

- https://opentelemetry.io/docs/what-is-opentelemetry/
  - Supports: S216 — OpenTelemetry overview for “instrument once” posture across telemetry types.
  - Accessed: 2025-12-30
  - Confidence: High

- https://opentelemetry.io/docs/specs/otel/metrics/data-model/
  - Supports: S217 — metrics data model primitives and semantics for consistent metric governance.
  - Accessed: 2025-12-30
  - Confidence: Medium/High

- https://grafana.com/docs/grafana/latest/
  - Supports: S218 — dashboards/exploration UI patterns (golden signals, saved queries, annotations).
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://prometheus.io/docs/introduction/overview/
  - Supports: S219 — Prometheus metrics model and querying concepts used for alerts and dashboards.
  - Accessed: 2025-12-30
  - Confidence: High

- https://sentry.io/welcome/
  - Supports: S220 — error tracking inbox/triage workflow reference for issue grouping and assignment.
  - Accessed: 2025-12-30
  - Confidence: Medium

## Shopify finance primitives (Shopify Payments + transactions)

- https://shopify.dev/docs/api/admin-graphql/latest/queries/shopifyPaymentsAccount
  - Supports: S250 — entry point for Shopify Payments finance primitives (payouts, disputes, and balance/transactions) for finance analytics and reconciliation tooling.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/objects/ShopifyPaymentsAccount
  - Supports: S251 — Shopify Payments account object model (account/config fields used for finance dashboards and eligibility checks).
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/objects/ShopifyPaymentsBalanceTransaction
  - Supports: S252 — balance transaction feed primitives (fees/adjustments) useful for net revenue and payout reconciliation workflows.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/objects/OrderTransaction
  - Supports: S253 — order transaction primitives (payments/captures/refunds) used for a normalized transaction ledger.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/objects/ShopifyPaymentsDispute
  - Supports: S254 — dispute/chargeback object model primitives for dispute inboxes, status tracking, and outcomes analytics.
  - Accessed: 2025-12-30
  - Confidence: Medium

## Shopify app billing primitives (subscriptions + one-time + usage)

- https://shopify.dev/docs/apps/launch/billing
  - Supports: S255 — app billing overview (concepts, billing flows, and platform expectations for charging merchants via Shopify).
  - Accessed: 2025-12-30
  - Confidence: Medium/High

- https://shopify.dev/docs/api/admin-graphql/latest/mutations/appSubscriptionCreate
  - Supports: S256 — create recurring app subscription charges (paid plans / upgrades) as a Shopify billing primitive.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/mutations/appSubscriptionCancel
  - Supports: S257 — cancel recurring app subscriptions (plan cancellation primitive).
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/mutations/appPurchaseOneTimeCreate
  - Supports: S258 — one-time app charge primitive (setup fees, add-ons) for billing admin flows.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/mutations/appUsageRecordCreate
  - Supports: S259 — usage record primitive (metered billing) used for usage-based plans and billing audits.
  - Accessed: 2025-12-30
  - Confidence: Medium

## Shopify inventory primitives (locations + inventory items/levels + adjustments)

- https://shopify.dev/docs/api/admin-graphql/latest/objects/Location
  - Supports: S260 — location object model (inventory + fulfillment routing node) used for multi-location inventory operations.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/queries/locations
  - Supports: S261 — listing locations (needed for inventory exceptions dashboards and routing configuration).
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/objects/InventoryItem
  - Supports: S262 — inventory item object model (per-SKU inventory identity) used for adjustments and availability tooling.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/objects/InventoryLevel
  - Supports: S263 — inventory level object model (quantity at a location) used for cycle counts and mismatch detection.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/mutations/inventoryAdjustQuantity
  - Supports: S264 — inventory adjustment primitive (increment/decrement) backing exception resolution and cycle counts.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/mutations/inventorySetOnHandQuantities
  - Supports: S265 — setting on-hand quantities primitive (authoritative counts) backing cycle count submission flows.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/mutations/inventoryActivate
  - Supports: S266 — activate inventory at a location (enables multi-location inventory operations and routability).
  - Accessed: 2025-12-30
  - Confidence: Medium

## Fraud/risk add-ons (IDV)

- https://docs.stripe.com/identity
  - Supports: S267 — ID verification primitives as an optional gated integration for high-risk flows (returns/refunds/fraud review).
  - Accessed: 2025-12-30
  - Confidence: Medium/High

## Shopify subscription primitives (contracts + billing attempts)

- https://shopify.dev/docs/api/admin-graphql/latest/objects/SubscriptionContract
  - Supports: S221 — canonical subscription contract object model for subscription ops and portal features.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/queries/subscriptionContracts
  - Supports: S222 — listing and filtering subscription contracts to build admin queues/segments and portal lookups.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/mutations/subscriptionContractUpdate
  - Supports: S223 — updating subscription contracts (core primitive for pause/resume/cadence/address-like changes depending on fields supported).
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/mutations/subscriptionContractCancel
  - Supports: S224 — cancel subscription contract primitive (cancellation flow backing).
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/objects/SubscriptionBillingAttempt
  - Supports: S225 — billing attempt object model (attempt status, error metadata) for “payment failure queue”.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/queries/subscriptionBillingAttempts
  - Supports: S226 — query billing attempts to build recovery queues and reporting.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/objects/SubscriptionDraft
  - Supports: S227 — staged change object model for “edit upcoming order” style flows.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/mutations/subscriptionDraftUpdate
  - Supports: S227 — update staged subscription changes before committing.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/mutations/subscriptionDraftCommit
  - Supports: S227 — commit staged subscription changes as a controlled write path.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/apps/build/purchase-options/subscriptions
  - Supports: S228 — Shopify subscription apps model and conceptual framing for purchase options/subscriptions.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/apps/build/purchase-options/subscriptions/contracts
  - Supports: S228 — contracts concept framing; useful when mapping app-driven portal actions to contract primitives.
  - Accessed: 2025-12-30
  - Confidence: Medium

## Job queues / schedulers (OSS primitives)

- https://docs.bullmq.io/
  - Supports: S229 — durable job queue primitives (delayed jobs, retries, rate limits) for reminders/escalations and background ops tasks.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://www.quartz-scheduler.org/documentation/
  - Supports: S230 — scheduler primitives (job/trigger model) as a baseline pattern for time-based escalations and reminders.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/objects/OrderRisk
  - Supports: S231 — order risk model fields for risk-aware ops workflows (fraud/risk signals usable in gating policies).
  - Accessed: 2025-12-30
  - Confidence: Medium

## Admin IA building blocks (OSS)

- https://marmelab.com/react-admin/
  - Supports: S232 — admin app scaffolding patterns (lists, filters, resources) for rapid internal tooling UIs.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://refine.dev/docs/
  - Supports: S233 — headless admin patterns (data providers, resources, routing) for building admin/operator UIs.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://github.com/TanStack/table
  - Supports: S234 — table UX primitives (sorting, filtering, pagination, row selection) needed for queues and bulk actions.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://github.com/dip/cmdk
  - Supports: S235 — command palette UI pattern for keyboard-first navigation/actions in admin tools.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://github.com/timc1/kbar
  - Supports: S236 — command palette/actions model (search + results) as an alternative implementation reference.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://www.meilisearch.com/docs
  - Supports: S237 — search indexing and query primitives for building global admin search across entities.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://typesense.org/docs/
  - Supports: S238 — fast fuzzy search primitives for global search and typeahead experiences.
  - Accessed: 2025-12-30
  - Confidence: Medium

## Search / merchandising building blocks (index + relevance)

- https://shopify.dev/docs/api/admin-graphql/latest/objects/Product
  - Supports: S239 — product object model fields for building an external search index and merchandising attributes.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/queries/products
  - Supports: S239 — product feed querying for sync/indexing pipelines (incremental indexing foundations).
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/objects/Collection
  - Supports: S240 — collections as merchandising groupings used for curated browse and search scoping.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/queries/collections
  - Supports: S240 — listing collections for merchandising/navigation and for search scoping.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/objects/Metafield
  - Supports: S241 — custom attributes used as ranking signals and facet fields (e.g., margin, freshness, merch tags).
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://www.algolia.com/doc/guides/managing-results/must-do/search-ui-and-ux/
  - Supports: S242 — merchandising/search UX patterns (synonyms, rules/curation, relevance tuning surfaces).
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://www.elastic.co/docs/get-started
  - Supports: S243 — search engine baseline (indexing + querying) for teams choosing to run their own relevance stack.
  - Accessed: 2025-12-30
  - Confidence: Medium

## Catalog mutation primitives (Shopify)

- https://shopify.dev/docs/api/admin-graphql/latest/mutations/productCreate
  - Supports: S244 — create products in Shopify (catalog CRUD).
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/mutations/productUpdate
  - Supports: S244 — update products in Shopify (catalog CRUD + governance workflows).
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/mutations/productDelete
  - Supports: S244 — delete products in Shopify (governed/destructive operations).
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/mutations/productSet
  - Supports: S244 — set product fields via mutation (batch-like patterns for catalog edits).
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/mutations/productVariantsBulkCreate
  - Supports: S245 — bulk variant creation primitive for catalog operations at scale.
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/mutations/metafieldsSet
  - Supports: S246 — set metafields in bulk (attribute governance + completeness rules).
  - Accessed: 2025-12-30
  - Confidence: Medium

## Promotions primitives (Shopify)

- https://shopify.dev/docs/api/admin-graphql/latest/queries/discountNodes
  - Supports: S247 — list discount nodes (promo list view, status filters, and search surfaces).
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/queries/discountCodesCount
  - Supports: S247 — count codes (inventory sizing for promo ops and pagination baselines).
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/admin-graphql/latest/queries/discountNodesCount
  - Supports: S247 — count discount nodes (promo list baselines and reporting denominators).
  - Accessed: 2025-12-30
  - Confidence: Medium

## Mobile + POS surfaces (evidence pointers)

- https://docs.expo.dev/versions/latest/sdk/notifications/
  - Supports: S248 — mobile push notifications integration patterns for operational alerts (Expo).
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://shopify.dev/docs/api/pos-ui-extensions/latest
  - Supports: S249 — Shopify POS UI Extensions surface (embedded POS experiences; useful if we choose to extend POS rather than build a standalone warehouse app).
  - Accessed: 2025-12-30
  - Confidence: Medium
