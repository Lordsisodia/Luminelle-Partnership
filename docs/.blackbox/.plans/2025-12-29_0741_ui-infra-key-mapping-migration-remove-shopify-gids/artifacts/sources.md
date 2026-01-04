# Sources (internal paths)

This run is about removing Shopify GIDs from UI/config by standardizing on internal keys.

Format:
- file path
  - Supports: what claim/data this source backs
  - Accessed: YYYY-MM-DD
  - Confidence: High | Medium | Low

- `docs/.blackbox/scripts/check-vendor-leaks.sh`
  - Supports: measurable definition of “done” (no disallowed vendor IDs/copy above adapters).
  - Accessed: 2025-12-29
  - Confidence: High

- `src/domains/platform/ports/primitives.ts`
  - Supports: canonical key types (`VariantKey`, etc.) are strings above adapters.
  - Accessed: 2025-12-29
  - Confidence: High

- `src/domains/platform/commerce/adapters/shopify/internal-api/keys.ts`
  - Supports: current `VariantKey` encoding scheme (`variant.<base64url(gid)>`) and decode boundary.
  - Accessed: 2025-12-29
  - Confidence: High

- `src/ui/providers/DrawerProvider.tsx`
  - Supports: Shopify GIDs exist in UI/provider upsell list (must remove).
  - Accessed: 2025-12-29
  - Confidence: High

- `src/domains/client/shop/products/data/product-config.ts`
  - Supports: Shopify fallback variant IDs exist in client config (must remove).
  - Accessed: 2025-12-29
  - Confidence: High

- `src/domains/client/shop/cart/logic/volumeDiscounts.ts`
  - Supports: Shopify variant ID constant exists in client domain logic (must remove).
  - Accessed: 2025-12-29
  - Confidence: High

- `src/domains/client/shop/cart/providers/CartContext.tsx`
  - Supports: Cart uses `VariantKey` for `commerce.cart.addLine`; contains legacy cleanup helper for old Shopify GIDs (allowed transitional).
  - Accessed: 2025-12-29
  - Confidence: High
