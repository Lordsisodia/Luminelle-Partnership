# Issue 093: Search results show hard-coded prices that don’t match actual product pricing

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `93`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

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

Search results displayed hard-coded prices that didn’t match the actual product pricing shown on PDPs, which undermines trust and feels “fake”.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- `src/domains/client/shop/products/ui/pages/SearchResultsPage.tsx` used a hard-coded `CATALOG` with arbitrary prices (e.g. `£24.00`) that didn’t match config/PDP pricing.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- Price mismatches are conversion-critical trust failures (“is this bait-and-switch?”).
- We can fix by reusing the same price source-of-truth as the PDP config.

## Step 4 — Options
- [x] Option A: Drive search prices from `productConfigs.defaultPrice`.
- [x] Option B: Fetch live Shopify prices (higher effort + network dependency).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A** for consistency and reliability (and it aligns with the existing “config first” product model).

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Replace the hard-coded `CATALOG` array with a derived list from `productConfigs` (includes default titles/prices).

Acceptance criteria:
- Search results prices match the product config/PDP defaults.

Risks:
- If a product’s “real” price is only known from Shopify and differs from config, this still won’t be perfect — but it removes the obviously wrong hard-coded placeholder pricing.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/reviews/app-ui-review-2025-12-26.md` (issue 93)
- Code refs:
  - `src/domains/client/shop/products/ui/pages/SearchResultsPage.tsx` (prices now come from product configs)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Search results prices are now derived from product configs (no more placeholder mismatch).
