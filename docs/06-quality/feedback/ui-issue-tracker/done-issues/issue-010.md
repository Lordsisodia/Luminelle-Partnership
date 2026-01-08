# Issue 010: Landmark semantics: nested `<main>` elements (accessibility + screen reader navigation)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `10`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
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

Some routes render nested `<main>` elements (layout provides a `<main>`, and a page component renders another `<main>` inside it), which breaks landmark semantics and makes screen-reader navigation less predictable.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES** (before fix).

Evidence (before fix):
- `src/layouts/MarketingLayout.tsx` already renders the page’s main landmark.
- Several MarketingLayout pages also rendered their own `<main>`, creating a nested landmark structure:
  - `src/domains/client/marketing/ui/pages/TermsPage.tsx`
  - `src/domains/client/marketing/ui/pages/PrivacyPage.tsx`
  - `src/domains/client/marketing/ui/pages/WelcomePage.tsx`
  - `src/domains/client/marketing/ui/pages/BriefPage.tsx`

Repro:
1. Load `/terms` (or any of the pages above).
2. Inspect landmarks (screen reader rotor, devtools accessibility tree).
3. Observe multiple `<main>` landmarks nested.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**.

Notes:
- Accessibility semantics issue (landmarks are a core navigation affordance for assistive tech).
- No product decisions or data dependencies.

## Step 4 — Options
- [x] Option A: remove `<main>` from layout and push responsibility to every page.
- [x] Option B: keep `<main>` in `MarketingLayout`, replace page-level `<main>` with `<div>/<section>`.
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option B**. `MarketingLayout` is the shared shell for public pages, so it’s the right place for the single main landmark.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Replace the inner `<main>` wrappers in affected MarketingLayout pages with `<div>` wrappers.

Acceptance criteria:
- Pages that use `MarketingLayout` render exactly one `<main>` landmark.
- No visual layout changes (wrapper swap only).

Risks/rollback:
- Low risk; markup-only change, no logic or styling changes beyond the wrapper tag.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- Swapped nested `<main>` wrappers to `<div>` in:
  - `src/domains/client/marketing/ui/pages/TermsPage.tsx`
  - `src/domains/client/marketing/ui/pages/PrivacyPage.tsx`
  - `src/domains/client/marketing/ui/pages/WelcomePage.tsx`
  - `src/domains/client/marketing/ui/pages/BriefPage.tsx`

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/layouts/MarketingLayout.tsx`
- `src/domains/client/marketing/ui/pages/TermsPage.tsx`
- `src/domains/client/marketing/ui/pages/PrivacyPage.tsx`
- `src/domains/client/marketing/ui/pages/WelcomePage.tsx`
- `src/domains/client/marketing/ui/pages/BriefPage.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Removes nested landmark semantics by ensuring only `MarketingLayout` owns the single `<main>` element on marketing routes.
