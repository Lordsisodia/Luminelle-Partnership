import { Truck, RotateCcw, Lock } from 'lucide-react'

export const TrustBar = () => (
  <div className="bg-brand-blush text-brand-cocoa">
    <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-4 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.28em] md:text-xs">
      <span className="inline-flex items-center gap-1">
        <Truck className="h-4 w-4" />
        Fast shipping
      </span>
      <span className="h-1 w-1 rounded-full bg-brand-cocoa/50" />
      <span className="inline-flex items-center gap-1">
        <RotateCcw className="h-4 w-4" />
        Easy returns
      </span>
      <span className="h-1 w-1 rounded-full bg-brand-cocoa/50" />
      <span className="inline-flex items-center gap-1">
        <Lock className="h-4 w-4" />
        Secure checkout
      </span>
    </div>
  </div>
)
