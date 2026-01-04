# Issue 111: `noindex` robots meta can “stick” across SPA navigation (you can accidentally noindex the whole site)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `111`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Platform`
- Impact (1–5): `4`
- Reach (1–5): `5`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `37`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

In a client-side SPA, routes that imperatively mutate `<meta name="robots">` to `noindex` can leave the rest of the session accidentally `noindex` unless it’s explicitly reset on navigation/unmount.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Repro (before fix):
1. Visit `/cart` (sets robots meta to `noindex`).
2. Navigate client-side to `/` or `/product/:handle`.
3. `<meta name="robots">` remains `noindex` until a hard refresh (poisoned session).

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- This is an SEO foot-gun: one visit to a `noindex` route can silently deindex other pages.
- No product decision required; it’s purely meta-management correctness.

## Step 4 — Options
- [x] Option A: Route-scoped robots meta via `react-helmet-async` with a global default.
- [x] Option B: Keep imperative helpers but return a cleanup that restores the previous robots value.
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A** because Helmet already exists in the app and naturally resets tags on unmount/navigation.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Add a global default `<meta name="robots" content="index,follow" />` at app root.
- Replace `setNoIndex*()` calls with per-route `<Helmet><meta name="robots" ... /></Helmet>`.

Acceptance criteria:
- Navigating from `/cart` (noindex) → `/` results in `robots=index,follow` (no longer sticky).
- Admin and auth callback remain `noindex,nofollow` while mounted.

Risks:
- If any route still imperatively mutates the robots tag, it can reintroduce stickiness.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 111)
- Code refs:
  - `src/App.tsx` (default robots meta)
  - `src/domains/client/shop/cart/ui/pages/CartPage.tsx` (noindex via Helmet)
  - `src/ui/pages/NotFoundPage.tsx` (noindex via Helmet)
  - `src/ui/pages/TemporarilyUnavailablePage.tsx` (noindex via Helmet)
  - `src/domains/client/shop/cart/ui/pages/ShopifyCheckoutHandoffPage.tsx` (noindex via Helmet)
  - `src/domains/client/account/ui/pages/AccountPage.tsx` (noindex via Helmet)
  - `src/domains/platform/auth/ui/pages/SSOCallbackPage.tsx` (noindex,nofollow via Helmet)
  - `src/domains/admin/shared/ui/layouts/AdminShell.tsx` (noindex,nofollow via Helmet)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Robots meta is now route-scoped and safely resets on SPA navigation.
