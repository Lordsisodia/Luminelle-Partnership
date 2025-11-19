import { Route, Routes } from 'react-router-dom'
import { LandingPage } from '@/pages/LandingPage'
import { WelcomePage } from '@/pages/WelcomePage'
import { TermsPage } from '@/pages/TermsPage'
import { PrivacyPage } from '@/pages/PrivacyPage'
import { BriefPage } from '@/pages/BriefPage'
import { ShopLandingPage } from '@/pages/ShopLandingPage'
import { ProductPage } from '@/pages/product/ProductPage'
import { BlogIndexPage } from '@/pages/BlogIndexPage'
import { BlogPostPage } from '@/pages/blog/[slug]'
import { CheckoutPage } from '@/pages/CheckoutPage'
import { CartPage } from '@/pages/CartPage'
import { OrderConfirmationPage } from '@/pages/OrderConfirmationPage'
import { OrderTrackingPage } from '@/pages/OrderTrackingPage'
import { ReturnsPage } from '@/pages/ReturnsPage'
import { OrderDetailPage } from '@/pages/account/OrderDetailPage'
import { AddressesPage } from '@/pages/account/AddressesPage'
import { PaymentMethodsPage } from '@/pages/account/PaymentMethodsPage'
import { SearchResultsPage } from '@/pages/SearchResultsPage'
import { AccountPage } from '@/pages/account/AccountPage'
import { OrdersPage } from '@/pages/account/OrdersPage'
import { BrandStoryPage } from '@/pages/BrandStoryPage'

const App = () => {
  return (
    <Routes>
      {/* Store landing is root */}
      <Route path="/" element={<ShopLandingPage />} />
      {/* Affiliates page moved here */}
      <Route path="/affiliates" element={<LandingPage />} />
      <Route path="/brand" element={<BrandStoryPage />} />
      <Route path="/blog" element={<BlogIndexPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="/product/shower-cap" element={<ProductPage />} />
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
    </Routes>
  )
}

export default App
