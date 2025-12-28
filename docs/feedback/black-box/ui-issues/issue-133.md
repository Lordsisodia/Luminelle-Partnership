# Issue 133: Above-the-fold hero images are lazy-loaded (blank hero risk + worse perceived quality)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `133`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
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

Restatement: Above-the-fold hero images should not be lazy-loaded; they should load eagerly (and be prioritized) so the first impression doesn’t “pop in” late.

Audit claim (Issue 133): `loading="lazy"` is used on clearly above-the-fold hero images in Welcome and Brand pages.

Likely sources:
- `src/domains/client/marketing/ui/pages/WelcomePage.tsx`
- `src/domains/client/marketing/brand/ui/pages/BrandStoryPage.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Evidence:
- `WelcomePage` hero `<img>` used `loading="lazy"` even though it’s rendered in the hero section.
- `BrandStoryPage` hero `<img>` used `loading="lazy"` even though it’s rendered in the hero section.

Repro:
1) Cold-load `/welcome` or `/brand` on a slower connection.
2) Observe that the hero image can load late / “pop in” after surrounding text, making the UI feel janky.

Verified: **YES**

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

- Decision: **FIX**
- Dependencies: none

## Step 4 — Options
- [x] Option A: Switch hero images to `loading="eager"` and add `fetchPriority="high"`.
- [x] Option B: Keep lazy loading and accept late pop-in.
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: these are first-impression conversion pages; we want the hero media to load immediately.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Update Welcome hero image to `loading="eager"` and `fetchPriority="high"`.
- Update Brand story hero image to `loading="eager"` and `fetchPriority="high"`.
- Run `npm run typecheck`.
- Update tracker/worklog.

Acceptance criteria:
- `/welcome` and `/brand` hero images are eager-loaded and prioritized.
- No TypeScript errors introduced.

Risks / rollback:
- Low; rollback is reverting `loading`/`fetchPriority` changes. (Worst case: higher initial bandwidth usage.)

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- `src/domains/client/marketing/ui/pages/WelcomePage.tsx`: hero image now uses `loading="eager"` + `fetchPriority="high"`.
- `src/domains/client/marketing/brand/ui/pages/BrandStoryPage.tsx`: hero image now uses `loading="eager"` + `fetchPriority="high"`.

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/domains/client/marketing/ui/pages/WelcomePage.tsx`
- `src/domains/client/marketing/brand/ui/pages/BrandStoryPage.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Above-the-fold hero images are now eager-loaded and prioritized to reduce “pop in” and improve first impression.
