type StarRatingProps = {
  value: number // e.g. 4.9
  outOf?: number
  size?: number
}

export const StarRating = ({ value, outOf = 5, size = 16 }: StarRatingProps) => {
  const fullStars = Math.floor(value)
  const hasHalf = value - fullStars >= 0.5
  const empty = outOf - fullStars - (hasHalf ? 1 : 0)

  const Star = ({ fill = 'currentColor' }: { fill?: string }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      aria-hidden="true"
    >
      <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.786 1.401 8.163L12 18.897l-7.335 3.863 1.401-8.163L.132 9.211l8.2-1.193L12 .587z" />
    </svg>
  )

  const HalfStar = () => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="half">
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.786 1.401 8.163L12 18.897l-7.335 3.863 1.401-8.163L.132 9.211l8.2-1.193L12 .587z" fill="url(#half)" stroke="currentColor" />
    </svg>
  )

  return (
    <span className="inline-flex items-center gap-1 text-amber-500">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`f-${i}`} />
      ))}
      {hasHalf ? <HalfStar /> : null}
      {Array.from({ length: Math.max(0, empty) }).map((_, i) => (
        <Star key={`e-${i}`} fill="transparent" />
      ))}
    </span>
  )
}

