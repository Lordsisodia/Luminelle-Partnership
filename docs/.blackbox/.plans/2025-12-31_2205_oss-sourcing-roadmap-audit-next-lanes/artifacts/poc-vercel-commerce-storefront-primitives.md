# POC notes — Vercel Commerce storefront primitives (Next.js + Shopify)

Repo: `vercel/commerce` (MIT)

Goal (1 day): treat this as a **canonical storefront reference implementation** and extract reusable primitives for Lumelle’s storefront/admin component kits:
- PLP grid + product tile patterns
- PDP gallery + variant selection (including “unavailable combination” UX)
- Cart drawer/modal patterns + line item editing flows
- Shopify Storefront API boundaries (queries/fragments + cart mutations)
- “Modern Next.js” wiring patterns (App Router, server actions, cache tags)

Guardrails:
- Pattern mining only (no vendoring into this repo).
- Copy/adapt only from `license_bucket=safe` sources with attribution.

---

## Concrete file pointers (high signal)

### Routes (App Router)
- `app/search/page.tsx` + `app/search/[collection]/page.tsx` — listing/search routes
- `app/product/[handle]/page.tsx` — PDP route

### Cart primitives (state + UX)
- `components/cart/cart-context.tsx`
  - Uses React `createContext` + `useOptimistic` for optimistic cart UI updates.
- `components/cart/actions.ts`
  - Uses Next.js **server actions** (`'use server'`)
  - Calls `revalidateTag(TAGS.cart, 'seconds')` after cart mutations
  - Writes `cartId` cookie via `cookies().set('cartId', cart.id!)`
- `components/cart/modal.tsx` + `components/cart/open-cart.tsx` — cart drawer/modal shell
- `components/cart/edit-item-quantity-button.tsx` + `components/cart/delete-item-button.tsx` — line item editing controls
- `components/cart/add-to-cart.tsx`
  - Uses `useActionState(addItem, ...)` to submit the server action
  - Computes the selected variant from option selections; disables UI when not `availableForSale`

### PDP variant selection
- `components/product/variant-selector.tsx`
  - Builds a “combination availability” map from variants
  - Disables invalid combinations (`disabled` + `aria-disabled`) when `availableForSale=false`

### Shopify Storefront API boundary
- `lib/shopify/index.ts`
  - `shopifyFetch` wrapper; passes `X-Shopify-Storefront-Access-Token`
  - “reshape” functions normalize Shopify responses into app-friendly models (cart/products/collections)
  - Has explicit “Shopify not configured” fallbacks (useful for local dev)
- `lib/shopify/queries/*` + `lib/shopify/mutations/*` + `lib/shopify/fragments/*`

---

## Mapping → Lumelle primitives / Blocks Kit

### Storefront blocks to standardize
- `ProductGrid` / `ProductCard` (PLP)
- `VariantSelector` (PDP)
- `CartDrawer` + `CartLineItem` + `CartSummary` (cart)
- `SearchResultsGrid` + “empty state” patterns

### Data contracts to extract
- `ProductSummary` (tile/card)
- `ProductDetail` (variants, options, images)
- `Cart` / `CartLine` / `CartMutationResult` (add/remove/update)
- `Collection` (filters/collections route params)

### Next.js wiring patterns worth copying (conceptually)
- Server actions for mutations + cache tag revalidation
- Cookie-based cart session (`cartId`) and recovery behavior
- Optimistic UI updates with a safe source-of-truth refresh

---

## Risks + mitigations

- Risk: “reference app” assumptions (env vars, platform-specific config).
  - Mitigation: mine patterns + contracts only; don’t treat as drop-in.
- Risk: Some best parts rely on Shopify-specific data shapes.
  - Mitigation: extract a normalized internal model and treat Shopify as one adapter.

