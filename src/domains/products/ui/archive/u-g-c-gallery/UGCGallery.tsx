export const UGCGallery = ({
  items,
}: {
  items: { src: string; type: 'image' | 'video'; caption?: string }[]
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {items.map((m, i) => (
        <figure key={i} className="overflow-hidden rounded-xl border border-brand-blush/60">
          {m.type === 'image' ? (
            <img src={m.src} alt={m.caption || 'UGC'} className="h-48 w-full object-cover" loading="lazy" />
          ) : (
            <video src={m.src} controls className="h-48 w-full object-cover" />
          )}
          {m.caption ? (
            <figcaption className="px-3 py-2 text-sm text-brand-cocoa/70">{m.caption}</figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  )
}

