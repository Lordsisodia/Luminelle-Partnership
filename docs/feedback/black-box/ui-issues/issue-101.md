# Issue 101: Creator “Download brief” CTAs can point to an `example.com` placeholder (broken onboarding resource)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `101`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Creator`
- Impact (1–5): `2`
- Reach (1–5): `3`
- Effort (1–5): `2`
- Confidence (1–3): `3`
- Priority: `16` (=(2×3×3)−2)
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Creator onboarding CTAs (“Download brief”) can send users to a placeholder `example.com` URL when the brief URL env var isn’t configured.

Audit claim (Issue 101): `docs/reviews/app-ui-review-2025-12-26.md` notes `CONTENT_BRIEF_URL` falling back to `https://example.com/lumelle-creator-brief.pdf`, and multiple CTAs linking to it.

Likely files:
- `src/config/constants.ts` (`CONTENT_BRIEF_URL`)
- `src/content/welcome.ts` (welcome steps + resource cards)
- `src/domains/client/marketing/ui/pages/BriefPage.tsx` (brief CTA button)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Evidence:
- `src/config/constants.ts` previously defaulted `CONTENT_BRIEF_URL` to an `example.com` placeholder.
- That value is used by `src/content/welcome.ts` (“Download brief” links) and `BriefPage.tsx` (“Download PDF brief” button).

Repro:
1) Ensure `VITE_CONTENT_BRIEF_URL` is unset.
2) Open `/welcome` or `/brief`.
3) Click “Download brief” / “Download PDF brief” → it points to an unrelated `example.com` URL.

Verified: **YES**

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

- Impact: 2 (onboarding trust hit)
- Reach: 3 (affects creators going through welcome/brief)
- Effort: 2 (safe fallback + CTA adjustment)
- Confidence: 3 (deterministic)
- Decision: **FIX**
- Dependencies: none

## Step 4 — Options
- [x] Option A: Keep placeholder and accept broken links.
- [x] Option B: Remove placeholder; fallback to a first-party brief route and provide a “Request PDF” action when the PDF URL isn’t configured.
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option B**: it keeps onboarding functional even when the PDF isn’t configured and removes the trust-killing placeholder domain.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Replace `example.com` fallback with a safe, first-party fallback (`/brief`).
- Keep `VITE_CONTENT_BRIEF_URL` support for a real PDF via a separate `CONTENT_BRIEF_PDF_URL`.
- Update `BriefPage` CTA: show “Download PDF brief” only when a real PDF URL exists; otherwise show “Request PDF brief”.
- Run `npm run typecheck`.

Acceptance criteria:
- No UI links point to `example.com` for the creator brief.
- `/brief` remains usable even when `VITE_CONTENT_BRIEF_URL` is not set.

Risks / rollback:
- Low; rollback is reverting constant + CTA logic.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- `src/config/constants.ts`: removed `example.com` fallback; added `CONTENT_BRIEF_PDF_URL` and made `CONTENT_BRIEF_URL` fall back to `/brief`.
- `src/domains/client/marketing/ui/pages/BriefPage.tsx`: CTA now adapts (download when configured, “request PDF” otherwise).

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
  - `src/config/constants.ts` (`CONTENT_BRIEF_URL`, `CONTENT_BRIEF_PDF_URL`)
  - `src/domains/client/marketing/ui/pages/BriefPage.tsx` (CTA guard)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Creator onboarding no longer links to a placeholder domain; the brief CTA now stays first-party and degrades gracefully when the PDF isn’t configured.
