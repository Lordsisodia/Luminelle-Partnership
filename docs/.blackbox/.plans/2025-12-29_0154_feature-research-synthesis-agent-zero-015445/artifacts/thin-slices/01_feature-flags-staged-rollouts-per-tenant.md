---
status: draft
last_reviewed: 2025-12-29
owner: agent-zero
rank: 1
---

# Thin Slice Spec — Feature flags + staged rollouts (per-tenant)

## 📌 Shared references (read once, use everywhere)

- Naming + API shape defaults: `artifacts/api-conventions.md`
- Shared domain nouns: `artifacts/domain-glossary.md`
- Error/response shape: `artifacts/api-error-contract.md`

## 🎯 Goal (1 sentence)

- merchant admin | internal ops (both): deliver the smallest version of **Feature flags + staged rollouts (per-tenant)** that creates real value and can ship safely.

## ✅ Decision snapshot

- Category: Platform primitives
- Fastest path: integrate (flag server) + minimal UI in our admin
- Recommended OSS default: Unleash/unleash (✅ Apache-2.0)

OSS options (license-aware):
- Unleash/unleash (✅ Apache-2.0)
- Flagsmith/flagsmith (✅ BSD-3-Clause)

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
  - `feature_flags`:
    - `id`, `tenant_id`, `key` (string, unique per tenant), `enabled` (bool), `description` (text), `created_at`, `updated_at`
  - Optional (week‑1 hardening): `feature_flag_rules`
    - `id`, `tenant_id`, `feature_flag_id`, `kind` (`tenant|percent|segment`), `value_json`, `created_at`

### 🔌 Minimal API (starter)

- Endpoints (admin):
  - `GET /admin/feature-flags`
  - `GET /admin/feature-flags/:id`
  - `POST /admin/feature-flags` (create)
  - `POST /admin/feature-flags/:id/actions/enable`
  - `POST /admin/feature-flags/:id/actions/disable`

Idempotency:
- Require `Idempotency-Key` for every action endpoint (see `artifacts/api-conventions.md`).

### 🖥️ Minimal UI (starter)

- One page in the admin:
  - `/feature-flags` list (key, enabled, updated_at)
  - detail drawer with:
    - description
    - enable/disable buttons
    - last 10 audit events for this flag

## 🗓️ 1‑week slice (what gets hardened)

- Add filters/search and bulk actions (if relevant)
- Add staged rollout controls (percent rollout + segment/tenant rules)
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

- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/launchdarkly.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/unleash.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/unleash-unleash.md`

## 🏪 Competitors proving demand (summary)

- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/launchdarkly.md`; `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/unleash.md`; `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/configcat.md`
