---
status: active
last_reviewed: 2025-12-29
owner: agent-zero
---

# API + DB Conventions (for thin-slice specs)

Purpose: eliminate ambiguity in the thin-slice specs by giving **consistent default names** for:
- tables
- endpoints
- permissions
- audit log
- idempotency

This doc is intentionally generic so it works before the real app schema exists.

## 🧱 Core nouns (recommended)

- `tenant` — the merchant/org boundary
- `actor` — the authenticated user (admin/operator)

Related:
- Domain glossary: `artifacts/domain-glossary.md`
- Error/response contract: `artifacts/api-error-contract.md`

## 🗄️ Baseline tables (create once, reuse everywhere)

### `audit_log`

Minimum columns:
- `id`
- `tenant_id`
- `actor_id`
- `action` (string, e.g. `feature_flag.update`, `return.approve`)
- `entity_type` (string, e.g. `feature_flag`, `return`, `workflow_run`)
- `entity_id` (string/uuid)
- `payload_json` (json) — include inputs + before/after if feasible
- `created_at`

### `runs` (only if you have async actions)

Minimum columns:
- `id`
- `tenant_id`
- `kind` (string: `workflow`, `sync`, `export`, `retry`)
- `status` (`queued|running|succeeded|failed|canceled`)
- `error` (text nullable)
- `created_at`, `started_at`, `finished_at`

## 🔌 API conventions (admin)

All admin endpoints are under:
- `/admin`

### List/read
- `GET /admin/<resource>`
- `GET /admin/<resource>/:id`

### Create/update
- `POST /admin/<resource>`
- `POST /admin/<resource>/:id`

### “Safe action” endpoints (preferred pattern)

Write actions should be explicit, not overloaded on “update”:
- `POST /admin/<resource>/:id/actions/<action>`

Examples:
- `POST /admin/returns/:id/actions/approve`
- `POST /admin/orders/:id/actions/refund`
- `POST /admin/workflows/:id/actions/enable`

### Idempotency

For every write/action endpoint, accept:
- `Idempotency-Key` header (string)

Persist it (or hash) with `(tenant_id, endpoint, key)` uniqueness for replay protection.

## 🛡️ RBAC conventions

Keep it simple:
- A role has scopes: `resource:action`

Examples:
- `feature_flags:write`
- `returns:approve`
- `orders:refund`
- `audit_log:read`

Every write action must:
- check scope
- write audit log entry

## 🧪 “Thin slice” defaults (good enough to ship)

- One list page + one detail drawer + one safe action
- Every write emits audit log
- If there’s async work: create a `runs` record + show it in UI
