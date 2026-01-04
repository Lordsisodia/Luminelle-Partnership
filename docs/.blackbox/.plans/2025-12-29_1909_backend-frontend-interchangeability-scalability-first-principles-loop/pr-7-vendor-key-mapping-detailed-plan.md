# PR 7 — Eliminate Vendor ID Leaks Above Adapters (key mapping) (detailed plan)

Scope: **plan-only** (no `src/` changes in this PR doc).

This PR is the “provider swap unlock”: it removes Shopify GIDs from UI/client code so commerce providers can be swapped without rewriting the UI layer.

---

## Why PR 7 exists (first principles)

If a frontend is swappable, it cannot embed vendor identifiers (Shopify GIDs, Stripe ids, etc.).
- Vendor identifiers must live only inside:
  - provider adapters (`src/domains/platform/**/adapters/**`), and/or
  - backend boundary provider plumbing (`functions/api/**`).  
Source: `key-mapping-spec-v1.md`

Evidence that vendor IDs currently leak above adapters (measurable baseline):
- `artifacts/snapshots/check-vendor-leaks.txt`

---

## Target outcome (PR 7 acceptance checks)

After implementation:
- Vendor leak scan shows `disallowed_lines=0`:
  - Run: `./.blackbox/scripts/check-vendor-leaks.sh`
  - Evidence: `artifacts/snapshots/check-vendor-leaks.txt`
- UI/client domains reference only internal keys (`ProductKey`, `VariantKey`), never vendor IDs.
- Provider adapters translate internal keys → provider IDs at the boundary.

---

## Current leak inventory (exact files to fix)

Disallowed Shopify GID occurrences (source of truth):
- `artifacts/snapshots/check-vendor-leaks.txt`

Current offenders (5 lines):
- `src/ui/providers/DrawerProvider.tsx` — 2 hardcoded `gid://shopify/ProductVariant/...`
- `src/domains/client/shop/cart/logic/volumeDiscounts.ts` — `SHOWER_CAP_VARIANT_ID` constant is a Shopify GID
- `src/domains/client/shop/products/data/product-config.ts` — 2 `fallbackVariantId` fields are Shopify GIDs

Allowed transitional usage (do not treat as failure):
- `src/domains/client/shop/cart/providers/CartContext.tsx` has a legacy helper that checks `gid://shopify/` prefix
  - evidence: `artifacts/snapshots/check-vendor-leaks.txt`

### Exact leak lines + proposed internal key replacements (make PR7 mechanical)

Key scheme source of truth:
- `key-mapping-spec-v1.md` (recommended: `variant.<handle>.<variant>`)

| Vendor ID (Shopify GID) | Where it appears | Proposed replacement (VariantKey) | Evidence |
|---|---|---|---|
| `gid://shopify/ProductVariant/56829020504438` | `DrawerProvider` upsell + `volumeDiscounts` + `product-config` shower cap fallback | `variant.lumelle-shower-cap.default` | `artifacts/snapshots/vendor-leaks-src-ui-providers-DrawerProvider.tsx.L130-190.txt`, `artifacts/snapshots/vendor-leaks-src-domains-client-shop-cart-logic-volumeDiscounts.ts.L1-120.txt`, `artifacts/snapshots/vendor-leaks-src-domains-client-shop-products-data-product-config.ts.L160-260.txt` |
| `gid://shopify/ProductVariant/56852779696502` | `DrawerProvider` upsell + `product-config` curler fallback | `variant.satin-overnight-curler.default` | `artifacts/snapshots/vendor-leaks-src-ui-providers-DrawerProvider.tsx.L130-190.txt`, `artifacts/snapshots/vendor-leaks-src-domains-client-shop-products-data-product-config.ts.L160-260.txt` |

Notes:
- These keys intentionally use product `handle` values already present in config (`lumelle-shower-cap`, `satin-overnight-curler`) so the mapping stays stable across UI refactors.  
  Evidence: `artifacts/snapshots/vendor-leaks-src-domains-client-shop-products-data-product-config.ts.L160-260.txt`

Proposed Shopify adapter mapping registry entries (stable key → current Shopify GID):

| VariantKey (stable, provider-independent) | Shopify Variant GID (current) | Evidence |
|---|---|---|
| `variant.lumelle-shower-cap.default` | `gid://shopify/ProductVariant/56829020504438` | `artifacts/snapshots/vendor-leaks-src-domains-client-shop-cart-logic-volumeDiscounts.ts.L1-120.txt` |
| `variant.satin-overnight-curler.default` | `gid://shopify/ProductVariant/56852779696502` | `artifacts/snapshots/vendor-leaks-src-domains-client-shop-products-data-product-config.ts.L160-260.txt` |

---

## Implementation plan (high-level)

### 0) Reconcile with current adapter behavior (so PR7 doesn’t “fight the code”)

Current state (exists today):
- The Shopify internal-api adapter already encodes/decodes Shopify variant GIDs into `VariantKey` using base64url (prefix `variant.`).  
  Evidence: `artifacts/snapshots/src-domains-platform-commerce-adapters-shopify-internal-api-keys.ts.head260.2025-12-30_2316.txt`
- The adapter emits `variantKey` values by encoding the raw Shopify variant id (`gid://shopify/ProductVariant/...`).  
  Evidence: `artifacts/snapshots/src-domains-platform-commerce-adapters-shopify-internal-api-catalog.ts.head120.txt`
- The adapter consumes `variantKey` values by decoding them back into a Shopify merchandise id for cart mutations.  
  Evidence: `artifacts/snapshots/src-domains-platform-commerce-adapters-shopify-internal-api-cart.ts.head220.txt`

Implication:
- A “quick fix” would be to replace leaked GIDs in UI/client code with the adapter’s **encoded** keys, which would satisfy the current leak scan.
- But a provider swap still wouldn’t be truly cheap, because those encoded keys still carry Shopify IDs (just obfuscated).

PR7 recommendation (aligned with the swappability goal):
- Implement **stable** (provider-independent) `VariantKey` values in UI/client code (handle-based scheme), and translate them to Shopify GIDs only inside the Shopify adapter boundary via a mapping registry.
- Keep backward compatibility by accepting both:
  - v0 encoded keys (`variant.<base64url(gid)>`), and
  - v1 stable keys (`variant.<handle>.<variant>`).

### 1) Replace vendor IDs in UI/client with internal keys

Use the internal key scheme (recommended):
- `product.<handle>`
- `variant.<handle>.<variant>`

Source:
- `key-mapping-spec-v1.md`

Concrete refactors (examples; keep naming consistent):
- `variantId: 'gid://shopify/…'` → `variantKey: 'variant.lumelle-shower-cap.default'`
- `SHOWER_CAP_VARIANT_ID` → `SHOWER_CAP_VARIANT_KEY`
- `fallbackVariantId` → `fallbackVariantKey`

### 2) Add a mapping registry behind the adapter boundary

Location rule:
- mapping lives behind the provider adapter (Shopify commerce adapter), not in UI/client code.

Proposed file location (v1 stable keys):
- `src/domains/platform/commerce/adapters/shopify/internal-api/key-registry.ts`
  - exports a mapping object:
    - `VariantKey` → Shopify variant GID
  - contains only constants (no runtime network calls)

Proposed resolver function (adapter-only):
- `resolveShopifyVariantGid(variantKey: VariantKey): string`
  - If `variantKey` is legacy encoded, decode it (existing helper in `keys.ts`)
  - Else treat it as stable and look it up in the registry

Mapping responsibilities:
- `VariantKey` → Shopify variant GID
- (Optional) `ProductKey` → Shopify product identifier, if required by adapter logic

Failure semantics:
- Missing mapping → stable `NOT_FOUND` error (PortError-like), not a raw provider exception.
  - Evidence that `NOT_FOUND` exists as a stable PortError code: `artifacts/snapshots/src-domains-platform-ports-errors.ts.head.txt`

Source:
- `key-mapping-spec-v1.md`

### 3) Update provider adapters to translate keys at the boundary

All translation should occur inside:
- `src/domains/platform/**/adapters/**`

Concrete impact surface (Shopify internal-api adapter):
- `src/domains/platform/commerce/adapters/shopify/internal-api/cart.ts` decodes `variantKey` before calling `/api/storefront/cart/*`.  
  Evidence: `artifacts/snapshots/src-domains-platform-commerce-adapters-shopify-internal-api-cart.ts.head220.txt`
- After PR7, `decodeVariantKey(...)` should be replaced by the new resolver so stable keys work too.

Acceptance gate to protect against regression:
- Vendor leak scan stays at 0 permanently once fixed.

---

## Evidence deltas expected after PR 7 (when implemented)

- `artifacts/snapshots/check-vendor-leaks.txt`:
  - `disallowed_lines` goes from `5` → `0`
- No changes expected to `/api/*` inventories unless key mapping also changes endpoint DTOs.

Run:
- `./.blackbox/scripts/refresh-1909-all-gates.sh`
- `./.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`
