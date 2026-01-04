# Supabase RLS + Multitenancy Strategy (frontend-swappable posture)

Goal:
- Provide a concrete RLS posture that supports:
  - one Supabase project serving multiple tenants
  - strong isolation (no cross-tenant reads/writes)
  - frontend swap-ability (logic not embedded in UI)

Evidence anchors:
- Existing Supabase blueprint recommends enabling RLS everywhere and defaulting to service-role access until auth is wired:  
  `artifacts/snapshots/docs-02-engineering-technical-SUPABASE-SCHEMA.md.head260.txt`
- Existing setup doc highlights browser anon key usage and direct reads, but also references RLS and Clerk mirroring:  
  `artifacts/snapshots/docs-02-engineering-technical-SUPABASE-SETUP.md.head260.txt`
- Functions already have a service-role Supabase client helper (BFF access mode exists):  
  `artifacts/snapshots/functions-_lib-supabase.ts.head160.txt`

---

## 1) Two access modes (pick a default, allow exceptions)

### Mode A (default, recommended): Service-role via backend boundary

- Cloudflare `/api/*` uses service role.
- Backend enforces tenant scoping and business rules.
- RLS is defense-in-depth (still enabled).

Why:
- Keeps frontends swappable (no frontend embeds DB policy logic).

Evidence that this mode is already available in functions:  
`artifacts/snapshots/functions-_lib-supabase.ts.head160.txt`

### Mode B (exception): Direct client access via anon key + user JWT

- Use only for explicitly scoped reads (realtime, user-owned resources).
- Must be hidden behind a platform port so a frontend swap doesn’t reimplement it.

Evidence that a browser anon key is used today:  
`artifacts/snapshots/docs-02-engineering-technical-SUPABASE-SETUP.md.head260.txt`

---

## 2) Tenant ownership rule (`tenant_id everywhere`)

For any tenant-owned table:
- Add `tenant_id uuid not null references tenants(id)`
- Add an index on `tenant_id`

Tables that likely become tenant-owned (examples):
- CMS pages/sections
- analytics tables / mirrors
- exports artifacts

See schema proposal: `tenant-data-model-proposal.md`

---

## 3) Recommended RLS baseline policies

Baseline posture (safe by default):
- Enable RLS on every table.
- Initially allow only service role (backend) to access tenant-owned tables.

Evidence that this is the existing blueprint posture:  
`artifacts/snapshots/docs-02-engineering-technical-SUPABASE-SCHEMA.md.head260.txt`

### 3.1 Tenant-owned tables (service-role only initially)

- Policy: deny all for anon/auth roles (until explicitly opened).
- Backend enforces tenant scoping.

### 3.2 User-owned tables (customer profile mirror)

The existing blueprint uses a customers table keyed by Clerk user id with RLS like:
- `id = auth.jwt()->>'sub'`  
Evidence: `artifacts/snapshots/docs-02-engineering-technical-SUPABASE-SCHEMA.md.head260.txt`

This pattern can continue, but must be tenant-aware if users can exist in multiple tenants:
- Either store `tenant_id` in `customers` and require both:
  - `customers.id = auth.jwt()->>'sub'` AND `customers.tenant_id = current_tenant_id()`
- Or treat customers as global identity and store memberships in `tenant_memberships`.

Open decision:
- Is a user allowed to belong to multiple tenants? If yes, memberships table is mandatory.

---

## 4) How to express tenant in RLS (when needed)

Option 1 (backend only): RLS not needed for tenant enforcement (service role bypasses).
- Use for Phase 1/2 while implementing tenant #2.

Option 2 (JWT claim): include `tenant_id` as a claim in user JWT for direct client access.
- RLS can use `auth.jwt()->>'tenant_id'`.

Option 3 (membership join): RLS checks membership table by `auth.jwt()->>'sub'`.
- More flexible, but heavier.

Evidence that Clerk is already mirrored into Supabase for joins:  
`artifacts/snapshots/docs-02-engineering-technical-SUPABASE-SCHEMA.md.head260.txt`

---

## 5) Migration approach (safe stages)

- Stage 0: service-role only (no behavior change), add tables.
- Stage 1: add `tenant_id` columns to tenant-owned tables, backfill for tenant #1.
- Stage 2: enforce tenant scoping in backend boundary (tenant resolver + auth restrict).
- Stage 3: only then consider expanding RLS for client direct access on selected tables.

Aligned with the staged plan: `migration-stages.md`

---

## 6) Acceptance checks (implementation phase)

- Cross-tenant reads/writes are impossible:
  - backend always filters by resolved tenant
  - RLS is enabled on tenant-owned tables
- No secrets reach the browser:
  - service role key only in Functions env
  - evidence helper exists: `artifacts/snapshots/functions-_lib-supabase.ts.head160.txt`

