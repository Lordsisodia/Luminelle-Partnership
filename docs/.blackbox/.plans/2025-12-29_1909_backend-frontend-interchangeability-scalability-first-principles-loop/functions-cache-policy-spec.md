# Functions Cache Policy Spec (edge + client correctness)

Goal:
- Make caching behavior explicit and safe across `/api/*`.
- Avoid accidental shared caching across tenants or authenticated users.

Evidence anchors:
- Contract v1 requires explicit cache rules per endpoint family:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/backend-boundary-contract-v1.md`
- Gap scan indicates several public endpoints likely lack explicit cache headers (heuristic):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/contract-gaps-report-v1.1.md`
- Response helper provides cache helpers (`jsonTenantPublic`, `jsonNoStore`, `notModifiedTenantPublic`):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-_lib-response.ts.head160.txt`
- Experiment config already uses ETag (cache-related):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-cache-cues.rg.txt`

---

## 1) Cache classes (v1)

Define three cache classes; each endpoint family must choose one:

- `no-store` (private)
  - For anything user/admin/integration scoped.
  - Required headers:
    - `Cache-Control: no-store`
    - `Vary: Authorization` if auth is used (defense-in-depth)

- `tenant-public` (public; tenant-scoped)
  - For endpoints safe to serve publicly but vary by tenant (host).
  - Required headers:
    - `Cache-Control: public, s-maxage=<ttl>, max-age=<ttl>`
    - `Vary: Host` (or ensure Cloudflare’s cache key uses hostname; be explicit for safety)
  - Optional:
    - `ETag` for conditional requests if content is stable

- `public-non-tenant` (rare)
  - For endpoints not tenant-specific (e.g. global health, static config).
  - Usually still `no-store` unless there is a strong reason.

---

## 2) Default cache policy by endpoint family (v1)

Based on the current route inventory:  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`

- `health`:
  - cache: `no-store`
- `storefront/product/*`, `storefront/landing/sections`:
  - cache: `tenant-public` (short TTL)
- `experiment/config`:
  - cache: `tenant-public` or `public-non-tenant` depending on whether experiments vary by tenant
  - allow ETag/304
- `experiment/track`:
  - cache: `no-store` (event ingest; never edge-cache)
- `storefront/cart/*`, `payments/*`, `customer/*`, `customer-auth/*`:
  - cache: `no-store`
- `admin/*`, `exports/*`, `metrics/*`:
  - cache: `no-store`
- `shopify/*` and `webhooks/*`:
  - cache: `no-store`

---

## 3) Where to implement cache helpers

Implemented in:
- `functions/_lib/response.ts` (extended)

Rationale:
- Central helpers reduce copy/paste and make enforcement feasible.  
  Evidence that response helper exists already:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-_lib-response.ts.head160.txt`

Proposed helpers:
- `jsonNoStore(data, init?)`
- `jsonTenantPublic(data, { ttlSeconds, etag? }, init?)`

---

## 4) Acceptance checks (implementation phase)

- Every endpoint response sets an explicit cache policy (no implicit defaults).
- Any endpoint that is tenant-public varies by tenant host (explicitly or implicitly).
- Any endpoint that depends on auth is never shared cached.
