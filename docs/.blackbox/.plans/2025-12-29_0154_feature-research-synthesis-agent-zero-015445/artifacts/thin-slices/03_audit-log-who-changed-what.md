---
status: draft
last_reviewed: 2025-12-29
owner: agent-zero
rank: 3
---

# Thin Slice Spec — Audit log (“who changed what”)

## 📌 Shared references (read once, use everywhere)

- Naming + API shape defaults: `artifacts/api-conventions.md`
- Shared domain nouns: `artifacts/domain-glossary.md`
- Error/response shape: `artifacts/api-error-contract.md`

## 🎯 Goal (1 sentence)

- internal ops (primary), merchant admin (secondary): deliver the smallest version of **Audit log (“who changed what”)** that creates real value and can ship safely.

## ✅ Decision snapshot

- Category: Platform primitives
- Fastest path: build (on our event system) with simple UI.
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

### 🔌 Minimal API (starter)

- Endpoints:
  - `GET /admin/audit-log` (filterable list)
  - `GET /admin/audit-log/:id` (detail)

### 🖥️ Minimal UI (starter)

- One page in the admin:
  - `/audit-log` list + detail drawer
  - filters:
    - time range
    - actor_id
    - action prefix (e.g., `feature_flag.`)
    - entity_type + entity_id

## 🗓️ 1‑week slice (what gets hardened)

- Add filters/search and bulk actions (if relevant)
- Add “diff view” for common entity types (optional)
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
