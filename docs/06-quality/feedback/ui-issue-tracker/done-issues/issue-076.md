# Issue 076: Multiple production-facing UI files disable TypeScript checks (`@ts-nocheck`) (higher risk of shipping broken UI)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `76`
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

Several UI files include `@ts-nocheck`, which suppresses TypeScript errors entirely and increases the risk of shipping broken UI (especially when refactoring domains/components).

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES** (before fix).

Evidence (before fix — occurrences of `@ts-nocheck`):
- `src/domains/client/shop/products/ui/sections/featured-tik-tok/FeaturedTikTok.tsx`
- `src/domains/client/shop/products/ui/sections/reviews-auto-carousel/ReviewsAutoCarousel.tsx`
- `src/domains/client/marketing/ui/sections/shop/final-cta-section/FinalCtaSection.tsx`
- `src/domains/client/marketing/ui/sections/shop/product-spotlight-section/ProductSpotlightSection.tsx`
- `src/domains/client/rewards/ui/pages/RewardsPage.tsx`
- `src/archive/products/ui/rating-snippet/RatingSnippet.tsx`
- `src/archive/products/ui/highlights-section/HighlightsSection.tsx`

Repro (risk-based):
1. Make a change that would introduce a TS error in one of these files.
2. The app still typechecks because `@ts-nocheck` suppresses all type errors in that file.
3. Runtime bugs can ship (especially prop mismatch / missing fields / wrong assumptions).

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**.

Notes:
- This is a preventative “quality guardrail” fix (reduces future regressions).
- No product decision or backend dependency.

## Step 4 — Options
- [x] Option A: Leave `@ts-nocheck` in place and rely on manual review.
- [x] Option B: Remove `@ts-nocheck` and fix/replace the specific offending patterns (preferred).
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option B**. It restores type-safety without changing user-facing behavior, and forces unsafe patterns to be handled explicitly.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Remove `@ts-nocheck` from each file.
- Fix any TS errors that are revealed:
  - Prefer removing unsupported attributes/props rather than suppressing.
  - Keep behavior the same where possible.
- Run `npm run typecheck`.

Acceptance criteria:
- `rg "@ts-nocheck" src` returns no matches.
- `npm run typecheck` passes.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- Removed `@ts-nocheck` directives from all identified files.
- Removed the unsupported `inert={...}` attribute from the Product Spotlight slide wrapper (inactive slides are still handled via `aria-hidden` + link `tabIndex`).
- Cleaned up `RewardsPage` to remove the stray, ineffective `// @ts-nocheck` comment.

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/domains/client/shop/products/ui/sections/featured-tik-tok/FeaturedTikTok.tsx`
- `src/domains/client/shop/products/ui/sections/reviews-auto-carousel/ReviewsAutoCarousel.tsx`
- `src/domains/client/marketing/ui/sections/shop/final-cta-section/FinalCtaSection.tsx`
- `src/domains/client/marketing/ui/sections/shop/product-spotlight-section/ProductSpotlightSection.tsx`
- `src/domains/client/rewards/ui/pages/RewardsPage.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Removed `@ts-nocheck` across client-facing UI so type safety is restored and future refactors are less likely to silently ship runtime UI bugs.
