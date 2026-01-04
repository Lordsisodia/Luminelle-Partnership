# OSS Project Entry

## Identity

- Name: Sylius
- Repo: https://github.com/Sylius/Sylius
- Full name: Sylius/Sylius
- License: MIT (code) + separate trademark/logo terms
- Primary language: PHP (Symfony)

## What it gives us (plain English)

- A mature, highly-customizable ecommerce framework (Symfony/PHP) aimed at custom builds
- Strong domain modeling for catalog, orders, customers, promotions, shipping, taxation
- A modular bundle/component architecture that’s useful as a reference for “extend without forking”
- Admin UX patterns for back-office operations (even if our stack is not PHP)

## What feature(s) it maps to

- E-commerce platform baseline (catalog, cart/checkout, orders, promotions)
- Storefront generation “feature checklist” (what merchants expect by default)
- Admin primitives and operational workflows (fulfillment, refunds, discounts)
- Plugin/module system patterns (components/bundles, boundaries, extension points)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Low if we try to adopt as core (PHP/Symfony), high as a “pattern repo + checklist”.
- Setup friction (self-host? SaaS? Docker?): Medium/High (full PHP stack + DB + infra).
- Data model alignment: Good as a domain reference; adoption as core implies committing to a PHP ecosystem.

## Adoption path

- 1 day POC:
  - Run Sylius locally (Docker-based dev environment).
  - Create a minimal store: 5 products, 1 promotion, 1 shipping method, 1 test order.
  - Walk the admin UX flows: catalog edit → order → fulfillment state → refund/cancel.
  - Capture a “feature expectations” checklist from what ships out-of-the-box.
- 1 week integration:
  - If “reference only”:
    - Convert Sylius’s domain model into a reference schema for our own systems (events, statuses, entities).
    - Extract admin workflow patterns (state transitions, approvals, refunds) into our product spec.
  - If “adopt for non-Shopify builds” (only if we intentionally support PHP/Symfony clients):
    - Define the plugin boundary we will support (no forks; bundles/extensions only).
    - Build a “tenant provisioning” script (seed data, roles, channels).
    - Implement 1 integration (payments or shipping) end-to-end with audit logging.
- 1 month hardening:
  - Operational hardening for multi-tenant hosting (backups, upgrades, observability).
  - Security posture: PII controls + access logging + admin RBAC enforcement.
  - Long-term upgrade plan (Symfony/Sylius versions) and dependency governance.

## Risks

- Maintenance risk: High if adopted as core (full ecommerce platform + PHP stack). Low if used as a reference model.
- Security risk: High if we host checkout/order/payment flows for merchants (PII + payments).
- Scope mismatch: Medium/High for Shopify-first delivery (more “competitor/reference” than primitive).
- License risk: Low/Medium (MIT for code, but confirm trademark/logo restrictions before using branding).

## Sources

- https://github.com/Sylius/Sylius
- https://raw.githubusercontent.com/Sylius/Sylius/2.2/LICENSE
- https://raw.githubusercontent.com/Sylius/Sylius/2.2/LICENSE_OF_TRADEMARK_AND_LOGO

## Score (0–100) + reasoning

- Score: 45
- Why: Great domain + modularity reference and a legitimate “custom commerce build” option, but PHP/Symfony stack mismatch makes it unlikely as a core platform for a TS-first Shopify app business.

