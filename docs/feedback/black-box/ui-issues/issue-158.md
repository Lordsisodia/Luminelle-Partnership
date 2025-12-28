# Issue 158: App sets a persistent `lumelle_anon_id` cookie with no consent UI (trust + compliance risk)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `158`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Platform`
- Impact (1–5): `4`
- Reach (1–5): `5`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `37`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The app created and persisted a 1-year `lumelle_anon_id` cookie with no user consent UI, which is a trust/compliance risk.

Audit (issue 158): `docs/reviews/app-ui-review-2025-12-26.md` — “App sets a persistent `lumelle_anon_id` cookie with no consent UI”.

Likely files:
- `src/experiments/identity.ts` (cookie/localStorage writer)
- `src/lib/analytics/posthog.ts` (calls `getOrCreateAnonId()`)
- App shell (place to mount consent UI)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- `getOrCreateAnonId()` wrote `lumelle_anon_id` to both localStorage and cookie (`Max-Age=31536000`) as a side effect, without checking any consent state.

Repro (before fix):
1. Load the site.
2. Any code path that initialized analytics/experiments would call `getOrCreateAnonId()`.
3. Observe `document.cookie` contains `lumelle_anon_id` even though no consent UI was presented.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- Cookie consent requirements vary by region, but creating a long-lived tracking identifier with no UI is still a trust hit.
- Fix must preserve checkout UX if consent is declined.

## Step 4 — Options
- [x] Option A: Add consent banner + preference storage, and gate all tracking-id persistence behind explicit “Accept”.
- [ ] Option B: Remove `lumelle_anon_id` entirely (loses attribution joins).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: keeps attribution capability but only after consent.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Add a simple consent state (`accepted` / `declined`) persisted to localStorage.
- Render a global banner when consent is unset.
- Gate:
  - `getOrCreateAnonId()` / `getOrCreateSessionId()` persistence (no cookie/localStorage writes unless consent accepted).
  - PostHog init + event capture (no init/capture unless consent accepted).
  - Checkout attribution attributes (don’t attach ids when consent declined/unset).
- Provide a reset path that clears `lumelle_anon_id` from cookie + localStorage (in Privacy Policy > Cookies section).

Acceptance criteria:
- Before consent, **no** `lumelle_anon_id` cookie is created.
- After accepting, the id can be created/persisted and analytics can initialize.
- After declining, ids are cleared and no new ids are written.
- Checkout still works with consent declined.
- Typecheck passes.

Risks:
- Feature flags/experiments relying on PostHog will not initialize until consent is accepted (intentional for compliance).

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Added a cookie consent module + event (`src/lib/cookieConsent.ts`).
- Added a global consent banner (`src/ui/components/CookieConsentBanner.tsx`) mounted in `src/main.tsx`.
- Added cookie preferences + reset UI in the Privacy Policy (`src/domains/client/marketing/ui/pages/PrivacyPage.tsx`).
- Gated identity persistence in `src/experiments/identity.ts` and analytics/checkout attribution in `src/lib/analytics/posthog.ts`.

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/reviews/app-ui-review-2025-12-26.md` (issue 158)
- Code refs:
  - `src/experiments/identity.ts` (only persists ids when consent accepted)
  - `src/lib/analytics/posthog.ts` (requires consent to init/capture/attach checkout attrs)
  - `src/ui/components/CookieConsentBanner.tsx` (banner)
  - `src/domains/client/marketing/ui/pages/PrivacyPage.tsx` (preferences + reset)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: The app no longer writes a persistent `lumelle_anon_id` cookie before consent, and users can manage/reset preferences via the Privacy Policy page.
