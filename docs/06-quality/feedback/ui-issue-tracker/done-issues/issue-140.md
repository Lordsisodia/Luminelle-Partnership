# Issue 140: Fixed bottom CTAs don’t respect iOS safe-area insets (can overlap the home indicator / browser UI)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `140`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `2`
- Reach (1–5): `3`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `9`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Several mobile-only floating CTAs are `position: fixed` near the bottom of the viewport, but don’t account for iOS safe-area insets, so they can sit under the home indicator / Safari UI and become harder to tap.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES** (before fix).

Evidence:
- Floating CTAs used `fixed ... bottom-6` without `env(safe-area-inset-bottom)`:
  - `src/ui/components/FloatingWhatsAppCta.tsx`
  - `src/domains/client/marketing/ui/components/FloatingBuyCta.tsx`
  - `src/domains/client/marketing/ui/components/FloatingWhatsAppCta.tsx`
  - `src/archive/landing/ui/components/FloatingBuyCta.tsx`
  - `src/archive/landing/ui/components/FloatingWhatsAppCta.tsx`
- Cookie banner is also fixed-bottom and didn’t include safe-area padding:
  - `src/ui/components/CookieConsentBanner.tsx`

Repro (iOS Safari):
1. On a mobile viewport, scroll until the floating CTA appears.
2. Observe the button sits very close to the bottom edge and can overlap the iOS home indicator area.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**.

Notes:
- Low-risk UX polish with a real usability impact on iOS.
- No backend/data dependencies.

## Step 4 — Options
- [x] Option A: hard-code a larger bottom offset (e.g. `bottom-10`) everywhere.
- [x] Option B: use `env(safe-area-inset-bottom)` to dynamically pad/offset fixed UI on iOS.
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option B**. It’s the correct platform-native solution and matches the pattern already used in the cart drawer.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- For floating CTAs positioned with `bottom-6`, replace with `bottom-[calc(1.5rem+env(safe-area-inset-bottom))]`.
- For `bottom-0` fixed banners, keep `p-4` but override bottom padding to include safe-area inset.

Acceptance criteria:
- On iOS Safari, the floating CTA and cookie banner sit above the home indicator area (extra padding/offset visible).
- On non-iOS browsers, layout remains visually unchanged (safe-area inset resolves to `0px`).

Risks:
- Very low. If Tailwind arbitrary values ever fail to compile, revert to inline styles for bottom/padding.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- Updated floating CTA wrappers to include safe-area inset in their bottom offset:
  - `src/domains/client/marketing/ui/components/FloatingBuyCta.tsx`
  - `src/domains/client/marketing/ui/components/FloatingWhatsAppCta.tsx`
  - `src/ui/components/FloatingWhatsAppCta.tsx`
  - `src/archive/landing/ui/components/FloatingBuyCta.tsx`
  - `src/archive/landing/ui/components/FloatingWhatsAppCta.tsx`
- Updated cookie banner to include safe-area inset in bottom padding:
  - `src/ui/components/CookieConsentBanner.tsx`

Validation:
- Best-effort: this is a CSS-only adjustment; `env(safe-area-inset-bottom)` is widely supported on iOS Safari.
- Run `npm run typecheck` for regression safety.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/domains/client/marketing/ui/components/FloatingBuyCta.tsx`
- `src/domains/client/marketing/ui/components/FloatingWhatsAppCta.tsx`
- `src/ui/components/FloatingWhatsAppCta.tsx`
- `src/ui/components/CookieConsentBanner.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Fixed-bottom CTAs now account for `env(safe-area-inset-bottom)`, preventing overlap with iOS home-indicator and improving tap ergonomics on mobile Safari.
