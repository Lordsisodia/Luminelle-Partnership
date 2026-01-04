# Evidence Extract — GitLab

- slug: `gitlab`
- category: approvals + protected actions (adjacent governance primitives)
- license: MIT outside `ee/` (per repository LICENSE)

## Cycle 6 — Evidence-backed primitives (merge request approvals + protected branches)

### Notable features (3)

1) Merge request approvals (optional or required) as a configurable governance primitive  
Evidence: https://docs.gitlab.com/user/project/merge_requests/approvals/

2) Protected branches as protected actions with explicit policy controls  
Evidence: https://docs.gitlab.com/user/project/protected_branches.html

3) OSS license posture is permissive outside enterprise directories (useful as reference/adoption candidate, pending scope)  
Evidence: https://gitlab.com/gitlab-org/gitlab/-/raw/master/LICENSE

### Copyable workflows (2)

1) Sensitive change gate: require approvals → reviewer(s) approve → allow merge / apply change  
Evidence: https://docs.gitlab.com/user/project/merge_requests/approvals/

2) Restrict destructive actions: protect a branch (or analogous “resource”) → only allow certain roles to push/modify  
Evidence: https://docs.gitlab.com/user/project/protected_branches.html

### 3 steal ideas (easy / medium / hard)

- Easy: “approval rules” UI for risky admin actions (who must approve, how many approvals).
- Medium: “protected resources” registry (e.g., payout settings, tax settings, production integrations) with per-resource protection settings.
- Hard: fully flexible policy DSL; start with templates (two-person approval, finance approval, security approval).

### Thin-slice implementation (1–3 days)

- Day 1: add approvals as a reusable primitive (request → approve/deny → audit event).
- Day 2: add protected resources list + require approvals for changes to a small set of resources.
- Day 3: add permission checks + notifications for pending approvals.

## License evidence

- MIT outside `ee/`: https://gitlab.com/gitlab-org/gitlab/-/raw/master/LICENSE

