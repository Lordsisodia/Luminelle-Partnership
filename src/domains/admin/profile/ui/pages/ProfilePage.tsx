import { NavLink } from 'react-router-dom'
import { LogOut, UserRound } from 'lucide-react'
import { useAuthContext as useAuth } from '@platform/auth/providers/AuthContext'
import { AdminPageLayout } from '@admin/shared/ui/layouts'
import { Avatar } from '@ui/components/Avatar'

export default function ProfilePage() {
  const { user, signedIn, signOut } = useAuth()
  const displayName = user?.fullName || (user?.email ? user.email.split('@')[0] : 'Admin')
  const email = user?.email ?? null

  const avatar = user?.avatarUrl ? (
    <img
      src={user.avatarUrl}
      alt={user.fullName || user.email || 'Avatar'}
      className="h-14 w-14 rounded-full border border-semantic-legacy-brand-blush/60 object-cover shadow-sm"
    />
  ) : (
    <Avatar name={displayName} size={56} />
  )

  return (
    <AdminPageLayout
      title="Profile"
      subtitle={signedIn ? 'Manage your admin session.' : 'Sign in to manage your admin session.'}
      actions={
        signedIn ? (
          <button
            type="button"
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-full bg-semantic-legacy-brand-cocoa px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-semantic-legacy-brand-cocoa/90"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign out
          </button>
        ) : (
          <NavLink
            to="/sign-in"
            className="inline-flex items-center gap-2 rounded-full bg-semantic-legacy-brand-cocoa px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-semantic-legacy-brand-cocoa/90"
          >
            <UserRound className="h-4 w-4" aria-hidden="true" />
            Sign in
          </NavLink>
        )
      }
    >
      <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          {avatar}
          <div className="min-w-0">
            <div className="truncate text-lg font-semibold text-semantic-text-primary">{displayName}</div>
            {email ? <div className="mt-1 truncate text-sm text-semantic-text-primary/70">{email}</div> : null}
            <div className="mt-3 text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">
              {signedIn ? 'Signed in' : 'Signed out'}
            </div>
          </div>
        </div>
      </div>
    </AdminPageLayout>
  )
}

