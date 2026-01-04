---
status: draft
last_reviewed: 2025-12-29
owner: agent-zero
rank: 6
---

# Thin Slice Spec — Unified order timeline (“single pane of glass”)

## 📌 Shared references (read once, use everywhere)

- Naming + API shape defaults: `artifacts/api-conventions.md`
- Shared domain nouns: `artifacts/domain-glossary.md`
- Error/response shape: `artifacts/api-error-contract.md`

## 🎯 Goal (1 sentence)

- merchant admin | internal ops (both): deliver the smallest version of **Unified order timeline (“single pane of glass”)** that creates real value and can ship safely.

## ✅ Decision snapshot

- Category: Admin / operations
- Fastest path: build + integrate (shipping/returns/support context panels).
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
  - `orders` (existing or stub):
    - `id`, `tenant_id`, `status`, `customer_id`, `created_at`, `updated_at`
  - `order_timeline_events`:
    - `id`, `tenant_id`, `order_id`, `kind` (e.g., `status`, `note`, `support`, `return`),
      `payload_json`, `created_at`

### 🔌 Minimal API (starter)

- Endpoints:
  - `GET /admin/orders/:id`
  - `GET /admin/orders/:id/timeline`
  - Optional (if you want a quick win): `POST /admin/orders/:id/actions/add-note`

### 🖥️ Minimal UI (starter)

- One page in the admin:
  - `/orders/:id` order detail page
  - right panel timeline (latest first)
  - links to related objects (returns/support/shipping) when present

## 🗓️ 1‑week slice (what gets hardened)

- Add filters/search and bulk actions (if relevant)
- Add embedded context panels (support ticket, shipment, return)
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

- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/gorgias.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/shipstation.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/marmelab-react-admin.md`

## 🏪 Competitors proving demand (summary)

- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/shopify.md`; `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/gorgias.md`
