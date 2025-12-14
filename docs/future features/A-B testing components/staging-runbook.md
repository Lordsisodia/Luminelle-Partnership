# Staging Runbook (enable without prod impact)

This runbook assumes the **recommended hybrid**:
- Clarity for heatmaps/replay
- PostHog for funnels/experiments (event-budgeted)
- No raw click/event tables stored in Supabase by default

Quick reference (Cloudflare + PostHog setup details):
- `posthog-cloudflare-setup.md`

0) Preflight: confirm Cloudflare Pages Functions are invoked for `/api/*`
   - `GET /api/health` must return JSON (not the SPA HTML).
   - This repo uses `public/_routes.json` to control function routing and it must include `/api/*`.

1) Set env in staging (browser / Pages env vars):
   - `VITE_EXPERIMENTS_ENABLED=true` (only if running UI variants)
   - `VITE_ANALYTICS_ENABLED=true` (PostHog)
   - `VITE_HEATMAP_ENABLED=true` (Clarity)
   - `VITE_POSTHOG_KEY=...`
   - `VITE_POSTHOG_HOST=...` (use ingestion host: `https://us.i.posthog.com` or `https://eu.i.posthog.com`)
   - `VITE_CLARITY_PROJECT_ID=...`
   - Cloudflare UI: Pages → Project → Settings → Variables and Secrets
     - `VITE_*` vars are build-time; redeploy required to take effect.

2) Decide experiment assignment path:
   - **Path A (recommended):** PostHog feature flags/experiments (no DB migration needed).
   - **Path B (fallback):** DB-backed config using Supabase/Turso (requires migration + `/api/experiment/*` routes).

3) If using DB-backed experiments (Path B only):
   - Set staging Worker secrets:
     - `EXPERIMENTS_ENABLED=true`
     - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (staging project) or Turso secrets
   - Apply migration to staging Supabase:
     - Supabase SQL editor → run `server/migrations/2025-12-11_experiments.sql`
   - Deploy server/worker with experiment routes enabled.
   - Verify `/api/experiment/config` returns seeded experiment.

4) Client build (staging):
   - Run only **one** experiment initially (hero CTA).
   - Ensure we emit:
     - `experiment_exposure` (once per session per experiment)
     - `cta_click` (on hero CTA)
     - `begin_checkout` (on checkout button)

5) Data sanity checks:
   - PostHog: confirm events arriving and properties include `experiment_key` + `variant`.
   - Clarity: confirm recordings/heatmaps are generated; confirm variant tagging appears via custom properties.

6) Purchase attribution sanity check (important):
   - Before redirect to Shopify checkout, ensure the app writes cart attributes:
     - `lumelle_anon_id`, `lumelle_session_id`, `ph_distinct_id`, and `exp_<key>=<variant>`
   - Place a test order in staging store.
   - Verify the Shopify order webhook payload includes the attributes.
   - Shopify webhook URL should be:
     - `https://<your-staging-domain>/api/shopify/webhooks/orders-create`
   - Set webhook env vars:
     - `POSTHOG_API_KEY` (PostHog project key)
     - `POSTHOG_HOST` (e.g. https://us.i.posthog.com or https://eu.i.posthog.com)
   - From webhook handler, send `purchase` event to PostHog with `distinct_id = ph_distinct_id` (fallback: `lumelle_anon_id`).

7) If anything breaks:
   - Flip browser flags off: `VITE_ANALYTICS_ENABLED=false` and `VITE_HEATMAP_ENABLED=false`.
   - If using DB-backed routes, also flip `EXPERIMENTS_ENABLED=false` (server returns 404).
   - Redeploy; no UI change (control only) and no tracking.
