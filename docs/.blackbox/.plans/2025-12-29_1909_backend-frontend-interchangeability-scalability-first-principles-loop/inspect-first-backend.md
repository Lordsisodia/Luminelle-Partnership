# Inspect First (backend boundary: `functions/` + why)

This is the minimal backend inspection set that lets us understand:
- what the canonical `/api/*` boundary is (Cloudflare Pages Functions)
- how auth, tenancy, caching, and provider calls are enforced server-side
- how checkout proxy/handoff works (so UI stays vendor-agnostic)
- where legacy `api/**` drift still exists (and what must migrate first)

Evidence rule for this loop:
- Every “why” statement below anchors to a saved snapshot under:
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/`

---

## 1) Boundary surface (what any frontend talks to)

1) `functions/api/health.ts`
   - Why: proves the Pages Functions runtime is alive; also a safe place to standardize response headers (requestId, cache rules).
   - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-health.ts.head80.txt`

2) `functions/api/shopify/auth.ts`
   - Why: shows the “Shopify-connected backend” entrypoint and what the backend expects from the shop install flow.
   - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-shopify-auth.ts.head80.txt`

3) `functions/api/shopify/auth/callback.ts`
   - Why: shows the canonical OAuth callback and what the backend registers/initializes (webhooks, integration config).
   - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-shopify-auth-callback.ts.head240.txt`

---

## 2) Storefront “thin slice” endpoints (PDP + cart)

4) `functions/api/storefront/product/by-handle.ts`
   - Why: defines the PDP read contract; informs caching policy and DTO shape.
   - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-storefront-product-by-handle.ts.head220.txt`

5) `functions/api/storefront/cart/create.ts`
   - Why: establishes the cart session boundary and the canonical cart identifier shape.
   - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-storefront-cart-create.ts.head80.txt`

6) `functions/api/storefront/cart/fetch.ts`
   - Why: shows “cart read” behavior (auth vs public), error mapping, and cache rules for cart endpoints.
   - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-storefront-cart-fetch.ts.head220.txt`

7) `functions/_lib/storefront.ts`
   - Why: centralizes Storefront interactions; should be the only place that knows Shopify GraphQL details server-side.
   - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-_lib-storefront.ts.head280.txt`

---

## 3) Checkout proxy/handoff (critical for UI swap)

8) `functions/cart/c/[[catchall]].ts`
   - Why: first-party proxy for cart handoff routes; keeps vendor hostnames/routes out of UI.
   - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-cart-c-catchall.ts.head200.txt`

9) `functions/checkouts/[[catchall]].ts`
   - Why: first-party proxy for `/checkouts/*`; prevents UI from depending on Shopify checkout domains.
   - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-checkouts-catchall.ts.head200.txt`

10) `functions/_lib/shopifyCheckoutProxy.ts`
   - Why: the shared implementation that should own vendor-specific redirect/proxy logic.
   - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-_lib-shopifyCheckoutProxy.ts.head240.txt`

---

## 4) Payments boundary (Stripe now, swap later)

11) `functions/api/payments/intent/create.ts`
   - Why: canonical payment initialization endpoint; owns Stripe secret usage and error mapping behind `/api/*`.
   - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-payments-intent-create.ts.head220.txt`

12) `functions/_lib/payments/stripe.ts`
   - Why: isolates Stripe SDK calls + secret handling; should be swap-able later.
   - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-_lib-payments-stripe.ts.head280.txt`

---

## 5) Cross-cutting enforcement (auth, response helpers, DB)

13) `functions/_lib/internalAuth.ts`
   - Why: integration/admin auth enforcement must be centralized or the contract will drift across endpoints.
   - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-_lib-internalAuth.ts.head280.txt`

14) `functions/_lib/response.ts`
   - Why: response envelope helpers are where cache headers + requestId conventions should live.
   - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-_lib-response.ts.head160.txt`

15) `functions/_lib/supabase.ts`
   - Why: service-role Supabase access is the default posture for tenant-owned data; this module is the seam.
   - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-_lib-supabase.ts.head280.txt`

---

## 6) Webhooks (provider events stay backend-owned)

16) `functions/_lib/webhooks.ts`
   - Why: shared webhook parsing/verification is a common “must centralize” seam.
   - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-_lib-webhooks.ts.head220.txt`

17) `functions/_lib/shopifyWebhooks.ts`
   - Why: Shopify HMAC verification and topic routing should be backend-owned (never UI-owned).
   - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-_lib-shopifyWebhooks.ts.head280.txt`

18) `functions/api/shopify/webhooks/orders-create.ts`
   - Why: representative “webhook handler family member”; use this to pattern-match other topics for auth/caching conventions.
   - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-shopify-webhooks-orders-create.ts.head220.txt`

19) `functions/api/webhooks/clerk.ts`
   - Why: identity provider coupling lives here; keeping it backend-owned preserves frontend swap-ability.
   - Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-webhooks-clerk.ts.head80.txt`

---

## 7) Legacy drift hotspots (must reconcile before claiming “single canonical boundary”)

20) Drift summary (quantified):
   - `api/**` vs `functions/api/**` endpoint diff.  
   - Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-vs-functions.summary.txt`

21) High-priority `api/**` endpoints that must migrate (called by current UI):
   - `api/newsletter/subscribe.ts`
   - `api/cloudinary/sign.ts`
   - Evidence (why they’re prioritized): `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt`
   - Evidence anchors (legacy handler behavior):
     - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-newsletter-subscribe.ts.head260.txt`
     - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-cloudinary-sign.ts.head260.txt`

