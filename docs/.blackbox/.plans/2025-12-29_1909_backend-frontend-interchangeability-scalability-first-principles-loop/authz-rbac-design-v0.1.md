# AuthZ / RBAC Design (v0.1, tenant-scoped)

Purpose:
- Define a tenant-scoped authorization model that keeps:
  - the frontend swappable (UI doesn’t embed authz logic or vendor details)
  - the backend boundary stable (`/api/*`)
  - multi-tenant isolation enforceable

Evidence rule:
- Research claims cite the feature research snapshot excerpt.
- “Current repo state” claims cite snapshots in this plan folder.

Research evidence:
- RBAC is ranked as a core “table stakes” safety primitive:  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/feature-research-summary.head220.txt`
- SAFE-only OSS shortlist includes an authz library candidate (`casbin/casbin`):  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/feature-research-oss-ranked-safe-only.head160.txt`

Repo evidence anchors:
- Admin/metrics/export endpoints exist under `/api/*` and must be guarded:  
  - `artifacts/snapshots/functions-api-files.clean.find.txt`
- The contract gap scan flags multiple sensitive endpoints as missing auth cues (heuristic):  
  - `contract-gaps-report-v1.1.md`
- Tenancy resolution rules exist (host-first, auth-as-restriction):  
  - `tenancy-context-rules.md`

---

## 0) Invariants (non-negotiable)

- AuthZ decisions are made server-side for `/api/*` endpoints.
- Tenant is resolved first (host-first) and auth only restricts actions within that tenant.
- UI may receive “capabilities” and “allowed actions” but does not evaluate policies itself.

Rationale:
- Keeps UI swappable and avoids coupling auth providers (Clerk) into frontends.

---

## 1) Domain model (minimum viable)

We model authorization as:
- `principal` (who): user identity (e.g. Clerk user id)
- `tenant` (where): `tenant_id`
- `role` (coarse): `owner`, `admin`, `analyst`, `support`
- `permission` (fine): `orders.read`, `orders.export`, `sections.update`, `metrics.read`, etc.

Data model anchor:
- `tenant_memberships` table proposal exists: `tenant-data-model-proposal.md`

---

## 2) Policy evaluation strategy (v0.1)

### 2.1 MVP: Role → allowlist

Start with an explicit allowlist map, for speed and auditability:
- Role `owner`: all admin capabilities
- Role `admin`: most admin capabilities
- Role `analyst`: metrics + read-only
- Role `support`: orders read + customer support actions

Why:
- Keeps evaluation simple for the first multi-tenant iteration.
- Produces predictable logs.

### 2.2 Future: Policy engine (optional)

If/when complexity grows:
- adopt a dedicated authorization library (candidate appears in SAFE-only list).  
Evidence: `artifacts/snapshots/feature-research-oss-ranked-safe-only.head160.txt`

Important constraint:
- Policy engine must be evaluated server-side, not in UI.

---

## 3) Where authz is enforced (boundary ownership)

Enforcement happens in `/api/*` endpoints, especially:
- `admin/**`
- `exports/**`
- `metrics/**`
- `orders/**` (if admin-level access)

Evidence that these families exist in current API surface:
- `artifacts/snapshots/functions-api-files.clean.find.txt`

Heuristic evidence of auth gaps to close early:
- `contract-gaps-report-v1.1.md`

---

## 4) Required endpoint behavior (contract)

For any endpoint requiring admin authorization:
- Must return:
  - 401/403 style response with stable error codes for “unauthorized/forbidden”
  - `Cache-Control: no-store`
- Must include non-sensitive request identifiers in responses (`requestId`) to support debugging.

Contract reference:
- `backend-boundary-contract-v1.md`
- DTO/error conventions: `dto-and-capabilities-spec-v0.1.md`

---

## 5) Observability requirements

Every denied action should emit an audit event (even if the action did not complete):
- domain: `authz`
- action: `deny`
- resource: `<domain>.<resource>`

Audit log plan:
- `audit-log-design-v0.1.md` (paired doc)

---

## 6) Acceptance checks (when code changes begin)

- All sensitive endpoint families show explicit auth enforcement (contract gaps shrink):  
  - `contract-gaps-report-v1.1.md`
- Tenant membership rules exist for tenant #2 onboarding:
  - `tenant-2-onboarding-runbook.md`
- UI does not import authz adapters (policy remains server-side).

