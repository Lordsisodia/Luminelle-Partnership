# Backend Boundary Contract v1 (Cloudflare `/api/*`, frontend-swappable)

Purpose:
- Turn “frontend swappable” into an explicit, enforceable contract.
- Normalize auth + tenancy + caching behavior across `functions/api/**`.
- Provide a single source of truth for how a frontend is allowed to call the backend.

Scope:
- Cloudflare Pages Functions (`functions/api/**`) only.
- No implementation changes in this doc-only phase.

Evidence rule:
- Every “exists today” claim is backed by a snapshot in:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/`

Primary evidence anchors:
- API route inventory (current state):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`
- Fetch-style handler inventory (PagesFunction `onRequest`):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-handlers.clean.rg.txt`
- Tenancy rules (host-first, cache-safe):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/plan-tenancy-context-rules.md.head120.txt`
- Stable error semantics concept (`PortError` codes):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-ports-errors.ts.head.txt`

Related grounding docs:
- v0 contract (earlier draft): `backend-boundary-contract-v0.md`
- Endpoint↔port mapping: `api-endpoints-to-ports-map.md`

---

## 0) Non‑negotiable invariants (contract-level)

- **Frontend does not talk to vendors** (Shopify/Stripe/Supabase) directly; it only calls `/api/*`.  
  Evidence that `/api/*` exists as Cloudflare Pages Functions:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-handlers.clean.rg.txt`

- **Tenant context is resolved server-side** (host-first), and is safe for caching.  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/plan-tenancy-context-rules.md.head120.txt`

- **Errors are stable**: every endpoint maps failures into stable error codes (PortError-like), not vendor strings.  
  Evidence for codes existing: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-ports-errors.ts.head.txt`

---

## 1) Tenant + auth context (how requests are interpreted)

### 1.1 Tenant resolution (host-first)

Rule:
- Every `/api/*` request has an `effectiveHost` resolved from headers.
- Tenant is resolved from `effectiveHost`.
- Auth *restricts* permitted actions, but does not silently override host-based tenant selection.

Evidence anchor for the algorithm and cache safety:  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/plan-tenancy-context-rules.md.head120.txt`

### 1.2 Auth tiers (what kind of caller is allowed)

We intentionally define **tiers** rather than “every endpoint invents its own rules”:

- Tier `public`:
  - No auth required.
  - Must be safe to cache at edge (vary by tenant).
  - Example families: `storefront/*/sections`, product read endpoints.

- Tier `user`:
  - Requires user auth (customer).
  - Must be tenant-scoped.
  - Example families: customer orders, customer cart operations (depending on implementation).

- Tier `admin`:
  - Requires admin auth + role.
  - Must be tenant-scoped.
  - Example families: `admin/orders/*`, `admin/sections/*`, exports, metrics.

Note: mapping exact auth providers (Clerk) is an implementation detail; the contract only cares about tiers.

---

## 2) Caching rules (edge + client)

Baseline:
- Public endpoints may be edge-cached.
- Private endpoints must never be cached shared across tenants/users.
- Tenancy must be part of the cache key (implicit via hostname).

Evidence that caching is a first-class constraint in tenancy rules:  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/plan-tenancy-context-rules.md.head120.txt`

Contract requirements:
- Public endpoints MUST set `Cache-Control` explicitly.
- Private endpoints MUST set `Cache-Control: no-store` (or equivalent).
- Any endpoint that varies by auth MUST include correct `Vary` headers (`Authorization`, etc.) if caching is used.

---

## 3) Endpoint families (v1 contract)

All routes listed below are proven to exist via the route inventory snapshot:  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`

### 3.1 `GET /api/health` (Tier: public)

- Exists today:
  - `functions/api/health.ts`  
    Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-health.ts.head80.txt`
- Contract:
  - Auth: none
  - Tenancy: none required (or use it only for diagnostics)
  - Cache: `no-store`
  - Errors: never throws provider errors; returns `{ ok: true }` or `{ ok: false, code }`

### 3.2 `storefront/product/*` (Tier: public)

Routes that exist today:
- `GET /api/storefront/product/by-handle`
- `GET /api/storefront/product/sections`  
Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`

Contract:
- Auth: none
- Tenancy: required (host-first)
- Cache: edge-cacheable (short TTL); must be tenant-safe
- DTO shape:
  - Current state: provider passthrough (Shopify object shape) — product response includes Shopify IDs in the GraphQL query.  
    Evidence: `artifacts/snapshots/functions-api-storefront-product-by-handle.ts.head220.txt`
  - Target state (swappable UI): provider-neutral `ProductDetail` DTO (see `dto-and-capabilities-spec-v0.1.md`) with internal keys instead of Shopify GIDs.
  - Mapping + implementation plan:
    - `storefront-contract-dto-mapping-v0.1.md`
    - `pr-10-storefront-dto-normalization-detailed-plan.md`
- Error codes:
  - `NOT_FOUND` if handle missing
  - `UNAVAILABLE` if provider unavailable

### 3.3 `storefront/landing/sections` (Tier: public)

Route that exists today:
- `GET /api/storefront/landing/sections`  
Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`

Contract:
- Auth: none
- Tenancy: required (host-first)
- Cache: edge-cacheable (short TTL) and tenant-safe
- Error codes: `UNAVAILABLE` (provider), `UNKNOWN`

### 3.4 `storefront/cart/*` (Tier: public or user; tenant-scoped)

Routes that exist today include:
- `POST /api/storefront/cart/create`
- `GET|POST /api/storefront/cart/fetch`
- `POST /api/storefront/cart/add-lines`
- `POST /api/storefront/cart/update-line`
- `POST /api/storefront/cart/remove-lines`
- `POST /api/storefront/cart/discount-codes-update`
- `POST /api/storefront/cart/attributes-update`
- `POST /api/storefront/cart/set-buyer-identity`  
Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`

Contract:
- Auth:
  - Allowed anonymous cart operations MUST still be tenant-scoped and safe.
  - Buyer identity operations MAY require user auth (implementation choice); if so, return `INVALID_INPUT`/`UNAVAILABLE` consistently.
- Tenancy: required (host-first)
- Cache: `no-store`
- Idempotency:
  - Mutations SHOULD accept an idempotency key header for robustness.
- DTO shape:
  - Current state: provider passthrough (Shopify cart shape) — cart payload is driven by `CART_FRAGMENT` which includes Shopify IDs + `checkoutUrl`.  
    Evidence: `artifacts/snapshots/functions-_lib-storefront.ts.head280.txt`
  - Target state (swappable UI): provider-neutral `Cart` DTO with internal keys (`CartKey`, `CartLineKey`, `VariantKey`) so UIs never need Shopify cart/line/variant IDs.
  - Mapping + implementation plan:
    - `storefront-contract-dto-mapping-v0.1.md`
    - `pr-10-storefront-dto-normalization-detailed-plan.md`
- Error codes:
  - `INVALID_INPUT` for malformed requests
  - `NOT_FOUND` for missing cart/line
  - `RATE_LIMITED` for provider throttling

### 3.5 `payments/*` (Tier: user or public; tenant-scoped)

Route that exists today:
- `POST /api/payments/intent/create`  
Evidence:
- Route inventory: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`
- Endpoint head: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-payments-intent-create.ts.head80.txt`

Contract:
- Auth: required if the payment is tied to a user identity; otherwise must still be tenant-scoped.
- Tenancy: required (host-first)
- Cache: `no-store`
- Error codes:
  - `NOT_CONFIGURED` if provider not wired
  - `UNAVAILABLE` if provider cannot create intent

### 3.6 `customer/*` and `customer-auth/*` (Tier: user)

Routes that exist today:
- `GET /api/customer/orders`
- `GET /api/customer/order`
- `customer-auth/start`, `callback`, `logout`  
Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`

Contract:
- Auth: required
- Tenancy: required (host-first + auth restrict)
- Cache: `no-store`
- Error codes:
  - `NOT_FOUND` if order missing
  - `UNAVAILABLE` for provider outage

### 3.7 `admin/*`, `exports/*`, `metrics/*` (Tier: admin)

Routes that exist today include:
- `admin/orders/get`, `admin/orders/list`
- `admin/sections/get`, `admin/sections/update`
- `exports/orders`, `exports/customers`
- `metrics/*`  
Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`

Contract:
- Auth: required + admin role
- Tenancy: required (host-first + auth restrict)
- Cache: `no-store` (unless explicitly per-user/per-tenant and safe)
- Error codes:
  - `RATE_LIMITED` for throttling
  - `UNAVAILABLE` for provider/Supabase outage

### 3.8 `shopify/*` and `shopify/webhooks/*` (Tier: backend-only integration)

Routes that exist today include:
- `shopify/auth`, `shopify/auth/callback`, `shopify/session`, `shopify/ping`
- `shopify/webhooks/*`  
Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`

Contract:
- Not a general frontend contract; these are provider integration endpoints.
- Auth: shared secret / signature verification (implementation detail)
- Tenancy: may be inferred from Shopify payload/store (implementation detail), but must map to a tenant deterministically.
- Cache: `no-store`

### 3.9 `experiment/config` + `experiment/track` (Tier: public; mixed cache)

Routes that exist today include:
- `GET /api/experiment/config`
- `POST /api/experiment/track`  
Evidence:
- Route inventory: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`
- Endpoint heads:
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-experiment-config.ts.head220.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-experiment-track.ts.head220.txt`

Contract:
- `experiment/config`
  - Auth: none
  - Tenancy: required (host-first; allows per-tenant experiment config)
  - Cache: **edge-cacheable** (tenant-safe); SHOULD use `ETag` and MUST set `Cache-Control` explicitly
- `experiment/track`
  - Auth: none (may accept anon_id/session_id); MUST still be tenant-scoped
  - Tenancy: required (host-first; ensures events attribute to the correct tenant)
  - Cache: `no-store` (event ingest; never edge-cache)

---

## 4) Enforceability (how we keep the contract true)

Acceptance gates (CLI) exist and are designed to prevent boundary erosion:
- Gate runbook: `acceptance-gates-runbook.md`
- Vendor leak baseline (must drive to zero in implementation phase):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/check-vendor-leaks.txt`
