# PR 7 — Vendor key mapping (eliminate vendor ID leaks above adapters)

## PR

- PR number/name: PR 7 — Eliminate vendor ID leaks above adapters (key mapping) (`pr-by-pr-stop-points-plan.md`)
- Goal (1 line): remove Shopify GIDs from UI/client layers by switching to stable `VariantKey` values and resolving them inside the Shopify adapter boundary (`pr-7-vendor-key-mapping-detailed-plan.md`)
- Stop point (from `pr-by-pr-stop-points-plan.md`): PR 7

## Gates run

- Command:
  - `./.blackbox/scripts/run-1909-loop.sh`
- Evidence:
  - `artifacts/snapshots/stop-point-metrics.latest.txt`
  - `artifacts/snapshots/check-vendor-leaks.txt`

## Evidence snapshot deltas (what changed and why)

- `artifacts/snapshots/check-vendor-leaks.txt`:
  - expected: `disallowed_lines` goes to `0`
  - observed: `disallowed_lines=0` (no Shopify GIDs remain in `src/ui`, `src/domains/client`, `src/lib`)
- `artifacts/snapshots/stop-point-metrics.latest.txt`:
  - expected/observed: `vendor_leaks_disallowed_lines=0`

- `artifacts/snapshots/src-domains-platform-commerce-adapters-shopify-internal-api-keyRegistry.ts.head200.txt`:
  - expected: add stable `VariantKey` → Shopify variant GID mapping behind adapter boundary
  - observed: mapping registry + `resolveShopifyVariantGid()` + `toVariantKey()` present
- `artifacts/snapshots/src-domains-platform-commerce-adapters-shopify-internal-api-cart.ts.head220.txt`:
  - expected: cart adapter resolves stable keys at boundary and emits stable keys when possible
  - observed: uses `toVariantKey(...)` for output and `resolveShopifyVariantGid(...)` for requests
- `artifacts/snapshots/src-domains-platform-commerce-adapters-shopify-internal-api-catalog.ts.head120.txt`:
  - expected: catalog emits stable keys where mapping exists (else encoded)
  - observed: uses `toVariantKey(v.id)` for `variantKey`

- `artifacts/snapshots/src-ui-providers-DrawerProvider.tsx.L140-200.txt`:
  - expected: upsells use internal `VariantKey` values, not Shopify GIDs
  - observed: upsells use `variant.<handle>.default` keys
- `artifacts/snapshots/src-domains-client-shop-cart-logic-volumeDiscounts.ts.head120.txt`:
  - expected: volume discount logic keys on provider-independent `VariantKey`
  - observed: uses `SHOWER_CAP_VARIANT_KEY=variant.lumelle-shower-cap.default`
- `artifacts/snapshots/src-domains-client-shop-products-data-product-config.ts.L170-240.txt`:
  - expected: product config fallback uses `VariantKey`, not vendor variant IDs
  - observed: `fallbackVariantKey` values are stable keys (no `gid://shopify/...`)

- `artifacts/snapshots/boundary-adapter-imports.ui-client.rg.txt`:
  - expected/observed: unchanged (`0` violations)
- `artifacts/snapshots/api-vs-functions.summary.txt`:
  - expected/observed: unchanged (PR7 does not touch backend boundary drift)
- `contract-gaps-report-v1.1.md`:
  - expected/observed: unchanged for auth (PR7 does not add/remove auth cues)

## Notes / risks

- Residual risk: stable key registry is partial; unmapped variants still fall back to encoded keys (acceptable transitional behavior) (`artifacts/snapshots/src-domains-platform-commerce-adapters-shopify-internal-api-keyRegistry.ts.head200.txt`)
- Next blocker: cache header gaps remain (`contract_gaps_missing_cache=4`) and the dashboard now recommends PR 4 (`artifacts/snapshots/stop-point-metrics.latest.txt`)

