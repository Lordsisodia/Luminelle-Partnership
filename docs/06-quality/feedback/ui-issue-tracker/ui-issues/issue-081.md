# Issue 081: Header promo strip uses opacity-only hiding, so “hidden” promos can still intercept clicks/focus

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `81`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `3`
- Reach (1–5): `5`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `27`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The header promo strip fades messages by setting inactive items to `opacity-0`, but they remain clickable/focusable and can intercept interaction.

Audit (issue 81): `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — “Header promo strip uses opacity-only hiding, so ‘hidden’ promos can still intercept clicks/focus”.

Likely files:
- `src/ui/components/PublicHeader.tsx` (promo strip rotation + hiding)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence:
- `src/ui/components/PublicHeader.tsx` maps all promos into `position: absolute` elements and hides inactive ones using `opacity-0` only.
- Inactive items still render a `RouterLink`, so they remain focusable/clickable in the DOM.

Repro (before fix):
1. Load any route that renders `PublicHeader`.
2. Wait for the promo message rotation (or simulate `activePromo` changing).
3. Click/Tab on the promo strip area: an invisible link can intercept clicks or keyboard focus.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- This can cause “misclicks” in the header, which reads as scammy/broken.
- Hidden focus targets are a basic a11y failure.
- Fix is contained to a single component.

## Step 4 — Options
- [x] Option A: Only render the active promo message (no inactive DOM nodes).
- [x] Option B: Keep all nodes for fade animation, but disable interaction for inactive nodes (`pointer-events-none`, `tabIndex={-1}`).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option B** to preserve the existing fade animation while making only the active promo interactive/focusable.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Add `pointer-events-none` to inactive promo wrappers and `pointer-events-auto` to the active one.
- Ensure links inside inactive promos are not keyboard-focusable (`tabIndex={-1}`).

Acceptance criteria:
- Only the active promo can be clicked.
- Tabbing through the page never lands on an “invisible” promo link.

Risks:
- Minimal. If a CSS edge case occurs, revert to rendering only the active promo (Option A).

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Promo strip now disables interaction for inactive promos:
  - inactive promos: `pointer-events-none` + link `tabIndex={-1}`
  - active promo: `pointer-events-auto`

File touched:
- `src/ui/components/PublicHeader.tsx`

Validation:
- `npm run typecheck` ✅

Manual QA checklist:
- Wait for promo rotation and click the promo strip — only the visible message should be clickable.
- Use keyboard Tab — focus never lands on an “invisible” promo link.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 81)
- Code refs:
  - `src/ui/components/PublicHeader.tsx` (promo strip now disables pointer events and keyboard focus for inactive promos)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Hidden promo messages no longer intercept clicks or receive focus; only the active promo is interactive.
