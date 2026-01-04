# PR 3 — Tenant Resolution Wiring (detailed plan)

Scope: **plan-only** (no `src/` or `functions/` changes in this PR doc).

This PR is the “tenant correctness” stop-point: it makes tenancy **explicit and uniform** across the `/api/*` surface so:
- a frontend swap does not require re‑implementing tenancy logic, and
- caching can be safe (no cross-tenant leaks).

---

## Why PR 3 exists (first principles)

Tenancy cannot be a UI concern if the UI is meant to be swappable.
- The tenant key must be derivable from **server-side inputs** (Host) and propagated behind the backend boundary.
  - Contract requirement: `backend-boundary-contract-v1.md`
  - Tenancy rules: `tenancy-context-rules.md`

Evidence that tenant cues are currently missing across most endpoint families (heuristic):
- `contract-gaps-report-v1.1.md` (section C)

Evidence of the “current `/api/*` surface” that PR 3 will touch:
- Endpoint inventory: `artifacts/snapshots/functions-api-files.clean.find.txt`
- “PR3 tenant-scoped endpoint list” (derived): `artifacts/snapshots/pr3-tenant-scoped-endpoints.list.txt`

---

## Target outcome (PR 3 acceptance checks)

After the implementation PR (not this doc) lands:

- Tenant resolution is invoked once per request for every endpoint in scope.
  - Spec to follow: `functions-tenant-resolution-spec.md`

- `contract-gaps-report-v1.1.md` section **C** should drop to only the integration families that are intentionally excluded from host-first tenant resolution:
  - Expect to still see:
    - `shopify/**` (until PR 6: tenant integration lookup)
    - `webhooks/**` (until provider→tenant mapping is implemented)
  - All other families (storefront/customer/payments/admin/metrics/orders/exports/experiment) should no longer appear in section C.

- Tenant resolution remains cache-safe:
  - Host-first, auth restricts (intersection) — no “silent tenant switching”.
  - Rule source: `tenancy-context-rules.md`

---

## Implementation constraints (keep PR small and safe)

PR 3 is “wiring + propagation”, not “full multitenant DB”.
- In the roadmap, Supabase tenancy tables land later (PR 5) and integration config lookup lands in PR 6:
  - `pr-by-pr-stop-points-plan.md`

So PR 3 should:
- add/standardize the *call-sites* of tenant resolution everywhere, and
- return a valid **fallback tenant** in single-tenant mode (so behavior doesn’t break),
- without requiring tenant tables to exist yet.

---

## Scope: exact endpoints to wire tenant context into

Canonical scope list (generated from the live route inventory, excluding integration endpoints):
- `artifacts/snapshots/pr3-tenant-scoped-endpoints.list.txt`

That list currently includes 36 files across:
- `storefront/**`
- `payments/**`
- `customer/**` and `customer-auth/**`
- `admin/**`, `metrics/**`, `exports/**`, `orders/**`
- `experiment/**`

Intentionally excluded (for later PRs):
- `functions/api/health.ts` (not tenant-scoped)
- `functions/api/shopify/**` and `functions/api/shopify/webhooks/**` (provider plumbing; tenant mapping requires `tenant_integrations`)
- `functions/api/webhooks/**` (provider webhooks; tenant mapping requires provider→tenant lookup)

Evidence for exclusions:
- Route inventory: `artifacts/snapshots/functions-api-files.clean.find.txt`
- Contract notes about Shopify/webhooks: `backend-boundary-contract-v1.md`

---

## Mechanism: how tenant resolution should work in PR 3

### 1) Create/standardize a single helper

Helper file (planned in PR 1):
- `functions/_lib/tenant.ts`

Helper function (must contain “tenant” in the name so the cue scan can enforce wiring):
- `resolveTenantContext(request, env)`

Spec source:
- `functions-tenant-resolution-spec.md`

### 2) Minimal behavior in single-tenant mode (pre‑PR5)

Because PR 5 (tenancy tables) hasn’t landed yet, PR 3 should use:
- `effectiveHost` parsing + normalization (for cache safety and future lookup), and
- a “default tenant” fallback that keeps current behavior unchanged.

This satisfies:
- the contract invariants (tenant context exists per request),
- and keeps production stable until tenant tables exist.

Guiding rule:
- a missing/unknown host in production must not silently map to a real tenant (use `mode='fallback'`).
  - Source: `functions-tenant-resolution-spec.md`

### 3) Propagation: where tenant context must be threaded

For every endpoint in scope:
- call `resolveTenantContext(...)` at the top of the handler
- pass tenant context into:
  - provider calls (Shopify/Stripe) as a parameter (even if ignored for now)
  - Supabase queries as a scoping parameter (even if the DB tables aren’t tenant_id’d yet)
  - logs/telemetry as tags (tenantSlug/host)

This makes the eventual PR 5/6/8 work *mechanical* rather than “hunt down every call site”.

---

## Evidence deltas expected after PR 3 (when implemented)

After wiring tenant resolution into all endpoints in scope:
- `artifacts/snapshots/functions-api-auth-tenant-cues.rg.txt` should show new tenant-related matches for most endpoint files (either `resolveTenantContext` calls or host parsing).
- `artifacts/snapshots/functions-api-cues.matrix.txt` should show `tenant_cues=1` for the endpoints in:
  - `artifacts/snapshots/pr3-tenant-scoped-endpoints.list.txt`
- `contract-gaps-report-v1.1.md` section C should shrink to only the excluded integration families (`shopify/**`, `webhooks/**`).

Gate commands:
- `./.blackbox/scripts/refresh-1909-all-gates.sh`
- `./.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`

---

## Notes on ordering with PR 2 (auth)

PR 2 and PR 3 are complementary:
- PR 2 makes sensitive endpoints safe (auth).
- PR 3 makes tenant boundaries explicit and cache-safe (tenancy).

Evidence that PR 2 is currently the recommended next PR:
- `stop-point-status-dashboard.md`

PR 3 should be the next stop-point after PR 2, because once auth is consistent, tenancy wiring can proceed without accidentally exposing cross-tenant data.

