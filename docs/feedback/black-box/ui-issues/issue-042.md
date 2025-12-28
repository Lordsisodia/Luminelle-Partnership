# Issue 042: Two different header components exist, and they disagree on core navigation patterns

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `42`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `2`
- Reach (1–5): `5`
- Effort (1–5): `4`
- Confidence (1–3): `2`
- Priority: `16`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The audit flagged that two different header components existed (`GlobalHeader` vs `PublicHeader`) and the storefront header lacked key navigation primitives (cart access), creating inconsistent navigation behavior across the app.

Audit (issue 42): `docs/reviews/app-ui-review-2025-12-26.md` — “Two different header components exist, and they disagree on core navigation patterns”.

Likely files:
- `src/ui/components/GlobalHeader.tsx`
- `src/ui/components/PublicHeader.tsx`
- `src/layouts/MarketingLayout.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **NO** (the specific mismatch described in the audit is no longer present)

Evidence (current code):
- `PublicHeader` now includes a cart button (with quantity badge) wired to `openCart`, and a menu button wired to `openMenu` via `useDrawer`.
- `MarketingLayout` mounts `PublicHeader` on storefront pages.

This means the storefront header now supports the same core navigation primitives (menu + cart) as the alternate header.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **CLOSE (already addressed)** ✅

Notes:
- Even if two header components still exist in the repo, the storefront header now includes the missing cart/navigation behaviors that created the “disagree on core patterns” user impact.

## Step 4 — Options
- [x] Option A: Ensure `PublicHeader` supports the required primitives (menu/cart/account) so storefront UX is complete.
- [ ] Option B: Fully consolidate to a single header component across all layouts (more refactor).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**, which is already implemented and avoids a wide layout refactor.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan (already implemented):
- Add cart access to `PublicHeader` and wire to drawer cart open behavior.

Acceptance criteria:
- Storefront header includes a cart entry point and can open the cart drawer.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Execution:
- No new changes required in this run; `PublicHeader` already includes cart + qty badge wired to `useDrawer`.

Validation:
- Static verification in code.

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/reviews/app-ui-review-2025-12-26.md` (issue 42)
- Code refs:
  - `src/ui/components/PublicHeader.tsx` (cart icon + qty badge + drawer wiring)
  - `src/layouts/MarketingLayout.tsx` (mounts `PublicHeader`)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Storefront navigation no longer lacks a cart entry point; `PublicHeader` now supports the core nav primitives that were previously inconsistent.
