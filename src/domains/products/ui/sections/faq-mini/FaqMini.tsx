export const FaqMini = ({ items }: { items: { q: string; a: string }[] }) => {
  return (
    <div className="divide-y divide-semantic-legacy-brand-blush/60 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white">
      {items.map((f, i) => (
        <details key={i} className="group p-4">
          <summary className="cursor-pointer list-none font-medium text-semantic-text-primary">
            {f.q}
          </summary>
          <p className="mt-2 text-semantic-text-primary/80">{f.a}</p>
        </details>
      ))}
    </div>
  )
}
