import { CheckCircle2, Clock, Package, Truck, MapPin } from 'lucide-react'

export interface TrackingEvent {
  status: string
  title: string
  description: string
  date?: string
  completed: boolean
}

interface TrackingTimelineProps {
  events: TrackingEvent[]
  trackingNumber?: string
  trackingUrl?: string
}

const statusIcons = {
  ordered: Package,
  processing: Clock,
  picked_up: Package,
  in_transit: Truck,
  out_for_delivery: MapPin,
  delivered: CheckCircle2,
}

const statusColors = {
  completed: 'text-semantic-legacy-brand-cocoa',
  pending: 'text-semantic-text-primary/40',
}

export function TrackingTimeline({ events, trackingNumber, trackingUrl }: TrackingTimelineProps) {
  return (
    <div className="space-y-4">
      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[11px] top-2 h-[calc(100%-8px)] w-0.5 bg-semantic-legacy-brand-blush/20" />

        {/* Events */}
        <div className="space-y-6">
          {events.map((event, index) => {
            const Icon = statusIcons[event.status as keyof typeof statusIcons] || Package
            const isLast = index === events.length - 1

            return (
              <div key={event.status} className="relative flex gap-4">
                {/* Icon */}
                <div className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                  event.completed
                    ? 'border-semantic-legacy-brand-cocoa bg-semantic-legacy-brand-cocoa'
                    : 'border-semantic-legacy-brand-blush/40 bg-white'
                }`}>
                  <Icon className={`h-3 w-3 ${event.completed ? 'text-white' : 'text-semantic-text-primary/40'}`} />
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <p className={`text-sm font-semibold ${event.completed ? statusColors.completed : statusColors.pending}`}>
                    {event.title}
                  </p>
                  <p className={`mt-0.5 text-sm ${event.completed ? 'text-semantic-text-primary/80' : 'text-semantic-text-primary/50'}`}>
                    {event.description}
                  </p>
                  {event.date && (
                    <p className="mt-1 text-xs text-semantic-text-primary/50">
                      {new Date(event.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tracking info */}
      {trackingNumber && (
        <div className="rounded-xl border border-semantic-legacy-brand-blush/40 bg-brand-porcelain/50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-semantic-text-primary/60">
            Tracking number
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-sm text-semantic-text-primary">{trackingNumber}</p>
            <div className="flex gap-2">
              {trackingUrl && (
                <a
                  href={trackingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5"
                >
                  Track package
                </a>
              )}
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(trackingNumber)
                }}
                className="inline-flex items-center justify-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-4 py-2 text-sm font-semibold text-semantic-text-primary shadow-sm hover:bg-brand-porcelain/60"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
