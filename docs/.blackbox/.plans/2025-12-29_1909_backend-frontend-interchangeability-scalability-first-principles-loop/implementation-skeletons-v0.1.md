# Implementation Skeletons (v0.1, paths-only, no code changes yet)

Purpose:
- Convert the plan into an execution-ready set of **file paths** to create/edit once code changes are allowed.
- Keep the architecture consistent: ports/adapters/runtime + `/api/*` boundary + tenant-scoped data.

Evidence rule:
- Any “current repo state exists” claim cites snapshots in `artifacts/snapshots/`.

Repo evidence anchors:
- `/api/*` exists in Cloudflare Pages Functions:  
  - `artifacts/snapshots/functions-api-files.clean.find.txt`
- Platform ports/runtime/adapters inventories exist:  
  - `artifacts/snapshots/platform-ports-files.txt`
  - `artifacts/snapshots/platform-runtime-files.txt`
  - `artifacts/snapshots/platform-adapters-files.txt`

Templates/specs to follow:
- Domain recipe: `platform-domain-template.md`
- Backend boundary contract: `backend-boundary-contract-v1.md`
- DTO conventions: `dto-and-capabilities-spec-v0.1.md`
- Tenancy rules: `tenancy-context-rules.md`
- Events vocabulary: `platform-events-catalog-v0.1.md`

---

## 0) Skeleton rules

- Do not add new “vendor flags” in UI; expose capability flags instead.  
  - ADR: `adrs/0002-capability-driven-ui.md`
- Default port implementations call internal `/api/*` endpoints.  
  - ADR: `adrs/0001-internal-api-first.md`
- Tenant is resolved in backend boundary and propagated down.  
  - ADR: `adrs/0003-host-first-tenancy.md`

---

## 1) Platform domain skeleton — `platform/automation`

Goal:
- Implement workflow automation hooks + approvals + run log as a modular domain.

Spec:
- `workflow-automation-hooks-design-v0.1.md`

Create/edit paths (planned):
- `src/domains/platform/automation/ports/automation.ts`
- `src/domains/platform/automation/runtime.ts`
- `src/domains/platform/automation/index.ts` (public entrypoint; exports port factory + types)
- `src/domains/platform/automation/adapters/internal-api/index.ts` (default impl)
- `functions/api/admin/workflows/list.ts`
- `functions/api/admin/workflows/create.ts`
- `functions/api/admin/workflows/update.ts`
- `functions/api/admin/workflows/enable.ts`
- `functions/api/admin/workflows/disable.ts`
- `functions/api/admin/workflow-runs/list.ts`
- `functions/api/admin/workflow-runs/get.ts`
- `functions/api/admin/workflow-runs/approve.ts`
- `functions/api/admin/workflow-runs/deny.ts`

Supabase migration (planned):
- `supabase/migrations/<ts>_create_workflows_tables.sql` (or repo-equivalent path)
  - tables: `workflows`, `workflow_runs`, `workflow_approvals`

Cross-cutting integration points:
- Emit audit events on create/update/enable/disable/approve/deny.  
  - Spec: `audit-log-design-v0.1.md`
- Emit platform events for automation state changes.  
  - Spec: `platform-events-catalog-v0.1.md`

---

## 2) Platform domain skeleton — `platform/cms`

Goal:
- Make content ops explicit, tenant-scoped, cache-safe, and UI-swappable.

Spec:
- `cms-content-ops-design-v0.1.md`

Create/edit paths (planned):
- `src/domains/platform/cms/ports/cms.ts`
- `src/domains/platform/cms/runtime.ts`
- `src/domains/platform/cms/index.ts`
- `src/domains/platform/cms/adapters/internal-api/index.ts`
- (Extend existing endpoints or add new ones)
  - `functions/api/admin/sections/get.ts` (exists today)
  - `functions/api/admin/sections/update.ts` (exists today)
  - `functions/api/admin/sections/publish.ts` (planned)
  - `functions/api/admin/sections/unpublish.ts` (planned)

Cache considerations:
- Ensure public endpoints set explicit cache headers:
  - `functions/api/storefront/landing/sections.ts`
  - `functions/api/storefront/product/sections.ts`
  Evidence gaps: `contract-gaps-report-v1.1.md`

Supabase migration (planned):
- `supabase/migrations/<ts>_create_content_tables.sql`
  - tables: `content_sections`, `content_pages`, optional `content_versions`

---

## 3) Platform domain skeleton — `platform/analytics`

Goal:
- Add tenant-scoped admin usage analytics with stable event taxonomy.

Spec:
- `admin-usage-analytics-design-v0.1.md`

Create/edit paths (planned):
- `src/domains/platform/analytics/ports/analytics.ts`
- `src/domains/platform/analytics/runtime.ts`
- `src/domains/platform/analytics/index.ts`
- `src/domains/platform/analytics/adapters/internal-api/index.ts`
- `functions/api/analytics/admin/track.ts` (planned ingest)
- `functions/api/metrics/admin-usage/summary.ts` (planned)
- `functions/api/metrics/admin-usage/top-actions.ts` (planned)

Supabase migration (planned):
- `supabase/migrations/<ts>_create_admin_events_tables.sql`
  - tables: `admin_events`, `admin_event_daily_rollups`

---

## 4) Cross-cutting skeleton — shared boundary primitives

These are not new features; they are required to keep every new domain safe.

Specs:
- `functions-auth-guards-spec.md`
- `functions-tenant-resolution-spec.md`
- `functions-cache-policy-spec.md`

Create/edit paths (planned):
- `functions/_lib/tenant.ts` (or extend existing)
- `functions/_lib/auth.ts` (or extend existing)
- `functions/_lib/cache.ts` (or extend existing)
- Update all new endpoints to use those helpers.

Evidence that shared helpers exist today:
- `artifacts/snapshots/functions-_lib-internalAuth.ts.head160.txt`
- `artifacts/snapshots/functions-_lib-response.ts.head160.txt`
- `artifacts/snapshots/functions-_lib-supabase.ts.head160.txt`

---

## 5) Acceptance gates to run after each implementation PR

- Gate bundle:
  - `./.blackbox/scripts/refresh-1909-all-gates.sh`
  - `./.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`
- Record PR evidence:
  - `context/pr-diffs/` (use `pr-evidence-diff-summary-template.md`)

