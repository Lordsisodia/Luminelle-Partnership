---
status: draft
last_reviewed: 2025-12-29
owner: agent-zero
rank: 9
---

# Thin Slice Spec — Support inbox → action center

## 📌 Shared references (read once, use everywhere)

- Naming + API shape defaults: `artifacts/api-conventions.md`
- Shared domain nouns: `artifacts/domain-glossary.md`
- Error/response shape: `artifacts/api-error-contract.md`

## 🎯 Goal (1 sentence)

- internal ops: deliver the smallest version of **Support inbox → action center** that creates real value and can ship safely.

## ✅ Decision snapshot

- Category: (see features-ranked)
- Fastest path: build
- Recommended OSS default: (build)

## 🧩 Thin slice (1 day) — exact steps

1) Define the single “unit of work” and states
2) Add the minimal DB tables
3) Add the minimal API endpoints
4) Build the minimal UI screen
5) Add guardrails (RBAC + audit log + idempotency)
6) Add a demo seed + verify end-to-end

### 🗄️ Minimal data model (starter)

- Tables (create only what’s needed):
  - `audit_log` (see `artifacts/api-conventions.md`)
  - `support_tasks` (or `cases`):
    - `id`, `tenant_id`, `status` (`open|in_progress|resolved`), `assignee_actor_id` (nullable),
      `order_id` (nullable), `subject`, `created_at`, `updated_at`
  - Optional (week‑1): `support_task_events` for timeline/history in the drawer.

### 🔌 Minimal API (starter)

- Endpoints:
  - `GET /admin/support-tasks`
  - `GET /admin/support-tasks/:id`
  - `POST /admin/support-tasks/:id/actions/assign`
  - `POST /admin/support-tasks/:id/actions/resolve`

### 🖥️ Minimal UI (starter)

- One page in the admin:
  - `/support-tasks` queue list
  - detail drawer:
    - assign/resolve actions
    - order context panel (link to `/orders/:id`)

## 🗓️ 1‑week slice (what gets hardened)

- Add filters/search and bulk actions (if relevant)
- Add “safe actions” panel (refund/replace/reship) behind approvals + RBAC
- Add retries + failure reasons (if async)
- Add alerts/notifications (optional)

## 🛡️ Guardrails (non-negotiable)

- RBAC: role gates for every write action
- Audit log: log all writes + include before/after when feasible
- Idempotency: protect write endpoints (especially “retry”/“run” actions)

## ✅ Acceptance criteria

- [ ] A teammate can demo the workflow in <5 minutes
- [ ] Every write action produces an audit log entry
- [ ] The thin slice can be safely disabled (feature flag or config)

## 🔗 Evidence links (for audit)

- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/gorgias.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/zendesk.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/intercom.md`

## 🏪 Competitors proving demand (summary)

- Gorgias; Zendesk; Intercom
