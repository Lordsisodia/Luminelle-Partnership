# Issue 073: Homepage hero social proof is hard-coded (rating + “Trusted by 10k”) instead of data-driven

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `73`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `4`
- Reach (1–5): `4`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `29`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Homepage hero social proof was showing a hard-coded “Trusted by 10k” claim and static rating label, which reads as made-up when not backed by real data.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- `src/content/home.config.ts` set `socialProof.count = 10000` and `tagline = 'Trusted by 10k users'`.
- `ShopLandingPage` passed a hard-coded rating label format (e.g. `(100+)`) regardless of the count source.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- Social proof is a high-trust surface; if it feels fabricated it hurts conversion.
- We don’t have a live reviews data source here, so the best move is to use a single internal source-of-truth and avoid precise, unverified claims.

## Step 4 — Options
- [x] Option A: Use product config rating/count label and remove “Trusted by 10k” claim.
- [x] Option B: Wire up a real reviews backend and drive this from live data.
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A** (truthful + consistent today; doesn’t require new infrastructure).

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Drive hero rating/count label from the shower cap product config overrides.
- Replace the hero trust tagline with a non-quantified, product-true statement.

Acceptance criteria:
- Home hero no longer claims “Trusted by 10k”.
- Home hero rating label is consistent with PDP rating/count label for the main product.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 73)
- Code refs:
  - `src/domains/client/marketing/ui/pages/ShopLandingPage.tsx` (hero social proof now uses product config + safer tagline)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Removed the unverified “Trusted by 10k” claim and aligned hero social proof with the PDP config values.
