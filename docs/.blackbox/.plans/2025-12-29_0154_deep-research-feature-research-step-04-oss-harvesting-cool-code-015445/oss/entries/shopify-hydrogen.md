# OSS Project Entry

## Identity

- Name: Hydrogen
- Repo: https://github.com/Shopify/hydrogen
- Full name: Shopify/hydrogen
- License: MIT
- Primary language: TypeScript

## What it gives us (plain English)

- A Shopify-first storefront framework (React) with production-grade patterns for:
  - storefront data fetching (Storefront API)
  - caching boundaries
  - SEO primitives
  - routing + server rendering patterns
- A “reference implementation” for Shopify-native storefront generation (how Shopify expects you to build custom storefronts)
- Useful code patterns for:
  - structured product pages + collections
  - cart + checkout handoff
  - localization (regions/languages), markets, and URL structure

## What feature(s) it maps to

- Storefront generation (Shopify-first) for merchant clients
- Theme/template-to-code pipeline patterns (how to structure a reusable storefront “starter”)
- Performance primitives (caching, streaming, page boundaries) for high-LCP storefronts
- Operational workflow: dev → preview → deploy a custom storefront

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Excellent (React/TS). Fits a “we own the storefront repo” model.
- Setup friction (self-host? SaaS? Docker?): Low/Medium (standard JS tooling + hosting). Biggest lift is adopting Shopify storefront patterns correctly.
- Data model alignment: High for Shopify merchants; it’s designed around Shopify’s Storefront API and Shopify’s primitives.

## Adoption path

- 1 day POC:
  - Scaffold a Hydrogen storefront and run it locally.
  - Implement 3 core pages from a real merchant’s Shopify store:
    - collection page (filters/sort + pagination)
    - product detail page (variants + availability)
    - cart drawer/page (add/remove/update)
  - Add a minimal “theme layer”: header/footer, typography tokens, and 2–3 reusable sections.
  - Measure: can we make “storefront generation” as simple as “select theme + deploy”?
- 1 week integration:
  - Turn the POC into a “storefront template system”:
    - define a small set of section components + schema (hero, collection grid, featured products, rich text)
    - implement a safe override mechanism per-merchant (no forks; config + slots)
  - Build a provisioning workflow:
    - create storefront project from template
    - wire env + Storefront API tokens safely
    - deploy preview URLs per merchant and per PR
  - Add operational guardrails:
    - per-tenant config and feature flags
    - observability hooks (basic performance + error logging)
    - a “rollback” switch (previous deploy)
- 1 month hardening:
  - Standardize multi-tenant deployment pipeline (regions, caching config, rate limiting).
  - Formalize “theme upgrade” workflow (update template → migrate merchant overrides).
  - Add storefront security posture (CSP, secrets handling, data redaction in logs).

## Risks

- Maintenance risk: Medium. Shopify storefront patterns evolve; template upgrades need discipline.
- Security risk: Medium. Token handling, preview URL access controls, and PII in logs must be handled carefully.
- Scope mismatch: Low. This is directly on-strategy if we ship Shopify storefronts.
- License risk: Low (MIT).

## Sources

- https://github.com/Shopify/hydrogen
- https://raw.githubusercontent.com/Shopify/hydrogen/main/LICENSE.md

## Score (0–100) + reasoning

- Score: 82
- Why: Shopify-native storefront framework with permissive licensing and “real” production patterns; ideal as the backbone for a storefront generation/template system.

