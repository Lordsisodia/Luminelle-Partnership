# Architecture Atlas (evidence-first map)

Purpose:
- Provide a **single, navigable map** of the current repo architecture that supports the main goal of this plan:
  - **frontend is swappable**
  - **providers are swappable**
  - **scales on both ends**

Evidence rule for “current state” statements:
- Every current-state claim in this file cites a snapshot under:  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/`

---

## 1) Current repo topology (directories that matter)

- Frontend/app code lives under `src/**`.  
  Evidence (directory tree):  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-tree.maxdepth4.dirs.txt`
  Evidence (top-level entrypoints in `src/`):  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-files.maxdepth2.txt`

- Domain taxonomy lives under `src/domains/**` (product surfaces + platform seam).  
  Evidence (domain tree + domain index files):  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains.maxdepth3.dirs.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains.maxdepth3.files.txt`

- Backend boundary (Cloudflare Pages Functions) lives under `functions/**`, with the stable surface under `functions/api/**`.  
  Evidence (directory tree + route inventory):  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-tree.maxdepth4.dirs.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`
  Evidence (full functions file inventory):  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-files.find.txt`

- Legacy / alternate backend surface exists under `api/**` (route handlers that mirror the `/api/*` boundary).  
  Plan stance: treat `functions/api/**` as canonical and keep `api/**` as legacy until proven unused + removed.  
  Evidence (repo top-level + api file inventory):  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/repo-top-level.ls.txt`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-files.find.txt`
  Drift signal (normalized endpoint diff between `api/**` and `functions/api/**`):  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-vs-functions.summary.txt`

- Database migrations / schema artifacts exist under `server/**` (not part of the UI swap seam, but part of the data-layer truth).  
  Evidence (server file inventory):  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/server-files.find.txt`

- Platform “ports → runtime → adapters” pattern exists under `src/domains/platform/**`.  
  Evidence (inventories):  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-ports-files.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-runtime-files.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-adapters-files.txt`
  Evidence (full platform file inventory):  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-files.find.txt`

---

## 2) Layer map (what depends on what)

Target layering (what we want to make mechanically true):
- **Layer A: UI (swappable)**  
  - everything under `src/ui/**` and `src/domains/client/**`
  - allowed dependencies:
    - `src/domains/platform/**/ports/*` (type-level contracts)
    - `src/domains/platform/**/runtime` (capabilities + selection results)
    - `src/domains/platform/http/internal-api/*` (calls `/api/*`)
  - disallowed dependencies:
    - `src/domains/platform/**/adapters/**` (provider-specific code)

Evidence that “adapter imports from UI/client” is currently scanned (and should remain empty):
- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/boundary-adapter-imports.ui-client.rg.txt`

Evidence that “vendor SDK imports outside platform domains” are tracked (report-only; helps keep coupling intentional as UI grows):
- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/boundary-vendor-sdk-imports.nonplatform.rg.txt`

- **Layer B: Backend boundary (stable contract)**  
  - `functions/api/**` implements `/api/*` for any frontend
  - owns:
    - auth enforcement (tiered)
    - tenant resolution (host-first)
    - cache headers
    - request/response envelope stability
  Evidence that the `/api/*` surface exists and is enumerated:
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-handlers.clean.rg.txt`

- **Layer C: Platform domains (provider-pluggable)**  
  - `src/domains/platform/**`
  - ports define required capabilities, adapters implement them per provider, runtime selects provider per environment/tenant
Evidence anchors for the contracts and stable error semantics:
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-ports-primitives.ts.head.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-ports-errors.ts.head.txt`

---

## 2.1) End-to-end flows (today, evidence-anchored)

These flows are the “proof of architecture”: they show the actual swap seams:
- UI talks to platform ports (and/or internal API client)
- provider-specific details live in adapters and `/api/*` handlers

### 2.1.1 PDP: product by handle (read path)

- UI/domain logic calls the commerce catalog contract (port surface exists):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-ports-catalog.ts.head220.txt`
- Provider selection for commerce is centralized in the commerce runtime:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-runtime.ts.head.txt`
- Shopify “internal API” catalog adapter exists (provider-specific client-side code lives here, not in UI):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-adapters-shopify-internal-api-catalog.ts.head120.txt`
- Internal API client exists and is the standard way the frontend talks to `/api/*`:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-http-internal-api-client.ts.head240.txt`
- Backend `/api/storefront/product/by-handle` handler exists on Cloudflare Pages Functions:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-storefront-product-by-handle.ts.head220.txt`
- Backend Storefront helper exists (server-side provider integration seam):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-_lib-storefront.ts.head280.txt`

### 2.1.2 Cart: create + fetch (read/write path)

- Cart contract exists (port surface):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-ports-cart.ts.head220.txt`
- Shopify “internal API” cart adapter exists:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-adapters-shopify-internal-api-cart.ts.head220.txt`
- Backend cart create handler exists (`/api/storefront/cart/create`):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-storefront-cart-create.ts.head80.txt`
- Backend cart fetch handler exists (`/api/storefront/cart/fetch`):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-storefront-cart-fetch.ts.head220.txt`

### 2.1.3 Checkout: vendor-agnostic handoff (proxy/handoff seam)

- UI has explicit “checkout handoff” page(s), so we can keep checkout routing logic centralized:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-client-shop-cart-ui-pages-CheckoutHandoffPage.tsx.head.txt`
- Backend has first-party proxy routes for `/cart/c/*` and `/checkouts/*` (keeps vendor domains/routes out of UI):  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-cart-c-catchall.ts.head200.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-checkouts-catchall.ts.head200.txt`
- Proxy implementation seam exists in a shared backend helper:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-_lib-shopifyCheckoutProxy.ts.head240.txt`

### 2.1.4 Payments: intent creation behind `/api/*` (provider swap seam)

- Payments contract exists (capability-driven):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-payments-ports-payments.ts.head.txt`
- Stripe adapter exists in platform payments adapters (default seam; UI should not talk to Stripe directly for core flows):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-payments-adapters-stripe-index.ts.head.txt`
- Vendor SDK imports outside platform domains are tracked as a report (used to keep any embedded payment UI usage explicit and removable):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/boundary-vendor-sdk-imports.nonplatform.rg.txt`
- Backend payment intent create handler exists (`/api/payments/intent/create`):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-payments-intent-create.ts.head80.txt`
- Stripe secret usage is isolated in a backend helper module:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-_lib-payments-stripe.ts.head280.txt`

### 2.1.5 Identity: internal auth context (swap-friendly auth seam)

- Platform auth context exists as an internal wrapper (the seam for swapping identity providers later):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-auth-providers-AuthContext.impl.tsx.head240.txt`
- Clerk shell exists (current UI composition point for Clerk-specific boundaries):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-shells-ClerkShell.tsx.head200.txt`
- Clerk webhook exists in the backend boundary (identity provider coupling stays backend-owned):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-webhooks-clerk.ts.head80.txt`
- Vendor SDK imports outside platform domains are tracked (drives a future “Clerk only in platform/auth” cleanup):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/boundary-vendor-sdk-imports.nonplatform.rg.txt`

---

## 3) Swap points (what is interchangeable, and where)

### 3.1 Swap the frontend (UI swap)

Swapping UI should require:
- new UI consumes `/api/*` and stable DTOs
- new UI does NOT embed provider IDs (e.g., Shopify GIDs)

Evidence that vendor IDs currently leak above adapters (baseline):
- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/check-vendor-leaks.txt`

Docs that define how we make this true:
- Backend contract: `backend-boundary-contract-v1.md`
- Key mapping: `key-mapping-spec-v1.md`
- Frontend swap playbook: `frontend-swap-playbook.md`

### 3.2 Swap providers (Shopify now, Stripe/others later)

Provider swap should require:
- implementing adapters under `src/domains/platform/**/adapters/<provider>/**`
- updating runtime selection rules (tenant-aware later)
- NOT changing UI call-sites or DTO shapes

Evidence that runtime selection exists today for commerce + payments:
- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-runtime.ts.head.txt`
- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-payments-runtime.ts.head.txt`

### 3.3 Swap infrastructure providers (Cloudflare/Supabase)

This plan assumes Cloudflare (edge + `/api/*`) and Supabase (data) remain, but we keep the architecture adaptable by:
- treating `/api/*` as the stable contract regardless of where it runs
- keeping DB access behind the boundary for tenant-owned data

Evidence that Supabase appears in repo and is a coupling surface:
- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/coupling-supabase-matches.txt`

---

## 4) “Where to look first” (if you’re onboarding)

Start with the reading order:
- `START-HERE.md`

If you’re inspecting code (later, when allowed), use the minimal list:
- `inspect-first.md`
- `inspect-first-backend.md`

---

## 5) How we keep this architecture from regressing

- Acceptance gate list: `acceptance-gates.md`
- Copy/paste runbook: `acceptance-gates-runbook.md`
- One-command refresh (writes evidence under `artifacts/snapshots/`):
  - `./.blackbox/scripts/refresh-1909-all-gates.sh`
  - `./.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`
