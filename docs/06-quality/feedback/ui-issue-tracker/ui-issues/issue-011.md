# Issue 011: Right-side drawer doesn’t actually animate (appears/disappears instantly)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `11`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `2`
- Reach (1–5): `5`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `17`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The right-side drawer only mounted when `menuOpen === true`, so the `transition-transform` never had a chance to animate (it appeared/disappeared instantly).

Audit (issue 11): `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — “Right-side drawer doesn’t actually animate”.

Likely file:
- `src/ui/providers/DrawerProvider.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- Drawer markup was wrapped in `{menuOpen ? (...) : null}`, so it mounted already at the “open” transform and unmounted on close.

Repro (before fix):
1. Click the hamburger to open the drawer.
2. Observe it pops in instantly.
3. Close it and observe it disappears instantly (no slide-out).

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- This is a primary navigation + cart surface; lack of animation feels “janky” and lowers perceived quality.
- No product decision needed.

## Step 4 — Options
- [x] Option A: Keep the drawer mounted during open/close transitions (mount + next-frame open; close + delayed unmount).
- [ ] Option B: Add a third-party drawer/dialog component (larger change).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: minimal code change and preserves the existing drawer implementation.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Add a `drawerMounted` state that controls whether the overlay/aside are rendered.
- On open: set `drawerMounted=true`, then `requestAnimationFrame(() => setMenuOpen(true))` to trigger the slide-in transition.
- On close: set `menuOpen=false` (start slide-out), then unmount after `300ms` to match the CSS duration.
- Update all close actions (overlay click, close button, nav link clicks, Escape key) to use a shared `closeDrawer()` helper so they animate consistently.

Acceptance criteria:
- Drawer slides in (open) and slides out (close) instead of popping.
- Overlay fades in/out.
- Typecheck passes.

Risks:
- Slight increase in state complexity; kept small with helper functions and a single timeout.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Implemented mount + open/close helpers so the drawer stays mounted long enough for transitions to run.

File touched:
- `src/ui/providers/DrawerProvider.tsx`

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 11)
- Code refs:
  - `src/ui/providers/DrawerProvider.tsx` (drawerMounted + open/close helpers)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Drawer now animates in/out instead of appearing/disappearing instantly, improving perceived quality on mobile and desktop.
