# Evidence Extract — GitHub

- slug: `github`
- category: approvals + protected actions + step-up auth (adjacent governance primitives)
- license: SaaS / proprietary

## Cycle 6 — Evidence-backed primitives (sudo-mode step-up + protected actions + required reviewers)

### Notable features (3)

1) “Sudo mode” re-authentication before sensitive actions (step-up auth pattern)  
Evidence: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/sudo-mode

2) Protected branches as “policy gates” for sensitive changes (rules like blocking force pushes, etc.)  
Evidence: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches

3) Environments + deployment protection rules, including required reviewers (approval gate)  
Evidence: https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments

### Copyable workflows (2)

1) Step-up for destructive actions: user attempts sensitive action → prompt re-auth (password/2FA/passkey) → allow action for limited time  
Evidence: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/sudo-mode

2) Approval gate for production: set “required reviewers” for a protected target → request deploy/change → reviewers approve → action proceeds  
Evidence: https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments

### 3 steal ideas (easy / medium / hard)

- Easy: add “re-auth required” prompts for high-risk admin actions (refund > threshold, disconnect integration, rotate keys).
- Medium: implement “protected targets” with required approvers (payout settings, tax settings, production integrations).
- Hard: generalized policy engine with complex conditions (time windows, branch-like rules) — start with a small fixed policy set.

### Thin-slice implementation (1–3 days)

- Day 1: add “step-up session” primitive: require re-auth for sensitive actions, cache for 1–2 hours, reset timer on each sensitive action.
- Day 2: add “required reviewers” for a small set of actions (e.g., payouts/bank changes, integration disconnect, key rotation).
- Day 3: add approval inbox + immutable audit events for approvals/denials.

