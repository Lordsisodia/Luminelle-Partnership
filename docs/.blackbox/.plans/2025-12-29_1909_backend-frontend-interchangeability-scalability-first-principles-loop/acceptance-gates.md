# Acceptance Gates (CLI runnable)

Purpose:
- Convert architecture invariants into concrete, runnable checks.
- Ensure the repo stays “component-swappable” as it evolves.

Rule:
- When capturing a gate run, save its output under:
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/`

Evidence anchors already captured for reference:
- Adapter import scans: `artifacts/snapshots/boundary-adapter-imports.rg.txt`, `artifacts/snapshots/boundary-adapter-imports.ui-client.rg.txt`
- Vendor leak scan: `artifacts/snapshots/check-vendor-leaks.txt`
- Cloudflare API handler inventory: `artifacts/snapshots/functions-api-handlers.rg.txt`

---

## Gate G1 — “No adapters imported by UI”

Invariant:
- Frontend is swappable because UI does not depend on provider adapters.

Command (run from repo root):
- `rg -n \"@platform/.*/adapters\" src`

Expected:
- Empty output (or only references in tests/tooling).

Saved evidence example:
- `artifacts/snapshots/boundary-adapter-imports.rg.txt`

---

## Gate G2 — “No adapters imported by client domains”

Invariant:
- Client/product domains remain portable and do not import adapters directly.

Command:
- `rg -n \"domains/platform/.*/adapters\" src/domains/client src/ui`

Expected:
- Empty output.

Saved evidence example:
- `artifacts/snapshots/boundary-adapter-imports.ui-client.rg.txt`

---

## Gate G3 — “No vendor IDs above adapters”

Invariant:
- Provider IDs (Shopify GIDs, etc.) are never used above adapters.

Command:
- `./docs/.blackbox/scripts/check-vendor-leaks.sh`

Expected:
- Eventually: “clean” (hard gate once migration reaches Stage 1 in `migration-stages.md`).
- Interim: decreasing count; every remaining match must have an issue/plan reference.

Saved evidence example:
- `artifacts/snapshots/check-vendor-leaks.txt`

---

## Gate G4 — “Stable backend boundary exists on Cloudflare”

Invariant:
- Backend is swappable/portable because `/api/*` is implemented server-side (Cloudflare Pages Functions).

Commands:
- `ls -la functions/api`
- `rg -n \"export async function onRequest\" functions/api`

Expected:
- `functions/api/**` exists and contains handler entrypoints.

Saved evidence examples:
- `artifacts/snapshots/functions-api-dir.ls.txt`
- `artifacts/snapshots/functions-api-handlers.rg.txt`
- Cloudflare API surface references: `artifacts/snapshots/cloudflare-api-surface.rg.txt`

---

## Gate G4c — “Checkout proxy/handoff seam exists (first-party routes)”

Invariant:
- Frontend remains swappable because the UI does not need to know vendor checkout domains or vendor route rules.

What we expect to exist:
- First-party proxy routes:
  - `/cart/c/*` (cart handoff)
  - `/checkouts/*` (checkout handoff)
- A shared proxy helper module to centralize vendor-specific logic.

Command (recommended from `docs/`):
- `./.blackbox/scripts/refresh-1909-all-gates.sh`

Saved evidence examples:
- Checkout proxy/catchall handlers:
  - `artifacts/snapshots/functions-cart-c-catchall.ts.head200.txt`
  - `artifacts/snapshots/functions-checkouts-catchall.ts.head200.txt`
- Shared proxy helper:
  - `artifacts/snapshots/functions-_lib-shopifyCheckoutProxy.ts.head240.txt`

---

## Gate G4b — “Single canonical backend boundary” (no drift between `api/**` and `functions/api/**`)

Invariant:
- The repo must not evolve two different `/api/*` implementations (Cloudflare vs legacy), or frontend swaps become ambiguous.

How we measure it:
- Compare the normalized endpoint surfaces under:
  - `api/**` (legacy)
  - `functions/api/**` (canonical)

Command (recommended from `docs/`):
- `./.blackbox/scripts/refresh-1909-all-gates.sh`

Expected:
- `api_only` trends to 0 as parity is established (and then `api/**` can be deleted/archived).
- No new “api-only endpoints” appear without a migration plan.

Saved evidence examples:
- Drift summary: `artifacts/snapshots/api-vs-functions.summary.txt`
- Api-only endpoints: `artifacts/snapshots/api-only-endpoints.txt`
- Functions-only endpoints: `artifacts/snapshots/functions-only-endpoints.txt`

---

## Gate G5 — “Tenant resolution is deterministic + cache-safe”

Invariant:
- Multi-tenant is possible without cache leaks.

Check (docs-level, until code exists):
- `tenancy-context-rules.md` exists and defines:
  - host-first tenant resolution
  - auth-as-restriction for admin operations
  - cache key rules for public vs private endpoints

Evidence:
- `tenancy-context-rules.md`

---

## Gate G6 — “Runtime/provider selection stays centralized”

Invariant:
- Provider selection does not leak into UI.

Commands:
- `rg -n \"runtime\\.ts\" src/domains/platform -S`
- Inspect runtime inventory: `artifacts/snapshots/platform-runtime-files.txt`

Expected:
- Central runtimes exist and select provider implementations.

---

## Gate G7 — “Storefront boundary returns provider-neutral DTOs” (future; enable after PR10)

Invariant:
- A storefront UI must be swappable without understanding Shopify object shapes or Shopify IDs.
- Therefore `/api/storefront/*` (or `/api/storefront/v2/*`) must return provider-neutral DTOs and must not contain `gid://shopify/` identifiers in response payloads.

Current state evidence (why this gate is not expected to pass yet):
- Product endpoint includes Shopify IDs in the query and returns `{ product: data.product }`:  
  `artifacts/snapshots/functions-api-storefront-product-by-handle.ts.head220.txt`
- Cart DTO is currently `CART_FRAGMENT` which includes Shopify IDs and `checkoutUrl`:  
  `artifacts/snapshots/functions-_lib-storefront.ts.head280.txt`

Plan references:
- Mapping: `storefront-contract-dto-mapping-v0.1.md`
- Implementation plan: `pr-10-storefront-dto-normalization-detailed-plan.md`

Command (implementation phase; runtime check):
- Call a representative product + cart endpoint and fail if response contains `gid://shopify/`.
  - Example: `curl -sS \"https://<tenant-domain>/api/storefront/v2/product/by-handle?handle=<handle>\" | rg \"gid://shopify/\"`
  - Save the output under `artifacts/snapshots/` as part of the PR evidence diff.

Expected:
- After PR10: response scans find **no** `gid://shopify/` in the DTO payloads.

Evidence:
- `artifacts/snapshots/platform-runtime-files.txt`

---

## Gate G7 — “Vendor SDK imports are isolated + intentional” (report-only)

Invariant:
- We want the UI to remain swappable without dragging vendor SDK dependencies everywhere.
- Some vendor SDKs are *legitimately* UI-side (identity UI, embedded payment elements), but they must be:
  - rare,
  - capability/feature-flag gated,
  - and easy to locate/remove.

Command (recommended from `docs/`):
- `./.blackbox/scripts/refresh-1909-all-gates.sh`

What this gate produces:
- A report of vendor SDK imports that appear *outside* `src/domains/platform/**`:
  - `artifacts/snapshots/boundary-vendor-sdk-imports.nonplatform.rg.txt`

Expected:
- Today: this is a *baseline report*; every match must be explainable as one of:
  - **identity UI** (e.g., Clerk UI components)
  - **explicit embedded payment UI** (e.g., Stripe Elements) that is clearly marked dev-only or capability-gated
  - **accidental coupling** (migration target)
- Long-term: “accidental coupling” → 0, and the remaining set is a short allowlist.

Saved evidence example:
- `artifacts/snapshots/boundary-vendor-sdk-imports.nonplatform.rg.txt`
