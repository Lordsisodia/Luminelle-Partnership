# Issue 105: Brand story page has no SEO metadata (browser tab title/share preview can be stale or wrong)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `105`
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

The `/brand` page didn’t set page-specific metadata (title/description/share image), so browser tabs and share previews could be stale or misleading.

Audit (issue 105): `docs/reviews/app-ui-review-2025-12-26.md` — “Brand story page has no SEO metadata”.

Likely file:
- `src/domains/client/marketing/brand/ui/pages/BrandStoryPage.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- `BrandStoryPage` rendered `MarketingLayout` + content, but never rendered `<Seo />`.
- The page also nested a `<main>` inside `MarketingLayout`’s own `<main>`, which is incorrect landmark semantics (related to issue #010).

Repro (before fix):
1. Visit `/brand`.
2. Inspect document `<head>`: no page-specific `<title>`/OpenGraph tags are set by the page.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- `/brand` is a high-reach marketing route; SEO metadata matters for share previews and perceived polish.
- No product decision required.

## Step 4 — Options
- [x] Option A: Add `<Seo />` to the page using existing hero copy/image and correct the nested `<main>`.
- [ ] Option B: Add a full CMS-backed SEO model (bigger scope).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: quick win, consistent with how other marketing pages set metadata.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Add `<Seo />` at the top of `BrandStoryPage`:
  - `title="Brand story"`
  - `description=hero.description`
  - `image=cdnUrl(hero.image)`
  - `url="/brand"`
- Replace the inner `<main>` wrapper with a `<div>` to avoid nested landmarks (since `MarketingLayout` owns the page `<main>`).

Acceptance criteria:
- `/brand` sets title + description + OpenGraph/Twitter image.
- No nested `<main>` landmark in DOM.
- Typecheck passes.

Risks:
- Low risk; only adds metadata and adjusts wrapper element.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Added `Seo` + `cdnUrl` integration for consistent image rewriting.
- Updated markup to avoid nested `<main>`.

Files touched:
- `src/domains/client/marketing/brand/ui/pages/BrandStoryPage.tsx`

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/reviews/app-ui-review-2025-12-26.md` (issue 105)
- Code refs:
  - `src/domains/client/marketing/brand/ui/pages/BrandStoryPage.tsx` (adds `<Seo />`, fixes nested `<main>`)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: `/brand` now sets consistent SEO metadata and avoids invalid landmark nesting.
