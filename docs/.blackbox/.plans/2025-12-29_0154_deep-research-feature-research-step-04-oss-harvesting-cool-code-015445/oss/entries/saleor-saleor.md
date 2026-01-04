# OSS Project Entry

## Identity

- Name: saleor
- Repo: https://github.com/saleor/saleor
- Full name: saleor/saleor
- License: BSD-3-Clause
- Stars (approx): 22434
- Forks (approx): 5882
- Primary language: Python
- Last updated: 2025-12-28T09:41:08Z
- Topics: cart, checkout, commerce, composable, e-commerce, ecommerce, graphql, headless, headless-commerce, multichannel, oms, order-management, payments, pim, python, shop, shopping-cart, store

## What it gives us (plain English)

- A high-performance headless commerce API (Python/Django) with a strong GraphQL-first posture
- Commerce primitives: products/catalog, checkout/cart, orders, payments, promotions, multi-channel inventory
- A built-in dashboard/admin for commerce operations (useful to study IA + workflows)
- Clear separation between backend API and storefronts (good reference for “storefront generation” systems)
- A realistic benchmark for “what features a modern commerce platform ships by default”

## What feature(s) it maps to

- Storefront generation (as a backend option outside Shopify) — especially if GraphQL-first is desirable
- Admin primitives: catalog + order ops + fulfillment/payment flows (reference UX)
- Integration surfaces: webhooks/plugins patterns, background jobs, event modeling
- Multi-channel selling patterns (channels/regions/pricing) that map to multi-tenant thinking

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Mixed. The API is great to consume from TS/React, but the core is Python/Django (team skill/ops mismatch if we’re TS-first).
- Setup friction (self-host? SaaS? Docker?): Medium. Docker-based setup is straightforward, but it’s a full commerce backend with its own operational profile.
- Data model alignment: Partial. Very relevant as a reference platform; adoption as core requires commitment to Saleor’s model and deployment.

## Adoption path

- 1 day POC:
  - Run Saleor locally via the recommended Docker setup.
  - Create a minimal store: 3 products, 1 collection/category, 1 channel, 1 test order.
  - Run key GraphQL queries/mutations: list products, create checkout, add lines, complete order.
  - Inspect dashboard flows for: refunds, cancellations, fulfillment status, discounting.
  - Decide: “reference platform” vs “non-Shopify commerce engine”.
- 1 week integration:
  - If “reference only”:
    - Translate Saleor’s default feature surface into our internal product checklist (catalog/discounts/fulfillment).
    - Capture best UX patterns for “merchant admin” + “support admin” (timelines, statuses, search, filtering).
  - If “adopt for non-Shopify builds”:
    - Build a thin provisioning wrapper: create store/channel, seed templates/content, create admin user.
    - Implement 1 hard integration: payment or shipping, with proper webhook/event handling.
    - Add an audit/event stream on top of GraphQL mutations (who/what/when + redaction).
    - Define multi-tenant isolation strategy and data retention posture.
- 1 month hardening:
  - Production hardening: backups, migrations, observability, SLOs.
  - Security posture: PII controls, access logging, admin RBAC model, secrets management.
  - Operational playbooks for incident response (checkout failures, payment webhooks, data fixes).

## Risks

- Maintenance risk: High if adopted as core (Python/Django + full commerce stack). Low/Medium if used as a reference platform only.
- Security risk: High if merchant-facing checkout/payment flows are hosted/operated by us.
- Scope mismatch: Medium/High for a Shopify-first delivery model (it’s an alternate platform, not a small primitive).
- License risk: Low (BSD-3-Clause).

## Sources

- https://github.com/saleor/saleor
- https://raw.githubusercontent.com/saleor/saleor/main/LICENSE

## Score (0–100) + reasoning

- Score: 58
- Why: Strong reference implementation for a GraphQL-first headless commerce API and admin UX; likely a “patterns + checklist” repo unless we intentionally expand beyond Shopify.

---

## Repo description (from GitHub)

Saleor Core: the high performance, composable, headless commerce API.
