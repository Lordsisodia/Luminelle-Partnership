import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const UgcStrip = ({
  items,
}: {
  items: { src: string; type: 'image' | 'video'; caption?: string }[]
}) => {
  const tiles = items.slice(0, 10)
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const [progress, setProgress] = useState(0)

  const handleScroll = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    if (maxScroll <= 0) {
      setProgress(1)
      return
    }
    setProgress(Math.min(Math.max(el.scrollLeft / maxScroll, 0), 1))
  }, [])

  useEffect(() => {
    handleScroll()
  }, [handleScroll])

  const scrollBy = (direction: 'left' | 'right') => {
    const el = scrollerRef.current
    if (!el) return
    const delta = direction === 'left' ? -320 : 320
    el.scrollBy({ left: delta, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div className="relative">
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="no-scrollbar overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="relative flex gap-4 pr-12">
            {tiles.map((m, i) => (
              <figure
                key={i}
                className="group relative aspect-[4/3] w-64 min-w-[16rem] rounded-3xl border border-brand-blush/60 bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1"
              >
                <img src={m.src} alt={m.caption || 'Lumelle UGC'} className="h-full w-full rounded-3xl object-cover" loading="lazy" />
                {m.type === 'video' ? (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-black/45 px-3 py-1 text-xs font-semibold text-white">Play</div>
                  </div>
                ) : null}
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-3xl bg-gradient-to-t from-black/70 via-black/20 to-transparent px-4 pb-4 pt-10 text-left">
                  <p className="text-sm font-semibold text-white">{m.caption || 'Creator favorite'}</p>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/70">Lumelle community</p>
                </figcaption>
              </figure>
            ))}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent" />
          </div>
        </div>
        <button
          type="button"
          onClick={() => scrollBy('left')}
          aria-label="Show previous community photo"
          className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/80 p-3 text-brand-cocoa shadow-md backdrop-blur sm:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy('right')}
          aria-label="Show next community photo"
          className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/80 p-3 text-brand-cocoa shadow-md backdrop-blur sm:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-cocoa/70">Swipe through routines</span>
        <div className="flex items-center gap-3">
          <div className="h-1 w-20 rounded-full bg-brand-blush/60">
            <div
              className="h-1 rounded-full bg-brand-cocoa transition-all duration-300"
              style={{ width: `${Math.max(progress, 0.06) * 100}%` }}
            />
          </div>
          <div className="text-xs font-medium text-brand-cocoa/80">
            {Math.min(tiles.length, Math.max(1, Math.round(progress * tiles.length) + 1))}/{tiles.length}
          </div>
        </div>
      </div>
    </div>
  )
}
