import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './domains/cart/providers/CartContext'
import { AuthProvider } from './domains/auth/ui/providers/AuthContext'

// Always provide Clerk; fall back to a harmless placeholder key for preview/local.
const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ?? 'pk_test_placeholder'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/account"
      afterSignUpUrl="/account"
    >
      <HelmetProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <CartProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </CartProvider>
        </BrowserRouter>
      </HelmetProvider>
    </ClerkProvider>
  </StrictMode>
)

// PWA registration removed to avoid build issues; re-enable when Vite PWA plugin is configured and available.
