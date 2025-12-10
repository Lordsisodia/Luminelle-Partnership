import { useEffect } from 'react'
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react'
import { setNoIndexNoFollow } from '@/lib/seo'

export const SSOCallbackPage = () => {
  useEffect(() => { setNoIndexNoFollow() }, [])
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-blush/20 px-4 py-12 text-brand-cocoa">
      <div className="w-full max-w-md rounded-3xl border border-brand-blush/60 bg-white p-6 text-center shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">Lumelle</p>
        <h1 className="mt-3 text-2xl font-semibold">Finishing your sign-in…</h1>
        <p className="mt-2 text-sm text-brand-cocoa/70">Hang tight while we redirect you back to your dashboard.</p>
        <div className="mt-6 flex justify-center">
          <AuthenticateWithRedirectCallback />
        </div>
      </div>
    </div>
  )
}

export default SSOCallbackPage
