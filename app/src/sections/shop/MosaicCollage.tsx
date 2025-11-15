export const MosaicCollage = ({
  images,
}: {
  images: { src: string; alt?: string }[]
}) => {
  const [a, b, c] = images
  return (
    <div>
      {/* Mobile: horizontal scroll with peek */}
      <div className="flex gap-3 overflow-x-auto md:hidden">
        {images.map((p, i) => (
          <img key={i} src={p.src} alt={p.alt || 'Lumelle'} className="h-40 w-60 shrink-0 rounded-2xl border border-brand-blush/60 object-cover" />
        ))}
      </div>
      {/* Desktop: 2x2 mosaic */}
      <div className="hidden grid-cols-3 gap-4 md:grid">
        <div className="col-span-2 row-span-2 overflow-hidden rounded-2xl border border-brand-blush/60">
          <img src={a?.src} alt={a?.alt || 'Lumelle'} className="h-full w-full object-cover" />
        </div>
        <div className="overflow-hidden rounded-2xl border border-brand-blush/60">
          <img src={b?.src} alt={b?.alt || 'Lumelle'} className="h-full w-full object-cover" />
        </div>
        <div className="overflow-hidden rounded-2xl border border-brand-blush/60">
          <img src={c?.src} alt={c?.alt || 'Lumelle'} className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  )
}

