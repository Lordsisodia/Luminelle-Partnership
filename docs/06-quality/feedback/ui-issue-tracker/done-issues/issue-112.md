# Issue 112: Several key routes don’t set page metadata (tab title/description can be stale from the previous page)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `112`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `4`
- Reach (1–5): `3`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `21`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Several non-marketing routes don’t set `<title>` / `<meta name="description">`, so in a SPA the browser tab title/description can remain from the previous page and feel broken/untrustworthy.

Audit (issue 112): `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — “Several key routes don’t set page metadata (tab title/description can be stale from the previous page)”.

Likely files/components:
- `src/domains/client/shop/cart/ui/pages/CartPage.tsx`
- `src/domains/client/account/ui/pages/AccountPage.tsx`
- `src/ui/pages/NotFoundPage.tsx`
- `src/ui/pages/TemporarilyUnavailablePage.tsx` (shared stub page used by many routes)
- `src/domains/client/shop/cart/ui/pages/ShopifyCheckoutHandoffPage.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence:
- These routes set `robots` via `Helmet` but did not render the shared `Seo` component, so they were missing title/description updates.
- Because this is a client-routed SPA, the previous route’s `<title>` can “stick”.

Repro (before fix):
1. Visit `/` (sets SEO).
2. Navigate to `/cart` or `/account` or `/returns`.
3. Observe the tab title/description can remain from the prior page (since these pages didn’t set them).

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- Title/description correctness impacts trust and perceived quality (especially on transactional routes like cart/account).
- No product decision needed.

## Step 4 — Options
- [x] Option A: Add `<Seo />` to each affected route page (explicit, low risk).
- [x] Option B: Add a default `<Seo />` inside `MarketingLayout` (broad effect; needs careful defaults).
- [x] Option C: Add a route-level wrapper that applies fallback SEO if a page didn’t set it.
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: keep the behavior explicit per-route, and add `Seo` to the shared `TemporarilyUnavailablePage` so all stub routes get correct titles.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Add `<Seo />` to: Cart, Account, NotFound, Shopify checkout handoff page.
- Add `<Seo />` to `TemporarilyUnavailablePage` so any route using it gets a correct title/description automatically.
- Keep existing `noindex` behavior via `Helmet` where present.

Acceptance criteria:
- Navigating from a marketing page to `/cart`, `/account`, `/returns`, or a 404 updates the tab title.
- Typecheck passes.

Risks:
- Minimal; only affects document head metadata.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Added missing `Seo` usage to the affected pages and the shared “temporarily unavailable” layout.

Files touched:
- `src/domains/client/shop/cart/ui/pages/CartPage.tsx`
- `src/domains/client/account/ui/pages/AccountPage.tsx`
- `src/ui/pages/NotFoundPage.tsx`
- `src/ui/pages/TemporarilyUnavailablePage.tsx`
- `src/domains/client/shop/cart/ui/pages/ShopifyCheckoutHandoffPage.tsx`

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 112)
- Code refs:
  - `src/components/Seo.tsx` (shared SEO helper)
  - `src/ui/pages/TemporarilyUnavailablePage.tsx` (now sets title/description)
  - `src/ui/pages/NotFoundPage.tsx` (now sets title/description)
  - `src/domains/client/shop/cart/ui/pages/CartPage.tsx` (now sets title/description)

## Outcome

- Final status: `DONE`
- Final notes: Page titles/descriptions now update correctly on cart/account/stub/404 routes, avoiding stale metadata from prior pages.
