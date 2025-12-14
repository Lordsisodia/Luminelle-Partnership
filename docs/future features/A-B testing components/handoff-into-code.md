# Handoff Into Code (when ready)

This doc exists to translate the “future features” work into actual code changes.

Recommended reference for the end-to-end architecture:
- `integration-plan.md`

## Path A (recommended): PostHog + Clarity (no DB event tables)

1) Set flags in **staging**:
   - `VITE_ANALYTICS_ENABLED=true` (PostHog)
   - `VITE_HEATMAP_ENABLED=true` (Clarity)
   - `VITE_EXPERIMENTS_ENABLED=true` (only if running UI variants)
   - `VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST`
   - `VITE_CLARITY_PROJECT_ID`
2) Add consent/DNT gating for both analytics and heatmaps (see `privacy-consent.md`).
3) Implement the first experiment (hero CTA only):
   - Render control vs variant (either via PostHog feature flag or via `src/experiments/*` fallback).
   - Emit `experiment_exposure` once per session + `cta_click` on hero CTA.
4) Ensure checkout attribution:
   - Before redirect to Shopify checkout URL, write cart attributes with `lumelle_anon_id`, `ph_distinct_id`, and `exp_<key>=<variant>`.
5) Implement server-side purchase event:
   - In Shopify orders/create webhook handler, extract `lumelle_anon_id` and experiment attributes from the order.
   - Send `purchase` event to PostHog with `distinct_id = ph_distinct_id` (fallback: `lumelle_anon_id`).
6) Deploy to staging; verify:
   - PostHog funnel shows exposure → CTA click → begin checkout → purchase.
   - Clarity heatmaps/replays exist and can be filtered by variant tag.
7) Production rollout:
   - Start with “control-only” tracking for 24h (no UI change).
   - Then run the 50/50 experiment.
   - Roll out winner and log the decision.

## Path B (fallback): DB-backed experiments + tracking (portable, more work)

Only use this if we can’t use PostHog feature flags/experiments for some reason.

1) Set staging server flags:
   - `EXPERIMENTS_ENABLED=true`
   - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (or Turso secrets)
2) Apply migration on staging Supabase:
   - run `server/migrations/2025-12-11_experiments.sql`
3) Implement `/api/experiment/config` + `/api/experiment/track` (see `server-stub.md`).
4) Wrap app shell with `ExperimentProvider` and send events to PostHog (not DB) to avoid storage bloat.
