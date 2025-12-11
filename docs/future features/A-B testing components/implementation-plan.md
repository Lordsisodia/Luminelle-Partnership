# A/B Testing & Heatmap System — Implementation Plan (50 steps)

## Phase 0 — Prep (1–5)
1) Confirm environments (staging/prod URLs, Supabase projects, service keys). 
2) Decide provider path: in-house config first, with ability to swap in GrowthBook/FeatBit.
3) Add `.env` entries for SUPABASE service key and API routes; verify not exposed client-side.
4) Align KPIs/guardrails: primary (purchase), secondary (add_to_cart, begin_checkout, email_capture), guardrails (bounce, CWV).
5) Tag key elements with `data-click-id` for heatmaps/TTFCTA readiness.

## Phase 1 — Data model & migrations (6–10)
6) Apply migration `2025-12-11_experiments.sql` to Supabase (adjust role names).
7) Create RLS policies for service/reporting roles; test insert/select with service key.
8) Add monthly partitioning plan (optional) for events/exposures if volume high.
9) Seed first experiment row (hero CTA); verify config fetch returns it.
10) Add `vw_experiment_conversions` and validate sample query.

## Phase 2 — API endpoints (11–17)
11) Implement `GET /api/experiment/config` (live only, ETag, cache headers).
12) Implement `POST /api/experiment/track` with batch body, schema validation, size limits.
13) Add idempotency (5m bucket) to avoid duplicate exposures/events.
14) Add allowed event-name whitelist; clamp metadata sizes; truncate UA/path length.
15) Add soft SRM warning log if observed split drifts >5% over last N exposures.
16) Add rate limiting per IP/session (basic token bucket).
17) Wire structured logging + metrics counters (exposures, events, rejects, errors).

## Phase 3 — Client SDK (18–26)
18) Hook `ExperimentProvider` around app shell.
19) Ensure `anon_id` + `session_id` minted before config fetch; 30m session TTL.
20) Implement query-param overrides (`?exp_disable=1`, `?exp_key=variant`).
21) Add debug overlay (shows assignments, queue length, last send status).
22) Add offline/retry queue for tracking (already scaffolded; validate).
23) Add consent gate so tracking waits until allowed; short-circuit to control if disabled.
24) Add performance budget: bundle delta <5 KB gzip; lazy-load overlay.
25) Add targeting hook stubs (device/url regex) for future.
26) Unit-test hashing/bucketing, idempotency, override logic.

## Phase 4 — Baseline behavioral capture (heatmap/TTFCTA) (27–33)
27) Add global click listener capturing x/y, click_id, scroll_y, viewport; debounced per frame.
28) Emit `click` events via track endpoint with TTFC/TTFCTA fields.
29) Emit `scroll_depth` events at 25/50/75/100%; guard against spam.
30) Emit `exit` event on visibilitychange with last scroll_y (best effort).
31) Create SQL binning query for heatmaps (store in `analytics/heatmap.sql`).
32) Build simple admin page/notebook to render heatmap overlay from binned clicks.
33) Run 3–7 day baseline collection on current UI; review hotspots + TTFC.

## Phase 5 — Instrument first experiments (34–39)
34) Hero CTA copy/style variants: render by `useExperiment('hero_cta_copy')`; log click events.
35) PDP buy-box layout variant (CTA-first vs price-first); ensure exposures fire on first paint.
36) Email capture placement (hero vs mid-page); log `email_capture_submit` with variant context.
37) Verify exposures/events reach DB; reconcile counts vs page views.
38) Add minimal staging toggle to enable/disable experiments per env.
39) Smoke-test overrides and consent off state.

## Phase 6 — Analytics & dashboards (40–44)
40) Create Metabase/Notebook dashboards reading `vw_experiment_conversions` (conversion, revenue, CI/p-values).
41) Add SRM + missing-exposure daily cron (Supabase scheduled function) with alert hook.
42) Add lift calculator notebook with MDE slider; document decision thresholds.
43) Add heatmap visualization to dashboard/notebook using binned click data.
44) Document rollout/rollback SOP (ship winner = update split to 100/0; pause = status=paused).

## Phase 7 — Reliability & governance (45–50)
45) Kill switch env `EXPERIMENTS_ENABLED=false` to force control and stop tracking.
46) Feature flag the tracking overlay itself to avoid prod leakage.
47) Add PR checklist item: experiment key, metric, power/MDE, cleanup date, owner, consent checked.
48) Add CI lint to validate experiment config JSON/schema before merge.
49) Data retention rule: raw events/exposures 180 days; aggregates indefinitely; add cleanup job.
50) Postmortem template: after each test, record outcome, decision, and follow-up actions in `EXPERIMENTS.md`.
