# Feature Flags Per Tenant (v0.1)

Purpose:
- Define a feature-flagging primitive that:
  - enables staged rollouts and safer shipping
  - is tenant-scoped (multi-client ready)
  - does not couple UI to backend/provider internals

Evidence rule:
- Research claims cite the feature research snapshot excerpt.
- “Current repo state” claims cite snapshots in this plan folder.

Research evidence:
- “Feature flags + staged rollouts” is the top-ranked recommendation in the synthesis list.  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/feature-research-summary.head220.txt`
- SAFE-only OSS shortlist includes a feature-flag backend candidate (`Unleash/unleash`).  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/feature-research-oss-ranked-safe-only.head160.txt`

Repo evidence anchors:
- Tenant-aware config direction exists: `tenant-integrations-config-spec.md`
- Backend boundary exists under `/api/*`: `artifacts/snapshots/functions-api-handlers.clean.rg.txt`

---

## 0) Invariants

- Flags are resolved per tenant.
- UI must not require access to secret flag backends.
- Public flags may be exposed to the UI only via allowlisted endpoints.
- “Default behavior” must be safe (feature off unless explicitly enabled per tenant).

---

## 1) Flag model (v0.1)

Minimum fields for a tenant flag:
- `tenant_id`
- `flag_key` (string)
- `enabled` (boolean)
- optional: `variant` (string)
- optional: rollout metadata (percentage, targeting rules) — defer until needed

Data model location options:
- Option A: Store flags in Supabase (simple, fastest).
- Option B: Integrate a dedicated flag service (future, if needed).

License posture note (if using OSS):
- SAFE-only shortlist includes a feature-flag backend repo.  
  Evidence: `artifacts/snapshots/feature-research-oss-ranked-safe-only.head160.txt`

---

## 2) API surface (stable for any frontend)

### 2.1 Public flags endpoint

`GET /api/flags/public`
- Tier: public
- Tenant: required (host-first)
- Cache: edge-cacheable short TTL (tenant-safe)
- Response: allowlisted flags only (no sensitive flags)

### 2.2 Admin flags endpoint

`GET /api/admin/flags`
- Tier: admin
- Tenant: required
- Cache: no-store

`POST /api/admin/flags/set`
- Tier: admin
- Tenant: required
- Cache: no-store
- Emits audit log event (domain: flags)

Contract references:
- `backend-boundary-contract-v1.md`
- `dto-and-capabilities-spec-v0.1.md`
- `audit-log-design-v0.1.md`

---

## 3) Evaluation strategy

Default:
- Evaluate server-side inside `/api/*` endpoints.

UI consumption:
- UI requests `/api/flags/public` and uses returned booleans/variants to choose UI behavior.
- UI does not read flag provider configuration directly.

This matches the “internal API first” direction:
- `artifacts/snapshots/research-ui-infra-port-implementation-strategy.md.head220.txt`

---

## 4) Scalability and caching

Principles:
- Public flags should be cached per tenant to avoid DB hot-reads.
- Admin updates must invalidate/override caches.

If using Cloudflare cache:
- cache key implicitly includes host (tenant) if requests are per-tenant host.
- keep TTL small initially; add purge later if needed.

Scalability reference:
- `scalability-plan.md`

---

## 5) Acceptance checks (when code changes begin)

- Tenant #2 can have a different flag set without new env vars.
- Public flags endpoint is cache-safe and tenant-scoped.
- Admin flag changes produce an audit event.

