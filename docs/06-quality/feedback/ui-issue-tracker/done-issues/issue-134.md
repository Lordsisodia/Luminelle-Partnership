# Issue 134: Trust bar uses a marquee animation with a clickable link (moving target + no pause control)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `134`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `2`
- Reach (1–5): `3`
- Effort (1–5): `1`
- Confidence (1–3): `3`
- Priority: `17` (=(2×3×3)−1)
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Restatement: Auto-moving marquee text with a clickable link is a moving target; users need a way to pause it (at least on hover/focus) to avoid mis-taps and a11y issues.

Audit claim (Issue 134): Trust bar uses a marquee animation and contains a moving “Shop now” link, with no pause-on-hover/focus or visible pause control.

Likely source:
- `src/domains/client/marketing/ui/sections/shop/trust-bar/TrustBar.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Evidence:
- `TrustBar` applied a continuous `marquee` animation to the entire track and rendered a clickable `RouterLink` inside that moving content.
- There was no pause behavior on hover/focus, so the link remained a moving target.

Repro:
1) Load the shop landing page and watch the trust bar scroll.
2) Try to click “Buy 2, save 10% • Shop now” while it moves — it’s easy to mis-tap.
3) Tab to the link — focus happens while the content continues moving.

Verified: **YES**

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

- Decision: **FIX**
- Dependencies: none

## Step 4 — Options
- [x] Option A: Replace marquee with a static trust strip (most accessible).
- [x] Option B: Keep marquee but pause on hover/focus (minimal fix).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option B**: minimal change that removes the “moving target” behavior without redesigning the strip.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Add a paused state and set `animationPlayState: 'paused'` on interaction (hover/focus/pointer down).
- Run `npm run typecheck`.
- Update tracker/worklog.

Acceptance criteria:
- Trust bar animation pauses when hovered, when the link receives focus, and when the user touches/presses on the bar.
- No TypeScript errors introduced.

Risks / rollback:
- Very low; rollback is removing the pause handlers/state.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- `src/domains/client/marketing/ui/sections/shop/trust-bar/TrustBar.tsx`: marquee now pauses on hover, focus (focus-within), and pointer interaction.

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/domains/client/marketing/ui/sections/shop/trust-bar/TrustBar.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Trust bar is no longer a moving target during interaction; users can pause it by hovering, focusing, or touching.
