# Issue 100: Blog promotes a “travel variant” URL but PDP ignores variant query params (misleading deep link)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `100`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Blog`
- Impact (1–5): `4`
- Reach (1–5): `4`
- Effort (1–5): `2`
- Confidence (1–3): `2`
- Priority: `30`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

A blog product card linked to a “variant” URL (`?variant=travel`) but the PDP ignores query params, so the deep link implied functionality that doesn’t exist.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Repro (before fix):
1. Open the blog post “Welcome to the Lumelle Journal”.
2. Click the product card “Travel-ready cap (compact case)” which links to `/product/lumelle-shower-cap?variant=travel`.
3. Land on the normal PDP with no variant selection behavior.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- High-intent deep links that “don’t do what they say” are a trust killer.
- Implementing real variants is a larger product/data decision; removing the claim is the lowest-risk truthful fix.

## Step 4 — Options
- [x] Option A: Remove the variant query param and link to the real PDP.
- [x] Option B: Implement variant support (read query param, reflect in UI/pricing/cart).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A** to keep the link truthful and working without introducing a partial/incomplete variant system.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Update the blog post product card URL to remove `?variant=travel`.

Acceptance criteria:
- The blog product card links to a real PDP route and doesn’t imply variant behavior.

Risks:
- None; the PDP already supports the base product URL.

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

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 100)
- Code refs:
  - `src/content/blog/posts/lumelle-journal-launch.ts` (removed `?variant=travel`)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Blog no longer links to a non-functional variant URL.
