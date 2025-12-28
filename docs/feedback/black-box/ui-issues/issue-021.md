# Issue 021: “Benefits” section is a stub (renders nothing)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `21`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `NOT_AN_ISSUE`
- Area: `Client` (Shop landing)
- Impact (1–5): `2`
- Reach (1–5): `3`
- Effort (1–5): `3`
- Confidence (1–3): `3`
- Priority: `15` (audit was outdated)
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Restatement: The audit claims the shop landing “Benefits” section is mounted but renders nothing because it’s a stub component.

Audit claim (Issue 21): “Benefits” section returns `null` and makes the landing page feel unfinished.

Likely source:
- `src/domains/client/marketing/ui/sections/shop/benefits-section/BenefitsSection.tsx`
- `src/domains/client/marketing/ui/pages/ShopLandingPage.tsx`
- Data passed in: `src/content/home.config.ts` (`slides`)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Evidence (current code):
- `BenefitsSection` only returns `null` when it has **zero valid slides**.
- `ShopLandingPage` passes `homeConfig.slides`, and `src/content/home.config.ts` contains a populated `slides` array (5 items).

Repro:
1) Visit `/`
2) Scroll to the section with id `benefits`
3) Benefits slider renders (cards + swipe UI) when slides are present.

Verified: **NO** (the “stub returns nothing” claim is outdated).

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: `NOT_AN_ISSUE`

Notes:
- If slides ever become empty, the section intentionally hides itself (reasonable fallback), but it is not a stub in the current app.

## Step 4 — Options
- [ ] Option A: (describe)
- [ ] Option B: (describe)
- [ ] (Optional) Option C: (describe)
- [ ] Pick one + rationale (fit with domain architecture).

## Step 5 — Plan
- [ ] Write implementation plan (bullets).
- [ ] Write acceptance criteria (testable).
- [ ] Risks/rollback notes.

## Step 6 — Execute + Validate
- [ ] Implement changes.
- [ ] Validate (tests or best-effort manual checks).
- [ ] Record results and any regressions found.

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

Recorded outcome:
- Marked `NOT_AN_ISSUE` because `BenefitsSection` is implemented and the shop landing provides real slide content.

---

## Evidence / Links

- Code refs:
- `src/domains/client/marketing/ui/sections/shop/benefits-section/BenefitsSection.tsx`
- `src/domains/client/marketing/ui/pages/ShopLandingPage.tsx`
- `src/content/home.config.ts`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `NOT_AN_ISSUE`
- Final notes: Audit claim was from an older state where the section may have been stubbed; current code renders the section when slides are present.
