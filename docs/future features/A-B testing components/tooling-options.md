# Experimentation & Behavioral Analytics — OSS Options

Goal: avoid reinventing wheels for flags/experiments and heatmaps/replay, while keeping Supabase as our data backbone.

## Recommended OSS tools
- GrowthBook — experiments + feature flags, built-in stats (Bayesian & frequentist), lightweight JS/React SDK, self-hostable.
- FeatBit — MIT-licensed feature flags/experimentation, rich targeting, gradual rollouts, multi-SDK, self-host via Docker/Helm.
- OpenReplay — self-hosted session replay with heatmaps and rage-click detection; great for visualizing current UI behavior.

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
1) Spin up GrowthBook or FeatBit via Docker locally; wire SDK into app shell; keep `/api/experiment/track` logging.
2) Enable OpenReplay on staging for 3–5 days to gather heatmaps and rage-clicks; correlate with our click events.
3) Decide: keep provider (if overhead low) or revert to in-house config; in both cases, retain Supabase as source of truth for metrics.
