# Issue 047: Promo text rotation does not respect “prefers-reduced-motion”

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `47`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `3`
- Reach (1–5): `3`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `15`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The header promo message auto-rotates on a timer, but it doesn’t respect `prefers-reduced-motion`, which can be distracting or uncomfortable for motion-sensitive users.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES** (before fix).

Evidence:
- `src/layouts/MarketingLayout.tsx` rotates `promoMessages` via `setInterval` every 4 seconds unconditionally.

Repro:
1. Enable “Reduce motion” at OS/browser level.
2. Load any page that uses `MarketingLayout` (e.g. `/`).
3. Observe the promo message still changes automatically.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**.

Notes:
- Straightforward accessibility improvement; no product decisions or backend work required.

## Step 4 — Options
- [x] Option A: remove promo rotation entirely.
- [x] Option B: keep rotation but disable it when `prefers-reduced-motion: reduce` is enabled.
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option B**. Keeps the existing UX for most users while respecting reduced-motion preferences.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Guard the promo `setInterval` behind a `matchMedia('(prefers-reduced-motion: reduce)')` check.

Acceptance criteria:
- With reduced motion enabled: promo message does not auto-rotate.
- With reduced motion disabled: promo message still rotates every ~4s.

Risks/rollback:
- Low risk; change is localized to `MarketingLayout` and does not alter content.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- Added a reduced-motion check to skip starting the rotation interval when `prefers-reduced-motion` is enabled.

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/layouts/MarketingLayout.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Reduced-motion users no longer get timed promo text changes; the header remains stable while still showing the first promo message.
