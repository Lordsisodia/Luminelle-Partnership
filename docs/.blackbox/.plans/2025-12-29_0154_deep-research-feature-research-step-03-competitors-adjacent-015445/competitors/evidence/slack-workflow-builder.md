# Evidence Extract — Slack Workflow Builder

- slug: `slack-workflow-builder`
- category: lightweight workflow automation (human-first, in-chat)
- license: proprietary (SaaS)
- evidence note: Slack Help Center pages appear heavily JS-rendered; the HTML response exposes reliable meta descriptions but not full article body in plain HTML (treat as partial/blocked evidence).

## Notable features (3)

1) Workflow Builder as an in-product workflow creation surface (workflows automate tasks in Slack)  
Evidence: https://slack.com/help/articles/17542172840595-Build-a-workflow--Create-a-workflow-in-Slack

2) Governance knob: who can create workflows (default + admin/owner control)  
Evidence: page meta description indicates “By default, anyone on a paid plan can create workflows … owners/admins can limit” on: https://slack.com/help/articles/17542172840595-Build-a-workflow--Create-a-workflow-in-Slack

3) “Workflow as a collaboration object” concept (created, edited, and used inside the team tool)  
Evidence: https://slack.com/help/articles/17542172840595-Build-a-workflow--Create-a-workflow-in-Slack

## Copyable workflows (2)

1) Self-serve operational workflows
- Create a workflow for a repeated team task (e.g., request a refund approval, triage a customer issue) and run it where work already happens (chat).  
Evidence: https://slack.com/help/articles/17542172840595-Build-a-workflow--Create-a-workflow-in-Slack

2) Admin-enforced guardrails
- Restrict who can create workflows, keeping the surface safe for non-admin teams.  
Evidence: https://slack.com/help/articles/17542172840595-Build-a-workflow--Create-a-workflow-in-Slack

## 3 steal ideas (easy / medium / hard)

- Easy: bring workflow creation to where the operator already works (embedded in the admin UI, not a separate “automation product”).
- Medium: “who can create automations” as a clear admin toggle (guardrails for sprawl).
- Hard: deep in-context UX + distribution across team touchpoints (Slack’s native advantage).

## Thin-slice implementation (1–3 days)

- Day 1: “Create automation” button in primary admin surfaces (Orders, Refunds, Inventory) with prefilled templates.
- Day 2: add admin toggle: who can create automations (roles) + default restrictions.
- Day 3: add “share template” flow within the team (copy/duplicate + audit trail).

