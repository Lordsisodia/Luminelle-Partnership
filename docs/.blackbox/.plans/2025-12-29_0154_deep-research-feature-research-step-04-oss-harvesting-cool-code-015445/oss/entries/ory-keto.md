# OSS Project Entry

## Identity

- Name: Ory Keto
- Repo: https://github.com/ory/keto
- Full name: ory/keto
- License: Apache-2.0
- Primary language: Go

## What it gives us (plain English)

- A Zanzibar-style permission system (relationship-based access control)
- Useful if artifact access rules become complex:
  - per-merchant scoping
  - delegated access (support temporarily delegated to a merchant)
  - “can view evidence for merchant X but not Y”
- Provides a service-level model rather than embedding authorization in each app

## What feature(s) it maps to

- Fine-grained authorization for artifact access and upgrade review actions
- Delegation workflows (“support access granted for 24h”)
- Auditability of permission relationships over time (who granted access)

## Integration notes (vibe-coding lens)

- Stack fit: Medium/High. Adds a service to operate; best when authorization needs outgrow simple RBAC.
- Setup friction: Medium/High (service + data model).
- Data model alignment: High when we have many tenants and complex sharing/delegation requirements.

## Adoption path

- 1 day POC:
  - Model a minimal relationship schema:
    - `user:alice` is `support_for` `merchant:123`
    - `role:support` can `view` `artifact:merchant:123:*`
  - Evaluate queries from the Upgrade Review UI (“can this user view this artifact?”).
  - Decide whether the complexity is warranted vs Casbin.
- 1 week integration:
  - Integrate into internal tooling:
    - Upgrade Review UI checks Keto for view/download permissions
    - gateway layer (Oathkeeper/Pomerium) enforces based on Keto decisions
  - Add delegation flows:
    - temporary access grants
    - revoke workflows
  - Emit audit events for relationship changes.
- 1 month hardening:
  - Build a permission admin UI (who has access to what merchant artifacts).
  - Add monitoring and alerting for unusual auth decisions.
  - Add data retention and compliance policies.

## Risks

- Maintenance risk: Medium/High. Another critical service.
- Security risk: Medium/High. Mis-modeled relationships can grant unintended access; requires careful schema and testing.
- Scope mismatch: Medium if simple RBAC is sufficient.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/ory/keto
- https://raw.githubusercontent.com/ory/keto/master/LICENSE

## Score (0–100) + reasoning

- Score: 55
- Why: Powerful when you need Zanzibar-style authz and delegation, but heavier than Casbin; adopt only if the access model truly needs it.

