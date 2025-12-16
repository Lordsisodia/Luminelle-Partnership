import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './domains/cart/providers/CartContext'
import { DrawerProvider } from './ui/providers/DrawerProvider'
import { AuthProvider } from './domains/auth/ui/providers/AuthContext'
import { initPosthogOnce } from '@/lib/analytics/posthog'
import ScrollToTop from './ui/components/ScrollToTop'

// Start PostHog init early (feature flags may be needed during first render).
// Actual event capture remains gated by `VITE_ANALYTICS_ENABLED`.
void initPosthogOnce()

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
          <ScrollToTop />
          <CartProvider>
            <AuthProvider>
              <DrawerProvider>
                <App />
              </DrawerProvider>
            </AuthProvider>
          </CartProvider>
        </BrowserRouter>
      </HelmetProvider>
    </ClerkProvider>
  </StrictMode>
)

// Basic service worker registration for PWA install/offline.
// Only enable in production to avoid stale caches during local development.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .catch((err) => console.error('SW registration failed', err))
  })
}
