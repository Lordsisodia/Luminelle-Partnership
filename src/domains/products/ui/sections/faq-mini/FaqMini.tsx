export const FaqMini = ({ items }: { items: { q: string; a: string }[] }) => {
  return (
    <div className="divide-y divide-brand-blush/60 rounded-2xl border border-brand-blush/60 bg-white">
      {items.map((f, i) => (
        <details key={i} className="group p-4">
          <summary className="cursor-pointer list-none font-medium text-brand-cocoa">
            {f.q}
          </summary>
          <p className="mt-2 text-brand-cocoa/80">{f.a}</p>
        </details>
      ))}
    </div>
  )
}

