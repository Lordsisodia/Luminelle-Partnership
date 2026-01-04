# Evidence Extract — GitHub Actions

- slug: `github-actions`
- category: workflow automation (developer CI/CD + automation platform primitives)
- license: proprietary platform (docs); many actions are OSS but vary by repo (treat as ecosystem pattern)

## Notable features (3)

1) Starter workflow templates (scaffold YAML workflows quickly)  
Evidence: https://docs.github.com/en/actions/using-workflows/using-starter-workflows

2) Reusable workflows (compose / share workflows across repos)  
Evidence: https://docs.github.com/en/actions/learn-github-actions/reusing-workflows

3) Marketplace actions as a reusable step ecosystem  
Evidence: https://github.com/marketplace?type=actions

## Copyable workflows (2)

1) Template → customize → run → iterate
- Pick a starter workflow → commit → observe runs → adjust steps and triggers  
Evidence: https://docs.github.com/en/actions/using-workflows/using-starter-workflows

2) Compose automations with reusable building blocks
- Create a shared/reusable workflow → call it from multiple workflows (standardize)  
Evidence: https://docs.github.com/en/actions/learn-github-actions/reusing-workflows

## 3 steal ideas (easy / medium / hard)

- Easy: templates gallery + “start from template” flow for common automations (refund approval, fraud review, inventory alert).
- Medium: reusable “sub-workflows” / “building blocks” (e.g., `SendSlack`, `CreateCase`, `IssueRefund`) with versioning.
- Hard: marketplace/ecosystem of third-party steps (trust + security + compatibility).

## Thin-slice implementation (1–3 days)

- Day 1: ship 10 automation templates (pre-filled trigger/action/approval/run log defaults).
- Day 2: ship “shared steps” library (reusable subflows) with version tags.
- Day 3: add run detail + step logs + “copy template → create new rule” workflow.

