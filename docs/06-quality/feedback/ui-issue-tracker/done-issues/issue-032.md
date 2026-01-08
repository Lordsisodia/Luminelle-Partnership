# Issue 032: Cart access is hidden behind the hamburger menu (no cart icon / qty badge in the header)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `32`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `2`
- Reach (1–5): `5`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `17`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Users should be able to access the cart directly from the header (including a quantity badge) without needing to open the hamburger menu/drawer.

Audit (issue 32): `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — “Cart access is hidden behind the hamburger menu (no cart icon / qty badge in the header)”.

Likely file:
- `src/ui/components/PublicHeader.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **NO (already fixed in current code)**

Evidence:
- `PublicHeader` renders an “Open cart” button with a `ShoppingBag` icon.
- When `qty > 0`, it renders a badge with the quantity (`99+` cap).

Repro (current):
1. Visit `/`.
2. Observe the cart icon in the header.
3. Add an item to cart and observe the quantity badge appears.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX (already applied)**

Notes:
- No further work required; just closing the loop in the tracker.

## Step 4 — Options
- [x] Option A: Show a cart icon button + qty badge in the header (preferred).
- [ ] Option B: Show a “Cart” text button in the header.
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A** (already in place) because it’s discoverable and uses consistent iconography on mobile/desktop.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Acceptance criteria:
- Cart icon is visible in the header on marketing pages.
- Quantity badge appears when cart has items.

Risks:
- None; verified in current code.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- No additional changes required; issue is already addressed.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 32)
- Code refs:
  - `src/ui/components/PublicHeader.tsx` (ShoppingBag icon + qty badge)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Public header exposes cart access and a quantity badge, so cart is not hidden behind the hamburger menu.
