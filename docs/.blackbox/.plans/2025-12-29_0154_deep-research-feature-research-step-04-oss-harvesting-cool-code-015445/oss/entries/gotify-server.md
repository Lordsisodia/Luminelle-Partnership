# OSS Project Entry

## Identity

- Name: server
- Repo: https://github.com/gotify/server
- Full name: gotify/server
- License: MIT (logo has separate CC-BY notice; see license proof)
- Stars (approx): 14319
- Forks (approx): 796
- Primary language: Go
- Last updated: 2025-12-28T20:22:16Z
- Topics: api, cloud, free-software, golang, gotify, hosting, javascript, notifications, privacy, react, self-hosted, self-hosting, selfhosted

## What it gives us (plain English)

- A self-hosted notification server with a built-in web UI (plus WebSocket support)
- A simple “push to devices” channel for internal ops and support teams
- A way to deliver alerts without relying on Slack/email for everything (useful for on-call)
- A nice reference for “notification inbox” UX patterns (even if we build our own in-app inbox later)

## What feature(s) it maps to

- Ops alerting (integration failures, webhooks down, job backlogs)
- Support tooling (“notify support when customer X triggers condition Y”)
- Internal admin notifications (non-merchant facing)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Great as a separate service; our backend publishes messages when jobs fail or need attention.
- Setup friction (self-host? SaaS? Docker?): Low–Medium. One service + DB (depending on setup). Docker-friendly.
- Data model alignment: App/user/token model maps cleanly to “internal staff” recipients; less ideal for merchant-facing notifications unless we build tenancy carefully.

## Adoption path

- 1 day POC:
  - Run Gotify locally and create an “Ops” app token.
  - Publish notifications from a dev service on a simulated webhook failure.
  - Validate that messages show up in web UI and via WebSocket/mobile clients.
- 1 week integration:
  - Define alert routing rules (which events become notifications, severity thresholds).
  - Add links from notifications → internal “event log viewer” (correlationId/jobId).
  - Add rate limiting / batching and an escalation path (e.g., forward critical to Slack/email).
  - Lock down access (SSO or strict auth) and network isolate the service.
- 1 month hardening:
  - Add monitoring/backup and runbooks.
  - Ensure no PII/secrets leak into notification payloads.

## Risks

- Maintenance risk: Low–Medium. Simple service, but still needs basic ops/backup and patching.
- Security risk: Medium. Notifications can leak operational details; treat as internal-only.
- Scope mismatch: Medium. This is not a full notification platform (templates/preferences/multi-channel).
- License risk: Low (MIT; note separate CC-BY for logo assets as already flagged in this entry).

## Sources

- https://github.com/gotify/server

## Score (0–100) + reasoning

- Score: 70
- Why: Solid internal notifications channel with minimal friction; best used for ops/support, not as a merchant-facing notification product.

---

## Repo description (from GitHub)

A simple server for sending and receiving messages in real-time per WebSocket. (Includes a sleek web-ui)
