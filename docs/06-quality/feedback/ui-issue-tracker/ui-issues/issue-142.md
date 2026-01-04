# Issue 142: Multiple “design primitives” are duplicated across `src/ui` and marketing domain (drift + inconsistent fixes)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `142`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
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

Restatement: Several shared UI primitives were duplicated between `src/ui/components/*` and `src/domains/client/marketing/ui/components/*`, creating drift and “fix it once, still broken elsewhere” risk.

Audit claim (issue 142): duplicated primitives like Avatar, SectionHeading, and FloatingWhatsAppCta exist in both locations.

Likely sources:
- Canonical primitives: `src/ui/components/*`
- Duplicate marketing copies: `src/domains/client/marketing/ui/components/*`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES` and set status accordingly.

Verified: **YES**.

Evidence (duplicates present pre-fix):
- `src/ui/components/Avatar.tsx` and `src/domains/client/marketing/ui/components/Avatar.tsx`
- `src/ui/components/SectionHeading.tsx` and `src/domains/client/marketing/ui/components/SectionHeading.tsx` (minor behavior differences)
- `src/ui/components/FloatingWhatsAppCta.tsx` and `src/domains/client/marketing/ui/components/FloatingWhatsAppCta.tsx`

Repro (pre-fix):
1. Update one version of a primitive (e.g. focus handling or spacing).
2. A different route that imports the other copy won’t receive the fix, creating inconsistent UI.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX** (cheap, prevents future regressions).

Dependencies: none.

## Step 4 — Options
- [x] Option A: Delete the marketing copies and update imports.
- [x] Option B: Keep both and “be careful” (not realistic).
- [x] Option C: Convert marketing copies into re-export shims pointing to the canonical `src/ui/components` versions.
- [x] Pick one + rationale (fit with domain architecture).

Selected: **Option C**.

Rationale:
- Preserves any existing/legacy imports to marketing components.
- Ensures there is exactly one real implementation per primitive.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Replace duplicate component implementations in `src/domains/client/marketing/ui/components/*` with re-exports from `src/ui/components/*`.

Acceptance criteria:
- There is no longer a second authored copy of each primitive under marketing.
- `npm run typecheck` passes.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- `src/domains/client/marketing/ui/components/Avatar.tsx` now re-exports `Avatar` from `src/ui/components/Avatar.tsx`.
- `src/domains/client/marketing/ui/components/SectionHeading.tsx` now re-exports `SectionHeading` from `src/ui/components/SectionHeading.tsx`.
- `src/domains/client/marketing/ui/components/FloatingWhatsAppCta.tsx` now re-exports `FloatingWhatsAppCta` from `src/ui/components/FloatingWhatsAppCta.tsx`.

Validation:
- `npm run typecheck`

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE.

---

## Evidence / Links

- Code refs:
- `src/ui/components/Avatar.tsx`
- `src/ui/components/SectionHeading.tsx`
- `src/ui/components/FloatingWhatsAppCta.tsx`
- `src/domains/client/marketing/ui/components/Avatar.tsx`
- `src/domains/client/marketing/ui/components/SectionHeading.tsx`
- `src/domains/client/marketing/ui/components/FloatingWhatsAppCta.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Removed primitive duplication by making marketing “copies” re-export the canonical `src/ui/components/*` implementations.
