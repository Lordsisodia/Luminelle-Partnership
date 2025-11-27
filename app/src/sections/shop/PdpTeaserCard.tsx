export const PdpTeaserCard = ({
  data,
}: {
  data: { price: string; bullets: string[]; image: string; href: string }
}) => {
  return (
    <a
      href={data.href}
      className="flex flex-col overflow-hidden rounded-3xl border border-brand-peach/50 bg-white/95 shadow-soft md:flex-row"
    >
      <img src={data.image} alt="Product" className="h-52 w-full object-cover md:h-auto md:w-1/3" loading="lazy" />
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="text-sm uppercase tracking-[0.3em] text-brand-cocoa/60">From</div>
          <div className="text-3xl font-heading font-bold text-brand-cocoa">{data.price}</div>
          <ul className="mt-3 list-disc pl-5 text-brand-cocoa/80">
          {data.bullets.map((b, i) => (
            <li key={i} className="mb-1">{b}</li>
          ))}
        </ul>
        </div>
        <div className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-brand-cocoa px-6 py-2 text-sm font-semibold text-white shadow-soft">
          View details
          <span aria-hidden="true">→</span>
        </div>
      </div>
    </a>
  )
}
