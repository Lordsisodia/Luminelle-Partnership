Title: Shopify Developer Platform — Capabilities and Build Blueprint
Date: 2025-12-06

Executive Summary
- Shopify provides a mature, extensible commerce platform with multiple developer surfaces: Admin & Storefront APIs, UI extensions (Checkout, Admin, POS, Customer Accounts), Theme App Extensions, Web Pixels, App Proxy, and Shopify Functions (server-side logic running on Shopify infra).
- For a full‑stack app listed on the Shopify App Store, you’ll implement: OAuth + sessioning, embedded Admin UI, billing, webhook/event processing, data modeling (metafields/metaobjects and your DB), background jobs/sync, and one or more extensions (Theme, Checkout UI, Admin UI, etc.).
- This document inventories the platform, maps Shopify vs. app responsibilities, and provides a practical blueprint and checklists to get to a review‑ready app.

Platform Surfaces (What Shopify Offers)
1) Core APIs
   - Admin GraphQL API: Primary surface for managing catalog, orders, customers, inventory, discounts, B2B/Markets, files, metafields/metaobjects, translations, etc. Quarterly versioned; REST Admin exists but new features land on GraphQL first.
   - Storefront GraphQL API: Customer auth, product/collection retrieval, carts, checkout, localization — used by any headless storefront and by Hydrogen.
   - Customer Account API: APIs specific to the new Customer Accounts experience (auth/session, profile, order history) for apps extending that surface.
   - Webhooks: Event notifications for products, orders, customers, app lifecycle, and GDPR topics; delivered over HTTPS or Amazon EventBridge. HMAC verification required.
   - Bulk Operations: Async GraphQL import/export for large datasets.
   - Data modeling primitives: Metafields (typed fields on resources) and Metaobjects (structured, reusable content types) with Admin access and merchant‑facing editors.

2) UI & Experience Extensions
   - Checkout UI Extensions: Add UX at checkout, order status, and post‑purchase; often paired with Functions for logic (discounts, validations, delivery/payment customization).
   - Admin UI Extensions: Admin Blocks, Actions, and Links to surface context‑aware tools directly in Shopify Admin.
   - Customer Accounts UI Extensions: Extend the new customer account portal with pages/blocks.
   - POS UI Extensions: Embed app experiences into Shopify POS for retail workflows.
   - Theme App Extensions: Ship Online Store blocks/sections without modifying theme code directly; render app content in Liquid themes via the Theme Editor.
   - Web Pixels: Register consent‑aware tracking/measurement code; integrates with Shopify’s privacy system.
   - App Proxy: Serve storefront pages under the shop domain (e.g., `/apps/your-app`) from your backend, with signed requests.
   - Shop Minis (program‑based availability): Build experiences inside the consumer Shop app.

3) Server‑Side Logic on Shopify (Shopify Functions)
   - Functions are Wasm modules deployed with your app and executed by Shopify at specific decision points.
   - Common function surfaces: Discounts; Cart/Checkout Validations; Cart Transform; Delivery Customizations; Payment Customizations; (and other commerce routing/customization hook points as available).

4) Headless Storefront
   - Hydrogen (React/Remix) framework using the Storefront API; deploy on Oxygen (Shopify’s edge hosting). Headless builds still benefit from Checkout Extensibility for payments and post‑purchase.

5) Tooling & UX
   - Shopify CLI: Scaffold apps and extensions, run local dev, deploy to a dev store.
   - App Bridge: Client SDK for embedded apps (Admin integration, session tokens, navigation, modals).
   - Polaris: React component library and UX guidelines matching Admin.
   - Versioning: Quarterly API versions (e.g., 2025‑10 is current stable as of the date above; an unstable/next may exist). Plan to adopt deprecations quarterly.

Distribution, Billing, and Programs
- App types: Public (listed/unlisted), Custom (single‑merchant), and specialized types (e.g., sales channels, payments). App Review policies govern listing.
- Built for Shopify (BFS) program: quality and UX standards; passing raises store ranking and installs.
- Billing: App Billing API supports subscriptions, one‑time, and usage pricing; “managed app pricing” is available for qualifying apps.
- Partner tooling: Partners Dashboard (manage apps, analytics, payouts), development stores for testing.

Security, Privacy, and Auth
- OAuth 2.0: Offline access token for background jobs; online token per‑user for embedded flows; HMAC validation on OAuth callbacks and webhook deliveries.
- Webhook security: HMAC header verification and idempotency handling.
- GDPR/Privacy: Mandatory data redaction/erasure/export endpoints and corresponding webhooks when handling personal data.

Commerce Domains Covered by Admin API
- Catalog & Merchandising: Products, variants, media, collections, pricing, selling plans (subscriptions), recommendations.
- Orders & Checkout: Carts, checkouts, order editing/refunds; Checkout UI Extensions and Functions customize behavior.
- Discounts & Promotions: Function‑backed programmable discounts; code/auto discount management through Admin API.
- Fulfillment & Logistics: Fulfillment Orders API, locations, inventory, shipping profiles/rates, returns (varies by region/feature rollout).
- Markets & Internationalization: Multi‑currency, localization, duties; translations API; multi‑domain setups.
- Analytics & Reporting: ShopifyQL/Notebooks for analytics queries and embedding insights.

What You Build vs. What Shopify Provides
- Identity & Session: Shopify provides OAuth and embedded session tokens; you implement the OAuth flow, token storage, per‑request verification, and user/session mapping.
- Data: Shopify provides APIs plus metafields/metaobjects; you model app‑specific data, choose what to store in Shopify vs. your DB, and build sync/migrations.
- Eventing: Shopify emits webhooks; you implement secure receivers, retries/backoff, idempotency keys, and background workers.
- UI: Shopify exposes extension points across Admin/Storefront/Checkout/POS; you design and ship extensions, embedded Admin UI, and optional App Proxy pages.
- Logic: Shopify executes Functions at specific hooks; you implement and configure Function logic (discounts, validations, customizations) packaged with your app.
- Billing: Shopify provides the Billing API; you implement pricing logic, trial handling, upgrade/downgrade flows, and proration/refunds where applicable.
- Distribution: Shopify hosts the App Store and review process; you prepare listing assets, support docs, and ongoing support/SLAs.

Full‑Stack App Blueprint (Review‑Ready)
1) Foundation
   - OAuth install flow with offline token; online token where needed. Store shop domain, tokens, and scope grants; handle re‑authorization.
   - Embedded Admin shell using App Bridge + Polaris; exchange session tokens on each page load.
   - Billing integration (subscription or usage) with clear trial/upgrade flows.
   - Webhook ingestion (products, orders, app/uninstalled, GDPR at minimum) with HMAC verification, retry logic, and idempotent processing.
   - Data model plan: which fields live in metafields/metaobjects vs. your DB; add migrations and backfills.
   - Background jobs: Bulk Operations for large syncs; queues for webhook fan‑out and API rate‑limit compliance.

2) Extensions (choose per use case)
   - Theme App Extension: Online Store blocks/embeds + merchant settings UI.
   - Checkout UI Extension: Surface your value at checkout; pair with Functions for discounts, validations, delivery/payment customizations. Confirm Plus‑only placements when relevant.
   - Admin UI Extensions: Contextual tools inside product/order/customer pages or navigation.
   - Customer Accounts UI Extension: Post‑purchase management in the new accounts experience.
   - POS UI Extension: In‑store workflows if retail matters.
   - Web Pixel: Consent‑aware attribution or measurement.
   - App Proxy: Server‑rendered storefront pages mounted under the shop domain.
   - Flow Connector: Optional triggers/actions so merchants can automate with Shopify Flow.

3) Operational Readiness
   - Rate limits: Implement leaky‑bucket backoff, cursor pagination, and GQL retry policies; use Bulk for large jobs.
   - Observability: Centralized logging (API calls/webhooks), metrics on extension performance, dead‑letter queues for failed jobs.
   - Internationalization: Markets and translations if you render storefront UI; currency handling and duties.
   - Compliance: GDPR endpoints, privacy policy, data retention plan; app review QA; BFS guidelines for UX/performance.

Scopes & Access (Typical Examples)
- Read/Write products, orders, customers, inventory, discounts, files, metaobjects/metafields, draft orders, fulfillments.
- Storefront API access token for headless or public storefront widgets.
- Pixels write scope for Web Pixels; Flow scope for automation (if building a connector).
- Restrict to least privilege and request additional scopes only when needed.

Checklists
Install & Auth
- [ ] App created in Partners Dashboard; dev store ready
- [ ] OAuth (offline + online) implemented; HMAC checks
- [ ] Token storage and rotation logic
- [ ] App/uninstalled webhook cleans up tokens and data

Admin UI
- [ ] Embedded app loads with App Bridge session token
- [ ] Polaris used for consistent Admin UX
- [ ] Admin UI extension points identified and implemented

Storefront/Theme
- [ ] Theme App Extension blocks render correctly in Theme Editor
- [ ] App settings (metafields/metaobjects) documented for merchants
- [ ] App Proxy endpoints secured and tested

Checkout & Functions
- [ ] Checkout UI extension registered and gated by shop plan if needed
- [ ] Functions implemented (discounts/validations/customizations) with configuration UI
- [ ] Performance and fallbacks validated

Data & Webhooks
- [ ] Metafields/metaobjects schema defined; editors enabled
- [ ] Webhooks subscribed; retries + idempotency verified
- [ ] Bulk Operations paths for initial import/periodic syncs

Billing & Compliance
- [ ] Billing plans (subscription/usage/one‑time) implemented and tested
- [ ] GDPR webhooks + endpoints verified
- [ ] App Store listing assets drafted; BFS checklist reviewed

References (selected official docs)
- Admin GraphQL API: https://shopify.dev/docs/api/admin-graphql
- Storefront API: https://shopify.dev/docs/api/storefront
- Customer Account API: https://shopify.dev/docs/api/customer-account
- Webhooks: https://shopify.dev/docs/api/admin-graphql#webhooks and https://shopify.dev/docs/apps/build/webhooks
- Metafields & Metaobjects: https://shopify.dev/docs/apps/build/custom-data
- UI Extensions (Checkout, Admin, Customer Accounts, POS): https://shopify.dev/docs/api/checkout-ui-extensions, https://shopify.dev/docs/api/admin-extensions, https://shopify.dev/docs/api/customer-account-ui-extensions, https://shopify.dev/docs/api/pos-ui-extensions
- Theme App Extensions: https://shopify.dev/docs/apps/build/online-store/theme-app-extensions
- Shopify Functions: https://shopify.dev/docs/api/functions and discount/validation/customization docs linked therein
- Hydrogen & Oxygen: https://shopify.dev/docs/custom-storefronts/hydrogen
- App Bridge: https://shopify.dev/docs/api/app-bridge
- Polaris: https://polaris.shopify.com/
- App Billing API: https://shopify.dev/docs/api/admin-graphql#Billing and billing guides
- App distribution, review, BFS: https://shopify.dev/docs/apps/distribution and https://shopify.dev/docs/apps/developer-tools/built-for-shopify
- App Proxy: https://shopify.dev/docs/api/usage/app-proxy
- Web Pixels: https://shopify.dev/docs/apps/build/pixels
- Shopify Flow (triggers/actions): https://shopify.dev/docs/apps/build/flow
- API versioning policy: https://shopify.dev/docs/api/usage/versioning

