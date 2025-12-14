# Migration Apply Guide (staging first)

Use this when ready; keep prod last.

## Prereqs
- Supabase staging project URL and service key.
- psql or Supabase SQL editor access.

## Steps
1) Set env locally for staging:
   ```
   export SUPABASE_URL="<staging-db-connection-string>"
   export SUPABASE_SERVICE_ROLE_KEY="<staging-service-role-key>"
   ```
2) Apply migration:
   - Using psql: `psql "$SUPABASE_URL" -f server/migrations/2025-12-11_experiments.sql`
   - Or paste into Supabase SQL editor and run.
3) Verify:
   - `select key, status from experiments;` → should see `hero_cta_copy` live.
   - `select * from vw_experiment_conversions limit 1;` → should run.
   - RLS policies exist; service key can insert into `experiment_exposures`.
4) If rollback needed:
   - `drop view if exists vw_experiment_conversions;`
   - `drop table if exists events, experiment_exposures, experiments, sessions cascade;`
5) Repeat for prod only after staging validation; change env vars to prod values.
