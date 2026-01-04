# Issue 127: Homepage reviews section tells users to “visit our TikTok shop product page” but provides no link

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `127`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
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

The reviews section copy told users to “visit our TikTok shop product page” for more reviews, but didn’t provide any clickable link, creating a dead-end CTA.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES** (before fix).

Evidence:
- `src/domains/client/shop/products/ui/sections/reviews-auto-carousel/ReviewsAutoCarousel.tsx`
  - Default heading description included “To see more reviews visit our TikTok shop product page.” as plain text, with no link or CTA.

Repro:
1. Visit the shop landing page (or a PDP) where the reviews section renders.
2. Read the heading description referencing TikTok.
3. There is no clickable link to actually open TikTok.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**.

Notes:
- This is a small polish issue but high-reach (homepage/social-proof section).
- Low-risk: add a proper CTA link and make the copy not imply an action users can’t take.

## Step 4 — Options
- [x] Option A: Turn the description text into a hyperlink (requires making `description` accept ReactNode).
- [x] Option B: Keep description as plain text and add a separate CTA button via the existing `SectionHeading.actions` slot (preferred).
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option B**. `SectionHeading` already supports `actions`, so this is low blast radius and avoids changing shared types.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Remove TikTok “dead-end” wording from the description.
- Add a “See more on TikTok” button in `SectionHeading.actions` linking to `TIKTOK_URL`.
- Ensure defaults for social URLs are real profiles (not generic `tiktok.com`).
- Run `npm run typecheck`.

Acceptance criteria:
- Reviews section renders a clickable TikTok link/button.
- No “visit TikTok …” text without an actual link.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- `src/domains/client/shop/products/ui/sections/reviews-auto-carousel/ReviewsAutoCarousel.tsx`:
  - Removed the TikTok reference from the description string.
  - Added an action button “See more on TikTok →” pointing to `TIKTOK_URL`.
- `src/config/constants.ts`: updated default `TIKTOK_URL`/`INSTAGRAM_URL` to Lumelle’s real profiles.
- `src/ui/components/GlobalFooter.tsx`: switched social links to use `INSTAGRAM_URL` / `TIKTOK_URL` constants (keeps env overrides working).

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/domains/client/shop/products/ui/sections/reviews-auto-carousel/ReviewsAutoCarousel.tsx`
- `src/config/constants.ts`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Reviews section now provides an explicit TikTok link instead of a dead-end mention, improving trust/polish on a key social-proof section.
