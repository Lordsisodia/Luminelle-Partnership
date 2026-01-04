---
status: draft
last_reviewed: 2025-12-29
owner: agent-zero
rank: 7
---

# Thin Slice Spec — Admin usage analytics (what merchants actually use)

## 📌 Shared references (read once, use everywhere)

- Naming + API shape defaults: `artifacts/api-conventions.md`
- Shared domain nouns: `artifacts/domain-glossary.md`
- Error/response shape: `artifacts/api-error-contract.md`

## 🎯 Goal (1 sentence)

- internal ops (primary): deliver the smallest version of **Admin usage analytics (what merchants actually use)** that creates real value and can ship safely.

## ✅ Decision snapshot

- Category: Analytics / experiments
- Fastest path: integrate (analytics) + build dashboards.
- Recommended OSS default: PostHog/posthog (✅ MIT)

OSS options (license-aware):
- PostHog/posthog (✅ MIT)

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
  - `admin_events` (local event sink; can forward to PostHog):
    - `id`, `tenant_id`, `actor_id`, `name` (string), `properties_json`, `created_at`

### 🔌 Minimal API (starter)

- Endpoints:
  - `POST /admin/analytics/events` (ingest one event; used by admin UI)
  - `GET /admin/analytics/events?name=...&from=...&to=...`
  - `GET /admin/analytics/dashboard` (returns a small aggregate payload)

### 🖥️ Minimal UI (starter)

- One page in the admin:
  - `/analytics` dashboard page (counts for top 10 events)
  - one filter (time range)

## 🗓️ 1‑week slice (what gets hardened)

- Add filters/search and bulk actions (if relevant)
- Add funnels for 1 key flow (setup → first value)
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

- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/posthog.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/amplitude.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/posthog-posthog.md`

## 🏪 Competitors proving demand (summary)

- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/posthog.md`
