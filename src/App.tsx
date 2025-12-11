import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminGuard from './domains/admin/ui/components/AdminGuard'

const LandingPage = lazy(() => import('@landing/ui/pages/LandingPage'))
const WelcomePage = lazy(() => import('@landing/ui/pages/WelcomePage'))
const TermsPage = lazy(() => import('@landing/ui/pages/TermsPage'))
const PrivacyPage = lazy(() => import('@landing/ui/pages/PrivacyPage'))
const BriefPage = lazy(() => import('@landing/ui/pages/BriefPage'))
const ShopLandingPage = lazy(() => import('@products/ui/pages/ShopLandingPage'))
const ProductPage = lazy(() => import('@products/ui/pages/ProductPage'))
const BlogIndexPage = lazy(() => import('@blog/ui/pages/BlogIndexPage'))
const BlogPostPage = lazy(() => import('@blog/ui/pages/BlogPostPage'))
const CheckoutPage = lazy(() => import('@checkout/ui/pages/CheckoutPage'))
const CartPage = lazy(() => import('@cart/ui/pages/CartPage'))
const OrderConfirmationPage = lazy(() => import('@checkout/ui/pages/OrderConfirmationPage'))
const OrderTrackingPage = lazy(() => import('@checkout/ui/pages/OrderTrackingPage'))
const ReturnsPage = lazy(() => import('@checkout/ui/pages/ReturnsPage'))
const OrderDetailPage = lazy(() => import('@account/ui/pages/OrderDetailPage'))
const AddressesPage = lazy(() => import('@account/ui/pages/AddressesPage'))
const PaymentMethodsPage = lazy(() => import('@account/ui/pages/PaymentMethodsPage'))
const SearchResultsPage = lazy(() => import('@products/ui/pages/SearchResultsPage'))
const AccountPage = lazy(() => import('@account/ui/pages/AccountPage'))
const OrdersPage = lazy(() => import('@account/ui/pages/OrdersPage'))
const BrandStoryPage = lazy(() => import('@landing/ui/pages/BrandStoryPage'))
const SignInPage = lazy(() => import('@auth/ui/pages/SignInPage'))
const SignUpPage = lazy(() => import('@auth/ui/pages/SignUpPage'))
const SSOCallbackPage = lazy(() => import('@auth/ui/pages/SSOCallbackPage'))
const AnalyticsPage = lazy(() => import('@admin/ui/pages/AnalyticsPage'))
const ContentPage = lazy(() => import('@admin/ui/pages/ContentPage'))

const App = () => {
  return (
    <Suspense fallback={<div className="p-6 text-center text-brand-cocoa/70">Loading…</div>}>
      <Routes>
        {/* Store landing is root */}
        <Route path="/" element={<ShopLandingPage />} />
        {/* Affiliates page moved here */}
        <Route path="/affiliates" element={<LandingPage />} />
        <Route path="/brand" element={<BrandStoryPage />} />
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/product/:handle" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order/:orderId/confirm" element={<OrderConfirmationPage />} />
        <Route path="/order/track" element={<OrderTrackingPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/returns" element={<ReturnsPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/orders" element={<OrdersPage />} />
        <Route path="/account/orders/:orderId" element={<OrderDetailPage />} />
        <Route path="/account/addresses" element={<AddressesPage />} />
        <Route path="/account/payments" element={<PaymentMethodsPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/brief" element={<BriefPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sso-callback" element={<SSOCallbackPage />} />
        {/* Embedded Shopify Admin pages */}
        {/* Internal analytics */}
        <Route path="/admin/analytics" element={<AdminGuard><AnalyticsPage /></AdminGuard>} />
        {/* Content editor */}
        <Route path="/admin/content" element={<AdminGuard><ContentPage /></AdminGuard>} />
      </Routes>
    </Suspense>
  )
}

export default App
