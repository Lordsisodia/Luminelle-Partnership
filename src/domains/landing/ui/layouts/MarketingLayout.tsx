import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { SUPPORT_EMAIL } from '@/config/constants'
import { GlobalHeader } from '@ui/components/GlobalHeader'
import { GlobalFooter } from '@ui/components/GlobalFooter'

export type NavItem = {
  id: string
  label: string
}

type MarketingLayoutProps = {
  children: ReactNode
  navItems: NavItem[]
  activeId?: string
  onPrimaryAction?: () => void
  primaryLabel?: string
  subtitle?: string | null
}

export const MarketingLayout = ({
  children,
  navItems: _navItems,
  activeId: _activeId,
  onPrimaryAction,
  primaryLabel = 'Join WhatsApp',
  subtitle = 'Creator Program',
}: MarketingLayoutProps) => {
  void _navItems
  void _activeId

  const promoMessages = [
    { label: 'Free shipping over £19.99' },
    { label: '30-day money back guarantee' },
    { label: 'Buy 2, save 10% — Shop now', href: '/product/shower-cap' },
  ]
  const [activePromo, setActivePromo] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setActivePromo((prev) => (prev + 1) % promoMessages.length)
    }, 4000)
    return () => window.clearInterval(id)
  }, [promoMessages.length])

  const [showHeader, setShowHeader] = useState(true)
  const lastScrollRef = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      const last = lastScrollRef.current
      const delta = current - last

      if (current < 12) {
        setShowHeader(true)
      } else if (delta > 6) {
        setShowHeader(false)
      } else if (delta < -6) {
        setShowHeader(true)
      }

      lastScrollRef.current = current
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white text-brand-cocoa">
      <header
        className={`sticky top-0 z-50 border-b border-brand-blush/40 bg-white/95 backdrop-blur transition-transform duration-250 ease-out ${
          showHeader ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <GlobalHeader
          promoMessages={promoMessages}
          activePromo={activePromo}
          subtitle={subtitle ?? undefined}
          primaryLabel={primaryLabel}
          onPrimaryAction={onPrimaryAction}
        />
      </header>
      <main>{children}</main>
      <GlobalFooter supportEmail={SUPPORT_EMAIL} />
    </div>
  )
}

export default MarketingLayout
