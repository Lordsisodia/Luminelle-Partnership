# P0.3 Detailed Plan — Consolidate Backend Boundary (api/** → functions/api/**)

Purpose:
- Make “frontend swappable” real by ensuring there is exactly **one** canonical `/api/*` surface.
- Remove operational ambiguity created by having *two* backend implementations:
  - Cloudflare Pages Functions: `functions/api/**` (canonical)
  - Legacy/alternate Vercel-style handlers: `api/**` (legacy)

Evidence (current drift exists today):
- Drift summary: `artifacts/snapshots/api-vs-functions.summary.txt`
- Api-only endpoints list: `artifacts/snapshots/api-only-endpoints.txt`
- Canonical functions endpoint inventory: `artifacts/snapshots/functions-api-files.clean.find.txt`

---

## 0) Invariants this stop-point enforces

- Single canonical backend boundary:
  - Canonical: `functions/api/**`
  - Legacy: `api/**` must be treated as frozen until removed
  Evidence that both trees exist today: `artifacts/snapshots/repo-top-level.ls.txt`

- Frontends are swappable because they speak one contract:
  - `/api/*` (same-origin) responses follow the contract + DTO conventions
  Contract: `backend-boundary-contract-v1.md`

---

## 1) Exit criteria (acceptance checks)

- Drift trends down:
  - `api_only` in `artifacts/snapshots/api-vs-functions.summary.txt` decreases over time.
  - Long-term target: `api_only=0` (parity or deletion).

- The “must-migrate” endpoints (called by current UI) exist under `functions/api/**`.
  Evidence for “must-migrate by usage”: `artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt`

- This plan’s canonical boundary stance stays true:
  - No new endpoints are added under `api/**`.
  - New endpoints are added only under `functions/api/**`.
  Evidence that `api/**` is still present and drifting: `artifacts/snapshots/api-files.find.txt`

---

## 2) Current drift inventory (what’s missing on Cloudflare)

- Quantified drift (latest):
  - Read from: `artifacts/snapshots/api-vs-functions.summary.txt`
  - Current snapshot shows `api_only=13` and `functions_only=5`.

- “Must migrate first” (directly called by current UI):
  - (none)
  Evidence: `artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt`

- “Still used by scripts” (migrate or update scripts before deleting `api/**`):
  - `/api/shopify/webhooks/products_create` (used by `scripts/test-webhook.mjs`)
  Evidence: `artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt`

---

## 3) Migration strategy (thin-slice, keep UI unchanged)

Principle:
- Move behavior to the canonical Cloudflare boundary **without changing UI call sites** first.
- Once parity exists on Cloudflare, you can optionally:
  - delete `api/**`, or
  - move it to `legacy/` / `_archive` (if you need it as reference)

Practical notes:
- `functions/api/**` is Fetch-style Cloudflare Pages Functions (`export const onRequest`).
  Evidence: `artifacts/snapshots/functions-api-handlers.clean.rg.txt`
- `api/**` handlers are Vercel-style (Node runtime patterns appear: `process.env`, `@vercel/node`, Node `crypto`).
  Evidence (example): `artifacts/snapshots/api-cloudinary-sign.ts.head260.txt`

### 3.1 P0.3 execution checklist (implementation-ready, no UI changes)

This is the “do the minimal thing” checklist to execute P0.3 safely.

Status:
- The P0.3 thin slice (newsletter + cloudinary parity) is already complete.  
  Evidence: `context/pr-diffs/2025-12-31_p0-3_consolidate-backend-boundary-thin-slice.md`, `artifacts/snapshots/api-vs-functions.summary.txt`
- Remaining work is cleanup of the current `api_only` set (13 endpoints).  
  Evidence: `artifacts/snapshots/api-only-endpoints.txt`, `artifacts/snapshots/stop-point-metrics.latest.txt`

1) Create required persistence (newsletter) before moving traffic
   - Legacy newsletter endpoint currently runs `CREATE TABLE IF NOT EXISTS public.newsletter_signups` at request time (do not keep that behavior in Cloudflare).  
     Evidence: `artifacts/snapshots/api-newsletter-subscribe.ts.head260.txt`
   - There is no existing `server/migrations/**` mention of newsletter tables today, so add a migration first.  
     Evidence: `artifacts/snapshots/p0-3_server_newsletter_matches.rg.txt`

2) Implement canonical endpoints under `functions/api/**` (parity first)
   - Add `functions/api/newsletter/subscribe.ts` preserving the legacy response JSON shape (`{ ok, created }`).  
     Evidence for the shape: `artifacts/snapshots/api-newsletter-subscribe.ts.head260.txt`
   - Add `functions/api/cloudinary/sign.ts` preserving the legacy response JSON shape (`{ signature, timestamp, api_key, cloud_name, ... }`).  
     Evidence: `artifacts/snapshots/api-cloudinary-sign.ts.head260.txt`

3) Preserve Cloudinary UI expectations (admin upload workflow)
   - The current admin UI calls `/api/cloudinary/sign` and only passes a `folder`.  
     Evidence: `artifacts/snapshots/src-domains-admin-catalog-ui-pages-ProductsPage.tsx.cloudinary-snippet.L1200-1260.txt`
   - Cloudinary env vars required for signing are documented in `.env.example`.  
     Evidence: `artifacts/snapshots/env-example.cloudinary.L90-140.txt`

4) Defer security hardening to PR 2 (keep P0.3 compatible)
   - Legacy signing endpoint has only an optional shared-secret guard; the UI does not send that header.  
     Evidence: `artifacts/snapshots/api-cloudinary-sign.ts.head260.txt` and `artifacts/snapshots/src-domains-admin-catalog-ui-pages-ProductsPage.tsx.cloudinary-snippet.L1200-1260.txt`
   - P0.3 goal is “single canonical boundary + parity”; PR 2 goal is “enforce admin auth tiers consistently”.

5) Refresh gates + confirm drift decreases
   - Run: `./.blackbox/scripts/refresh-1909-all-gates.sh`
   - Confirm drift decreases:
     - `artifacts/snapshots/api-vs-functions.summary.txt`
     - `artifacts/snapshots/api-only-endpoints.txt`
   - Confirm new canonical handlers are visible:
     - `artifacts/snapshots/functions-api-files.clean.find.txt`
   - Expected thin-slice delta after migrating both `MIGRATE_NOW` endpoints (newsletter + cloudinary):
     - `api_only` decreases by **2** (because 2 `api/**` endpoints become implemented in `functions/api/**`).  
       Evidence baseline: `artifacts/snapshots/api-vs-functions.summary.txt`

---

## 4) Per-endpoint migration recipes (high priority)

### 4.1 `/api/newsletter/subscribe` → `functions/api/newsletter/subscribe.ts`

Why this is first:
- It is called from multiple UI components today, so missing it blocks Cloudflare-first operation.  
  Evidence: `artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt`

Current implementation (legacy):
- File: `api/newsletter/subscribe.ts`
- Uses a direct Postgres pool and runs `CREATE TABLE IF NOT EXISTS` at request time.  
  Evidence: `artifacts/snapshots/api-newsletter-subscribe.ts.head260.txt`
- DB helper: `api/_lib/db.ts` (pg Pool via `DATABASE_URL`).  
  Evidence: `artifacts/snapshots/api-_lib-db.ts.head260.txt`

Legacy request/response contract (must preserve in P0.3):
- Request:
  - `POST /api/newsletter/subscribe`
  - JSON: `{ email: string, source?: string }`
- Responses:
  - `200` JSON: `{ ok: true, created: boolean }`
  - `400` text: `"Missing email"` or `"Invalid email"`
  - `405` text: `"Method not allowed"`  
Evidence: `artifacts/snapshots/api-newsletter-subscribe.ts.head260.txt`

Current UI call sites (why UI stays unchanged during P0.3):
- `src/ui/components/GlobalFooter.tsx`  
  Evidence: `artifacts/snapshots/src-ui-components-GlobalFooter.tsx.head240.txt`
- `src/ui/components/NewsletterModal.tsx`  
  Evidence: `artifacts/snapshots/src-ui-components-NewsletterModal.tsx.head260.txt`
- `src/domains/client/marketing/ui/sections/shop-email-capture-band/EmailCaptureBand.tsx`  
  Evidence: `artifacts/snapshots/src-domains-client-marketing-ui-sections-shop-email-capture-band-EmailCaptureBand.tsx.head220.txt`

Target contract shape (Cloudflare boundary):
- Endpoint tier: `public` (newsletter signup is not an admin action).
- Tenant: `yes` (if newsletter signups are tenant-owned; this plan assumes they are).
- Cache: `no-store`.
- Response envelope: follow DTO conventions.  
  Spec: `dto-and-capabilities-spec-v0.1.md`

Implementation guidance (Cloudflare):
- Do not use `pg` from the edge.
- Prefer a Supabase table insert via backend-owned credentials.
  - This aligns with the multi-tenant direction (backend-owned tenant context).  
    Spec: `tenancy-context-rules.md`
- Avoid DDL in request handlers (no `CREATE TABLE` on-request).
  - There is no existing `server/migrations/**` mention of newsletter tables, so this should be added as a migration before production.  
    Evidence: `artifacts/snapshots/p0-3_server_newsletter_matches.rg.txt`

Suggested Supabase migration (SQL draft; implement when code changes are allowed):
- Goal: replace runtime DDL with a stable schema, while preserving legacy behavior (email is unique; `created` indicates if an insert happened).  
  Evidence (legacy table + insert semantics): `artifacts/snapshots/api-newsletter-subscribe.ts.head260.txt`
- Draft:

```sql
-- newsletter_signups: capture high-intent emails (P0.3: single-tenant compatible)
create table if not exists public.newsletter_signups (
  id bigserial primary key,
  email text not null unique,
  source text,
  created_at timestamptz not null default now()
);

-- RLS: only service role can write/read by default (public endpoint writes via backend service key)
alter table public.newsletter_signups enable row level security;

drop policy if exists newsletter_signups_insert_service on public.newsletter_signups;
create policy newsletter_signups_insert_service
  on public.newsletter_signups
  for insert
  to service_role
  with check (true);

drop policy if exists newsletter_signups_read_service on public.newsletter_signups;
create policy newsletter_signups_read_service
  on public.newsletter_signups
  for select
  to service_role
  using (true);
```

Multi-tenant note (future, not P0.3):
- When PR 5 adds tenancy tables, evolve this to tenant-scoped uniqueness by:
  - adding `tenant_id` (and backfilling/deriving it from host),
  - replacing `unique(email)` with `unique(tenant_id, email)`,
  - and restricting any admin reads to the current tenant.

Acceptance evidence after implementation:
- `functions/api/newsletter/subscribe.ts` appears in:
  - `artifacts/snapshots/functions-api-files.clean.find.txt`
- Drift decreases by 1 (for this endpoint):
  - `api_only` decreases in `artifacts/snapshots/api-vs-functions.summary.txt`
  - Note: the combined P0.3 thin-slice (newsletter + cloudinary) should decrease `api_only` by **2**.

---

### 4.2 `/api/cloudinary/sign` → `functions/api/cloudinary/sign.ts`

Why this is first:
- It is called from the admin product workflow in the UI (Cloudinary upload signing).  
  Evidence: `artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt`

Current implementation (legacy):
- File: `api/cloudinary/sign.ts` (Vercel handler + Node `crypto` + `process.env`).  
  Evidence: `artifacts/snapshots/api-cloudinary-sign.ts.head260.txt`

Legacy request/response contract (must preserve in P0.3):
- Request:
  - `POST /api/cloudinary/sign`
  - JSON: `{ folder?: string, public_id?: string }`
- Response:
  - `200` JSON: `{ signature, timestamp, api_key, cloud_name, folder, public_id }`  
Evidence: `artifacts/snapshots/api-cloudinary-sign.ts.head260.txt`

Current UI call site:
- `src/domains/admin/catalog/ui/pages/ProductsPage.tsx`  
  Evidence: `artifacts/snapshots/src-domains-admin-catalog-ui-pages-ProductsPage.tsx.cloudinary-snippet.L1200-1260.txt`

Security posture gap (why this needs an explicit decision):
- The legacy endpoint includes an optional `ADMIN_SHARED_SECRET` check, but the UI callsite does not send such a header.  
  Evidence: `artifacts/snapshots/api-cloudinary-sign.ts.head260.txt` and `artifacts/snapshots/src-domains-admin-catalog-ui-pages-ProductsPage.tsx.cloudinary-snippet.L1200-1260.txt`

Target contract shape (Cloudflare boundary):
- Endpoint tier: `admin` (recommended default; signing upload params should not be public).
- Tenant: `yes`.
- Cache: `no-store`.

Migration approach (two-phase, keeps P0.3 small):
- Phase A (P0.3): implement Cloudflare endpoint with *temporary* protection equivalent to legacy behavior.
  - Use a shared secret header if already configured in environments, or use existing internal auth primitives once PR 2 lands.
  - The goal of P0.3 is parity + canonical boundary; tier hardening can be completed in PR 2.
- Phase B (PR 2): wire consistent auth guards into admin endpoints (make this endpoint unambiguously “admin-tier”).
  - Detailed plan: `pr-2-auth-guards-detailed-plan.md`

Cloudflare runtime compatibility notes:
- Replace Node `crypto.createHash('sha1')` with Web Crypto (`crypto.subtle.digest`) or a tiny pure-JS SHA1 utility.
- Replace `process.env.*` with Cloudflare env bindings.
- Keep request parsing Fetch-native.
- Cloudinary env keys are documented in `.env.example` (server keys + Vite public keys).  
  Evidence: `artifacts/snapshots/env-example.cloudinary.L90-140.txt`
- Cloudinary media already has a Supabase table migration (`cms_product_media`), so the system can store media metadata without adding new schema for P0.3.  
  Evidence: `artifacts/snapshots/server-migrations-2025-12-16_cms_product_media.sql.head120.txt`

Cloudflare SHA1 signing snippet (Web Crypto; docs-only, for implementation guidance):
- This mirrors the legacy algorithm (sorted param string + `CLOUDINARY_API_SECRET`, SHA1 hex digest).  
  Evidence for the legacy algorithm: `artifacts/snapshots/api-cloudinary-sign.ts.head260.txt`

```ts
// Pseudocode for functions/api/cloudinary/sign.ts
const encoder = new TextEncoder()
const timestamp = Math.round(Date.now() / 1000)

const params: Record<string, string | number> = { timestamp }
if (folder) params.folder = folder
if (public_id) params.public_id = public_id

const toSign = Object.keys(params)
  .sort()
  .map((k) => `${k}=${params[k]}`)
  .join('&')

// IMPORTANT: Cloudinary expects SHA1 over `${toSign}${apiSecret}` (not an HMAC)
const bytes = encoder.encode(`${toSign}${env.CLOUDINARY_API_SECRET}`)
const digest = await crypto.subtle.digest('SHA-1', bytes)
const signature = [...new Uint8Array(digest)]
  .map((b) => b.toString(16).padStart(2, '0'))
  .join('')
```

Acceptance evidence after implementation:
- `functions/api/cloudinary/sign.ts` appears in:
  - `artifacts/snapshots/functions-api-files.clean.find.txt`
- Drift decreases by 1 (for this endpoint):
  - `api_only` decreases in `artifacts/snapshots/api-vs-functions.summary.txt`
  - Note: the combined P0.3 thin-slice (newsletter + cloudinary) should decrease `api_only` by **2**.

---

## 5) Medium priority recipes (ops / scripts)

These are not “frontends are blocked” items, but they contribute to boundary ambiguity if left behind forever.

### 5.1 `api/admin/media/*` → `functions/api/admin/media/*`

Status: completed (already present under the canonical boundary).

Evidence:
- Admin media endpoints exist under `functions/api/admin/media/*`:  
  `artifacts/snapshots/functions-api-files.clean.find.txt`
- Admin media endpoints no longer appear in the `api_only` drift list:  
  `artifacts/snapshots/api-only-endpoints.txt`

### 5.2 `api/shopify/webhooks/products_create` → `functions/api/shopify/webhooks/products-create.ts`

Why:
- Functions already has a Shopify webhook family; missing this is a likely parity gap.  
  Evidence (functions webhooks exist): `artifacts/snapshots/functions-api-files.clean.find.txt`

Recommended sequencing:
- Migrate if it’s used in your Shopify app config / docs.

---

## 6) Low priority items (stubs / future)

These should not be migrated until there is a real user-facing need.

Candidates:
- `api/internal/recovery-cron`
- `api/storefront/cart/share`
- `api/storefront/cart/restore`
- `api/shopify/settings`
- `api/shopify/billing/create`
- `api/orders/list`  
Evidence: `artifacts/snapshots/api-only-endpoints.txt`

Guideline:
- Do not migrate stubs “just because they exist”.
- Prefer deleting/archiving legacy stubs once you confirm they’re unused.

---

## 7) Parity table (remaining `api_only` endpoints)

Purpose:
- Make P0.3 execution mechanical by deciding the fate of every remaining `api_only` endpoint.

Evidence inputs:
- Current api-only list (13 items): `artifacts/snapshots/api-only-endpoints.txt`
- Usage triage (what’s called from UI/scripts vs only mentioned in docs): `artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt`
- Implementation heads (quickly identify “endpoint vs helper” and runtime constraints): `artifacts/snapshots/api-only-endpoints.handlers.head80.txt`
- Coverage check (parity table includes all current api-only endpoints): `artifacts/snapshots/p0-3_parity-table-coverage.latest.txt`

Completed (already migrated into the canonical boundary):
- `/api/newsletter/subscribe` → `functions/api/newsletter/subscribe.ts`  
  Evidence: `context/pr-diffs/2025-12-31_p0-3_consolidate-backend-boundary-thin-slice.md`, `artifacts/snapshots/api-vs-functions.summary.txt`
- `/api/cloudinary/sign` → `functions/api/cloudinary/sign.ts`  
  Evidence: `context/pr-diffs/2025-12-31_p0-3_consolidate-backend-boundary-thin-slice.md`, `artifacts/snapshots/api-vs-functions.summary.txt`

Legend (fate):
- `MIGRATE_NOW`: required for Cloudflare-first operation with current UI (keep UI unchanged).
- `MIGRATE_LATER`: likely needed, but can wait until the relevant feature/ops workflow is in scope.
- `DEFER`: not currently used; keep legacy for reference or delete later when safe.
- `INVESTIGATE`: referenced in docs only (or unclear), but plausibly needed for Shopify app ops; verify before deciding.

| Endpoint | Evidence of usage | Fate | Notes |
|---|---|---|---|
| `/api/shopify/webhooks/products_create` | scripts | `MIGRATE_LATER` | Used by `scripts/test-webhook.mjs`; if Shopify app config relies on this webhook, migrate into functions webhooks family. |
| `/api/shopify/webhooks/checkouts-create` | none found | `DEFER` | Legacy Vercel webhook handler, but not registered by current Shopify auth callback or webhook registration script (no `CHECKOUTS_*` topics). Evidence: `artifacts/snapshots/functions-api-shopify-auth-callback.ts.head240.txt`, `artifacts/snapshots/scripts-register-webhooks.mjs.head220.txt`, `artifacts/snapshots/api-shopify-webhooks-checkouts-create.ts.head260.txt`. |
| `/api/shopify/webhooks/checkouts-update` | none found | `DEFER` | Same as above. Evidence: `artifacts/snapshots/functions-api-shopify-auth-callback.ts.head240.txt`, `artifacts/snapshots/scripts-register-webhooks.mjs.head220.txt`, `artifacts/snapshots/api-shopify-webhooks-checkouts-update.ts.head260.txt`. |
| `/api/shopify/billing/create` | docs | `DEFER` | Embedded app billing helper (legacy PG session lookup) but no runtime/UI callsites found; revisit when embedded app billing is reintroduced behind tenant integrations config. Evidence: `artifacts/snapshots/src-shopify-settings-billing-sync.usage.rg.txt`, `artifacts/snapshots/api-shopify-billing-create.ts.head260.txt`. |
| `/api/shopify/settings` | docs | `DEFER` | Embedded app settings helper (legacy PG table, internal auth); no runtime/UI callsites found. Evidence: `artifacts/snapshots/src-shopify-settings-billing-sync.usage.rg.txt`, `artifacts/snapshots/api-shopify-settings.ts.head260.txt`. |
| `/api/shopify/sync` | none found | `DEFER` | Operational endpoint behind internal auth; no callsites found. Prefer converting to a CLI job long-term (not a public HTTP surface). Evidence: `artifacts/snapshots/src-shopify-settings-billing-sync.usage.rg.txt`, `artifacts/snapshots/api-shopify-sync.ts.head260.txt`. |
| `/api/shopify/backfill/customers` | none found | `DEFER` | One-off backfill; consider converting to a CLI script instead of an HTTP endpoint long-term. |
| `/api/shopify/backfill/orders` | none found | `DEFER` | Same as above. |
| `/api/og` | none found | `DEFER` | Legacy depends on `@vercel/og`. Delete unless you confirm a deployed OG meta tag hits this route. Evidence: `artifacts/snapshots/p0-3_investigate_og_usage.rg.txt`, `artifacts/snapshots/api-og.ts.head260.txt`. |
| `/api/orders/list` | docs | `DEFER` | Only referenced in docs; prefer deleting/archiving unless a real UI/ops consumer exists. |
| `/api/storefront/cart/share` | docs | `DEFER` | Future feature stub; migrate when cart recovery ships (likely alongside tenant tables + storage). |
| `/api/storefront/cart/restore` | docs | `DEFER` | Same as above. |
| `/api/internal/recovery-cron` | docs | `DEFER` | Stub; migrate only when cron is implemented in Cloudflare/Supabase context. |

---

## 8) Verification checklist (what to run after each migration)

- Refresh evidence:
  - `./.blackbox/scripts/refresh-1909-all-gates.sh`
  - `./.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`
- Confirm drift decreases:
  - `artifacts/snapshots/api-vs-functions.summary.txt`
  - `artifacts/snapshots/api-only-endpoints.txt`
- Confirm the contract table updates:
  - `backend-boundary-contract-v1.1-endpoint-table.md`
- Record an evidence diff summary after each PR:
  - `context/pr-diffs/` (template: `pr-evidence-diff-summary-template.md`)
