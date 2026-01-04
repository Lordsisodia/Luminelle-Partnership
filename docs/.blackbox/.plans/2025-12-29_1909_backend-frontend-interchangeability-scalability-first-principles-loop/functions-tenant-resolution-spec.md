# Functions Tenant Resolution Spec (Cloudflare Pages Functions)

Goal:
- Ensure every `/api/*` request is tenant-scoped in a deterministic, cache-safe way.
- Avoid tenant logic being reimplemented per handler (which is fragile and prevents “frontend swap”).

Evidence anchors:
- Tenancy rules (host-first, auth-as-restriction):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/plan-tenancy-context-rules.md.head120.txt`
- Current functions env bindings (no tenant variables present, which implies tenant must be resolved from host/config, not env-per-tenant):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-_lib-types.ts.head160.txt`
- Current contract gaps show “no tenant cues in-file” across most endpoints (suggesting tenancy isn’t centralized yet):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/contract-gaps-report-v1.1.md`

---

## 1) Where tenant resolution must live

Create a shared helper under:
- `functions/_lib/tenant.ts` (proposed)

Motivation:
- Most endpoint files currently do not contain host/tenant cues (by scan), so tenancy should be centralized and called explicitly by endpoints.  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/contract-gaps-report-v1.1.md`

---

## 2) Tenant context shape (v1)

Proposed types:
- `TenantMode = 'resolved' | 'fallback'`
- `TenantContext = { tenantId: string; tenantSlug: string; mode: TenantMode; host: string }`

Notes:
- `tenantId` should be a stable UUID (Supabase `tenants.id`), not an env var.
- `tenantSlug` is for logs, admin URLs, and debugging.

Evidence for the schema direction (tenant_id everywhere):  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/tenant-data-model-proposal.md`

---

## 3) Canonical host normalization (must be identical everywhere)

Algorithm:
- Select `effectiveHost`:
  - Prefer `X-Forwarded-Host` if present; else `Host`.
- Normalize:
  - lower-case
  - strip port (`example.com:443` → `example.com`)
  - strip trailing dot

Rationale:
- Tenant resolution depends on host; normalization prevents “same tenant, different host string” bugs.

---

## 4) Resolution algorithm (storefront + admin)

### 4.1 Domain-based resolution (storefront; anonymous OK)

Inputs:
- `effectiveHost`

Lookup:
- `tenant_domains.host = effectiveHost` → `tenant_id`

Fallback (dev only):
- If no mapping exists, return a *known fallback tenant* with `mode='fallback'`.

### 4.2 Auth-based restriction (admin)

Rule:
- Auth does not override the host tenant; it restricts access.
- If the user lacks membership in the resolved tenant, return a stable error (`401/403` with a stable code).

Evidence for “auth restricts; does not override host”:  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/plan-tenancy-context-rules.md.head120.txt`

---

## 5) Cache safety requirements

Rules:
- Tenant resolution must occur *before* any cache reads/writes.
- Public cacheable endpoints must vary by hostname (implicit key) and must not use auth-only tenant overrides.

Evidence that cache-safety is a tenancy requirement:  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/plan-tenancy-context-rules.md.head120.txt`

---

## 6) Storage for tenant mappings (Supabase; service role)

Preferred access mode:
- Cloudflare Functions use Supabase service role for config lookups and write operations.
- Store the mapping in Supabase tables:
  - `tenants`
  - `tenant_domains`
  - `tenant_integrations`

Evidence that service-role Supabase client exists in functions today:  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-_lib-supabase.ts.head160.txt`

---

## 7) Acceptance checks (implementation phase)

- Every `functions/api/**` handler calls `resolveTenantContext(...)` exactly once per request.
- There is no per-handler host parsing duplication.
- A missing domain mapping never silently falls into a real tenant in production.

