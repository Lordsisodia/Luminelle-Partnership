# Issue 045: Drawer “Checkout” button is effectively unusable (disabled with no explanation)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `45`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `5`
- Reach (1–5): `5`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `47`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
  - The cart drawer’s primary “Checkout” CTA is disabled whenever `checkoutUrl` is missing, which makes checkout look broken (and provides no explanation).
- [x] Link to the audit issue and copy the key claim.
  - Audit issue `45` (`docs/06-quality/reviews/app-ui-review-2025-12-26.md`): the drawer checkout button is disabled when `checkoutUrl` is missing, and `checkoutUrl` can be `undefined`, so the CTA never becomes actionable.
- [x] Identify likely files/components.
  - `src/ui/providers/DrawerProvider.tsx` (drawer UI + checkout CTA)
  - `src/domains/client/shop/cart/providers/CartContext.tsx` (provides `checkoutUrl`)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
  - `src/ui/providers/DrawerProvider.tsx` disables the checkout CTA when `!checkoutUrl` and renders no explanation (pre-fix).
  - `checkoutUrl` originates from `useCart()` in `src/domains/client/shop/cart/providers/CartContext.tsx` and can be `undefined` when Shopify isn’t configured or cart sync fails.
- [x] Write repro steps (route + actions).
  1. Add any item to cart.
  2. Open the right-side drawer and switch to the cart tab.
  3. Observe the primary CTA is disabled when `checkoutUrl` is missing.
- [x] Mark `Verified: YES/NO` and set status accordingly.
  - Verified: **YES**

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
  - Impact `5`, Reach `5`, Effort `3`, Confidence `2` → Priority = `(5×5×2)−3 = 47`
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
  - Decision: `FIX`
- [x] Note dependencies (data, product decision, auth, etc.).
  - Real “checkout works end-to-end” depends on Shopify checkout URL generation + domain config, but this issue is specifically the **drawer UX** when checkout isn’t available.

## Step 4 — Options
- [x] Option A: Implement real checkout URL generation everywhere.
  - Pros: Enables real conversion.
  - Cons: Not a “UI-only” fix; depends on Shopify configuration and is a larger project.
- [x] Option B: Keep the CTA disabled when checkout is unavailable, but change the label + add a clear explanation (consistent with `CartPage` behavior).
  - Pros: Low risk/effort, fixes the “broken button” perception immediately.
  - Cons: Does not create a real checkout.
- [x] Option C: When `checkoutUrl` is missing, route the CTA to `/checkout` (which explains checkout isn’t ready) instead of disabling it.
  - Pros: Gives users a next step.
  - Cons: Still not a real checkout; also changes navigation behavior from the drawer.
- [x] Pick one + rationale (fit with domain architecture).
  - Selected: **Option B** — minimal blast radius and matches existing “Checkout coming soon” pattern already used on `CartPage`.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
  - Update the drawer checkout button label to read “Checkout coming soon” when `checkoutUrl` is missing.
  - Add a short helper line below the button explaining checkout is being configured.
  - Improve disabled styling so it doesn’t “hover animate” while disabled.
- [x] Write acceptance criteria (testable).
  - When `checkoutUrl` exists and cart has items, CTA remains “Checkout” and works as before.
  - When `checkoutUrl` is missing and cart has items, CTA reads “Checkout coming soon” and shows an explanatory helper line.
  - No TypeScript errors introduced.
- [x] Risks/rollback notes.
  - Risk: None functional (UI-only). Rollback by reverting the `DrawerProvider` change.

## Step 6 — Execute + Validate
- [x] Implement changes.
  - Updated `src/ui/providers/DrawerProvider.tsx` (drawer cart footer CTA).
- [x] Validate (tests or best-effort manual checks).
  - Ran `npm run typecheck` (passed).
  - Manual QA checklist:
    - Open drawer cart tab with empty cart → CTA is disabled.
    - Add an item → if `checkoutUrl` is present, CTA says “Checkout”; if missing, it says “Checkout coming soon” with helper text.
- [x] Record results and any regressions found.
  - No regressions observed (UI-only change).

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
  - Marked issue `45` as `DONE`.
- [x] Summarize what changed + where.
  - Drawer checkout CTA now communicates “Checkout coming soon” when checkout isn’t available, instead of looking like a broken button.
- [x] Mark DONE/DEFERRED/etc.
  - Final status: `DONE`

---

## Evidence / Links

- Code refs:
  - `src/ui/providers/DrawerProvider.tsx`
  - `src/domains/client/shop/cart/providers/CartContext.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes:
  - This resolves the “disabled with no explanation” UX. It does **not** solve the broader “checkout works” problem (tracked separately).
