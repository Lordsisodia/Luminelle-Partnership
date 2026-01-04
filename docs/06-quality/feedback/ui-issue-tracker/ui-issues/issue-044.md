# Issue 044: Hero “carousel” is effectively disabled even if gallery images are provided

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `44`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `NOT_AN_ISSUE`
- Area: `Client`
- Impact (1–5): `2`
- Reach (1–5): `4`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `13`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The audit claims the shop hero is configured like a slideshow, but code forces it to a single slide (so the “carousel” never actually rotates even if multiple gallery images exist).

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **NO** (on `dev` as of `2025-12-28`).

Audit claim (from `docs/06-quality/reviews/app-ui-review-2025-12-26.md`):
- `HeroShop` slices `config.gallery` to the first image (`slice(0, 1)`), disabling the carousel even if more slides are provided.

Current code evidence:
- `src/domains/client/marketing/ui/sections/shop/hero-shop/HeroShop.tsx`
  - Uses `config.gallery.slice(0, 5)` (not `slice(0, 1)`), and auto-advances when `slides.length > 1`.

Repro:
1. Navigate to a marketing/shop page that mounts `HeroShop` with `config.gallery` containing multiple slides.
2. On mobile breakpoints, observe auto-advance (every ~5s) when multiple slides are present.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **NOT_AN_ISSUE** (audit finding no longer matches current code).

Notes:
- Desktop intentionally renders a single “hero background” image; the slideshow behavior is mobile-only.
- If we want a true desktop slideshow and/or user controls, that’s a **new design decision** and should be tracked as a new issue (different acceptance criteria than the audit’s “slice(0, 1)” claim).

## Step 4 — Options
- [x] Option A: (describe)
- [x] Option B: (describe)
- [x] Pick one + rationale (fit with domain architecture).

Not applicable (issue is not present).

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Not applicable (issue is not present).

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

No code changes required.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/domains/client/marketing/ui/sections/shop/hero-shop/HeroShop.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `NOT_AN_ISSUE`
- Final notes: The audit was accurate for an earlier implementation, but on `dev` the hero uses up to 5 slides and auto-advances when multiple slides exist. If desktop carousel/controls are desired, track separately as a product/design decision.
