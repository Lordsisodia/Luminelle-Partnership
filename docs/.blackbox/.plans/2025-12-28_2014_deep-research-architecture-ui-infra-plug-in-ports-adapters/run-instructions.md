# Run Instructions (6–10 hours / ~50 prompts)

This run is designed to be executed in **Codex CLI** as a long research session.

## Hard constraints (paste into Codex at the start)

1) **No code changes.** Read-only architecture research only.
2) Write outputs only into:
   - `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/`
3) Maintain long-run memory:
   - checkpoint via `./.blackbox/scripts/new-step.sh`
   - compact context via `./.blackbox/scripts/compact-context.sh`

## Prompt sequence (this plan)

Follow the 50-prompt checklist here:
- `agent-cycle.md`

## Inputs (paste into Codex, in order)

1) `docs/.blackbox/agents/deep-research/prompts/context-pack.md`
2) `docs/.blackbox/agents/deep-research/prompts/library/12-ui-infra-plugin-architecture.md`

## Background safety (recommended in a second terminal)

Keep the repo “healthy” during a long run (template drift, perms, doc validators):

```bash
./.blackbox/scripts/validate-loop.sh --auto-sync --interval-min 15 --max-failures 3
```

## Cadence (to hit ~50 prompts in 6–10h)

- Target pace: **5–8 prompts/hour** (avg ~6).
- Every **3–5 prompts** (or every ~30–45 minutes):
  - Create a checkpoint step file:
    - `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters "Checkpoint: <what changed>"`
  - Update `status.md` (phase + next actions).
- If the agent starts looping or context gets too big:
  - `./.blackbox/scripts/compact-context.sh --plan .blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters`
  - Then re-read `context/context.md` + most recent compaction.

## Required outputs (must exist by the end)

- `final-report.md` — target architecture + port catalog + dependency rules
- `artifact-map.md` — concrete coupling inventory (paths + notes)
- `rankings.md` — ranked migration steps (0–100)
- `artifacts/sources.md` — internal code paths referenced (plus any external sources if used)
- `artifacts/summary.md` — short synthesis for quick skim

## Optional outputs (nice to have)

- `ports.md` — the full port contract catalog + DTOs/capabilities (if `final-report.md` gets too large)
- `migration-checklist.md` — a step-by-step execution plan for later code changes
