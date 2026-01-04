# Build Steps Worklog (do-without-touching-app-yet)

Goal: stage implementation safely in docs; when ready, copy into codebase behind flags.

## Step roll-up (from 50-step plan)
- Status legend: [ ] not started, [~] drafted in docs, [x] ready to wire.

1. [x] Migration drafted (`server/migrations/2025-12-11_experiments.sql`).
2. [x] Client SDK scaffolded (`src/experiments/*`) — do not enable yet.
3. [~] Server routes drafted (see `server-stub.md`).
4. [~] Client wiring/heatmap draft (see `client-stub.md`).
5. [ ] Env flags and kill switch docs.
6. [ ] Staging rollout checklist.
7. [ ] Dashboard/SQL snippets collected.
8. [ ] QA checklist before prod flip.

## Copy/paste instructions (when allowed)
- Env flags (add to `.env`):
  - `EXPERIMENTS_ENABLED=false`
  - `HEATMAP_ENABLED=false`
  - `SUPABASE_URL=`
  - `SUPABASE_SERVICE_ROLE_KEY=`
- Server: place `server/routes/experiments.ts` from stub; import in `server/index.ts` under `/api/experiment`.
- Client: wrap app shell with `ExperimentProvider` only if `VITE_EXPERIMENTS_ENABLED==='true'` and consent ok.
- Heatmap: call `enableHeatmapTracking(trackEvent)` only when `HEATMAP_ENABLED` true.

## Staging rollout checklist (planned)
- [ ] Apply migration to staging Supabase.
- [ ] Deploy server with routes enabled on staging (flags true only there).
- [ ] Turn on `VITE_EXPERIMENTS_ENABLED` in staging; keep prod false.
- [ ] Instrument hero CTA only; verify exposures/events recorded.
- [ ] Run 3–7 day baseline heatmap on staging; ensure consent respected.

## QA checklist before prod
- [ ] SRM/missing-exposure cron tested on staging.
- [ ] Dashboard queries verified (conversions + heatmap bins).
- [ ] Kill switch tested (flag false returns 404, provider skipped).
- [ ] Bundle size diff <5 KB with provider included.
- [ ] Error rate on track endpoint <0.5% in staging.

## Dashboard SQL snippets (draft)
- Heatmap bins:
```sql
select page_path,
       floor((metadata->>'x')::float / 40) as bin_x,
       floor((metadata->>'y')::float / 40) as bin_y,
       count(*) as clicks
from events
where name = 'click'
group by 1,2,3;
```
- Conversion view check:
```sql
select experiment_key, variant,
       sum(purchases) as purchases,
       sum(exposures) as exposures,
       sum(purchases)::float / nullif(sum(exposures),0) as cr
from vw_experiment_conversions
group by 1,2;
```

## Open questions to close later
- Which env flips first (staging/prod) and date.
- Preferred dashboard surface (Metabase vs notebook).
- Targeted tests (mobile-only) in wave 1?
- [x] Env flags draft (`env-flags.md`).
- [x] Staging runbook draft (`staging-runbook.md`).
- [x] First experiment spec (`first-experiment-spec.md`).
- [x] Dashboard SQL template (`dashboard-template.md`).
- [x] QA checklist (`qa-checklist.md`).
- [x] SRM/missing-exposure SQL draft (`srm-missing-exposure-cron.sql`).
- [x] Heatmap overlay blueprint (`heatmap-overlay.md`).
- [x] Handoff guide for moving docs → code (`handoff-into-code.md`).
- [x] Test plan draft (`test-plan.md`).
- [x] Privacy/consent notes (`privacy-consent.md`).
- [x] State-of-play summary (`state-of-play.md`).
- [x] Migration apply guide (`migration-apply-guide.md`).
