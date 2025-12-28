import React from 'react'
import type { DeviceMode } from './DeviceToggle'

const DEVICE_PRESETS: Record<DeviceMode, { width: number; height: number; scale: number; radius: number }> = {
  phone: { width: 430, height: 932, scale: 1, radius: 34 },
  tablet: { width: 820, height: 1180, scale: 0.7, radius: 24 },
  desktop: { width: 1280, height: 900, scale: 0.48, radius: 16 },
}

export function DeviceFrame({
  device,
  iframeHeight,
  children,
  renderToggles,
  hideHeader = false,
  title = 'Preview',
  scale,
}: {
  device: DeviceMode
  iframeHeight: number
  children: React.ReactNode
  renderToggles?: React.ReactNode
  hideHeader?: boolean
  title?: string
  scale?: number
}) {
  const preset = DEVICE_PRESETS[device]
  const resolvedScale = scale ?? preset.scale
  const scaledHeight = Math.max(preset.height, iframeHeight) * resolvedScale

  return (
    <div className="overflow-visible">
      {!hideHeader ? (
        <div className="mb-2 flex items-center justify-between px-1 text-xs font-semibold uppercase tracking-[0.22em] text-semantic-text-primary/70">
          <span>{title}</span>
          {renderToggles ? renderToggles : null}
        </div>
      ) : null}
      <div className="relative flex justify-center">
        <div
          className="relative bg-white shadow-[0_18px_38px_-18px_rgba(0,0,0,0.45)] ring-1 ring-semantic-legacy-brand-blush/50"
          style={{
            width: preset.width * resolvedScale,
            height: scaledHeight + 24,
            borderRadius: preset.radius,
            padding: 12,
          }}
        >
          <div
            className="overflow-hidden bg-black/2"
            style={{
              width: preset.width,
              height: Math.max(preset.height, iframeHeight),
              transform: `scale(${resolvedScale})`,
              transformOrigin: 'top center',
              borderRadius: preset.radius,
              margin: '0 auto',
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)',
            }}
          >
            {children}
          </div>
          {device === 'phone' ? (
            <div className="absolute left-1/2 top-3 h-2 w-16 -translate-x-1/2 rounded-full bg-neutral-200" />
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default DeviceFrame
