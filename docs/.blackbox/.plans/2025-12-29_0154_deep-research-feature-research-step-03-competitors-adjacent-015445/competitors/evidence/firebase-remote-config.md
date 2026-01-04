# Evidence Extract — Firebase Remote Config (Google)

- slug: `firebase-remote-config`
- category: remote config + targeting + rollout + experimentation adjacency
- license: proprietary managed service (Firebase)

## Cycle 13 — Evidence-backed primitives (remote config templates + A/B)

### Notable features (3)

1) Remote Config parameters + conditions (targeting) + percent rollouts (release control plane)  
Evidence: https://firebase.google.com/docs/remote-config

2) Template (config) management / versioning concepts are part of the Remote Config product surface  
Evidence: https://firebase.google.com/docs/remote-config/templates

3) A/B Testing exists as a productized workflow adjacent to Remote Config (experiment orchestration)  
Evidence: https://firebase.google.com/docs/ab-testing

### Copyable workflows (2)

1) Staged rollout with rollback: set param default → create condition + percent rollout → publish template → monitor → rollback to previous template if needed  
Evidence: remote config + templates: https://firebase.google.com/docs/remote-config and https://firebase.google.com/docs/remote-config/templates

2) Experiment as configuration: create A/B test for a Remote Config parameter → choose goals/metrics → run → apply winner  
Evidence: A/B testing: https://firebase.google.com/docs/ab-testing

### 3 steal ideas (easy / medium / hard)

- Easy: treat “config state” as a versioned template with publish + rollback; show “diff” between templates (audit-friendly).
- Medium: unify remote config and feature flags into the same schema (typed params + variants + targeting).
- Hard: build a controlled experimentation surface where promotions (apply winner) require approvals for risky params.

### Thin-slice implementation (1–3 days)

- Day 1: implement a minimal remote-config store (key/value + type + default + tenant overrides).
- Day 2: add template versioning with publish + rollback + audit event per publish.
- Day 3: add percent rollout targeting for 1 dimension (e.g., user_id hash buckets) + exposure logging.

