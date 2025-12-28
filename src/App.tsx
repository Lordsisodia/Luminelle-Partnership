import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { SUPPORT_EMAIL } from '@/config/constants'
import { GlobalFooter } from '@ui/components/GlobalFooter'

const LandingPage = lazy(() => import('@creator/ui/pages/CreatorsPage'))
const WelcomePage = lazy(() => import('@client/marketing/ui/pages/WelcomePage'))
const TermsPage = lazy(() => import('@client/marketing/ui/pages/TermsPage'))
const PrivacyPage = lazy(() => import('@client/marketing/ui/pages/PrivacyPage'))
const BriefPage = lazy(() => import('@client/marketing/ui/pages/BriefPage'))
const ShopLandingPage = lazy(() => import('@client/marketing/ui/pages/ShopLandingPage'))
const ProductPage = lazy(() => import('@client/shop/products/ui/pages/ProductPage/index'))
const BlogIndexPage = lazy(() => import('@blog/ui/pages/BlogIndexPage'))
const BlogPostPage = lazy(() => import('@blog/ui/pages/BlogPostPage'))
const CartPage = lazy(() => import('@client/shop/cart/ui/pages/CartPage'))
const CheckoutPage = lazy(() => import('@client/shop/checkout/ui/pages/CheckoutPage'))
const OrderConfirmationPage = lazy(() => import('@client/shop/checkout/ui/pages/OrderConfirmationPage'))
const OrderTrackingPage = lazy(() => import('@client/shop/checkout/ui/pages/OrderTrackingPage'))
const ReturnsPage = lazy(() => import('@client/shop/checkout/ui/pages/ReturnsPage'))
const OrderDetailPage = lazy(() => import('@client/account/ui/pages/OrderDetailPage'))
const AddressesPage = lazy(() => import('@client/account/ui/pages/AddressesPage'))
const PaymentMethodsPage = lazy(() => import('@client/account/ui/pages/PaymentMethodsPage'))
const SearchResultsPage = lazy(() => import('@client/shop/products/ui/pages/SearchResultsPage'))
const AccountPage = lazy(() => import('@client/account/ui/pages/AccountPage'))
const OrdersPage = lazy(() => import('@client/account/ui/pages/OrdersPage'))
const BrandStoryPage = lazy(() => import('@client/marketing/brand/ui/pages/BrandStoryPage'))
const ShopifyCheckoutHandoffPage = lazy(() => import('@client/shop/cart/ui/pages/ShopifyCheckoutHandoffPage'))
const RewardsPage = lazy(() => import('@client/rewards/ui/pages/RewardsPage'))
const SignInPage = lazy(() => import('@platform/auth/ui/pages/SignInPage'))
const SignUpPage = lazy(() => import('@platform/auth/ui/pages/SignUpPage'))
const SSOCallbackPage = lazy(() => import('@platform/auth/ui/pages/SSOCallbackPage'))
const AdminShell = lazy(() => import('@admin/shared/ui/layouts/AdminShell'))
const DashboardPage = lazy(() => import('@admin/analytics/ui/pages/DashboardPage'))
const AnalyticsPage = lazy(() => import('@admin/analytics/ui/pages/AnalyticsPage'))
const ActivityPage = lazy(() => import('@admin/analytics/ui/pages/ActivityPage'))

const ContentPage = lazy(() => import('@admin/pages/ui/pages/ContentPage'))
const PagesPage = lazy(() => import('@admin/pages/ui/pages/PagesPage'))

const ProductsPage = lazy(() => import('@admin/catalog/ui/pages/ProductsPage'))
const ProductPreviewFramePage = lazy(() => import('@admin/catalog/ui/pages/ProductPreviewFramePage'))
const ComponentsPage = lazy(() => import('@admin/catalog/ui/pages/ComponentsPage'))
const ComponentDetailPage = lazy(() => import('@admin/catalog/ui/pages/ComponentDetailPage'))

const BlogsPage = lazy(() => import('@admin/blog/ui/pages/BlogsPage'))
const BlogDetailPage = lazy(() => import('@admin/blog/ui/pages/BlogDetailPage'))

const MediaPage = lazy(() => import('@admin/media/ui/pages/MediaPage'))
const AdminOrdersPage = lazy(() => import('@admin/orders/ui/pages/OrdersPage'))
const AdminSettingsPage = lazy(() => import('@admin/settings/ui/pages/SettingsPage'))
const AdminGuard = lazy(() => import('@admin/shared/ui/components/AdminGuard'))
const ClerkShell = lazy(() => import('@/shells/ClerkShell'))
const NotFoundPage = lazy(() => import('@ui/pages/NotFoundPage'))

// Rewards temporarily disabled per client request; toggle to re-enable.
const ENABLE_REWARDS = false

const AppLoadingFallback = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white text-semantic-text-primary">
      <header className="border-b border-semantic-legacy-brand-blush/40 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-full border border-semantic-legacy-brand-blush/60 bg-semantic-legacy-brand-blush/20"
              aria-hidden
            />
            <div className="font-heading text-lg font-semibold uppercase tracking-[0.22em]">Lumelle</div>
          </div>
          <div
            className="h-10 w-28 rounded-full border border-semantic-legacy-brand-blush/60 bg-semantic-legacy-brand-blush/20"
            aria-hidden
          />
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 md:px-6">
        <div className="space-y-4 motion-safe:animate-pulse motion-reduce:animate-none">
          <div className="h-10 w-3/5 rounded-2xl bg-semantic-legacy-brand-blush/25" aria-hidden />
          <div className="h-4 w-2/5 rounded-xl bg-semantic-legacy-brand-blush/25" aria-hidden />
          <div className="h-4 w-4/5 rounded-xl bg-semantic-legacy-brand-blush/25" aria-hidden />
          <div className="mt-8 h-60 w-full rounded-3xl border border-semantic-legacy-brand-blush/50 bg-semantic-legacy-brand-blush/10" aria-hidden />
        </div>
        <p className="mt-8 text-center text-sm text-semantic-text-primary/60">Loading…</p>
      </main>
      <GlobalFooter supportEmail={SUPPORT_EMAIL} />
    </div>
  )
}

const App = () => {
  return (
    <Suspense fallback={<AppLoadingFallback />}>
      <Helmet>
        {/* Default to indexable pages; override per-route where needed. */}
        <meta name="robots" content="index,follow" />
      </Helmet>
      <Routes>
        {/* Store landing is root */}
        <Route path="/" element={<ShopLandingPage />} />
        {/* Creator welcome lives at /welcome */}
        <Route path="/welcome" element={<WelcomePage />} />
        {/* Legacy/alt landing stub */}
        <Route path="/landing" element={<ShopLandingPage />} />
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
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="orders/:orderId" element={<AdminOrdersPage />} />
            <Route path="content" element={<ContentPage />} />
            <Route path="content/:handle" element={<ContentPage />} />
            <Route path="pages" element={<PagesPage />} />
            <Route path="pages/:slug" element={<PagesPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/:handle" element={<ProductsPage />} />
            <Route path="blogs" element={<BlogsPage />} />
            <Route path="blogs/:slug" element={<BlogDetailPage />} />
            <Route path="media" element={<MediaPage />} />
            <Route path="media/upload/:bucketId" element={<MediaPage />} />
            <Route path="media/:assetId" element={<MediaPage />} />
            <Route path="globals" element={<Navigate to="/admin/components" replace />} />
            <Route path="components" element={<ComponentsPage />} />
            <Route path="components/:key" element={<ComponentDetailPage />} />
            <Route path="activity" element={<ActivityPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
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
