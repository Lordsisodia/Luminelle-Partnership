# Issue 036: Two different `cdnUrl` helpers exist (inconsistent asset loading + CDN-bypass mismatch)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `36`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Platform`
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

Two different `cdnUrl` helper implementations risked asset-loading drift (different encoding/CDN bypass behavior depending on which import path a component used).

Audit (issue 36): `docs/reviews/app-ui-review-2025-12-26.md` — “Two different `cdnUrl` helpers exist (inconsistent asset loading + CDN-bypass mismatch)”.

Likely files:
- `src/lib/utils/cdn.ts` (canonical implementation)
- `src/utils/cdn.ts` (historically could drift)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **NO** (the drift no longer exists in current code)

Evidence (current code):
- `src/utils/cdn.ts` now re-exports `cdnUrl` from `src/lib/utils/cdn.ts`, making `src/lib/utils/cdn.ts` the single source of truth.

This eliminates the “two different implementations” problem; different import paths now resolve to the same logic.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **CLOSE (already addressed)** ✅

## Step 4 — Options
- [x] Option A: Keep a single canonical implementation and make the other path re-export it.
- [ ] Option B: Delete one helper file and migrate all imports (more churn).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**, which is already implemented and avoids a wide import refactor.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan (already implemented):
- Ensure `src/utils/cdn.ts` re-exports the canonical `cdnUrl` from `src/lib/utils/cdn.ts`.

Acceptance criteria:
- There is only one `cdnUrl` implementation in the codebase (all other entry points are re-exports).

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Execution:
- No code changes required in this run; the re-export is already in place.

Validation:
- Static verification in code: `src/utils/cdn.ts` exports from `src/lib/utils/cdn.ts`.

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/reviews/app-ui-review-2025-12-26.md` (issue 36)
- Code refs:
  - `src/lib/utils/cdn.ts` (canonical implementation)
  - `src/utils/cdn.ts` (re-export)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: `cdnUrl` now has a single source of truth, so different import paths can no longer drift in behavior.
