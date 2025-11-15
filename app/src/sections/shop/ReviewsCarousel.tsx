import type { Review } from '@/content/home.config'

export const ReviewsCarousel = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div className="overflow-x-auto">
      <div className="flex snap-x gap-4">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="w-80 shrink-0 snap-start rounded-2xl border border-brand-blush/60 bg-white p-4"
          >
            <div className="text-sm text-amber-500">★★★★★</div>
            <h4 className="mt-1 font-heading text-lg text-brand-cocoa">{r.title}</h4>
            <p className="mt-1 text-sm text-brand-cocoa/80">{r.body}</p>
            <p className="mt-3 text-xs text-brand-cocoa/60">— {r.author}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

