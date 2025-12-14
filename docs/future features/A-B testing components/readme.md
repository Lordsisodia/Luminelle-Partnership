# A/B Testing & Heatmap Initiative — Current Status

## What’s done (docs + hybrid-first implementation behind env flags)
- Plans & checklists: `ab-testing-components.md`, `checklist.md`, `implementation-plan.md` (50 steps), `state-of-play.md`.
- Worklog tracking: `build-steps-worklog.md` (status of each doc/stub).
- Specs/runbooks: `first-experiment-spec.md` (hero CTA), `staging-runbook.md`, `handoff-into-code.md`, `migration-apply-guide.md`, `env-flags.md`.
- Backend schema draft: `server/migrations/2025-12-11_experiments.sql` (tables, view, seed, RLS stubs).
- Server/client stubs: `server-stub.md`, `client-stub.md` (env-gated routes/provider; not mounted).
- Client SDK scaffolding (fallback option): `src/experiments/*` (hash, identity, config, track queue, provider).
- PostHog client integration (gated by env, no autocapture/pageviews/replay):
  - `src/lib/analytics/posthog.ts` (init + capture + checkout attribution attrs)
  - `src/lib/analytics/useFeatureFlagVariant.ts` (feature flags without `$feature_flag_called`)
  - `src/main.tsx` initializes PostHog early (still gated by env)
- First experiment wired (gated by env + PostHog flag): `src/domains/landing/ui/sections/shop/hero-shop/HeroShop.tsx` uses PostHog multivariate flag `hero_cta_copy` and emits `experiment_exposure` + `cta_click`.
- Funnel instrumentation:
  - `add_to_cart` from PDP (`ProductPage`)
  - `begin_checkout` + Shopify cart attributes before redirect (Cart + Checkout pages)
- Shopify purchase attribution:
  - Cloudflare Pages Functions: `functions/api/shopify/webhooks/orders-create.ts` sends server-side `purchase` to PostHog when `POSTHOG_API_KEY` is set.
  - (Legacy / Node/Vercel) `api/shopify/webhooks/orders-create.ts` does the same for non-Workers deployments.
- Analytics/heatmap assets: `dashboard-template.md`, `srm-missing-exposure-cron.sql`, `heatmap-overlay.md`, `current-ui-measurement.md` (some are now optional with the hybrid).
- QA/test/privacy: `qa-checklist.md`, `test-plan.md`, `privacy-consent.md`.
- Tooling options + strategy:
  - `tooling-options.md` (options list)
  - `hybrid-analytics-heatmaps-stack.md` (recommended free-first: Clarity + PostHog + lean DB layer)
  - `integration-plan.md` (how it all integrates end-to-end)
  - `optimization-loop.md` (how we use data weekly to improve conversion + retention)
- First-experiment decision rules and metrics captured.

## What’s NOT done (waiting for approval)
- No PostHog project/flag configuration captured in repo (needs PostHog UI setup per client).
- No env vars set in staging/prod yet (everything is gated off by default).
- Clarity is not wired yet (heatmaps/replay still “tool choice + wiring” step).
- DB-backed experiment routes (`/api/experiment/*`) still not implemented (we’re using PostHog flags as the primary path).

## Ready-to-run next steps (once approved)
0) Confirm the tooling choice (recommended hybrid in `hybrid-analytics-heatmaps-stack.md`) and set staging env vars only.
1) Create a PostHog multivariate feature flag: `hero_cta_copy` with variants `control` and `bold` (50/50).
2) Set staging env vars (see `env-flags.md`):
   - `VITE_EXPERIMENTS_ENABLED=true`
   - `VITE_ANALYTICS_ENABLED=true`
   - `VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST`
3) Verify staging PostHog funnel: exposure → CTA click → begin checkout.
4) Verify purchase attribution:
   - Ensure cart attributes are present on the Shopify order (note attributes)
   - Set `POSTHOG_API_KEY`/`POSTHOG_HOST` on webhook environment
   - Confirm webhook sends `purchase` to PostHog with matching `ph_distinct_id`
5) Run QA checklist and 3–7 day baseline (with Clarity if enabled).
6) Production rollout: enable tracking “control-only” for 24h, then run the 50/50 experiment.

## Kill switches / safety
- Env flags default false in docs (`env-flags.md`); routes return 404 when disabled; provider skipped when disabled.
- Consent/DNT gating documented in `privacy-consent.md`.
- Rollback plan in `handoff-into-code.md` and `migration-apply-guide.md`.

## Where to look
`docs/future features/A-B testing components/` contains all planning, stubs, runbooks, SQL, and status files.

## Setup (Cloudflare + PostHog)
Step-by-step setup and verification:
- `posthog-cloudflare-setup.md`
