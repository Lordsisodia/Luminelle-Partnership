import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './state/CartContext.tsx'
import { AuthProvider } from './state/AuthContext.tsx'

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const ClerkWrapper = clerkPublishableKey
  ? ({ children }: { children: React.ReactNode }) => (
      <ClerkProvider
        publishableKey={clerkPublishableKey}
        signInUrl="/sign-in"
        signUpUrl="/sign-up"
        afterSignInUrl="/account"
        afterSignUpUrl="/account"
      >
        {children}
      </ClerkProvider>
    )
  : ({ children }: { children: React.ReactNode }) => <>{children}</>

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkWrapper>
      <BrowserRouter>
        <CartProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </CartProvider>
      </BrowserRouter>
    </ClerkWrapper>
  </StrictMode>
)
