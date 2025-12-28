# Issue 008: In-page section nav is defined but not rendered (users can’t jump to “Reviews / FAQ / …”)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `8`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `NOT_AN_ISSUE`
- Area: `Client` (PDP)
- Impact (1–5): `2`
- Reach (1–5): `3`
- Effort (1–5): `3`
- Confidence (1–3): `3`
- Priority: `15` (verified, but already implemented)
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Restatement: The audit claims the product page defines in-page section nav items (Reviews/FAQ/etc.) but never renders a section nav, making it harder to jump around long PDPs.

Audit claim (Issue 8): `navItems` exist (ids like `#reviews`, `#faq`) but there is no UI to navigate to them.

Likely source:
- `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx` (defines + passes `navItems`)
- `src/layouts/MarketingLayout.tsx` (renders nav when `navItems` are provided)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Evidence (current code):
- `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx` defines `navItems` for `media/details/reviews/faq` and passes them to `MarketingLayout`.
- `src/layouts/MarketingLayout.tsx` renders a “Page sections” `<nav>` when `navItems.length > 0`, and the buttons smooth-scroll to the matching element ids.

Repro:
1) Visit any PDP `/product/:handle`
2) Observe the “Page sections” nav under the header
3) Click “Reviews” → page scrolls to `#reviews` (with a header offset)

Verified: **NO** (audit claim is outdated; the section nav is already implemented).

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: `NOT_AN_ISSUE`

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
- Marked `NOT_AN_ISSUE` because `MarketingLayout` already renders the in-page section nav when `navItems` are provided.

---

## Evidence / Links

- Code refs:
- `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx`
- `src/layouts/MarketingLayout.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `NOT_AN_ISSUE`
- Final notes: Audit claim is outdated; section nav is already rendered and functional (smooth-scroll to anchors).
