---
status: active
last_reviewed: 2025-12-29
owner: agent-zero
---

# Week‑3 Backlog — Bulk actions + queues + SLAs (Ops Action Center at volume)

Purpose: take the Week‑1/Week‑2 thin slices and make them *operationally real* for merchant admins + internal ops.

This week is about:
- handling volume (bulk, batching)
- handling time (SLA, escalation)
- handling failure (exception loops, retries)

Shared references:
- Domain nouns: `artifacts/domain-glossary.md`
- API defaults: `artifacts/api-conventions.md`
- Error contract: `artifacts/api-error-contract.md`

## ✅ Outcomes (what “done” looks like)

- A teammate can process a queue of 200+ items without feeling pain.
- Every “safe action” has: idempotency + audit log + clear failure reason.
- We can define and measure SLA compliance per queue type.

## 🧩 Epic 1 — Bulk actions (safe + reversible)

### Scope
- Bulk select + bulk actions for at least 2 surfaces:
  - `returns`
  - `support_tasks` (or `inbox_threads`)

### Deliverables
- UI:
  - bulk select, select-all (paged), clear selection
  - bulk action confirmation modal with “what will happen” summary
- API:
  - `POST /admin/<resource>/bulk/actions/<action>`
  - accepts `ids[]` (or query-based selection token) + `Idempotency-Key`
- Audit:
  - single “bulk action started” entry + per-item entries (or per-item payload list)
- Guardrails:
  - max batch size (e.g. 50) + async processing via `runs`
  - partial failure handling (report failed IDs and reasons)

## 🧩 Epic 2 — Queues + prioritization (Action Center becomes real)

### Scope
- A unified queue view for internal ops:
  - `support_tasks` / `action_center_items`
- Priority + assignment

### Deliverables
- Data model (minimum):
  - `support_tasks`:
    - `id`, `tenant_id`, `kind`, `status`, `priority`, `assignee_actor_id` (nullable),
      `sla_due_at` (nullable), `created_at`, `updated_at`
  - Optional: `support_task_events` (if you want a lightweight timeline)
- API:
  - `POST /admin/support-tasks/:id/actions/assign`
  - `POST /admin/support-tasks/:id/actions/set-priority`
  - `POST /admin/support-tasks/:id/actions/resolve`
- UI:
  - queue list with filters: status/priority/assignee/kind
  - “claim next” button (optional)

## 🧩 Epic 3 — SLA + escalation (time becomes a first-class primitive)

### Scope
- Define SLA policies per task kind
- Track breaches + escalation suggestions

### Deliverables
- SLA policy table (minimum):
  - `sla_policies`: `id`, `tenant_id`, `task_kind`, `target_minutes`, `created_at`
- SLA computation:
  - set `sla_due_at` on creation (or on “entered queue” state)
- UI:
  - show time-to-due and “breached” badge
  - list view filters: `due_soon`, `breached`
- Analytics:
  - “breaches per day” + “median time to resolution”

## 🧩 Epic 4 — Exception loops + retries (failures are expected)

### Scope
- Standardize how failures are represented + retried (explicit exception lifecycle).

### Deliverables
- Every async run has:
  - `status`, `error_code`, `error_message`, `retry_count`
- “Retry” action for failed runs:
  - `POST /admin/runs/:id/actions/retry`
- UI:
  - failed items filter + “retry” button
  - clear, human-friendly error message (from `api-error-contract.md`)

Add explicit `exceptions.status` lifecycle (v1):
- `OPEN` → `RETRYING` → `OPEN|NEEDS_MANUAL_REVIEW|RESOLVED`
- `OPEN|NEEDS_MANUAL_REVIEW` → `CANCELED` (operator-initiated)

Evidence/spec reference:
- `artifacts/implementation-epics-action-center-exceptions.md` (Exceptions Queue state machine + retry/stop rules)

## ✅ Sequencing (recommended order)

1) Bulk actions (foundation for speed)
2) Queue/priority/assignment (foundation for ops)
3) SLA rules + breach indicators (foundation for urgency)
4) Exception loops + retries (foundation for robustness)
