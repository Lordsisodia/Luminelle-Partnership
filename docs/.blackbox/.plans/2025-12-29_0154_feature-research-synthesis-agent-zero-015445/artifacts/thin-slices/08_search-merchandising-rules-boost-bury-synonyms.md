---
status: draft
last_reviewed: 2025-12-29
owner: agent-zero
rank: 8
---

# Thin Slice Spec — Search + merchandising rules (boost/bury, synonyms)

## 📌 Shared references (read once, use everywhere)

- Naming + API shape defaults: `artifacts/api-conventions.md`
- Shared domain nouns: `artifacts/domain-glossary.md`
- Error/response shape: `artifacts/api-error-contract.md`

## 🎯 Goal (1 sentence)

- merchant admin: deliver the smallest version of **Search + merchandising rules (boost/bury, synonyms)** that creates real value and can ship safely.

## ✅ Decision snapshot

- Category: Merchandising / CRO
- Fastest path: integrate search engine + build merch UI.
- Recommended OSS default: opensearch-project/OpenSearch (✅ Apache-2.0)

OSS options (license-aware):
- opensearch-project/OpenSearch (✅ Apache-2.0)
- typesense/typesense (🧨 GPL-3.0)

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
  - `search_synonyms`:
    - `id`, `tenant_id`, `term`, `synonyms_json`, `created_at`, `updated_at`
  - Optional (week‑1 hardening): `search_rules` (boost/bury rules).

### 🔌 Minimal API (starter)

- Endpoints:
  - `GET /admin/search/synonyms`
  - `POST /admin/search/synonyms` (upsert)
  - `POST /admin/search/synonyms/:id/actions/delete`
  - Optional: `POST /admin/search/actions/reindex` (async → `runs`)

### 🖥️ Minimal UI (starter)

- One page in the admin:
  - `/search/synonyms` list + editor drawer
  - one safe write action: upsert synonyms

## 🗓️ 1‑week slice (what gets hardened)

- Add filters/search and bulk actions (if relevant)
- Add approvals for publishable rules (optional)
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

- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/algolia.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/opensearch-project-opensearch.md`

## 🏪 Competitors proving demand (summary)

- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/algolia.md`
