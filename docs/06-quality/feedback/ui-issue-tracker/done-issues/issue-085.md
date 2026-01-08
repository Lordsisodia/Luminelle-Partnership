# Issue 085: Admin sidebar icon active-state styling likely never activates (current section is harder to spot)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `85`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Admin`
- Impact (1–5): `2`
- Reach (1–5): `2`
- Effort (1–5): `1`
- Confidence (1–3): `2`
- Priority: `(2 × 2 × 2) − 1 = 7`
- Owner: `AI`
- Created: `2025-12-27`
- Closed: `2026-01-08`

---

## Step 1 — Intake
- Restatement: The admin sidebar icon/label styling can fail to reflect the active route because some styling patterns rely on a literal `.active` class that React Router v6 does not add automatically.
- Audit claim (key point): The audit called out Tailwind selectors like `group-[.active]:...` being used while the `NavLink` never gets an `active` class, so child styling never activates.
- Likely files/components:
  - `src/domains/admin/shared/ui/components/NavRailItem.tsx`
  - `src/domains/admin/shared/ui/components/NavUtilityItem.tsx`

## Step 2 — Verify
- Verified: **YES**
- Current code uses `className={({ isActive }) => ...}` to style the active item, but does **not** provide a stable “active hook” class for any selector that targets `.active` (which is what the audit was warning about).
- Repro steps:
  1. Navigate to any admin route, e.g. `/admin/products`.
  2. Inspect the active sidebar item `<a>` element in the icon rail.
  3. Note that without an explicit `active` class, selectors like `group-[.active]:...` cannot match, even if `aria-current="page"` is present.

## Step 3 — Assess
- Decision: **FIX**
- Notes: This is a low-effort change that makes the nav styling more robust and compatible with “class-based active styling” patterns.

## Step 4 — Options
- Option A (chosen): Add an explicit `active` class when `isActive === true`.
- Option B: Rewrite all dependent styles to rely purely on `isActive` (works but makes it harder to style descendants without repeating logic).
- Rationale: Option A is minimal, backwards-compatible, and supports both approaches.

## Step 5 — Plan
- Implementation:
  - Add `active` to the `NavLink` class list when `isActive` is true.
  - Apply to both nav rails (section nav + utility nav) for consistency.
- Acceptance criteria:
  - On an active admin route, the corresponding sidebar `<a>` contains the literal `active` class.
  - Active visual styling continues to work (background/ring/text color) with existing `isActive` styling.

## Step 6 — Execute + Validate
- Implemented:
  - `src/domains/admin/shared/ui/components/NavRailItem.tsx`: add `active` class when `isActive`
  - `src/domains/admin/shared/ui/components/NavUtilityItem.tsx`: add `active` class when `isActive`
- Validation:
  - `npm run lint` (currently fails in this worktree due to pre-existing lint errors unrelated to this change)
  - `npm run typecheck`
  - `npm run build`

## Step 7 — Record + Close
- Updated tracker row for issue `85` to `DONE` and moved this worklog to `done-issues/`.

---

## Evidence / Links

- Audit section: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (Issue 85).
- Code refs:
  - `src/domains/admin/shared/ui/components/NavRailItem.tsx`
  - `src/domains/admin/shared/ui/components/NavUtilityItem.tsx`

## Outcome

- Final status: `DONE`
- Final notes: The sidebar nav now exposes a stable `.active` class hook for any descendant styling selectors, while preserving the existing `isActive`-driven visuals.
