import { ClerkProvider } from '@clerk/clerk-react'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from '@auth/ui/providers/AuthContext'

// Only mount Clerk (and the app AuthProvider) on routes that actually need auth.
// This keeps the public storefront from downloading Clerk bundles.
const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ?? 'pk_test_placeholder'

export const ClerkShell = () => {
  return (
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/account"
      afterSignUpUrl="/account"
    >
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </ClerkProvider>
  )
}

export default ClerkShell

