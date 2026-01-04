# Tenant Data Model Proposal (Supabase, one project → many clients)

Goal:
- Make the backend/frontend boundary tenant-aware so **one Supabase project can serve multiple clients** without turning the UI into a tenant-routing mess.
- Keep “frontend swappable” viable by ensuring tenancy is resolved in the backend boundary (Cloudflare `/api/*`) and enforced consistently.

Evidence rule:
- Any statement about “current reality” cites an evidence snapshot under:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/`

Key evidence anchors used:
- Recommended multitenancy schema + access modes (service-role BFF vs direct RLS):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/plan-1901-supabase-multitenancy-plan.md.head260.txt`
- Backend boundary blueprint framing (BFF hides vendors, tenancy resolved server-side):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/plan-1901-backend-boundary.md.head260.txt`
- Tenancy resolution + propagation rules (host-first, auth-as-restriction, cache-safe):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/plan-tenancy-context-rules.md.head120.txt`
- Current “browser Supabase client” exists (important for deciding access mode):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-storage-supabase.ts.head.txt`
- Current env split shows both public and server secrets exist (supports “move config out of env for multitenancy”):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/env-example-secrets.rg.txt`

---

## 1) Definitions (pick these once; everything else depends on it)

- `tenant`: a *client brand / org* that owns data and configuration.  
  Evidence for this recommendation: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/plan-1901-supabase-multitenancy-plan.md.head260.txt`

- `tenant domain`: a host that resolves to a tenant (storefront or admin).  
  Evidence that domain-based resolution is the recommended storefront approach:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/plan-1901-supabase-multitenancy-plan.md.head260.txt`

- `tenant integration`: per-tenant provider configuration (Shopify today; Stripe later; etc.).  
  Evidence for `tenant_integrations` table concept:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/plan-1901-supabase-multitenancy-plan.md.head260.txt`

---

## 2) Tenancy context (where tenant comes from, and why this is cache-safe)

Proposed deterministic resolution:
- Storefront (anonymous OK): resolve tenant from request host.
- Admin (authenticated): resolve tenant from auth claims and intersect with host resolution (auth restricts; never silently overrides).  
Evidence for host-first + auth-as-restriction + cache safety:  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/plan-tenancy-context-rules.md.head120.txt`

---

## 3) Database tables (minimum viable schema)

### 3.1 `tenants`

- `id uuid primary key`
- `slug text unique not null` (stable identifier; used in logs and URLs)
- `name text not null`
- `status text not null default 'active'`
- `created_at timestamptz not null default now()`

Motivation:
- You need a stable `tenant_id` to put on every tenant-owned row.  
Evidence for `tenant_id everywhere` rule:  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/plan-1901-supabase-multitenancy-plan.md.head260.txt`

### 3.2 `tenant_domains`

- `id uuid primary key`
- `tenant_id uuid not null references tenants(id) on delete cascade`
- `host text unique not null` (normalized host)
- `kind text not null` (e.g. `storefront`, `admin`, `api`)
- `created_at timestamptz not null default now()`

Motivation:
- The backend can deterministically resolve host → tenant.  
Evidence for domain-based resolution option:  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/plan-1901-supabase-multitenancy-plan.md.head260.txt`

### 3.3 `tenant_integrations`

- `id uuid primary key`
- `tenant_id uuid not null references tenants(id) on delete cascade`
- `provider text not null` (e.g. `shopify`, `stripe`, `clerk`)
- `status text not null default 'active'`
- `config_json jsonb not null default '{}'::jsonb` (non-secret config only)
- `secret_ref text null` (pointer to where secrets live; not raw secrets)
- `created_at timestamptz not null default now()`
- Unique constraint: `(tenant_id, provider)`

Motivation:
- For multitenancy, vendor config cannot live only in env vars.  
Evidence that both Vite env and server env keys exist today (which doesn’t scale to many tenants):  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/env-example-secrets.rg.txt`

### 3.4 `tenant_memberships` (admin authorization)

- `id uuid primary key`
- `tenant_id uuid not null references tenants(id) on delete cascade`
- `user_id text not null` (Clerk user id or internal user id)
- `role text not null` (e.g. `owner`, `admin`, `analyst`)
- `created_at timestamptz not null default now()`
- Unique constraint: `(tenant_id, user_id)`

Motivation:
- Admin requests must be tenant-scoped and role-scoped.  
Evidence that “admin tenant can be auth-based” is recommended:  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/plan-1901-supabase-multitenancy-plan.md.head260.txt`

---

## 4) Data isolation strategy (RLS + access mode)

Two access modes exist (we can support both, but pick a primary):

### Mode A (recommended primary): service-role backend (BFF)

- Cloudflare `/api/*` uses Supabase service role to read/write.
- Backend enforces tenant scope (by resolved `tenant_id`), and RLS is defense-in-depth.  
Evidence that this is recommended for frontend swap-ability:  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/plan-1901-supabase-multitenancy-plan.md.head260.txt`

### Mode B (selective): client direct access (RLS + user token)

- Keep only for realtime or clearly user-scoped reads.
- Still hide it behind a platform port so UI swapping doesn’t require rewriting access logic.  
Evidence that a browser Supabase client exists today:  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-storage-supabase.ts.head.txt`

---

## 5) JWT claims (tenancy + roles)

Proposed claim shape (conceptual):
- `tenant_id` (uuid)
- `tenant_role` (string)
- `tenant_slug` (string, optional convenience)

Rule:
- Claims restrict what tenants the user may act on; they never silently override host resolution for storefront requests.  
Evidence for “auth restricts; does not override host”:  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/plan-tenancy-context-rules.md.head120.txt`

---

## 6) Acceptance checks (docs-only now; enforceable later)

- Tenant resolution rules exist and are deterministic (host-first):
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/tenancy-context-rules.md`
- `/api/*` is the stable boundary where tenant is resolved:
  - `/api` surface inventory exists:  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`
- Vendor config stops living only in env vars once Stage 4 begins:
  - staged plan exists:  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/migration-stages.md`

