# Agent: <agent-name>

## Purpose
<What this agent does, in one sentence>

## Trigger (when to use)
- <Example trigger 1>
- <Example trigger 2>

## Inputs
- <What the agent needs to run well>

## Outputs
- <What files it creates/updates and where>

## Guardrails
- Don’t write secrets.
- Prefer small, verifiable steps.
- Record artifacts explicitly.

## Run loop
1) Read `../context.md`
2) Check `../tasks.md`
3) Create a plan under `../.plans/` if multi-step
4) Execute and record artifacts
5) Update `../tasks.md` + append to `../journal.md`

