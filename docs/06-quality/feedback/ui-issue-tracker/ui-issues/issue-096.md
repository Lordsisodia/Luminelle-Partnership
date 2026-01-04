# Issue 096: PDP “Hero proof strip” trust claims are hard-coded (including “Source: TikTok Shop + verified store reviews”)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `96`
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

The PDP “proof strip” included hard-coded trust claims (notably “Source: TikTok Shop + verified store reviews”) and default proof bullets that weren’t backed by a real data source.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- `HeroProofStrip` rendered a hard-coded “Source: TikTok Shop + verified store reviews” line regardless of product/review source.
- Default facts included specific claims (e.g., “48 hrs ship time”) without being tied to real shipping rules.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- This sits directly under the buy flow; “fake-feeling” trust claims can tank conversion.
- We don’t have a verified reviews/shipping source wired into this component yet, so defaults should be conservative and non-quantified.

## Step 4 — Options
- [x] Option A: Remove the unverified “Source” line and soften default facts (no precise shipping promises).
- [x] Option B: Wire the strip to a real reviews/shipping data source before making claims.
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A** to immediately remove the highest-risk trust claim and reduce the chance of misleading defaults.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Remove the hard-coded “Source: …” copy from `HeroProofStrip`.
- Replace overly-specific default proof bullets with safer, product-agnostic defaults.

Acceptance criteria:
- PDP no longer shows “Source: TikTok Shop + verified store reviews” unless explicitly provided by real data (not implemented yet).
- Default proof bullets avoid hard promises like “48 hrs ship time”.

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

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 96)
- Code refs:
  - `src/domains/client/shop/products/ui/sections/hero-proof-strip/HeroProofStrip.tsx` (removed “Source” claim + softened defaults)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Removed the unverified “Source” line and replaced brittle default trust bullets with safer copy.
