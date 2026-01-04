# Run Now (10h / ~50 prompts)

Goal: run a long architecture “loop” where the agent gathers evidence from the repo and reasons from first principles to produce a practical execution plan.

This run is docs-only (no `src/` edits).

---

## 0) Keep the repo healthy (second terminal, recommended)

From `docs/`:

```bash
./.blackbox/scripts/validate-loop.sh --auto-sync --interval-min 15 --check-vendor-leaks
```

Notes:
- This won’t fix vendor leaks (those are in app code), but it keeps them visible and keeps the blackbox runtime consistent.

---

## 1) Start the loop (main terminal)

Open the prompt pack:
- `docs/.blackbox/.prompts/backend-frontend-interchangeability-loop.md`

Then open and fill the cycle checklist:
- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/agent-cycle.md`

If you want a deterministic 50‑prompt sequence (6–10 hours) without improvising prompts:
- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/agent-cycle-prompts-50.md`

Write outputs into this plan folder:
- `final-report.md`
- `artifact-map.md`
- `rankings.md`
- `artifacts/summary.md`
- `artifacts/sources.md` (paths; no web links needed)
- `tenancy-context-rules.md` (tenant resolution + propagation)
- Inspection helpers (when reviewing code paths; still docs-only in this run):
  - `inspect-first.md` (frontend `src/**`)
  - `inspect-first-backend.md` (backend `functions/**` + legacy `api/**`)

---

## 2) Checkpoints (every 5 prompts)

Update:
- `status.md` (phase + next actions)
- `progress-log.md` (one line per checkpoint)

Optional:
- `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop "Checkpoint: <what changed>"`
- `./.blackbox/scripts/compact-context.sh --plan .blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop`

---

## 3) Evidence refresh (recommended every checkpoint)

From `docs/`:
- One command (recommended):
  - `./.blackbox/scripts/run-1909-loop.sh`
- Equivalent (two-step):
  - `./.blackbox/scripts/refresh-1909-all-gates.sh`
  - `./.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`

Key evidence outputs:
- `artifacts/snapshots/stop-point-metrics.latest.txt`
- `artifacts/snapshots/api-vs-functions.summary.txt`
- `artifacts/snapshots/check-vendor-leaks.txt`
- `artifacts/snapshots/run-1909-loop.latest.txt` (human-readable consolidated loop output)
