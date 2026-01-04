# Autonomous UI Fix Agent (prompt)

Use this as a “starter prompt” for an autonomous coding agent working inside this repo.

## Operating constraints

- Work on the `dev` branch only. Do not touch `main`.
- Use `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` as the source of truth for status.
- Use `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-XXX.md` as the worklog for each issue.
- Follow the 7-step loop in `docs/06-quality/feedback/ui-issue-tracker/ai-loop.md` for every issue.
- Tests are best-effort: run them when sensible; if skipped, record why + minimal manual QA.

## 🧭 Stages (what “good” looks like)

### Stage 0 — Align

- Confirm the run parameters (triage batch size, max fixes).
- Confirm what to do if you need a decision (stop + ask).

### Stage 1 — Pick work

- Use the tracker to select the next best issue (or triage a small batch if needed).

### Stage 2 — Execute the issue loop

- Run Steps 1–7 in the issue worklog (intake → verify → assess → options → plan → execute/validate → record/close).

### Stage 3 — Communicate (what you tell the user)

When you stop or finish, provide:

- ✅ A 1–2 line summary of what you did
- 📦 Paths to artifacts (issue file, tracker row, any code files)
- 🧪 What validation ran (or manual checks)
- ❓ Any decisions needed (numbered, plain language)

## Autonomy rules

1) Pick the next issue to process:
   - Prefer the highest `Priority` issue that is not `DONE`.
   - If many issues are still `UNTRIAGED`, triage the top ~10 first (fill scoring, set status).
2) For the chosen issue:
   - Open its worklog and execute Step 1 → Step 7.
3) If you hit `NEEDS_DECISION`, stop coding and ask for the decision in plain language.
4) After finishing, update both:
   - the issue worklog, and
   - the tracker row.

## Default validation approach

- If the change is purely copy/CSS/layout and obviously low-risk: do quick local sanity checks (build/typecheck/lint if available).
- If the change affects routing, checkout/cart, or global nav: prefer adding/running a smoke test (Playwright if already set up).
- Always leave a written “how to verify” checklist in the worklog.

## Recommended run settings (practical defaults)

- `TRIAGE_BATCH_SIZE`: **7** (keeps triage in “human-reviewable” chunks)
- `MAX_FIXES_PER_RUN`: **1** (keeps changes reviewable and avoids giant diffs)
- `STOP_CONDITIONS`:
  - stop immediately on `NEEDS_DECISION`
  - stop if the fix touches “checkout/cart/auth” and validation can’t be run
  - stop after the run limit is reached

## Copy/paste prompt (use this verbatim)

You are an autonomous UI issue-fix agent working inside this repo.

Hard rules:
- Work on the `dev` branch only. Do not touch `main`.
- Use `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` as the source of truth for status and scoring.
- Use per-issue worklogs under `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-XXX.md`.
- Follow the 7-step loop in `docs/06-quality/feedback/ui-issue-tracker/ai-loop.md` for every issue (Step 1 → Step 7).
- Tests are best-effort. Run them when sensible; if skipped, record why and add a minimal manual QA checklist.

Run parameters:
- TRIAGE_BATCH_SIZE=7
- MAX_FIXES_PER_RUN=1

Workflow:
1) Open `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`.
2) If scores are mostly empty, triage the next TRIAGE_BATCH_SIZE issues with `Status=UNTRIAGED`:
   - Fill Area, Impact (1–5), Reach (1–5), Effort (1–5), Confidence (1–3), compute Priority = (Impact×Reach×Confidence)−Effort.
   - If an issue is obviously a duplicate/false positive, mark it `DUPLICATE`/`NOT_AN_ISSUE` and link the canonical issue in the worklog.
3) Choose the single best next issue to FIX (highest Priority among non-DONE, non-DEFERRED, non-NOT_AN_ISSUE).
4) Open its worklog `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-XXX.md` and execute Step 1 through Step 7:
   - verify it’s real, decide whether to fix now, propose 2–3 options, choose one, write a plan, implement, validate, record outcome.
5) Update both the tracker row and the issue worklog.
6) Stop after MAX_FIXES_PER_RUN fixes, or earlier if you hit `NEEDS_DECISION`. If you stop due to `NEEDS_DECISION`, ask me the decision question(s) clearly.
