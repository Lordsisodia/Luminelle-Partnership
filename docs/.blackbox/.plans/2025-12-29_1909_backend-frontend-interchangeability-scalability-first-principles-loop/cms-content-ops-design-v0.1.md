# CMS / Content Ops Design (v0.1, tenant-scoped)

Purpose:
- Define a content ops (CMS-like) domain that:
  - supports multi-tenant content management
  - stays frontend-swappable (UI consumes DTOs from `/api/*`)
  - avoids hard-wiring content to Shopify metaobjects or vendor identifiers

Evidence rule:
- Research claims cite the feature research snapshot excerpt.
- Current repo state claims cite snapshots/reports under this plan folder.

Research evidence:
- “CMS for marketing/admin content ops” is a top-10 recommendation.  
  - `artifacts/snapshots/feature-research-summary.head220.txt`

Repo evidence anchors (current content surface exists):
- Content ports + runtime exist (provider selection + contracts exist):  
  - `artifacts/snapshots/platform-ports-files.txt`
  - `artifacts/snapshots/src-domains-platform-content-runtime.ts.head.txt`
- Public endpoints exist for landing/product sections:  
  - `artifacts/snapshots/functions-api-files.clean.find.txt`

---

## 0) Invariants

- Content is tenant-owned and tenant-scoped.
- Public content endpoints are cacheable at the edge, tenant-safely.
- Admin content endpoints are authenticated and `no-store`.
- Content DTOs use internal keys and stable IDs (no vendor IDs).

Contract references:
- `backend-boundary-contract-v1.md`
- `dto-and-capabilities-spec-v0.1.md`
- `cache-invalidation-playbook-v0.1.md`

---

## 1) Content model (v0.1)

Minimum units:
- `Section` (typed block with props)
- `Page` (collection of sections for a route, e.g. landing or PDP)

Fields:
- `tenant_id`
- `key` (stable identifier)
- `kind` (landing / product / custom)
- `published_at`
- `draft_json` + `published_json`

Rationale:
- Supports draft/publish without coupling to a specific UI.

---

## 2) API surface

### 2.1 Public endpoints (cacheable)

Already exists (public content surface):
- `GET /api/storefront/landing/sections`
- `GET /api/storefront/product/sections`  
Evidence: `artifacts/snapshots/functions-api-files.clean.find.txt`

Policy:
- explicit cache headers per `backend-boundary-contract-v1.md`
- invalidation on admin publish per `cache-invalidation-playbook-v0.1.md`

### 2.2 Admin endpoints (tenant-scoped, authenticated)

Exists today (admin sections surface):
- `admin/sections/get`
- `admin/sections/update`  
Evidence: `contract-gaps-report-v1.1.md`

Extend later (planned):
- `POST /api/admin/sections/publish`
- `POST /api/admin/sections/unpublish`
- `GET /api/admin/sections/history`

These must:
- be authz-gated (`authz-rbac-design-v0.1.md`)
- emit audit events (`audit-log-design-v0.1.md`)

---

## 3) Tenancy + caching

Tenant resolution:
- host-first per `tenancy-context-rules.md`

Caching:
- public content endpoints are edge-cacheable; must be tenant-safe by host.
- cache invalidation occurs on admin publish/update.

Evidence that cache header gaps exist today for public content endpoints (heuristic):
- `contract-gaps-report-v1.1.md`

---

## 4) Data model (Supabase)

Tenant-owned tables:
- `content_sections`
- `content_pages`
- `content_versions` (optional)

Isolation posture:
- `tenant_id` everywhere + RLS defense-in-depth.
  - `supabase-rls-multitenancy-strategy.md`

---

## 5) Acceptance checks (implementation phase)

- Tenant #2 content does not bleed into tenant #1.
- Public content endpoints return explicit cache headers.
- Publishing content creates an audit event and invalidates caches.

