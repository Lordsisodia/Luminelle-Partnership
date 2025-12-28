# Issue 173: “Just added” CTAs use `animate-pulse` without respecting `prefers-reduced-motion` (motion a11y)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `173`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

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

Some “Just added” CTA states use `animate-pulse` without respecting reduced-motion preferences, creating motion for users who explicitly request less animation.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES** (before fix).

Evidence:
- `animate-pulse` was applied directly when `justAdded` was true:
  - `src/domains/client/shop/products/ui/pages/ProductPage/sections/PriceBlock.tsx`
  - `src/domains/client/shop/products/ui/pages/ProductPage/sections/SectionsMap.tsx`

Repro:
1. Enable “Reduce motion” at OS/browser level.
2. Add to basket on PDP so the “Just added” state triggers.
3. The CTA still animates/pulses.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**.

Notes:
- Quick motion-a11y win with minimal UI impact.
- No backend/product dependencies.

## Step 4 — Options
- [x] Option A: remove pulse animation entirely.
- [x] Option B: keep animation for motion-safe users and disable for motion-reduce users using Tailwind variants.
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option B**. Preserves existing UX while respecting reduced motion settings.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Replace `animate-pulse` usage with `motion-safe:animate-pulse motion-reduce:animate-none` in the “just added” CTA styles.

Acceptance criteria:
- With reduced motion enabled: CTA does not pulse.
- With reduced motion disabled: CTA pulses when “just added” state is active.

Risks/rollback:
- Low risk; CSS-class-only changes.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- Updated CTA classnames to use motion-safe / motion-reduce Tailwind variants.

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/PriceBlock.tsx`
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/SectionsMap.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: “Just added” animations now respect reduced-motion preferences, improving accessibility without removing the effect for motion-safe users.
