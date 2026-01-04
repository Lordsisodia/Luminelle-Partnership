# `/api/*` Endpoints → Platform Ports Map (contract grounding)

Purpose:
- Make the “stable backend boundary” concrete by mapping **what exists today** in `functions/api/**` to the platform port surface in `src/domains/platform/**`.
- This is the bridge between “frontend swappable” and “backend swappable”: a new frontend can implement against `/api/*` + ports without importing Shopify/Stripe/Clerk directly.

Evidence rule:
- Every “exists today” statement cites an evidence snapshot under:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/`

Scope note (important):
- This mapping is for the **canonical Cloudflare boundary** under `functions/api/**`.
- The repo also contains a legacy/alternate endpoint surface under `api/**`; those endpoints are intentionally excluded from this mapping until they are migrated.  
  Evidence (drift summary + api-only list):  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-vs-functions.summary.txt`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-only-endpoints.txt`

Primary evidence:
- Current route inventory:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`
- Current handler inventory (Fetch-style PagesFunction):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-handlers.clean.rg.txt`

Port surface evidence:
- Commerce ports:
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-ports-cart.ts.head220.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-ports-catalog.ts.head220.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-ports-checkout.ts.head260.txt`
- Payments port:
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-payments-ports-payments.ts.head.txt`
- Content/CMS sections ports:
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-content-ports-sections.ts.head240.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-cms-ports-sections.ts.head240.txt`

---

## 1) Storefront commerce (`/api/storefront/*`) → `@platform/commerce`

Endpoints that exist today (inventory evidence):
- `functions/api/storefront/cart/create.ts`
- `functions/api/storefront/cart/fetch.ts`
- `functions/api/storefront/cart/add-lines.ts`
- `functions/api/storefront/cart/update-line.ts`
- `functions/api/storefront/cart/remove-lines.ts`
- `functions/api/storefront/cart/discount-codes-update.ts`
- `functions/api/storefront/cart/attributes-update.ts`
- `functions/api/storefront/cart/set-buyer-identity.ts`  
Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`

Port mapping (intended contract alignment):
- Cart creation / retrieval:
  - `/api/storefront/cart/create` → `CartPort.getCart()` (or a dedicated `createCart()` if introduced later)
  - `/api/storefront/cart/fetch` → `CartPort.getCart()`
  Evidence that `CartPort` exists: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-ports-cart.ts.head220.txt`
- Cart mutation:
  - `/api/storefront/cart/add-lines` → `CartPort.addLine()`
  - `/api/storefront/cart/update-line` → `CartPort.updateLine()`
  - `/api/storefront/cart/remove-lines` → `CartPort.removeLine()`
  Evidence that the mutation methods exist: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-ports-cart.ts.head220.txt`
- Discounts / buyer identity:
  - `/api/storefront/cart/discount-codes-update` → `CartPort.updateDiscountCodes()` (or similar; exact mapping depends on the port shape)
  - `/api/storefront/cart/set-buyer-identity` → `CartPort.setBuyerIdentity()` (or similar; exact mapping depends on the port shape)
  Evidence anchor for “checkout/buyer identity capabilities exist”: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-ports-checkout.ts.head260.txt`

Product reads:
- Endpoints that exist today:
  - `functions/api/storefront/product/by-handle.ts`
  - `functions/api/storefront/product/sections.ts`
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`
- Port mapping:
  - `/api/storefront/product/by-handle` → `CatalogPort.getProductByHandle(handle)`
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-ports-catalog.ts.head220.txt`

---

## 2) Payments (`/api/payments/*`) → `@platform/payments`

Endpoint that exists today:
- `functions/api/payments/intent/create.ts`  
Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`

Port mapping:
- `/api/payments/intent/create` → `PaymentsPort.beginPayment(input)` (embedded flow)
  - Evidence that `PaymentsPort.beginPayment` exists:  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-payments-ports-payments.ts.head.txt`
  - Evidence that Stripe adapter calls this endpoint via internal API client:  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-payments-adapters-stripe-index.ts.head.txt`

---

## 3) Content sections (`/api/storefront/*/sections`) → `@platform/content` and/or `@platform/cms`

Endpoints that exist today:
- `functions/api/storefront/landing/sections.ts`
- `functions/api/storefront/product/sections.ts`  
Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`

Port mapping:
- `/api/storefront/landing/sections` → `SectionsPort.getLandingSections(...)` (exact naming per port)
- `/api/storefront/product/sections` → `SectionsPort.getProductSections(...)` (exact naming per port)
Evidence that a content sections port exists:  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-content-ports-sections.ts.head240.txt`

Admin CMS endpoints that exist today:
- `functions/api/admin/sections/get.ts`
- `functions/api/admin/sections/update.ts`  
Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`

Port mapping:
- `/api/admin/sections/get` → CMS section read (admin-side)
- `/api/admin/sections/update` → CMS section write (admin-side)
Evidence that a CMS sections port exists:  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-cms-ports-sections.ts.head240.txt`

---

## 4) Customer auth (`/api/customer-auth/*`) → auth boundary

Endpoints that exist today:
- `functions/api/customer-auth/start.ts`
- `functions/api/customer-auth/callback.ts`
- `functions/api/customer-auth/logout.ts`  
Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`

Contract notes (design intent):
- This family should become “frontend-agnostic auth” APIs so a new frontend doesn’t hardcode Clerk flows.
- Current existence is proven by route inventory; detailed semantics should be documented in the boundary contract v1.
Evidence that tenancy/auth are expected to be handled at the boundary:  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/plan-backend-boundary-contract-v1.md.head120.txt`

---

## 5) Shopify app + webhooks (`/api/shopify/*`) → provider integration surface (backend-only)

Endpoints that exist today:
- Auth/session/ping:
  - `functions/api/shopify/auth.ts`
  - `functions/api/shopify/auth/callback.ts`
  - `functions/api/shopify/session.ts`
  - `functions/api/shopify/ping.ts`
- Webhooks:
  - `functions/api/shopify/webhooks/*` (multiple)  
Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`

Contract notes (design intent):
- These endpoints are “provider plumbing” and should not be called by a general-purpose frontend.
- If we ever swap commerce providers, these endpoints become provider-specific modules (Shopify integration adapter).
Evidence that Shopify is currently the commerce adapter:  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-adapters-files.txt`

---

## 6) Admin orders + exports + metrics (`/api/admin/*`, `/api/exports/*`, `/api/metrics/*`)

Endpoints that exist today:
- Admin orders:
  - `functions/api/admin/orders/get.ts`
  - `functions/api/admin/orders/list.ts`
- Exports:
  - `functions/api/exports/orders.ts`
  - `functions/api/exports/customers.ts`
- Metrics:
  - `functions/api/metrics/*` (multiple)  
Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`

Contract notes (design intent):
- These should be tenant-scoped, and their data sources should be swappable (Shopify vs other commerce, Supabase analytics tables vs external warehouse).
Evidence that tenancy is expected to be cache-safe and backend-resolved:  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/plan-tenancy-context-rules.md.head120.txt`
