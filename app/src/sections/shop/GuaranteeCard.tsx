export const GuaranteeCard = ({ title = '30‑day Luxe Guarantee', bullets = ['Free UK exchanges', 'Fast, tracked shipping', 'Secure checkout'] }: { title?: string; bullets?: string[] }) => (
  <section className="bg-white">
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <div className="rounded-2xl border border-brand-peach/50 bg-white/95 p-6 shadow-soft">
        <h3 className="font-heading text-xl font-bold text-brand-cocoa">{title}</h3>
        <div className="mt-3 space-y-1 text-base font-semibold text-brand-cocoa">
          {bullets.map((b, i) => (
            <div key={i} className="leading-snug">
              {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
)

export default GuaranteeCard
