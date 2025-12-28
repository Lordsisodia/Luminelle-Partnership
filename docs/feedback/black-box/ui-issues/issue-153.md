# Issue 153: Responsive image variants exist, but key pages still load a single full-size JPG without `srcSet`/AVIF

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `153`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `3`
- Reach (1–5): `3`
- Effort (1–5): `2`
- Confidence (1–3): `2`
- Priority: `16`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The repo ships responsive AVIF/WEBP image variants, but some pages still load the base JPG directly without `srcSet`, wasting bytes and slowing perceived load.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES** (before fix).

Evidence (before fix):
- `src/domains/client/marketing/ui/pages/WelcomePage.tsx` used:
  - `src="/images/brand-lifestyle.jpg"` directly (no `srcSet` / AVIF/WEBP).
- Responsive variants already exist in the repo:
  - `public/images/brand-lifestyle-320.{avif,webp}`
  - `public/images/brand-lifestyle-640.{avif,webp}`
  - `public/images/brand-lifestyle-960.{avif,webp}`

Repro:
1. Load `/welcome`.
2. Inspect network panel / image requests.
3. Browser downloads `brand-lifestyle.jpg` even on small viewports where smaller variants exist.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**.

Notes:
- Performance is UX; this improves LCP/bytes for mobile users.
- No backend dependencies or product decisions.

## Step 4 — Options
- [x] Option A: create a reusable responsive image component for all assets.
- [x] Option B: switch the specific offending image to a `<picture>` pattern using existing variants.
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option B** for low blast radius (quick win using existing files).

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Replace the Welcome page hero image with:
  - `AVIF srcSet` → `WEBP srcSet` → JPG fallback.
- Add `sizes` and explicit `width/height` to help browsers pick the best variant and reduce layout shift.

Acceptance criteria:
- On `/welcome`, browsers that support AVIF/WEBP request a suitable `brand-lifestyle-*.avif/.webp` instead of the full JPG.
- Fallback remains the original JPG for older browsers.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- Updated the image in `WelcomePage` to a responsive `<picture>` using existing variants.

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/domains/client/marketing/ui/pages/WelcomePage.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Welcome page now uses AVIF/WEBP responsive variants (with JPG fallback) instead of always downloading the full base JPG.
