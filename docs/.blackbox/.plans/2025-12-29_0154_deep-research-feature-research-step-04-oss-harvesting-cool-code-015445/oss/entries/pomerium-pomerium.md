# OSS Project Entry

## Identity

- Name: Pomerium
- Repo: https://github.com/pomerium/pomerium
- Full name: pomerium/pomerium
- License: Apache-2.0
- Primary language: Go

## What it gives us (plain English)

- An identity-aware proxy (IAP) for protecting internal apps and routes
- Fine-grained authorization patterns for:
  - “support can view artifacts, engineering can edit/resolve conflicts”
  - per-merchant scoping
  - time-based or claim-based policies (depending on IdP)
- A “step up” from oauth2-proxy when we need more policy control and better internal routing

## What feature(s) it maps to

- Fine-grained access control for artifact/report viewers and Upgrade Review UI
- Centralized policy enforcement at the edge
- Auditable access logs (proxy layer) for “who accessed which evidence”

## Integration notes (vibe-coding lens)

- Stack fit: Strong if we want IAP-style internal tool protection.
- Setup friction: Medium. More complex than oauth2-proxy, but more capable.
- Data model alignment: High if we need role separation and per-merchant scoping for internal tools.

## Adoption path

- 1 day POC:
  - Put Pomerium in front of:
    - an Allure report viewer
    - our internal Upgrade Review UI
  - Validate policy goals:
    - support can view, engineering can view+resolve
    - deny all by default
  - Confirm access logs include enough identity context.
- 1 week integration:
  - Move all internal viewers behind a consistent IAP layer.
  - Define policy patterns:
    - route-level rules
    - group/claim-based access
    - environment scoping (staging vs prod)
  - Emit structured access logs into telemetry (OTel Collector).
- 1 month hardening:
  - Add operational controls:
    - maintenance windows
    - emergency lockdown
  - Build “access audit” dashboards and alerts for unusual access.
  - Integrate with RBAC primitives (Casbin/OPA) if app-level decisions are needed too.

## Risks

- Maintenance risk: Medium. Edge proxy config becomes critical infrastructure.
- Security risk: Medium/High. Misconfig could expose internal tools; must use least privilege and default-deny.
- Scope mismatch: Medium if oauth2-proxy is sufficient.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/pomerium/pomerium
- https://raw.githubusercontent.com/pomerium/pomerium/main/LICENSE

## Score (0–100) + reasoning

- Score: 63
- Why: A more capable IAP layer for fine-grained internal tool access; worth it when oauth2-proxy limitations appear (policy, routing, audits).

