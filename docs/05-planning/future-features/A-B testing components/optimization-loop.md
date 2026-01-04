# Optimization Loop (Conversion + Retention)

Outcome: over time, use real behavior + controlled experiments to improve:
- **Conversion** (acquisition → activation → purchase/subscribe)
- **Retention** (repeat usage / repeat purchase / reduced churn)

This is the “operating system” that sits on top of our hybrid stack (`hybrid-analytics-heatmaps-stack.md`).

Current decision (2025-12-14):
- **Value moment:** the user **buys the product**.
- **Retention:** not a primary KPI right now; treat it as “repeat purchase / returning customer” later once conversion is healthy.

---

## The loop (what we do every week)

### 1) Observe (quant + qual)

**Quant (numbers):**
- Funnel conversion rates (step-by-step)
- Cohorts / retention curves (Week 1, Week 4)
- Segment splits (device, landing source, new vs returning, geography)

**Qual (why):**
- Heatmaps: “what looks clickable, what gets ignored?”
- Replays: “what confusion/hesitation/rage clicks are happening?”

### 2) Hypothesize

Write one-sentence hypotheses that connect behavior → change → expected outcome:
- “If we simplify the hero CTA copy, then first-click rate increases because users understand the promise faster.”
- “If we shorten onboarding steps, then activation increases because fewer people drop at step 2.”

### 3) Prioritize (so we don’t thrash)

Use a lightweight score:
- **Impact**: estimated lift if true
- **Confidence**: based on heatmaps/replays + funnel evidence
- **Effort**: dev/design time

Only run **1–2 experiments** at a time on high-traffic paths to keep analysis clean and avoid event bloat.

### 4) Test (controlled experiments)

Rules:
- One primary metric per experiment (e.g., hero CTA click-through, onboarding completion, subscription conversion).
- Define guardrails (bounce, error rate, perf regressions).
- Run long enough for stable results (avoid stopping early).
- Run SRM checks (sample ratio mismatch) for assignment integrity.

### 5) Decide + ship

Decisions are explicit:
- Roll out winner (100%), or
- Keep control (no lift / negative lift), or
- Iterate with a refined hypothesis

Always document:
- Experiment key
- Dates
- Results summary
- Decision and rationale

---

## Metric definitions (don’t skip this)

The hardest part is *not* tools — it’s defining what “better” means.

### Conversion (choose 1 north-star + 2 supporting)

Pick **one** primary conversion target per surface:

Marketing/landing examples:
- `hero_cta_click_rate`
- `newsletter_signup_rate`
- `begin_checkout_rate`
- **`purchase_rate`** (primary, because purchase is the value moment)

App examples (Shopify app / SaaS style):
- `install_to_first_open_rate`
- `first_open_to_activation_rate`
- `activation_to_subscribe_rate`

### Retention (define “active” as a value moment)

Retention only works if “active” means a meaningful event, not just “pageview”.

Examples:
- “Active week” = user performs `value_action` at least once in 7 days.
- “Activated” = completed onboarding + performed first meaningful action.

If we can’t define the “value action”, we can’t optimize retention yet.

For Lumelle right now:
- We *can* define a value action (purchase).
- We’re intentionally prioritizing **purchase conversion** first.
- When we revisit retention, we’ll likely define it as **repeat purchase rate**, **time to second purchase**, and/or **returning customer conversion rate** (based on the product and how repeatable it is).

---

## Event taxonomy (minimal, free-tier safe)

Principle: track **only** what we need to compute funnels + retention + experiment attribution.

Baseline events to support conversion + retention:
- `page_view` (or equivalent)
- `experiment_exposure` (once per session per experiment)
- `cta_click` (only for key CTAs, include `click_id`)
- `purchase` / `checkout_complete` (server-side preferred; this is the value moment)
- `app_open` or `session_start` (for retention/DAU/WAU)

Avoid:
- “track every click” in the analytics tool (this is how free tiers die)
- autocapture in PostHog unless we explicitly sample

---

## How the hybrid stack maps to the loop

### Clarity (qualitative)

Use for:
- Heatmaps on top pages
- Replays for diagnosing friction
- Tag sessions with `anon_id` and experiment variant so we can inspect “control vs variant” behavior

### PostHog (quantitative, free-tier-safe)

Use for:
- Funnels, cohorts, retention dashboards
- Quick slicing by properties (device, page, variant)

Guardrails:
- Disable replay/autocapture.
- Keep events to “golden” set only.

### Supabase (canonical + portability)

Use for:
- Experiment definitions (if we keep in-house config)
- Exposure + conversion audit trail
- SQL views that stay valid even if we swap vendors later

---

## Practical starter cadence (first month)

Week 1:
- Turn on baseline tracking + heatmaps (staging → prod)
- Build 1 dashboard: conversion funnel + weekly active

Week 2:
- Identify top 1 friction point from replays/heatmaps
- Ship first A/B test (hero CTA) with a single primary metric

Week 3:
- Evaluate, roll out winner, and take notes
- Optional: outline what “repeat purchase” means for this product (no need to instrument deeply yet)

Week 4:
- Run first retention experiment (onboarding simplification / activation nudges)

---

## Where this connects in the repo

- Hybrid plan: `docs/05-planning/future-features/A-B testing components/hybrid-analytics-heatmaps-stack.md`
- First experiment: `docs/05-planning/future-features/A-B testing components/first-experiment-spec.md`
- QA + privacy: `docs/05-planning/future-features/A-B testing components/qa-checklist.md`, `privacy-consent.md`
- Client SDK scaffold: `src/experiments/*` (not wired yet)
