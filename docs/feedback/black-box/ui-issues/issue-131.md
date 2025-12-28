# Issue 131: Social proof mismatch: homepage teaser shows 4.9★ / 1240 reviews, but the PDP shows 4.8 / 100+

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `131`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

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

Homepage/landing teaser social proof (rating + review count) didn’t match the PDP’s social proof for the same product, creating a credibility-damaging inconsistency.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES** (before fix).

Evidence (before fix):
- Landing teaser (shower cap) used higher values:
  - `src/content/home.config.ts` (`pdpTeaserCap.rating = 4.9`, `pdpTeaserCap.reviews = 1240`)
- PDP values were different:
  - `src/domains/client/shop/products/data/product-config.ts` (`ratingValueOverride = 4.8`, `ratingCountLabelOverride = '100+'`)

Repro:
1. Visit the shop landing page and note the shower-cap teaser rating/review count.
2. Open the shower-cap PDP and note the rating/review count displayed in the hero/trust microcopy.
3. Values don’t match, which reads as “fake social proof.”

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**.

Notes:
- Social proof is credibility-sensitive; mismatches are obvious and trust-eroding.
- Low-risk fix: align the teaser to the same canonical numbers the PDP uses today.

## Step 4 — Options
- [x] Option A: Update the PDP to match the marketing teaser (risk: could be inaccurate if teaser is inflated/outdated).
- [x] Option B: Update the marketing teaser to match the PDP’s configured values (preferred).
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option B**. The PDP is the conversion surface and should be treated as the more canonical source for product truth.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Adjust the shower-cap teaser rating/review-count values in `home.config` to match `product-config`.
- Run `npm run typecheck`.

Acceptance criteria:
- Landing teaser and PDP show the same rating and the same order-of-magnitude review count label.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- `src/content/home.config.ts`: updated `pdpTeaserCap` to match PDP config values:
  - `rating: 4.8`
  - `reviews: 100` (so UI renders “100+ reviews”)

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/content/home.config.ts`
- `src/domains/client/shop/products/data/product-config.ts`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Social proof shown in the shower-cap teaser now matches the PDP, reducing trust-killing inconsistencies across core conversion surfaces.
