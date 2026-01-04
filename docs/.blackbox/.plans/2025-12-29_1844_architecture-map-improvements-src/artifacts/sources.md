# Sources (internal code paths)

This run is based on **direct inspection of the repository** (no external web research).

Format:
- file path
  - Supports: what claim/data this source backs
  - Accessed: YYYY-MM-DD
  - Confidence: High | Medium | Low

## App wiring

- `src/main.tsx`
  - Supports: boot sequence, global providers (Clerk, Helmet, PaymentsProvider), early analytics/service worker.
  - Accessed: 2025-12-29
  - Confidence: High

- `src/router.tsx`
  - Supports: root provider tree (CartProvider/AuthProvider/DrawerProvider).
  - Accessed: 2025-12-29
  - Confidence: High

- `src/App.tsx`
  - Supports: route → domain composition; identifies major user surfaces (client/admin/auth).
  - Accessed: 2025-12-29
  - Confidence: High

## Platform ports + runtime selection

- `src/domains/platform/ports/primitives.ts`
  - Supports: canonical key types above adapters (`VariantKey`, etc.) are currently `string` aliases.
  - Accessed: 2025-12-29
  - Confidence: High

- `src/domains/platform/ports/errors.ts`
  - Supports: `PortError` and stable error codes used across platform boundaries.
  - Accessed: 2025-12-29
  - Confidence: High

- `src/domains/platform/commerce/ports/*`
  - Supports: DTO-driven commerce contracts (Catalog/Cart/Checkout).
  - Accessed: 2025-12-29
  - Confidence: High

- `src/domains/platform/commerce/runtime.ts`
  - Supports: commerce provider selection (mock/disabled/shopify) and capability defaults.
  - Accessed: 2025-12-29
  - Confidence: High

- `src/domains/platform/content/runtime.ts`
  - Supports: content provider selection (mock/disabled/shopify).
  - Accessed: 2025-12-29
  - Confidence: High

- `src/domains/platform/payments/runtime.ts`
  - Supports: payments provider selection (mock/disabled/stripe) with env-based opt-in in dev.
  - Accessed: 2025-12-29
  - Confidence: High

- `src/domains/platform/http/internal-api/client.ts`
  - Supports: standard internal API client that maps HTTP failures to `PortError` codes.
  - Accessed: 2025-12-29
  - Confidence: High

## Provider adapters

- `src/domains/platform/commerce/adapters/shopify/internal-api/index.ts`
  - Supports: Shopify commerce adapter implements `{ catalog, cart, checkout }` ports.
  - Accessed: 2025-12-29
  - Confidence: High

- `src/domains/platform/commerce/adapters/shopify/internal-api/keys.ts`
  - Supports: opaque key encoding/decoding that prevents raw Shopify GIDs above adapters.
  - Accessed: 2025-12-29
  - Confidence: High

- `src/domains/platform/content/adapters/shopify/internal-api/index.ts`
  - Supports: Shopify content adapter implements the content sections port.
  - Accessed: 2025-12-29
  - Confidence: High

- `src/domains/platform/payments/adapters/stripe/index.ts`
  - Supports: Stripe adapter implements `PaymentsPort` and uses internal API client.
  - Accessed: 2025-12-29
  - Confidence: High

## Coupling evidence (above adapters)

- `src/ui/providers/DrawerProvider.tsx`
  - Supports: UI-level Shopify GID leakage (upsell variant IDs).
  - Accessed: 2025-12-29
  - Confidence: High

- `src/domains/client/shop/products/data/product-config.ts`
  - Supports: Shopify GIDs embedded in client product config (fallback variant IDs).
  - Accessed: 2025-12-29
  - Confidence: High

- `src/domains/client/shop/cart/logic/volumeDiscounts.ts`
  - Supports: Shopify GID embedded in client cart logic constant.
  - Accessed: 2025-12-29
  - Confidence: High

- `src/domains/client/shop/cart/ui/pages/CheckoutHandoffPage.tsx`
  - Supports: provider-specific operational copy (Shopify domain/checkout handoff assumptions) in client UI.
  - Accessed: 2025-12-29
  - Confidence: Medium

- `src/lib/product.ts`
  - Supports: legacy shim uses `variantId` field name but actually carries `VariantKey` (semantic mismatch risk).
  - Accessed: 2025-12-29
  - Confidence: High

