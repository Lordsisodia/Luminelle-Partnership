import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const LandingPage = lazy(() => import('@creators/ui/pages/CreatorsPage'))
const WelcomePage = lazy(() => import('@landing/ui/pages/WelcomePage'))
const TermsPage = lazy(() => import('@landing/ui/pages/TermsPage'))
const PrivacyPage = lazy(() => import('@landing/ui/pages/PrivacyPage'))
const BriefPage = lazy(() => import('@landing/ui/pages/BriefPage'))
const ShopLandingPage = lazy(() => import('@landing/ui/pages/ShopLandingPage'))
const ProductPage = lazy(() => import('@products/ui/pages/ProductPage/index'))
const BlogIndexPage = lazy(() => import('@blog/ui/pages/BlogIndexPage'))
const BlogPostPage = lazy(() => import('@blog/ui/pages/BlogPostPage'))
const CartPage = lazy(() => import('@cart/ui/pages/CartPage'))
const CheckoutPage = lazy(() => import('@checkout/ui/pages/CheckoutPage'))
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
const ShopifyCheckoutHandoffPage = lazy(() => import('@cart/ui/pages/ShopifyCheckoutHandoffPage'))
const RewardsPage = lazy(() => import('@rewards/ui/pages/RewardsPage'))
const SignInPage = lazy(() => import('@auth/ui/pages/SignInPage'))
const SignUpPage = lazy(() => import('@auth/ui/pages/SignUpPage'))
const SSOCallbackPage = lazy(() => import('@auth/ui/pages/SSOCallbackPage'))
const AdminShell = lazy(() => import('@admin/ui/layouts/AdminShell'))
const DashboardPage = lazy(() => import('@admin/ui/pages/DashboardPage'))
const AnalyticsPage = lazy(() => import('@admin/ui/pages/AnalyticsPage'))
const ContentPage = lazy(() => import('@admin/ui/pages/ContentPage'))
const PagesPage = lazy(() => import('@admin/ui/pages/PagesPage'))
const ProductsPage = lazy(() => import('@admin/ui/pages/ProductsPage'))
const BlogsPage = lazy(() => import('@admin/ui/pages/BlogsPage'))
const MediaPage = lazy(() => import('@admin/ui/pages/MediaPage'))
const GlobalsPage = lazy(() => import('@admin/ui/pages/GlobalsPage'))
const ActivityPage = lazy(() => import('@admin/ui/pages/ActivityPage'))
const ProductPreviewFramePage = lazy(() => import('@admin/ui/pages/ProductPreviewFramePage'))
const AdminGuard = lazy(() => import('@admin/ui/components/AdminGuard'))
const ClerkShell = lazy(() => import('@/shells/ClerkShell'))
const NotFoundPage = lazy(() => import('@ui/pages/NotFoundPage'))

// Rewards temporarily disabled per client request; toggle to re-enable.
const ENABLE_REWARDS = false

const App = () => {
  return (
    <Suspense fallback={<div className="p-6 text-center text-semantic-text-primary/70">Loading…</div>}>
      <Routes>
        {/* Store landing is root */}
        <Route path="/" element={<ShopLandingPage />} />
        {/* Creators page */}
        <Route path="/creators" element={<LandingPage />} />
        <Route path="/brand" element={<BrandStoryPage />} />
        <Route path="/product/:handle" element={<ProductPage />} />
        {/* Shopify cart checkout URLs can look like /cart/c/<id>?key=... */}
        <Route path="/cart/c/*" element={<ShopifyCheckoutHandoffPage />} />
        <Route path="/cart" element={<CartPage />} />
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

          {ENABLE_REWARDS ? (
            <Route path="/rewards" element={<RewardsPage />} />
          ) : (
            <Route path="/rewards" element={<Navigate to="/" replace />} />
          )}
          <Route path="/checkout" element={<CheckoutPage />} />

          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sso-callback" element={<SSOCallbackPage />} />

          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/orders" element={<OrdersPage />} />
          <Route path="/account/orders/:orderId" element={<OrderDetailPage />} />
          <Route path="/account/addresses" element={<AddressesPage />} />
          <Route path="/account/payments" element={<PaymentMethodsPage />} />

          {/* Admin mobile preview (uses real PDP component) */}
          <Route path="/admin/preview/product/:handle" element={<ProductPreviewFramePage />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminGuard><AdminShell /></AdminGuard>}>
            <Route index element={<DashboardPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="content" element={<ContentPage />} />
            <Route path="pages" element={<PagesPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="blogs" element={<BlogsPage />} />
            <Route path="media" element={<MediaPage />} />
            <Route path="globals" element={<GlobalsPage />} />
            <Route path="activity" element={<ActivityPage />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>
        </Route>

        {/* Fallback for unknown routes (prevents white screen) */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}

export default App
