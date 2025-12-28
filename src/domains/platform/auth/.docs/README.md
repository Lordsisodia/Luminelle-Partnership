# Platform Auth
Purpose: Authentication/authorization services.

Scopes:
- Sign-in/up, SSO callback, token handling, role propagation to admin/client apps.

Dependencies:
- Clerk (or chosen IdP), Supabase JWT verification helpers.

Roadmap:
- Document token lifetimes, role claims, guard patterns; add audit logging hooks.
