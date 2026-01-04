# Issue 007: Search results page is “fake” and contains dead links (`#`)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `7`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `4`
- Reach (1–5): `4`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `29`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The `/search` page was driven by a placeholder hard-coded catalog (including dead `href: '#'` items), which makes the storefront feel unfinished and untrustworthy.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- `src/domains/client/shop/products/ui/pages/SearchResultsPage.tsx` defined a local `CATALOG` array with:
  - Placeholder products
  - Dead links (`href: '#'`)

Repro:
1. Visit `/search` with any query.
2. See items that can’t be opened (dead links) and/or “catalogue” entries that aren’t real products.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- Search is a “recovery” surface: users use it when they’re confused. Fake results worsen bounce.
- This is solvable without Shopify search by reusing the existing product source of truth (product configs).

## Step 4 — Options
- [x] Option A: Build search results from `productConfigs` and only render products that exist.
- [x] Option B: Keep placeholders but clearly label as “Coming soon” and remove fake links/prices.
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A** to remove fake/dead content and keep search consistent with the PDP config system.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Replace the placeholder catalog with a list derived from `productConfigs`.
- Ensure every search result has a real PDP route (no `#` links).

Acceptance criteria:
- `/search` only shows items that navigate to real PDP routes.
- No dead links (`#`) remain in search results.

Risks:
- Search remains “basic” until a real backend search exists, but it’s no longer misleading.

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

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 7)
- Code refs:
  - `src/domains/client/shop/products/ui/pages/SearchResultsPage.tsx` (search catalog now derived from product configs)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Search results no longer include dead links or placeholder catalog entries.
