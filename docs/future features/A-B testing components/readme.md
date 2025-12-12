# A/B Testing & Heatmap Initiative — Current Status

## What’s done (docs + scaffolding, no app impact yet)
- Plans & checklists: `ab-testing-components.md`, `checklist.md`, `implementation-plan.md` (50 steps), `state-of-play.md`.
- Worklog tracking: `build-steps-worklog.md` (status of each doc/stub).
- Specs/runbooks: `first-experiment-spec.md` (hero CTA), `staging-runbook.md`, `handoff-into-code.md`, `migration-apply-guide.md`, `env-flags.md`.
- Backend schema draft: `server/migrations/2025-12-11_experiments.sql` (tables, view, seed, RLS stubs).
- Server/client stubs: `server-stub.md`, `client-stub.md` (env-gated routes/provider; not mounted).
- Client SDK scaffolding (already in repo but not wired): `src/experiments/*` (hash, identity, config, track queue, provider).
- Analytics/heatmap assets: `dashboard-template.md`, `srm-missing-exposure-cron.sql`, `heatmap-overlay.md`, `current-ui-measurement.md`.
- QA/test/privacy: `qa-checklist.md`, `test-plan.md`, `privacy-consent.md`.
- Tooling options: `tooling-options.md` (GrowthBook/FeatBit/OpenReplay) and integration notes.
- First-experiment decision rules and metrics captured.

## What’s NOT done (waiting for approval)
- Migration not applied to any Supabase env.
- No routes added to `server/index.ts`.
- `ExperimentProvider` not mounted; no UI variants live.
- Env flags not set in .env; prod/staging untouched.
- Heatmap/click tracking not enabled.

## Ready-to-run next steps (once approved)
1) Apply migration to staging Supabase using `migration-apply-guide.md`.
2) Add `server/routes/experiments.ts` from `server-stub.md` and mount under `/api/experiment` with env guard.
3) Wrap app shell with `ExperimentProvider` behind `VITE_EXPERIMENTS_ENABLED`; instrument hero CTA only.
4) Turn on staging flags (`EXPERIMENTS_ENABLED=true`, `HEATMAP_ENABLED=true`, `VITE_EXPERIMENTS_ENABLED=true`); keep prod false.
5) Run QA checklist and 3–7 day baseline heatmap.
6) If clean, flip prod to control-only (no UI change), then start hero CTA 50/50.

## Kill switches / safety
- Env flags default false in docs (`env-flags.md`); routes return 404 when disabled; provider skipped when disabled.
- Consent/DNT gating documented in `privacy-consent.md`.
- Rollback plan in `handoff-into-code.md` and `migration-apply-guide.md`.

## Where to look
`docs/future features/A-B testing components/` contains all planning, stubs, runbooks, SQL, and status files.
