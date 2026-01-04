---
status: draft
last_reviewed: YYYY-MM-DD
owner: team-or-person
---

# Runbook: <task>

## 🎯 When to use

What triggers this runbook.

## ✅ Inputs (before you start)

- Access needed (accounts, env vars)
- Links needed (docs, dashboards)
- Preconditions (feature flag, deployed version, etc.)

## 🧭 Stages (step-by-step)

### 1) Prepare

- [ ] Confirm environment and scope
- [ ] Identify risk area(s)

## 🛑 Stop conditions (to avoid wasting time)

Stop and ask for a decision if:
- [ ] Required input is missing (access, credentials, scope)
- [ ] There are conflicting goals (e.g. speed vs compliance)
- [ ] The next action is “search more” without a hypothesis

### 2) Execute

1) …
2) …
3) …

### 3) Verify

- Expected results:
- Smoke checks:

### 4) Close out

- [ ] Record outcomes
- [ ] Link artifacts (logs, screenshots, PRs)
- [ ] Create follow-up tasks if needed

## 🧠 Memory checkpoint (for long runs)

If this runbook is executed by an agent over hours, write a step file:

```bash
./docs/.blackbox/scripts/new-step.sh --plan docs/.blackbox/.plans/<run> "Checkpoint: <what changed>"
```

## 🧯 Rollback / Recovery

What to do if something goes wrong.

## 🧩 References

- Related docs
