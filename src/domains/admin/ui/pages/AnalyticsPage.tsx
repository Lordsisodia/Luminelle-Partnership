import { useEffect, useState } from 'react'
import { setNoIndexNoFollow } from '@/lib/seo'
import { AdminLayout } from '@admin/ui/layouts'

type Summary = {
  totalOrders: number
  totalRevenue: number
  customers: number
  last30: { orders: number; revenue: number; aov: number }
}

export default function AnalyticsPage() {
  const [data, setData] = useState<Summary | null>(null)
  const [daily, setDaily] = useState<{ day: string; revenue: number; orders: number }[]>([])
  const [repeat, setRepeat] = useState<{ repeatRate90: number; cohorts: { cohort: string; customers: number }[] } | null>(null)
  const [topSkus, setTopSkus] = useState<{ title: string; units: number; revenue: number }[]>([])
  const [utmSources, setUtmSources] = useState<{ utm_source: string; orders: number }[]>([])
  const [sourceRevenue, setSourceRevenue] = useState<{ utm_source: string; revenue: number; orders: number }[]>([])
  const [refundsBySku, setRefundsBySku] = useState<{ title: string; units: number; value: number }[]>([])
  const [refund, setRefund] = useState<{ last30: { total: number; refunded: number; rate: number } } | null>(null)
  const [adminPass, setAdminPass] = useState<string>(() => sessionStorage.getItem('lumelle_admin_pass') || '')
  const [days, setDays] = useState(30)

  useEffect(() => { setNoIndexNoFollow() }, [])
  useEffect(() => {
    fetch('/api/metrics/summary').then((r) => r.json()).then(setData).catch(() => setData(null))
    fetch(`/api/metrics/daily?days=${days}`).then((r) => r.json()).then(setDaily).catch(() => setDaily([]))
    fetch('/api/metrics/repeat').then((r) => r.json()).then(setRepeat).catch(() => setRepeat(null))
    fetch(`/api/metrics/top-skus?days=${days}`).then((r) => r.json()).then(setTopSkus).catch(() => setTopSkus([]))
    fetch(`/api/metrics/utm-sources?days=${days}`).then((r) => r.json()).then(setUtmSources).catch(() => setUtmSources([]))
    fetch(`/api/metrics/refund-rate?days=${days}`).then((r) => r.json()).then(setRefund).catch(() => setRefund(null))
    fetch(`/api/metrics/source-revenue?days=${days}`).then((r) => r.json()).then(setSourceRevenue).catch(() => setSourceRevenue([]))
    fetch(`/api/metrics/refunds-by-sku?days=${days}`).then((r) => r.json()).then(setRefundsBySku).catch(() => setRefundsBySku([]))
  }, [days])

  return (
    <AdminLayout title="Analytics">
      <div className="flex flex-wrap items-center gap-2">
        <button
          className="rounded-full border border-brand-blush/60 px-4 py-2 text-sm font-semibold text-brand-cocoa"
          onClick={async () => {
            try {
              const pass = adminPass || prompt('Admin pass (INTERNAL_SHARED_SECRET)') || ''
              if (!pass) return
              sessionStorage.setItem('lumelle_admin_pass', pass)
              setAdminPass(pass)
              const res = await fetch('/api/exports/orders', { headers: { Authorization: `Bearer ${pass}` } })
              const blob = await res.blob()
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'orders.csv'
              document.body.appendChild(a)
              a.click()
              a.remove()
              URL.revokeObjectURL(url)
            } catch {}
          }}
        >
          Export orders CSV
        </button>
        <button
          className="rounded-full border border-brand-blush/60 px-4 py-2 text-sm font-semibold text-brand-cocoa"
          onClick={async () => {
            try {
              const pass = adminPass || prompt('Admin pass (INTERNAL_SHARED_SECRET)') || ''
              if (!pass) return
              sessionStorage.setItem('lumelle_admin_pass', pass)
              setAdminPass(pass)
              const res = await fetch('/api/exports/customers', { headers: { Authorization: `Bearer ${pass}` } })
              const blob = await res.blob()
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'customers.csv'
              document.body.appendChild(a)
              a.click()
              a.remove()
              URL.revokeObjectURL(url)
            } catch {}
          }}
        >
          Export customers CSV
        </button>
        <div className="ml-auto inline-flex items-center gap-2 text-sm text-brand-cocoa/80">
          <span>Range:</span>
          {[7,30,90].map((d) => (
            <button key={d} onClick={() => setDays(d)} className={`rounded-full border px-3 py-1 ${days===d?'border-brand-cocoa':'border-brand-blush/60'}`}>{d}d</button>
          ))}
        </div>
      </div>

      {!data ? (
        <div className="mt-4 rounded-2xl border border-brand-blush/60 bg-white p-6 text-brand-cocoa/80">Loading…</div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-brand-blush/60 bg-white p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Total revenue</div>
            <div className="mt-2 text-2xl font-semibold">£{data.totalRevenue.toFixed(2)}</div>
          </div>
          <div className="rounded-2xl border border-brand-blush/60 bg-white p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Total orders</div>
            <div className="mt-2 text-2xl font-semibold">{data.totalOrders}</div>
          </div>
          <div className="rounded-2xl border border-brand-blush/60 bg-white p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Customers</div>
            <div className="mt-2 text-2xl font-semibold">{data.customers}</div>
          </div>
          <div className="rounded-2xl border border-brand-blush/60 bg-white p-5 md:col-span-3">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Last 30 days</div>
            <div className="mt-2 grid gap-4 md:grid-cols-3">
              <div className="text-lg"><span className="font-semibold">Orders:</span> {data.last30.orders}</div>
              <div className="text-lg"><span className="font-semibold">Revenue:</span> £{data.last30.revenue.toFixed(2)}</div>
              <div className="text-lg"><span className="font-semibold">AOV:</span> £{data.last30.aov.toFixed(2)}</div>
            </div>
          </div>
          {/* Simple SVG line chart for daily revenue */}
          <div className="rounded-2xl border border-brand-blush/60 bg-white p-5 md:col-span-3">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Revenue vs Orders (30d)</div>
            <ComboLineChart revenue={daily.map(d => ({ x: d.day, y: Number(d.revenue) }))} orders={daily.map(d => ({ x: d.day, y: Number(d.orders) }))} />
          </div>
          <div className="rounded-2xl border border-brand-blush/60 bg-white p-5 md:col-span-3">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Top SKUs</div>
            <table className="mt-2 w-full text-sm">
              <thead>
                <tr className="text-left text-[12px] text-brand-cocoa/60"><th className="py-1">Title</th><th className="py-1">Units</th><th className="py-1 text-right">Revenue</th></tr>
              </thead>
              <tbody>
                {topSkus.map((s) => (
                  <tr key={s.title} className="border-t border-brand-blush/40">
                    <td className="py-1 pr-3">{s.title}</td>
                    <td className="py-1 pr-3">{s.units}</td>
                    <td className="py-1 text-right">£{s.revenue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-2xl border border-brand-blush/60 bg-white p-5 md:col-span-3">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Top Sources (UTM)</div>
            <table className="mt-2 w-full text-sm">
              <thead>
                <tr className="text-left text-[12px] text-brand-cocoa/60"><th className="py-1">utm_source</th><th className="py-1 text-right">Orders</th></tr>
              </thead>
              <tbody>
                {utmSources.map((s) => (
                  <tr key={s.utm_source} className="border-top border-brand-blush/40">
                    <td className="py-1 pr-3">{s.utm_source}</td>
                    <td className="py-1 text-right">{s.orders}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {refund ? (
            <div className="rounded-2xl border border-brand-blush/60 bg-white p-5 md:col-span-3">
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Refund rate (30d)</div>
              <div className="mt-2 text-2xl font-semibold">{Math.round(refund.last30.rate * 100)}% <span className="text-sm text-brand-cocoa/60">({refund.last30.refunded}/{refund.last30.total})</span></div>
            </div>
          ) : null}
          <div className="rounded-2xl border border-brand-blush/60 bg-white p-5 md:col-span-3">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Revenue by source (30d)</div>
            <table className="mt-2 w-full text-sm">
              <thead>
                <tr className="text-left text-[12px] text-brand-cocoa/60"><th className="py-1">utm_source</th><th className="py-1">Orders</th><th className="py-1 text-right">Revenue</th></tr>
              </thead>
              <tbody>
                {sourceRevenue.map((s) => (
                  <tr key={s.utm_source} className="border-t border-brand-blush/40">
                    <td className="py-1 pr-3">{s.utm_source}</td>
                    <td className="py-1 pr-3">{s.orders}</td>
                    <td className="py-1 text-right">£{Number(s.revenue || 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-2xl border border-brand-blush/60 bg-white p-5 md:col-span-3">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Refunds by SKU ({days}d)</div>
            <table className="mt-2 w-full text-sm">
              <thead>
                <tr className="text-left text-[12px] text-brand-cocoa/60"><th className="py-1">Title</th><th className="py-1">Units</th><th className="py-1 text-right">Value</th></tr>
              </thead>
              <tbody>
                {refundsBySku.map((s) => (
                  <tr key={s.title} className="border-t border-brand-blush/40">
                    <td className="py-1 pr-3">{s.title}</td>
                    <td className="py-1 pr-3">{s.units}</td>
                    <td className="py-1 text-right">£{Number(s.value || 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Repeat rate */}
          {repeat ? (
            <div className="rounded-2xl border border-brand-blush/60 bg-white p-5 md:col-span-3">
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Repeat rate (90d)</div>
              <div className="mt-2 text-2xl font-semibold">{Math.round(repeat.repeatRate90 * 100)}%</div>
              <div className="mt-4 text-sm text-brand-cocoa/70">Cohorts (first orders per month)</div>
              <ul className="mt-1 grid grid-cols-2 gap-2 md:grid-cols-6">
                {repeat.cohorts.map((c) => (
                  <li key={c.cohort} className="rounded-xl border border-brand-blush/60 p-2 text-center">
                    <div className="text-[11px] text-brand-cocoa/60">{c.cohort}</div>
                    <div className="text-sm font-semibold">{c.customers}</div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}
    </AdminLayout>
  )
}

function ComboLineChart({ revenue, orders }: { revenue: { x: string; y: number }[]; orders: { x: string; y: number }[] }) {
  const width = 800, height = 220, padding = 36
  const ysR = revenue.map(d => d.y)
  const ysO = orders.map(d => d.y)
  const maxY = Math.max(...ysR, ...ysO, 1)
  const mapPts = (arr: { x: string; y: number }[]) => arr.map((d, i) => {
    const x = padding + (i / Math.max(1, arr.length - 1)) * (width - padding * 2)
    const y = height - padding - (d.y / maxY) * (height - padding * 2)
    return [x, y]
  })
  const pR = mapPts(revenue), pO = mapPts(orders)
  const path = (pts: number[][]) => pts.map((p, i) => (i === 0 ? `M ${p[0]},${p[1]}` : `L ${p[0]},${p[1]}`)).join(' ')
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="mt-2 w-full">
      <path d={path(pR)} fill="none" stroke="#5B3A2E" strokeWidth={2} />
      <path d={path(pO)} fill="none" stroke="#C39A8D" strokeWidth={2} />
      <g>
        {pR.map((p, i) => (<circle key={`r${i}`} cx={p[0]} cy={p[1]} r={2} fill="#5B3A2E" />))}
        {pO.map((p, i) => (<circle key={`o${i}`} cx={p[0]} cy={p[1]} r={2} fill="#C39A8D" />))}
      </g>
      <g>
        <rect x={padding} y={8} width={12} height={2} fill="#5B3A2E" /><text x={padding+16} y={12} fontSize="10">Revenue</text>
        <rect x={padding+90} y={8} width={12} height={2} fill="#C39A8D" /><text x={padding+106} y={12} fontSize="10">Orders</text>
      </g>
    </svg>
  )
}
