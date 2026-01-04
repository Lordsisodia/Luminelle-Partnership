# Issue 004: “Spin to win” is shipped as a placeholder component (looks unfinished and off-brand)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `4`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `NOT_AN_ISSUE`
- Area: `Client` (PDP)
- Impact (1–5): `2`
- Reach (1–5): `3`
- Effort (1–5): `3`
- Confidence (1–3): `3`
- Priority: `15` (historic; audit was outdated)
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Restatement: The audit claims PDPs show a floating “Spin to win” CTA whose modal contains placeholder copy, making the storefront look unfinished/off-brand.

Audit claim (Issue 4): PDPs mount a floating “Spin to win” CTA; opening the modal reveals placeholder content (“Spin wheel placeholder / Replace with marketing spin wheel component”).

Likely source:
- `src/domains/client/shop/products/ui/components/SpinWheelPrompt.tsx`
- `src/domains/client/marketing/ui/sections/shop/final-cta-section/SpinWheelLocal.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Evidence (current code):
- `src/domains/client/shop/products/ui/components/SpinWheelPrompt.tsx` renders a real wheel component (`SpinWheelLocal`) and does not contain placeholder strings.
- It is also gated behind `VITE_SPIN_WHEEL_ENABLED === 'true'` (defaults to off unless explicitly enabled).
- A repo-wide search for the placeholder strings in the audit returns no matches.

Repro (if enabled):
1) Set `VITE_SPIN_WHEEL_ENABLED=true`
2) Visit any product page `/product/:handle`
3) Click the floating “Spin to win” CTA → modal renders the wheel UI (`SpinWheelLocal`).

Verified: **NO** (audit claim is outdated).

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: `NOT_AN_ISSUE`

Notes:
- The modal could still be improved (focus trap / restore focus) if `VITE_SPIN_WHEEL_ENABLED` is enabled, but the specific audit claim about placeholder content is no longer true.

## Step 4 — Options
- [ ] Option A: (describe)
- [ ] Option B: (describe)
- [ ] (Optional) Option C: (describe)
- [ ] Pick one + rationale (fit with domain architecture).

## Step 5 — Plan
- [ ] Write implementation plan (bullets).
- [ ] Write acceptance criteria (testable).
- [ ] Risks/rollback notes.

## Step 6 — Execute + Validate
- [ ] Implement changes.
- [ ] Validate (tests or best-effort manual checks).
- [ ] Record results and any regressions found.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

Recorded outcome:
- Marked `NOT_AN_ISSUE` because `SpinWheelPrompt` no longer contains placeholder UI/copy and is feature-flagged off by default.

---

## Evidence / Links

- Code refs:
- `src/domains/client/shop/products/ui/components/SpinWheelPrompt.tsx`
- `src/domains/client/marketing/ui/sections/shop/final-cta-section/SpinWheelLocal.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `NOT_AN_ISSUE`
- Final notes: Audit claim about placeholder copy is outdated; current code renders the real wheel component and is gated by `VITE_SPIN_WHEEL_ENABLED`.
