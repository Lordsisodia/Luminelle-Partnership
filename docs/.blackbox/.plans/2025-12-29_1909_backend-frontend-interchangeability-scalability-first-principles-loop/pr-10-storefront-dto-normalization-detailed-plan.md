# PR 10 — Storefront DTO Normalization (provider-neutral `/api/storefront/*`) (detailed plan)

Scope: **plan-only** (no app code changes in this doc).

This PR is the “storefront frontend swap unlock”: it makes the storefront boundary return provider-neutral DTOs so a new UI can implement PLP/PDP/cart without knowing Shopify object shapes or Shopify IDs.

Evidence rule:
- Any statement about current state cites a snapshot under `artifacts/snapshots/`.

Primary mapping source (this plan):
- `storefront-contract-dto-mapping-v0.1.md`

---

## Why PR 10 exists (first principles)

We can’t honestly claim “frontend is swappable” if the storefront boundary returns provider objects/IDs that the frontend must understand.

Current state (what exists today):
- `/api/storefront/product/by-handle` returns a Shopify product object that includes Shopify GIDs (`product.id`, `variant.id`).  
  Evidence: `artifacts/snapshots/functions-api-storefront-product-by-handle.ts.head220.txt`
- `/api/storefront/cart/*` returns a Shopify `Cart` shape defined by `CART_FRAGMENT`, which includes Shopify IDs and `checkoutUrl` (Shopify checkout URL).  
  Evidence: `artifacts/snapshots/functions-_lib-storefront.ts.head280.txt`

Current usage posture:
- The `/api/storefront/*` endpoints are currently consumed by the Shopify platform adapter (internal-api) inside `src/domains/platform/**`, not directly by random UI modules.  
  Evidence: `artifacts/snapshots/rg-src-api-storefront-usage.latest.txt`

Implication:
- We can normalize the storefront boundary without destabilizing unrelated domains, but we must update the Shopify adapter to match the new DTO responses (or introduce a versioned migration path).

---

## Target outcome (PR 10 acceptance checks)

After implementation:
- Storefront endpoints return provider-neutral DTOs:
  - `ProductDetail` (PDP)
  - `Cart` (cart)
  - (sections) internal schema version (not provider-tied)
- No Shopify GIDs cross the boundary in storefront responses (except in explicitly internal/debug endpoints, if any).
- The Shopify commerce adapter continues to work by consuming DTOs and mapping to platform ports.

Docs-only contract references:
- DTO proposal: `dto-and-capabilities-spec-v0.1.md` (section “Storefront thin-slice DTOs”)
- Endpoint mapping: `storefront-contract-dto-mapping-v0.1.md`

---

## Recommended approach (minimize risk + keep swap boundary clean)

### Option A (preferred): versioned storefront boundary

Introduce provider-neutral endpoints under a versioned path:
- `/api/storefront/v2/product/by-handle`
- `/api/storefront/v2/cart/*`
- `/api/storefront/v2/landing/sections` and `/api/storefront/v2/product/sections` (optional in this PR)

Keep existing `/api/storefront/*` endpoints temporarily as “Shopify-passthrough” (legacy) until the platform Shopify adapter is migrated.

Why this is preferred:
- Avoids a breaking change for existing adapter callers (which currently expect `ShopifyCart`/`ShopifyProduct`).  
  Evidence of current expectation: `artifacts/snapshots/rg-src-api-storefront-usage.latest.txt`

### Option B: in-place DTO normalization (no versioning)

Normalize `/api/storefront/*` responses to DTOs directly and update the Shopify adapter in the same PR.

When to choose this:
- If you can coordinate a single atomic change across boundary + adapter + dependent UI flows.

---

## Detailed implementation plan (if Option A)

### 1) Add DTO mapping helpers (boundary-owned)

Create a boundary-owned mapper module (example location):
- `functions/_lib/storefrontDto.ts`

Responsibilities:
- `mapShopifyProductToProductDetail(shopifyProduct) -> ProductDetail`
- `mapShopifyCartToCart(shopifyCart) -> Cart`

Current state evidence for inputs:
- Shopify product shape returned today: `artifacts/snapshots/functions-api-storefront-product-by-handle.ts.head220.txt`
- Shopify cart shape returned today via `CART_FRAGMENT`: `artifacts/snapshots/functions-_lib-storefront.ts.head280.txt`

### 2) Add internal key resolution inside the boundary

Boundary must translate:
- `VariantKey` -> Shopify `ProductVariant.id`
- `CartKey` -> Shopify `Cart.id`
- `CartLineKey` -> Shopify cart line `id`

Do not store provider IDs in UI/client code.

Related prerequisite:
- PR 7 key registry + dual-format support (stable keys + legacy encoded keys): `pr-7-vendor-key-mapping-detailed-plan.md`

### 3) Implement `/api/storefront/v2/product/by-handle`

Behavior:
- input: `handle`
- output: `{ data: ProductDetail }` (or `{ product: ProductDetail }` if staying with current envelope)

Baseline current endpoint behavior:
- current handler returns `{ product: data.product }` (provider object): `artifacts/snapshots/functions-api-storefront-product-by-handle.ts.head220.txt`

### 4) Implement `/api/storefront/v2/cart/*` endpoints

Behavior:
- accept `cartKey` + `variantKey` + `cartLineKey`
- return `{ data: Cart }` (or `{ cart: Cart }`)

Baseline current cart endpoints:
- fetch expects `?id=<shopifyCartId>` and returns `json({ cart: data.cart })`: `artifacts/snapshots/functions-api-storefront-cart-fetch.ts.head220.txt`
- mutations accept provider IDs (e.g., `cartId`, `merchandiseId`, `lineId`) and return `json({ cart: ... })`:  
  - add-lines: `artifacts/snapshots/functions-api-storefront-cart-add-lines.ts.head220.txt`  
  - update-line: `artifacts/snapshots/functions-api-storefront-cart-update-line.ts.head220.txt`

### 5) Migrate Shopify platform adapter to v2 endpoints (follow-up PR or same PR)

Update the Shopify internal-api adapter to call v2 endpoints and to treat the boundary response as DTOs rather than Shopify objects.

Evidence that the adapter currently expects Shopify object response shapes:
- `artifacts/snapshots/rg-src-api-storefront-usage.latest.txt`

### 6) Verify and lock the contract

Verification (implementation phase, CLI-first):
- Add a “storefront response vendor-id leak” check:
  - hit `/api/storefront/v2/*` endpoints (dev env) and fail if response contains `gid://shopify/`
- Keep the existing “vendor IDs must not appear in UI/client code” leak check:
  - `./.blackbox/scripts/check-vendor-leaks.sh`

Docs-only immediate output:
- Record expected evidence deltas in `pr-stop-point-gate-pack.md` once PR10 exists as a code PR.

---

## Stop point (what “done” means for PR 10)

- A new storefront contract exists (versioned or in-place) that:
  - returns provider-neutral DTOs (no Shopify GIDs in response payloads)
  - is documented in `backend-boundary-contract-v1.md` and `dto-and-capabilities-spec-v0.1.md`
- The Shopify adapter calls the provider-neutral storefront contract (or legacy endpoints are explicitly marked as transitional).

