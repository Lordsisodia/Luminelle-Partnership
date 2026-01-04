# Black-box UI backlog (AI-executable)

This folder turns large UI audits (like `docs/06-quality/reviews/app-ui-review-2025-12-26.md`) into an **AI-executable backlog**:

- a **single tracker** that can be sorted + updated as work progresses
- a **per-issue worklog** that captures verification, decisions, implementation steps, and validation evidence

Why this lives under `docs/06-quality/feedback/`:

- The `docs/06-quality/feedback/` folder is already the project’s “living backlog” area (see `docs/06-quality/feedback/README.md`).
- This “black-box” loop is the mechanism for turning raw feedback/audits into repeatable execution.

## Start here

- Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`
- Batch ratings (batches of 7): `docs/06-quality/feedback/ui-issue-tracker/ui-issue-ratings-batches.md`
- Workflow (status + scoring + required steps): `docs/06-quality/feedback/ui-issue-tracker/ai-loop.md`
- Templates / prompt snippets: `docs/06-quality/feedback/ui-issue-tracker/templates/`

## Hard rules

- Work on the **`dev` branch only**. Do not land changes on `main`.
- Every issue must have:
  - a `Status` in the tracker, and
  - a worklog file in `ui-issues/`.
- No “drive-by fixes”: for each issue, record **verification evidence** and a **decision** before implementing.
