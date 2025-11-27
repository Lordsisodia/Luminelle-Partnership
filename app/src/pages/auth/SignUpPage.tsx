import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useSignIn } from '@clerk/clerk-react'

const useRedirectTarget = () => {
  const [params] = useSearchParams()
  return useMemo(() => params.get('redirect') ?? '/account', [params])
}

const extractErrorMessage = (error: unknown) => {
  if (error && typeof error === 'object' && 'errors' in error) {
    const clerkErrors = (error as { errors?: Array<{ message: string }> }).errors
    if (clerkErrors && clerkErrors[0]?.message) return clerkErrors[0].message
  }
  if (error instanceof Error) return error.message
  return 'Something went wrong — please try again.'
}

export const SignUpPage = () => {
  const redirectTo = useRedirectTarget()
  const { isLoaded, signIn } = useSignIn()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGoogleSignUp = async () => {
    if (!isLoaded || !signIn) return
    setSubmitting(true)
    setError(null)
    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: redirectTo,
      })
    } catch (err) {
      const message = extractErrorMessage(err)
      console.error('Google sign-up failed', err)
      setError(message)
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-blush/30 px-4 py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 rounded-[32px] bg-white p-6 shadow-2xl md:flex-row md:p-12">
        <div className="md:w-1/2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">Lumelle</p>
          <h1 className="mt-4 font-heading text-3xl font-bold text-brand-cocoa md:text-4xl">Join the creator program</h1>
          <p className="mt-3 text-brand-cocoa/70">
            Members get early access to drops, collaborative briefs, and concierge-level support for every partnership.
          </p>
          <ul className="mt-6 space-y-3 text-brand-cocoa/80">
            <li>• Unlock ambassador-only kits and sample credits</li>
            <li>• Track commissions alongside product orders</li>
            <li>• Get direct support from the Lumelle partnerships team</li>
          </ul>
          <p className="mt-8 text-sm text-brand-cocoa/70">
            Already part of the collective?{' '}
            <Link to={`/sign-in?redirect=${encodeURIComponent(redirectTo)}`} className="font-semibold text-brand-cocoa">
              Sign in here
            </Link>
          </p>
        </div>

        <div className="md:w-1/2">
          <div className="rounded-3xl border border-brand-blush/60 bg-white/60 p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Create your account</p>
            <h2 className="mt-2 text-2xl font-semibold text-brand-cocoa">Join instantly with Google</h2>

            {error ? <p className="mt-3 rounded-2xl bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p> : null}

            <div className="mt-6 space-y-4">
              <button
                type="button"
                onClick={handleGoogleSignUp}
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-brand-blush/80 py-3 text-sm font-semibold text-brand-cocoa transition hover:border-brand-cocoa"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="" className="h-4 w-4" />
                Continue with Google
              </button>
              <p className="text-xs text-brand-cocoa/60">We’ll create your Lumelle creator profile using your Google account.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
