import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminGuard from '@/components/AdminGuard'

const LandingPage = lazy(() => import('@/pages/LandingPage'))
const WelcomePage = lazy(() => import('@/pages/WelcomePage'))
const TermsPage = lazy(() => import('@/pages/TermsPage'))
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'))
const BriefPage = lazy(() => import('@/pages/BriefPage'))
const ShopLandingPage = lazy(() => import('@/pages/ShopLandingPage'))
const ProductPage = lazy(() => import('@/pages/product/ProductPage'))
const BlogIndexPage = lazy(() => import('@/pages/BlogIndexPage'))
const BlogPostPage = lazy(() => import('@/pages/blog/[slug]'))
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage'))
const CartPage = lazy(() => import('@/pages/CartPage'))
const OrderConfirmationPage = lazy(() => import('@/pages/OrderConfirmationPage'))
const OrderTrackingPage = lazy(() => import('@/pages/OrderTrackingPage'))
const ReturnsPage = lazy(() => import('@/pages/ReturnsPage'))
const OrderDetailPage = lazy(() => import('@/pages/account/OrderDetailPage'))
const AddressesPage = lazy(() => import('@/pages/account/AddressesPage'))
const PaymentMethodsPage = lazy(() => import('@/pages/account/PaymentMethodsPage'))
const SearchResultsPage = lazy(() => import('@/pages/SearchResultsPage'))
const AccountPage = lazy(() => import('@/pages/account/AccountPage'))
const OrdersPage = lazy(() => import('@/pages/account/OrdersPage'))
const BrandStoryPage = lazy(() => import('@/pages/BrandStoryPage'))
const SignInPage = lazy(() => import('@/pages/auth/SignInPage'))
const SignUpPage = lazy(() => import('@/pages/auth/SignUpPage'))
const SSOCallbackPage = lazy(() => import('@/pages/auth/SSOCallbackPage'))
const AppEmbed = lazy(() => import('@/pages/shopify/AppEmbed'))
const SettingsPage = lazy(() => import('@/pages/shopify/SettingsPage'))
const AnalyticsPage = lazy(() => import('@/pages/admin/AnalyticsPage'))
const ContentPage = lazy(() => import('@/pages/admin/ContentPage'))

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
        <Route path="/shopify/app" element={<AppEmbed />} />
        <Route path="/shopify/settings" element={<SettingsPage />} />
        {/* Internal analytics */}
        <Route path="/admin/analytics" element={<AdminGuard><AnalyticsPage /></AdminGuard>} />
        {/* Content editor */}
        <Route path="/admin/content" element={<AdminGuard><ContentPage /></AdminGuard>} />
      </Routes>
    </Suspense>
  )
}

export default App
