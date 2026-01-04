import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useSignIn } from '@clerk/clerk-react'
import { AuthLayout } from '@platform/auth/ui/layouts'

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

export const SignInPage = () => {
  const redirectTo = useRedirectTarget()
  const { isLoaded, signIn } = useSignIn()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGoogleSignIn = async () => {
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
      console.error('Google sign-in failed', err)
      setError(message)
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout>
    <div className="px-4 py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 rounded-[32px] bg-white p-6 shadow-2xl md:flex-row md:p-12">
        <div className="md:w-1/2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-semantic-text-primary/60">Lumelle</p>
          <h1 className="mt-4 font-heading text-3xl font-bold text-semantic-text-primary md:text-4xl">Welcome back, creator</h1>
          <p className="mt-3 text-semantic-text-primary/70">
            Sign in to access your Lumelle account hub. Some account features (orders, saved addresses) are still being built.
          </p>
          <ul className="mt-6 space-y-3 text-semantic-text-primary/80">
            <li>• One-click sign in with Google</li>
            <li>• Account hub + quick links</li>
            <li>• Orders &amp; saved addresses (coming soon)</li>
          </ul>
          <p className="mt-8 text-sm text-semantic-text-primary/70">
            Need an account?{' '}
            <Link to={`/sign-up?redirect=${encodeURIComponent(redirectTo)}`} className="font-semibold text-semantic-text-primary">
              Join Lumelle
            </Link>
          </p>
        </div>

        <div className="md:w-1/2">
          <div className="rounded-3xl border border-semantic-legacy-brand-blush/60 bg-white/60 p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Choose your sign-in</p>
            <h2 className="mt-2 text-2xl font-semibold text-semantic-text-primary">Sign in with Google</h2>

            {error ? <p className="mt-3 rounded-2xl bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p> : null}

            <div className="mt-6 space-y-4">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-semantic-legacy-brand-blush/80 py-3 text-sm font-semibold text-semantic-text-primary transition hover:border-semantic-legacy-brand-cocoa"
                disabled={submitting}
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="" className="h-4 w-4" />
                Continue with Google
              </button>
              <p className="text-xs text-semantic-text-primary/60">
                One-click sign in powered by Google. No passwords, no codes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </AuthLayout>
  )
}

export default SignInPage
