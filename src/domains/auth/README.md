# Auth domain

## Public surface (import via @auth/*)
- Pages: `@auth/ui/pages/SignInPage`, `SignUpPage`, `SSOCallbackPage`
- Provider: `@auth/ui/providers/AuthContext` (`AuthProvider`, `useAuth`)
- Hooks: `@auth/hooks/useSyncUserToSupabase`

## Layout
- data/, logic/, hooks/
- ui/ (components/layouts/pages/sections/providers)
