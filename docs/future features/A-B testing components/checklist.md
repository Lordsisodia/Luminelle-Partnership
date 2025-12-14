# A/B Testing Components — Execution Checklist (first-principles)

Goal: ship a reliable, privacy-safe experimentation system for component/UI layout tests, with data you can trust. Follow in order; mark done as you go.

## Track A (recommended): PostHog-first + server-side purchase

This is the “ship now” checklist for the hybrid stack:
- PostHog = experiments + funnels (minimal events; no autocapture/replay)
- Shopify webhook = purchase event (server-side)
- Clarity (optional) = heatmaps/replay

1) Create a PostHog project (per client) and confirm the ingest host (US/EU).
2) Create feature flag / experiment `hero_cta_copy` with variants (`control`, `bold`) and a 50/50 split (staging first).
3) Set staging env vars (Pages/Vite):
   - `VITE_EXPERIMENTS_ENABLED=true`
   - `VITE_ANALYTICS_ENABLED=true`
   - `VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST`
4) Deploy staging and confirm you see:
   - `experiment_exposure`, `cta_click`, `add_to_cart`, `begin_checkout`
5) Validate attribution plumbing:
   - cart attributes include `ph_distinct_id`, `lumelle_anon_id`, and `exp_*`
6) Place a staging test order and confirm webhook payload contains the attributes (note attributes/additional details).
7) Configure webhook env vars and verify server-side `purchase` lands in PostHog:
   - `POSTHOG_API_KEY`, `POSTHOG_HOST`
8) Validate funnel in PostHog:
   - exposure → CTA click → begin checkout → purchase
9) Production rollout:
   - run “control-only” for 24h
   - then run 50/50
10) Decide winner + ship + log the decision (dates + KPI delta + Clarity notes if used).

---

## Track B (legacy/fallback): DB-first custom experiments

Only do this if we can’t use PostHog flags for some reason.

1) Define objectives & metrics per surface (hero, PDP, pop-ups); pick primary KPI and guardrails.
2) Draft experiment charters (hypothesis, variants, success metric, min duration) for first 3 tests.
3) Quantify sample size/power using current traffic & baseline conversion; set minimum detectable effect.
4) Decide identity strategy: anon_id + session_id rules; map to customer id when available.
5) Choose traffic allocation defaults (50/50) and edge cases (paused/draft behavior).
6) Finalize data model (experiments, exposures, events, sessions); document fields & indexes.
7) Design row-level security: insert allowed only via service key/edge; read-only views for BI.
8) Create Supabase tables/migrations for experiments, exposures, events, sessions.
9) Build `vw_experiment_conversions` view joining exposures→events (session-bound) with lift calcs.
10) Plan data retention/partitioning (monthly) and PII policy; verify GDPR/CCPA stance.
11) Implement Edge Function `/api/experiment/track` with validation, batching, and idempotency keys.
12) Add rate limiting and payload size limits on the edge route; log validation failures.
13) Create experiment config fetcher (`getExperiments`) with CDN cache (≈5 min) and ETag.
14) Implement client identities: mint/persist anon_id (cookie+localStorage), session rotation (30m idle).
15) Build `ExperimentProvider` + `useExperiment` hook; deterministic bucketing by hash.
16) Emit exposure event once per session per experiment; debounce duplicates.
17) Implement `trackEvent(name, metadata, experiment_context)` helper with offline queue/retry.
18) Instrument initial surfaces (hero CTA, PDP buy-box layout, email capture) with two variants each.
19) Add QA tools: query params to force variant, console debug overlay, disableTracking flag.
20) Write SRM (sample ratio mismatch) monitor + missing-exposure checker as Supabase cron job.
21) Set up dashboard (Metabase/Notebook) for conversions, lift, p-values, guardrails (CWV/bounce).
22) Define rollout playbook: criteria to pick winner (p<0.05, lift>0, min sample met) and rollback.
23) Document experiment lifecycle (draft → live → paused → archived) and ownership fields.
24) Add alerting for anomalies (traffic drop, SRM, error rate on track endpoint).
25) Performance guardrails: ensure tracking loads post-hydration; bundle size check (<5kb gzipped).
26) Security review: no user PII in payloads; honor DNT/consent; threat-model abuse.
27) Run end-to-end dry run in staging: forced variants, exposure+event logged, view populates.
28) Launch first live experiment (hero CTA copy) with monitoring on; validate data sanity after 24h.
29) Retro after first test: data quality, UX impact, runbook updates; groom backlog of next tests.
30) Bake into dev workflow: checklist in PR template for any new experiment (metrics, variant diff, cleanup date).

## Immediate build sequence (7-day push)
- Day 1: land migrations (tables, indexes, RLS), seed first experiment row, create `vw_experiment_conversions`.
- Day 2: ship edge route `/api/experiment/track` with validation, batching, idempotency, rate limits.
- Day 3: implement client IDs + `ExperimentProvider`/`useExperiment` + hashing util; add debug overlay.
- Day 4: instrument hero CTA, PDP buy-box, email capture; verify exposures/events in DB.
- Day 5: set up SRM + missing-exposure cron, add Metabase/Notebook chart wired to view.
- Day 6: staging dry run with forced variants; performance check (bundle size, TTFB impact).
- Day 7: launch hero CTA experiment to 50/50; 24h data sanity review and adjust.

## Phase 2 (weeks 2–4): hardening & breadth
- Add per-experiment targeting (device/URL/geo) and validate bucketing with targeting filters.
- Implement auto-sunset job (pause past end_at; archive old data beyond retention).
- Build “ship winner” script/UI and rollback/killswitch controls.
- Add experiment metadata enforcement in CI (schema lint); create PR template section for experiments.
- Expand instrumentation to pop-ups, guarantee badge, PDP gallery, checkout add-ons.
- Improve analysis notebook: include CUPED option, uplift CIs, guardrail breakout.
- Add Prometheus/OpenTelemetry spans for track endpoint and client queue metrics.

## Phase 3 (month 2+): sophistication
- Multi-armed bandit option for low-risk cosmetic tests; keep fixed split default.
- Layered experiments: interaction rules to prevent conflicting tests on same surface.
- Precomputed aggregates table (daily) to speed dashboards; consider materialized view.
- Consent-aware tracking: integrate with CMP; no tracking until consent when required.
- Localization variants support; per-market splits; support feature toggles via same infra.
- Heatmap/scroll-depth integration (self-hosted) tied to experiment context.
