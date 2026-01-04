# OSS Project Entry

## Identity

- Name: activepieces
- Repo: https://github.com/activepieces/activepieces
- Full name: activepieces/activepieces
- License: Mixed (MIT Expat + “EE” directories under separate license)
- Stars (approx): 20075
- Forks (approx): 3098
- Primary language: TypeScript
- Last updated: 2025-12-28T20:33:45Z
- Topics: ai-agent, ai-agent-tools, ai-agents, ai-agents-framework, mcp, mcp-server, mcp-tools, mcps, n8n-alternative, no-code-automation, workflow, workflow-automation, workflows

## What it gives us (plain English)

- A self-hostable workflow automation platform (Zapier/n8n-like) with many connectors
- A UI for building flows (triggers + actions) and running them on a schedule or events
- A way to accelerate “integration glue” without building a bespoke workflow UI from scratch
- A connector/piece model that can be extended to talk to our own APIs
- Potentially useful as an internal ops tool (support/ops automations) even if we don’t expose it to merchants

## What feature(s) it maps to

- Workflow automation for internal operations (support triage, notifications, sync jobs)
- Integration connector framework (build “pieces” to integrate with our platform)
- Admin-side automation (rule-based actions) if we eventually want merchant-configurable workflows (bigger bet)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Good (TS). Integration is mostly “run as a separate service” + call our APIs via webhooks/tokens.
- Setup friction (self-host? SaaS? Docker?): Medium–High. A full workflow platform brings runtime, queueing, secrets, and governance concerns.
- Data model alignment: Mixed. Great for “ops automations”; harder for “merchant-facing automations” due to tenant isolation + permissions + secrets management.

## Adoption path

- 1 day POC:
  - Run Activepieces locally via Docker Compose.
  - Build 1 flow that reacts to a webhook (simulate “order created”) and performs 2 actions (e.g., Slack + HTTP call).
  - Verify secrets handling and connector auth patterns.
  - Identify whether the feature we need lives in an enterprise-licensed directory (license gate).
- 1 week integration:
  - Decide scope: “internal ops only” (lower risk) vs “merchant-facing automation” (high risk).
  - Implement SSO / auth boundary (so only allowed staff can access the UI) and isolate environments.
  - Build a minimal custom “piece” for our API (typed actions: list orders, tag customer, issue refund request, etc.).
  - Define tenancy + secrets policies: where credentials live, rotation, audit events, least-privilege tokens.
  - Add an audit trail: flow edits, runs, failures, and who triggered what.
- 1 month hardening:
  - Add rate limiting + retry policies for external integrations.
  - Add a curated connector set + governance (approval for new flows).
  - If merchant-facing, add strict tenant isolation, per-tenant secret vaulting, and permission-aware actions.

## Risks

- Maintenance risk: Medium–High. It’s a whole platform (runtime + UI + connectors); expect operational overhead.
- Security risk: High. Workflows handle secrets and can call privileged APIs; needs strong access control + auditing.
- Scope mismatch: Medium. Best ROI is “internal ops automation”; merchant-facing automation is a major product/infra investment.
- License risk: High. Repository includes EE-licensed directories; treat as “mixed license” and verify the parts we plan to run/modify are MIT-licensed.

## Sources

- https://github.com/activepieces/activepieces
- https://raw.githubusercontent.com/activepieces/activepieces/main/LICENSE

## Score (0–100) + reasoning

- Score: 68
- Why: Great accelerator for internal ops automations, but mixed licensing + security/ops footprint make it a “careful adopt” rather than a drop-in primitive.

---

## Repo description (from GitHub)

AI Agents & MCPs & AI Workflow Automation • (~400 MCP servers for AI agents) • AI Automation / AI Agent with MCPs • AI Workflows & AI Agents • MCPs for AI Agents
