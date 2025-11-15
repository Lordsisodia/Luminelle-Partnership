export const FeatureCollage = ({
  images,
}: {
  images: { src: string; alt?: string }[]
}) => {
  const pics = images.slice(0, 3)
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {pics.map((p, i) => (
        <figure key={i} className="overflow-hidden rounded-2xl border border-brand-blush/60">
          <img src={p.src} alt={p.alt || 'Lumelle'} className="h-56 w-full object-cover md:h-72" loading="lazy" />
        </figure>
      ))}
    </div>
  )
}

