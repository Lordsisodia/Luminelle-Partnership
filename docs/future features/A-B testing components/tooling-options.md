# Experimentation & Behavioral Analytics — Tool Options (OSS + Free‑First)

Goal: avoid reinventing wheels for flags/experiments and heatmaps/replay, while keeping Supabase as our data backbone **and** keeping client deployments inside free tiers by default.

## Recommended default (hybrid, free‑first)
See `hybrid-analytics-heatmaps-stack.md` for the full plan.

Summary:
- Heatmaps + replay: **Microsoft Clarity** (free) for “where are people clicking and why?”
- Quant analytics + experiment measurement: **PostHog** (free tier, strict event budget; avoid replay/autocapture)
- Canonical experiment portability: **lean DB layer** (Supabase config and/or rollups; avoid raw event logs if storage is tight)

This split is deliberate: replay/heatmaps are “high volume” data and are the easiest way to hit paid limits.

## Recommended OSS tools
- GrowthBook — experiments + feature flags, built-in stats (Bayesian & frequentist), lightweight JS/React SDK, self-hostable.
- FeatBit — MIT-licensed feature flags/experimentation, rich targeting, gradual rollouts, multi-SDK, self-host via Docker/Helm.
- OpenReplay — self-hosted session replay with heatmaps and rage-click detection; great for visualizing current UI behavior.

## Recommended free cloud tools (not OSS)
- Microsoft Clarity — free heatmaps + session replay; good JS API for tagging sessions with `anon_id` and experiment labels.
- Hotjar — has a free tier that includes heatmaps + session replay but has session limits; use sampling if we go this route.

## Where PostHog fits (cloud, free tier)
- Strong for funnels/dashboards and (optionally) feature flags/experiments.
- Keep it in the “quantitative layer” only:
  - Disable replay (let Clarity/Hotjar handle it).
  - Avoid autocapture (it’s easy to exceed free event limits).
  - Track only: pageview + exposures + conversions.

## How they help our use case
- Centralize experiment config & targeting (growthbook/featbit UI) instead of homegrown tables, while keeping our Supabase events for analysis.
- Built-in stats means faster “who wins?” without writing test math; we can still mirror results into `vw_experiment_conversions` for consistency.
- Gradual rollouts and segment rules let us ship safer changes and targeted tests (e.g., mobile-only) without extra code.
- OpenReplay heatmaps/replay give immediate visibility into click hotspots and drop-offs on the current UI—informing which components to A/B first.

## Integration pattern with our stack
- Use vendor SDK for assignment + flag fetch; still log exposures/events via `/api/experiment/track` so Supabase remains the metric store.
- Map anon_id to vendor session where possible; keep PII out. Consent gate both tracking and replay.
- Optionally ingest vendor summaries into Supabase or Metabase; keep a single dashboard surface.

## Lessons / rationale
- Don’t rebuild flag UIs and stats engines; focus custom code on data quality (events/exposures) and domain metrics.
- Keep data layer unified (Supabase tables + view) so we can swap providers without losing history.
- Use heatmap/replay temporarily to find pain points; turn findings into hypotheses, then run structured A/Bs through the flag platform.

## Next steps
1) Pick the default hybrid (`hybrid-analytics-heatmaps-stack.md`) unless there’s a client constraint that blocks it.
2) If we need OSS-only, pick:
   - Flags/experiments: GrowthBook or FeatBit
   - Replay/heatmaps: OpenReplay
3) Regardless of tool choice, keep `/api/experiment/track` logging so Supabase remains the source of truth for metrics.
