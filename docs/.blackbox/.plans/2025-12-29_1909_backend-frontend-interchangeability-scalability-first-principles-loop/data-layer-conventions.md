# Data Layer Conventions (Supabase + migrations + multitenancy readiness)

Purpose:
- Document what exists today in the data layer and the conventions we want so that:
  - the backend can scale across tenants
  - the frontend remains swappable (doesn’t embed DB coupling)

Evidence rule:
- Any “exists today” statement cites a snapshot under:
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/`

Primary evidence:
- Server/migrations inventory: `artifacts/snapshots/server-files.find.txt`
- Supabase coupling scan (repo-wide mentions): `artifacts/snapshots/coupling-supabase-matches.txt`
- Supabase browser client module exists: `artifacts/snapshots/src-domains-platform-storage-supabase.ts.head.txt`

---

## 1) What exists today

- SQL migrations live under `server/migrations/**`.
  - Evidence: `artifacts/snapshots/server-files.find.txt`

- There is a Supabase client module in the platform layer.
  - Evidence: `artifacts/snapshots/src-domains-platform-storage-supabase.ts.head.txt`

- Supabase shows up across the repo (it is currently a coupling surface), including:
  - backend-side Supabase usage in `functions/**` via `getSupabase(env)` (expected: service-role backend access)
  - some frontend-side Supabase usage in `src/**` (requires explicit justification as an exception)
  - Evidence: `artifacts/snapshots/coupling-supabase-matches.txt`
  - Evidence (key file extract contains the Supabase browser client module head): `artifacts/snapshots/src-key-files.extract.latest.txt`

---

## 2) The convention that keeps the frontend swappable (recommended)

Principle:
- Default to “backend-first” data access for tenant-owned data.
  - Frontends should call `/api/*` and receive DTOs, rather than importing Supabase logic directly.

Explicit exception posture (recommended):
- If a frontend must talk to Supabase directly (e.g., realtime subscriptions, user-owned profile reads), it must be:
  - narrow (one domain module, not scattered across UI),
  - token-scoped (user token, not service role),
  - tenant-safe by construction (no cross-tenant reads via public anon).
- Evidence that there is at least one current “frontend→Supabase” sync hook (Clerk token → Supabase client):  
  `artifacts/snapshots/coupling-supabase-matches.txt`

Design anchors in this plan:
- Tenancy resolution rules: `tenancy-context-rules.md`
- Tenant data model proposal: `tenant-data-model-proposal.md`
- Supabase RLS + multitenancy strategy: `supabase-rls-multitenancy-strategy.md`

---

## 3) Multi-tenant posture (recommended)

Prescriptions (not current-state claims):
- Every tenant-owned table includes `tenant_id` plus indexes that begin with `tenant_id`.
- Tenant resolution is host-first for storefront and auth-first for admin.
- Treat Supabase “direct-from-frontend” access as an exception requiring explicit justification + allowlisting.

Operationalization hooks (when code changes are allowed):
- Add a “direct Supabase imports allowlist” gate (report-only initially, then fail-on-new-usage).
- Add tenant isolation tests in staging (tenant #2 cannot read tenant #1).
