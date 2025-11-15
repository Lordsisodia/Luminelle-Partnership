import { Route, Routes } from 'react-router-dom'
import { LandingPage } from '@/pages/LandingPage'
import { WelcomePage } from '@/pages/WelcomePage'
import { TermsPage } from '@/pages/TermsPage'
import { PrivacyPage } from '@/pages/PrivacyPage'
import { BriefPage } from '@/pages/BriefPage'
import { ShopLandingPage } from '@/pages/ShopLandingPage'
import { ProductPage } from '@/pages/product/ProductPage'
import { BlogIndexPage } from '@/pages/BlogIndexPage'
import { SearchResultsPage } from '@/pages/SearchResultsPage'
import { AccountPage } from '@/pages/account/AccountPage'

const App = () => {
  return (
    <Routes>
      {/* Store landing is root */}
      <Route path="/" element={<ShopLandingPage />} />
      {/* Affiliates page moved here */}
      <Route path="/affiliates" element={<LandingPage />} />
      <Route path="/blog" element={<BlogIndexPage />} />
      <Route path="/product/shower-cap" element={<ProductPage />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/brief" element={<BriefPage />} />
    </Routes>
  )
}

export default App
