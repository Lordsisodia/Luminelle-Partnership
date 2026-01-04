# Inspect First (exact `src/` files + why)

This is the minimal inspection set that lets us understand:
- how the app boots and composes domains
- where the platform boundary is (ports/adapters/runtimes)
- where vendor/tenant coupling currently lives

This is deliberately ordered from “wiring” → “boundary” → “coupling hot spots”.

Evidence rule for this loop:
- Every “why” statement below anchors to a saved snapshot under:
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/`

Fast evidence shortcut (refreshed on every gate run):
- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-key-files.extract.latest.txt`

---

## 1) App wiring + composition

1) `src/main.tsx`
   - Why: global bootstrapping and cross-cutting providers (Clerk, Helmet, error boundary, PaymentsProvider), plus analytics/service worker behavior.
   - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-main.tsx.head.txt`

2) `src/router.tsx`
   - Why: root provider tree; tells us which contexts are globally “always on” (Cart/Auth/Drawer).
   - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-router.tsx.head.txt`

3) `src/App.tsx`
   - Why: route table; the best map of domains and product surfaces (client/admin/auth/shop/cart/checkout).
   - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-App.tsx.head.txt`

---

## 2) Platform boundary: ports + runtimes

4) `src/domains/platform/ports/primitives.ts`
   - Why: canonical key types (`VariantKey`, `ProductKey`, etc.) used above adapters.
   - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-ports-primitives.ts.head.txt`

5) `src/domains/platform/ports/errors.ts`
   - Why: `PortError` contract; required for stable backend and diagnosability.
   - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-ports-errors.ts.head.txt`

6) `src/domains/platform/commerce/ports/cart.ts`
7) `src/domains/platform/commerce/ports/catalog.ts`
8) `src/domains/platform/commerce/ports/checkout.ts`
   - Why: defines the commerce contract surface that any backend/API must honor.
   - Evidence anchor (ports inventory contains these paths): `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-ports-files.txt`

9) `src/domains/platform/commerce/runtime.ts`
   - Why: provider selection model (mock/disabled/shopify) and current assumptions about dev vs prod execution.
   - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-runtime.ts.head.txt`

10) `src/domains/platform/content/runtime.ts`
    - Why: provider selection model for content; reveals caching needs and failure modes.
    - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-content-runtime.ts.head.txt`

11) `src/domains/platform/payments/ports/payments.ts`
12) `src/domains/platform/payments/runtime.ts`
    - Why: payments contract + provider selection (stripe/none) and how UI should consume capabilities.
    - Evidence anchors:  
      - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-payments-ports-payments.ts.head.txt`  
      - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-payments-runtime.ts.head.txt`

13) `src/domains/platform/http/internal-api/client.ts`
    - Why: standardized API client and mapping to `PortError` codes; informs backend reliability patterns.
    - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-http-internal-api-client.ts.head.txt`

14) `src/domains/platform/storage/supabase.ts`
    - Why: current Supabase access model; critical for future multi-tenant strategy.
    - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-storage-supabase.ts.head.txt`

---

## 3) Platform adapters (provider-specific knowledge)

15) `src/domains/platform/commerce/adapters/shopify/internal-api/keys.ts`
    - Why: where raw Shopify identifiers are encoded/decoded; defines the “no vendor IDs above adapters” boundary.
    - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-adapters-shopify-internal-api-keys.ts.head.txt`

16) `src/domains/platform/commerce/adapters/shopify/internal-api/index.ts`
    - Why: commerce adapter composition; shows how ports are implemented.
    - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-adapters-shopify-internal-api-index.ts.head.txt`

17) `src/domains/platform/payments/adapters/stripe/index.ts`
    - Why: stripe adapter implementation and how it talks to internal API endpoints.
    - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-payments-adapters-stripe-index.ts.head.txt`

---

## 4) Known coupling hotspots (where the plan will focus)

18) `src/ui/providers/DrawerProvider.tsx`
    - Why: contains known Shopify GID literals (vendor ID leakage) and global UI behavior.
    - Evidence anchors:  
      - file head: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-ui-providers-DrawerProvider.tsx.head.txt`  
      - repo-wide GID coupling scan: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/coupling-shopify-gid-matches.txt`

19) `src/domains/client/shop/cart/ui/pages/CheckoutHandoffPage.tsx`
    - Why: provider-specific operational copy and edge routing assumptions (checkout handoff).
    - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-client-shop-cart-ui-pages-CheckoutHandoffPage.tsx.head.txt`

20) `src/lib/product.ts`
    - Why: legacy shim around `commerce.catalog`; currently uses `variantId` naming for a `VariantKey` (semantic mismatch risk).
    - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-lib-product.ts.head.txt`

---

## Related measurement tools (docs runtime)

- `docs/.blackbox/scripts/check-vendor-leaks.sh`
  - Why: defines an enforceable “no vendor IDs above adapters” gate.
  - Evidence anchor (tool output): `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/check-vendor-leaks.txt`

---

## 5) Identity swap (optional, if auth should be swappable)

These files define where identity-provider logic (currently Clerk) lives above/below the platform boundary.

1) `src/domains/platform/auth/providers/AuthContext.impl.tsx`
   - Why: this is the concrete implementation of the platform auth context; it’s the seam we want to keep provider-local.
   - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-auth-providers-AuthContext.impl.tsx.head240.txt`

2) `src/shells/ClerkShell.tsx`
   - Why: identifies how Clerk-specific UI wrappers are composed; this is a common place for vendor SDK coupling to leak into UI layers.
   - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-shells-ClerkShell.tsx.head200.txt`
