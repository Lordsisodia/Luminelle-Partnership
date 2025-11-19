import type { ComponentType } from 'react'

type Benefit = {
  icon?: ComponentType<{ className?: string }> | string
  title: string
  body: string
}

export const Benefits3 = ({ items }: { items: Benefit[] }) => {
  const three = items.slice(0, 3)
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {three.map((b, i) => (
            <div key={i} className="rounded-2xl border border-brand-blush/60 bg-white p-5">
              {b.icon && typeof b.icon !== 'string' ? (
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-blush/30 text-brand-cocoa">
                  <b.icon className="h-5 w-5" />
                </div>
              ) : null}
              <h3 className="font-heading text-lg text-brand-cocoa">{b.title}</h3>
              <p className="mt-1 text-sm text-brand-cocoa/80">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Benefits3
