# Migration Checklist (when code changes are allowed)

This is a practical, incremental plan to reach “UI plugs into ports, Shopify/Stripe are adapters”.

Constraints:
- Keep behavior stable while moving boundaries.
- Prefer small steps that can be reviewed/merged independently.

Safety plan:
- Stop points + risks: `stop-points-and-risks.md`

## Step 1 — Define ports + DTOs (no behavior changes)

Goal: UI/domain can import stable contracts without importing Shopify.

Current status:
- This largely already exists for commerce:
  - `src/domains/platform/commerce/ports/catalog.ts`
  - `src/domains/platform/commerce/ports/cart.ts`
  - `src/domains/platform/commerce/ports/checkout.ts`
- Content ports exist under platform content (verify exact paths for `ContentPort`).

DTO/contract reference:
- Use `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/ports.md` as the draft source of truth for method names + DTO fields.

Done checks:
- Contracts compile and are vendor-agnostic (no Shopify GraphQL types as DTOs).
- UI/domain imports come only from ports + runtime entrypoints.

## Step 2 — Adapter selection entrypoint (factory)

Goal: one import path for UI/domain to get an implementation (Shopify today).

Current status:
- Commerce runtime is centralized at:
  - `src/domains/platform/commerce/runtime.ts`
- UI/domain should use:
  - `commerce` from `@platform/commerce`

Done checks:
- There is exactly one place where adapter selection occurs.
- UI/domain code never reads `shopifyEnabled` directly.

## Step 3 — Wrap Shopify adapter behind ports

Goal: Shopify-specific code remains vendor-specific but UI consumes ports.

Current status:
- Shopify adapter exists behind internal API:
  - `src/domains/platform/commerce/adapters/shopify/internal-api/*`

Done checks:
- Ports are implemented by Shopify adapter wrapper(s).
- No UI code imports `@platform/commerce/shopify/*`.

## Step 4 — Move shared lib leaks behind ports

Replace direct Shopify calls in:
- `src/lib/product.ts` → `CatalogPort` consumer (or move module into platform commerce).
- `src/lib/sections.ts` → `ContentPort` consumer (or move module into platform content).

Done checks:
- Storefront GraphQL queries are no longer in `src/lib/*`.
- `src/lib/*` no longer imports `@platform/commerce/shopify`.

## Step 5 — Remove vendor IDs from UI/config

Targets:
- `src/ui/providers/DrawerProvider.tsx` (Shopify GIDs)
- `src/domains/client/shop/products/data/product-config.ts` (fallback variant IDs)
- `src/domains/client/shop/cart/logic/volumeDiscounts.ts` (variant ID constant)

Approach:
- Introduce internal `VariantKey` / `ProductKey` values in config (see `ports.md`).
- Adapter resolves internal keys to vendor IDs.

Done checks:
- No `gid://shopify/...` strings in UI/providers or client configs.

## Step 6 — Capability-driven checkout UI copy

Targets:
- `src/ui/providers/DrawerProvider.tsx`
- `src/domains/client/shop/cart/ui/pages/CartPage.tsx`

Approach:
- UI reads `CheckoutCapabilities` (mode + providerLabel + generic loading states) and renders vendor-agnostic text.

Done checks:
- UI copy is generic; vendor label is optional and injected via capability model.
- Any “checkout handoff” UX is expressed vendor-agnostically (based on `CheckoutCapabilities.handoff.routes`), without hardcoding Shopify route names in UI components.

## Step 7 — Generic “checkout handoff” route

Targets:
- `src/domains/client/shop/cart/ui/pages/CheckoutHandoffPage.tsx`
- `src/App.tsx` routing

Approach:
- Rename to a generic page (e.g. `CheckoutHandoffPage`) and delegate to `CheckoutPort`.
- Keep backward-compatible route handling if needed.

Done checks:
- Route/page naming is vendor-agnostic.
- Existing Shopify links still work (redirect or handler preserved).

## Stop points (quick reference)

Use these as “mergeable milestones” with safe rollback points:
- Stop 1: contracts landed (no runtime wiring)
- Stop 2: platform entrypoints (adapter selection + env policy)
- Stop 3: Shopify adapters implement ports (no consumers migrated)
- Stop 4: `src/lib/product.ts` migrated behind `CatalogPort`
- Stop 5: `src/lib/sections.ts` migrated behind `ContentPort`
- Stop 6: `CartContext` migrated behind `CartPort`
- Stop 7: checkout UX de-vendorized + generic handoff surface
- Stop 8: vendor IDs removed from UI/config (internal keys only)

Full detail: `stop-points-and-risks.md`
