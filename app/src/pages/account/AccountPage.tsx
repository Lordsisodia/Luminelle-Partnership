import { MarketingLayout } from '@/layouts/MarketingLayout'
import { useAuth } from '@/state/AuthContext'

export const AccountPage = () => {
  const { signedIn, user, signIn, signOut } = useAuth()

  return (
    <MarketingLayout navItems={[]} subtitle="Account">
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="font-heading text-2xl text-brand-cocoa">Account</h1>
          {!signedIn ? (
            <div className="mt-4 rounded-2xl border border-brand-blush/60 bg-white p-6">
              <p className="text-brand-cocoa/80">Sign in to view orders and manage addresses.</p>
              <button className="mt-3 rounded-full bg-brand-peach px-5 py-2 font-semibold text-brand-cocoa" onClick={() => signIn('Jane')}>Sign in</button>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-brand-blush/60 bg-white p-6">
                <p className="text-brand-cocoa">Hi, {user?.firstName}</p>
                <p className="text-sm text-brand-cocoa/70">Orders and saved info will appear here.</p>
                <button className="mt-3 rounded-full border border-brand-blush/60 px-5 py-2 font-semibold" onClick={signOut}>Sign out</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </MarketingLayout>
  )
}

export default AccountPage

