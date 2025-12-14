import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-react'
import { useEffect, useMemo, useState } from 'react'
import { decodeClerkJwtPayload, hasAdminRole } from '@admin/logic/clerkJwt'

type AdminGuardProps = {
  children: React.ReactNode
}

// Clerk-first admin gate:
// - Read roles from the Clerk JWT template `supabase` (preferred; aligns with Supabase RLS + Edge Functions).
// - Optionally fall back to `VITE_ADMIN_EMAILS` if set (helps local/dev bootstrap).
export default function AdminGuard({ children }: AdminGuardProps) {
  const { user, isLoaded: userLoaded } = useUser()
  const { getToken, isLoaded: authLoaded, isSignedIn } = useAuth()

  const email = (user?.primaryEmailAddress?.emailAddress || '').toLowerCase()
  const emailAllowlist = useMemo(() => {
    const raw = (import.meta.env.VITE_ADMIN_EMAILS as string | undefined) || ''
    return raw
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
  }, [])

  const [checking, setChecking] = useState(true)
  const [allowed, setAllowed] = useState(false)
  const [reason, setReason] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoaded || !userLoaded) return
    if (!isSignedIn) return

    let cancelled = false
    const check = async () => {
      setChecking(true)
      setReason(null)

      // Prefer JWT roles so UI access matches Supabase RLS + Edge Functions.
      const token = await getToken({ template: 'supabase' }).catch(() => null)
      const payload = token ? decodeClerkJwtPayload(token) : null
      const isAdmin = hasAdminRole(payload?.app_metadata?.roles)

      // Optional fallback (bootstrap/dev only): allowlist by email.
      // In prod, prefer Clerk roles so access matches Supabase RLS + Edge Functions.
      const hasAllowlistedEmail = import.meta.env.DEV && emailAllowlist.length > 0 && emailAllowlist.includes(email)

      const nextAllowed = isAdmin || hasAllowlistedEmail
      const nextReason = nextAllowed
        ? null
        : token
          ? 'Missing admin role. Configure Clerk JWT template `supabase` to include `app_metadata.roles: [\"admin\"]`.'
          : 'Missing Clerk JWT template `supabase` token. Configure Clerk → JWT Templates to enable Supabase auth.'

      if (cancelled) return
      setAllowed(nextAllowed)
      setReason(nextReason)
      setChecking(false)
    }

    void check()
    return () => {
      cancelled = true
    }
  }, [authLoaded, email, emailAllowlist, getToken, isSignedIn, userLoaded])

  return (
    <>
      <SignedOut>
        <div className="mx-auto max-w-2xl p-6 text-semantic-text-primary">
          <h2 className="text-xl font-semibold">Admin access</h2>
          <p className="mt-2">Please sign in to view this page.</p>
          <a
            href="/sign-in"
            className="mt-3 inline-block rounded-full bg-semantic-legacy-brand-cocoa px-4 py-2 text-sm font-semibold text-white"
          >
            Sign in
          </a>
        </div>
      </SignedOut>
      <SignedIn>
        {checking ? (
          <div className="mx-auto max-w-2xl p-6 text-semantic-text-primary">
            <h2 className="text-xl font-semibold">Checking admin access…</h2>
            <p className="mt-2 text-semantic-text-primary/70">Verifying your Clerk roles.</p>
          </div>
        ) : allowed ? (
          <>{children}</>
        ) : (
          <div className="mx-auto max-w-2xl p-6 text-semantic-text-primary">
            <h2 className="text-xl font-semibold">Access denied</h2>
            <p className="mt-2">Your account does not have admin access.</p>
            {reason ? (
              <div className="mt-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-4 text-sm text-semantic-text-primary/80">
                {reason}
              </div>
            ) : null}
          </div>
        )}
      </SignedIn>
    </>
  )
}
