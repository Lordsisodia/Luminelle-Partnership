# PR 2 — Auth Guards (detailed plan)

Scope: **plan-only** (no `src/` or `functions/` changes in this PR doc).

This plan turns **“auth as an accident”** into **“auth as a contract”** for the endpoints that are currently the highest risk to swappability and safe operation.

---

## Why PR 2 is the next stop-point

Evidence of the current risk surface:
- Contract gap scan shows **13** endpoints that *look like they have no auth enforcement cues* (admin orders, metrics, orders):  
  `contract-gaps-report-v1.1.md`
- Example: `functions/api/admin/orders/get.ts` reads directly from Supabase with no auth guard visible:  
  `artifacts/snapshots/functions-api-admin-orders-get.ts.head220.txt`
- Example: `functions/api/metrics/summary.ts` calls a Supabase RPC with no auth guard visible:  
  `artifacts/snapshots/functions-api-metrics-summary.ts.head220.txt`
- Frontend admin orders API calls `/api/admin/orders/*` **without Authorization headers**:  
  `artifacts/snapshots/src-domains-admin-orders-data-adminOrdersApi.ts.head220.txt`
- In contrast, the admin content page already uses a manual `Authorization: Bearer <pass>` flow stored in `sessionStorage` (`lumelle_admin_pass`):  
  `artifacts/snapshots/src-domains-admin-pages-ui-pages-ContentPage.tsx.head260.txt`
- There is an existing shared internal auth guard helper that checks `Authorization: Bearer <INTERNAL_SHARED_SECRET>`:  
  `artifacts/snapshots/functions-_lib-internalAuth.ts.head260.txt`

Implication:
- We currently have **inconsistent security semantics** across admin UI flows:
  - some admin endpoints are protected by an internal bearer secret (admin content sections), while
  - admin orders + metrics endpoints appear unguarded (and are called from the UI without auth).

This blocks “swappable frontend” because:
- A swappable UI needs a stable rule: **what credential is required for which endpoint tier** (public/user/admin/integration/internal).  
  `functions-auth-guards-spec.md`

---

## Target outcome (PR 2 acceptance checks)

The PR 2 implementation (future code PR) is “done” when:
- `contract-gaps-report-v1.1.md` section **A** contains **no** `admin/**`, `metrics/**`, or `orders/**` entries (or only entries we explicitly justify and document).
- Admin UI endpoints have **one consistent** credential story for the current stage:
  - either the admin UI always supplies a bearer token (manual pass for now), or
  - admin UI uses a real admin auth mechanism and endpoints validate that.
- `stop-point-status-dashboard.md` “Auth gap hot-spots” shows:
  - admin: `0`, exports: `0`, metrics: `0`, orders: `0` (heuristic target), and recommends PR 3 next.

Note: exports are already protected by internal auth and no longer show up in auth gaps:  
`contract-gaps-report-v1.1.md`

---

## Decision (make now; implement later)

**Recommended (minimum-scope, consistent, unblock-swappability):**
- Treat **admin/metrics/orders** endpoints as **“internal tier”** *temporarily* and require `requireInternalAuth()` for all of them.
- Treat the UI’s “admin pass” (`lumelle_admin_pass`) as the bearer token used for this internal tier **in dev / personal mode**.

Why this is the correct interim choice:
- It matches a real, already-shipping pattern used by admin content sections:  
  `artifacts/snapshots/functions-api-admin-sections-get.ts.head220.txt`  
  `artifacts/snapshots/functions-_lib-internalAuth.ts.head260.txt`
- It avoids having to define full user/admin identity + RBAC in the same PR. The RBAC design exists, but implementing it is bigger:  
  `authz-rbac-design-v0.1.md`

Explicitly not the long-term end state:
- Eventually admin endpoints should use a true `admin` tier with roles, auditing, and least privilege (see the existing spec):  
  `functions-auth-guards-spec.md`

---

## Exact scope: endpoints to change (future implementation PR)

These are the current endpoints flagged by the latest gap scan:
`contract-gaps-report-v1.1.md`

Admin orders (2):
- `functions/api/admin/orders/get.ts`  
  `artifacts/snapshots/functions-api-admin-orders-get.ts.head220.txt`
- `functions/api/admin/orders/list.ts`  
  `artifacts/snapshots/functions-api-admin-orders-list.ts.head220.txt`

Metrics (8):
- `functions/api/metrics/daily.ts`  
  `artifacts/snapshots/functions-api-metrics-daily.ts.head220.txt`
- `functions/api/metrics/refund-rate.ts`  
  `artifacts/snapshots/functions-api-metrics-refund-rate.ts.head220.txt`
- `functions/api/metrics/refunds-by-sku.ts`  
  `artifacts/snapshots/functions-api-metrics-refunds-by-sku.ts.head220.txt`
- `functions/api/metrics/repeat.ts`  
  `artifacts/snapshots/functions-api-metrics-repeat.ts.head220.txt`
- `functions/api/metrics/source-revenue.ts`  
  `artifacts/snapshots/functions-api-metrics-source-revenue.ts.head220.txt`
- `functions/api/metrics/summary.ts`  
  `artifacts/snapshots/functions-api-metrics-summary.ts.head220.txt`
- `functions/api/metrics/top-skus.ts`  
  `artifacts/snapshots/functions-api-metrics-top-skus.ts.head220.txt`
- `functions/api/metrics/utm-sources.ts`  
  `artifacts/snapshots/functions-api-metrics-utm-sources.ts.head220.txt`

Orders (3):
- `functions/api/orders/by-email.ts`  
  `artifacts/snapshots/functions-api-orders-by-email.ts.head220.txt`
- `functions/api/orders/by-name.ts`  
  `artifacts/snapshots/functions-api-orders-by-name.ts.head220.txt`
- `functions/api/orders/get.ts`  
  `artifacts/snapshots/functions-api-orders-get.ts.head220.txt`

---

## UI changes required (future implementation PR)

If PR 2 adds internal auth guards, the UI must send the token for the endpoints it calls.

Evidence that admin orders UI does not send auth headers today:
- `artifacts/snapshots/src-domains-admin-orders-data-adminOrdersApi.ts.head220.txt`

Evidence that a compatible mechanism already exists in UI:
- `artifacts/snapshots/src-domains-admin-pages-ui-pages-ContentPage.tsx.head260.txt`

Implementation plan (UI):
- Create a shared helper (location TBD, but under `src/domains/admin/shared/**`):
  - `getAdminAuthHeaders(): Record<string,string> | {}` that returns `Authorization: Bearer ${sessionStorage.getItem('lumelle_admin_pass')}`
- Update all admin/metrics/orders client fetches used from the admin UI to include `...getAdminAuthHeaders()`.
- Ensure missing admin pass produces a helpful error message (“enter admin pass”) rather than a generic failure.

---

## Functions changes required (future implementation PR)

Implementation plan (functions):
- For each scoped endpoint:
  - import `requireInternalAuth` from `functions/_lib/internalAuth`
  - call it at the top of the handler
  - on `{ ok: false }`, return `401` (or `500` for missing env secret) consistently

Reference for the intended semantics:
- `functions-auth-guards-spec.md`

Reference for the underlying helper:
- `artifacts/snapshots/functions-_lib-internalAuth.ts.head260.txt`

---

## Evidence delta expected after PR 2

After the implementation PR (not this doc) lands, the following deltas should be visible:
- `contract-gaps-report-v1.1.md` section A should drop from **13** to **0** (heuristic).  
  Evidence file is the report itself.
- `artifacts/snapshots/functions-api-auth-tenant-cues.rg.txt` should contain new `requireInternalAuth(` hits for admin/metrics/orders.
- `stop-point-status-dashboard.md` should report “Auth gap hot-spots” as all zeros and recommend PR 3.

Gate commands:
- `./.blackbox/scripts/refresh-1909-all-gates.sh`
- `./.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`

