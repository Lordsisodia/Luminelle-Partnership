# Prompt 4 — Scalability Plan (edge/UI + backend/data)

This is a docs-only plan for scaling:
1) **Frontend / edge delivery** (Cloudflare + UI)
2) **Backend boundary** (BFF/API + provider adapters)
3) **Data layer** (Supabase, tenancy readiness, isolation)

All “current state” claims cite either:
- a code file path, or
- a saved command output under `artifacts/snapshots/`

Key evidence snapshots for current state:
- Boot + composition:  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-main.tsx.head.txt`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-router.tsx.head.txt`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-App.tsx.head.txt`
- Platform boundary inventories:  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-ports-files.txt`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-runtime-files.txt`
- Coupling evidence (vendor mentions):  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/coupling-shopify-gid-matches.txt`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/coupling-shopify-word-matches.txt`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/coupling-supabase-matches.txt`
  - Vendor SDK imports outside platform domains (report-only coupling signal):  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/boundary-vendor-sdk-imports.nonplatform.rg.txt`

---

## 0) First principles: what “scaling” means here

Scaling is not only “handle more traffic”; it’s:
- keep p95 latency predictable under load
- keep costs predictable (Cloudflare/Supabase/Shopify/Stripe)
- avoid cascading failures (rate limits, DB spikes)
- keep architecture maintainable while adding tenants and swapping UIs

This plan assumes:
- Cloudflare serves the frontend and hosts the backend boundary (`/api/*`).
- Shopify remains commerce provider today.
- Supabase remains the database.

---

## 1) Frontend + Edge delivery scalability (Cloudflare + UI)

### 1.1 Keep the global provider tree minimal and stable

Current state evidence:
- The router-level provider tree wraps the entire app in Cart/Auth/Drawer providers.  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-router.tsx.head.txt`

Plan:
- Treat everything in the root provider tree as “tax paid by every route”.
- Move expensive/rare concerns out of the global tree (into route-level providers) when feasible.

Acceptance checks:
- The number of always-on providers does not grow without justification (tracked in `src/router.tsx`).  
  Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-router.tsx.head.txt`

### 1.2 Maintain route-level code splitting

Current state evidence:
- `src/App.tsx` uses `lazy()` + `Suspense` for route splitting.  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-App.tsx.head.txt`

Plan:
- Keep routes as the primary splitting boundary (do not regress into monolithic bundles).
- Isolate “admin” and “dev tools” UI so storefront bundles remain small.

Acceptance checks:
- `src/App.tsx` continues to lazy-load major pages (storefront, admin, account).  
  Evidence anchor: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-App.tsx.head.txt`

### 1.3 Edge caching strategy (public, anonymous content)

Principle:
- Public, read-mostly content should be cached at the edge aggressively, with explicit invalidation rules.

Targets:
- Landing sections / CMS content
- Product pages and product metadata (handle-based)

How to keep the frontend swappable:
- Cache based on `/api/*` responses, not on UI routes.
- UI becomes a consumer; caching lives in the edge/API layer.

Acceptance checks:
- A documented cache policy exists per `/api/*` endpoint (TTL, stale-while-revalidate, purge mechanism).
- Cache headers are set by the backend boundary (not by the UI).

---

## 2) Backend boundary scalability (BFF/API)

The backend boundary contract is defined in:
- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/backend-boundary-contract-v1.md`

Historical context:
- Earlier draft (superseded): `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/backend-boundary-contract-v0.md`

### 2.1 Concurrency and backpressure

First principle:
- Provider rate limits and DB contention are the “real” bottlenecks; backend must absorb load with caching + backpressure.

Plan:
- Add request-level concurrency limits per provider (Shopify, Supabase, Stripe).
- Prefer early returns from cache for GETs.
- For write endpoints (cart/payment), apply idempotency keys and retries only where safe.

Acceptance checks:
- Rate limit failures map to stable errors, not random exceptions.
  - Evidence for a standardized error model in code:  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-ports-errors.ts.head.txt`
  - Evidence for rate-limit classification mapping:  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-http-internal-api-client.ts.head.txt`

### 2.2 Error semantics and resiliency

Current state evidence:
- There is a standard `PortError` code system.  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-ports-errors.ts.head.txt`
- There is an internal API client that maps HTTP status to PortError codes (e.g., 429 → RATE_LIMITED).  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-http-internal-api-client.ts.head.txt`

Plan:
- Every `/api/*` endpoint should:
  - return predictable JSON error shapes
  - include stable error codes (mirroring `PortErrorCode`)
  - include `requestId` and tenant context (non-PII) for debugging

Acceptance checks:
- A frontend swap can implement a universal error handler based on codes.
- Logs show code + route + tenant for every failed request.

### 2.3 Caching layers (edge + server + provider)

Three layers to consider:
1) Edge cache (Cloudflare)
2) Server cache (in-memory per isolate; short-lived)
3) Provider cache (Shopify/Supabase caching characteristics)

Plan:
- Define which layer owns each endpoint:
  - public GETs: edge cache
  - authenticated GETs: server cache (short TTL) + supabase indexing
  - writes: no caching; idempotency keys

Acceptance checks:
- Every `/api/*` endpoint has a declared caching stance: `public cacheable`, `private cacheable`, `no-store`.

---

## 3) Supabase scalability + tenancy readiness

### 3.1 Prefer a backend-first data access model

First principle:
- If you want a swappable frontend, avoid embedding DB access patterns and RLS logic in the UI.

Current state evidence:
- Supabase is used in the repo and appears in many places.  
  Evidence scan: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/coupling-supabase-matches.txt`

Plan:
- Make the BFF the primary way to access Supabase for tenant-owned data.
- Keep direct Supabase-from-frontend usage only for:
  - specific realtime needs, or
  - explicitly “client-owned” resources, and treat it as a controlled exception.

Acceptance checks:
- A list of “allowed direct Supabase calls” exists and is reviewed (paths + justification).
- New features default to `/api/*` rather than direct Supabase imports.

### 3.2 Data modeling for multitenancy (future, but design now)

Plan:
- Add `tenant_id` to tenant-owned tables.
- Add tenant config tables:
  - `tenants`
  - `tenant_domains`
  - `tenant_integrations`

Evidence that this direction is already planned:
- Excerpt pinned into this plan (self-contained evidence):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-supabase-multitenancy-decoupled-backend.md.head220.txt`

Acceptance checks:
- Every tenant-owned table has `tenant_id` and indexes that include `tenant_id`.
- Cross-tenant reads are impossible under RLS (when enabled).

### 3.3 RLS strategy (two-mode, staged)

Two viable modes:
- Service-role backend with server-side enforcement (default for swappable frontends)
- User-token + RLS for specific direct client reads

Plan:
- Start with “backend enforces tenant” to reduce frontend coupling.
- Add RLS to harden isolation as you introduce tenant #2.

Acceptance checks:
- A single “tenant resolution mechanism” exists server-side (host/auth).
- A second tenant cannot read/write another tenant’s rows in staging tests.

---

## 4) Measurable guardrails (to prevent regressions)

### 4.1 Vendor ID leakage gate

Evidence:
- Current vendor leak scan output is captured here:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/check-vendor-leaks.txt`

Plan:
- Enforce “no vendor IDs above adapters” once the code changes happen:
  - `docs/.blackbox/scripts/check-vendor-leaks.sh --fail`

### 4.2 Adapter import boundary gate

Evidence:
- Current scan is empty (good):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/boundary-adapter-imports.txt`

Plan:
- Keep it empty by policy (and later lint enforcement if desired).

### 4.3 Vendor SDK import drift gate (report-only)

Evidence:
- Current vendor SDK imports outside platform domains (baseline report):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/boundary-vendor-sdk-imports.nonplatform.rg.txt`

Plan:
- Keep vendor SDK imports rare and intentional:
  - identity UI is allowed
  - embedded flows must be capability/flag gated
  - prefer redirect-based flows for swappable providers when possible

---

## 5) Next prompt (Prompt 5)

Decide and document tenancy resolution as a concrete rule set:
- host-based for storefront, auth-based for admin, with explicit fallbacks.

Then update the backend boundary contract v0 to include:
- tenant context propagation requirements
- caching headers per endpoint class
