# Staging Runbook (enable without prod impact)

1) Set env in staging:
   - `EXPERIMENTS_ENABLED=true`
   - `HEATMAP_ENABLED=true` (optional; can set to false to start)
   - `VITE_EXPERIMENTS_ENABLED=true`
   - `SUPABASE_URL`, `SUPABASE_SERVICE_KEY` (staging project)

2) Apply migration to staging Supabase:
   - `psql $SUPABASE_URL` or Supabase SQL editor → run `server/migrations/2025-12-11_experiments.sql`
   - Verify tables exist and seed row inserted.

3) Deploy server with experiment routes enabled on staging domain.
   - Ensure `/api/experiment/config` returns seeded experiment.
   - Ensure `/api/experiment/track` 404s when flag false; returns 200 when true.

4) Client build (staging):
   - Enable flag; wrap app shell with `ExperimentProvider`.
   - Instrument hero CTA only; keep other variants off.

5) Data sanity checks:
   - Open staging, trigger hero CTA; check `experiment_exposures` and `events` rows arrive.
   - Heatmap clicks recorded (if enabled): verify `events` rows with `name='click'` and metadata.

6) Monitoring:
   - Run heatmap bin SQL and conversion SQL from worklog.
   - Check SRM/missing-exposure cron (if set) logs; ignore prod.

7) If anything breaks:
   - Flip `EXPERIMENTS_ENABLED=false` to hard-disable routes and provider.
   - Redeploy; no UI change (control only).
