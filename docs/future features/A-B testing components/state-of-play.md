# State of Play (A/B + Heatmap)

What exists (doc-only, app untouched)
- Plan + checklist + roadmap: `ab-testing-components.md`, `checklist.md`, `implementation-plan.md`.
- Backend schema draft: `server/migrations/2025-12-11_experiments.sql` (tables, view, seed row, RLS stubs).
- Client SDK scaffold: `src/experiments/*` (hash, identity, config fetch, track queue, provider); not mounted.
- Server/client stubs: `server-stub.md`, `client-stub.md` (env-gated examples).
- Env/runbooks/specs: `env-flags.md`, `staging-runbook.md`, `handoff-into-code.md`, `first-experiment-spec.md`.
- Dashboards/SQL: `dashboard-template.md`, `srm-missing-exposure-cron.sql`, `heatmap-overlay.md`.
- QA/test/privacy: `qa-checklist.md`, `test-plan.md`, `privacy-consent.md`.
- Worklog + current doc status: `build-steps-worklog.md`.

What’s left before touching app code
- Decide staging Supabase credentials and enable flags there only.
- Apply migration to staging; verify seed + view.
- Move stubs into code behind env flags; wire provider around app shell.
- Enable hero CTA experiment only on staging; run QA checklist.
- Baseline heatmap run (staging) 3–7 days; review hotspots.

What to flip for prod later
- Turn on flags with 100% control split first; monitor; then 50/50 hero CTA.
- Keep kill switch and DNT/consent gating in place.
