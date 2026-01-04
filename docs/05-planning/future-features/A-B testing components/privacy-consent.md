# Privacy & Consent Notes

- Default: do not track until consent flag is true (hook from existing CMP if present).
- Payload: no PII. Only anon_id, session_id, optional user_id if already authenticated; page_path, user_agent (truncated), metadata (click coords).
- DNT: if `navigator.doNotTrack==='1'`, disable experiments and tracking.
- Storage: anon_id in cookie+localStorage, SameSite=Lax, 1 year; session_id 30m idle rotation.
- Retention: raw events/exposures 180 days; aggregates indefinitely; add delete job if policy requires.
- Replay/heatmap: if enabling Clarity/Hotjar/OpenReplay, gate behind consent and exclude sensitive pages/fields; mask inputs.
- Clarity specifics (if used):
  - As of late 2025, Clarity documents that for EEA/UK/CH traffic you must provide **consent signals** (Consent v2) to continue collecting data; plan for this even if we primarily target US users.
  - Only load/init after consent; use their consent API so cookies aren’t set pre-consent.
  - Attach our ids for debugging: `clarity('identify', anon_id)` and/or `clarity('set', 'anon_id', anon_id)`.
  - Tag active experiments for replay filtering: `clarity('set', 'exp_<key>', '<variant>')`.
- PostHog specifics (if used):
  - Disable autocapture and replay to avoid high-volume capture; track only pageviews + exposures + conversions.
  - Prefer anonymous-only until login (avoid calling `identify` unless we truly need user-level profiles).
- Exports: if users request data deletion, remove events/exposures for anon_id/user_id; document procedure.
