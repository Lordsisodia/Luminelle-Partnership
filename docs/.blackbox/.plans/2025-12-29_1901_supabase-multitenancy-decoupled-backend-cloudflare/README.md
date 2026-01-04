# Plan: supabase multitenancy + decoupled backend (cloudflare)

## Goal
Document a **future-proof architecture** where:
- Shopify remains the current commerce provider (initially),
- Cloudflare is the hosting/edge layer (Pages/Workers),
- Supabase is the database (single Supabase project serving multiple clients/tenants later),
- the **frontend is swappable** while the backend/API contracts remain stable.

This is a docs-only plan (no code changes yet).

## Created
2025-12-29 19:01

## Target (optional)
Not time-bound; optimize for correctness + a practical migration path.

## Context
- Prompt: prepare for “one Supabase instance for many clients” without doing it immediately; keep backend decoupled from frontend.
- Constraints:
  - No code changes yet; architecture + plan only.
  - Keep the current Shopify integration working.
  - Keep Cloudflare deployment assumptions in mind (edge runtime, SSR/SPA, Pages Functions / Workers).
- “Done” definition:
  - We have clear docs that specify:
    - the stable backend boundary (BFF/API) and how the frontend talks to it
    - the Supabase multitenancy strategy (tenant model, RLS, configuration)
    - what changes are needed now vs later (phased plan)

## Docs To Read (and why)
- [ ] `docs/05-planning/research/lumelle-architecture-map.md` — current macro architecture.
- [ ] `docs/05-planning/research/lumelle-architecture-improvements.md` — current improvement roadmap.
- [ ] `src/domains/platform/commerce/runtime.ts` — how commerce provider selection works today.
- [ ] `src/domains/platform/payments/runtime.ts` — how payments provider selection works today.
- [ ] `src/domains/platform/storage/supabase.ts` — current Supabase client usage.

## Plan Steps
- [ ] Step 1: Define the stable backend boundary (API surface + auth + tenancy context).
- [ ] Step 2: Define Supabase multitenancy approach (tenant model + RLS + config).
- [ ] Step 3: Define Cloudflare edge role (routing, auth/session, proxy rules).
- [ ] Step 4: Define phased migration steps and acceptance checks.

## Artifacts (created/updated)
- `backend-boundary.md` — proposed “backend contract” so frontends can be swapped.
- `supabase-multitenancy-plan.md` — tenant model, schema patterns, RLS strategy.
- `migration-stages.md` — what to do now vs later (phased execution).
- `final-report.md` — executive summary and decisions.

## Information Routing (where outputs should live)
- Run artifacts (raw/sources/extractions): keep inside this plan folder under `artifacts/`
- Reusable knowledge: promote into `docs/.blackbox/deepresearch/`
- Docs-wide deliverables: place under the correct `docs/0X-*/` category and add a link in the nearest folder `README.md` or `INDEX.md`

## Open Questions / Risks
- What is the tenant boundary? (brand/client/store/org)
- How is auth modeled? (Clerk as identity; Supabase as data; Shopify as commerce)
- How do we keep “Shopify primary domain checkout” working while running headless on Cloudflare?
- Do we want one Supabase project for all tenants, or one project per tenant in the long run?

## Notes / Revisions
- 2025-12-29: Plan created to document multitenant Supabase + decoupled backend architecture.
