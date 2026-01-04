# Evidence Extract — Tray.io

- slug: `tray-io`
- category: iPaaS + embedded automation/integrations (SaaS)
- license: proprietary (SaaS)

## Cycle 3 — Evidence-backed primitives (auth objects + embedded auth UI + logs/streaming)

### Notable features (3)

1) Authentications as first-class objects (credential management as a platform surface)  
Evidence: https://docs.tray.ai/platform/connectivity/authentications

2) Embedded “auth-only dialog” (credential capture without full builder)  
Evidence: https://docs.tray.ai/platform/embedded/key-concepts/auth-only-dialog

3) Log streaming as an explicit observability pattern  
Evidence: https://docs.tray.ai/platform/enterprise-core/logs-debugging/log-streaming

### Copyable workflows (2)

1) Embedded connection setup flow  
- Provide auth-only dialog → store authentication → reuse across workflows  
Evidence: https://docs.tray.ai/platform/embedded/key-concepts/auth-only-dialog  
Evidence: https://docs.tray.ai/platform/embedded/key-concepts/auth-slots

2) Operate + debug workflows  
- Debug logs surface: https://docs.tray.ai/platform/enterprise-core/logs-debugging/debug-logs  
- Stream logs externally: https://docs.tray.ai/platform/enterprise-core/logs-debugging/log-streaming

### 3 steal ideas (easy / medium / hard)

- Easy: treat “authentications” as shareable objects in our admin (“Saved connections”).
- Medium: embed an “auth-only” connect flow so merchants can connect apps without building automations.
- Hard: build a full iPaaS runtime + connector library breadth.

### Thin-slice implementation (1–3 days)

- Day 1: “Saved connections” UI (create/edit/test/delete) and attach to integrations.
- Day 2: add “auth slots” concept for multi-account connections (account A vs B).
- Day 3: add structured debug logs + optionally a log streaming integration (webhook/SIEM endpoint).

