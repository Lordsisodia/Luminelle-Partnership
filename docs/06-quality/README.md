# ✅ 06-quality

Docs for quality: feedback loops, reviews, incident notes, and UI archives.

Quality is where we keep the stuff that prevents “we shipped fast but forgot what broke”.

## 📁 Sections

- 🧾 `feedback/` — client/internal feedback + trackers
- 🔍 `reviews/` — UI reviews, audits, analysis artifacts
- ✅ `runbooks/` — checklists for quality work (reviews, triage, etc.)
- 🚨 `incidents/` — breaking issues / incident writeups
- 🗃️ `ui-archive/` — screenshots/archived UI experiments

## 🧭 How to use this folder (practical)

### 🧾 Feedback

Use `feedback/` when you want to capture:
- what users said
- what we observed
- what we’re going to change next

Recommended structure for a new feedback note:
1) Context (who/where)
2) Observations (bullets)
3) Impact (what it breaks, who it affects)
4) Next actions (3–10 tasks)

### 🔍 Reviews

Use `reviews/` for audits like:
- admin UX review
- performance review
- “what feels confusing?” pass

When possible, link to evidence (screenshots or snapshots).

### 🚨 Incidents

Use `incidents/` for “something is broken” writeups.

Minimum:
1) What happened
2) Impact
3) Root cause (if known)
4) Fix / mitigation
5) Follow-ups (so it doesn’t recur)

### ✅ Runbooks

Runbooks are checklists that should be safe to follow at 2am.

Template:
- `docs/07-templates/library/templates/runbook-template.md`

### 🗃️ UI Archive

Keep old UI states here (screenshots, notes) when they’re useful for:
- comparing progress
- reusing ideas later

## 📏 Structure rules (quick reminder)

- Keep **6–10 direct child folders** max per directory (add grouping folders instead).
- Do **not** create nested `.blackbox/` folders inside `06-quality/`.
