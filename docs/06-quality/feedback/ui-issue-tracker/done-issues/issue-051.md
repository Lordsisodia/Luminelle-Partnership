# Issue 051: FAQ “search” logic exists, but there is no search input (copy refers to missing UI)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `51`
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

The FAQ section contains filtering/search logic and copy that implies searching is possible, but there is no UI input to actually enter a search query.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES** (before fix).

Evidence:
- `FaqSectionShop` stored `query` in state but did not expose any `setQuery` or search input UI.
- The section also included “No answers matched that search” copy even though users couldn’t search.

Repro:
1. Navigate to any page rendering the FAQ section (e.g. PDP).
2. There is no search input despite search-related messaging/logic in code.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**.

Notes:
- Eliminates “missing UI” confusion and makes the existing filtering logic usable.
- No backend dependencies.

## Step 4 — Options
- [x] Option A: remove search logic and search-related copy entirely.
- [x] Option B: add a simple search input and wire it to existing filtering logic (with a clear button).
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option B**. The code already had filtering logic; adding the missing UI completes the feature with minimal changes.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Add a search input (type="search") to `FaqSectionShop`.
- Add a clear button when a query is present.
- Fix the “no results” logic so it only appears when a query exists.

Acceptance criteria:
- Users can type a search query and see FAQs filter down.
- If no results match, the UI shows the “no answers matched” message (and does not also show all FAQs).
- Users can clear the query to reset the list.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- Added a search bar + clear button + result count to `FaqSectionShop`.
- Corrected the empty-results logic so it behaves sensibly once search is enabled.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/domains/client/shop/products/ui/sections/faq-section-shop/FaqSectionShop.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: FAQ search is now a real, usable UI feature (not just dead logic/copy), improving discoverability of answers and reducing friction.
