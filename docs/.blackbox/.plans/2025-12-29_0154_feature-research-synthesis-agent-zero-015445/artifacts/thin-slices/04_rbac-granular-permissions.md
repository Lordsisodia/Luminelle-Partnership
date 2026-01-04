---
status: draft
last_reviewed: 2025-12-29
owner: agent-zero
rank: 4
---

# Thin Slice Spec — RBAC + granular permissions

## 📌 Shared references (read once, use everywhere)

- Naming + API shape defaults: `artifacts/api-conventions.md`
- Shared domain nouns: `artifacts/domain-glossary.md`
- Error/response shape: `artifacts/api-error-contract.md`

## 🎯 Goal (1 sentence)

- merchant admin | internal ops (both): deliver the smallest version of **RBAC + granular permissions** that creates real value and can ship safely.

## ✅ Decision snapshot

- Category: Admin / operations
- Fastest path: build (integrated with tenancy + audit log).
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
  - `roles`:
    - `id`, `tenant_id`, `name`, `created_at`, `updated_at`
  - `role_scopes`:
    - `id`, `tenant_id`, `role_id`, `scope` (e.g., `returns:approve`), `created_at`
  - `actor_roles`:
    - `id`, `tenant_id`, `actor_id`, `role_id`, `created_at`

### 🔌 Minimal API (starter)

- Endpoints:
  - `GET /admin/roles`
  - `GET /admin/roles/:id`
  - `POST /admin/roles` (create)
  - `POST /admin/roles/:id` (update)
  - `POST /admin/roles/:id/actions/add-scope`
  - `POST /admin/roles/:id/actions/remove-scope`
  - `POST /admin/actors/:id/actions/assign-role`
  - `POST /admin/actors/:id/actions/unassign-role`

### 🖥️ Minimal UI (starter)

- One page in the admin:
  - `/roles` list + detail drawer
  - add/remove scope chips (simple text entry to start)
  - assign role to one actor (basic selector)

## 🗓️ 1‑week slice (what gets hardened)

- Add filters/search and bulk actions (if relevant)
- Add role templates (starter roles) + “least privilege” suggestions
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

- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/shopify.md`

## 🏪 Competitors proving demand (summary)

- (none listed)
