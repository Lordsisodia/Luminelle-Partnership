# Final Report — Multitenant Supabase + Decoupled Backend (Cloudflare) (plan only)

## ✅ 1) Summary (what happened)

- Documented a target architecture where the **frontend is swappable** while backend contracts remain stable.
- Proposed a Supabase multitenancy strategy for “one project, many clients” that you can adopt incrementally.
- Grounded the approach in the repo’s existing strengths: platform ports/adapters/runtimes.

## 🧭 2) Key idea

Treat “backend” as a **BFF boundary**:
- Frontends call your stable `/api/*` contract.
- Cloudflare edge runs the API and resolves tenancy.
- Providers (Shopify, Stripe) and DB (Supabase) are behind ports/adapters.

## 📦 3) Artifacts (paths)

- Plan folder: `docs/.blackbox/.plans/2025-12-29_1901_supabase-multitenancy-decoupled-backend-cloudflare`
- Key outputs:
  - `docs/.blackbox/.plans/2025-12-29_1901_supabase-multitenancy-decoupled-backend-cloudflare/backend-boundary.md`
  - `docs/.blackbox/.plans/2025-12-29_1901_supabase-multitenancy-decoupled-backend-cloudflare/supabase-multitenancy-plan.md`
  - `docs/.blackbox/.plans/2025-12-29_1901_supabase-multitenancy-decoupled-backend-cloudflare/migration-stages.md`

## 🧪 4) Verification / success criteria (when implemented)

- Provider boundaries: no vendor IDs above adapters (enforced via vendor leak scan).
- Tenant isolation: no cross-tenant reads/writes (verified via RLS tests and/or backend contract tests).
- Frontend swapping: a minimal alternate frontend can implement core flows using only `/api/*` contract + capabilities.

## ❓ 5) Open decisions

1) Tenant definition: brand/client/org vs store/domain.
2) Tenancy resolution: domain-based (storefront) + auth-based (admin) is recommended; confirm.
3) Auth model: keep Clerk fixed or plan an `AuthPort` for swap-ability later.
4) Supabase strategy long-term: single project vs per-tenant project (we’re planning for single project first).

