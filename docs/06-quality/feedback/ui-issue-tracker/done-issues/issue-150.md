# Issue 150: Drawer scroll-lock can cause horizontal “page jump” (scrollbar disappears with no compensation)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `150`
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

When the drawer opens, the app scroll-locks by setting `document.documentElement.style.overflow = 'hidden'`, which can remove the scrollbar and cause a noticeable horizontal “page jump” on desktop.

Audit (issue 150): `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — “Drawer scroll-lock can cause horizontal “page jump” (scrollbar disappears with no compensation)”.

Likely file:
- `src/ui/providers/DrawerProvider.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- `DrawerProvider` toggled `document.documentElement.style.overflow = 'hidden'` when the drawer is mounted, with no scrollbar-width compensation.

Repro (before fix):
1. On a desktop browser with persistent scrollbars, visit any page with enough content to show a vertical scrollbar.
2. Open the drawer (hamburger).
3. Observe the page content “jumps” horizontally as the scrollbar disappears/reappears.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- This is a polish issue, but it affects a primary navigation surface and is highly noticeable on desktop.
- No product/design decision required.

## Step 4 — Options
- [x] Option A: Compute scrollbar width and apply `padding-right` while scroll-locked (prevents layout shift).
- [x] Option B: Use `scrollbar-gutter: stable` globally (modern, but not universal).
- [ ] Option C: Adopt a third-party scroll-lock utility (larger change / more surface area).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: minimal, framework-agnostic, and works in browsers regardless of `scrollbar-gutter` support.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- When `drawerMounted`, compute `scrollbarWidth = window.innerWidth - document.documentElement.clientWidth`.
- Set `overflow: hidden` and add `padding-right` equal to `scrollbarWidth`.
- On cleanup, restore original `overflow` and `padding-right`.

Acceptance criteria:
- Opening/closing the drawer does not shift the page horizontally on desktop browsers with persistent scrollbars.
- Existing drawer behavior (open/close animation, focus trap) is unchanged.
- `npm run typecheck` passes.

Risks:
- Low. The main risk is clobbering existing inline padding; mitigated by restoring the original inline style.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Added scrollbar-width compensation while locking scroll for the drawer.

Files touched:
- `src/ui/providers/DrawerProvider.tsx`

Validation:
- `npm run typecheck` ✅
- Manual QA (best-effort):
  - Open the drawer on a long page in desktop Chrome/Safari/Firefox and confirm no horizontal shift.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 150)
- Code refs:
  - `src/ui/providers/DrawerProvider.tsx` (scroll-lock compensation)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Drawer scroll-lock now preserves layout width by compensating for scrollbar removal, preventing the desktop “page jump” effect.
