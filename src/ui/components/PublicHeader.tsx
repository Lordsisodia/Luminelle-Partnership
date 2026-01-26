import { Link as RouterLink } from 'react-router-dom'
import { Menu, ShoppingBag, UserRound } from 'lucide-react'
import { useDrawer } from '@ui/providers/DrawerContext'
import { useCart } from '@client/shop/cart/providers/CartContext'

type PublicHeaderProps = {
  subtitle?: string | null
  primaryLabel?: string
  onPrimaryAction?: () => void
  onOpenMenu?: () => void
}

export function PublicHeader({
  subtitle,
  primaryLabel = 'Join WhatsApp',
  onPrimaryAction,
  onOpenMenu,
}: PublicHeaderProps) {
  const { openCart, openMenu } = useDrawer()
  const handleOpenMenu = onOpenMenu ?? openMenu
  const { qty } = useCart()
  const qtyLabel = qty > 99 ? '99+' : String(qty)

  return (
    <>
      {/* Top nav */}
      <div className="w-full px-4 md:px-6">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 md:gap-4 py-2 md:py-3">
          {/* Burger menu - left */}
          <button
            aria-label="Open menu"
            onClick={handleOpenMenu}
            className="inline-flex h-9 w-9 md:h-10 md:w-10 items-center justify-center text-semantic-legacy-brand-cocoa hover:text-semantic-legacy-brand-cocoa/70"
            style={{ minWidth: '36px', minHeight: '36px' }}
          >
            <Menu className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.5} />
          </button>

          {/* Logo - center */}
          <RouterLink to="/" className="flex flex-col items-center justify-center gap-1 text-center justify-self-center">
            <span className="font-heading text-lg md:text-xl font-bold tracking-wide text-semantic-legacy-brand-cocoa leading-none">
              Lumelle
            </span>
            {subtitle ? (
              <span className="text-xs font-semibold uppercase tracking-wider text-semantic-legacy-brand-cocoa">
                {subtitle}
              </span>
            ) : null}
          </RouterLink>

          {/* Right side icons */}
          <div className="flex items-center justify-self-end gap-1.5 md:gap-2">
            {/* WhatsApp button - desktop only */}
            {onPrimaryAction ? (
              <button
                onClick={onPrimaryAction}
                type="button"
                className="hidden items-center justify-center gap-2 rounded-full bg-semantic-accent-cta px-4 py-1.5 text-sm font-semibold text-semantic-legacy-brand-cocoa shadow-soft transition-transform hover:-translate-y-0.5 hover:bg-semantic-accent-cta/90 md:inline-flex"
              >
                {primaryLabel}
              </button>
            ) : null}

            {/* Cart - desktop only */}
            <button
              type="button"
              aria-label="Open cart"
              onClick={openCart}
              className="relative hidden h-9 w-9 md:h-10 md:w-10 items-center justify-center text-semantic-legacy-brand-cocoa hover:text-semantic-legacy-brand-cocoa/70 md:inline-flex"
            >
              <ShoppingBag className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2} />
              {qty > 0 ? (
                <span className="absolute -top-0.5 -right-0.5 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-semantic-accent-cta px-1 text-[10px] font-semibold text-semantic-legacy-brand-cocoa shadow-soft">
                  {qtyLabel}
                </span>
              ) : null}
            </button>

            {/* Account text - desktop only */}
            <RouterLink
              to="/account"
              className="hidden rounded-full border border-semantic-legacy-brand-blush/60 px-3 py-1 text-xs font-semibold text-semantic-legacy-brand-cocoa transition hover:bg-semantic-legacy-brand-blush/40 md:inline-flex"
            >
              Account
            </RouterLink>

            {/* Profile icon - mobile only */}
            <RouterLink
              to="/account"
              className="inline-flex h-9 w-9 md:h-10 md:w-10 items-center justify-center text-semantic-legacy-brand-cocoa hover:text-semantic-legacy-brand-cocoa/70 md:hidden"
              aria-label="Account"
              style={{ minWidth: '36px', minHeight: '36px' }}
            >
              <UserRound className="h-5 w-5" strokeWidth={2} />
            </RouterLink>
          </div>
        </div>
      </div>
    </>
  )
}

export default PublicHeader
