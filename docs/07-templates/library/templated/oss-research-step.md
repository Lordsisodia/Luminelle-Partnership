---
status: active
last_reviewed: 2025-12-28
owner: team
---

# OSS Research — Single Step Template

Use this when an agent is harvesting OSS and needs **one step = one file**.

## 🧭 Stage + timebox (required)

- Stage: `<Align | Plan | Research | Execute | Verify | Wrap>`
- Timebox: `<30–60 minutes>` (default: 45 minutes)

## ✅ Step goal (one sentence)

<Example: Deepen top 5 OSS repos into integration-ready adoption plans.>

## 📥 Inputs

- OSS deepening queue: `<path>`
- OSS entries dir: `<path>`

## 🧭 Steps (do in order)

1) Pick the next N repos (`N=3–10`) from the deepening queue.
2) For each repo:
   - confirm license status (per repo, not just API metadata)
   - identify the “thin slice” we can integrate
   - write a 1-day POC plan (minimum)
   - write a 1-week integration plan (scoped)
   - list risks (security, maintenance, scope mismatch, license)
3) Map each repo to 1–3 features we care about.
4) Update the shortlist rankings if the evidence changes the score.

## ⚡ Efficiency guardrails (do not skip)

- Stop at `N` even if you find more repos (append them to the queue instead).
- Prefer repos with permissive licenses (MIT/Apache/BSD) unless explicitly approved.
- If the license is unclear (`NOASSERTION`, dual-license language, “Commons Clause”, “BUSL”, “ELv2”, “SUL”):
  - record “license unclear” and move on until verified
  - don’t recommend adoption without a verified license note

## 📦 Outputs

- Updated OSS entries: `<paths>`
- Updated shortlist or notes: `<paths>`

## 🧪 Verification (quick)

- Each updated entry includes:
  - a concrete 1-day plan
  - a concrete 1-week plan
  - a license note

## 🧠 Memory snippet (3–7 bullets)

- <Durable takeaways>
