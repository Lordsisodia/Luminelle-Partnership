# PR 5 — Tenancy Tables (Supabase) (detailed plan)

Scope: **plan-only** (no DB migrations executed in this doc).

This PR adds the minimum database tables needed for multi-tenant configuration while keeping runtime behavior **unchanged** for tenant #1.

---

## Why PR 5 exists (first principles)

Multi-tenancy is impossible to scale if tenant identity and provider configuration live only in environment variables.

The plan requires:
- host-first tenant resolution (`Host` → tenant),
- tenant-scoped provider configuration (Shopify today, Stripe later),
- tenant-scoped admin authorization (memberships/roles).  
Sources:
- `tenancy-context-rules.md`
- `tenant-data-model-proposal.md`
- `tenant-secrets-and-public-config-spec-v0.1.md`

Evidence that functions already depend on Supabase tables and RPCs (so tenancy must eventually reach the data layer):
- `artifacts/snapshots/functions-supabase-calls.rg.txt`

---

## Target outcome (PR 5 acceptance checks)

After the implementation PR (not this doc) lands:

- New tables exist in Supabase:
  - `tenants`
  - `tenant_domains`
  - `tenant_integrations`
  - `tenant_memberships`
- Existing runtime behavior remains single-tenant:
  - No `/api/*` handler behavior changes are required in PR 5.
- PR 6 can start reading tenant config from Supabase without needing schema changes.

---

## Schema: minimum viable tables (v1)

Canonical schema proposal (source of truth for table shapes):
- `tenant-data-model-proposal.md`

### 1) `tenants`

Purpose:
- stable `tenant_id` for config + future tenant-owned data

Columns (recommended):
- `id uuid primary key default gen_random_uuid()`
- `slug text unique not null`
- `name text not null`
- `status text not null default 'active'`
- `created_at timestamptz not null default now()`

### 2) `tenant_domains`

Purpose:
- map `effectiveHost` → `tenant_id` (host-first tenancy)

Columns (recommended):
- `id uuid primary key default gen_random_uuid()`
- `tenant_id uuid not null references tenants(id) on delete cascade`
- `host text unique not null` (normalized host)
- `kind text not null` (e.g. `storefront`, `admin`, `api`)
- `created_at timestamptz not null default now()`

### 3) `tenant_integrations`

Purpose:
- per-tenant provider configuration (non-secret config + secret pointer)

Columns (recommended):
- `id uuid primary key default gen_random_uuid()`
- `tenant_id uuid not null references tenants(id) on delete cascade`
- `provider text not null` (e.g. `shopify`, `stripe`, `clerk`)
- `status text not null default 'active'`
- `config_json jsonb not null default '{}'::jsonb` (non-secret allowlisted config)
- `secret_ref text null` (pointer to encrypted secret blob; not raw secrets)
- `created_at timestamptz not null default now()`

Constraints:
- unique `(tenant_id, provider)`

Secret storage rules:
- `tenant-secrets-and-public-config-spec-v0.1.md`

### 4) `tenant_memberships`

Purpose:
- admin authorization (`admin` tier needs role + tenant scope)

Columns (recommended):
- `id uuid primary key default gen_random_uuid()`
- `tenant_id uuid not null references tenants(id) on delete cascade`
- `user_id text not null` (Clerk user id or internal id)
- `role text not null` (e.g. `owner`, `admin`, `analyst`)
- `created_at timestamptz not null default now()`

Constraints:
- unique `(tenant_id, user_id)`

---

## Migration outline (DDL sketch)

This is intentionally “copy/paste ready” for a Supabase migration later (names/DDL may be adjusted to match existing conventions).

Suggested DDL skeleton:
- create tables
- add constraints
- add minimal indexes
- do **not** add RLS policies that block service-role flows yet (keep behavior unchanged)

Reference for current schema context:
- `artifacts/snapshots/docs-02-engineering-technical-SUPABASE-SCHEMA.md.head260.txt`

---

## Evidence deltas expected after PR 5 (when implemented)

Because PR 5 is DB-only, most code evidence snapshots will be unchanged.

Expected changes:
- A migration file exists (or Supabase migration history shows new tables).
- Add a short “PR 5 evidence diff” file under:
  - `context/pr-diffs/`
  - using `pr-evidence-diff-summary-template.md`

Then run:
- `./.blackbox/scripts/refresh-1909-all-gates.sh`
- `./.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`

---

## Notes on ordering with PR 3 / PR 6

- PR 3 wires tenant resolution call-sites (still single-tenant fallback).
- PR 5 adds the tables needed to resolve tenant + integrations from the database.
- PR 6 switches provider config lookup from env → `tenant_integrations` (still single tenant, but now scalable).

Roadmap:
- `pr-by-pr-stop-points-plan.md`

