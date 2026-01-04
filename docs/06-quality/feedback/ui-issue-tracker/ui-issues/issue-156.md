# Issue 156: Service worker returns `offline.html` for failed asset requests (can break images/JS on flaky networks)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `156`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

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

The service worker returned `offline.html` for failed asset requests, which can send HTML in response to JS/CSS/image fetches and break the app (e.g. “Unexpected token `<`”).

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- In `public/sw.js`, the non-document catch handler returned `OFFLINE_URL`, which is an HTML document.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- This creates hard-to-debug “random broken JS/images” failures on flaky networks.
- Fix is contained to the service worker; no product decision required.

## Step 4 — Options
- [x] Option A: Only serve `offline.html` for navigations/documents, never for assets.
- [x] Option B: Serve a type-appropriate fallback per asset type (image placeholder, etc).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A** (minimal + correct): assets should fail as assets if not cached, not be replaced with HTML.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Detect document navigations vs assets (`request.mode === 'navigate'` / `request.destination`).
- Keep `offline.html` only as the navigation fallback.
- For failed asset requests, return `Response.error()` instead of `offline.html`.

Acceptance criteria:
- Offline navigation returns `offline.html`.
- Offline asset requests do not receive `offline.html` (no HTML responses for scripts/images).

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

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 156)
- Code refs:
  - `public/sw.js` (asset fetch fallback no longer returns `offline.html`)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Service worker now only serves `offline.html` for navigations; assets fail cleanly instead of receiving HTML.
