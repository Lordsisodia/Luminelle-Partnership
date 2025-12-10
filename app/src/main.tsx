import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './state/CartContext.tsx'
import { AuthProvider } from './state/AuthContext.tsx'

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
      <BrowserRouter>
        <CartProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </CartProvider>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
)

// PWA registration removed to avoid build issues; re-enable when Vite PWA plugin is configured and available.
