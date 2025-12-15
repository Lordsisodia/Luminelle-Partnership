import { Link as RouterLink } from 'react-router-dom'
import { Menu, UserRound } from 'lucide-react'
import { useDrawer } from '@ui/providers/DrawerContext'
import { useAuth } from '@auth/ui/providers/AuthContext'

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
  const { openMenu } = useDrawer()
  const { signedIn } = useAuth()
  const handleOpenMenu = onOpenMenu ?? openMenu

  return (
    <>
      {/* Promo strip */}
      <div className="overflow-hidden bg-semantic-legacy-brand-blush text-semantic-text-primary">
        <div className="px-4 md:px-6">
          <div className="relative flex h-10 items-center justify-center text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary sm:text-[13px]">
            {promoMessages.map((msg, idx) => (
              <span
                key={msg.label}
                className={`absolute whitespace-nowrap transition-opacity duration-400 ${idx === activePromo ? 'opacity-100' : 'opacity-0'}`}
                aria-hidden={idx !== activePromo}
              >
                {msg.href ? (
                  <RouterLink
                    to={msg.href}
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
      <div className="px-4 md:px-6">
        <div className="relative flex items-center justify-between gap-4 py-2 md:py-3">
          <button
            aria-label="Open menu"
            onClick={handleOpenMenu}
            className="inline-flex h-10 w-10 items-center justify-center text-semantic-text-primary hover:text-semantic-text-primary/80"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex items-center gap-2">
            {onPrimaryAction ? (
              <button
                onClick={onPrimaryAction}
                type="button"
                className="hidden items-center justify-center gap-2 rounded-full bg-semantic-accent-cta px-5 py-2 text-sm font-semibold text-semantic-text-primary shadow-soft transition-transform hover:-translate-y-0.5 hover:bg-semantic-accent-cta/90 md:inline-flex"
              >
                {primaryLabel}
              </button>
            ) : null}

            {signedIn ? (
              <RouterLink
                to="/account"
                className="hidden rounded-full border border-semantic-legacy-brand-blush/60 px-4 py-2 text-sm font-semibold text-semantic-text-primary transition hover:bg-semantic-legacy-brand-blush/40 md:inline-flex"
              >
                Account
              </RouterLink>
            ) : (
              <button
                type="button"
                onClick={handleOpenMenu}
                className="hidden rounded-full border border-semantic-legacy-brand-blush/60 px-4 py-2 text-sm font-semibold text-semantic-text-primary transition hover:bg-semantic-legacy-brand-blush/40 md:inline-flex"
              >
                Account
              </button>
            )}

            {signedIn ? (
              <RouterLink
                to="/account"
                className="inline-flex h-10 w-10 items-center justify-center text-semantic-text-primary hover:text-semantic-text-primary/80"
                aria-label="Account"
              >
                <UserRound className="h-6 w-6" />
              </RouterLink>
            ) : (
              <button
                type="button"
                onClick={handleOpenMenu}
                className="inline-flex h-10 w-10 items-center justify-center text-semantic-text-primary hover:text-semantic-text-primary/80"
                aria-label="Open account menu"
              >
                <UserRound className="h-6 w-6" />
              </button>
            )}
          </div>

          <RouterLink
            to="/"
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 text-center"
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
        </div>
      </div>
    </>
  )
}

export default PublicHeader
