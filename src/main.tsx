import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './domains/cart/providers/CartContext'
import { DrawerProvider } from './ui/providers/DrawerProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <CartProvider>
          <DrawerProvider>
            <App />
          </DrawerProvider>
        </CartProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)

// PWA registration removed to avoid build issues; re-enable when Vite PWA plugin is configured and available.
