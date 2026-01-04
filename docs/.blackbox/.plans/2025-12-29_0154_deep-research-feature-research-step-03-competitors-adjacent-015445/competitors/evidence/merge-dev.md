# Evidence Extract — Merge.dev

- slug: `merge-dev`
- category: unified APIs + “link” flow + webhooks + sync status (SaaS)
- license: proprietary (SaaS)

## Cycle 3 — Evidence-backed primitives (linking flow + linked accounts + sync status + webhooks)

### Notable features (3)

1) “Merge Link” single integration linking flow (link portal pattern)  
Evidence: https://docs.merge.dev/guides/merge-link/single-integration/

2) Linked accounts as first-class objects  
Evidence: https://docs.merge.dev/hris/linked-accounts/

3) Sync status surface  
Evidence: https://docs.merge.dev/hris/sync-status/

### Copyable workflows (2)

1) Merchant linking flow: generate link token → user links account → linked account appears in system  
Evidence: https://docs.merge.dev/guides/merge-link/single-integration/  
Evidence (linked accounts): https://docs.merge.dev/hris/linked-accounts/

2) Operate integrations: monitor sync status + react to events via webhooks  
Evidence (sync status): https://docs.merge.dev/hris/sync-status/  
Evidence (webhooks): https://docs.merge.dev/basics/webhooks/overview/

### 3 steal ideas (easy / medium / hard)

- Easy: adopt “linked accounts” as a named object in our admin (per merchant, per integration).
- Medium: expose sync status + “force resync”/retry UI patterns per connection.
- Hard: unified API layer across many SaaS categories (Merge’s moat); emulate only the admin primitives.

### Thin-slice implementation (1–3 days)

- Day 1: integration linking UI (generate link token → open link flow → show connected account).
- Day 2: linked accounts table (multi-account) + connection status badges + disconnect.
- Day 3: sync status panel + webhook subscriptions + “retry/force sync” buttons.

