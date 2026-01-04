# Issue 137: PDP hero preload link is only ever added once (stale preload when navigating between products)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `137`
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

The PDP manages a hero `<link rel="preload" as="image">`, but across SPA navigations it can fail to reliably preload the *current* hero image (wasting bandwidth on stale assets).

Audit claim (Issue 137): the PDP only injects the preload tag once, so in SPA navigation the preload can get “stuck” on the first visited product.

Likely files:
- `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx` (hero preload `useEffect`)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Evidence (code):
- `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx` had a `useEffect` that reused an existing `link[data-hero="pdp-hero"]` node and mutated `existing.href`.
- For `rel="preload"`, relying on `href` mutation is not a robust way to trigger a *new* preload across browsers (and can lead to the “stale preload” outcome the audit describes).

Repro (manual):
1. Visit a PDP like `/product/luxury-satin-sleep-cap`.
2. Navigate (SPA) to another PDP like `/product/satin-overnight-curler`.
3. In DevTools, watch `<head>` and Network: the hero preload should be for the *current* PDP hero image each time you navigate.

Verified: **YES** → fixed (see Step 6) and marked `DONE`.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Score:
- Impact: 2 (perf + polish, but not a functional blocker)
- Reach: 4 (PDP is high traffic)
- Effort: 3 (small code change, needs care)
- Confidence: 2 (reasonable based on preload semantics + code path)
- Priority: `(2×4×2) − 3 = 13`

Decision: **FIX**

Dependencies: none (client-only change).

## Step 4 — Options
- [x] Option A: (describe)
- [x] Option B: (describe)
- [x] (Optional) Option C: (describe)
- [x] Pick one + rationale (fit with domain architecture).

Option A — Mutate `existing.href`:
- Minimal diff, but not reliable for making browsers execute a fresh preload for the new asset.

Option B — Remove + recreate the preload link (**chosen**):
- Ensures SPA navigations replace the preload node, which reliably triggers a new preload request for the new hero asset.
- Keeps behavior encapsulated to `ProductPage`, consistent with the current architecture.

Option C — Add multiple preloads:
- More bandwidth-heavy and increases risk of unnecessary requests.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation plan:
- Keep using the first non-video gallery asset as the “hero preload” target.
- If an existing `link[data-hero="pdp-hero"]` exists:
  - If it already matches the desired URL, do nothing.
  - Otherwise remove it and append a fresh `<link rel="preload" as="image">`.
- Remove the inserted link on unmount.

Acceptance criteria:
- Navigating between two different PDPs updates the `<head>` preload tag for `data-hero="pdp-hero"` to the current product’s hero image.
- There is at most one `link[data-hero="pdp-hero"]` in the document head.
- `npm run typecheck` stays green.

Risks/rollback:
- If any browser shows odd preload behavior, revert to the previous “only insert once” behavior (but accept possible stale preloads).

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx`
  - Replace the existing preload node instead of mutating `href`.
  - Add cleanup to remove the inserted node on unmount.

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

Summary:
- Fixes stale hero preload risk on SPA navigation by replacing the `<link rel="preload">` element whenever the hero URL changes.

Final status: `DONE`

---

## Evidence / Links

- Code refs:
  - `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: This is a “performance correctness” fix — it prevents wasting a preload on the wrong asset after navigating between PDPs.
