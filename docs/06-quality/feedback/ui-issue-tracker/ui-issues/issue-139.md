# Issue 139: Fonts are loaded via CSS `@import` (render-blocking and can worsen first paint)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `139`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Platform` (perf)
- Impact (1–5): `2`
- Reach (1–5): `3`
- Effort (1–5): `1`
- Confidence (1–3): `3`
- Priority: `17`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Restatement: The app loaded Google Fonts via CSS `@import`, which is render-blocking and can slow first paint; fonts should be loaded via `<link>` in `index.html`.

Audit claim (Issue 139): Fonts are loaded via CSS `@import`, worsening performance and perceived quality.

Likely source:
- `src/index.css` (global styles)
- `index.html` (document head)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before):
- `src/index.css` began with `@import url('https://fonts.googleapis.com/css2?...')`.
- `index.html` already had `preconnect` hints but did not include the stylesheet link itself.

Repro (before):
1) Load any page.
2) Browser must fetch CSS, then fetch the `@import` font CSS, then fetch font files — delaying first paint / text styling.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: `FIX`

Notes:
- Low effort, global benefit (slightly better first paint + less render-blocking behavior).

## Step 4 — Options
- [x] Option A: Remove CSS `@import` and add `<link rel="stylesheet" ...>` in `index.html`.
- [ ] Option B: Self-host fonts and bundle locally.
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option A** — simplest change, consistent with existing `preconnect` hints already present in `index.html`.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Remove the Google Fonts `@import` from `src/index.css`.
- Add a Google Fonts stylesheet `<link>` to `index.html` (using the same URL, `display=swap`).

Acceptance criteria:
- No Google Fonts `@import` at the top of `src/index.css`.
- `index.html` includes a stylesheet link to the same font families.
- App still renders with the correct fonts (Inter + Playfair Display) once loaded.

Risks/rollback:
- Low risk; rollback is restoring the old `@import` line.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implementation:
- `src/index.css`: removed the Google Fonts `@import`.
- `index.html`: added `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?...&display=swap" />`.

Validation:
- Best-effort: `npm run typecheck`
- Manual QA:
  1) Load the app and confirm no console errors due to missing fonts.
  2) Verify `font-heading` and `font-body` styles still apply as before.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

Summary:
- Moved Google Fonts loading out of CSS `@import` and into the document head, aligning with best practices and the existing `preconnect` hints.

---

## Evidence / Links

- Code refs:
- `src/index.css`
- `index.html`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: There are other `@import` usages inside unused “testimonial” components, but the global render-blocking font import is now removed from the main stylesheet.
