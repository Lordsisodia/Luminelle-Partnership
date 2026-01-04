---
status: draft
last_reviewed: YYYY-MM-DD
owner: team-or-person
---

# Agent Update Template (what the agent “says”)

Use this when an agent needs to communicate progress to a human (Slack/Telegram/PR comment/etc.).

## 1) 1-line summary

`<What changed + why it matters>`

## 2) Current stage

`Align | Plan | Research | Execute | Verify | Wrap`

## 3) What’s done (3–7 bullets)

- …

## 4) What’s next (3–7 bullets)

- …

## 4b) Confidence + risk (optional, recommended)

- Confidence: `low | medium | high` (1 line why)
- Main risk(s): 1–3 bullets

## 5) Decisions needed (if any)

1) …
2) …

## 6) Where the outputs live

- Plan folder: `docs/.blackbox/.plans/<run>/`
- Key artifacts:
  - `docs/.blackbox/.plans/<run>/artifacts/<file>.md`
  - `docs/0X-<category>/<path>.md`

## 7) Memory checkpoint (required for long runs)

After sending the update, the agent should write a step file:

```bash
./docs/.blackbox/scripts/new-step.sh --plan docs/.blackbox/.plans/<run> "Update sent: <what changed>"
```

If the agent is feeling “context pressure”, compact early:

```bash
./docs/.blackbox/scripts/compact-context.sh --plan docs/.blackbox/.plans/<run>
```
