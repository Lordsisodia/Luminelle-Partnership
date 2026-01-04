# Issue 179: Floating WhatsApp CTA has the same invisible-focus problem (and exists in two copies)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `179`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Creator`
- Impact (1–5): `3`
- Reach (1–5): `3`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `15`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The floating WhatsApp CTA uses `opacity-0` to hide itself, but its `<button>` remains focusable (invisible focus target), and the component exists in multiple duplicated copies.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES** (before fix).

Evidence:
- The CTA wrapper toggles only `opacity-0/opacity-100`, so the `<button>` can still be tabbed to when hidden.
- Duplicated implementations exist at:
  - `src/ui/components/FloatingWhatsAppCta.tsx`
  - `src/domains/client/marketing/ui/components/FloatingWhatsAppCta.tsx`
  - `src/archive/landing/ui/components/FloatingWhatsAppCta.tsx` (archive copy)

Repro:
1. Load a page where the floating WhatsApp CTA is present on mobile/narrow viewport.
2. Ensure the CTA is hidden (opacity 0).
3. Press `Tab` until focus reaches an element that is not visible on screen.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**.

Notes:
- This is a keyboard/a11y regression similar to Issue #178.
- Fix is low risk and localized.

## Step 4 — Options
- [x] Option A: conditionally render/unrender the CTA.
- [x] Option B: keep opacity transitions but remove the CTA from the accessibility tree and tab order when hidden.
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option B**. Keeps the existing fade UX while preventing “invisible focus”.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Add `aria-hidden={!shouldShow}` on the wrapper when hidden.
- Add `tabIndex={shouldShow ? 0 : -1}` on the CTA button when hidden.
- Apply the fix to both duplicated implementations (and the archived copy for safety).

Acceptance criteria:
- When the CTA is hidden, it cannot be reached by keyboard tabbing.
- When the CTA is visible, it remains usable and focusable.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- Added `aria-hidden` and `tabIndex` guards in all copies.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/ui/components/FloatingWhatsAppCta.tsx`
- `src/domains/client/marketing/ui/components/FloatingWhatsAppCta.tsx`
- `src/archive/landing/ui/components/FloatingWhatsAppCta.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Prevents invisible focus targets by removing the hidden CTA from the accessibility tree and tab order while it is visually hidden.
