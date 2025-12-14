# Admin flag & routing plan (no app impact until wired)

Goal: let admin UI exist in code without affecting the live app. Everything stays behind `VITE_ENABLE_ADMIN_UI` and staging creds.

## Env flags
- `VITE_ENABLE_ADMIN_UI` (default `false`)
- `VITE_SUPABASE_URL_ADMIN`, `VITE_SUPABASE_ANON_KEY_ADMIN` (staging)
- Bucket vars: `VITE_ADMIN_BUCKET_PUBLIC`, `VITE_ADMIN_BUCKET_PRODUCT`, `VITE_ADMIN_BUCKET_BLOG`, `VITE_ADMIN_BUCKET_DRAFT`

## Guard pattern (pseudo, Vite/React)
```ts
const enableAdmin = import.meta.env.VITE_ENABLE_ADMIN_UI === 'true';

export const AdminGate = ({ children }) => {
  if (!enableAdmin) return <Navigate to="/" replace />;
  // Clerk-first: get the Clerk JWT template `supabase` and verify roles from claims.
  const token = await getClerkToken({ template: 'supabase' })
  const roles = decodeJwt(token)?.app_metadata?.roles || []
  if (!roles.includes('admin')) return <Forbidden />
  return <AdminLayout>{children}</AdminLayout>;
};
```

## Routing (concept)
- Lazy-load admin bundle: `const AdminApp = React.lazy(() => import('./admin/App'));`
- Route mount: `/admin/*` wrapped by `AdminGate`.
- Do not link from public nav unless flag is true.
- When flag is false: route redirects away; bundle can be tree-shaken.

## Supabase clients
- Keep existing client for public app.
- Create separate admin client instance pointing to staging Supabase URL/anon key; use only inside `/admin`.

## Build impacts
- With `VITE_ENABLE_ADMIN_UI=false`, admin code should not inflate main bundle (lazy + tree-shake).
- Production deploys keep flag false until go-live.

## Auth
- Supabase Auth admin users only; roles in `app_metadata.roles` containing `admin`.
- No approval workflow needed initially.

## When wiring into app
- Add the envs to `.env.admin` locally; keep `.env` unchanged.
- Add `/admin` route guarded as above.
- Add optional “Admin” link only when flag true (e.g., render in dev/staging).
