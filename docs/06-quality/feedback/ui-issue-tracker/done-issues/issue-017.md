# Issue 017: Public “Creators” page is visibly placeholder content

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `17`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Creator`
- Impact (1–5): `3`
- Reach (1–5): `3`
- Effort (1–5): `2`
- Confidence (1–3): `3`
- Priority: `25`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Restatement: The public `/creators` route should be a polished creator-program landing page, but it rendered a grid of “placeholder content” blocks.

Audit claim (Issue 17): The public “Creators” page is visibly placeholder content, which damages credibility immediately.

Likely source:
- `src/domains/creator/ui/pages/CreatorsPage.tsx`
- Creator landing sections under `src/domains/creator/ui/sections/*`
- Creator landing content under `src/content/landing.ts`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before):
- `src/domains/creator/ui/pages/CreatorsPage.tsx` rendered repeated blocks literally saying “Placeholder content for the creators landing page.”

Repro (before):
1) Visit `/creators`
2) Observe a list of placeholder cards (Overview/Journey/etc.) with explicit placeholder copy.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: `FIX`

Why now:
- This is a public-facing page linked from the footer; placeholder content is an immediate trust hit.
- There are already real creator landing sections + content in the codebase, so the fix is mostly composition (low effort).

## Step 4 — Options
- [x] Option A: Assemble the creators landing page from existing creator sections + content.
- [ ] Option B: Redirect `/creators` → `/welcome` to avoid placeholder (fast but semantically wrong).
- [ ] (Optional) Option C: Hide `/creators` route until a page exists (404 / redirect).
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option A**
- Reuses existing `src/domains/creator/ui/sections/*` and `src/content/landing.ts` data.
- Keeps `/creators` as the public “top of funnel” for creator acquisition (distinct from `/welcome` onboarding).

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Replace placeholder `CreatorsPage` with a composed landing page using existing creator sections.
- Add in-page nav items so the header “Page sections” nav works on the long landing.
- Add basic SEO metadata for `/creators`.

Acceptance criteria:
- `/creators` contains no placeholder copy.
- Page renders structured sections (hero/journey/story/proof/rewards/etc.) and section-nav scrolls to anchors.
- “Join WhatsApp” CTAs open the WhatsApp invite link in a new tab (with fallback).

Risks/rollback:
- Low risk: mostly static composition. Rollback is reverting `CreatorsPage.tsx`.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implementation:
- `src/domains/creator/ui/pages/CreatorsPage.tsx`
  - replaced placeholder grid with real creator landing sections
  - added `Seo` + in-page section nav items
  - added “Join WhatsApp” action wiring (open invite link; fallback to same-tab navigation)

Validation:
- Best-effort: `npm run typecheck`
- Manual QA:
  1) Visit `/creators` and scan for placeholder copy (none).
  2) Click section-nav chips → smooth scrolls to the right section.
  3) Click “Join WhatsApp” CTA → opens invite link.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

Summary:
- `/creators` now renders a full creator acquisition landing page using existing sections/content, instead of visible placeholder blocks.

---

## Evidence / Links

- Code refs:
- `src/domains/creator/ui/pages/CreatorsPage.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Fixed by composing the existing creator landing sections; no placeholder UI remains.
