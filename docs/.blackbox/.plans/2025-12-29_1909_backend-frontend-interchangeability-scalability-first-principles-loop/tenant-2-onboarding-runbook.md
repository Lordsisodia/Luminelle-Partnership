# Tenant #2 Onboarding Runbook (Cloudflare + Shopify + Supabase)

Goal:
- Add a second client/tenant without breaking tenant #1.
- Keep UI swappable: tenant resolution and integrations stay behind the backend boundary.

This runbook is intentionally “ops-first” and CLI-friendly.

Evidence anchors for current repo primitives:
- Cloudflare Pages Functions API exists under `functions/api/**`: `artifacts/snapshots/cloudflare-api-surface.rg.txt`, `artifacts/snapshots/functions-api-dir.ls.txt`
- Shopify app configuration exists in `shopify.app.toml`: `artifacts/snapshots/shopify.app.toml.head.txt`
- Shopify API handlers exist under `functions/api/shopify/**`: `artifacts/snapshots/functions-api-shopify-files.find.txt`
- Environment variable contract is documented in `.env.example`: `artifacts/snapshots/env-example-secrets.rg.txt`
- Tenancy resolution rules (host-first, cache-safe): `tenancy-context-rules.md`

---

## 0) Preconditions (what must already be true)

- Stage 0/1 boundary definitions exist:
  - `backend-boundary-contract-v1.md`
  - `acceptance-gates.md`
  - `migration-stages.md`
- Tenancy context rules exist and are agreed:
  - `tenancy-context-rules.md`

---

## 1) Decide the tenant key (domain plan)

Tenant keying rule (recommended):
- tenant is resolved primarily from the request Host header.

Operational decision:
- What is the tenant’s public domain?
  - example: `client2.example.com`
- Is this a “shared root” multi-tenant domain you control (e.g. `*.lumelle.app`) or a client-owned domain?

Why this matters:
- Host-based tenancy is what makes cache partitioning safe and deterministic.
  Evidence: `tenancy-context-rules.md`

---

## 2) Provision hosting (Cloudflare Pages)

Actions:
- Create (or configure) the Cloudflare Pages project for the tenant #2 frontend.
- Ensure the backend surface `/api/*` is routed to Pages Functions (same origin).

Verification:
- Confirm Cloudflare Functions exist in repo and are deployed:
  - `functions/api/**` is the backend surface: `artifacts/snapshots/cloudflare-api-surface.rg.txt`

---

## 3) Provision data (Supabase)

Two supported shapes (choose one):
- Option A (simpler): per-tenant Supabase project
- Option B (future): one shared Supabase project, tenant_id on every row, RLS enforced

This architecture plan targets Option B eventually; Stage 3 introduces tables without changing behavior:
- `migration-stages.md`

For tenant #2 onboarding:
- Ensure a tenant config record exists (schema design per `tenancy-context-rules.md`):
  - `tenants`
  - `tenant_domains`
  - `tenant_integrations`

Verification:
- Server-side Supabase secrets are required for `/api/*` handlers (env contract evidence): `artifacts/snapshots/env-example-secrets.rg.txt`

---

## 4) Provision commerce integration (Shopify)

Actions:
- Ensure Shopify app URLs/callbacks are correctly set for the tenant deployment.
  Evidence that repo uses a Shopify app config file: `artifacts/snapshots/shopify.app.toml.head.txt`
- Create Shopify integration config for tenant #2:
  - shop domain
  - API credentials / secrets
  - webhook receiver URL on Cloudflare

Verification:
- Shopify handler inventory exists under `functions/api/shopify/**`:
  - `artifacts/snapshots/functions-api-shopify-files.find.txt`

---

## 5) Set runtime secrets (Cloudflare)

Minimum required secrets (names per `.env.example`):
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `INTERNAL_SHARED_SECRET`
- `SHOPIFY_API_KEY`
- `SHOPIFY_API_SECRET` (and/or `SHOPIFY_WEBHOOK_SECRET` per comment contract)
- `CLERK_WEBHOOK_SECRET` (if using Clerk webhooks)

Evidence anchor for the names:
- `artifacts/snapshots/env-example-secrets.rg.txt`

Tenant-specific configuration approach (recommended):
- Do not hardcode tenant credentials in frontend env.
- Store tenant integrations in Supabase (Stage 3/4) and have the backend resolve tenant config server-side.
  Evidence: `tenancy-context-rules.md`

---

## 6) Smoke checks (tenant #2 works; tenant #1 unaffected)

Run these checks (conceptual; implement as code changes when allowed):

- Tenant resolution:
  - Request with host `tenant2.example.com` resolves to tenant #2
  - Request with host `tenant1.example.com` resolves to tenant #1
  - A user authenticated for tenant #1 cannot access tenant #2 admin routes
  Evidence target: `acceptance-gates.md` (G5)

- Vendor boundary:
  - No vendor IDs above adapters:
    - `./docs/.blackbox/scripts/check-vendor-leaks.sh`
    - Evidence target: `acceptance-gates.md` (G3)

- Data isolation:
  - Supabase reads/writes are tenant-scoped (by tenant_id and/or RLS).
  Evidence target: `tenancy-context-rules.md`

---

## 7) “Stop conditions” (when to stop and document)

If any step is blocked by:
- Cloudflare/Vercel bot protection (site content not snapshotable from CLI)
- missing secrets
- uncertain tenant resolution rules

Then:
- Keep tenant #2 as “not onboarded”
- Record the blocking reason in `notes.md` and keep Stage 3/4 as the next milestone.
