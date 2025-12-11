# Privacy & Consent Notes

- Default: do not track until consent flag is true (hook from existing CMP if present).
- Payload: no PII. Only anon_id, session_id, optional user_id if already authenticated; page_path, user_agent (truncated), metadata (click coords).
- DNT: if `navigator.doNotTrack==='1'`, disable experiments and tracking.
- Storage: anon_id in cookie+localStorage, SameSite=Lax, 1 year; session_id 30m idle rotation.
- Retention: raw events/exposures 180 days; aggregates indefinitely; add delete job if policy requires.
- Replay/heatmap: if enabling OpenReplay or similar, gate behind consent and exclude sensitive pages/fields; mask inputs.
- Exports: if users request data deletion, remove events/exposures for anon_id/user_id; document procedure.
