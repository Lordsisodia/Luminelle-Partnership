# Issue 090: Footer “Stay in the loop” CTA is a `mailto:` link (not a real signup; breaks expectation on many devices)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `90`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
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

The footer “Stay in the loop” action looks like a newsletter signup CTA, but it actually opens a `mailto:` link, which is high-friction and often breaks user expectations (especially on mobile).

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES** (before fix).

Evidence (before fix):
- `src/ui/components/GlobalFooter.tsx` rendered the “Get style tips & launches” CTA as:
  - `href="mailto:creators@lumellebeauty.co.uk?subject=Join%20Lumelle%20List"`

Repro:
1. Scroll to the site footer.
2. Click “Get style tips & launches”.
3. Browser tries to open an email client (often fails or feels unexpected); there is no in-app signup.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**.

Notes:
- Capturing emails is a common, high-reach surface; the UX needs to behave like a signup.
- We can implement a minimal in-app form without choosing a full ESP (Mailchimp/Klaviyo) yet, by storing signups in the project DB for later export.

## Step 4 — Options
- [x] Option A: Keep `mailto:` but change the copy to be honest (“Email us to join the list”).
- [x] Option B: Replace with an in-app email capture form and persist to the database (preferred).
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option B**. It matches the user’s mental model (“signup”), avoids context-switching to an email client, and creates a real dataset the team can use.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Add a POST endpoint `/api/newsletter/subscribe` that:
  - validates email
  - inserts into a `newsletter_signups` table (creates table if missing)
  - returns `{ ok: true, created: boolean }`
- Replace the footer mailto CTA with a small email + submit form that calls the endpoint.
- Show success/error feedback inline.
- Run `npm run typecheck`.

Acceptance criteria:
- Footer has an in-app email field and no longer opens a mail client.
- Submitting a valid email returns success feedback.
- Submitting an already-subscribed email still returns a friendly message.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- `api/newsletter/subscribe.ts`: new POST endpoint that stores signups in `public.newsletter_signups` via `DATABASE_URL`.
- `src/ui/components/GlobalFooter.tsx`: replaced the mailto CTA with an email form that posts to `/api/newsletter/subscribe` and shows inline status messages.

Validation:
- `npm run typecheck` ✅

Manual QA checklist:
1. Open any page and scroll to the footer.
2. Enter an email and submit → shows “Thanks — you’re on the list.”
3. Submit the same email again → shows “You’re already on the list.”
4. Simulate API failure (e.g., block `/api/newsletter/subscribe`) → shows error message.

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/ui/components/GlobalFooter.tsx`
- `api/newsletter/subscribe.ts`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Footer newsletter CTA is now a real in-app signup (no `mailto:`), with basic persistence so the team can export the list later.
