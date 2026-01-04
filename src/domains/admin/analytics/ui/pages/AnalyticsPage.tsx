import { useEffect, useMemo, useState } from 'react'
import { Link as RouterLink, useSearchParams } from 'react-router-dom'
import { AdminPageLayout } from '@admin/shared/ui/layouts'

type TrendPoint = { x: string; revenue: number; orders: number }

const allowMockAnalyticsInProd = (import.meta.env.VITE_ALLOW_MOCK_ADMIN_ANALYTICS as any) === '1'
const analyticsMockEnabled = !import.meta.env.PROD || allowMockAnalyticsInProd

const MOCK_DAILY: TrendPoint[] = [
  { x: '2025-11-20', revenue: 3100, orders: 42 },
  { x: '2025-11-21', revenue: 2800, orders: 39 },
  { x: '2025-11-22', revenue: 3650, orders: 47 },
  { x: '2025-11-23', revenue: 4200, orders: 53 },
  { x: '2025-11-24', revenue: 3800, orders: 51 },
  { x: '2025-11-25', revenue: 5200, orders: 60 },
  { x: '2025-11-26', revenue: 6100, orders: 74 },
  { x: '2025-11-27', revenue: 4900, orders: 63 },
  { x: '2025-11-28', revenue: 7800, orders: 95 },
  { x: '2025-11-29', revenue: 6200, orders: 77 },
  { x: '2025-11-30', revenue: 5400, orders: 71 },
  { x: '2025-12-01', revenue: 6800, orders: 86 },
  { x: '2025-12-02', revenue: 7200, orders: 91 },
  { x: '2025-12-03', revenue: 6900, orders: 88 },
  { x: '2025-12-04', revenue: 5600, orders: 75 },
  { x: '2025-12-05', revenue: 6100, orders: 80 },
  { x: '2025-12-06', revenue: 6500, orders: 84 },
  { x: '2025-12-07', revenue: 7000, orders: 90 },
  { x: '2025-12-08', revenue: 7400, orders: 95 },
  { x: '2025-12-09', revenue: 7800, orders: 99 },
  { x: '2025-12-10', revenue: 7600, orders: 96 },
  { x: '2025-12-11', revenue: 7200, orders: 90 },
  { x: '2025-12-12', revenue: 6900, orders: 88 },
  { x: '2025-12-13', revenue: 7100, orders: 92 },
  { x: '2025-12-14', revenue: 7600, orders: 99 },
  { x: '2025-12-15', revenue: 8300, orders: 108 },
  { x: '2025-12-16', revenue: 8700, orders: 112 },
  { x: '2025-12-17', revenue: 8400, orders: 107 },
  { x: '2025-12-18', revenue: 9100, orders: 118 },
  { x: '2025-12-19', revenue: 9400, orders: 121 },
]

type TrafficPoint = { x: string; sessions: number; users: number; avgTime: number; bounce: number }

const MOCK_TRAFFIC: TrafficPoint[] = [
  { x: '2025-11-20', sessions: 2100, users: 1850, avgTime: 78, bounce: 42 },
  { x: '2025-11-21', sessions: 1980, users: 1750, avgTime: 74, bounce: 44 },
  { x: '2025-11-22', sessions: 2250, users: 1990, avgTime: 82, bounce: 40 },
  { x: '2025-11-23', sessions: 2400, users: 2120, avgTime: 86, bounce: 39 },
  { x: '2025-11-24', sessions: 2330, users: 2060, avgTime: 80, bounce: 41 },
  { x: '2025-11-25', sessions: 2600, users: 2280, avgTime: 90, bounce: 37 },
  { x: '2025-11-26', sessions: 2750, users: 2400, avgTime: 92, bounce: 36 },
  { x: '2025-11-27', sessions: 2550, users: 2220, avgTime: 84, bounce: 38 },
  { x: '2025-11-28', sessions: 3200, users: 2860, avgTime: 96, bounce: 34 },
  { x: '2025-11-29', sessions: 2980, users: 2650, avgTime: 92, bounce: 35 },
  { x: '2025-11-30', sessions: 2860, users: 2550, avgTime: 88, bounce: 36 },
  { x: '2025-12-01', sessions: 3100, users: 2780, avgTime: 94, bounce: 33 },
  { x: '2025-12-02', sessions: 3260, users: 2910, avgTime: 95, bounce: 32 },
  { x: '2025-12-03', sessions: 3180, users: 2850, avgTime: 93, bounce: 34 },
  { x: '2025-12-04', sessions: 2950, users: 2630, avgTime: 87, bounce: 36 },
  { x: '2025-12-05', sessions: 3040, users: 2720, avgTime: 90, bounce: 35 },
  { x: '2025-12-06', sessions: 3150, users: 2800, avgTime: 94, bounce: 34 },
  { x: '2025-12-07', sessions: 3270, users: 2920, avgTime: 96, bounce: 33 },
  { x: '2025-12-08', sessions: 3390, users: 3040, avgTime: 98, bounce: 32 },
  { x: '2025-12-09', sessions: 3510, users: 3140, avgTime: 102, bounce: 31 },
  { x: '2025-12-10', sessions: 3450, users: 3090, avgTime: 100, bounce: 31 },
  { x: '2025-12-11', sessions: 3300, users: 2970, avgTime: 95, bounce: 32 },
  { x: '2025-12-12', sessions: 3220, users: 2910, avgTime: 92, bounce: 33 },
  { x: '2025-12-13', sessions: 3340, users: 3010, avgTime: 96, bounce: 32 },
  { x: '2025-12-14', sessions: 3480, users: 3120, avgTime: 101, bounce: 31 },
  { x: '2025-12-15', sessions: 3720, users: 3340, avgTime: 106, bounce: 30 },
  { x: '2025-12-16', sessions: 3860, users: 3460, avgTime: 108, bounce: 29 },
  { x: '2025-12-17', sessions: 3780, users: 3390, avgTime: 105, bounce: 30 },
  { x: '2025-12-18', sessions: 4020, users: 3610, avgTime: 112, bounce: 29 },
  { x: '2025-12-19', sessions: 4170, users: 3740, avgTime: 116, bounce: 28 },
]

const MOCK_SUMMARY = {
  totalRevenue: 412_800,
  totalOrders: 5_260,
  customers: 3_980,
  last30: { orders: 2_120, revenue: 132_450, aov: 62.5 },
  margin: 0.63,
}

const MOCK_PAGES = [
  { path: '/', title: 'Home', views: 48200, uniques: 39100, avgTime: 94, bounce: 34, exit: 22 },
  { path: '/collection/hair', title: 'Hair Collection', views: 28100, uniques: 23100, avgTime: 118, bounce: 29, exit: 17 },
  { path: '/products/luxe-silk-turban', title: 'PDP · Luxe Silk Turban', views: 19400, uniques: 16100, avgTime: 132, bounce: 21, exit: 12 },
  { path: '/products/hydrating-hair-oil', title: 'PDP · Hydrating Hair Oil', views: 16200, uniques: 13600, avgTime: 124, bounce: 23, exit: 14 },
  { path: '/cart', title: 'Cart', views: 14200, uniques: 13200, avgTime: 96, bounce: 18, exit: 31 },
  { path: '/checkout', title: 'Checkout (review)', views: 9800, uniques: 9600, avgTime: 84, bounce: 11, exit: 19 },
  { path: '/blog/weekly-ritual', title: 'Blog · Weekly Ritual', views: 7200, uniques: 6300, avgTime: 188, bounce: 42, exit: 47 },
]

const MOCK_COMPONENTS = [
  { name: 'Hero CTA (home)', clicks: 6100, ctr: 7.8, rage: 0.6, dead: 1.4 },
  { name: 'Nav · Shop', clicks: 8200, ctr: 5.1, rage: 0.3, dead: 0.9 },
  { name: 'PDP · Add to cart', clicks: 9100, ctr: 12.4, rage: 0.4, dead: 0.7 },
  { name: 'PDP · Size selector', clicks: 7300, ctr: 10.1, rage: 1.2, dead: 1.8 },
  { name: 'Cart · Checkout CTA', clicks: 6400, ctr: 32.0, rage: 0.2, dead: 0.5 },
  { name: 'Blog · Inline product card', clicks: 2800, ctr: 6.3, rage: 0.5, dead: 1.1 },
]

const MOCK_STUCK = [
  { step: 'PDP → ATC', page: '/products/luxe-silk-turban', drop: 38, reasons: ['size unavailable', 'shipping not visible'] },
  { step: 'Cart → Checkout', page: '/cart', drop: 28, reasons: ['unexpected tax', 'slow load'] },
  { step: 'Shipping → Payment', page: '/checkout', drop: 19, reasons: ['card declines', 'address errors'] },
]

const MOCK_TOP_SKUS = [
  { title: 'Luxe Silk Turban', units: 810, revenue: 52_300 },
  { title: 'Travel Vanity Pouch', units: 620, revenue: 31_900 },
  { title: 'Hydrating Hair Oil 50ml', units: 540, revenue: 26_400 },
  { title: 'Weekly Ritual Kit', units: 410, revenue: 35_200 },
  { title: 'Shower Cap (Midnight)', units: 360, revenue: 18_200 },
]

const MOCK_CHANNELS = [
  { label: 'Meta', revenue: 58_200, orders: 790 },
  { label: 'Google', revenue: 46_300, orders: 670 },
  { label: 'Email', revenue: 32_400, orders: 440 },
  { label: 'Organic', revenue: 28_100, orders: 410 },
  { label: 'Affiliate', revenue: 18_700, orders: 250 },
]

const MOCK_SOURCES = [
  { utm_source: 'newsletter', orders: 310, revenue: 18_400 },
  { utm_source: 'ig_influencer', orders: 270, revenue: 15_900 },
  { utm_source: 'meta_ads', orders: 510, revenue: 32_800 },
  { utm_source: 'google_search', orders: 430, revenue: 27_600 },
]

const MOCK_REFUNDS = {
  last30: { total: 2120, refunded: 84, rate: 0.0396 },
  bySku: [
    { title: 'Luxe Silk Turban', units: 12, value: 780 },
    { title: 'Hydrating Hair Oil 50ml', units: 18, value: 540 },
    { title: 'Weekly Ritual Kit', units: 8, value: 640 },
  ],
}

const MOCK_REPEAT = {
  repeatRate90: 0.28,
  cohorts: [
    { cohort: 'Sep', customers: 180 },
    { cohort: 'Oct', customers: 220 },
    { cohort: 'Nov', customers: 260 },
    { cohort: 'Dec', customers: 310 },
    { cohort: 'Jan', customers: 0 },
    { cohort: 'Feb', customers: 0 },
  ],
}

const MOCK_FUNNEL = [
  { step: 'Sessions', value: 142_000 },
  { step: 'Product views', value: 98_400 },
  { step: 'Adds to cart', value: 36_200 },
  { step: 'Checkout', value: 22_800 },
  { step: 'Paid', value: 18_300 },
]

const rangeOptions = [7, 30, 60, 90] as const
type RangeDays = (typeof rangeOptions)[number]

function parseRangeDays(raw: string | null): RangeDays {
  const n = raw ? Number(raw) : NaN
  return (rangeOptions as readonly number[]).includes(n) ? (n as RangeDays) : 30
}

function parseAnalyticsTab(raw: string | null): 'commerce' | 'experience' {
  return raw === 'experience' ? 'experience' : 'commerce'
}

function parseAnalyticsView(raw: string | null): 'revenue' | 'orders' {
  return raw === 'orders' ? 'orders' : 'revenue'
}

export default function AnalyticsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [range, setRange] = useState<RangeDays>(() => parseRangeDays(searchParams.get('range')))
  const [view, setView] = useState<'revenue' | 'orders'>(() => parseAnalyticsView(searchParams.get('view')))
  const [tab, setTab] = useState<'commerce' | 'experience'>(() => parseAnalyticsTab(searchParams.get('tab')))

  // URL -> state (back/forward, deep links)
  useEffect(() => {
    setRange(parseRangeDays(searchParams.get('range')))
    setView(parseAnalyticsView(searchParams.get('view')))
    setTab(parseAnalyticsTab(searchParams.get('tab')))
  }, [searchParams])

  // state -> URL (shareable state without route changes)
  const desiredSearch = useMemo(() => {
    const next = new URLSearchParams()
    next.set('tab', tab)
    next.set('range', String(range))
    next.set('view', view)
    return next
  }, [range, tab, view])

  useEffect(() => {
    if (searchParams.toString() === desiredSearch.toString()) return
    setSearchParams(desiredSearch, { replace: true })
  }, [desiredSearch, searchParams, setSearchParams])

  const sliced = useMemo(() => MOCK_DAILY.slice(-range), [range])
  const traffic = useMemo(() => MOCK_TRAFFIC.slice(-range), [range])
  const aov = useMemo(() => (MOCK_SUMMARY.last30.revenue / Math.max(1, MOCK_SUMMARY.last30.orders)), [])
  const totalSessions = useMemo(() => traffic.reduce((acc, t) => acc + t.sessions, 0), [traffic])
  const totalUsers = useMemo(() => traffic.reduce((acc, t) => acc + t.users, 0), [traffic])
  const avgRage = useMemo(() => MOCK_COMPONENTS.reduce((acc, c) => acc + c.rage, 0) / MOCK_COMPONENTS.length, [])
  const avgDead = useMemo(() => MOCK_COMPONENTS.reduce((acc, c) => acc + c.dead, 0) / MOCK_COMPONENTS.length, [])

  if (!analyticsMockEnabled) {
    return (
      <AdminPageLayout
        title="Analytics"
        subtitle="This page is a prototype and is disabled in production until it’s wired to real data."
      >
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">Demo analytics disabled</p>
          <p className="mt-1 text-amber-900/80">
            This screen currently uses mock data and can be misleading. Enable it temporarily by setting{' '}
            <span className="font-mono text-[12px]">VITE_ALLOW_MOCK_ADMIN_ANALYTICS=1</span>, or wire it to real analytics first.
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <RouterLink
            to="/admin"
            className="inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:-translate-y-0.5 transition"
          >
            Back to dashboard
          </RouterLink>
          <RouterLink
            to="/admin/orders"
            className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-5 py-2.5 text-sm font-semibold text-semantic-text-primary shadow-sm hover:bg-brand-porcelain/60"
          >
            View orders
          </RouterLink>
        </div>
      </AdminPageLayout>
    )
  }

  return (
    <AdminPageLayout
      title="Analytics"
      subtitle="Prototype UI — wired to mock data so we can design the experience before wiring the API."
      actions={
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 text-sm text-semantic-text-primary/80">
            {(['commerce', 'experience'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full border px-3 py-1 text-sm font-semibold transition ${
                  tab === t ? 'border-semantic-legacy-brand-cocoa text-semantic-legacy-brand-cocoa' : 'border-semantic-legacy-brand-blush/60 text-semantic-text-primary'
                }`}
              >
                {t === 'commerce' ? 'Commerce' : 'Experience'}
              </button>
            ))}
          </div>
          <div className="inline-flex items-center gap-2 text-sm text-semantic-text-primary/80">
            <span className="hidden sm:inline">Range</span>
            {rangeOptions.map((d) => (
              <button
                key={d}
                onClick={() => setRange(d)}
                className={`rounded-full border px-3 py-1 text-sm font-semibold transition ${
                  range === d ? 'border-semantic-legacy-brand-cocoa text-semantic-legacy-brand-cocoa' : 'border-semantic-legacy-brand-blush/60 text-semantic-text-primary'
                }`}
              >
                {d}d
              </button>
            ))}
          </div>
          {tab === 'commerce' && (
            <div className="inline-flex items-center gap-2 text-sm text-semantic-text-primary/80">
              <span>View</span>
              {(['revenue', 'orders'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`rounded-full border px-3 py-1 text-sm font-semibold transition ${
                    view === v ? 'border-semantic-legacy-brand-cocoa text-semantic-legacy-brand-cocoa' : 'border-semantic-legacy-brand-blush/60 text-semantic-text-primary'
                  }`}
                >
                  {v === 'revenue' ? 'Revenue' : 'Orders'}
                </button>
              ))}
            </div>
          )}
        </div>
      }
    >
      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <p className="font-semibold">Demo data</p>
        <p className="mt-1 text-amber-900/80">
          This page is currently a prototype using mock datasets. Don’t use these numbers for operational decisions.
        </p>
      </div>

      {tab === 'commerce' ? (
        <>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <StatCard label="Total revenue" value={`£${MOCK_SUMMARY.totalRevenue.toLocaleString()}`} hint="Lifetime" />
            <StatCard label="Total orders" value={MOCK_SUMMARY.totalOrders.toLocaleString()} hint="Lifetime" />
            <StatCard label="Customers" value={MOCK_SUMMARY.customers.toLocaleString()} hint="All time" />
            <StatCard label="Gross margin" value={`${Math.round(MOCK_SUMMARY.margin * 100)}%`} hint="Blended" tone="success" />
            <StatCard label={`Last ${range}d revenue`} value={`£${sum(sliced, 'revenue').toLocaleString()}`} hint={`Avg £${Math.round(sum(sliced, 'revenue') / Math.max(1, range))}/day`} />
            <StatCard label={`Last ${range}d orders`} value={sum(sliced, 'orders').toLocaleString()} hint={`Avg ${Math.round(sum(sliced, 'orders') / Math.max(1, range))}/day`} />
            <StatCard label={`AOV (last 30d)`} value={`£${aov.toFixed(2)}`} hint="Revenue / orders" />
            <StatCard label="Refund rate" value={`${Math.round(MOCK_REFUNDS.last30.rate * 100)}%`} hint={`84 of ${MOCK_REFUNDS.last30.total}`} tone="warning" />
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <Card title={`${view === 'revenue' ? 'Revenue' : 'Orders'} trend`} subtitle="Preview — sparkline shows mock data">
              <ComboLineChart
                revenue={sliced.map((d) => ({ x: d.x.slice(5), y: d.revenue }))}
                orders={sliced.map((d) => ({ x: d.x.slice(5), y: d.orders }))}
                focus={view}
              />
            </Card>

            <Card title="Channel mix" subtitle="Use to debug CAC/ROAS by source" className="lg:col-span-1">
              <ul className="space-y-2 text-sm text-semantic-text-primary">
                {MOCK_CHANNELS.map((c) => (
                  <li key={c.label} className="rounded-xl border border-semantic-legacy-brand-blush/60 px-3 py-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{c.label}</span>
                      <span className="text-semantic-text-primary/70">{c.orders} orders</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[13px] text-semantic-text-primary/80">
                      <span>£{c.revenue.toLocaleString()}</span>
                      <ProgressBar value={(c.revenue / MOCK_SUMMARY.last30.revenue) * 100} />
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            <Card title="Conversion funnel" subtitle="Rough mock to visualise drop-off" className="lg:col-span-1">
              <div className="space-y-3 text-sm text-semantic-text-primary">
                {MOCK_FUNNEL.map((step, idx) => {
                  const pct = step.value / MOCK_FUNNEL[0].value
                  return (
                    <div key={step.step}>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{step.step}</span>
                        <span className="text-semantic-text-primary/70">{step.value.toLocaleString()}</span>
                      </div>
                      <ProgressBar value={pct * 100} tone={idx === MOCK_FUNNEL.length - 1 ? 'accent' : 'neutral'} />
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <Card title="Top products" subtitle={`Sorted by ${view}`}>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[12px] text-semantic-text-primary/60">
                    <th className="py-1">Title</th>
                    <th className="py-1">Units</th>
                    <th className="py-1 text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_TOP_SKUS.map((s) => (
                    <tr key={s.title} className="border-t border-semantic-legacy-brand-blush/40">
                      <td className="py-2 pr-3 font-semibold">{s.title}</td>
                      <td className="py-2 pr-3">{s.units}</td>
                      <td className="py-2 text-right">£{s.revenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <Card title="Top UTMs" subtitle="Orders + revenue contribution">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[12px] text-semantic-text-primary/60">
                    <th className="py-1">utm_source</th>
                    <th className="py-1">Orders</th>
                    <th className="py-1 text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_SOURCES.map((s) => (
                    <tr key={s.utm_source} className="border-t border-semantic-legacy-brand-blush/40">
                      <td className="py-2 pr-3">{s.utm_source}</td>
                      <td className="py-2 pr-3">{s.orders}</td>
                      <td className="py-2 text-right">£{s.revenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <Card title="Repeat customers" subtitle="90d repeat + cohorts" className="lg:col-span-2">
              <div className="flex items-baseline gap-4">
                <div className="text-3xl font-semibold">{Math.round(MOCK_REPEAT.repeatRate90 * 100)}%</div>
                <div className="text-sm text-semantic-text-primary/70">Repeat rate (last 90d)</div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-6">
                {MOCK_REPEAT.cohorts.map((c) => (
                  <div key={c.cohort} className="rounded-xl border border-semantic-legacy-brand-blush/60 px-3 py-2 text-center">
                    <div className="text-[11px] text-semantic-text-primary/60">{c.cohort}</div>
                    <div className="text-sm font-semibold">{c.customers}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Refunds" subtitle="Quick snapshot" className="lg:col-span-1">
              <div className="text-3xl font-semibold">{Math.round(MOCK_REFUNDS.last30.rate * 100)}%</div>
              <div className="text-sm text-semantic-text-primary/70">{MOCK_REFUNDS.last30.refunded} of {MOCK_REFUNDS.last30.total} orders</div>
              <div className="mt-3 text-sm text-semantic-text-primary/80">By SKU</div>
              <ul className="mt-2 space-y-2 text-sm text-semantic-text-primary">
                {MOCK_REFUNDS.bySku.map((s) => (
                  <li key={s.title} className="flex items-center justify-between rounded-xl border border-semantic-legacy-brand-blush/60 px-3 py-2">
                    <span className="font-semibold">{s.title}</span>
                    <span className="text-semantic-text-primary/70">{s.units} • £{s.value.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </>
      ) : (
        <>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <StatCard label={`Sessions (${range}d)`} value={totalSessions.toLocaleString()} hint="All traffic" />
            <StatCard label={`Users (${range}d)`} value={totalUsers.toLocaleString()} hint="Uniques" />
            <StatCard label="Avg time on page" value={`${Math.round(avg(traffic, 'avgTime'))}s`} hint="Weighted avg" />
            <StatCard label="Bounce rate" value={`${Math.round(avg(traffic, 'bounce'))}%`} hint="Site-wide" />
            <StatCard label="Rage click rate" value={`${avgRage.toFixed(1)}%`} hint="Across key components" tone="warning" />
            <StatCard label="Dead click rate" value={`${avgDead.toFixed(1)}%`} hint="Across key components" />
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <Card title="Traffic trend" subtitle="Sessions vs users">
              <TrafficChart traffic={traffic.map((d) => ({ x: d.x.slice(5), sessions: d.sessions, users: d.users }))} />
            </Card>

            <Card title="Top pages" subtitle="Where visitors spend time & leave" className="lg:col-span-2">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[12px] text-semantic-text-primary/60">
                    <th className="py-1">Page</th>
                    <th className="py-1">Views</th>
                    <th className="py-1">Avg time</th>
                    <th className="py-1">Bounce</th>
                    <th className="py-1">Exit</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_PAGES.map((p) => (
                    <tr key={p.path} className="border-t border-semantic-legacy-brand-blush/40">
                      <td className="py-2 pr-3">
                        <div className="font-semibold">{p.title}</div>
                        <div className="text-[12px] text-semantic-text-primary/70">{p.path}</div>
                      </td>
                      <td className="py-2 pr-3">{p.views.toLocaleString()}</td>
                      <td className="py-2 pr-3">{p.avgTime}s</td>
                      <td className="py-2 pr-3">{p.bounce}%</td>
                      <td className="py-2 pr-3">{p.exit}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <Card title="Component interactions" subtitle="Clicks, rage, dead clicks">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[12px] text-semantic-text-primary/60">
                    <th className="py-1">Component</th>
                    <th className="py-1">Clicks</th>
                    <th className="py-1">CTR</th>
                    <th className="py-1">Rage</th>
                    <th className="py-1">Dead</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_COMPONENTS.map((c) => (
                    <tr key={c.name} className="border-t border-semantic-legacy-brand-blush/40">
                      <td className="py-2 pr-3 font-semibold">{c.name}</td>
                      <td className="py-2 pr-3">{c.clicks.toLocaleString()}</td>
                      <td className="py-2 pr-3">{c.ctr}%</td>
                      <td className="py-2 pr-3">{c.rage}%</td>
                      <td className="py-2 pr-3">{c.dead}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <Card title="Stuck points" subtitle="Where users drop and why">
              <ul className="space-y-3 text-sm text-semantic-text-primary">
                {MOCK_STUCK.map((s) => (
                  <li key={s.step} className="rounded-xl border border-semantic-legacy-brand-blush/60 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="font-semibold">{s.step}</div>
                        <div className="text-[12px] text-semantic-text-primary/70">{s.page}</div>
                      </div>
                      <div className="text-lg font-semibold text-amber-700">{s.drop}% drop</div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2 text-[12px] text-semantic-text-primary/80">
                      {s.reasons.map((r) => (
                        <span key={r} className="rounded-full bg-semantic-legacy-brand-blush/30 px-2 py-1">{r}</span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <Card title="Event taxonomy" subtitle="What we’ll capture" className="lg:col-span-1">
              <ul className="space-y-2 text-sm text-semantic-text-primary/90">
                <li><strong>Page:</strong> pageview, scroll_depth, time_on_page</li>
                <li><strong>Component:</strong> component_click, component_dead_click, component_rage_click</li>
                <li><strong>Funnels:</strong> view_product, add_to_cart, begin_checkout, add_shipping_info, payment_start, purchase</li>
                <li><strong>Forms:</strong> form_error, form_abandon</li>
                <li><strong>Perf:</strong> lcp, cls, inp (web vitals)</li>
                <li><strong>Meta:</strong> utm_*, session_id, user_id, device, country</li>
              </ul>
            </Card>

            <Card title="Quality signals" subtitle="Rage & dead click spotlight" className="lg:col-span-1">
              <div className="space-y-3 text-sm text-semantic-text-primary">
                {MOCK_COMPONENTS.slice(0, 3).map((c) => (
                  <div key={c.name} className="rounded-xl border border-semantic-legacy-brand-blush/60 px-3 py-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{c.name}</span>
                      <span className="text-[12px] text-semantic-text-primary/70">{c.clicks.toLocaleString()} clicks</span>
                    </div>
                    <div className="mt-1 text-[12px] text-semantic-text-primary/80 flex items-center gap-2">
                      <span>Rage {c.rage}%</span>
                      <ProgressBar value={c.rage} tone="warning" />
                    </div>
                    <div className="text-[12px] text-semantic-text-primary/80 flex items-center gap-2">
                      <span>Dead {c.dead}%</span>
                      <ProgressBar value={c.dead} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      )}
    </AdminPageLayout>
  )
}

function sum(arr: any[], key: 'revenue' | 'orders') {
  return arr.reduce((acc, v) => acc + Number((v as any)[key] || 0), 0)
}

function avg(arr: any[], key: 'avgTime' | 'bounce') {
  if (!arr.length) return 0
  return arr.reduce((acc, v) => acc + Number((v as any)[key] || 0), 0) / arr.length
}

function StatCard({ label, value, hint, tone }: { label: string; value: string; hint?: string; tone?: 'success' | 'warning' }) {
  const toneClass = tone === 'success'
    ? 'text-green-700'
    : tone === 'warning'
      ? 'text-amber-700'
      : 'text-semantic-text-primary'
  return (
    <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5 shadow-[0_6px_18px_-12px_rgba(0,0,0,0.25)]">
      <div className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary/60">{label}</div>
      <div className={`mt-2 text-2xl font-semibold ${toneClass}`}>{value}</div>
      {hint ? <div className="text-sm text-semantic-text-primary/70">{hint}</div> : null}
    </div>
  )
}

function Card({ title, subtitle, children, className }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5 shadow-[0_6px_18px_-12px_rgba(0,0,0,0.25)] ${className || ''}`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-sm font-semibold text-semantic-text-primary">{title}</div>
          {subtitle ? <div className="text-[13px] text-semantic-text-primary/70">{subtitle}</div> : null}
        </div>
        <div className="rounded-full bg-semantic-legacy-brand-blush/20 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-semantic-legacy-brand-cocoa">Mock</div>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  )
}

function ProgressBar({ value, tone = 'neutral' }: { value: number; tone?: 'neutral' | 'accent' | 'warning' }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-semantic-legacy-brand-blush/20">
      <div
        className={`h-full rounded-full ${tone === 'accent' ? 'bg-semantic-legacy-brand-cocoa' : 'bg-semantic-legacy-brand-blush/80'}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}

function ComboLineChart({ revenue, orders, focus }: { revenue: { x: string; y: number }[]; orders: { x: string; y: number }[]; focus: 'revenue' | 'orders' }) {
  const width = 900
  const height = 260
  const padding = 38
  const ysR = revenue.map((d) => d.y)
  const ysO = orders.map((d) => d.y)
  const maxY = Math.max(...ysR, ...ysO, 1)

  const mapPts = (arr: { x: string; y: number }[]) => arr.map((d, i) => {
    const x = padding + (i / Math.max(1, arr.length - 1)) * (width - padding * 2)
    const y = height - padding - (d.y / maxY) * (height - padding * 2)
    return [x, y]
  })

  const pR = mapPts(revenue)
  const pO = mapPts(orders)
  const path = (pts: number[][]) => pts.map((p, i) => (i === 0 ? `M ${p[0]},${p[1]}` : `L ${p[0]},${p[1]}`)).join(' ')

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="mt-2 w-full">
      <defs>
        <linearGradient id="revFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#5B3A2E" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#5B3A2E" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ordFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#C39A8D" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#C39A8D" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g stroke="#eee" strokeWidth={1}>
        {[0.25, 0.5, 0.75, 1].map((t) => (
          <line key={t} x1={padding} x2={width - padding} y1={height - padding - (t * (height - padding * 2))} y2={height - padding - (t * (height - padding * 2))} />
        ))}
      </g>

      <path d={`${path(pR)} L ${pR[pR.length - 1][0]},${height - padding} L ${pR[0][0]},${height - padding} Z`} fill="url(#revFill)" opacity={focus === 'orders' ? 0.25 : 0.55} />
      <path d={`${path(pO)} L ${pO[pO.length - 1][0]},${height - padding} L ${pO[0][0]},${height - padding} Z`} fill="url(#ordFill)" opacity={focus === 'revenue' ? 0.25 : 0.55} />
      <path d={path(pR)} fill="none" stroke="#5B3A2E" strokeWidth={2.2} opacity={focus === 'orders' ? 0.55 : 1} />
      <path d={path(pO)} fill="none" stroke="#C39A8D" strokeWidth={2.2} opacity={focus === 'revenue' ? 0.55 : 1} />
      <g>
        {pR.map((p, i) => (<circle key={`r${i}`} cx={p[0]} cy={p[1]} r={2.5} fill="#5B3A2E" opacity={focus === 'orders' ? 0.55 : 1} />))}
        {pO.map((p, i) => (<circle key={`o${i}`} cx={p[0]} cy={p[1]} r={2.5} fill="#C39A8D" opacity={focus === 'revenue' ? 0.55 : 1} />))}
      </g>
      <g>
        <rect x={padding} y={10} width={14} height={3} fill="#5B3A2E" /><text x={padding + 18} y={14} fontSize="11" fill="#1f1f1f">Revenue</text>
        <rect x={padding + 90} y={10} width={14} height={3} fill="#C39A8D" /><text x={padding + 108} y={14} fontSize="11" fill="#1f1f1f">Orders</text>
      </g>
    </svg>
  )
}

function TrafficChart({ traffic }: { traffic: { x: string; sessions: number; users: number }[] }) {
  const width = 360
  const height = 180
  const padding = 28
  const ysS = traffic.map((d) => d.sessions)
  const ysU = traffic.map((d) => d.users)
  const maxY = Math.max(...ysS, ...ysU, 1)
  const mapPts = (arr: { x: string; sessions?: number; users?: number }[], key: 'sessions' | 'users') => arr.map((d, i) => {
    const x = padding + (i / Math.max(1, arr.length - 1)) * (width - padding * 2)
    const yVal = key === 'sessions' ? d.sessions || 0 : d.users || 0
    const y = height - padding - (yVal / maxY) * (height - padding * 2)
    return [x, y]
  })
  const pS = mapPts(traffic, 'sessions')
  const pU = mapPts(traffic, 'users')
  const path = (pts: number[][]) => pts.map((p, i) => (i === 0 ? `M ${p[0]},${p[1]}` : `L ${p[0]},${p[1]}`)).join(' ')

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      <g stroke="#eee" strokeWidth={1}>
        {[0.25, 0.5, 0.75, 1].map((t) => (
          <line key={t} x1={padding} x2={width - padding} y1={height - padding - (t * (height - padding * 2))} y2={height - padding - (t * (height - padding * 2))} />
        ))}
      </g>
      <path d={`${path(pS)} L ${pS[pS.length - 1][0]},${height - padding} L ${pS[0][0]},${height - padding} Z`} fill="#C39A8D22" />
      <path d={`${path(pU)} L ${pU[pU.length - 1][0]},${height - padding} L ${pU[0][0]},${height - padding} Z`} fill="#5B3A2E22" />
      <path d={path(pS)} fill="none" stroke="#C39A8D" strokeWidth={2} />
      <path d={path(pU)} fill="none" stroke="#5B3A2E" strokeWidth={2} />
      <g>
        <rect x={padding} y={10} width={12} height={3} fill="#5B3A2E" /><text x={padding + 16} y={14} fontSize="11" fill="#1f1f1f">Users</text>
        <rect x={padding + 70} y={10} width={12} height={3} fill="#C39A8D" /><text x={padding + 86} y={14} fontSize="11" fill="#1f1f1f">Sessions</text>
      </g>
    </svg>
  )
}
