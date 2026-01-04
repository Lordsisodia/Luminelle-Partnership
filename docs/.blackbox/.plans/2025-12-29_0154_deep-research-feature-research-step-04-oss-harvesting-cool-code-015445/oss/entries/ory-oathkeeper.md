# OSS Project Entry

## Identity

- Name: Ory Oathkeeper
- Repo: https://github.com/ory/oathkeeper
- Full name: ory/oathkeeper
- License: Apache-2.0
- Primary language: Go

## What it gives us (plain English)

- A reverse proxy / access control decision point with pluggable authenticators and authorizers
- Useful as an “edge policy layer” for:
  - artifact viewers
  - Upgrade Review UI
  - internal admin tools
- Provides a structured way to implement:
  - authn (JWT/OIDC)
  - authz checks
  - request mutation (headers) for downstream services

## What feature(s) it maps to

- Fine-grained authorization for internal tooling (artifact access rules)
- Standard auth gateway in front of viewers/services
- Structured access logging at the gateway layer

## Integration notes (vibe-coding lens)

- Stack fit: Strong for “gateway as policy enforcement”.
- Setup friction: Medium. Comparable class to Pomerium; choice depends on ecosystem preference.
- Data model alignment: High when we want consistent auth gateways across many tools.

## Adoption path

- 1 day POC:
  - Deploy Oathkeeper in front of a static report viewer.
  - Configure one policy:
    - allow group=Support to GET `/artifacts/*`
    - allow group=Eng to POST `/resolve-conflicts/*`
  - Verify identity propagation via headers.
- 1 week integration:
  - Standardize gateway policy rules for internal tools.
  - Add structured logs and export via OTel Collector.
  - Integrate with app-level checks (Casbin/OPA) where decisions require DB context.
- 1 month hardening:
  - Add policy management process (review + audit for changes).
  - Add emergency lockdown mechanisms.
  - Add monitoring and alerting (unauthorized access spikes).

## Risks

- Maintenance risk: Medium. Gateway becomes critical; config errors are impactful.
- Security risk: Medium/High. Default-deny is mandatory; misconfig can expose artifacts.
- Scope mismatch: Medium if oauth2-proxy is enough.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/ory/oathkeeper
- https://raw.githubusercontent.com/ory/oathkeeper/master/LICENSE

## Score (0–100) + reasoning

- Score: 58
- Why: Solid gateway/policy primitive, but may overlap with other choices (oauth2-proxy/Pomerium). Best when we want a standardized “policy gateway” pattern.

