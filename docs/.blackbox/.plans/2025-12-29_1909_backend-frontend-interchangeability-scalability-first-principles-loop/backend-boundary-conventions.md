# Backend Boundary Conventions (how `/api/*` stays stable and swappable)

Purpose:
- Document the *existing* backend boundary layout and the conventions that keep it:
  - frontend-swappable (stable `/api/*` contract)
  - provider-swappable (vendor details stay behind boundary + adapters)
  - scalable/operable (auth, tenant resolution, caching, logging)

Evidence rule:
- Any “exists today” statement cites a snapshot under:
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/`

Primary topology evidence:
- Functions directory tree: `artifacts/snapshots/functions-tree.maxdepth4.dirs.txt`
- `/api/*` handler inventory: `artifacts/snapshots/functions-api-files.clean.find.txt`
- Provider env reads (tracks remaining env coupling in `functions/**`): `artifacts/snapshots/functions-provider-env-reads.rg.txt`
- `/cart/c/*` and `/checkouts/*` seam snapshots:
  - `artifacts/snapshots/functions-cart-c-catchall.ts.head200.txt`
  - `artifacts/snapshots/functions-checkouts-catchall.ts.head200.txt`
  - `artifacts/snapshots/functions-_lib-shopifyCheckoutProxy.ts.head240.txt`

---

## 1) Canonical boundary location (what exists)

Canonical boundary:
- Cloudflare Pages Functions under `functions/api/**` implements the stable same-origin `/api/*` surface.

Evidence:
- Directory exists: `artifacts/snapshots/functions-tree.maxdepth4.dirs.txt`
- Handler inventory exists: `artifacts/snapshots/functions-api-files.clean.find.txt`
- Handler signature scan exists (Fetch-style handlers): `artifacts/snapshots/functions-api-handlers.clean.rg.txt`

Legacy surface (present, but treated as frozen until removed):
- There is also a route tree under `api/**`.
- This plan treats it as legacy drift risk until endpoints are migrated or deleted.

Evidence:
- `artifacts/snapshots/api-files.find.txt`
- `artifacts/snapshots/api-vs-functions.summary.txt`

---

## 2) Route grouping conventions (what exists)

The current `/api/*` surface is grouped by product area:

- `functions/api/storefront/**` — public storefront reads + cart operations  
  Evidence (dirs): `artifacts/snapshots/functions-tree.maxdepth4.dirs.txt`

- `functions/api/admin/**` — admin surface (orders, sections, etc.)  
  Evidence (dirs): `artifacts/snapshots/functions-tree.maxdepth4.dirs.txt`

- `functions/api/payments/**` — payment intent and payment-related boundary endpoints  
  Evidence (dirs): `artifacts/snapshots/functions-tree.maxdepth4.dirs.txt`
  Evidence (one handler snapshot): `artifacts/snapshots/functions-api-payments-intent-create.ts.head80.txt`

- `functions/api/shopify/**` — Shopify install/auth/webhooks (provider-specific boundary code lives here, not in UI)  
  Evidence (dirs): `artifacts/snapshots/functions-tree.maxdepth4.dirs.txt`

- `functions/api/customer/**` and `functions/api/customer-auth/**` — customer identity endpoints (tenant/user context)  
  Evidence (dirs): `artifacts/snapshots/functions-tree.maxdepth4.dirs.txt`

Cross-cutting:
- `functions/api/webhooks/**` — webhooks (identity/provider integrations)  
  Evidence (dirs): `artifacts/snapshots/functions-tree.maxdepth4.dirs.txt`

---

## 3) Shared backend primitives (what exists)

Shared helpers live under `functions/_lib/**`:
- Response helpers: `artifacts/snapshots/functions-_lib-response.ts.head160.txt`
- Supabase helper: `artifacts/snapshots/functions-_lib-supabase.ts.head280.txt`
- Shopify admin helper: `artifacts/snapshots/functions-_lib-shopifyAdmin.ts.head280.txt`
- Shopify OAuth helper: `artifacts/snapshots/functions-_lib-shopifyOAuth.ts.head280.txt`
- Shopify webhooks helper: `artifacts/snapshots/functions-_lib-shopifyWebhooks.ts.head280.txt`

These map to the “boundary owns cross-cutting concerns” design docs:
- Auth guard plan: `functions-auth-guards-spec.md`
- Tenant resolution plan: `functions-tenant-resolution-spec.md`
- Cache policy plan: `functions-cache-policy-spec.md`

---

## 4) First-class seam: vendor-agnostic checkout handoff (what exists)

Why this seam matters:
- Checkout URLs and behaviors tend to be provider-specific; frontends should not embed provider URLs.
- Keeping the handoff in first-party routes preserves UI interchangeability.

What exists today:
- A catch-all handler for `/cart/c/*`: `artifacts/snapshots/functions-cart-c-catchall.ts.head200.txt`
- A catch-all handler for `/checkouts/*`: `artifacts/snapshots/functions-checkouts-catchall.ts.head200.txt`
- A shared proxy module that implements the handoff seam: `artifacts/snapshots/functions-_lib-shopifyCheckoutProxy.ts.head240.txt`

Operational gate:
- The seam is now treated as a hard “swappability” acceptance gate (snapshot-required).  
  Evidence (gate metric): `artifacts/snapshots/stop-point-metrics.latest.txt`

---

## 5) Conventions to keep the boundary stable (recommended)

These are prescriptions (not current-state claims), chosen to preserve swappability + scalability:

- Every new endpoint should follow the “endpoint template” pattern:
  - consistent JSON response envelope
  - stable error codes
  - requestId logging
  - explicit cache headers
  Reference: `functions-endpoint-template.md`

- Every sensitive endpoint family must declare:
  - auth tier (public/user/admin/integration)
  - tenant resolution strategy (host/auth)
  - caching stance (public/private/no-store)
  References:
  - `backend-boundary-contract-v1.1-endpoint-table.md`
  - `contract-gaps-report-v1.1.md`
