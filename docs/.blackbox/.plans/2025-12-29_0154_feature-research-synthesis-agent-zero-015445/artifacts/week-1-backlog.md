---
status: active
last_reviewed: 2025-12-29
owner: agent-zero
---

# Week 1 Backlog (Ops Action Center MVP — foundations + one “safe action”)

Goal: ship a **read-only order context + timeline** and one **safe, auditable action** in the Ops Action Center.

Reference docs:
- Implementation spec (primary): `artifacts/implementation-epics-action-center-exceptions.md`
- MVP workflow spec: `artifacts/final-synthesis.md` (sections “1b” + “1c”)
- API/DB conventions: `artifacts/api-conventions.md` + `artifacts/api-error-contract.md`
- Decision log: `artifacts/open-questions.md`

Evidence anchors (why this is the wedge):
- Support action center pattern: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/gorgias.md`
- Returns exchange-first + fraud gates: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/loop-returns.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/returngo.md`

## ✅ Day 1–2: Foundations (auditability + safety rails)

### 1) Audit log baseline (v1)

- Create `audit_log` table per `artifacts/api-conventions.md`
- Add middleware/hook so every write endpoint can emit audit events
- Add admin UI (read-only):
  - `GET /admin/audit-log` with filters (actor/action/entity/time)

Definition of done:
- A single write action logs a row in `audit_log` (before/after + correlation_id)
- Admin can filter by action + entity_type

### 2) RBAC baseline (v1)

- Create `roles`, `role_scopes`, `actor_roles` (or equivalent)
- Enforce scope checks on one write endpoint
- Add a “roles” admin surface (read-only first)

Definition of done:
- A denied action returns a consistent 403 error
- A permitted action logs audit + succeeds

### 3) Runs + idempotency primitive (for action runner)

- Create `runs` table (or reuse `exception_runs` shape from the implementation spec)
- Add minimal endpoints:
  - `GET /admin/runs`
  - `GET /admin/runs/:id`
- Add idempotency key convention for “actions” endpoints (header + DB storage)

Definition of done:
- We can create a run record and display it with status + error payload (redacted)
- The same idempotency key cannot create duplicate side-effects

## ✅ Day 3–5: Ops Action Center (read-only context + timeline)

### 4) Order context snapshot + ingestion boundary

- Define “our source of truth” boundary:
  - ingest Shopify data into an `order_context_snapshots` cache (or equivalent)
  - render UI from our cache (not live Shopify calls on every page)
- Create minimum tables (names flexible; shapes should match implementation spec nouns):
  - `orders` (or `order_cache`)
  - `order_context_snapshots` (latest per order)
  - `order_timeline_events` (append-only)

Definition of done:
- For one Shopify order, we can render:
  - customer identity basics
  - totals + payment status
  - fulfillment status summary
- Timeline shows at least 10 event types from `OrderEvent.type` (read-only)

### 5) Ticket list + ticket detail UI (Action Center shell)

- Create minimal “tickets” surface (even if it’s internal-only at first):
  - `tickets` (or `support_tasks`) table with `status`, `assignee`, `order_id`
- UI screens (MVP):
  - ticket list (filters: status/assignee/age)
  - ticket detail (thread placeholder + order context panel)

Definition of done:
- Operator can open ticket and see the order context panel + timeline without tool switching.

## ✅ Day 6–7: One safe action + exceptions loop (MVP)

### 6) Safe action v1: “Create internal task / note” (no external side effects)

- Implement the action runner pattern for exactly one action:
  - `POST /admin/action-center/tickets/:id/actions/create-task`
- Requirements:
  - RBAC check
  - idempotency key
  - audit log entry (`ACTION_ATTEMPTED`, `ACTION_SUCCEEDED|FAILED`)
  - exceptions entry on failure (our-runner-only)

Definition of done:
- The action is visible in the order timeline and auditable end-to-end.
- A forced failure creates an exception with reason_code and a “Retry” CTA.

### 7) Shopify read-only integration smoke test (one order)

- Implement a single ingestion path for one order:
  - query order basics + fulfillmentOrders (order-scoped) + transactions
  - persist snapshot + emit timeline events
- Keep it deterministic: order-scoped preflight only (per `artifacts/open-questions.md`)

Definition of done:
- We can ingest one real order and render it in the Action Center UI.
- Timeline events are visible and stable across refreshes (loaded from our DB).
