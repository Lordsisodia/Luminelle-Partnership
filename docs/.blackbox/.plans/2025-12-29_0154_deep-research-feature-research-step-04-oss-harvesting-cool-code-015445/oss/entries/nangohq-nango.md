# OSS Project Entry

## Identity

- Name: nango
- Repo: https://github.com/NangoHQ/nango
- Full name: NangoHQ/nango
- License: Elastic License 2.0 (ELv2) (source-available; restrictive)
- Stars (approx): 6241
- Forks (approx): 604
- Primary language: TypeScript
- Last updated: 2025-12-30T05:42:21Z
- Topics: access-token, api, api-client, api-integration, api-integrations, integrations, oauth, oauth1, oauth2, product-integration, refresh-token, unified-api

## What it gives us (plain English)

- A managed “connector + OAuth token lifecycle” layer (connections, refresh, provider configs)
- A practical way to accelerate building integrations that require OAuth (and keeping tokens fresh)
- Useful design patterns we can copy even if we can’t adopt the code in production
  - connection model
  - token refresh + rotation
  - provider catalog + scopes
  - sync jobs + error handling conventions

## What feature(s) it maps to

- Integration connector framework (OAuth-heavy)
- Admin UX for managing connections (“Connect your X account”)
- Operational workflows around integrations (reconnect, resync, revoke, rotate secrets)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Fits well with a TS-heavy stack; conceptually aligns with “we manage the app” and operate integrations for clients.
- Setup friction (self-host? SaaS? Docker?): Moderate. It’s a full service with persistence and provider configs.
- Data model alignment: Strong. “Connection” is a first-class object that maps well to per-merchant integrations.

## Adoption path

- 1 day POC:
  - Read `LICENSE` carefully (ELv2 restrictions) and confirm intended usage is permitted.
  - Run Nango locally and connect a single OAuth provider (e.g., Google) to validate auth flow and token refresh.
  - Validate how connections are stored and how secrets are secured in dev.
- 1 week integration:
  - Only proceed if legal/product explicitly accepts ELv2 constraints.
  - Map our “merchant integration” model to Nango “connection” semantics (tenantId, environment, scopes).
  - Decide how to audit integration events (connect/disconnect/refresh failures) into our audit log.
  - Build a wrapper so our app depends on `IntegrationsService`, not Nango directly (escape hatch).
- 1 month hardening:
  - Add secrets governance (rotation, access boundaries, incident response).
  - Add resilience patterns (retries, DLQ, idempotency) for sync jobs and webhook-based workflows.

## Risks

- Maintenance risk: Medium. It’s a platform component with ongoing provider maintenance.
- Security risk: High. OAuth credentials and refresh tokens are sensitive; requires strict controls + auditing.
- Scope mismatch: Medium. Great if OAuth integrations are core; overkill if we only need a couple of API-key integrations.
- License risk: Very High. ELv2 prohibits offering the software as a hosted/managed service that exposes substantial functionality; this may conflict with our “we manage the app for merchant clients” model. Treat as “ideas/patterns” unless explicitly approved.

## Sources

- https://github.com/NangoHQ/nango
- https://raw.githubusercontent.com/NangoHQ/nango/master/LICENSE

## Score (0–100) + reasoning

- Score: 40
- Why: High product value, but ELv2 is a strong blocker for production adoption in a managed-service context; still valuable for learning and pattern borrowing.

---

## Repo description (from GitHub)

Nango is an open-source platform for product integrations (OAuth, APIs).
