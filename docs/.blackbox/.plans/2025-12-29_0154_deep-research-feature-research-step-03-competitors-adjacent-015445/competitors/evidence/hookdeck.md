# Evidence Extract — Hookdeck

- slug: `hookdeck`
- category: webhook reliability / event gateway / delivery + retries control plane
- license: proprietary (SaaS)

## Cycle 15 — Evidence-backed primitives (delivery controls + retries UX)

### Notable features (3)

1) Retries are first-class (manual + scheduled + automatic retry options)  
Evidence: https://hookdeck.com/docs/retries

2) “Destinations” primitive (routing/forwarding target configuration as an object)  
Evidence: https://hookdeck.com/docs/destinations

3) Explicit best practices for handling retries (including idempotency guidance)  
Evidence: https://hookdeck.com/docs/retries

### Copyable workflows (2)

1) Retry workflow: failed delivery → schedule retry → view next attempt → cancel scheduled retries  
Evidence: https://hookdeck.com/docs/retries

2) Routing workflow: create destination → configure delivery behavior → monitor delivery outcomes (via delivery/event gateway UX)  
Evidence: destinations: https://hookdeck.com/docs/destinations

### 3 steal ideas (easy / medium / hard)

- Easy: expose “manual retry” + “schedule retry” buttons in our webhook delivery UI.
- Medium: destination-level retry policy config (max attempts, backoff, jitter) and surfacing “next attempt at” in UI.
- Hard: build a full event gateway abstraction (fan-out, filters, transformations) — likely not needed for thin slice.

### Thin-slice implementation (1–3 days)

- Day 1: add a destination object model + UI (URL, headers, secret, enabled/disabled).
- Day 2: add retries with user-visible controls (manual retry; schedule retry; next attempt timestamp).
- Day 3: add alerting hooks: notify admin on repeated failures + auto-disable toggle with approvals for re-enable.

