# Handoff Into Code (when ready)

1) Set flags in staging `.env`:
   - `EXPERIMENTS_ENABLED=true`
   - `HEATMAP_ENABLED=true` (optional)
   - `VITE_EXPERIMENTS_ENABLED=true`
2) Copy server stub to real route:
   - `server/routes/experiments.ts` from `server-stub.md`
   - `app.use('/api/experiment', experimentRoutes)` in `server/index.ts`
3) Add env loading and guard 404s when disabled.
4) Run migration on staging Supabase.
5) Wrap app shell with `ExperimentProvider` (flagged) and add consent check.
6) Instrument hero CTA with `useExperiment('hero_cta_copy')`; keep other surfaces off.
7) Deploy to staging; verify exposures/events appear.
8) Run QA checklist (qa-checklist.md) on staging.
9) Enable baseline heatmap for 3–7 days; review hotspots.
10) If clean, flip prod flags to true but keep split at 100% control initially; then start first experiment.
11) After first 24h prod data: check SRM, missing-exposure; adjust if needed.
12) When winner chosen: update split to 100/0 in config; set status=paused after rollout.
