# Issue 084: Drawer uses extremely small type (`text-[9px]`) for high-salience information

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `84`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

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

The drawer used extremely small 9px uppercase text for important labels/status copy, which is hard to read on mobile and hurts perceived polish/accessibility.

Audit (issue 84): `docs/reviews/app-ui-review-2025-12-26.md` — “Drawer uses extremely small type (`text-[9px]`)”.

Likely file:
- `src/ui/providers/DrawerProvider.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence:
- `DrawerProvider` used `text-[9px]` for high-salience UI (e.g. the “Best Seller” badge and the free-shipping status chip in the cart footer).

Repro (before fix):
1. Open the drawer (menu/cart).
2. Note the “Best Seller” badge and the shipping status chip render at ~9px.
3. On mobile, the label is borderline unreadable.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- This is a high-frequency surface; tiny microcopy is both a usability and perceived-quality issue.
- No dependencies.

## Step 4 — Options
- [x] Option A: Increase microcopy sizes to ~11–12px and slightly reduce tracking.
- [ ] Option B: Remove the labels entirely (loses useful signals).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: improves legibility without changing layout/structure.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Replace `text-[9px]` with `text-[11px]` for key drawer badges/status chips.
- Slightly reduce letter spacing so uppercase remains readable.

Acceptance criteria:
- No `text-[9px]` remains in drawer UI for important labels.
- Typecheck passes.

Risks:
- Minor layout shift (slightly taller chips); acceptable for readability.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Increased drawer badge/status chip font size from 9px → 11px and reduced tracking.

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

- Audit: `docs/reviews/app-ui-review-2025-12-26.md` (issue 84)
- Code refs:
  - `src/ui/providers/DrawerProvider.tsx` (microcopy font sizes updated)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Drawer microcopy is now readable on mobile, improving accessibility and perceived polish.
