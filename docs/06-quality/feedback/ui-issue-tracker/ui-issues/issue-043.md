# Issue 043: Star rating “half star” uses a non-unique SVG gradient id (can render incorrectly when multiple ratings exist)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `43`
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

Restatement: The half‑star SVG gradient needs a unique id per component instance; otherwise multiple star ratings on the same page can collide and render incorrectly.

Audit claim (Issue 43): Star rating “half star” uses a non-unique gradient id (`id="half"`), so multiple instances can conflict.

Likely sources:
- `src/ui/components/StarRating.tsx`
- `src/domains/client/marketing/ui/components/StarRating.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Evidence:
- Both StarRating components defined `<linearGradient id="half">` and referenced it via `fill="url(#half)"`.
- SVG ids are global within the document; repeated ids can cause the wrong gradient to be applied.

Repro:
1) Render multiple star ratings with half stars on the same page (e.g., marketing proof strip + product teaser).
2) Observe that half stars can render inconsistently depending on DOM order.

Verified: **YES**

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

- Decision: **FIX**
- Dependencies: none

## Step 4 — Options
- [x] Option A: Use `useId()` to generate a unique gradient id per component instance.
- [x] Option B: Hard-code random ids (unstable; hydration mismatch risk).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: `useId()` is deterministic and avoids hydration mismatches.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Add `useId()` to both StarRating components.
- Replace `id="half"` with `id={halfGradientId}` and reference `url(#${halfGradientId})`.
- Run `npm run typecheck`.

Acceptance criteria:
- Multiple StarRating instances can coexist without id collisions.
- No TypeScript errors introduced.

Risks / rollback:
- Low; rollback is restoring static id (not recommended).

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- `src/ui/components/StarRating.tsx`: gradient id is now unique per instance.
- `src/domains/client/marketing/ui/components/StarRating.tsx`: same fix applied.

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/ui/components/StarRating.tsx`
- `src/domains/client/marketing/ui/components/StarRating.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Half-star gradients no longer collide across multiple StarRating instances on the same page.
