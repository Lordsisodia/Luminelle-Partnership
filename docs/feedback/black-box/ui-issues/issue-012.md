# Issue 012: Drawer uses fake “people checking out now” urgency

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `12`
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
  - The cart drawer shows a fabricated “people are checking out now” urgency badge, which is misleading and undermines trust.
- [x] Link to the audit issue and copy the key claim.
  - Audit issue `12` (`docs/reviews/app-ui-review-2025-12-26.md`): the drawer uses a random “people checking out now” number as social proof/urgency.
- [x] Identify likely files/components.
  - `src/ui/providers/DrawerProvider.tsx` (drawer cart footer badge)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
  - `src/ui/providers/DrawerProvider.tsx` generated a random `viewersNow` number and rendered it as “{N} people are checking out now”.
- [x] Write repro steps (route + actions).
  1. Open the drawer and switch to the cart tab.
  2. Observe the badge above the totals shows a “people checking out now” count.
- [x] Mark `Verified: YES/NO` and set status accordingly.
  - Verified: **YES**

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
  - Impact `4`, Reach `5`, Effort `3`, Confidence `2` → Priority = `(4×5×2)−3 = 37`
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
  - Decision: `FIX`
- [x] Note dependencies (data, product decision, auth, etc.).
  - No dependencies required for a “remove fake metric” fix. Real-time shopper counts would require audited analytics and product/legal sign-off.

## Step 4 — Options
- [x] Option A: Remove the badge entirely.
  - Pros: Eliminates the dark pattern.
  - Cons: Loses a high-salience “status” strip that anchors the cart footer.
- [x] Option B: Replace the fake badge with a truthful, computed message (e.g., free-shipping progress).
  - Pros: Keeps the UI pattern but makes it honest and useful.
  - Cons: Requires ensuring the shipping threshold copy is consistent elsewhere (tracked separately).
- [x] Option C: Replace with a real metric sourced from analytics.
  - Pros: Could be compelling if real.
  - Cons: Requires instrumentation, privacy review, and a definition of “checking out now”.
- [x] Pick one + rationale (fit with domain architecture).
  - Selected: **Option B** — reuses existing free-shipping calculations already present in the drawer, avoids false claims.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
  - Remove the random `viewersNow` generator.
  - Render a truthful badge: “£X to free shipping” (or “Free shipping unlocked”) using `remainingForFreeShip`.
- [x] Write acceptance criteria (testable).
  - The drawer no longer displays “people are checking out now”.
  - The badge shows a correct computed message derived from cart subtotal.
  - Typecheck passes.
- [x] Risks/rollback notes.
  - Low risk (copy/UI). Rollback by reverting the `DrawerProvider` change.

## Step 6 — Execute + Validate
- [x] Implement changes.
  - Updated `src/ui/providers/DrawerProvider.tsx` to remove `viewersNow` and replace the badge text with free-shipping progress.
- [x] Validate (tests or best-effort manual checks).
  - Ran `npm run typecheck` (passed).
  - Manual QA checklist:
    - With an empty cart, open drawer → badge reads “£19.99 to free shipping” (or equivalent based on subtotal calculation).
    - Add items → badge value decreases; once above threshold, badge reads “Free shipping unlocked”.
- [x] Record results and any regressions found.
  - No regressions observed.

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
  - Marked issue `12` as `DONE`.
- [x] Summarize what changed + where.
  - Removed fake checkout urgency from the drawer and replaced it with truthful free-shipping progress messaging.
- [x] Mark DONE/DEFERRED/etc.
  - Final status: `DONE`

---

## Evidence / Links

- Code refs:
  - `src/ui/providers/DrawerProvider.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes:
  - This addresses the fake-urgency claim. It does not solve broader shipping-copy consistency across surfaces (tracked separately).
