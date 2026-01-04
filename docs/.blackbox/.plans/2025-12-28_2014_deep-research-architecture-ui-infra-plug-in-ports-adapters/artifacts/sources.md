# Sources (internal paths)

This run is **read-only** (no code changes). Sources below are internal repo files referenced during the architecture analysis.

Format:
- file path
  - Supports: what claim/data this source backs
  - Accessed: 2025-12-28
  - Confidence: High | Medium | Low

## Platform / adapters (Shopify)

- `src/domains/platform/commerce/.docs/README.md`
  - Supports: intended scope of platform commerce integrations (Shopify now, payments later).
  - Accessed: 2025-12-28
  - Confidence: High

- `src/domains/platform/commerce/runtime.ts`
  - Supports: adapter selection lives in one place (mock vs real), capability model is centralized.
  - Accessed: 2025-12-29
  - Confidence: High

- `src/domains/platform/commerce/ports/*`
  - Supports: stable DTOs + contracts UI/domain code can depend on without vendor types leaking.
  - Accessed: 2025-12-29
  - Confidence: High

- `src/domains/platform/commerce/adapters/shopify/internal-api/cart.ts`
  - Supports: Shopify cart mapping and internal API calls are hidden behind `CartPort`.
  - Accessed: 2025-12-29
  - Confidence: High

- `src/domains/platform/commerce/adapters/shopify/internal-api/catalog.ts`
  - Supports: Shopify product mapping (GraphQL shape → internal DTO) hidden behind `CatalogPort`.
  - Accessed: 2025-12-29
  - Confidence: High

## Current coupling points (leaks)

- `src/lib/product.ts`
  - Supports: shared lib consumes `commerce` runtime and returns internal keys (port-driven).
  - Accessed: 2025-12-29
  - Confidence: High

- `src/lib/sections.ts`
  - Supports: shared lib consumes `content` runtime and returns `SectionsDTO` (port-driven).
  - Accessed: 2025-12-29
  - Confidence: High

- `src/domains/client/shop/cart/providers/CartContext.tsx`
  - Supports: UI consumes `commerce` runtime and `CartDTO`/`CartLineDTO` port types; includes legacy cleanup for old Shopify GIDs.
  - Accessed: 2025-12-29
  - Confidence: High

- `src/ui/providers/DrawerProvider.tsx`
  - Supports: vendor-specific UI copy (“Shopify checkout…”) + Shopify GIDs used in UI/provider layer.
  - Accessed: 2025-12-28
  - Confidence: High

- `src/domains/client/shop/cart/ui/pages/CartPage.tsx`
  - Supports: Shopify-specific checkout copy and checkout assumptions in a page-level UI surface.
  - Accessed: 2025-12-28
  - Confidence: High

- `src/domains/client/shop/cart/ui/pages/CheckoutHandoffPage.tsx`
  - Supports: checkout handoff UX and assumptions about domains/routes (keep vendor behavior behind `CheckoutPort`).
  - Accessed: 2025-12-29
  - Confidence: High

- `src/App.tsx`
  - Supports: Shopify checkout handoff routes indicate checkout integration assumptions.
  - Accessed: 2025-12-28
  - Confidence: High

## Server-side Shopify (important boundary)

These represent the “infra/backend” side of Shopify integration (OAuth, webhooks, proxy). UI should never import these; UI should talk to a stable internal API surface.

- `functions/api/shopify/**`
  - Supports: Shopify OAuth flows and webhook handlers (Cloudflare Pages Functions).
  - Accessed: 2025-12-28
  - Confidence: Medium

- `functions/_lib/shopifyCheckoutProxy.ts`
  - Supports: checkout/cart link proxying is server-side infra behavior; UI should not implement vendor routing logic.
  - Accessed: 2025-12-28
  - Confidence: High

- `functions/cart/c/[[catchall]].ts`
  - Supports: `/cart/c/*` route is handled by the server proxy; vendor-specific behavior can be hidden behind a checkout handoff capability.
  - Accessed: 2025-12-28
  - Confidence: High

- `functions/checkouts/[[catchall]].ts`
  - Supports: `/checkouts/*` route is handled by the server proxy; indicates multiple upstream paths to treat as “checkout handoff”.
  - Accessed: 2025-12-28
  - Confidence: High

- `functions/_lib/storefront.ts`
  - Supports: server-side Storefront query boundary exists (`runStorefront`), enabling `CatalogPort`/`ContentPort` to be implemented via internal API endpoints.
  - Accessed: 2025-12-28
  - Confidence: Medium

- `functions/api/storefront/cart/*`
  - Supports: server-side cart endpoints exist and can back a `CartPort` without UI importing vendor clients.
  - Accessed: 2025-12-28
  - Confidence: Medium

- `functions/api/storefront/product/by-handle.ts`
  - Supports: product fetch endpoint exists and can back `CatalogPort`.
  - Accessed: 2025-12-28
  - Confidence: Medium

- `functions/api/storefront/product/sections.ts`
  - Supports: sections fetch endpoint exists and can back `ContentPort`.
  - Accessed: 2025-12-28
  - Confidence: Medium

- `functions/api/customer/orders.ts`
- `functions/api/customer/order.ts`
- `functions/_lib/customerAccounts.ts`
  - Supports: customer account API discovery exists server-side; belongs to infra, not UI.
  - Accessed: 2025-12-28
  - Confidence: Medium

- `functions/_lib/shopifyAdmin.ts`
  - Supports: Admin API access token selection and admin GraphQL client behavior (server-side).
  - Accessed: 2025-12-28
  - Confidence: Medium

- `functions/_lib/shopifyWebhooks.ts`
  - Supports: webhook signature verification and secret env var behavior.
  - Accessed: 2025-12-28
  - Confidence: Medium

## Repo conventions / constraints

- `docs/02-engineering/architecture/ARCHITECTURE-HOWTO.md`
  - Supports: layering rules (UI vs logic vs data) and domain-first placement conventions.
  - Accessed: 2025-12-28
  - Confidence: Medium

- `src/domains/README.md`
  - Supports: domain import rules; “vendor clients belong in platform”.
  - Accessed: 2025-12-28
  - Confidence: High

## Notes (potentially confusing, worth addressing later)

- `src/domains/client/shop/cart/logic/shopifyCart.ts`
  - Supports: there is a client-domain file named `shopifyCart.ts` (and a `shopifyEnabled = false` constant) which can confuse layering and adapter selection.
  - Accessed: 2025-12-28
  - Confidence: Medium

## Platform / adapters (Payments)

- `src/domains/platform/payments/runtime.ts`
  - Supports: payments provider selection mirrors commerce runtime pattern (mock vs real).
  - Accessed: 2025-12-29
  - Confidence: High

- `src/domains/platform/payments/adapters/stripe/index.ts`
  - Supports: Stripe adapter exists behind `PaymentsPort` (pattern to follow for future providers).
  - Accessed: 2025-12-29
  - Confidence: High
