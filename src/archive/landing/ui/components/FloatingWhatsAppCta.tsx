import { useEffect, useState } from 'react'

type FloatingWhatsAppCtaProps = {
  label: string
  onClick: () => void
}

export const FloatingWhatsAppCta = ({
  label,
  onClick,
}: FloatingWhatsAppCtaProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isJoinInView, setIsJoinInView] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 320)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const joinSection = document.getElementById('join')
    if (!joinSection || !('IntersectionObserver' in window)) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsJoinInView(entry.isIntersecting)
      },
      {
        rootMargin: '0px 0px -40% 0px',
      }
    )

    observer.observe(joinSection)
    return () => observer.disconnect()
  }, [])

  const shouldShow = isVisible && !isJoinInView

  return (
    <div
      aria-hidden={!shouldShow}
      className={`pointer-events-none fixed inset-x-0 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] z-50 px-4 transition-opacity duration-300 md:hidden ${
        shouldShow ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <button
        onClick={onClick}
        type="button"
        tabIndex={shouldShow ? 0 : -1}
        className="pointer-events-auto flex w-full items-center justify-center gap-2 rounded-full bg-brand-peach px-6 py-4 text-lg font-semibold text-brand-cocoa shadow-soft transition hover:-translate-y-0.5"
      >
        {label}
      </button>
    </div>
  )
}
