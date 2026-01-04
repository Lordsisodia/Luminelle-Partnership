---
status: active
last_reviewed: 2025-12-28
owner: team
---

# 🗣️ Read-Aloud Status Update (30–60 seconds)

Use this when an agent needs to communicate progress to a human quickly (voice/chat/Slack).

## 1) One-line headline

“Today I’m working on **<goal>** and I just **<key result>**, which matters because **<why>**.”

## 2) Where we are (stage)

“I’m currently in **<Align | Plan | Research | Execute | Verify | Wrap>**.”

## 3) What’s done (3 bullets max)

- ✅ <done thing 1> (evidence: `<file path>`)
- ✅ <done thing 2> (evidence: `<file path>`)
- ✅ <done thing 3> (evidence: `<file path>`)

## 4) What’s next (3 bullets max)

- ➡️ <next thing 1>
- ➡️ <next thing 2>
- ➡️ <next thing 3>

## 5) Decision needed (only if required)

“I need one decision to proceed: **<question>**. My recommendation is **<option>** because **<reason>**.”

## 6) Memory checkpoint (required)

After you send this update:

```bash
# If you're in repo root:
./docs/.blackbox/scripts/new-step.sh --plan docs/.blackbox/.plans/<run> "Update sent: <headline>"

# If you're already in `docs/`:
./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<run> "Update sent: <headline>"
```
