# Issue 129: Marketing pages use raw hex colors in Tailwind classes (bypasses the token system and increases drift)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `129`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `2`
- Reach (1–5): `4`
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

Marketing UI used raw hex colors in Tailwind arbitrary color classes (e.g. `from-[#fff7f2]`), which bypasses the design token system and makes styling drift more likely over time.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES** (before fix).

Evidence (examples before fix):
- `src/domains/client/marketing/ui/pages/WelcomePage.tsx` used `from-[#fff7f2]`.
- `src/domains/client/marketing/ui/pages/PrivacyPage.tsx` and `TermsPage.tsx` used `from-[#fff5f0]`.
- `src/domains/client/marketing/ui/sections/shop/final-cta-section/FinalCtaSection.tsx` used `from-[#F9D8D0] via-[#FCEBE3] to-[#FDE7DA]`.
- `src/domains/client/marketing/ui/components/testimonial.tsx` used a raw hex gradient (`from-[#8B5CF6] ...`).

Repro (visual/maintenance):
1. Update design tokens (or the brand palette).
2. These components keep the old look because they hard-code colors in-line, causing drift.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**.

Notes:
- These are “design system hygiene” issues: they don’t break flows, but create long-term inconsistency and “why doesn’t this change apply?” confusion.
- Low-risk to replace with existing brand tokens (`brand-*`).

## Step 4 — Options
- [x] Option A: Keep the arbitrary hex colors (fast, but guarantees drift).
- [x] Option B: Replace raw hex usage with existing tokenized colors (`brand-*` / `semantic-*`) (preferred).
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option B**. It keeps the palette centralized and makes future brand tweaks consistent.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Replace `from-[#…]` / `via-[#…]` / `to-[#…]` occurrences in marketing UI with tokenized equivalents (`from-brand-porcelain`, `to-brand-peach/…`, etc.).
- Keep the same overall “warm blush” look while avoiding raw hex.
- Run `npm run typecheck`.

Acceptance criteria:
- No `[#` arbitrary color usage remains in marketing UI.
- Pages render and typecheck passes.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- Swapped raw hex gradient colors to use tokenized brand colors across marketing pages/components:
  - `src/domains/client/marketing/ui/pages/PrivacyPage.tsx`
  - `src/domains/client/marketing/ui/pages/WelcomePage.tsx`
  - `src/domains/client/marketing/ui/pages/BriefPage.tsx`
  - `src/domains/client/marketing/ui/pages/TermsPage.tsx`
  - `src/domains/client/marketing/brand/ui/pages/BrandStoryPage.tsx`
  - `src/domains/client/marketing/ui/sections/shop/final-cta-section/FinalCtaSection.tsx`
  - `src/domains/client/marketing/ui/components/testimonial.tsx`

Validation:
- `npm run typecheck` ✅
- `rg \"\\\\[#\" src/domains/client/marketing` returns no matches.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/domains/client/marketing/ui/pages/PrivacyPage.tsx`
- `src/domains/client/marketing/ui/pages/WelcomePage.tsx`
- `src/domains/client/marketing/ui/pages/BriefPage.tsx`
- `src/domains/client/marketing/ui/pages/TermsPage.tsx`
- `src/domains/client/marketing/brand/ui/pages/BrandStoryPage.tsx`
- `src/domains/client/marketing/ui/sections/shop/final-cta-section/FinalCtaSection.tsx`
- `src/domains/client/marketing/ui/components/testimonial.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Marketing gradients now use centralized brand tokens instead of raw hex literals, reducing styling drift and making the design system easier to evolve.
