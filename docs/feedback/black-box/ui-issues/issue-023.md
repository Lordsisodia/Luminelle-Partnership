# Issue 023: Newsletter “Get 10% off” form has no submission behavior

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `23`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client` (Shop landing)
- Impact (1–5): `3`
- Reach (1–5): `3`
- Effort (1–5): `2`
- Confidence (1–3): `3`
- Priority: `25`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Restatement: The “Get 10% off your first order” email capture form should subscribe the user and provide a clear success state, but it wasn’t wired up to submit anywhere.

Audit claim (Issue 23): The section renders a `<form>` with no `onSubmit`/`action`, so “Subscribe” does nothing useful.

Likely source:
- `src/domains/client/marketing/ui/sections/shop/email-capture-band/EmailCaptureBand.tsx`
- Related newsletter infrastructure (already used elsewhere): `api/newsletter/subscribe.ts`, `src/ui/components/GlobalFooter.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before):
- The band stored the email in `localStorage` and showed the discount code, but it did **not** submit to the server newsletter endpoint (so it wasn’t a real signup).

Repro (before):
1) Visit `/`
2) Scroll to the “Get 10% off your first order” band
3) Enter an email and press “Subscribe”
4) You’d see the code, but no real signup persisted (no request to `/api/newsletter/subscribe`).

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: `FIX`

Dependencies:
- Requires the `/api/newsletter/subscribe` endpoint to be reachable in the deployed environment (it already exists and is used by the footer signup).

## Step 4 — Options
- [x] Option A: Post to the existing newsletter endpoint + show success state.
- [ ] Option B: No backend — just reveal the code and store a “done” flag.
- [ ] (Optional) Option C: Integrate a 3rd-party ESP (Mailchimp/Klaviyo) directly.
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option A**
- The repo already has `api/newsletter/subscribe.ts` and the footer uses it, so we reuse the same pattern and get real persistence with minimal new surface area.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Add a `loading` state and submit handler that POSTs `{ email, source }` to `/api/newsletter/subscribe`.
- On success:
  - show the discount code + copy button
  - show a friendly confirmation message (“you’re on the list” vs “already on the list”)
  - store a non-PII localStorage flag (`lumelle_email_capture=1`) so the success state persists.
- On failure: show inline error message and allow retry.

Acceptance criteria:
- Submitting the form triggers a POST to `/api/newsletter/subscribe`.
- Success state displays the discount code and “Copy code” button.
- If the email is already subscribed, the UI still shows success and a message indicating that.
- Error state shows a visible message without navigating away.

Risks/rollback:
- If the API is unavailable in some deployments, the UI shows an error message and remains usable (no full page reload). Rollback is simply reverting the fetch call and falling back to local-only behavior.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implementation:
- `src/domains/client/marketing/ui/sections/shop/email-capture-band/EmailCaptureBand.tsx`
  - now POSTs to `/api/newsletter/subscribe`
  - adds `loading` state + inline message handling
  - stores `lumelle_email_capture=1` on success (and reads it on mount)

Validation:
- Best-effort: `npm run typecheck` (recorded in tracker update for this run).
- Manual QA checklist:
  1) On `/`, submit a valid email → success state + code is visible.
  2) Submit the same email again → success state + “already on the list” message.
  3) Temporarily break the endpoint (or simulate `res.ok === false`) → error message shows and form remains on page.

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

Summary:
- Wired the email capture band to the existing newsletter subscribe API and added clear loading/success/error states.
- Persists “already subscribed” UI state via a localStorage flag.

---

## Evidence / Links

- Code refs:
- `src/domains/client/marketing/ui/sections/shop/email-capture-band/EmailCaptureBand.tsx`
- `api/newsletter/subscribe.ts`
- `src/ui/components/GlobalFooter.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: The band now performs a real subscription request and always shows a clear result state (success or error) without page reload.
