# QA Checklist (pre-prod flip)

- Routing & flags
  - [ ] `/api/experiment/config` returns 404 when `EXPERIMENTS_ENABLED=false`.
  - [ ] `/api/experiment/track` returns 404 when flag false; 200 when true.
  - [ ] Client renders control when `VITE_EXPERIMENTS_ENABLED=false`.
  - [ ] Heatmap listener inert when `HEATMAP_ENABLED=false`.

- Data correctness
  - [ ] One exposure per experiment per session (no duplicates on rerender).
  - [ ] Events carry experiment_key/variant where applicable.
  - [ ] Metadata sizes under limits; long paths/UA truncated.
  - [ ] Idempotency works (replay same batch → no dup rows).

- Security/consent
  - [ ] Service key not present in client bundle.
  - [ ] Tracking gated until consent flag true.
  - [ ] No PII captured; user_id only when already authenticated.

- Performance
  - [ ] Bundle delta <5 KB gzip when experiments enabled.
  - [ ] Track batching: <=1 network call per 5 events (avg).
  - [ ] No layout shifts when toggling variants.

- Analytics
  - [ ] `vw_experiment_conversions` query returns rows.
  - [ ] Heatmap bin query returns rows; overlay renders in notebook/admin page.
  - [ ] SRM query runs; alert wiring tested on staging.

- Ops
  - [ ] Kill switch flips experiments off without redeploy.
  - [ ] Logs/metrics visible for track endpoint (errors, rejects).
  - [ ] Rollout/rollback steps documented and tested on staging.
