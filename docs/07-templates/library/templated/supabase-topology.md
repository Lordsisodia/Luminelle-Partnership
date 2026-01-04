# Supabase Topology (Per-Client vs Multi-Tenant)

This doc is about *agency operations*, not app UI: how we structure Supabase/Postgres across many client projects created by copying this repo.

We have two main options:
- **Per-client Supabase project** (one DB per client)
- **Multi-tenant Supabase** (one DB shared across clients)

---

## Decision inputs (what we learned)

- Clients usually **do not need ownership** of the database.
- We want fast “copy repo → deploy” setup.
- We want strong isolation (no cross-client data leaks).

Given those, multi-tenant becomes viable long-term, but it must be designed carefully.

---

## Option A — Per-client Supabase (simpler, safest)

### Pros
- Very strong isolation by default.
- Simple mental model: each client has its own env vars and DB.
- Easy client offboarding / transfer if needed.

### Cons
- More projects to manage.
- Shared improvements require applying migrations across multiple DBs (needs tooling once you scale).

When to use:
- Early stage, low client count, high need for simplicity and isolation.
- High-risk clients where strict separation matters.

---

## Option B — Multi-tenant Supabase (agency-managed, scalable)

### Pros
- Centralized migrations and shared feature rollout.
- Easier cross-client agency analytics (if you want it).
- Operationally efficient at higher client counts.

### Cons (serious)
- Harder to get security right. One bad RLS policy can leak data.
- Requires consistent tenant context everywhere.
- Harder client handoff (they can’t “own the project” cleanly).

---

## If we do multi-tenant: minimum safe design

### 1) Hard tenant boundary

Choose a tenant boundary strategy (pick one and standardize it):

- **Tenant ID per deployment** (recommended):
  - Each client deployment has a `TENANT_ID` env var.
  - All writes include `tenant_id = TENANT_ID`.
  - All reads are filtered by tenant_id (ideally enforced by RLS).

- **Tenant by domain** (dangerous unless done server-side only):
  - Relying on request hostname is not available inside Supabase RLS directly.
  - This approach usually forces you to funnel queries through serverless endpoints.

### 2) Schema strategy

Pick one:
- **Single schema + tenant_id on every table** (common)
- **Schema-per-tenant** (more isolation, but more operational complexity)

### 3) RLS policies

If the frontend queries Supabase directly:
- Every table must have RLS policies that ensure:
  - user can only read/write their own rows
  - and only within their tenant boundary

This typically requires JWT claims that include tenant identity, or a per-tenant auth partitioning strategy.

### 4) Admin/service access

For serverless jobs (metrics, exports, Shopify sync), use:
- internal secrets / service role
- explicit tenant selection in the job logic

---

## Recommended stance for the starter (right now)

**Decision (for now): per-client Supabase**

- Each client gets their own Supabase project (DB + storage + keys).
- This keeps onboarding predictable and materially reduces the risk of cross-client leaks.

**Future (optional): multi-tenant**

If you later want multi-tenant for agency ops efficiency:
- treat it as a deliberate platform project (tenant context + RLS + tooling),
- not something to “accidentally slide into”.
