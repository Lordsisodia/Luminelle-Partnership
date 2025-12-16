import { SignedIn, SignedOut } from '@clerk/clerk-react'

type AdminGuardProps = {
  children: React.ReactNode
}

// Temporary: role checks disabled for QA so any signed-in user can reach the admin UI.
// TODO: Re-enable Clerk role enforcement once admin roles are finalized.
export default function AdminGuard({ children }: AdminGuardProps) {
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
      <SignedIn>{children}</SignedIn>
    </>
  )
}
