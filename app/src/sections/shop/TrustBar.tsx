import { Truck, RotateCcw, Lock } from 'lucide-react'

const items = [
  {
    icon: <Truck className="h-4 w-4" />,
    label: 'Fast shipping',
  },
  {
    icon: <RotateCcw className="h-4 w-4" />,
    label: 'Easy returns',
  },
  {
    icon: <Lock className="h-4 w-4" />,
    label: 'Secure checkout',
  },
]

export const TrustBar = () => (
  <div className="overflow-hidden bg-brand-blush text-brand-cocoa">
    <div className="relative">
      <div
        className="flex min-w-max items-center gap-6 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.28em] md:text-xs"
        style={{ animation: 'marquee 18s linear infinite' }}
      >
        {[...items, ...items].map((item, idx) => (
          <span key={`${item.label}-${idx}`} className="inline-flex items-center gap-2 whitespace-nowrap">
            {item.icon}
            {item.label}
            <span className="h-1 w-1 rounded-full bg-brand-cocoa/35" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  </div>
)
