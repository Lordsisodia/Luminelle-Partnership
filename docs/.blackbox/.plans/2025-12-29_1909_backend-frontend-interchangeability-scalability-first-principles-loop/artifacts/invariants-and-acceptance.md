# Invariants + Acceptance Checks (first principles)

This file answers: “what must always be true?” and “how do we know we achieved it?”

All checks are designed to be measurable with code-level evidence.

Evidence rule for this loop:
- Every “current state” claim or enforcement gate references a saved command output under:
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/`

---

## Invariant 1 — Frontend is swappable

Definition:
- You can replace the current React SPA/SSR frontend with a different UI (another SPA, SSR app, mobile app, admin tool) without rewriting vendor integration logic.

Acceptance checks:
- A “frontend boundary contract” exists and is stable:
  - Preferred: same-origin `/api/*` contract implemented at the Cloudflare edge.
  - Align endpoints to existing platform ports:
    - Commerce, Content/CMS, Payments ports exist (inventory evidence):  
      `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-ports-files.txt`
- Frontend code does not import provider adapters directly:
  - No imports of `@platform/.../adapters` anywhere in `src` (enforcement scan; should be empty):  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/boundary-adapter-imports.rg.txt`
  - No direct imports of `domains/platform/.../adapters` from `src/ui` or `src/domains/client` (enforcement scan; should be empty):  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/boundary-adapter-imports.ui-client.rg.txt`
- Frontend does not embed provider identifiers:
  - Measurable gate: the vendor leak checker output becomes “clean” (Phase 1 implementation target):  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/check-vendor-leaks.txt`
  - Additional coupling evidence (current leaks/mentions; informative, not a passing gate):  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/coupling-shopify-gid-matches.txt`
- Vendor SDK imports outside platform domains are visible and kept intentional:
  - Baseline report (report-only today; used to drive isolation over time):  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/boundary-vendor-sdk-imports.nonplatform.rg.txt`

Primary sources:
- Ports inventory (contains the above paths):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-ports-files.txt`
- Vendor leak checker run output:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/check-vendor-leaks.txt`

---

## Invariant 2 — Backend remains stable while UI changes

Definition:
- Provider-specific mapping, auth verification, tenancy resolution, and data model stability live behind the backend boundary.

Acceptance checks:
- Provider selection is centralized and does not require UI branching:
  - Provider selection exists in runtime modules (inventory evidence):  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-runtime-files.txt`
  - Runtime file heads (evidence anchors for how selection is implemented today):  
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-runtime.ts.head.txt`  
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-content-runtime.ts.head.txt`  
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-payments-runtime.ts.head.txt`
- Error semantics are standardized across providers:
  - `PortError` is used at the boundary and maps failure cases to stable codes.
  - Evidence anchor (type + codes):  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-ports-errors.ts.head.txt`

---

## Invariant 2b — Single canonical backend boundary (avoid drift between `functions/` and `api/`)

Definition:
- There is exactly one canonical implementation of the `/api/*` contract used by any frontend (present and future).

Current state evidence (why this matters):
- The repo currently contains **both**:
  - Cloudflare Pages Functions under `functions/**` (canonical in this plan)
  - a parallel route tree under `api/**` (legacy / alternate shape)
- If both evolve, the contract will drift and “frontend swappable” becomes ambiguous.
Evidence anchors:
- Repo top-level (shows both `functions/` and `api/` exist):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/repo-top-level.ls.txt`
- Legacy `api/**` inventory (shows parallel route families exist):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-files.find.txt`
- Canonical `/api/*` inventory (functions surface tracked by this plan):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`

Acceptance checks (docs-only now; enforce during implementation):
- Canonical boundary for this architecture remains: `functions/api/**`.
- No new feature work is added under `api/**` (treat as frozen legacy).
- Eventually: `api/**` is deleted or archived once deployment no longer depends on it.
- Drift is visible and shrinking over time:
  - `api-vs-functions.summary.txt` (auto-refreshed via `refresh-1909-all-gates.sh`) is the quantified signal.  
    Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-vs-functions.summary.txt`

---

## Invariant 3 — Multi-tenant ready (even if single-tenant today)

Definition:
- Every request can be associated with a tenant context without relying on “global env vars”.

Acceptance checks (design-level now; enforcement later):
- A tenancy model is defined:
  - `tenant` identity (brand/client/org vs store/domain) and resolution rules.
  - storage model: `tenants`, `tenant_domains`, `tenant_integrations`.
- Tenant context is resolved server-side (Cloudflare edge / backend) and passed to ports/adapters.
- Data isolation strategy is defined:
  - `tenant_id` on tenant-owned rows
  - RLS policies + backend enforcement strategy (service role vs user token)

Primary sources for current state:
- Supabase storage client module head (evidence anchor):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-storage-supabase.ts.head.txt`
- Current repo-wide Supabase coupling scan (informative):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/coupling-supabase-matches.txt`

---

## Invariant 4 — Scalability (frontend + backend)

Definition:
- The system scales in cost/performance at both ends:
  - frontend (bundles, caching, routing, resilience)
  - backend (edge compute, caching, DB load, provider rate limits)

Acceptance checks (plan-level now; measurable later):
- Frontend:
  - Routes remain code-split (evidence anchor for current lazy-load pattern):  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-App.tsx.head.txt`
  - Root boot + provider tree is explicitly tracked via snapshots (evidence anchors):  
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-main.tsx.head.txt`  
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-router.tsx.head.txt`
- Backend:
  - A caching strategy exists:
    - edge cache for public content (landing sections, product pages)
    - short-lived caching for provider API calls and Supabase reads
  - Provider rate-limit failures map to stable errors (`PortErrorCode.RATE_LIMITED`):
    - Evidence anchor:  
      `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-http-internal-api-client.ts.head.txt`

---

## Invariant 5 — Security and operability

Definition:
- The system is diagnosable, safe, and avoids leaking secrets into the frontend.

Acceptance checks:
- Vendor secrets never appear in browser code.
- Backend boundary verifies identity (Clerk) and enforces tenant scoping before DB access.
- Admin paths are guarded (exists today): `src/App.tsx` uses `AdminGuard` and `AdminShell`.

Primary sources:
- Clerk boot/provider evidence anchor:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-main.tsx.head.txt`
- Error mapping evidence anchor:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-http-internal-api-client.ts.head.txt`
- Admin routes/guards evidence anchor:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-App.tsx.head.txt`
