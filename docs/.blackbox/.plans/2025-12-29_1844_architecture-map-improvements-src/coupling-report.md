# Coupling Report (what leaks above adapters today)

This report identifies where provider coupling still exists **above** the platform adapter boundary.

Coupling is not automatically “bad” — but it blocks provider interchangeability.

---

## 1) Shopify coupling

### 1.1 Vendor IDs (hardcoded Shopify GIDs)

Measured by:
- `docs/.blackbox/scripts/check-vendor-leaks.sh`

Current matches (as of 2025-12-29):
- `src/ui/providers/DrawerProvider.tsx` — hardcoded `gid://shopify/ProductVariant/...` in upsell list
- `src/domains/client/shop/products/data/product-config.ts` — `fallbackVariantId` uses Shopify variant GIDs
- `src/domains/client/shop/cart/logic/volumeDiscounts.ts` — `SHOWER_CAP_VARIANT_ID` uses Shopify variant GID

Allowed transitional match (legacy cleanup):
- `src/domains/client/shop/cart/providers/CartContext.tsx` has a helper to detect legacy GIDs and clear old cart state.

Recommended fix direction:
- Replace vendor IDs above adapters with internal keys:
  - `VariantKey = variant.<base64url(shopify_gid)>` (already supported by `src/domains/platform/commerce/adapters/shopify/internal-api/keys.ts`)
- Treat “no vendor IDs above adapters” as enforceable:
  - `./.blackbox/scripts/check-vendor-leaks.sh --fail` should be able to pass.

### 1.2 Vendor-specific UX copy / operational assumptions

`src/domains/client/shop/cart/ui/pages/CheckoutHandoffPage.tsx` includes detailed Shopify domain guidance:
- The copy references Shopify primary domains and edge proxying `/cart/c/*` and `/checkouts/*`.

This is real coupling, but it’s **capability** coupling more than “ID” coupling.

Suggested architecture improvement:
- Represent this via `CheckoutCapabilities` + `handoff.routes`:
  - UI can display a generic “handoff misconfigured” explanation driven by capabilities and config.
  - Provider-specific troubleshooting could live in:
    - platform adapter docs, or
    - admin-only diagnostics screen, or
    - a provider “diagnostics” port exposed only in dev.

---

## 2) Stripe coupling

Most Stripe coupling is appropriately split:
- Provider implementation: `src/domains/platform/payments/adapters/stripe/*`
- Port contract: `src/domains/platform/payments/ports/*`
- Runtime selection: `src/domains/platform/payments/runtime.ts`

However, there is **UI-level Stripe coupling** in dev tooling:
- `src/domains/client/account/ui/components/StripeDevEmbeddedPaymentPanel.tsx` imports Stripe Elements SDK.

This is likely acceptable as:
- Explicitly dev-only
- Not part of the “core checkout” path (it’s a debug panel)

If you want strict interchangeability:
- Gate these imports behind a “dev tools” boundary and isolate them (so prod bundles don’t pay for Stripe UI packages).

---

## 3) Identity/Auth coupling (Clerk)

Clerk is used as an auth provider and appears in:
- `src/main.tsx` (ClerkProvider, env gate)
- `src/domains/platform/auth/*` (platform auth provider context and pages)
- UI components like `src/ui/components/GlobalHeader.tsx` and `src/ui/providers/DrawerProvider.tsx`

This is “provider coupling”, but it’s in the platform/auth domain which is the right place.

Potential improvement:
- Define an `AuthPort` (similar to commerce/payments/content) if you expect to swap Clerk later.
  - If not, keep as-is; it’s coherent and already isolated.

---

## 4) Storage coupling (Supabase)

Supabase is fairly well isolated:
- Platform client: `src/domains/platform/storage/supabase.ts`
- Convenience re-export: `src/lib/supabase.ts`
- Consumers in client/admin domains.

Potential improvement:
- Introduce a `StoragePort` or `DbPort` only if you foresee swapping Supabase.
  - Otherwise, accept Supabase as a fixed platform dependency.

---

## 5) “Soft coupling” via legacy shims (`src/lib/*`)

`src/lib/product.ts` wraps `commerce.catalog.getProductByHandle`, but the return shape uses legacy naming:
- property name `variantId` now contains a `VariantKey`.

This is a “semantic mismatch leak”:
- It may not break at runtime, but it confuses boundaries and encourages misuse.

Suggested fix:
- Rename to `variantKey` (and treat as a planned migration), or remove the shim and call ports directly in domains.

