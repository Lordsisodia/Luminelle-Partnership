import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react'

// Thin guard that restricts admin routes to emails listed in VITE_ADMIN_EMAILS (comma-separated).
export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user } = useUser()
  const admins = (import.meta.env.VITE_ADMIN_EMAILS as string | undefined)?.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean) || []
  const email = (user?.primaryEmailAddress?.emailAddress || '').toLowerCase()
  const allowed = admins.length === 0 ? true : admins.includes(email)

  return (
    <>
      <SignedOut>
        <div className="mx-auto max-w-2xl p-6 text-brand-cocoa">
          <h2 className="text-xl font-semibold">Admin access</h2>
          <p className="mt-2">Please sign in to view this page.</p>
          <a
            href="/sign-in"
            className="mt-3 inline-block rounded-full bg-brand-cocoa px-4 py-2 text-sm font-semibold text-white"
          >
            Sign in
          </a>
        </div>
      </SignedOut>
      <SignedIn>
        {allowed ? (
          <>{children}</>
        ) : (
          <div className="mx-auto max-w-2xl p-6 text-brand-cocoa">
            <h2 className="text-xl font-semibold">Access denied</h2>
            <p className="mt-2">Your account does not have admin access.</p>
          </div>
        )}
      </SignedIn>
    </>
  )
}
