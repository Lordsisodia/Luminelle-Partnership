# Cache Invalidation Playbook (v0.1, Cloudflare `/api/*`)

Purpose:
- Define cache behavior in a way that keeps:
  - the frontend swappable (caching lives in `/api/*`, not UI routes)
  - tenancy safe (no cross-tenant cache mixing)
  - performance scalable (edge caching for public reads)

Evidence rule:
- “Current repo state” claims cite snapshots/reports under this plan folder.

Evidence anchors:
- Public endpoints exist and are expected to be edge-cacheable (by contract):  
  - `backend-boundary-contract-v1.md`
- Heuristic scan shows some public endpoints lacking explicit cache cues today:  
  - `contract-gaps-report-v1.1.md`
- `/api/*` route inventory exists:  
  - `artifacts/snapshots/functions-api-files.clean.find.txt`

---

## 0) Invariants

- Cache key must be tenant-safe:
  - host-based tenancy resolution is the primary mechanism.
  - no shared caching of private/authenticated responses.
  - `tenancy-context-rules.md`

- Public endpoints must explicitly declare cache headers:
  - `Cache-Control`, optionally `stale-while-revalidate`

---

## 1) Classify endpoints (policy)

### 1.1 Public, cacheable

Examples (exist today):
- `GET /api/storefront/landing/sections`
- `GET /api/storefront/product/by-handle`
- `GET /api/storefront/product/sections`  
Evidence: `artifacts/snapshots/functions-api-files.clean.find.txt`

Policy:
- `Cache-Control: public, max-age=<short>, stale-while-revalidate=<longer>`
- include `Vary` only if required (avoid unnecessary fragmentation)

### 1.2 Private, not cacheable

Examples:
- `admin/**`, `exports/**`, `metrics/**`, `orders/**`, `customer/**`  
Evidence (families exist): `artifacts/snapshots/functions-api-files.clean.find.txt`

Policy:
- `Cache-Control: no-store`
- include `Vary: Authorization` when relevant

---

## 2) Invalidation triggers (what causes a purge)

Tenant content changes should invalidate:
- landing sections cache
- product sections cache
- other CMS-derived public fragments

Where to trigger invalidation:
- backend boundary endpoints that mutate content:
  - `admin/sections/update` exists today.  
    Evidence: `contract-gaps-report-v1.1.md`

Audit requirement:
- cache invalidations should produce audit events (so operators can see “who purged what”).
  - `audit-log-design-v0.1.md`

---

## 3) Minimal purge mechanisms (choose one)

Option A (MVP): TTL-only
- Keep TTLs short enough that content updates are “eventually consistent”.

Option B (Preferred): explicit purge on mutation
- On `admin` mutations, purge affected cache keys.

Option C (Advanced): surrogate keys
- Use tags/keys so you can purge “all product sections for tenant X”.

---

## 4) Acceptance checks (when code changes begin)

- Public endpoints all set explicit cache headers (gaps reduce): `contract-gaps-report-v1.1.md`
- No private endpoint is accidentally cached (manual spot-check + headers).
- Cache invalidations are auditable per tenant.

