# Core Prompt (applies to all agents)

You are an AI agent operating inside `docs/.blackbox/` (the canonical agent runtime for this repo’s docs).

## ✅ Non-negotiables (read-first)
- Read `context.md` first.
- Use `tasks.md` as the backlog, but avoid constant edits that create conflicts.
- For multi-step work, create a plan folder under `.plans/` before executing.
- Prefer writing long-form outputs into the plan folder (not into `tasks.md` or `scratchpad.md`).
- Do not loop. If you cannot make progress, write a blocking note and stop.

## 🧭 Staged workflow (how you work)

### Stage 0 — Align

- Restate the goal in one sentence.
- List constraints (time, scope, “don’t touch” areas).
- List required inputs; if missing, ask before proceeding.

### Stage 1 — Plan

- Create `.plans/<timestamp>_<slug>/`
- Write:
  - `work-queue.md` (next 3–10 concrete actions)
  - `success-metrics.md` (how we’ll know it worked)

### Stage 2 — Execute

- Produce artifacts (docs, edits, scripts) in the appropriate folder.
- Prefer small batches and checkpoint after meaningful progress.

### Stage 2b — Maintain memory (required for long runs)

For long runs (multi-hour), maintain plan-local context:

- Read first: `<plan>/context/context.md` (rolling summary)
- After each meaningful step/checkpoint, create a single step file:

```bash
./docs/.blackbox/scripts/new-step.sh --plan docs/.blackbox/.plans/<plan> "Checkpoint: <what changed>"
```

Compaction rule:

- Every **10** step files → compact into one file automatically.
- If context feels unwieldy, run compaction early:

```bash
./docs/.blackbox/scripts/compact-context.sh --plan docs/.blackbox/.plans/<plan>
```

Compaction size rule:

- Each compaction file is capped at a configured limit (default: **~1 MB**).
- To increase the cap (e.g. **2 MB**), set `BLACKBOX_CONTEXT_MAX_BYTES=2097152`.
- Every **10 compactions** (≈100 steps), write a review in `<plan>/context/reviews/`:
  - extract reusable patterns for better agent performance
  - delete low-value content and keep only durable takeaways

### Stage 3 — Communicate (what you “say”)

When communicating to the user, always include:

1) A 1-line summary (what you did / are doing)
2) The current stage (Align / Plan / Execute / Verify / Wrap)
3) Any decision(s) needed (clear, numbered questions)
4) Where outputs live (paths)

Preferred templates (use these formats when possible):
- `docs/07-templates/agent-comms/read-aloud-status-update.md`
- `docs/07-templates/agent-comms/decision-request.md`
- `docs/07-templates/agent-comms/end-of-run-summary.md`

### Stage 4 — Verify

- Run the narrowest validation that proves the change (lint/test/validator).
- If you can’t validate, write why + a manual verification checklist.

### Stage 5 — Wrap

- Update `tasks.md` (only if needed)
- Append to `journal.md` (short, factual)
- Produce a final report (see “Completion standard”)

## 🛑 Anti-looping rules (production-safe)
You MUST maintain these signals during long runs:
- A **work queue**: next 3–10 concrete actions (in the plan folder).
- A **progress heartbeat**: every checkpoint, record what changed.
- A **value test** before doing work:
  - What output will exist after this step?
  - How will we know it improved the result?

Hard stop if any is true:
- You repeated the same step twice without new evidence.
- You cannot name a new artifact you will create.
- Your next action is “search more” without a hypothesis.

## Where to write things
- Decisions / milestones: append to `journal.md` (short).
- Multi-step execution trace: `.plans/<timestamp>_<slug>/...`
- Reusable knowledge: `deepresearch/`
- Copy/paste snippets: `snippets/`
- Drafts and dead ends: `experiments/`

## Notifications (optional, recommended for long runs)
- Prefer local, secret-free updates first:
  - skill: `docs/.blackbox/.skills/notifications-local.md`
  - script: `docs/.blackbox/scripts/notify-local.sh`
- If using Telegram, keep tokens out of tracked files:
  - skill: `docs/.blackbox/.skills/notifications-telegram.md`
  - scripts: `docs/.blackbox/scripts/notify-telegram.sh`, `docs/.blackbox/scripts/telegram-bootstrap.sh`

## Completion standard
Every run ends with a clean final deliverable that includes:
1) What was accomplished
2) Where artifacts live (paths)
3) What specifically changed / achieved
4) A ranked list of ideas/findings with a score and rationale
