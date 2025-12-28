# Issue 068: Typography system conflicts: `font-heading` is defined twice with different fonts

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `68`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `TBD`
- Impact (1–5): `2`
- Reach (1–5): `3`
- Effort (1–5): `1`
- Confidence (1–3): `3`
- Priority: `17` (=(2×3×3)−1)
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Restatement: Heading typography should have a single source of truth; a custom `.font-heading` CSS override should not fight Tailwind’s `font-heading` utility.

Audit claim (Issue 68): Tailwind set `fontFamily.heading` to `"The Seasons"`, but `src/index.css` defined a `.font-heading` class forcing `Playfair Display`, overriding the design token.

Likely files:
- `tailwind.config.js`
- `src/index.css`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Evidence (current code):
- `tailwind.config.js` defines `fontFamily.heading` and Tailwind’s `font-heading` utility uses that token.
- No `.font-heading { ... }` override exists in `src/index.css` anymore (searching for `.font-heading` returns no matches).

Verified: **YES** (the “double-definition override” described in the audit is not present in current code)

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **DONE (already addressed)**.

Notes:
- If the team later decides to switch heading typography back to “The Seasons”, do it via Tailwind `fontFamily.heading` (not via a raw CSS override).

## Step 4 — Options
- [x] Option A: Remove the custom `.font-heading` override and rely on Tailwind’s `fontFamily.heading` token.
- [x] Option B: Keep the custom `.font-heading` override and accept token drift.
- [x] Pick one + rationale (fit with domain architecture).

Picked Option A (already in code): keep typography centralized in Tailwind tokens so changes propagate consistently.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Acceptance criteria:
- There is only one source of truth for `font-heading` (Tailwind tokens).
- No `.font-heading` CSS class overrides Tailwind’s utility.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Result:
- No changes required in this pass; the conflicting CSS override is not present.

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
  - `tailwind.config.js` (`theme.extend.fontFamily.heading`)
  - `src/index.css` (no `.font-heading` override present)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: The typography conflict described in the audit is not present in the current codebase; `font-heading` resolves via Tailwind’s fontFamily token without a competing CSS override.
