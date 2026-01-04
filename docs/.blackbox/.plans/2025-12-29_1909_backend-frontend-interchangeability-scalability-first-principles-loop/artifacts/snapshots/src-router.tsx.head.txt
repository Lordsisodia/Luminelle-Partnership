import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import App from './App'
import { CartProvider } from './domains/client/shop/cart/providers/CartContext'
import { AuthProvider } from './domains/platform/auth/providers/AuthContext'
import ScrollToTop from './ui/components/ScrollToTop'
import CookieConsentBanner from './ui/components/CookieConsentBanner'
import ServiceWorkerUpdateToast from './ui/components/ServiceWorkerUpdateToast'
import { DrawerProvider } from './ui/providers/DrawerProvider'

const RootApp = () => {
  return (
    <CartProvider>
      <AuthProvider>
        <DrawerProvider>
          <ScrollToTop />
          <CookieConsentBanner />
          <ServiceWorkerUpdateToast />
          <App />
        </DrawerProvider>
      </AuthProvider>
    </CartProvider>
  )
}

export const router = createBrowserRouter(
  createRoutesFromElements(<Route path="*" element={<RootApp />} />),
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
)

export default router
