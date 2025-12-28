# Issue 070: PDP bottom CTA uses static urgency copy (“Last chance today”) regardless of stock/time

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `70`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `NOT_AN_ISSUE`
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

The audit claims the PDP renders a “Last chance today” urgency banner near the bottom CTA as a static string (with no real inventory/time logic to justify it).

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **NO** (on `dev` as of `2025-12-28`).

Audit claim (from `docs/reviews/app-ui-review-2025-12-26.md`):
- “The PDP renders a ‘Last chance today’ banner near the bottom CTA as a static string with no supporting inventory/time logic.”

Current code evidence:
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/SectionsMap.tsx`
  - Bottom CTA section exists (`<section id="pdp-bottom-cta" ...>`), but there is **no** “Last chance today” string or any urgency banner.
  - Copy is neutral (“Ready when you are”, “Keep style frizz-free this week.”) and chips are driven by `config.bottomCtaChips`.

Repo-wide search:
- No matches for “Last chance today” / “last chance” / “urgent” in `src/`.

Repro:
1. Open any PDP.
2. Scroll to the “Bottom CTA just above footer” section.
3. Confirm there is no “Last chance today” urgency banner rendered.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **NOT_AN_ISSUE** (audit finding no longer matches current code).

## Step 4 — Options
- [x] Option A: (describe)
- [x] Option B: (describe)
- [x] Pick one + rationale (fit with domain architecture).

Not applicable (issue is not present).

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Not applicable (issue is not present).

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

No code changes required.

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/SectionsMap.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `NOT_AN_ISSUE`
- Final notes: The audit likely reflected an earlier implementation. On current `dev`, the bottom CTA does not render a “Last chance today” urgency banner, and there’s no supporting stock/time logic needed.
