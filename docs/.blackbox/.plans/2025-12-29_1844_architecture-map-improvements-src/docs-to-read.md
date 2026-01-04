# Docs to Read / Code to Inspect (this run)

This run is an **architecture mapping** pass: we want to understand “what exists” and “how it’s wired” without changing app code.

## App entrypoints (wiring)
- [ ] `src/main.tsx` — bootstraps Router + providers (Clerk, Helmet, PaymentsProvider).
- [ ] `src/router.tsx` — root provider tree (CartProvider, AuthProvider, DrawerProvider).
- [ ] `src/App.tsx` — route map; where “domains” meet the UI shell.

## Platform “ports & adapters” backbone (provider swappability)
- [ ] `src/domains/platform/ports/primitives.ts` — canonical key types above adapters (ProductKey/VariantKey/etc).
- [ ] `src/domains/platform/ports/errors.ts` — canonical `PortError` contract.
- [ ] `src/domains/platform/commerce/ports/*` — Catalog/Cart/Checkout ports + DTOs.
- [ ] `src/domains/platform/commerce/runtime.ts` — commerce adapter selection (mock/disabled/shopify).
- [ ] `src/domains/platform/content/runtime.ts` — content adapter selection (mock/disabled/shopify).
- [ ] `src/domains/platform/payments/runtime.ts` — payments adapter selection (mock/disabled/stripe).
- [ ] `src/domains/platform/http/internal-api/client.ts` — internal API client with `PortError` mapping.

## Cross-cutting “bridge” layer (legacy helpers to rationalize)
- [ ] `src/lib/product.ts` — legacy product wrapper around `commerce.catalog`.
- [ ] `src/lib/sections.ts` — legacy sections wrapper around `content.sections`.

