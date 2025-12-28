import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { Link as RouterLink } from 'react-router-dom'
import { UserRound, Menu } from 'lucide-react'
import { useAuthContext as useAuth } from '@platform/auth/providers/AuthContext'
import { useDrawer } from '@ui/providers/DrawerContext'

type Promo = { label: string; href?: string }

type GlobalHeaderProps = {
  promoMessages: Promo[]
}

const PromoBar = ({ promos }: { promos: Promo[] }) => {
  if (!promos.length) return null
  return (
    <div className="bg-semantic-legacy-brand-cocoa text-white text-xs font-semibold px-4 py-2 flex flex-wrap items-center justify-center gap-4">
      {promos.map((p, idx) => (
        p.href ? (
          <RouterLink key={idx} to={p.href} className="underline underline-offset-4">
            {p.label}
          </RouterLink>
        ) : (
          <span key={idx}>{p.label}</span>
        )
      ))}
    </div>
  )
}

export const GlobalHeader = ({ promoMessages }: GlobalHeaderProps) => {
  const { signedIn } = useAuth()
  const drawer = useDrawer()

  return (
    <header className="sticky top-0 z-30 shadow-sm">
      <PromoBar promos={promoMessages} />
      <div className="flex items-center justify-between bg-white px-4 py-3 border-b border-semantic-legacy-brand-blush/50">
        <div className="flex items-center gap-3">
          <button
            aria-label="Open navigation"
            className="rounded-full border border-semantic-legacy-brand-blush/60 p-2 text-semantic-text-primary hover:bg-semantic-legacy-brand-blush/30"
            onClick={() => drawer.openMenu()}
          >
            <Menu className="h-5 w-5" />
          </button>
          <RouterLink to="/" className="text-lg font-semibold text-semantic-text-primary">
            Lumelle
          </RouterLink>
        </div>

        <div className="flex items-center gap-3">
          <RouterLink
            to="/product/shower-cap"
            className="hidden sm:inline-flex rounded-full border border-semantic-legacy-brand-blush/60 px-4 py-2 text-sm font-semibold text-semantic-text-primary hover:bg-semantic-legacy-brand-blush/30"
          >
            Shop
          </RouterLink>
          <button
            onClick={() => drawer.openCart()}
            className="rounded-full border border-semantic-legacy-brand-blush/60 px-4 py-2 text-sm font-semibold text-semantic-text-primary hover:bg-semantic-legacy-brand-blush/30"
          >
            Cart
          </button>
          <SignedIn>
            <UserButton appearance={{ elements: { avatarBox: 'h-8 w-8' } }} />
          </SignedIn>
          <SignedOut>
            <RouterLink
              to="/sign-in"
              className="inline-flex items-center gap-2 rounded-full bg-semantic-accent-cta px-4 py-2 text-sm font-semibold text-semantic-text-primary shadow-soft hover:-translate-y-0.5 transition"
            >
              <UserRound className="h-4 w-4" />
              {signedIn ? 'Account' : 'Sign in'}
            </RouterLink>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}

export default GlobalHeader
