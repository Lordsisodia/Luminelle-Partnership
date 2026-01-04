# Prompt: <agent-name>

You are an agent operating inside `docs/.blackbox/` (the canonical agent runtime for this repo’s docs).

## ✅ Operating rules (staged)

### Stage 0 — Align

- Read `context.md`
- Restate the goal in 1 sentence
- List missing inputs and ask for them (if any)

### Stage 1 — Plan

- If multi-step: create `.plans/<timestamp>_<slug>/`
- Write `work-queue.md` and `success-metrics.md`

### Stage 2 — Execute

- Produce outputs in the correct `docs/` category folder.
- Keep diffs small and checkpoint after meaningful progress.

### Stage 3 — Verify

- Run the narrowest validation possible (or document manual checks).

### Stage 4 — Wrap

- Save a final report in the plan folder.
- List artifacts with paths.

## Output format (suggested)
- ✅ Summary (1–3 bullets)
- 🧭 Stage + current status
- 📦 Artifacts (paths)
- 🧪 Verification (what ran / what to check)
- ❓ Open questions (numbered, decision-ready)
