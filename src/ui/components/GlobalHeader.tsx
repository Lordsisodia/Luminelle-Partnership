import { Link as RouterLink } from 'react-router-dom'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { UserRound, Menu } from 'lucide-react'
import { useAuth } from '@auth/ui/providers/AuthContext'

type Promo = { label: string; href?: string }

type GlobalHeaderProps = {
  promoMessages: Promo[]
  activePromo: number
  subtitle?: string | null
  primaryLabel?: string
  onPrimaryAction?: () => void
  onOpenMenu: () => void
}

export function GlobalHeader({
  promoMessages,
  activePromo,
  subtitle,
  primaryLabel = 'Join WhatsApp',
  onPrimaryAction,
  onOpenMenu,
}: GlobalHeaderProps) {
  const { signedIn } = useAuth()

  return (
    <>
      {/* Promo strip */}
      <div className="overflow-hidden bg-brand-blush text-brand-cocoa">
        <div className="mx-auto max-w-6xl px-4">
          <div className="relative flex h-10 items-center justify-center text-xs font-semibold uppercase tracking-[0.24em] text-brand-cocoa sm:text-[13px]">
            {promoMessages.map((msg, idx) => (
              <span
                key={msg.label}
                className={`absolute whitespace-nowrap transition-opacity duration-400 ${idx === activePromo ? 'opacity-100' : 'opacity-0'}`}
                aria-hidden={idx !== activePromo}
              >
                {msg.href ? (
                  <RouterLink to={msg.href} className="underline decoration-brand-cocoa/50 underline-offset-4 hover:text-brand-cocoa/80">
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
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex items-center justify-between gap-4 py-4">
          <button
            aria-label="Open menu"
            onClick={onOpenMenu}
            className="inline-flex h-10 w-10 items-center justify-center text-brand-cocoa hover:text-brand-cocoa/80"
          >
            <Menu className="h-6 w-6" />
          </button>

          <RouterLink to="/" className="flex flex-1 flex-col items-center justify-center gap-1 text-center">
            <span className="font-heading text-2xl font-semibold uppercase tracking-[0.24em] text-brand-cocoa md:text-xl">
              Lumelle
            </span>
            {subtitle ? (
              <>
                <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-brand-cocoa/60 md:hidden">
                  {subtitle}
                </span>
                <span className="hidden text-sm font-medium text-brand-cocoa/70 md:inline">{subtitle}</span>
              </>
            ) : null}
          </RouterLink>

          <div className="flex items-center gap-2">
            {onPrimaryAction ? (
              <button
                onClick={onPrimaryAction}
                type="button"
                className="hidden items-center justify-center gap-2 rounded-full bg-brand-peach px-5 py-2 text-sm font-semibold text-brand-cocoa shadow-soft transition-transform hover:-translate-y-0.5 hover:bg-brand-peach/90 md:inline-flex"
              >
                {primaryLabel}
              </button>
            ) : null}

            <SignedOut>
              <RouterLink
                to="/sign-in"
                className="hidden rounded-full border border-brand-blush/60 px-4 py-2 text-sm font-semibold text-brand-cocoa transition hover:bg-brand-blush/40 md:inline-flex"
              >
                Sign in
              </RouterLink>
            </SignedOut>
            <SignedIn>
              <div className="hidden md:block">
                <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: 'h-10 w-10' } }} />
              </div>
            </SignedIn>

            <RouterLink
              to={signedIn ? '/account' : '/sign-in'}
              className="inline-flex h-10 w-10 items-center justify-center text-brand-cocoa hover:text-brand-cocoa/80"
              aria-label={signedIn ? 'Account' : 'Sign in'}
            >
              <UserRound className="h-6 w-6" />
            </RouterLink>
          </div>
        </div>
      </div>
    </>
  )
}

export default GlobalHeader
