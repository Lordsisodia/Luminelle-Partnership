# Evidence Extract — GitHub audit log events: stream-only / export-only fields and event gating

- slug: `github-audit-log-events-stream-only`
- category: audit event taxonomy + fields + “not in UI” gating rules
- license: proprietary SaaS docs (GitHub). Use as pattern reference only.

## Cycle 24 — Evidence-backed primitives (event taxonomy + visibility gating)

### Notable features (3)

1) Some events are explicitly “only available via audit log streaming” (example: API request events are only available via streaming when enabled in settings)  
Evidence: enterprise audit events doc: https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/audit-log-events-for-your-enterprise

2) Some events are “not available in the web interface” and only accessible via API/streaming/exports (Git events like clone/fetch/push are called out this way)  
Evidence: organization audit events doc: https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/organizations/keeping-your-organization-secure/managing-security-settings-for-your-organization/audit-log-events-for-your-organization

3) GitHub documents explicit field lists per event type (“Fields: …”), which is effectively an event schema registry in documentation form  
Evidence: both audit events pages include repeated `**Fields:**` lists:
- Enterprise: https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/audit-log-events-for-your-enterprise
- Organization: https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/organizations/keeping-your-organization-secure/managing-security-settings-for-your-organization/audit-log-events-for-your-organization

### Copyable workflows (2)

1) “Advanced fields” gated by export channel: UI shows baseline audit fields; streaming/export adds sensitive fields (e.g., API request metadata) and high-volume events  
Evidence: explicit “only via streaming” and “not in web interface” statements: see the two docs above.

2) Admin control plane: enable/disable high-volume event categories (e.g., API Request Events) and audit changes to stream destination configuration  
Evidence: enterprise audit events mention “only included if … enabled in settings” and includes stream configuration related events; see enterprise doc: https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/audit-log-events-for-your-enterprise

### 3 steal ideas (easy / medium / hard)

- Easy: publish “Fields per event type” in our docs and keep them stable (schema-first audit).
- Medium: implement channel-based visibility gates (UI vs export/stream) so we can keep UI safe/simple while still serving compliance needs.
- Hard: implement feature-flagged “high-volume event categories” (like API request events) with billing/limits and explicit enablement.

### Thin-slice implementation (1–3 days)

- Day 1: implement audit event taxonomy with per-event “field allowlist” and publish it in docs (or in-app catalog).
- Day 2: implement export-only fields and event-category gating (UI shows baseline; exports show more).
- Day 3: implement streaming destination config change events + “check endpoint” validation and audit those changes.

