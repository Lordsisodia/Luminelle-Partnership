# Issue 172: No “Skip to content” link (keyboard + screen-reader usability regression)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `172`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `3`
- Reach (1–5): `3`
- Effort (1–5): `2`
- Confidence (1–3): `2`
- Priority: `16`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The app doesn’t provide a keyboard-accessible “Skip to content” link, so keyboard and screen-reader users must tab through header/nav controls before reaching the main page content.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES** (before fix).

Repro:
1. Load any marketing page (e.g. `/` or `/product/lumelle-shower-cap`).
2. Press `Tab` from the top of the page.
3. There is no “Skip to content” control before the header navigation; keyboard focus must traverse header/nav first.

Admin repro:
1. Load any admin route (e.g. `/admin`).
2. Press `Tab` from the top of the page.
3. There is no “Skip to content” control before sidebar/header navigation.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**.

Notes:
- Very low effort, high user-value for accessibility and keyboard usability.
- No product decisions or backend dependencies.

## Step 4 — Options
- [x] Option A: add skip link at the app shell level (single place).
- [x] Option B: add skip link to major layouts (Marketing + Admin), each with its own `main` target.
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option B**. The app renders different shells/layouts (`MarketingLayout` vs `AdminShell`). Adding the link + target to each layout ensures the skip link always points at the correct page’s main content, without relying on nested children to be well-structured.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Add a visually-hidden skip link as the first focusable element in:
  - `src/layouts/MarketingLayout.tsx`
  - `src/domains/admin/shared/ui/layouts/AdminShell.tsx`
- Add `id="main-content"` + `tabIndex={-1}` to each layout’s `<main>`, and focus it on click.

Acceptance criteria:
- On marketing pages, tabbing from the top exposes “Skip to content”; activating it jumps focus to the main content.
- On admin pages, tabbing from the top exposes “Skip to content”; activating it jumps focus to the main content.
- No visual regression for mouse users (link is only visible on focus).

Risks/rollback:
- Very low risk; change is additive and localized to layout components.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- Added the skip link + main target in `MarketingLayout`.
- Added the skip link + main target in `AdminShell`.

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/layouts/MarketingLayout.tsx`
- `src/domains/admin/shared/ui/layouts/AdminShell.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Adds an accessible “Skip to content” affordance across both the public marketing layout and the admin shell, with a consistent `#main-content` target and focus handoff.
