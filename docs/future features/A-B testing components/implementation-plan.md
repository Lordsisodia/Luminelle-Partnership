# A/B Testing & Heatmap System — Implementation Plan (Hybrid-first)

This plan implements the **recommended hybrid**:
- **Clarity** for heatmaps + session replay (qualitative)
- **PostHog** for funnels + experiment measurement (quantitative, free-tier-safe)
- **Lean DB layer** (optional) only for configs/rollups (avoid raw event storage, especially with tight Supabase storage)

Reference architecture:
- `integration-plan.md`
- `hybrid-analytics-heatmaps-stack.md`

---

## Phase 0 — Decide the track (1–3)

1) Confirm the “value moment” and primary KPI:
   - Value moment: **purchase**
   - Primary KPI: purchase conversion rate (by experiment variant)
2) Pick assignment track:
   - **Track A (recommended):** PostHog feature flags/experiments (no DB migration required).
   - **Track B (fallback):** our deterministic `src/experiments/*` provider with configs in a lean DB (Turso) or static JSON.
3) Set the safety goal: stay inside free tiers by default:
   - No PostHog replay.
   - No PostHog autocapture.
   - No raw click-coordinate logs stored in any DB.

---

## Phase 1 — Instrumentation (browser) (4–10)

4) Add env vars (staging first; see `env-flags.md`):
   - `VITE_ANALYTICS_ENABLED=true`
   - `VITE_HEATMAP_ENABLED=true`
   - `VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST`
   - `VITE_CLARITY_PROJECT_ID`
5) Implement consent/DNT gating so analytics loads only when allowed (see `privacy-consent.md`).
6) Emit minimal PostHog events:
   - `experiment_exposure` (once per session per experiment)
   - `cta_click` (hero CTA)
   - `add_to_cart`, `begin_checkout`
7) Tag Clarity sessions:
   - Identify by `anon_id` + `session_id` (for debugging/searching recordings)
   - Set `exp_<key>=<variant>` so replays can be filtered by variant
8) Enforce event budget:
   - Keep the event list small; do not add “track all clicks”.
   - Prefer Shopify/Cloudflare analytics for generic traffic stats if needed.
9) Validate in staging:
   - PostHog receives the events with expected properties.
   - Clarity generates recordings/heatmaps and has the tags.
10) Add kill switches:
   - `VITE_ANALYTICS_ENABLED=false`, `VITE_HEATMAP_ENABLED=false` stops tracking without code changes.

---

## Phase 2 — Purchase attribution (Shopify checkout) (11–16)

Purchase is the KPI, but checkout happens on Shopify. We must attribute purchase back to the variant.

11) Before redirecting to Shopify checkout URL, write attributes onto the Shopify cart:
   - `lumelle_anon_id`, `lumelle_session_id`
   - `ph_distinct_id` (from `posthog.get_distinct_id()` when available)
   - `exp_<key>=<variant>` for active experiments
12) Place a test order in staging store.
13) Verify the resulting Shopify order includes those attributes (note attributes / additional details).
14) In the Shopify order webhook handler (Cloudflare Worker), extract the attributes.
15) Send a server-side `purchase` event to PostHog:
   - Prefer `distinct_id = ph_distinct_id` (fallback: `lumelle_anon_id`) so server events join to browser events without client-side `identify()`.
   - include `value`, `currency`, `order_id`, `exp_<key>` + `variant` if available
16) Validate the funnel in PostHog:
   - `experiment_exposure` → `cta_click` → `begin_checkout` → `purchase`

Fallback if attributes don’t propagate reliably:
- Use `begin_checkout` as the primary metric for the experiment decision.
- Add a short-lived “checkout session mapping” table keyed by cartId/checkout token.

---

## Phase 3 — Experiments (17–22)

17) Implement the first experiment (hero CTA copy/style only).
18) Run “control-only” in production for 24h (tracking on, no UI change).
19) Run the experiment 50/50 for long enough to stabilize (avoid peeking).
20) Use Clarity heatmaps/replays filtered by variant to understand *why* one wins.
21) Roll out winner (100%) and log the decision (dates + KPI delta).
22) Remove / archive the experiment code if it’s no longer needed.

---

## Phase 4 — Optional lean DB layer (only if needed) (23–26)

Only do this if we have a clear need for:
- cross-client rollups, or
- long retention outside PostHog, or
- vendor portability beyond “acceptable”

23) Choose a lean DB (Turso recommended if Supabase storage is tight).
24) Store configs and/or daily rollups only (not raw events):
   - `experiment_rollups_daily(date, experiment_key, variant, exposures, begin_checkout, purchases, revenue)`
25) Generate rollups from PostHog exports (or from webhook data), not from client clickstreams.
26) Keep retention bounded (e.g., store only 90–180 days of rollups).
