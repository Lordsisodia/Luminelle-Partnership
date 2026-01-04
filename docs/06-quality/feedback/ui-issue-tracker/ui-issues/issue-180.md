# Issue 180: Admin mobile drawer is “hidden” only by transform (no `aria-hidden`/`inert`, still reachable in the DOM)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `180`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Admin`
- Impact (1–5): `3`
- Reach (1–5): `2`
- Effort (1–5): `3`
- Confidence (1–3): `3`
- Priority: `15` ((3×2×3)−3)
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Restatement: The admin mobile nav drawer was “hidden” only by translating it off-screen, leaving focusable links/buttons reachable by keyboard/screen readers even when the drawer is closed.

Audit claim (issue 180): Admin mobile drawer stays in the DOM and is toggled via `translate-x` classes with no `aria-hidden`/`inert` or dialog semantics.

Likely sources:
- `src/domains/admin/shared/ui/layouts/AdminShell.tsx` (mobile drawer `id="admin-drawer"`)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES` and set status accordingly.

Verified: **YES**.

Evidence (pre-fix):
- `src/domains/admin/shared/ui/layouts/AdminShell.tsx` rendered the mobile drawer at all times and only moved it off-screen via `drawerOpen ? 'translate-x-0' : '-translate-x-full'`.
- No `aria-hidden`, no `inert`, no focus management; focusable nav items remained in the tab order when the drawer was closed.

Repro (pre-fix):
1. On a small viewport (mobile width), visit any `/admin/*` route.
2. With the drawer closed, press `Tab` repeatedly.
3. Keyboard focus can land on off-screen nav items inside the closed drawer (“ghost focus”).

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX** (a11y + “ghost UI” issues in admin navigation).

Dependencies: none.

## Step 4 — Options
- [x] Option A: Conditionally render the drawer only when open (simple, but loses close animation).
- [x] Option B: Keep it mounted for animation, but make it non-interactive when closed (`aria-hidden` + `inert` + visibility + focus trap).
- [x] Pick one + rationale (fit with domain architecture).

Selected: Option B.

Rationale:
- Preserves existing transform-based animation on open while fixing keyboard/screen-reader reachability.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Add `aria-hidden` + dialog semantics to the drawer container.
- Make the drawer unfocusable/non-interactive when closed (`inert` + `invisible`).
- Add basic focus handling:
  - focus first item on open
  - trap `Tab` within the drawer while open
  - close on `Escape` and restore focus to the opener when appropriate

Acceptance criteria:
- When the drawer is closed, keyboard tabbing cannot reach any of its links/buttons.
- When open, focus stays inside the drawer with Tab/Shift+Tab.
- Escape closes the drawer.
- Typecheck passes.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- `src/domains/admin/shared/ui/layouts/AdminShell.tsx`
  - Added drawer refs + focus management.
  - Added `role="dialog"`, `aria-modal` (when open), `aria-hidden` (when closed).
  - Added `inert` toggling and `invisible` when closed to prevent focusability.
  - Added a basic focus trap for the drawer when open.

Validation:
- `npm run typecheck`
- Manual QA checklist:
  - On mobile width, close drawer and `Tab` → focus should never land in the hidden drawer.
  - Open drawer → focus moves into drawer and cycles within it.
  - Press `Escape` → drawer closes.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE.

---

## Evidence / Links

- Code refs:
- `src/domains/admin/shared/ui/layouts/AdminShell.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Admin mobile drawer is now inaccessible when closed and behaves like a modal drawer when open (aria + focus handling).
