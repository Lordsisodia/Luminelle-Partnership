# Audit Log Design (v0.1, tenant-scoped, append-only)

Purpose:
- Define an audit log primitive that makes admin operations safe and diagnosable while keeping:
  - UI swappable
  - backend boundary stable (`/api/*`)
  - tenancy enforceable (no cross-tenant visibility)

Evidence rule:
- Research claims cite the feature research snapshot excerpt.
- “Current repo state” claims cite snapshots in this plan folder.

Research evidence:
- Audit log (“who changed what”) is ranked as a high-leverage early primitive:  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/feature-research-summary.head220.txt`

Repo evidence anchors:
- Admin endpoints exist under `/api/*` and are the correct place to emit audit events:  
  - `artifacts/snapshots/functions-api-files.clean.find.txt`
- Tenancy rules exist (host-first tenant resolution):  
  - `tenancy-context-rules.md`

---

## 0) Invariants

- Audit log is **append-only**.
- Every event is tenant-scoped (`tenant_id`).
- Emission happens in backend boundary (`functions/api/**`) so:
  - tenant context is reliable
  - identity is verifiable
  - vendor secrets never reach UI

---

## 1) Event schema (v0.1)

Minimum fields:
- `id` (uuid)
- `tenant_id` (uuid)
- `timestamp` (timestamptz)
- `actor_user_id` (text; auth provider id)
- `actor_role` (text; optional convenience)
- `action` (text; e.g. `orders.export`, `sections.update`, `authz.deny`)
- `resource_type` (text; e.g. `order`, `section`, `metric`)
- `resource_key` (text; stable internal id if available, else a safe identifier)
- `request_id` (text; correlation id)
- `status` (text; `success`|`failure`|`denied`)
- `metadata_json` (jsonb; allowlisted, non-sensitive)

Tenant ownership rule:
- tables are tenant-owned and include `tenant_id` everywhere.
  - Data model baseline: `tenant-data-model-proposal.md`

---

## 2) Write path (where audit events are emitted)

Rule:
- Audit emission should occur at the end of each admin endpoint execution path:
  - after authz decision (deny/allow)
  - after mutation completion (success/failure)

Why:
- The backend boundary is the stable chokepoint for any UI.

Evidence that `/api/*` exists and contains admin families:
- `artifacts/snapshots/functions-api-files.clean.find.txt`

---

## 3) Read path (how UIs consume audit logs)

UI should consume via:
- `GET /api/admin/audit` (admin tier, tenant-scoped)

DTO conventions:
- Must return stable DTOs (no leaking DB internals).
- Must support cursor pagination.

DTO spec reference:
- `dto-and-capabilities-spec-v0.1.md`

---

## 4) Retention + cost control (scalability)

Principles:
- Audit logs grow unbounded unless you apply retention.
- Retention should be tenant-configurable but with global defaults.

Suggested defaults:
- keep 90 days online
- archive older events to cheap storage later (optional)

Scalability plan reference:
- `scalability-plan.md`

---

## 5) Acceptance checks (when code changes begin)

- Every admin mutation endpoint emits an audit event.
- Every denied admin request emits an audit event (`authz.deny`).
- Querying audit logs is tenant-isolated (no cross-tenant events).

