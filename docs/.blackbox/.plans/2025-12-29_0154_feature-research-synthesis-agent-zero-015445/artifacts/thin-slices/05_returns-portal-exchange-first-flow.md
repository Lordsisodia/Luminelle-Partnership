---
status: draft
last_reviewed: 2025-12-29
owner: agent-zero
rank: 5
---

# Thin Slice Spec — Returns portal + exchange-first flow

## 📌 Shared references (read once, use everywhere)

- Naming + API shape defaults: `artifacts/api-conventions.md`
- Shared domain nouns: `artifacts/domain-glossary.md`
- Error/response shape: `artifacts/api-error-contract.md`

## 🎯 Goal (1 sentence)

- merchant admin (primary): deliver the smallest version of **Returns portal + exchange-first flow** that creates real value and can ship safely.

## ✅ Decision snapshot

- Category: Customer / support + Post-purchase ops
- Fastest path: integrate (labels/carriers) + build workflow UI.
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
  - `returns`:
    - `id`, `tenant_id`, `order_id` (string/uuid), `status` (`requested|approved|rejected`),
      `reason_code`, `note`, `created_at`, `updated_at`
  - Optional (week‑1): `return_items` if you need per-line granularity.

### 🔌 Minimal API (starter)

- Endpoints (admin):
  - `GET /admin/returns`
  - `GET /admin/returns/:id`
  - `POST /admin/returns/:id/actions/approve`
  - `POST /admin/returns/:id/actions/reject`

Idempotency:
- Require `Idempotency-Key` for approve/reject.

### 🖥️ Minimal UI (starter)

- One page in the admin:
  - `/returns` queue list (filter by status)
  - detail drawer:
    - reason + note
    - order context link
    - approve/reject actions

## 🗓️ 1‑week slice (what gets hardened)

- Add filters/search and bulk actions (if relevant)
- Add “exchange-first” routing states (exchange vs refund) + reason codes
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

- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/loop-returns.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/aftership.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/happy-returns.md`

## 🏪 Competitors proving demand (summary)

- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/loop-returns.md`; `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/aftership.md`; `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/happy-returns.md`
