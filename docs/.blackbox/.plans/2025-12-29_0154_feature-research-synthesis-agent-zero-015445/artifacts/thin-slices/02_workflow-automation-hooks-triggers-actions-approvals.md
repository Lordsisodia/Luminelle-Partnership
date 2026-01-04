---
status: draft
last_reviewed: 2025-12-29
owner: agent-zero
rank: 2
---

# Thin Slice Spec — Workflow automation hooks (triggers → actions → approvals)

## 📌 Shared references (read once, use everywhere)

- Naming + API shape defaults: `artifacts/api-conventions.md`
- Shared domain nouns: `artifacts/domain-glossary.md`
- Error/response shape: `artifacts/api-error-contract.md`

## 🎯 Goal (1 sentence)

- merchant admin | internal ops (both): deliver the smallest version of **Workflow automation hooks (triggers → actions → approvals)** that creates real value and can ship safely.

## ✅ Decision snapshot

- Category: Platform primitives / Admin ops
- Fastest path: integrate (workflow engine) with strong guardrails
- Recommended OSS default: activepieces/activepieces (✅ MIT)

OSS options (license-aware):
- n8n-io/n8n (🧨 SUL-1.0)
- activepieces/activepieces (✅ MIT)

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
  - `workflows`:
    - `id`, `tenant_id`, `name`, `enabled` (bool), `trigger_kind` (`manual|webhook`), `trigger_config_json`, `created_at`, `updated_at`
  - `workflow_runs`:
    - `id`, `tenant_id`, `workflow_id`, `status` (`queued|running|succeeded|failed`), `error` (text), `started_at`, `finished_at`, `created_at`
  - Optional: reuse `runs` instead of `workflow_runs` if you prefer one generic table.

### 🔌 Minimal API (starter)

- Endpoints:
  - `GET /admin/workflows`
  - `POST /admin/workflows` (create)
  - `POST /admin/workflows/:id/actions/enable`
  - `POST /admin/workflows/:id/actions/disable`
  - `POST /admin/workflows/:id/actions/run` (manual trigger → creates `workflow_run`)
  - `GET /admin/workflow-runs?workflow_id=:id`
  - `POST /admin/workflow-runs/:id/actions/retry`

Idempotency:
- Require `Idempotency-Key` for `run` + `retry` endpoints (see `artifacts/api-conventions.md`).

### 🖥️ Minimal UI (starter)

- One page in the admin:
  - `/workflows` list + detail drawer
  - actions:
    - enable/disable
    - “Run now” (manual trigger)
  - embedded runs table (status + error + retry)

## 🗓️ 1‑week slice (what gets hardened)

- Add filters/search and bulk actions (if relevant)
- Add approvals (required for risky actions; log approvals in `audit_log`)
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

- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/n8n.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/activepieces-activepieces.md`

## 🏪 Competitors proving demand (summary)

- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/n8n.md`; `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/entries/zapier.md` (seed)
