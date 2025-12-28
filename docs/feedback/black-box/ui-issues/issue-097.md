# Issue 097: PDP structured data hard-codes review rating/count (can contradict what the UI displays)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `97`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
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

The PDP’s JSON‑LD `aggregateRating` was hard-coded to a single rating/count, so structured data could contradict the UI and the underlying product config.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx` used:
  - `ratingValue: '4.8'`
  - `reviewCount: '100'`
  for every product, regardless of the UI’s computed values.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- Structured data is a trust surface and can impact rich results.
- Keeping UI and JSON‑LD consistent avoids “feels fake” drift.

## Step 4 — Options
- [x] Option A: Populate JSON‑LD from the same rating/count values the UI uses (or omit when unknown).
- [x] Option B: Remove `aggregateRating` entirely until there’s a real reviews provider.
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**, with a safety fallback to omit the field if we can’t parse a numeric count.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Add a small parser for `ratingCountLabel` (supports `100+`, `1.2k`, commas).
- Compute `aggregateRating` from `ratingValue` + parsed count and inject into `productJsonLd`.

Acceptance criteria:
- Product JSON‑LD reflects the same rating/count displayed in the UI (or omits `aggregateRating` if count can’t be parsed).

Risks:
- If copy changes to a non-parseable count format, we’ll omit `aggregateRating` (safe fallback).

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

- Audit: `docs/reviews/app-ui-review-2025-12-26.md` (issue 97)
- Code refs:
  - `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx` (aggregateRating now derived from UI values)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Removed fabricated aggregate rating/count and replaced it with computed, consistent JSON‑LD (or omission when unknown).
