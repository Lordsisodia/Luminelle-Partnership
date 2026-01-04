# OSS Project Entry

## Identity

- Name: Saleor Storefront
- Repo: https://github.com/saleor/storefront
- Full name: saleor/storefront
- License: BSD-3-Clause
- Primary language: TypeScript

## What it gives us (plain English)

- A production-grade Next.js storefront implementation designed to work with Saleor’s GraphQL commerce API
- Strong UX patterns for:
  - cart/checkout flows
  - account pages
  - collections/products/search
- Practical reference for “GraphQL-first storefront architecture” (queries, caching, typed fragments)

## What feature(s) it maps to

- Storefront generation patterns (Next.js + GraphQL)
- Component/library structure for commerce UI
- Checkout UX patterns and state management
- “API-driven storefront” patterns we can reuse (even if our backend is Shopify Storefront API)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Strong on frontend (TS/Next.js). Backend coupling is to Saleor GraphQL; we’d adapt patterns, not reuse backend integration.
- Setup friction (self-host? SaaS? Docker?): Low for code reuse; medium if paired with running Saleor backend.
- Data model alignment: Medium if Shopify-first; high if we ever support Saleor-based builds.

## Adoption path

- 1 day POC:
  - Run the storefront locally against a Saleor demo backend (or mock GraphQL responses).
  - Identify reusable primitives:
    - cart/checkout state management
    - GraphQL query organization + typed fragments
    - page IA patterns (product → cart → checkout)
  - Write a short “pattern translation” doc: how these map to Shopify Storefront API.
- 1 week integration:
  - Extract a “storefront patterns library” into our own template:
    - routing + layout patterns
    - cart/checkout state and UI components
    - GraphQL data fetching conventions (adapted to Shopify)
  - Implement a shared “commerce UI kit” used across generated storefronts.
  - Add a “test harness” for storefront flows (smoke tests for PDP/cart/checkout handoff).
- 1 month hardening:
  - Standardize performance + SEO checks in CI.
  - Add safe per-merchant customization system (tokens + sections + content ops).
  - Add error monitoring + alerting for storefront runtime issues.

## Risks

- Maintenance risk: Medium. Storefront templates evolve; keep a versioned starter.
- Security risk: Medium. Checkout/token flows + PII in logs must be controlled.
- Scope mismatch: Medium if we never support Saleor; still valuable as a patterns repo.
- License risk: Low (BSD-3-Clause).

## Sources

- https://github.com/saleor/storefront
- https://raw.githubusercontent.com/saleor/storefront/main/LICENSE

## Score (0–100) + reasoning

- Score: 66
- Why: Strong Next.js + GraphQL storefront reference with permissive license; best as a patterns library unless we also run Saleor backend.

