# Storefront Contract ↔ DTO Mapping (v0.1)

Purpose:
- Make “storefront UI is swappable” concrete by mapping the current `/api/storefront/*` endpoints to the proposed storefront DTO thin-slice.
- Identify the minimal deltas required so a frontend can implement PLP/PDP/cart primitives **without**:
  - Shopify GIDs
  - Shopify Storefront API object shapes
  - provider-specific branching

Evidence rule:
- Every “current state” statement cites a snapshot under:
  - `artifacts/snapshots/`

Related specs (docs-only targets):
- Storefront DTO proposal: `dto-and-capabilities-spec-v0.1.md` (section “Storefront thin-slice DTOs”)
- Vendor key mapping requirement (no vendor IDs above adapters): `key-mapping-spec-v1.md`

---

## 0) Current storefront surface (what exists today)

The current storefront boundary is implemented as Cloudflare Pages Functions handlers under `functions/api/storefront/**`, and currently calls Shopify Storefront GraphQL directly via `runStorefront`. Evidence (representative endpoints):
- Product PDP read endpoint calls `runStorefront` and returns `json({ product: data.product })`: `artifacts/snapshots/functions-api-storefront-product-by-handle.ts.head220.txt`
- Cart endpoints call `runStorefront` and return `json({ cart: ... })`: `artifacts/snapshots/functions-api-storefront-cart-fetch.ts.head220.txt`, `artifacts/snapshots/functions-api-storefront-cart-add-lines.ts.head220.txt`

The cart response shape is governed by `CART_FRAGMENT`, which includes Shopify IDs and a Shopify checkout URL:
- `fragment CartFields on Cart { id checkoutUrl ... lines[].node.id ... merchandise.ProductVariant.id ... }`
  Evidence: `artifacts/snapshots/functions-_lib-storefront.ts.head280.txt`

---

## 1) Target DTO families (what we want to cross the boundary)

The v0.1 target is a small set of DTOs that correspond to the storefront primitives kit (PLP/PDP/cart) and keep provider identity inside adapters:
- `ProductSummary` (PLP)
- `ProductDetail` + `Variant` (PDP)
- `Cart` + `CartLine` (cart editor)

These are defined as a docs-only proposal here:
- `dto-and-capabilities-spec-v0.1.md` (section “Storefront thin-slice DTOs”)

---

## 2) Endpoint → DTO mapping (current vs target)

Legend:
- **Current response** describes what the handler returns today (not what the UI should depend on long-term).
- **Delta** describes the minimal change required (implementation phase) for a provider-agnostic DTO boundary.

### 2.1 Product (PDP)

| Endpoint | Method | Request inputs | Current response | Target DTO | Delta (to become swappable) | Evidence |
|---|---|---|---|---|---|---|
| `/api/storefront/product/by-handle` | `GET` | `?handle=...` | `{ product: { id, title, description, featuredImage.url, images[], variants[].id, variants[].priceV2 } }` (Shopify GIDs included) | `ProductDetail` | Transform to `ProductDetail` and map `product.id` + `variant.id` into internal keys (`ProductKey`, `VariantKey`) before returning; never expose Shopify GIDs to the client | `artifacts/snapshots/functions-api-storefront-product-by-handle.ts.head220.txt` |

Notes:
- The presence of `product.id` and `variant.id` in the GraphQL query implies Shopify GIDs cross the boundary today. Evidence: `artifacts/snapshots/functions-api-storefront-product-by-handle.ts.head220.txt`

### 2.2 Sections (landing + product)

These endpoints are “content sections” and will likely become provider-swappable later (Shopify metaobjects today → CMS later). For storefront UI swap, the immediate goal is: keep a stable, versioned section schema and avoid leaking provider-specific shape into UI components where possible.

| Endpoint | Method | Request inputs | Current response | Target DTO | Delta (to become swappable) | Evidence |
|---|---|---|---|---|---|---|
| `/api/storefront/landing/sections` | `GET` | none | `{ sections: { schemaVersion: 'shopify.metaobjects.v1', ... } }` | `LandingSections` (future) | Replace provider-tied `schemaVersion` with an internal schema version (e.g. `lumelle.sections.v1`) and translate upstream provider fields into that schema | `artifacts/snapshots/functions-api-storefront-landing-sections.ts.head220.txt` |
| `/api/storefront/product/sections` | `GET` | `?handle=...` | `{ sections: MetaobjectField[] }` (array of `{ key, value }` fields) | `ProductSections` (future) | Normalize metaobject `fields[]` into a typed internal section model so UI blocks don’t depend on Shopify metaobject semantics | `artifacts/snapshots/functions-api-storefront-product-sections.ts.head220.txt` |

### 2.3 Cart (create/read/write)

All cart endpoints return a Shopify `Cart` shape populated by `CART_FRAGMENT` (which includes Shopify IDs + `checkoutUrl`). Evidence:
- `CART_FRAGMENT` includes `cart.id`, `checkoutUrl`, `lines[].node.id`, and `merchandise.ProductVariant.id`: `artifacts/snapshots/functions-_lib-storefront.ts.head280.txt`
- Each cart handler returns `json({ cart: <ShopifyCart> })`: representative examples:
  - fetch: `artifacts/snapshots/functions-api-storefront-cart-fetch.ts.head220.txt`
  - create: `artifacts/snapshots/functions-api-storefront-cart-create.ts.head80.txt`
  - mutations: `artifacts/snapshots/functions-api-storefront-cart-add-lines.ts.head220.txt`

| Endpoint | Method | Request inputs | Current response | Target DTO | Delta (to become swappable) | Evidence |
|---|---|---|---|---|---|---|
| `/api/storefront/cart/create` | `POST` | JSON `{ merchandiseId?, quantity? }` | `{ cart: CartFields }` (Shopify Cart) | `Cart` | Change request to accept internal `VariantKey` (not `merchandiseId`); return `Cart` with `cartKey` + `lines[]` using internal keys; keep provider IDs inside adapter/boundary | `artifacts/snapshots/functions-api-storefront-cart-create.ts.head80.txt`, `artifacts/snapshots/functions-_lib-storefront.ts.head280.txt` |
| `/api/storefront/cart/fetch` | `GET` | `?id=...` | `{ cart: CartFields }` where `id` is a Shopify cart ID | `Cart` | Replace `id` query param with `cartKey`; boundary resolves provider cart ID internally (via key-mapping registry) before calling provider | `artifacts/snapshots/functions-api-storefront-cart-fetch.ts.head220.txt`, `artifacts/snapshots/functions-_lib-storefront.ts.head280.txt` |
| `/api/storefront/cart/add-lines` | `POST` | JSON `{ cartId, merchandiseId, quantity? }` | `{ cart: CartFields }` | `Cart` | Replace `cartId` + `merchandiseId` with `cartKey` + `variantKey`; keep mutation semantics the same | `artifacts/snapshots/functions-api-storefront-cart-add-lines.ts.head220.txt` |
| `/api/storefront/cart/update-line` | `POST` | JSON `{ cartId, lineId, quantity }` | `{ cart: CartFields }` | `Cart` | Replace `lineId` with `cartLineKey` (not Shopify cart line ID) | `artifacts/snapshots/functions-api-storefront-cart-update-line.ts.head220.txt` |
| `/api/storefront/cart/remove-lines` | `POST` | JSON `{ cartId, lineIds? }` | `{ cart: CartFields }` | `Cart` | Replace `lineIds[]` with `cartLineKeys[]` | `artifacts/snapshots/functions-api-storefront-cart-remove-lines.ts.head220.txt` |
| `/api/storefront/cart/attributes-update` | `POST` | JSON `{ cartId, attributes[] }` | `{ cart: CartFields }` | `Cart` | Replace `cartId` with `cartKey`; keep `attributes[]` model but define it in DTO contract (allowlist keys if needed) | `artifacts/snapshots/functions-api-storefront-cart-attributes-update.ts.head220.txt` |
| `/api/storefront/cart/discount-codes-update` | `POST` | JSON `{ cartId, codes[] }` | `{ cart: CartFields }` | `Cart` | Replace `cartId` with `cartKey`; keep `codes[]` | `artifacts/snapshots/functions-api-storefront-cart-discount-codes-update.ts.head220.txt` |
| `/api/storefront/cart/set-buyer-identity` | `POST` | JSON `{ cartId, email?, phone?, customerAccessToken?, deliveryAddress? }` | `{ cart: CartFields }` | `Cart` | Replace `cartId` with `cartKey`; decide whether `customerAccessToken` remains in request or becomes a backend-only concept (preferred: backend resolves customer identity) | `artifacts/snapshots/functions-api-storefront-cart-set-buyer-identity.ts.head220.txt` |

---

## 3) Minimal implementation slice (when code changes are allowed)

This plan is intentionally docs-only right now, but the mapping above implies a tight “thin slice” that would unlock a truly swappable storefront UI:

1) Add key mapping inside the boundary for Shopify cart/product/variant IDs
   - `VariantKey` ↔ Shopify `ProductVariant.id` and `CartKey` ↔ Shopify `Cart.id`
   - (Spec exists) `key-mapping-spec-v1.md`

2) Transform `/api/storefront/product/by-handle` into `ProductDetail` (provider-neutral)
   - The current response includes Shopify IDs: `artifacts/snapshots/functions-api-storefront-product-by-handle.ts.head220.txt`

3) Transform cart endpoints to accept/return internal keys + `Cart` DTO
   - The current cart includes Shopify IDs + Shopify checkout URL: `artifacts/snapshots/functions-_lib-storefront.ts.head280.txt`

4) Keep “sections” provider-neutral behind a stable internal schema version
   - Current response includes `schemaVersion: 'shopify.metaobjects.v1'`: `artifacts/snapshots/functions-api-storefront-landing-sections.ts.head220.txt`

