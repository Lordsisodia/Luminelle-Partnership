import { StarRating } from '@/components/StarRating'

export const RatingSnippet = ({ rating, count, quote }: { rating: number; count: number; quote: string }) => (
  <section className="bg-white">
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-brand-blush/60 bg-white p-4">
        <div className="flex items-center gap-3">
          <StarRating value={rating} size={16} />
          <div className="text-sm font-semibold text-brand-cocoa">
            {rating.toFixed(1)} ({count.toLocaleString()})
          </div>
        </div>
        <p className="text-sm text-brand-cocoa/70">{quote}</p>
      </div>
    </div>
  </section>
)

export default RatingSnippet

