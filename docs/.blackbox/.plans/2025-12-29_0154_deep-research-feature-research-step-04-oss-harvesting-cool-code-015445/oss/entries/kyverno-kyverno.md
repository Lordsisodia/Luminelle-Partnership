# OSS Project Entry

## Identity

- Name: Kyverno
- Repo: https://github.com/kyverno/kyverno
- Full name: kyverno/kyverno
- License: Apache-2.0
- Primary language: Go

## What it gives us (plain English)

- Policy-as-code enforcement with excellent “violation report” UX (Kubernetes-native)
- Even if we don’t run K8s policies for storefronts, Kyverno is a strong pattern source for:
  - policy definitions that are readable
  - policy report objects and dashboards
  - exemption workflows

## What feature(s) it maps to

- Evidence policy enforcement patterns (human-friendly reports)
- “Policy violation timeline” patterns for internal admin
- Escalation path if we run storefront infrastructure on Kubernetes

## Adoption path

- 1 day POC:
  - If we have K8s: install Kyverno and enforce one policy:
    - deny deploying a “viewer” service unless it has oauth2-proxy/IAP enabled
  - If not K8s: read and extract:
    - how Kyverno formats violations
    - how exceptions are managed
  - Translate to a design for “EvidencePolicyViolation” records in our DB.
- 1 week integration:
  - If K8s-based internal tooling:
    - enforce baseline policies for viewer deployments (auth, TLS, headers)
    - export Kyverno reports to our audit/event pipeline
  - If non-K8s:
    - implement Conftest/OPA policies for evidence bundles
    - mirror Kyverno-style reports in our internal UI.

## Risks

- Maintenance risk: Medium/High if adopted operationally (cluster policies).
- Security risk: Low (it improves security), but misconfigured policies can block deployments.
- Scope mismatch: Medium if we are not K8s-heavy; then it’s mostly patterns/reference.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/kyverno/kyverno
- https://raw.githubusercontent.com/kyverno/kyverno/main/LICENSE

## Score (0–100) + reasoning

- Score: 48
- Why: Great policy report patterns; only adopt as a system if we’re already operating Kubernetes-based internal tooling.

