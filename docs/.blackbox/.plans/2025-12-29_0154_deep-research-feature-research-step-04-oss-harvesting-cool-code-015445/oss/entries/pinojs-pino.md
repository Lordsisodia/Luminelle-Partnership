# OSS Project Entry

## Identity

- Name: Pino
- Repo: https://github.com/pinojs/pino
- Full name: pinojs/pino
- License: MIT
- Primary language: JavaScript/TypeScript

## What it gives us (plain English)

- A fast structured logger for Node with built-in redaction capabilities
- Practical for preventing secrets/PII from entering logs at the source:
  - redact keys like `authorization`, `cookie`, `password`, `accessToken`
  - avoid writing sensitive values into evidence bundles
- Useful for both:
  - storefront generator services
  - internal admin/support tooling services

## What feature(s) it maps to

- Log redaction at source (before logs reach artifacts/telemetry)
- “No secrets in evidence” policy enforcement
- Consistent structured logging for audit/event pipelines

## Integration notes (vibe-coding lens)

- Stack fit: Excellent for TS/Node services.
- Setup friction: Low. Requires a standard “redaction config” and conventions for sensitive keys.
- Data model alignment: High: structured logs are also easier to export into OTel Collector.

## Adoption path

- 1 day POC:
  - Add Pino to one service that emits logs used in upgrade evidence (e.g., upgrade worker).
  - Configure redaction for:
    - auth headers/cookies
    - tokens/secrets fields
    - user PII fields (email, phone) if they could appear
  - Verify redaction works for nested keys and arrays.
- 1 week integration:
  - Standardize a shared logger package:
    - one redaction config
    - consistent fields: `merchantId`, `templateVersion`, `runId`, `requestId`
  - Add CI checks:
    - unit tests that assert common secrets are always redacted
  - Feed logs into OTel pipeline and confirm “redacted at source” is preserved.
- 1 month hardening:
  - Expand redaction policy:
    - denylist for sensitive keys
    - allowlist for safe logged fields
  - Add “privacy mode” toggles for more aggressive scrubbing in production environments.
  - Add audit events when redaction config changes (change management).

## Risks

- Maintenance risk: Low.
- Security risk: Medium if misconfigured; redaction must be tested and enforced.
- Scope mismatch: Low. This is a standard “do it right early” primitive.
- License risk: Low (MIT).

## Sources

- https://github.com/pinojs/pino
- https://raw.githubusercontent.com/pinojs/pino/main/LICENSE

## Score (0–100) + reasoning

- Score: 78
- Why: Cheap, high-leverage way to prevent sensitive data from entering logs and evidence artifacts; pairs extremely well with Gitleaks + access control.

