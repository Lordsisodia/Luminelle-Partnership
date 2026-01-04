# Admin Usage Analytics (v0.1, tenant-scoped)

Purpose:
- Define an “admin usage analytics” primitive that:
  - is tenant-scoped and privacy-respecting
  - works with swappable UIs (events are stable and UI-agnostic)
  - supports “build what merchants actually use”

Evidence rule:
- Research claims cite the feature research snapshot excerpt.
- Current repo state claims cite snapshots/reports under this plan folder.

Research evidence:
- “Admin usage analytics” is a top-10 recommendation.  
  - `artifacts/snapshots/feature-research-summary.head220.txt`

Repo evidence anchors:
- Metrics endpoints exist today under `/api/metrics/*` (so analytics-as-endpoints is already a concept):  
  - `contract-gaps-report-v1.1.md`
- `/api/*` stable boundary exists for any UI:  
  - `artifacts/snapshots/functions-api-handlers.clean.rg.txt`

---

## 0) Invariants

- Analytics events are tenant-scoped.
- No secrets or vendor identifiers are required in the UI to emit events.
- The backend boundary can accept events from any frontend and normalize them.
- Admin analytics should never compromise tenant isolation.

---

## 1) Event taxonomy (UI-agnostic)

Event fields:
- `tenant_id`
- `user_id` (or hashed user id)
- `event_name` (stable string)
- `timestamp`
- `properties_json` (allowlisted)

Recommended event names (examples):
- `admin.page.view`
- `admin.action.click`
- `admin.export.start`
- `admin.export.complete`
- `admin.section.publish`
- `admin.workflow.approve`

Rule:
- Event names describe product intent, not vendor systems.

---

## 2) API surface

### 2.1 Ingest endpoint

Planned:
- `POST /api/analytics/admin/track`

Tier:
- admin (authenticated)
- tenant-scoped
- `Cache-Control: no-store`

### 2.2 Reporting endpoints

Planned:
- `GET /api/metrics/admin-usage/summary`
- `GET /api/metrics/admin-usage/top-actions`

Note:
- This aligns with existing `/api/metrics/*` family concept.
  - `contract-gaps-report-v1.1.md`

Contract reference:
- `backend-boundary-contract-v1.md`
- `dto-and-capabilities-spec-v0.1.md`

---

## 3) Storage model (Supabase)

Tables (tenant-owned):
- `admin_events` (raw events, short retention)
- `admin_event_daily_rollups` (aggregated)

Retention:
- raw: 30–90 days
- rollups: longer

Isolation posture:
- `tenant_id` everywhere
- backend-first access is default
  - `supabase-rls-multitenancy-strategy.md`

---

## 4) Acceptance checks (implementation phase)

- You can swap the admin UI and still keep analytics continuity (event schema stable).
- Tenant isolation holds in both raw and rollup tables.
- Metrics endpoints return stable DTOs suitable for any UI.

