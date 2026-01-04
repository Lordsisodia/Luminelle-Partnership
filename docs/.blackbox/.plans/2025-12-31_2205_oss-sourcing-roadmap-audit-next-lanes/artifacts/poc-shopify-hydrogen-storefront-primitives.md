# POC notes — Shopify Hydrogen storefront primitives (cart + product options)

Repo: `Shopify/hydrogen-v1` (MIT)

Goal (1 day): mine a canonical Shopify-first storefront reference to extract reusable patterns for:
- cart state + persistence + line item editing
- product option/variant selection (availability + UX)
- Storefront API mutation boundaries (cart lines add/update/remove)

Guardrails:
- Pattern mining only; no vendoring/cloning.
- Copy/adapt only from `license_bucket=safe` sources with attribution.

---

## Concrete file pointers (high signal)

### Storefront UI primitives (demo store)
- `templates/demo-store/src/components/cards/ProductCard.client.tsx`
- `templates/demo-store/src/components/product/ProductGrid.client.tsx`
- `templates/demo-store/src/components/global/CartDrawer.client.tsx`
- `templates/demo-store/src/components/cart/CartLineItem.client.tsx`

### Cart state + persistence (library)
- `packages/hydrogen/src/components/CartProvider/CartProvider.client.tsx`
  - Initializes cart with priority:
    1) cart prop (SSR-provided)
    2) `localStorage` cart id fallback
  - Saves `cartId` to localStorage when cart exists
  - Removes localStorage cart id when cart reaches “completed”
  - Exposes stable action methods: `linesAdd`, `linesRemove`, `linesUpdate`, etc.

### Product options / variant selection (library)
- `packages/hydrogen/src/components/ProductOptionsProvider/ProductOptionsProvider.client.tsx`
  - Flattens variants connection
  - Computes product options from all variants
  - Tracks `selectedVariant` + `selectedOptions`
  - Provides:
    - `setSelectedOption(name, value)`
    - `isOptionInStock(optionName, value)` (availability gating)
- `packages/hydrogen/src/hooks/useProductOptions/useProductOptions.client.ts`
  - `useProductOptions()` is the consumer hook for the provider

### Storefront API mutation boundaries (cart lines)
- `packages/hydrogen/src/components/CartProvider/graphql/CartLineAddMutation.ts`
- `packages/hydrogen/src/components/CartProvider/graphql/CartLineUpdateMutation.ts`
- `packages/hydrogen/src/components/CartProvider/graphql/CartLineRemoveMutation.ts`

---

## Key patterns to reuse (conceptual)

### 1) Cart ID persistence contract

Hydrogen treats `cartId` as the stable session key and persists it in localStorage:
- bootstrap cart from localStorage if no server cart was provided
- keep localStorage updated with the latest cart id
- clear the cart id when checkout completes (or cart completes)

Lumelle mapping:
- In storefront UI kits, define a clear `CartSession` strategy:
  - storage key name
  - recovery behavior (when cart is missing/expired)
  - “completion” behavior (clear vs keep)

### 2) Cart action API (stable surface)

Expose actions as methods (not “mutate random state”):
- `linesAdd(lines)`
- `linesRemove(lineIds)`
- `linesUpdate(lines)`

Lumelle mapping:
- Define a stable “cart mutations contract” that any commerce adapter can implement.

### 3) Variant selection with availability gating

Provider owns:
- option list
- selected options state
- selected variant derivation
- availability check for a proposed option value

Lumelle mapping:
- `VariantSelector` contract should include:
  - `selectedOptions`
  - `setSelectedOption`
  - `isOptionAvailable(option, value)` or `getOptionAvailability(...)`

---

## POC output checklist (what “done” looks like)

- Cart:
  - a file-pointer-backed summary of the cart persistence strategy and action surface
  - a minimal `Cart` + `CartLine` contract we can reuse across adapters
- Product options:
  - a minimal `ProductVariant` + `SelectedOptions` contract
  - UX guidance for disabled/unavailable options
- API boundary:
  - map which GraphQL mutations correspond to add/update/remove

