# Issue 054: Unknown product handles fall back to the shower cap instead of a 404 (wrong content on the wrong URL)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `54`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `3`
- Reach (1–5): `4`
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

When a user visits an invalid `/product/:handle`, the app silently shows the shower cap PDP instead of a “product not found” state, which is misleading and breaks URL trust.

Audit (issue 54): `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — “Unknown product handles fall back to the shower cap instead of a 404”.

Likely files:
- `src/domains/client/shop/products/data/product-loaders.ts` (`getConfig` fallback)
- `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx` (route handling)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence:
- `getConfig(handle)` falls back to `productConfigs['shower-cap']` for unknown handles, so any invalid handle is treated as shower cap content.

Repro (before fix):
1. Visit an invalid PDP URL, e.g. `/product/this-does-not-exist`.
2. Observe the shower cap product page renders instead of a 404 / “product not found”.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- Wrong product content on an arbitrary URL is a trust + SEO + sharing footgun.
- No product decision needed; we can safely show a 404 for unknown handles.

## Step 4 — Options
- [x] Option A: Guard in the PDP route component and render a proper 404 when the handle isn’t recognized.
- [x] Option B: Change `getConfig` to return `null` for unknown handles and update all call sites to handle nullability.
- [x] Option C: Redirect unknown handles to `/` (fast but hides the error).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: smallest change with the least blast radius; keeps existing config fallback behavior for internal usage while ensuring URLs don’t show the wrong product.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Determine a set of “known handles” (union of `productConfigs` keys + `config.handle` values).
- In the PDP route (`ProductPage`), if the route handle isn’t in that set, render `NotFoundPage`.
- Keep existing canonical tags on valid PDPs unchanged.

Acceptance criteria:
- Visiting `/product/<invalid>` renders the 404 page (not a product page).
- Visiting valid handles like `/product/lumelle-shower-cap`, `/product/shower-cap`, `/product/satin-overnight-curler` still renders a PDP.
- Typecheck passes.

Risks:
- If a real/legacy product handle isn’t included in the known set, it would start returning 404; keep the known-handle list derived from config to reduce drift.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Change:
- Added a route-level guard so unknown product handles render a 404 instead of the shower-cap PDP.

File touched:
- `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx`

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 54)
- Code refs:
  - `src/domains/client/shop/products/data/product-loaders.ts` (`getConfig` fallback behavior)
  - `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx` (404 guard)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Invalid PDP URLs now correctly show a “not found” page instead of silently substituting a different product.
