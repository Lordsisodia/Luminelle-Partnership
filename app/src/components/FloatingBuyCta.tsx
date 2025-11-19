import { useEffect, useState } from 'react'

type Props = { label?: string; href: string }

export const FloatingBuyCta = ({ label = 'Buy Now', href }: Props) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isCtaInView, setIsCtaInView] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 320)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const targets = Array.from(document.querySelectorAll('[data-sticky-buy-target]'))
    if (!targets.length) return
    const io = new IntersectionObserver(
      (entries) => {
        setIsCtaInView(entries.some((entry) => entry.isIntersecting))
      },
      { rootMargin: '0px 0px -40% 0px' }
    )
    targets.forEach((el) => io.observe(el))
    return () => {
      targets.forEach((el) => io.unobserve(el))
      io.disconnect()
    }
  }, [])

  const show = isVisible && !isCtaInView

  return (
    <div className={`pointer-events-none fixed inset-x-0 bottom-6 z-50 px-4 transition-opacity duration-300 md:hidden ${show ? 'opacity-100' : 'opacity-0'}`}>
      <a href={href} className="pointer-events-auto flex w-full items-center justify-center gap-2 rounded-full bg-brand-peach px-6 py-4 text-lg font-semibold text-brand-cocoa shadow-soft transition hover:-translate-y-0.5">
        {label}
      </a>
    </div>
  )
}
