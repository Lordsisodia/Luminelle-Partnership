# Supabase Multitenancy + Decoupled Backend (Cloudflare) — Plan

Context:
- Commerce is Shopify today.
- Hosting/edge is Cloudflare.
- Database is Supabase.
- You want the system to evolve toward: **one Supabase project serving multiple clients/tenants**, while keeping the **frontend swappable**.

This document is a plan (no code changes yet).

Run folder (full detail + audit trail):
- `docs/.blackbox/.plans/2025-12-29_1901_supabase-multitenancy-decoupled-backend-cloudflare/`

---

## 1) The core architecture move: define a stable backend boundary

Treat your backend as a BFF:
- Frontends call your stable `/api/*` contract.
- Cloudflare Workers/Pages Functions implement `/api/*`.
- Vendors (Shopify/Stripe) and Supabase are accessed server-side behind adapters/ports.

This aligns with the existing platform architecture:
- ports: `src/domains/platform/**/ports/*`
- adapters: `src/domains/platform/**/adapters/**`
- runtime selection: `src/domains/platform/**/runtime.ts`

See: `docs/.blackbox/.plans/2025-12-29_1901_supabase-multitenancy-decoupled-backend-cloudflare/backend-boundary.md`

---

## 2) Multitenancy plan for Supabase (one project, many clients)

Design principle:
- Every tenant-owned row has `tenant_id`.
- Backend resolves tenancy (domain/auth) and enforces it.
- RLS is used to prevent cross-tenant access, with the backend as the primary access path (service role).

Recommended tenancy resolution:
- Storefront: domain-based tenant resolution (host → tenant).
- Admin: auth-based (tenant membership claim) with fallback to domain.

See: `docs/.blackbox/.plans/2025-12-29_1901_supabase-multitenancy-decoupled-backend-cloudflare/supabase-multitenancy-plan.md`

---

## 3) Phased execution (don’t do it all now)

Recommended stages:
1) Make provider boundaries enforceable (no vendor IDs above adapters).
2) Establish a minimal stable `/api/*` surface aligned to platform ports.
3) Add tenancy tables in Supabase (unused at first).
4) Switch config resolution to tenant-aware (still single tenant).
5) Onboard tenant #2.

See: `docs/.blackbox/.plans/2025-12-29_1901_supabase-multitenancy-decoupled-backend-cloudflare/migration-stages.md`

