# Issue 058: Admin component “detail” route is a hard-coded placeholder (editing drilldown doesn’t work)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `58`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Admin`
- Impact (1–5): `4`
- Reach (1–5): `2`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `13`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The audit claims the admin “component detail” route (`/admin/components/:key`) is a dead-end placeholder that makes the admin feel unfinished when operators try to drill into a component.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **NO** (in current `dev`) — already addressed.

Current behavior:
- `src/domains/admin/catalog/ui/pages/ComponentDetailPage.tsx` renders a real (read-only) detail view:
  - handles “unknown component key” gracefully
  - provides a “Back to Components” route
  - shows component metadata (category, usage)
  - shows default config JSON in a read-only `<pre>`

Repro:
1. Navigate to `/admin/components/<some-key>`.
2. Observe a detail view is rendered (not a single placeholder sentence).
3. Use “Back to Components” to return.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **CLOSE** (already fixed to the audit’s minimum bar).

Notes:
- The route is no longer a dead end.
- Full “editable component detail” is still a future enhancement, but it’s no longer the audit’s “hard-coded placeholder” failure mode.

## Step 4 — Options
- [x] Option A: Hide/remove the detail route until editable UI exists.
- [x] Option B: Provide a read-only detail page (metadata + default config), plus a clear way back.
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option B** (already implemented). It preserves nav consistency and prevents the “unfinished admin” dead-end feeling.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

N/A — no new code changes required.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

No changes required in this pass.

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/domains/admin/catalog/ui/pages/ComponentDetailPage.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: The component detail route now renders a usable read-only view (with metadata, defaults, and a back link), removing the audit’s “hard-coded placeholder” dead-end.
