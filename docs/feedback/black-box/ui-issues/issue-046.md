# Issue 046: Spin wheel is not actually random (it always lands on the same “best value” prize)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `46`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `3`
- Reach (1–5): `3`
- Effort (1–5): `2`
- Confidence (1–3): `3`
- Priority: `25` (=(3×3×3)−2)
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Restatement: A “spin to win” UI must not imply randomness/odds if the outcome is deterministic; otherwise it reads as deceptive and undermines trust.

Audit claim (Issue 46): The wheel animation always targets the “best value” slice and always awards it, so it’s not actually random despite being presented like a wheel of chance.

Likely files:
- Landing wheel: `src/domains/client/marketing/ui/sections/shop/final-cta-section/SpinWheelLocal.tsx`
- Mount point: `src/domains/client/marketing/ui/sections/shop/final-cta-section/FinalCtaSection.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Evidence (before fix):
- `SpinWheelLocal.tsx` explicitly selected a fixed `targetIndex` (commented as always landing on a specific slice) and always set the awarded result to the guaranteed deal.
- The UI also listed multiple “possible prizes”, which implied chance/odds.

Repro (before fix):
1) Visit the landing section that renders the wheel (Final CTA).
2) Spin repeatedly (or inspect the code path) — the landing animation and awarded result always resolve to the same outcome.

Verified: **YES**

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX** (make the UI honest about the deterministic welcome deal).

Notes:
- True randomness would require defining prize logic + codes + persistence. The safer “UI trust” fix is to stop implying chance when the deal is guaranteed.

## Step 4 — Options
- [x] Option A: Make the wheel truly random (award based on configured odds, persist prize, generate/apply correct codes).
- [x] Option B: Keep deterministic deal but update UI/copy so it’s clearly a guaranteed “welcome deal reveal” (no implied odds).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option B**: minimal blast radius, improves trust, and avoids adding a full prize system prematurely.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Update the wheel UI to describe a guaranteed welcome deal (not a random prize).
- Remove any UI that lists multiple “possible outcomes” when the result is deterministic.
- Keep the spin animation as a fun reveal.
- Run `npm run typecheck`.

Acceptance criteria:
- The wheel no longer implies random outcomes (no “possible prize list”).
- Copy clearly communicates the welcome code and terms (min spend + 1 per account).

Risks/rollback:
- Minor copy/UX change; lowest risk is reverting the UI copy block if stakeholders prefer the older phrasing.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- `src/domains/client/marketing/ui/sections/shop/final-cta-section/SpinWheelLocal.tsx`
  - Updated copy to describe a guaranteed welcome deal (code + min spend).
  - Removed the “possible prizes” grid to avoid implying odds.
  - Updated defaults/labels to remove misleading prize variety for the welcome wheel.

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
  - `src/domains/client/marketing/ui/sections/shop/final-cta-section/SpinWheelLocal.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: The wheel remains a fun “reveal” animation, but the UI no longer implies randomness/odds; it now clearly communicates a guaranteed welcome code and removes misleading prize listings.
