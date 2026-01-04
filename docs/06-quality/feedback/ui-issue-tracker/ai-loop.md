# AI black-box loop (per-issue workflow)

This file defines the **repeatable prompt loop** the AI uses to process UI issues end-to-end.

Source audit (initial): `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issues `1–180`).

## Ground rules (execution contract)

1) **Branch safety:** work on `dev` only; do not touch `main`.
2) **Verify before fix:** don’t implement unless the issue is verified or the root cause is purely static/config.
3) **Record everything:** update the per-issue worklog + the tracker on every status change.
4) **Small blast radius:** aim for one issue (or one tight cluster) per change set.
5) **Tests are “best effort”:** run them when cost-effective; if skipped, record why + what manual check would catch regressions.

## Status model (state machine)

Use these statuses in `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`:

- `UNTRIAGED` — imported from audit, not checked yet
- `VERIFYING` — collecting evidence + repro
- `NOT_AN_ISSUE` — false positive or already fixed (with evidence + why)
- `DUPLICATE` — same issue as another ID (link to canonical)
- `DEFERRED` — real, but not worth fixing now (include trigger to revisit)
- `NEEDS_DECISION` — real, but requires product/design decision (AI stops and asks)
- `PLANNED` — decision made, plan written, ready to implement
- `IN_PROGRESS` — implementing
- `VALIDATING` — running tests / sanity checks / screenshots
- `DONE` — fixed + validated + docs updated

## Scoring (so the AI can self-prioritize)

Score each issue during triage:

- `Impact` (1–5)
  - 5 = blocks checkout/add-to-cart/auth/admin save
  - 4 = trust/compliance risk (misleading pricing/claims/consent)
  - 3 = major UX friction / a11y blocker on core flows
  - 2 = noticeable polish issue
  - 1 = minor cosmetic
- `Reach` (1–5)
  - 5 = affects most users (header/cart/checkout)
  - 3 = affects a subset (PDP only, admin only)
  - 1 = edge route
- `Effort` (1–5)
  - 5 = multi-system / major refactor
  - 3 = moderate
  - 1 = small localized fix
- `Confidence` (1–3)
  - 3 = verified (code + repro)
  - 2 = likely (code evidence, repro pending)
  - 1 = speculative

Suggested priority formula:

`Priority = (Impact × Reach × Confidence) − Effort`

## The 7-step per-issue loop

Each issue worklog must follow these steps (the worklog file contains the checklist).

### Step 1 — Intake
Goal: understand what the audit claims and where it lives.

Required outputs:
- 1-sentence restatement of the problem
- Link to the audit issue (`docs/06-quality/reviews/...` + issue number)
- List likely source files/components

### Step 2 — Verify
Goal: confirm it’s real, current, and reproducible.

Required outputs:
- Evidence in code (file + relevant snippet/description)
- Repro steps (route + interactions)
- `Verified: YES/NO`
  - If `NO`: set status to `NOT_AN_ISSUE` or `DUPLICATE`, with rationale

### Step 3 — Assess (is it worth solving now?)
Goal: avoid fixing low-value issues or issues blocked by bigger decisions.

Required outputs:
- Impact + reach + effort + confidence + priority
- Decision: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`

### Step 4 — Options (2–3 approaches)
Goal: choose the best fix consistent with the domain architecture.

Required outputs:
- Option A/B(/C) with pros/cons
- Selected option + why it fits the architecture

### Step 5 — Plan
Goal: make execution testable and reviewable.

Required outputs:
- Implementation plan (bullets)
- Acceptance criteria (what “done” means)
- Risks + rollback plan

### Step 6 — Execute + Validate
Goal: implement safely and prove it works.

Required outputs:
- Summary of code changes (files touched)
- Validation results
  - Run tests when sensible (unit/lint/build/Playwright)
  - If skipping Playwright or other tests: record why + minimal manual QA steps

### Step 7 — Record + Close
Goal: make the system remember what happened.

Required outputs:
- Update tracker status (`DONE`/`DEFERRED`/etc.)
- Short summary: what changed, how verified, any follow-ups
- Link to PR/commit if you use them (optional)

