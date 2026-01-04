# P0.3 Evidence Diff — Consolidate Backend Boundary (thin slice)

## Stop point

- Stop point: `P0.3 — Consolidate backend boundary surface (api/** → functions/api/**)`
- Plan doc: `p0-3-boundary-consolidation-detailed-plan.md`

---

## Goal (1 line)

- Reduce `/api/*` drift by migrating the two UI-used `api/**` endpoints into the canonical Cloudflare boundary (`functions/api/**`) without changing UI callsites.

---

## Gates run

- Command:
  - `./.blackbox/scripts/run-1909-loop.sh`
- Evidence logs:
  - `artifacts/snapshots/refresh-1909-all-gates.2025-12-31_163634.log.txt`
  - `artifacts/snapshots/refresh-1909-contract-evidence.2025-12-31_163635.log.txt`
  - `artifacts/snapshots/refresh-1909-stop-point-dashboard.2025-12-31_163635.log.txt`

---

## What changed (facts)

- Added canonical Cloudflare Pages Functions endpoints:
  - `functions/api/newsletter/subscribe.ts`
  - `functions/api/cloudinary/sign.ts`
- Added a Supabase SQL migration to remove runtime DDL from the legacy newsletter endpoint:
  - `server/migrations/2025-12-31_newsletter_signups.sql`
- Added Cloudinary env bindings to the Cloudflare `Env` type (so functions compile cleanly):
  - `functions/_lib/types.ts`
- Added Web Crypto SHA‑1 helper for Cloudinary signing parity:
  - `functions/_lib/crypto.ts`

---

## Evidence snapshot deltas (what changed and why)

Drift targets (primary):
- `artifacts/snapshots/api-vs-functions.summary.txt`
  - expected/observed: `api_only` decreased (drift trending down).
- `artifacts/snapshots/stop-point-metrics.latest.txt`
  - observed: `backend_surface_api_only_endpoints` is now `17` (was `19` previously).
- `artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt`
  - observed: `/api/newsletter/subscribe` and `/api/cloudinary/sign` are no longer listed as api-only endpoints (their callsites now resolve to `functions/api/**`).

Canonical surface inventory:
- `artifacts/snapshots/functions-api-files.clean.find.txt`
  - observed: new canonical handlers appear under `functions/api/newsletter/subscribe.ts` and `functions/api/cloudinary/sign.ts`.

Contract table (secondary; auto-generated from `functions/api/**`):
- `backend-boundary-contract-v1.1-endpoint-table.md`
  - observed: endpoint table updates reflect the new canonical routes.

No-regression targets:
- `artifacts/snapshots/boundary-adapter-imports.ui-client.rg.txt`
  - expected/observed: remains empty.
- `artifacts/snapshots/check-vendor-leaks.txt`
  - expected/observed: unchanged (still `disallowed_lines=5` baseline).

---

## What endpoints were migrated (facts)

- Migrated to `functions/api/**`:
  - `/api/newsletter/subscribe` → `functions/api/newsletter/subscribe.ts`
  - `/api/cloudinary/sign` → `functions/api/cloudinary/sign.ts`
- UI callsites remained unchanged (no frontend path changes required):
  - `src/ui/components/GlobalFooter.tsx`
  - `src/ui/components/NewsletterModal.tsx`
  - `src/domains/client/marketing/ui/sections/shop/email-capture-band/EmailCaptureBand.tsx`
  - `src/domains/admin/catalog/ui/pages/ProductsPage.tsx`

---

## Notes / risks

- P0.3 is not “fully complete” until `api_only` trends to 0 (or `api/**` is removed/archived), but this thin slice removes the two highest-impact drift points used by the running UI.
- Remaining `api_only` endpoints are currently referenced by scripts/docs (see `artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt`) and can be migrated or retired later based on actual operational needs.

