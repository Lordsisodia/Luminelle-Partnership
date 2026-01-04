# Agent Cycle

Goal: Backend↔Frontend interchangeability + scalability (first principles)
Planned duration: ~10h
Planned prompts: 50
Created at (local): 2025-12-29 19:09
Plan: .blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop

## Background safety (recommended)

Run periodic validation in another terminal:

```bash
./.blackbox/scripts/validate-loop.sh --auto-sync --interval-min 15
```

## Operating loop

For each prompt:
0) Refresh evidence + dashboard:
   - Preferred: `./.blackbox/scripts/run-1909-loop.sh`
   - Equivalent:
     - `./.blackbox/scripts/refresh-1909-all-gates.sh`
     - `./.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`
   - Primary “what to fix next” signal: `stop-point-status-dashboard.md`
1) Decide next micro-goal (small, verifiable)
   - Use the “inspect-first” lists to keep scope tight:
     - Frontend wiring: `inspect-first.md`
     - Backend boundary + drift hotspots: `inspect-first-backend.md`
   - If the micro-goal is “research-derived expansion”, start from:
     - `research-index.md`
     - `architecture-expansion-from-research.md`
2) Execute (edits / checks / write-up)
3) Capture artifacts under `artifacts/` if needed
4) Record a checkpoint

Checkpointing:
- Every 1 prompt(s), add a step file:
  - `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop "Checkpoint: <what changed>"`

If context gets long:
- `./.blackbox/scripts/compact-context.sh --plan .blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop`

## Prebuilt prompt sequence (50 prompts)

If you want a long-running, deterministic loop (6–10 hours / ~50 prompts), use:
- `agent-cycle-prompts-50.md`

## Prompt log (fill as you go)

### Prompt 1
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 2
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 3
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 4
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 5
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 6
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 7
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 8
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 9
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 10
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 11
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 12
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 13
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 14
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 15
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 16
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 17
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 18
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 19
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 20
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 21
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 22
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 23
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 24
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 25
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 26
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 27
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 28
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 29
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 30
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 31
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 32
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 33
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 34
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 35
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 36
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 37
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 38
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 39
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 40
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 41
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 42
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 43
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 44
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 45
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 46
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 47
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 48
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 49
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:

### Prompt 50
- Time:
- Objective:
- Commands run:
- Files touched:
- Result:
- Next prompt:
