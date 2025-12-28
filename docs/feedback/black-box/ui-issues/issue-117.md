# Issue 117: Duplicate “content source of truth” files increase copy drift risk (welcome/brief/legal exist twice)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `117`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Creator`
- Impact (1–5): `2`
- Reach (1–5): `4`
- Effort (1–5): `2`
- Confidence (1–3): `3`
- Priority: `22` ((2×4×3)−2)
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Restatement: The repo contains duplicate “marketing/creator copy” modules in two places (`src/content/*` and `src/domains/client/marketing/data/*`), which makes copy drift and “edited the wrong file” mistakes likely.

Audit claim (issue 117): parallel content trees exist for welcome/brief/legal and they sometimes diverge.

Likely sources:
- Canonical content: `src/content/brief.ts`, `src/content/legal.ts`, `src/content/welcome.ts`
- Duplicate content: `src/domains/client/marketing/data/brief.ts`, `src/domains/client/marketing/data/legal.ts`, `src/domains/client/marketing/data/welcome.ts`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES` and set status accordingly.

Verified: **YES**.

Evidence:
- Duplicates exist:
  - Welcome: `src/content/welcome.ts` vs `src/domains/client/marketing/data/welcome.ts`
  - Brief: `src/content/brief.ts` vs `src/domains/client/marketing/data/brief.ts`
  - Legal: `src/content/legal.ts` vs `src/domains/client/marketing/data/legal.ts`
- The copies were not identical (example drift):
  - `legalIntro.terms.summary` differs (“affiliates partner…” vs “creators partner…”).
  - `welcomeSteps` / `resourceCards` had differing fields/links.

Repro (pre-fix):
1. Open both files for a given concept (e.g. `welcome.ts`) and compare; you’ll see subtle copy/link differences.
2. Without a clear “source of truth”, edits can land in the wrong file and never reflect in UI.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX** (low effort, reduces future drift/regressions).

Dependencies: none.

## Step 4 — Options
- [x] Option A: Delete the `src/domains/client/marketing/data/*` copies entirely.
- [x] Option B: Keep both, but “try to remember” which one is canonical (bad).
- [x] Option C: Make `src/domains/client/marketing/data/*` re-export `src/content/*` (single source of truth + preserves old imports).
- [x] Pick one + rationale (fit with domain architecture).

Selected: **Option C**.

Rationale:
- `src/content/README.md` explicitly states this is the canonical “CMS-like content blobs” location.
- Re-exports preserve any existing imports while eliminating drift.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Replace duplicate domain content files with re-export modules from `src/content/*`.
- Update the domain data README to explicitly state content belongs in `src/content/*`.

Acceptance criteria:
- There is only one authored copy for each concept (welcome/brief/legal).
- Any import from `src/domains/client/marketing/data/*` and `src/content/*` resolves to the same values.
- `npm run typecheck` passes.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- `src/domains/client/marketing/data/brief.ts` now re-exports `briefPage` from `src/content/brief.ts`.
- `src/domains/client/marketing/data/legal.ts` now re-exports legal content from `src/content/legal.ts`.
- `src/domains/client/marketing/data/welcome.ts` now re-exports welcome content from `src/content/welcome.ts`.
- `src/domains/client/marketing/data/README.md` now explicitly says this directory is for backwards-compatible re-exports only.

Validation:
- `npm run typecheck`

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE.

---

## Evidence / Links

- Code refs:
- `src/content/README.md`
- `src/domains/client/marketing/data/brief.ts`
- `src/domains/client/marketing/data/legal.ts`
- `src/domains/client/marketing/data/welcome.ts`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Removed marketing content duplication by making the domain “data” modules re-export the canonical `src/content/*` definitions.
