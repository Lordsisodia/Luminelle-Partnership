# OSS Project Entry

## Identity

- Name: Argo Rollouts
- Repo: https://github.com/argoproj/argo-rollouts
- Full name: argoproj/argo-rollouts
- License: Apache-2.0
- Primary language: Go

## What it gives us (plain English)

- Progressive delivery primitives (Kubernetes-native):
  - canary deployments
  - blue/green deployments
  - automated rollout steps and abort/rollback controls
- A strong reference for how to model:
  - release channels
  - promotion flows
  - rollback as a first-class capability

## What feature(s) it maps to

- Release channels for storefront deployments (preview → staging → production)
- Rollback strategy and gating (promote only after checks pass)
- Operational confidence for managed storefront hosting (if we deploy storefronts on K8s)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Indirect. This is infra-level; valuable only if our hosting stack uses Kubernetes.
- Setup friction (self-host? SaaS? Docker?): High if we’re not already in K8s.
- Data model alignment: Medium. It enforces a good operational model, but it’s optional depending on where/how we host client storefronts.

## Adoption path

- 1 day POC:
  - If we have K8s:
    - Deploy a sample storefront service with Argo Rollouts enabled.
    - Run a blue/green rollout and validate traffic switching and rollback.
  - If we don’t have K8s:
    - Treat as a reference model for our “promotion + rollback” design, not as a dependency.
- 1 week integration:
  - Define release channels and gates:
    - preview deploy on every PR
    - staging promotion after passing smoke tests
    - production promotion after visual diffs approval
  - Add event logging:
    - rollout started/paused/promoted/aborted
    - link to test artifacts and approvals
  - Add on-failure automation:
    - auto abort on high error rate
    - page support team
- 1 month hardening:
  - Formalize SLO-based promotion and automatic rollback policies.
  - Build internal UI: “deployment timeline” and “who approved promotion”.
  - Run incident drills for rollback correctness.

## Risks

- Maintenance risk: Medium. Additional moving parts in cluster ops.
- Security risk: Medium/High. Cluster access, RBAC, supply chain for controllers.
- Scope mismatch: High if we’re not K8s-based (then it’s patterns-only).
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/argoproj/argo-rollouts
- https://raw.githubusercontent.com/argoproj/argo-rollouts/master/LICENSE

## Score (0–100) + reasoning

- Score: 50
- Why: Excellent if we need K8s-grade progressive delivery; otherwise keep as a reference for promotion/rollback modeling.

