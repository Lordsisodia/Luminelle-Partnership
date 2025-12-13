import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const LandingPage = lazy(() => import('@creators/ui/pages/CreatorsPage'))
const WelcomePage = lazy(() => import('@landing/ui/pages/WelcomePage'))
const TermsPage = lazy(() => import('@landing/ui/pages/TermsPage'))
const PrivacyPage = lazy(() => import('@landing/ui/pages/PrivacyPage'))
const BriefPage = lazy(() => import('@landing/ui/pages/BriefPage'))
const ShopLandingPage = lazy(() => import('@landing/ui/pages/ShopLandingPage'))
const ProductPage = lazy(() => import('@products/ui/pages/ProductPage/index'))
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
const BrandStoryPage = lazy(() => import('@brand/ui/pages/BrandStoryPage'))
const SignInPage = lazy(() => import('@auth/ui/pages/SignInPage'))
const SignUpPage = lazy(() => import('@auth/ui/pages/SignUpPage'))
const SSOCallbackPage = lazy(() => import('@auth/ui/pages/SSOCallbackPage'))
const AnalyticsPage = lazy(() => import('@admin/ui/pages/AnalyticsPage'))
const ContentPage = lazy(() => import('@admin/ui/pages/ContentPage'))
const AdminGuard = lazy(() => import('@admin/ui/components/AdminGuard'))
const ClerkShell = lazy(() => import('@/shells/ClerkShell'))

const App = () => {
  return (
    <Suspense fallback={<div className="p-6 text-center text-brand-cocoa/70">Loading…</div>}>
      <Routes>
        {/* Store landing is root */}
        <Route path="/" element={<ShopLandingPage />} />
        {/* Creators page */}
        <Route path="/creators" element={<LandingPage />} />
        <Route path="/brand" element={<BrandStoryPage />} />
        <Route path="/product/:handle" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order/:orderId/confirm" element={<OrderConfirmationPage />} />
        <Route path="/order/track" element={<OrderTrackingPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/returns" element={<ReturnsPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/brief" element={<BriefPage />} />

        {/* Routes that require Clerk (auth + account + admin + blog commenting) */}
        <Route element={<ClerkShell />}>
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />

          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sso-callback" element={<SSOCallbackPage />} />

          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/orders" element={<OrdersPage />} />
          <Route path="/account/orders/:orderId" element={<OrderDetailPage />} />
          <Route path="/account/addresses" element={<AddressesPage />} />
          <Route path="/account/payments" element={<PaymentMethodsPage />} />

          {/* Embedded Shopify Admin pages */}
          <Route path="/admin/analytics" element={<AdminGuard><AnalyticsPage /></AdminGuard>} />
          <Route path="/admin/content" element={<AdminGuard><ContentPage /></AdminGuard>} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
