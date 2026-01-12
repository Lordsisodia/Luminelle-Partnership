import { Link as RouterLink } from 'react-router-dom'
import { Menu, ShoppingBag, UserRound } from 'lucide-react'
import { useDrawer } from '@ui/providers/DrawerContext'
import { useCart } from '@client/shop/cart/providers/CartContext'

type Promo = { label: string; href?: string }

type PublicHeaderProps = {
  promoMessages: Promo[]
  activePromo: number
  subtitle?: string | null
  primaryLabel?: string
  onPrimaryAction?: () => void
  onOpenMenu?: () => void
}

export function PublicHeader({
  promoMessages,
  activePromo,
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
      {/* Promo strip */}
      <div className="overflow-hidden bg-semantic-legacy-brand-blush text-semantic-text-primary">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <div className="relative flex h-10 items-center justify-center text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary sm:text-[13px]">
            {promoMessages.map((msg, idx) => (
              <span
                key={msg.label}
                className={`absolute whitespace-nowrap transition-opacity duration-300 ${
                  idx === activePromo ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                aria-hidden={idx !== activePromo}
              >
                {msg.href ? (
                  <RouterLink
                    to={msg.href}
                    tabIndex={idx === activePromo ? 0 : -1}
                    className="underline decoration-semantic-text-primary/50 underline-offset-4 hover:text-semantic-text-primary/80"
                  >
                    {msg.label}
                  </RouterLink>
                ) : (
                  msg.label
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Top nav */}
      <div className="w-full px-5 md:px-6">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-4">
          <button
            aria-label="Open menu"
            onClick={handleOpenMenu}
            className="inline-flex h-10 w-10 items-center justify-center text-semantic-text-primary hover:text-semantic-text-primary/80"
          >
            <Menu className="h-6 w-6" />
          </button>

          <RouterLink
            to="/"
            className="flex flex-col items-center justify-center gap-1 text-center justify-self-center"
          >
            <span className="font-heading text-2xl font-semibold uppercase tracking-[0.24em] text-semantic-text-primary md:text-xl">
              Lumelle
            </span>
            {subtitle ? (
              <>
                <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-semantic-text-primary/60 md:hidden">
                  {subtitle}
                </span>
                <span className="hidden text-sm font-medium text-semantic-text-primary/70 md:inline">{subtitle}</span>
              </>
            ) : null}
          </RouterLink>

          <div className="flex items-center justify-self-end gap-2">
            {onPrimaryAction ? (
              <button
                onClick={onPrimaryAction}
                type="button"
                className="hidden items-center justify-center gap-2 rounded-full bg-semantic-accent-cta px-5 py-2 text-sm font-semibold text-semantic-text-primary shadow-soft transition-transform hover:-translate-y-0.5 hover:bg-semantic-accent-cta/90 md:inline-flex"
              >
                {primaryLabel}
              </button>
            ) : null}

            <button
              type="button"
              aria-label="Open cart"
              onClick={openCart}
              className="relative hidden h-10 w-10 items-center justify-center text-semantic-text-primary hover:text-semantic-text-primary/80 md:inline-flex"
            >
              <ShoppingBag className="h-6 w-6" />
              {qty > 0 ? (
                <span className="absolute right-0.5 top-0.5 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-semantic-accent-cta px-1 text-[11px] font-semibold text-semantic-text-primary shadow-soft ring-1 ring-semantic-legacy-brand-cocoa/10">
                  {qtyLabel}
                </span>
              ) : null}
            </button>

            <RouterLink
              to="/account"
              className="hidden rounded-full border border-semantic-legacy-brand-blush/60 px-4 py-2 text-sm font-semibold text-semantic-text-primary transition hover:bg-semantic-legacy-brand-blush/40 md:inline-flex"
            >
              Account
            </RouterLink>

            <RouterLink
              to="/account"
              className="inline-flex h-10 w-10 items-center justify-center text-semantic-text-primary hover:text-semantic-text-primary/80 md:hidden"
              aria-label="Account"
            >
              <UserRound className="h-6 w-6" />
            </RouterLink>
          </div>
        </div>
      </div>
    </>
  )
}

export default PublicHeader
