# Issue 121: WhatsApp CTAs are inconsistent (and one is mislabeled): “Message WhatsApp” points to a group invite link

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `121`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `NOT_AN_ISSUE`
- Area: `Creator`
- Impact (1–5): `2`
- Reach (1–5): `3`
- Effort (1–5): `2`
- Confidence (1–3): `3`
- Priority: `16` (audit was outdated)
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Restatement: CTAs that say “Message WhatsApp” should link to a 1:1 support chat, while “Join WhatsApp” should link to the creator group invite — and these should be labeled consistently.

Audit claim (Issue 121): The brief page has a CTA labeled “Message WhatsApp” but it links to a WhatsApp group invite URL (misleading) and WhatsApp destinations vary unpredictably.

Likely sources:
- `src/config/constants.ts` (`WHATSAPP_INVITE_URL`, `WHATSAPP_SUPPORT_URL`)
- `src/domains/client/marketing/ui/pages/BriefPage.tsx` (“Message WhatsApp” CTA)
- `src/content/welcome.ts` / creator onboarding surfaces (invite CTAs)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Evidence (current code):
- `src/domains/client/marketing/ui/pages/BriefPage.tsx` renders a “Message WhatsApp” CTA that links to `WHATSAPP_SUPPORT_URL` (the 1:1 support chat), and opens in a new tab (`target="_blank"` + `rel="noreferrer"`).
- “Join WhatsApp” CTAs (welcome + creators) correctly use `WHATSAPP_INVITE_URL` and are labeled as “Join WhatsApp”.

Repro:
1) Visit `/brief` and click “Message WhatsApp” → opens the support WhatsApp link in a new tab.
2) Visit `/creators` and click “Join WhatsApp” → opens the WhatsApp invite link in a new tab.

Verified: **NO** (audit claim is outdated).

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
- Marked `NOT_AN_ISSUE` because “Message WhatsApp” already links to the support chat URL, and “Join WhatsApp” already links to the invite URL with correct labeling.

---

## Evidence / Links

- Code refs:
- `src/domains/client/marketing/ui/pages/BriefPage.tsx`
- `src/domains/creator/ui/pages/CreatorsPage.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `NOT_AN_ISSUE`
- Final notes: The mislabeled CTA described in the audit is not present in current code; WhatsApp links are split by intent and labeled accordingly.
