# OSS Project Entry

## Identity

- Name: oauth2-proxy
- Repo: https://github.com/oauth2-proxy/oauth2-proxy
- Full name: oauth2-proxy/oauth2-proxy
- License: MIT (per LICENSE file)
- Primary language: Go

## What it gives us (plain English)

- A battle-tested reverse proxy that protects internal web UIs behind OAuth/OIDC
- Very useful for artifact/report viewers:
  - Allure reports
  - Unlighthouse UI
  - internal “Upgrade Review UI” endpoints
- Lets us enforce:
  - authentication
  - session management
  - allowlists (emails/domains/groups) depending on IdP config

## What feature(s) it maps to

- Access control for artifact/report viewers (support/engineering-only)
- Secure sharing of upgrade evidence links
- Reduced risk of leaking PII artifacts publicly

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Excellent as infrastructure glue. Works with any backend and integrates with common IdPs.
- Setup friction (self-host? SaaS? Docker?): Low/Medium. Straightforward to deploy; main work is correct IdP config.
- Data model alignment: High for “internal tools” posture.

## Adoption path

- 1 day POC:
  - Deploy oauth2-proxy in front of a static artifact viewer (e.g., a static Allure report).
  - Configure login against our IdP and verify:
    - only allowed users can access
    - session cookies are secure
  - Confirm that deep links (shareable URLs) work after login.
- 1 week integration:
  - Standardize “artifact viewer protection” pattern:
    - oauth2-proxy in front of every viewer service
    - consistent headers for user identity
  - Integrate with audit logging:
    - log artifact access events (user, URL, timestamp)
  - Add stricter controls:
    - IP allowlists for sensitive environments
    - separate roles for support vs engineering.
- 1 month hardening:
  - Add rate limiting / WAF controls in front.
  - Ensure correct logout/session expiry.
  - Add emergency “lockdown” switch for incidents.

## Risks

- Maintenance risk: Low/Medium.
- Security risk: Medium. Misconfig can expose internal reports; must treat configs as security-critical.
- Scope mismatch: Low. This is a standard, low-cost way to secure internal viewers.
- License risk: Low (MIT).

## Sources

- https://github.com/oauth2-proxy/oauth2-proxy
- https://raw.githubusercontent.com/oauth2-proxy/oauth2-proxy/master/LICENSE

## Score (0–100) + reasoning

- Score: 79
- Why: High-leverage, low-effort control plane for securing artifact/report viewers; directly reduces data leakage risk.

