# Issue 128: Welcome onboarding says “Log your launch date” but offers no action to actually do it

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `128`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Creator`
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

The creator welcome/onboarding page includes a step “Log your launch date”, but the step card had no CTA or action to help the user actually do it.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES** (before fix).

Evidence:
- `src/domains/client/marketing/ui/pages/WelcomePage.tsx`
  - Renders `welcomeSteps` as static cards (title + description only).
- `src/content/welcome.ts`
  - Includes step title “Log your launch date”.

Repro:
1. Visit `/welcome`.
2. Scroll to “Your next three moves”.
3. The “Log your launch date” step describes an action, but offers no CTA/link.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**.

Notes:
- This is onboarding UX: every dead-end step increases drop-off.
- We can provide a lightweight action without building a full “launch date” feature by directing users to the existing WhatsApp support flow.

## Step 4 — Options
- [x] Option A: Add a dedicated “launch date” form and persist it (higher effort).
- [x] Option B: Add explicit CTAs to the step cards (WhatsApp invite, brief download, launch date message) using existing links (preferred).
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option B**. It removes the dead-end immediately and matches the page’s “quick start” intent.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Extend `welcomeSteps` content to include optional `action` + `href`.
- Render a CTA button in each step card when action data exists.
- For “Log your launch date”, link to WhatsApp support so the user can send the date to the team.
- Run `npm run typecheck`.

Acceptance criteria:
- The “Log your launch date” step includes a clear CTA button.
- No dead-end steps in the “next three moves” section.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- `src/content/welcome.ts`:
  - Added CTA metadata (`action`, `href`) for each welcome step.
  - “Log your launch date” now links to `WHATSAPP_SUPPORT_URL`.
- `src/domains/client/marketing/ui/pages/WelcomePage.tsx`:
  - Updated step rendering to show an action button per step.

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/content/welcome.ts`
- `src/domains/client/marketing/ui/pages/WelcomePage.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: The welcome onboarding steps now include explicit CTAs, including a direct “Message launch date” action, removing the dead-end onboarding instruction.
