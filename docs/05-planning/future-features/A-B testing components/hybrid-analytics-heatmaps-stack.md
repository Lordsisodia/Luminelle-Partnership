# Hybrid Analytics + Heatmaps + A/B Testing (Free‑First)

**Goal:** get *both* quantitative experimentation + conversion analytics **and** qualitative heatmaps/session replay, while staying inside **free tiers** by default.

This doc is intentionally **hybrid**: we split “numbers” (experiments + funnels) from “visual UX” (heatmaps + replays) so we don’t accidentally pay for high‑volume click capture.

---

## Context (Lumelle / our stack)

- Frontend: Vite + React (`src/`), deployed on **Cloudflare**.
- Data: Supabase is already the “data backbone”.
- Experiment scaffolding already exists (not wired yet):
  - Client: `src/experiments/*` (anon/session identity, config fetch, deterministic assignment, track queue).
  - Docs + SQL plan: `docs/05-planning/future-features/A-B testing components/` and `server/migrations/2025-12-11_experiments.sql`.

---

## Recommended Hybrid (default)

### 1) Heatmaps + session replay: **Microsoft Clarity (free)**

Use Clarity for:
- Click + scroll heatmaps (“where are people clicking?”)
- Session recordings (“why did they click that?”)

Why Clarity:
- It’s explicitly free and built for this exact qualitative layer.
- It has a JS API so we can attach our own `anon_id` and experiment labels for debugging.
- It automatically handles sampling when volume is extremely high (see “Limits” below).

### 2) Product analytics + experiment measurement: **PostHog (free tier, strict event budget)**

Use PostHog for:
- Funnel + conversion analysis (hero CTA → checkout → purchase, etc.)
- A/B test analysis (either via PostHog Experiments or via our own assignment + event properties)
- Basic dashboards for stakeholders

Cost guardrail:
- **Do not** use PostHog session replay for this project (Clarity already covers that).
- **Avoid autocapture** (it explodes event volume).
- Track only a small set of “golden” events (pageview + conversion + exposures).

### 3) Canonical storage / vendor independence: **(Lean) database layer**

We originally planned “Supabase as canonical for all experiment events”, but **Supabase free storage can be tight** (you mentioned ~500MB). Raw event logs can outgrow that quickly.

**Revised plan (recommended):**
- Use **PostHog as the event store** (free tier) for exposures + conversions + funnels.
- Keep the “database layer” **lean**: only store low-volume config and/or rollups so we stay within storage limits.

What we store in a DB (lean mode):
- Experiment configs (low volume)
- Optional: daily rollups per experiment/variant (very low volume)
- Optional: audit trail for *exposures only* (still manageable if we keep retention tight)

This keeps us portable across client deployments without risking “analytics tables eat the whole DB”.

---

## Storage strategy (given Supabase 500MB concerns)

### Best default: **don’t add a second database**

- Let **PostHog store analytics events**.
- Let **Clarity store replays/heatmaps**.
- Keep Supabase focused on core app data + (optional) tiny experiment config/rollups.

This is the lowest-ops, lowest-cost approach.

### If we truly need our own analytics warehouse (still free-first)

Only do this if we have a clear requirement (data ownership, long retention, vendor portability, cross-client benchmarking).

Good “free tier” candidates to consider:

- **BigQuery** (warehouse): generous free tier for storage/querying; best for analytics SQL and long-term retention.
- **Turso / libSQL** (SQLite): generous free storage; good for low/medium-volume logs and rollups, less ideal for “build our own PostHog” event streams.
- **Neon Postgres**: free Postgres with limited storage; good for “extra DB” but not a huge warehouse.
- **Cloudflare D1**: free SQLite-at-edge; per-DB size limits mean it’s best for **rollups/config**, not raw event firehose.

Rule of thumb:
- If you want **dashboards and funnels quickly** → PostHog.
- If you want a **warehouse** → BigQuery.
- If you want a **small extra DB** → Turso/Neon/D1.

---

## Turso specifically (if we choose it)

Turso is a distributed SQLite (libSQL) database and has first-class guidance for Cloudflare Workers integration.

### Why Turso might be a good fit for Lumelle
- **Bigger than Supabase free DB** for “analytics-adjacent” storage: Turso’s free tier advertises **5GB storage**, **10M rows written/month**, **500M rows read/month**. That’s plenty for experiment configs + rollups, and can even support a moderate raw event log if we *really* wanted to. (See their pricing pages / plan announcement.)
- **Cloudflare-friendly**: Cloudflare docs explicitly call out that Workers should import `@libsql/client/web` and use `TURSO_URL` + `TURSO_AUTH_TOKEN` style bindings/secrets.

### The Turso role in the hybrid (recommended)
Use Turso for **low-volume, high-value** data:
- experiment configs (if we don’t want them in Supabase)
- daily rollups per experiment/variant (e.g., exposures, CTA clicks, purchases, revenue)
- experiment decision log (dates, hypothesis, result, rollout decision)

Do **not** use Turso for:
- full clickstream or click-coordinate logs (use Clarity/Hotjar for heatmaps; keep PostHog events minimal)
- session replay (use Clarity/Hotjar/OpenReplay)

### If we do store rollups in Turso
Rollup schema idea:
- `experiment_rollups_daily(date, experiment_key, variant, exposures, cta_clicks, purchases, revenue, updated_at)`
  - writes: 1 row per (date × experiment × variant) → tiny volume
  - dashboards: easy to query without scanning millions of raw events

### Sources (re-check before rollout)
- Turso pricing: https://turso.tech/pricing
- Turso free-tier change announcement (Developer plan + free tier limits): https://turso.tech/blog/turso-cloud-debuts-the-new-developer-plan
- Cloudflare Workers → Turso integration: https://developers.cloudflare.com/workers/databases/native-integrations/turso/
- Cloudflare Workers tutorial: https://developers.cloudflare.com/workers/tutorials/connect-to-turso-using-workers/

---

## Why hybrid (instead of “one tool”)

If we let a single analytics tool do *everything* (pageviews + clickmaps + session replay + flags + funnels), costs and limits typically get hit by the **highest-volume** data type (clickstream/replay).

Hybrid avoids this:
- Clarity collects “heavy” qualitative data with no bill shock.
- PostHog collects “light” quantitative events under a strict budget.
- A lean DB layer (optional) keeps us from being trapped by any vendor’s retention or pricing changes.

---

## Event budget math (free-tier safety)

We forecast ~**10,000 pageviews/day** ≈ **300,000 pageviews/month**.

### PostHog free-tier survival rule

Keep PostHog events under the free monthly cap by limiting to:
- `page_view` (or `$pageview`) — ~300k/mo
- `experiment_exposure` — roughly “sessions × #active_experiments”
- `conversion` events (CTA click, add-to-cart, checkout start, purchase, etc.)

Practical guideline:
- Keep **active experiments ≤ 2** at any time on high-traffic pages.
- Only track **5–10 conversion events** total (not every click).

### Clarity volume

Clarity retains recordings/heatmaps and handles very high volume via sampling when you exceed project/session limits.

---

## Identity and “joining” the data (critical)

To get best value, we need a shared anonymous key:

- **`anon_id`**: stable across visits (localStorage/cookie) → already implemented in `src/experiments/identity.ts`
- **`session_id`**: rotates with inactivity → also already in `src/experiments/identity.ts`

### What we should send where

**Clarity**
- `clarity('identify', anonId)` (or `clarity('set', 'anon_id', anonId)`) so recordings can be searched by our id.
- `clarity('set', 'exp_<key>', '<variant>')` for the currently active experiment(s) so replays are filterable by variant.

**PostHog**
- Use `anon_id` as the `distinct_id` (stay anonymous until we explicitly choose to identify).
- Add event properties: `experiment_key`, `variant`, `session_id`, `page_path`.

**Supabase**
- Store `anon_id`, `session_id`, `experiment_key`, `variant`, `event_name`, `page_path`, timestamps.

This gives us:
- PostHog: “which variant converted better?”
- Clarity: “why did people behave like that?”
- Supabase: “auditable ground truth for analysis and later portability”

---

## Consent + privacy (non-negotiable)

Baseline rules (see `privacy-consent.md`):
- Default: do not track until consent is granted.
- Respect DNT (`navigator.doNotTrack === '1'`) as a global kill switch.
- Never send PII in client-side analytics events by default.
- Mask inputs and exclude sensitive routes from replay tools.

Implementation pattern:
- Load Clarity and PostHog only after consent.
- For Clarity specifically, use their consent API so it doesn’t set cookies until allowed.
- For PostHog, initialize in “disabled” mode and opt-in after consent (or don’t init at all until consent).

---

## Implementation checklist (staging first)

### A) Setup accounts/projects (per-client)

- Create a **Clarity project** per client site.
- Create a **PostHog project** per client site (keep free-tier separation).
- Store keys as env vars (never commit).

### B) Wiring in code (minimal footprint)

Where to wire:
- `index.html` (script injection) or a single `src/lib/analytics/*` initializer.
- Gate everything behind env flags from `env-flags.md`.

Minimum env flags (example naming; decide final names in `env-flags.md`):
- `VITE_CLARITY_PROJECT_ID=...`
- `VITE_POSTHOG_KEY=...`
- `VITE_POSTHOG_HOST=...` (use ingestion host: `https://us.i.posthog.com` or `https://eu.i.posthog.com`)
- `VITE_ANALYTICS_ENABLED=true|false`
- `VITE_HEATMAP_ENABLED=true|false`

### C) Instrument the first experiment only

- First experiment: hero CTA (already specified in `first-experiment-spec.md`).
- Log:
  - Exposure (once per session/experiment)
  - CTA click conversion

### D) 3–7 day baseline

- Run Clarity baseline heatmaps to identify click hotspots and confusion.
- Use PostHog to measure conversion rates and drop-offs.

---

## Upsides / downsides

### Upsides
- **Free-first**: qualitative layer (heatmaps/replays) won’t force a paid plan.
- **Best of both worlds**: numbers + “why” in the same week, without rebuilding tooling.
- **Low vendor lock-in**: Supabase keeps experiment history portable.
- **Operationally light**: no self-hosting required.

### Downsides / risks
- **Two tools to manage** (Clarity + PostHog), plus our own tracking tables.
- **Data joining is manual** unless we consistently tag both systems with `anon_id`.
- **Consent complexity**: we must not load trackers pre-consent if policy requires it.
- **Shopify admin embed**: replay/heatmap tools can be constrained by iframes/CSP; focus on public pages first.

---

## Alternate hybrids (use if constraints change)

### Option B: Hotjar (free tier) + PostHog + Supabase

If Clarity is unacceptable for some reason (org policy, UX, etc.), Hotjar’s free plan may be viable.

Use the same overall pattern:
- Hotjar for heatmaps/replay
- PostHog for funnels + experiments
- Supabase as canonical store

**Important:** Hotjar’s free tier has session limits, so add sampling to guarantee we stay free.

### Option C: Clarity + Supabase only (no PostHog)

Pure “free + minimal vendor”:
- Use Clarity for qualitative.
- Use Supabase for experiment measurement and dashboards (SQL views + a dashboard tool).

Tradeoff: more effort to build dashboards and statistical views.

---

## Other tools we considered (usually not “free enough” for heatmaps/replay)

These can be great products, but they typically fail our “stay free by default” constraint for heatmaps/replay, or they require extra infra:

- **Matomo**: solid OSS analytics, but heatmaps/session-recording are commonly packaged as a paid add-on.
- **Countly**: feature-rich analytics, but heatmaps are typically not in the free/community tier.
- **FullStory / Mouseflow / Smartlook / Contentsquare**: excellent qualitative tooling, but free tiers (if any) are usually too small for 10k PV/day.
- **OpenReplay**: viable OSS path for replay/heatmaps, but requires self-hosting/ops effort.
- **Open Web Analytics (OWA)**: includes heatmaps/session recording and is OSS, but is an older stack and may be more maintenance than we want for client sites.

---

## Sources / pricing notes (re-check before rollout)

These limits change over time; verify right before enabling in production:
- PostHog pricing: https://posthog.com/pricing/
- PostHog heatmaps docs (note: heatmaps rely on autocapture/pageleave, so enabling them can increase event volume): https://posthog.com/docs/product-analytics/heatmaps
- Clarity overview + API: https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api
- Clarity data retention: https://learn.microsoft.com/en-us/clarity/setup-and-installation/data-retention
- Hotjar pricing: https://www.hotjar.com/pricing/
- Cloudflare D1 pricing/limits: https://developers.cloudflare.com/d1/platform/pricing/
- Turso pricing: https://turso.tech/pricing
- Neon pricing: https://neon.tech/pricing
- BigQuery pricing / free tier notes: https://cloud.google.com/bigquery/pricing

**Last verified:** 2025-12-14
