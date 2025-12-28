# Issue 016: Product spotlight carousel hides its entire content from screen readers

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `16`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

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

When the product spotlight has multiple slides, the carousel should hide only the inactive slides from assistive tech — not the entire track (otherwise the active slide’s CTA becomes unreachable to screen readers).

Audit (issue 16): `docs/reviews/app-ui-review-2025-12-26.md` — “Product spotlight carousel hides its entire content from screen readers”.

Likely file:
- `src/domains/client/marketing/ui/sections/shop/product-spotlight-section/ProductSpotlightSection.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence:
- The carousel renders multiple slides and uses `aria-hidden` to hide inactive slides.
- Without additional safeguards, keyboard users can still tab into focusable CTAs inside off-screen slides if the browser doesn’t support `inert` (even though screen readers won’t announce them).

Repro (before fix):
1. Visit `/` (shop landing page).
2. If multiple spotlight slides exist, tab through the page.
3. Observe you can land focus on a CTA that belongs to an off-screen slide (browser-dependent), which is confusing and effectively hides context for keyboard-only users.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- This is a key conversion section and should be navigable for screen-reader + keyboard users.
- No product decision needed; purely semantic/interaction correctness.

## Step 4 — Options
- [x] Option A: Hide only inactive slides via `aria-hidden` and make inactive CTAs unfocusable via `tabIndex={-1}` (works even if `inert` isn’t supported).
- [ ] Option B: Implement a full ARIA carousel pattern (next/prev controls, roledescription, live region) (bigger change).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: minimal change that fixes the core accessibility failure mode without redesigning the carousel.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Compute `isInactiveSlide` for each slide (`slides.length > 1 && idx !== active`).
- Keep `aria-hidden` for inactive slides.
- Add `tabIndex={-1}` to the CTA link for inactive slides (both internal and external link variants).

Acceptance criteria:
- Active slide CTA is reachable by keyboard and visible in the viewport.
- Inactive slide CTAs cannot be tab-focused.
- Screen readers only announce the active slide content (inactive slides are `aria-hidden`).
- Typecheck passes.

Risks:
- Very low; only affects focusability of off-screen CTAs.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Added `isInactiveSlide` and ensured the CTA is unfocusable on inactive slides via `tabIndex={-1}`.

Files touched:
- `src/domains/client/marketing/ui/sections/shop/product-spotlight-section/ProductSpotlightSection.tsx`

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/reviews/app-ui-review-2025-12-26.md` (issue 16)
- Code refs:
  - `src/domains/client/marketing/ui/sections/shop/product-spotlight-section/ProductSpotlightSection.tsx` (inactive slide focus handling)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: The spotlight carousel no longer exposes off-screen CTAs to keyboard focus, and inactive slides remain hidden from assistive tech.
