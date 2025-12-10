import { useEffect, useRef, useState } from 'react'

const items = [
  { label: '30 day money back guarantee' },
  { label: 'Free shipping on orders £20+' },
  { label: 'Buy 2, save 10% • Shop now', href: '/product/lumelle-shower-cap' },
]

export const TrustBar = () => {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [duration, setDuration] = useState(18)

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
    <div className="overflow-hidden bg-brand-blush text-brand-cocoa">
      <div className="relative">
        <div
          ref={trackRef}
          className="flex min-w-max items-center gap-6 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] md:text-xs"
          style={
            duration === 0
              ? undefined
              : { animation: `marquee ${duration}s linear infinite`, willChange: 'transform' }
          }
        >
          {[...items, ...items].map((item, idx) => (
            <span key={`${item.label}-${idx}`} className="inline-flex items-center gap-2 whitespace-nowrap">
              {item.href ? (
                <a href={item.href} className="underline decoration-brand-cocoa/50 underline-offset-4 hover:text-brand-cocoa/80">
                  {item.label}
                </a>
              ) : (
                item.label
              )}
              <span className="h-1 w-1 rounded-full bg-brand-cocoa/35" aria-hidden />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
