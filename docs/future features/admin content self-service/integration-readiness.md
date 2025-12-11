# Integration readiness checklist (when dropping into app)

## Preconditions
- `VITE_ENABLE_ADMIN_UI` present and default false.
- Staging Supabase URL/anon keys available in `.env.admin`; prod env untouched.
- Supabase types generated for staging schema and committed (or generated on CI).

## App wiring steps (later)
- Add admin Supabase client factory using staging env vars.
- Add `AdminGate` and lazy `/admin` route; no link in nav unless flag true.
- Ensure admin bundle is code-split and excluded when flag is false.
- Import minimal CSS for admin shell only under flag.
- Add UI brand tokens (logo/colors) to admin layout.

## Data coupling checks
- Public app continues to read its existing sources; no swaps to Supabase content until explicitly done.
- Admin uses separate client; no shared global state that could leak staging data into prod.

## Deployment toggles
- CI should not inject admin env vars in prod build until go-live.
- Feature flag env can be flipped per environment without code change.

## Rollback plan
- If admin flag causes issues, set `VITE_ENABLE_ADMIN_UI=false` and redeploy; no schema rollback needed.

## Security
- Confirm admin user roles exist; RLS enforced; Edge Functions restricted to admin JWT.
- No service role keys in client bundles; service keys only on server (Edge Functions/scripts).
