# Issue 077: `LazyVisible` assumes `IntersectionObserver` exists (can throw in some browsers/webviews)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `77`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
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

`LazyVisible` used `IntersectionObserver` without feature detection, so in environments where it’s missing/disabled it can throw and leave important sections stuck in “Loading…” placeholders.

Audit (issue 77): `docs/reviews/app-ui-review-2025-12-26.md` — “`LazyVisible` assumes `IntersectionObserver` exists”.

Likely file:
- `src/ui/components/LazyVisible.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence:
- `LazyVisible` directly instantiates `new IntersectionObserver(...)` with no `typeof IntersectionObserver` guard.

Repro (conceptual):
1. Use an environment without IntersectionObserver (older webviews, restricted browsers, or IO disabled).
2. Navigate to a page that renders `LazyVisible` (e.g. TikTok embeds).
3. Observe a runtime error or permanently stuck placeholders.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- This component gates “content appears” behavior; failures create blank sections and feel like the site is broken.
- No product decision needed.

## Step 4 — Options
- [x] Option A: Add a safe fallback: if `IntersectionObserver` is missing (or throws), immediately render children.
- [ ] Option B: Add an IntersectionObserver polyfill (more weight + complexity).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: minimal code, zero dependencies, graceful degradation.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- If `IntersectionObserver` is undefined, call `setVisible(true)` and skip observer wiring.
- Wrap observer construction in `try/catch`; if it throws, fall back to `setVisible(true)`.

Acceptance criteria:
- No runtime error when `IntersectionObserver` is missing.
- Sections using `LazyVisible` render their content instead of placeholders.
- Typecheck passes.

Risks:
- In unsupported environments, content will render immediately (acceptable; it’s a fallback).

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Added feature detection and a try/catch fallback so `LazyVisible` never hard-crashes when IO is unavailable.

File touched:
- `src/ui/components/LazyVisible.tsx`

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/reviews/app-ui-review-2025-12-26.md` (issue 77)
- Code refs:
  - `src/ui/components/LazyVisible.tsx` (IO feature detection + fallback)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Pages no longer risk blank/stuck sections in browsers without IntersectionObserver; content renders immediately as a safe fallback.
