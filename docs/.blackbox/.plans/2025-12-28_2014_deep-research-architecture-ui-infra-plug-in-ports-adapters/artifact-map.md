# Artifact Map

List every relevant artifact produced by this run.

- Plan folder: `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters`

## Prompt inputs
- `docs/.blackbox/agents/deep-research/prompts/context-pack.md` — shared run context + long-run memory rules
- `docs/.blackbox/agents/deep-research/prompts/library/12-ui-infra-plugin-architecture.md` — architecture research prompt pack

## Outputs (to be filled during run)
- `final-report.md` — target architecture + port catalog + dependency rules
- `rankings.md` — ranked migration steps
- `artifacts/sources.md` — concrete repo paths referenced
- `ports.md` — draft port contracts + DTOs + capability flags (design only)
- `artifacts/current-state-inventory.md` — quick “what’s already ported vs leaking” map (for Prompt 6–7)

## Current coupling points (seed list from initial scan; verify and expand during run)

UI/provider leaks:
- `src/ui/providers/DrawerProvider.tsx`
  - Shopify-specific UI copy (checkout button states) + Shopify GIDs in UI/provider layer.
  - Fix direction: UI reads `CheckoutCapabilities`/labels from a `CheckoutPort` instead of hardcoding vendor strings/IDs.

Page-level UI leaks:
- `src/domains/client/shop/cart/ui/pages/CartPage.tsx`
  - Shopify-specific checkout copy + loading text in page UI.
  - Fix direction: page renders generic checkout copy + provider label from `CheckoutCapabilities`.

Checkout handoff coupling (UI copy + routing assumptions):
- `src/domains/client/shop/cart/ui/pages/CheckoutHandoffPage.tsx`
  - Checkout handoff UX (DNS/domain guidance, route assumptions) that’s easy to let become vendor-specific.
  - Fix direction: keep the page generic and drive behavior/copy from `CheckoutPort.getCapabilities()` whenever possible.

Client domain leaks:
- `src/domains/client/shop/cart/providers/CartContext.tsx`
  - Uses the commerce runtime (`commerce` from `@platform/commerce`) and consumes DTOs from `@platform/commerce/ports` (good).
  - Still contains legacy clean-up for old Shopify GIDs and legacy storage (`lumelle_shopify_cart_id`) (expected during migration).
  - Fix direction: complete the migration by removing remaining vendor-ID assumptions from upstream callers and seed data.

Shared lib leaks:
- `src/lib/product.ts`
  - Uses `commerce.catalog.getProductByHandle` and returns internal keys as `Product.id`/`variantId`.
  - Remaining risk: UI/domain code must treat these as internal keys (not vendor IDs) and avoid re-introducing Shopify GIDs upstream.

- `src/lib/sections.ts`
  - Uses `content.sections.getLandingSections()` (port-driven).
  - Remaining risk: ensure UI copy/IDs and client config don’t leak vendor details back into sections rendering.

Routing coupling:
- `src/App.tsx`
  - Wires checkout handoff route (`/cart/c/*`) that should remain vendor-agnostic.
  - Imports `CheckoutHandoffPage` (good naming); ensure copy/behavior stays capability-driven.
  - Fix direction: keep route, drive UX from `CheckoutCapabilities` instead of vendor assumptions.

Configuration coupling (vendor IDs in config):
- `src/domains/client/shop/products/data/product-config.ts`
  - Stores Shopify `gid://shopify/ProductVariant/...` directly as fallback variant IDs.
  - Fix direction: store internal `variantKey` values and let adapter resolve to vendor IDs.

- `src/domains/client/shop/cart/logic/volumeDiscounts.ts`
  - Stores Shopify variant ID constant.
  - Fix direction: store internal product/variant keys; adapter resolves vendor IDs.

## “Already good” adapter candidates (proper place for vendor code)

- `src/domains/platform/commerce/runtime.ts`
  - Correct place: adapter selection and default “mock vs real” behavior live here.
- `src/domains/platform/commerce/ports/*`
  - Correct place: stable contracts + DTOs that UI/domain code imports.
- `src/domains/platform/commerce/adapters/shopify/internal-api/*`
  - Correct place: Shopify-specific mapping (IDs, price shape, checkout URL behavior) hidden behind ports.
- `src/domains/platform/content/adapters/shopify/internal-api/*`
  - Correct place: Shopify metaobject-backed content/sections hidden behind `ContentPort`.

## Backend Shopify integration (correctly not in UI)

- `functions/api/shopify/**` and `functions/_lib/shopify*.ts`
  - Correct place for OAuth/webhooks/admin integration.
  - Design requirement: UI should talk to internal API surfaces; never import backend vendor clients.

## Additional evidence (expanded scan; server-side + infra boundaries)

Checkout proxying / handoff infrastructure:
- `functions/_lib/shopifyCheckoutProxy.ts`
  - Server-side proxy logic for Shopify checkout/cart link handling.
  - Supports: checkout integration is partly a routing/proxy problem and belongs in infra, not UI.
- `functions/cart/c/[[catchall]].ts`
  - Maps `/cart/c/*` to Shopify checkout proxy.
  - Supports: the “handoff route” exists as infra; UI should treat it as a capability, not a vendor detail.
- `functions/checkouts/[[catchall]].ts`
  - Maps `/checkouts/*` to Shopify checkout proxy.
  - Supports: multiple upstream route patterns; keep vendor behavior behind `CheckoutPort` + capabilities.

Storefront API server-side boundary:
- `functions/_lib/storefront.ts`
  - Contains a server-side `runStorefront` implementation.
  - Supports: “Storefront querying” exists on server too; keep UI insulated from where queries run.
- `functions/api/storefront/cart/*`
  - Cart CRUD endpoints built on server-side Storefront calls.
  - Supports: cart operations already have a natural “port” surface (HTTP API) — UI should not need vendor SDKs.
- `functions/api/storefront/product/by-handle.ts`
  - Product fetch endpoint (server-side).
  - Supports: `CatalogPort` can be implemented via internal API, not only client-side Storefront.
- `functions/api/storefront/product/sections.ts`
  - Sections/metaobject fetch endpoint (server-side).
  - Supports: `ContentPort` can be implemented via internal API.

Customer accounts integration (server-side):
- `functions/api/customer/orders.ts`
- `functions/api/customer/order.ts`
- `functions/_lib/customerAccounts.ts`
  - Supports: customer account API discovery and requests belong in infra; UI should consume internal endpoints/ports.
