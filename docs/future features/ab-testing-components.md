# A/B Testing Components — Plan

Purpose: build a lightweight experimentation system to compare UI component variants (hero, CTA, form, checkout widgets) and learn which layouts convert best. Keep it in-repo, privacy-safe, and cheap, with Supabase as the source of truth.

## 1) Scope & Targets (first 90 days)
- Landing: hero headline/CTA copy + button style; value-prop blocks order; social-proof placement.
- PDP: image gallery layout; buy-box arrangement (price -> badges -> CTA vs CTA-first); guarantee badge copy; UGC strip position.
- Pop-ups/offers: exit-intent modal vs spin-wheel; discount messaging.
- Checkout add-ons: cross-sell card presence and order; shipping messaging bar.
- Email capture: placement (hero vs mid-page), single vs multi-field.

## 2) Architecture (lean stack)
- Assignment: deterministic hash on `experiment_key + user_id|anon_id` to bucket users 50/50 (configurable). Store anon_id in `localStorage` + cookie; reuse Shopify customer id when signed in.
- Config store: `supabase.experiments` table (id, key, status, traffic, variants[], targeting rules, start_at, end_at, owner). Publish a tiny JSON payload via Supabase Edge Function `getExperiments` and cache in CDN for 5 min.
- Exposure logging: client sends `POST /api/experiment/exposure` (edge handler) with experiment_key, variant, anon_id/user_id, page, timestamp; handler inserts into `experiment_exposures` table.
- Events: same edge handler accepts business events (`view_item`, `add_to_cart`, `begin_checkout`, `purchase`, `email_capture_submit`) with `experiment_key/variant` attached client-side. Stored in `events` table (see schema below).
- Evaluation: `ExperimentProvider` loads config, assigns variant, exposes `useExperiment(key, variants)` hook for components. Hook also emits exposure once per session per experiment.

## 3) Data model (Supabase)
- `experiments` — id (uuid), key (text unique), status (draft/live/paused), default_split (jsonb array of {variant, weight}), targeting (jsonb; country/device/url regex), created_by.
- `experiment_exposures` — id, experiment_key, variant, user_id (nullable), anon_id, session_id, page_path, user_agent, occurred_at (timestamptz default now()).
- `events` — id, name, experiment_key (nullable), variant (nullable), user_id (nullable), anon_id, session_id, cart_value (numeric), metadata (jsonb), occurred_at.
- `sessions` (optional) — session_id, anon_id, started_at, device, referrer, utm fields.
Indexes: (experiment_key, occurred_at), (name, occurred_at), (anon_id, occurred_at). Partition by month if volume grows.

## 4) Client implementation plan (incremental)
1) Identity + session: on first load, mint `anon_id` (uuid v4) and `session_id` (uuid v4); persist anon_id in cookie+localStorage; rotate session on 30 min inactivity.
2) Provider + hook: add `ExperimentProvider` (context) that fetches cached config and exposes `useExperiment(key, variants, fallback?)` -> returns assigned variant and a helper `track` to fire named events.
3) Event API: create `/api/experiment/track` edge route (same handler for exposures + events). Batch payloads (array) to reduce network chatter; queue retries.
4) Component helpers: build `ABSlot` component that picks variant render fn; `VariantSwitch` for simple style toggles; `withExperiment` HOC for non-React consumers if needed.
5) Default coverage: wire experiments on hero, PDP buy-box, CTA buttons, and email capture by default; ensure exposure logs on first render.

## 5) Metric definitions & guardrails
- Primary: `purchase` conversion (orders / exposures) and revenue per visitor; secondary: `add_to_cart`, `begin_checkout`, `email_capture_submit`, scroll depth.
- Guardrails: bounce rate, time-to-interact, CLS/LCP (avoid slow variants). Reject variants that degrade CWV > threshold.
- QA checks: sample ratio mismatch (SRM) daily; missing-exposure check (events without exposure). Threshold alert via Supabase cron function.
- Minimum runtime: run until reaching required sample size (power 80%, alpha 0.05) or 14 days, whichever later; freeze changes mid-test.

## 6) Data pipeline & reporting
- ETL: Supabase -> external BI (e.g., Metabase chart via SQL) or quick Looker Studio using the public read-only view.
- Views: create `vw_experiment_conversions` joining exposures to events within same session; compute lift and p-values (use Poisson or proportion z-test) in SQL or a lightweight Python notebook checked into `analytics/experiments.ipynb`.
- Dashboards: one card per active experiment showing traffic split, conversions, lift, p-value, guardrail metrics. Add “ship winner” button linking to config update.

## 7) Delivery steps (MVP)
- [ ] Create Supabase tables + row-level security to allow insert from service key only.
- [ ] Edge handler `/api/experiment/track` with batching + basic validation (experiment_key must exist and status=live).
- [ ] Client SDK: `ExperimentProvider`, `useExperiment`, `trackEvent` utilities, anon/session id helpers.
- [ ] Instrument initial surfaces (hero, PDP buy-box, email capture) with two variants each.
- [ ] Build `vw_experiment_conversions` view + Metabase/Notebook template.
- [ ] Run one trial experiment (hero CTA copy) to validate end-to-end.

## 8) Clean UX/Data practices
- Defer fetch/track to after hydration; batch to avoid blocking rendering.
- Do not A/B text that affects legal/compliance without review; avoid personalizing price.
- Respect DNT/consent: no tracking before consent where required; expose `disableTracking` flag for QA.
- Keep SDK size small (<5kb gzip); tree-shake friendly; no third-party pixels unless demanded.

## 9) Open questions
- Preferred BI surface: Metabase vs in-app chart vs external (Looker/Amplitude)?
- Should we auto-rollout winner when p<0.05 and lift>0 after min sample, or require manual confirm?
- Do we need geo/device-specific variants now, or keep single global split until traffic justifies?
