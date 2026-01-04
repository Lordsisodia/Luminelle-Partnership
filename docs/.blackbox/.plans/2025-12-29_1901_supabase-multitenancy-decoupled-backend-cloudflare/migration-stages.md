# Migration Stages (decoupled backend + multitenant Supabase)

This is the execution plan. It’s intentionally phased so you can stop safely after any stage.

---

## Stage 0 — Codify the boundary (docs + contracts)

Goal:
- “Swap frontend, backend stays” becomes a concrete statement with a boundary.

Actions:
- Document the backend contract surface (`/api/*`) aligned to platform ports.
- Decide tenancy resolution approach (domain-based for storefront, auth-based for admin).

Acceptance checks:
- Architecture docs exist and are discoverable.

---

## Stage 1 — Make provider boundaries enforceable (IDs + capabilities)

Goal:
- UI/product domains do not contain provider IDs or provider-specific assumptions.

Actions:
- Remove raw Shopify IDs above adapters (VariantKey only above boundary).
- Make checkout UI capabilities-driven; keep provider troubleshooting out of shared UI.

Acceptance checks:
- `./docs/.blackbox/scripts/check-vendor-leaks.sh --fail` passes.

---

## Stage 2 — Establish a stable backend API surface

Goal:
- Frontend only calls `/api/*` (same origin); vendors are behind the API.

Actions:
- Define/implement `/api/commerce/*`, `/api/content/*`, `/api/payments/*` endpoints.
- Ensure error semantics map to `PortError` codes.

Acceptance checks:
- A minimal client frontend can be rebuilt against the API without direct vendor SDK usage.

---

## Stage 3 — Introduce tenancy tables (unused at first)

Goal:
- You can store per-tenant configuration without changing existing behavior.

Actions:
- Add `tenants`, `tenant_domains`, `tenant_integrations` tables in Supabase.
- Define membership model for admin users.

Acceptance checks:
- Tables exist; no behavior change for the single tenant.

---

## Stage 4 — Tenant-aware config resolution (still single tenant)

Goal:
- Replace env-based Shopify config with tenant config lookup (but still only one tenant in practice).

Actions:
- Backend resolves tenant → integration config.
- Cloudflare edge resolves tenant by host.

Acceptance checks:
- Same tenant/store continues to work; no frontend changes required.

---

## Stage 5 — Onboard tenant #2

Goal:
- Prove the model works with a second tenant.

Actions:
- Add tenant, domain, integrations.
- Ensure RLS + backend enforcement prevents cross-tenant reads/writes.

Acceptance checks:
- Tenant #2 can operate without affecting tenant #1.

