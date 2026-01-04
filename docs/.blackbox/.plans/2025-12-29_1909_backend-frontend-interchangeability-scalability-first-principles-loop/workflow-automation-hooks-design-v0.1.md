# Workflow Automation Hooks (v0.1, tenant-scoped)

Purpose:
- Define a workflow automation primitive that:
  - turns system events into actions (with approvals when risky)
  - is tenant-scoped (multi-client ready)
  - remains UI-swappable (frontends do not embed workflow execution logic)

Evidence rule:
- Research claims cite the feature research snapshot excerpt.
- “Current repo state” claims cite snapshots/reports in this plan folder.

Research evidence:
- Workflow automation hooks (triggers/actions/approvals/run log) are a top-ranked recommendation.  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/feature-research-summary.head220.txt`

Repo evidence anchors (why the backend boundary is the right home):
- `/api/*` exists as Pages Functions (stable backend boundary):  
  - `artifacts/snapshots/functions-api-handlers.clean.rg.txt`
- Admin/exports/metrics endpoints exist, meaning “ops workflows” already exist as backend concepts:  
  - `artifacts/snapshots/functions-api-files.clean.find.txt`

---

## 0) Invariants

- Every trigger and run is tenant-scoped (`tenant_id`).
- Workflow evaluation and execution happen server-side (behind `/api/*`).
- UI can:
  - list workflows
  - enable/disable workflows
  - view run history
  - approve/deny pending runs
  - but UI does not run vendor actions directly.

---

## 1) Event model (triggers)

We define a small set of “platform events” as the trigger currency:
- `order.created`
- `order.refunded`
- `customer.created`
- `content.section.updated`
- `export.completed`
- `flags.changed`
- `authz.denied`

Notes:
- These are domain-level events; they are not Shopify/Stripe webhook types.
- Vendor webhooks are translated into platform events inside the backend boundary.

Evidence that Shopify webhooks exist server-side (translation point exists today):
- `artifacts/snapshots/functions-_lib-shopifyWebhooks.ts.head160.txt`

---

## 2) Action model (what workflows can do)

Actions are tenant-safe and provider-agnostic at the contract level:
- `notify.email` (send email)
- `notify.webhook` (call tenant-configured webhook)
- `tag.order` (apply a tag/attribute via commerce port)
- `export.orders` (initiate export)
- `flag.enable` / `flag.disable` (change feature flags)

Rule:
- Actions call platform ports or `/api/*` internal endpoints; they do not call vendor SDKs from UI.

Port-first alignment:
- Template reference: `platform-domain-template.md`

---

## 3) Approval model (safety)

Some actions should require approval:
- any action that mutates commerce state (refunds, cancellations)
- bulk exports
- configuration changes

Approval flow:
- workflow run becomes `pending_approval`
- UI/admin can approve/deny
- approval is audited

Audit requirement:
- All approvals/denials produce audit events.
  - `audit-log-design-v0.1.md`

---

## 4) API surface (stable for any frontend)

### 4.1 Admin management endpoints

- `GET /api/admin/workflows`
- `POST /api/admin/workflows/create`
- `POST /api/admin/workflows/update`
- `POST /api/admin/workflows/enable`
- `POST /api/admin/workflows/disable`

Tier: admin, tenant-scoped, `Cache-Control: no-store`.

### 4.2 Run log endpoints

- `GET /api/admin/workflow-runs`
- `GET /api/admin/workflow-runs/get`

Tier: admin, tenant-scoped, cursor pagination.

### 4.3 Approvals endpoints

- `POST /api/admin/workflow-runs/approve`
- `POST /api/admin/workflow-runs/deny`

Tier: admin, tenant-scoped, audited.

Contract references:
- `backend-boundary-contract-v1.md`
- `dto-and-capabilities-spec-v0.1.md`
- `authz-rbac-design-v0.1.md`

---

## 5) Data model (Supabase)

Minimum tables (tenant-owned):
- `workflows` (definition + enabled flag)
- `workflow_triggers` (optional, or embed in config)
- `workflow_runs` (append-only execution history)
- `workflow_approvals` (optional; or embed in runs)

Isolation baseline:
- include `tenant_id` and index it.
  - `tenant-data-model-proposal.md`
  - `supabase-rls-multitenancy-strategy.md`

---

## 6) Execution model (phased)

Phase 0 (docs-only now):
- Define contract shapes and tenancy rules.

Phase 1 (implementation later):
- Begin with “server-run only” actions that are easy to implement:
  - `notify.webhook` (tenant-configured outgoing webhook)
  - `export.orders` (already an endpoint family concept)

Phase 2:
- Add commerce actions once authz + audit are hardened.

---

## 7) Acceptance checks (when code changes begin)

- Workflow runs are tenant-isolated.
- Every run has a requestId/correlation id.
- Every approval/denial is audited.
- UI can be swapped without rewriting workflow execution logic.

