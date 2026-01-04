# OSS Project Entry

## Identity

- Name: Solidus
- Repo: https://github.com/solidusio/solidus
- Full name: solidusio/solidus
- License: BSD-3-Clause-like (“Spree License” text in repo)
- Primary language: Ruby (Rails)

## What it gives us (plain English)

- A production-grade ecommerce framework for Ruby on Rails (originated from the Spree ecosystem)
- Strong domain primitives and admin flows: catalog, orders, shipments, refunds, promotions
- A long-lived ecosystem with practical solutions for “real store ops” (useful as a reference)
- An example of how a mature ecommerce framework structures extension points (engines/gems)

## What feature(s) it maps to

- E-commerce platform baseline (catalog, order lifecycle, fulfillment/refunds)
- Admin + operations UX patterns (bulk ops, status transitions, searching)
- Extension framework patterns (plugins/engines, non-fork customization)
- “Support tooling” patterns for managed stores (debug workflows and data correction)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Low if adopted as core (Ruby/Rails). High as a “reference + feature checklist” repo.
- Setup friction (self-host? SaaS? Docker?): Medium/High. Rails stack + DB + operational overhead; manageable if we already run Ruby services.
- Data model alignment: Useful as a reference for commerce workflows; not directly relevant if our core is Shopify-native.

## Adoption path

- 1 day POC:
  - Run Solidus locally using the recommended setup.
  - Create a minimal store: products + promotions + a test checkout/order.
  - Explore admin flows: order statuses, refunds/returns, shipment updates.
  - Note which “mature ecommerce ops” workflows we want to mirror in our own admin/support tooling.
- 1 week integration:
  - If “reference only”:
    - Turn admin workflow learnings into a prioritized “support admin” backlog (timeline + actions + guardrails).
    - Extract extension patterns (how plugins hook into order flows, pricing, promotions).
  - If “adopt for non-Shopify builds” (only if we intentionally support Rails clients):
    - Define an extension-only policy (no forks) and a deployment model (tenant isolation).
    - Implement 1 integration and 1 merchant-specific customization end-to-end with audit logging.
- 1 month hardening:
  - Upgrades + patch cadence, multi-tenant isolation, observability and incident runbooks.
  - Security posture for merchant-facing hosting (PII access logging, least-privilege admin, redaction).

## Risks

- Maintenance risk: Medium/High if adopted as core (full platform + Ruby stack), low if reference-only.
- Security risk: High if we host checkout/payment flows for merchants.
- Scope mismatch: Medium/High for Shopify-first.
- License risk: Medium: the repo uses a “Spree License” text that looks equivalent to BSD-3-Clause, but confirm SPDX classification and any subcomponent licensing before reuse.

## Sources

- https://github.com/solidusio/solidus
- https://raw.githubusercontent.com/solidusio/solidus/main/LICENSE.md

## Score (0–100) + reasoning

- Score: 42
- Why: Useful mature commerce framework for ops/workflow patterns, but stack mismatch + “whole platform” footprint makes it unlikely as a core building block for a TS-first Shopify app business.

