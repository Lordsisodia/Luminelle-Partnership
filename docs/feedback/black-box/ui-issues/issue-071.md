# Issue 071: Drawer hijacks ArrowLeft/ArrowRight globally to switch tabs (surprising keyboard UX)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `71`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `3`
- Reach (1–5): `5`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `27`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

When the drawer is open, it listened to `ArrowLeft/ArrowRight` at the window level to switch tabs, which is surprising and can create “why did my keys stop working?” moments for keyboard users.

Audit (issue 71): `docs/reviews/app-ui-review-2025-12-26.md` — “Drawer hijacks ArrowLeft/ArrowRight globally to switch tabs”.

Likely file:
- `src/ui/providers/DrawerProvider.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- Drawer attached a `window.addEventListener('keydown', ...)` handler and handled `ArrowLeft/ArrowRight` inside that global listener to change tabs.

Repro (before fix):
1. Open the drawer (menu/cart).
2. Tab to the “Menu / Cart” tabs.
3. Press ArrowLeft/ArrowRight.
4. Observe that the tab-switching logic ran from a global key listener, not from the tablist itself.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- Arrow-key navigation is correct for tabs, but it should be scoped to the tablist (not handled globally).
- No product decision needed.

## Step 4 — Options
- [x] Option A: Move ArrowLeft/ArrowRight handling to the tablist’s `onKeyDown` (scoped, expected).
- [ ] Option B: Remove ArrowLeft/ArrowRight navigation entirely (worse a11y for tabs).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: keep correct tab keyboard UX, but avoid global keyboard interception.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Remove ArrowLeft/ArrowRight handling from the window-level keydown listener in the drawer.
- Add an `onKeyDown` handler to the drawer tablist to move focus + switch tabs.

Acceptance criteria:
- ArrowLeft/ArrowRight still switches between Menu/Cart when focus is on the tabs.
- Arrow keys are not handled at the window level anymore.
- Typecheck passes.

Risks:
- Very low; keyboard handling is now more localized and predictable.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Moved arrow-key tab switching to the tablist element and removed it from the global keydown handler.

File touched:
- `src/ui/providers/DrawerProvider.tsx`

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/reviews/app-ui-review-2025-12-26.md` (issue 71)
- Code refs:
  - `src/ui/providers/DrawerProvider.tsx` (`onKeyDown` added to the tablist; arrow keys removed from window listener)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Arrow-key tab navigation is now scoped to the tablist instead of being handled by a global key listener.
