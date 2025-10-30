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

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 320)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-6 z-50 px-4 transition-opacity duration-300 md:hidden ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <button
        onClick={onClick}
        type="button"
        className="pointer-events-auto flex w-full items-center justify-center gap-2 rounded-full bg-brand-peach px-6 py-4 text-lg font-semibold text-brand-cocoa shadow-soft transition hover:-translate-y-0.5"
      >
        {label}
      </button>
    </div>
  )
}
