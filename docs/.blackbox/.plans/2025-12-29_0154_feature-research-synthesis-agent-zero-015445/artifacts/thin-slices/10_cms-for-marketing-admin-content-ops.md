---
status: draft
last_reviewed: 2025-12-29
owner: agent-zero
rank: 10
---

# Thin Slice Spec — CMS for marketing/admin content ops

## 📌 Shared references (read once, use everywhere)

- Naming + API shape defaults: `artifacts/api-conventions.md`
- Shared domain nouns: `artifacts/domain-glossary.md`
- Error/response shape: `artifacts/api-error-contract.md`

## 🎯 Goal (1 sentence)

- internal ops (primary), merchant admin (secondary): deliver the smallest version of **CMS for marketing/admin content ops** that creates real value and can ship safely.

## ✅ Decision snapshot

- Category: Content / SEO
- Fastest path: integrate CMS (service boundary) + embed surfaces.
- Recommended OSS default: payloadcms/payload (✅ MIT)

OSS options (license-aware):
- payloadcms/payload (✅ MIT)

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
  - `content_pages` (only if we need a local pointer layer):
    - `id`, `tenant_id`, `slug`, `title`, `external_id` (optional), `created_at`, `updated_at`

### 🔌 Minimal API (starter)

- Endpoints (admin):
  - `GET /admin/content/pages` (list)
  - `GET /admin/content/pages/:id` (detail)
  - Optional (if embedding Payload): `GET /admin/content/embed-url` (returns a safe, tenant-scoped embed link)

### 🖥️ Minimal UI (starter)

- One page in the admin:
  - `/content/pages` list view
  - clicking a page opens:
    - either an embed panel to the CMS (read-only to start)
    - or a detail drawer showing external_id/links

## 🗓️ 1‑week slice (what gets hardened)

- Add filters/search and bulk actions (if relevant)
- Add publishing workflow (draft/preview/publish) using the approvals primitive
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

- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/payload-cms.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/payloadcms-payload.md`

## 🏪 Competitors proving demand (summary)

- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/payload-cms.md`; `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/strapi.md`
