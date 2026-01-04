# Issue 155: Tailwind color `brand-porcelain` is referenced but not defined (styles silently fail)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `155`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Platform`
- Impact (1–5): `2`
- Reach (1–5): `3`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `9`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The codebase uses Tailwind utilities like `bg-brand-porcelain` and `ring-offset-brand-porcelain`, but `brand.porcelain` is not defined in `tailwind.config.js`, so these styles silently fail to render.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES** (before fix).

Evidence:
- `tailwind.config.js` defines `brand.peach/cocoa/blush` but not `brand.porcelain`.
- Many components use `bg-brand-porcelain` / `hover:bg-brand-porcelain/60` / `ring-offset-brand-porcelain`, for example:
  - `src/domains/admin/shared/ui/layouts/AdminShell.tsx`
  - `src/domains/platform/auth/ui/layouts/index.tsx`
  - `src/domains/ui-kit/components/Button.tsx`

Repro:
1. Render any UI that uses `bg-brand-porcelain` (e.g. admin shell).
2. Inspect computed styles: expected tinted background is missing because Tailwind never generated the class.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**.

Notes:
- This is a “silent failure” design system bug affecting multiple surfaces (admin, auth, UI kit).

## Step 4 — Options
- [x] Option A: replace all `brand-porcelain` usages with an existing semantic token.
- [x] Option B: define `brand.porcelain` in Tailwind so existing classes start working.
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option B**. Lowest blast radius and fixes the silent styling failure immediately.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Add `brand.porcelain` to `tailwind.config.js` using an RGB-var pattern so opacity utilities (`/60`) work.

Acceptance criteria:
- `bg-brand-porcelain` generates CSS and applies a warm off-white background.
- `hover:bg-brand-porcelain/…` and `ring-offset-brand-porcelain` work as expected.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- Added `brand.porcelain` to Tailwind config.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `tailwind.config.js`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: `brand-porcelain` is now a real Tailwind color token, so all existing utilities using it render correctly (backgrounds, hover states, ring offsets).
