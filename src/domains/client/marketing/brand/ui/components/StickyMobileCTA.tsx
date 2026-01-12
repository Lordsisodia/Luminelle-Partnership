import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isNearFooter, setIsNearFooter] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = 600

      setIsVisible(scrollY > heroHeight)

      const footer = document.querySelector('footer')
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top
        const windowHeight = window.innerHeight
        setIsNearFooter(footerTop < windowHeight + 100)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible || isNearFooter) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-semantic-accent-cta/20 bg-white/95 backdrop-blur p-4 shadow-[-4px_0_20px_rgba(0,0,0,0.1)] md:hidden animate-in slide-in-from-bottom duration-300">
      <Link
        to="/product/lumelle-shower-cap"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-semantic-legacy-brand-cocoa px-6 py-3 text-base font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.14)]"
      >
        Shop the cap
        <span className="text-sm font-normal opacity-90">£14.99</span>
      </Link>
    </div>
  )
}
