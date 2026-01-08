# Issue 178: Floating “Buy Now” CTA is hidden with `opacity-0` but remains focusable (invisible focus target)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `178`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `3`
- Reach (1–5): `3`
- Effort (1–5): `2`
- Confidence (1–3): `2`
- Priority: `16`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The mobile-only floating “Buy Now” CTA is hidden by `opacity-0` when inactive, but the `<a>` remains in the DOM and can still be reached via keyboard focus (an invisible focus target).

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES** (before fix).

Repro:
1. Open a PDP on mobile or with a narrow viewport.
2. Ensure the floating CTA is not “shown” (e.g. at the very top, or when the primary CTA is in view).
3. Press `Tab` until focus reaches the floating CTA — focus can land on an element that is visually hidden via `opacity-0`.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**.

Notes:
- This is a concrete keyboard/a11y regression and can be fixed locally with low risk.
- No product decisions required.

## Step 4 — Options
- [x] Option A: conditionally render/unrender the CTA when shown/hidden.
- [x] Option B: keep the fade transition but remove it from accessibility tree and tab order when hidden.
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option B**. The component already uses an opacity transition; we keep that UX but ensure it’s not focusable or announced when hidden.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- In `FloatingBuyCta`, set `aria-hidden` on the container when hidden.
- Set `tabIndex={-1}` on the `<a>` when hidden (and `0` when shown).

Acceptance criteria:
- When the floating CTA is hidden, it cannot be reached by keyboard tabbing.
- When it is visible, it remains fully usable and focusable.

Risks/rollback:
- Very low risk; change is isolated to a single component.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- Added `aria-hidden={!show}` on the wrapper and `tabIndex={show ? 0 : -1}` on the anchor.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/domains/client/marketing/ui/components/FloatingBuyCta.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Prevents “invisible focus” by removing the hidden CTA from the accessibility tree and tab order while it is visually hidden.
