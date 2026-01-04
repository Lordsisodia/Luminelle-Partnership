import { useEffect, useRef, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { FREE_SHIPPING_THRESHOLD_LABEL } from '@/config/constants'

const items = [
  { label: '30 day money back guarantee' },
  { label: `Free shipping ${FREE_SHIPPING_THRESHOLD_LABEL}` },
  { label: 'Buy 2, save 10% • Shop now', href: '/product/lumelle-shower-cap' },
]

export const TrustBar = () => {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [duration, setDuration] = useState(18)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (prefersReduce.matches) {
      setDuration(0)
      return
    }

    const totalWidth = el.scrollWidth
    const containerWidth = el.parentElement?.getBoundingClientRect().width || window.innerWidth
    const pxPerSecond = 70 // target speed; tweak for smoothness
    const calculated = (totalWidth + containerWidth) / pxPerSecond
    setDuration(Number(Math.max(12, Math.min(32, calculated)).toFixed(1)))
  }, [])

  return (
    <div
      className="overflow-hidden bg-semantic-legacy-brand-blush text-semantic-text-primary"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onPointerDown={() => setPaused(true)}
      onPointerUp={() => setPaused(false)}
      onPointerCancel={() => setPaused(false)}
    >
      <div className="relative">
        <div
          ref={trackRef}
          className="flex min-w-max items-center gap-6 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] md:text-xs"
          style={
            duration === 0
              ? undefined
              : {
                  animation: `marquee ${duration}s linear infinite`,
                  animationPlayState: paused ? 'paused' : 'running',
                  willChange: 'transform',
                }
          }
        >
          {[...items, ...items].map((item, idx) => (
            <span key={`${item.label}-${idx}`} className="inline-flex items-center gap-2 whitespace-nowrap">
              {item.href ? (
                <RouterLink to={item.href} className="underline decoration-semantic-text-primary/50 underline-offset-4 hover:text-semantic-text-primary/80">
                  {item.label}
                </RouterLink>
              ) : (
                item.label
              )}
              <span className="h-1 w-1 rounded-full bg-semantic-legacy-brand-cocoa/35" aria-hidden />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
