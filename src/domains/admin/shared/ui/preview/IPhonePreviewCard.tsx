import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import DeviceToggle, { type DeviceMode } from './DeviceToggle'
import IPhoneMockup from './IPhoneMockup'
import MacbookPro from './MacbookPro'
import TabletMockup from './TabletMockup'

type IPhonePreviewCardProps = {
  src: string
  iframeRef?: React.RefObject<HTMLIFrameElement | null>
  iframeTitle?: string
  hidden?: boolean
  scale?: number
  cardWidthClassName?: string
  enableDeviceToggle?: boolean
  defaultDevice?: DeviceMode
  device?: DeviceMode
  onDeviceChange?: (device: DeviceMode) => void
  onIframeLoad?: () => void

  // Optional UX helpers (owned by the parent page)
  activeSectionLabel?: string
  syncEnabled?: boolean
  onSyncEnabledChange?: (enabled: boolean) => void
  onJumpToEditorSection?: () => void
  onCopyEditorLink?: () => void
}

const DEVICE_VIEWPORTS: Record<DeviceMode, { width: number; height: number }> = {
  phone: { width: 390, height: 844 },
  tablet: { width: 820, height: 1180 },
  desktop: { width: 1280, height: 900 },
}

const MACBOOK_BASE_WIDTH = 650
const MACBOOK_BASE_HEIGHT = 400
const MACBOOK_SCREEN = {
  x: 74.52,
  y: 21.32,
  width: 501.22,
  height: 323.85,
  radius: 5,
}

const DEVICE_PERSIST_KEY = 'admin:previewDevice'
const PHONE_BEZEL_PX = 8

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function ScaledIframe({
  src,
  title,
  iframeRef,
  width,
  height,
  scale,
  onLoad,
}: {
  src: string
  title: string
  iframeRef?: React.RefObject<HTMLIFrameElement | null>
  width: number
  height: number
  scale: number
  onLoad?: () => void
}) {
  return (
    <div style={{ width: width * scale, height: height * scale, position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width,
          height,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        <iframe
          ref={iframeRef}
          title={title}
          src={src}
          style={{ width, height, border: 0, display: 'block', background: '#fff' }}
          onLoad={onLoad}
          scrolling="yes"
        />
      </div>
    </div>
  )
}

export default function IPhonePreviewCard({
  src,
  iframeRef,
  iframeTitle = 'Preview',
  hidden = false,
  scale,
  cardWidthClassName = 'w-full',
  enableDeviceToggle = true,
  defaultDevice = 'phone',
  device: controlledDevice,
  onDeviceChange,
  onIframeLoad,
  activeSectionLabel,
  syncEnabled,
  onSyncEnabledChange,
  onJumpToEditorSection,
  onCopyEditorLink,
}: IPhonePreviewCardProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const controlsRef = useRef<HTMLDivElement | null>(null)

  const [stickyTopPx, setStickyTopPx] = useState<number | null>(null)
  const [availableWidthPx, setAvailableWidthPx] = useState<number | null>(null)
  const [viewportHeightPx, setViewportHeightPx] = useState<number | null>(null)
  const [controlsHeightPx, setControlsHeightPx] = useState<number>(0)
  const [internalDevice, setInternalDevice] = useState<DeviceMode>(defaultDevice)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [deviceVisible, setDeviceVisible] = useState(true)
  const [refreshNonce, setRefreshNonce] = useState<number | null>(null)

  const isControlled = controlledDevice !== undefined
  const device = isControlled ? controlledDevice : internalDevice
  const setDevice = (next: DeviceMode) => {
    if (!isControlled) setInternalDevice(next)
    onDeviceChange?.(next)
  }

  useLayoutEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const measure = () => {
      const rect = el.getBoundingClientRect()
      // Capture initial top only once so the device doesn't "drift" if the page is resized while scrolled.
      // Clamp to a small positive value so we never end up with a negative sticky offset on restore/back navigation.
      setStickyTopPx((prev) => prev ?? Math.max(16, rect.top))
      setViewportHeightPx(window.innerHeight)
      const cardRect = cardRef.current?.getBoundingClientRect()
      setAvailableWidthPx(cardRect?.width ?? rect.width)
      setControlsHeightPx(controlsRef.current?.getBoundingClientRect().height ?? 0)
    }

    measure()
    const ro = new ResizeObserver(() => measure())
    if (cardRef.current) ro.observe(cardRef.current)
    if (controlsRef.current) ro.observe(controlsRef.current)
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('resize', measure)
      ro.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!enableDeviceToggle || isControlled) return
    try {
      const stored = window.localStorage.getItem(DEVICE_PERSIST_KEY)
      if (stored === 'phone' || stored === 'tablet' || stored === 'desktop') {
        setInternalDevice(stored)
      }
    } catch {
      // ignore
    }
  }, [enableDeviceToggle, isControlled])

  useEffect(() => {
    if (!enableDeviceToggle || isControlled) return
    try {
      window.localStorage.setItem(DEVICE_PERSIST_KEY, device)
    } catch {
      // ignore
    }
  }, [device, enableDeviceToggle, isControlled])

  const srcWithDevice = useMemo(() => {
    try {
      const url = new URL(src, window.location.origin)
      url.searchParams.set('device', device)
      return `${url.pathname}${url.search}${url.hash}`
    } catch {
      const join = src.includes('?') ? '&' : '?'
      return `${src}${join}device=${encodeURIComponent(device)}`
    }
  }, [device, src])

  const srcForIframe = useMemo(() => {
    if (!refreshNonce) return srcWithDevice
    try {
      const url = new URL(srcWithDevice, window.location.origin)
      url.searchParams.set('_r', String(refreshNonce))
      return `${url.pathname}${url.search}${url.hash}`
    } catch {
      const join = srcWithDevice.includes('?') ? '&' : '?'
      return `${srcWithDevice}${join}_r=${encodeURIComponent(String(refreshNonce))}`
    }
  }, [refreshNonce, srcWithDevice])

  useEffect(() => {
    setIframeLoaded(false)
  }, [srcForIframe])

  useEffect(() => {
    setDeviceVisible(false)
    const raf = window.requestAnimationFrame(() => setDeviceVisible(true))
    return () => window.cancelAnimationFrame(raf)
  }, [device])

  const handleIframeLoad = () => {
    setIframeLoaded(true)
    onIframeLoad?.()
  }

  const viewport = DEVICE_VIEWPORTS[device]

  const availableHeightPx =
    stickyTopPx != null && viewportHeightPx != null ? Math.max(0, viewportHeightPx - stickyTopPx) : null

  const chromeHeightPx = enableDeviceToggle ? controlsHeightPx + 6 : 0 // controls row + margin
  const deviceMaxHeightPx = availableHeightPx != null ? Math.max(0, availableHeightPx - chromeHeightPx - 12) : null
  const deviceMaxWidthPx = availableWidthPx != null ? Math.max(0, availableWidthPx - 12) : null

  const phoneOuter = {
    width: DEVICE_VIEWPORTS.phone.width + PHONE_BEZEL_PX * 2,
    height: DEVICE_VIEWPORTS.phone.height + PHONE_BEZEL_PX * 2,
  }
  const tabletOuter = { width: DEVICE_VIEWPORTS.tablet.width + 36, height: DEVICE_VIEWPORTS.tablet.height + 36 } // TabletMockup bezel=18

  const autoPhoneScale = (() => {
    if (!deviceMaxWidthPx || !deviceMaxHeightPx) return 0.9
    const byWidth = deviceMaxWidthPx / phoneOuter.width
    const byHeight = deviceMaxHeightPx / phoneOuter.height
    return clamp(Math.min(byWidth, byHeight), 0, 1)
  })()

  const phoneScale = typeof scale === 'number' ? scale : autoPhoneScale

  const tabletScale = (() => {
    if (!deviceMaxWidthPx || !deviceMaxHeightPx) return 0.55
    const byWidth = deviceMaxWidthPx / tabletOuter.width
    const byHeight = deviceMaxHeightPx / tabletOuter.height
    return clamp(Math.min(byWidth, byHeight), 0, 1)
  })()

  if (hidden) return null

  return (
    <div
      ref={wrapperRef}
      className="hidden xl:block sticky self-start"
      style={stickyTopPx != null ? { top: `${stickyTopPx}px` } : undefined}
    >
      <div ref={cardRef} className={`${cardWidthClassName} flex flex-col items-center`}>
        {enableDeviceToggle ? (
          <div ref={controlsRef} className="mb-1.5 flex w-full justify-center">
            <DeviceToggle device={device} onChange={setDevice} />
          </div>
        ) : null}

        {activeSectionLabel || onJumpToEditorSection || onCopyEditorLink || onSyncEnabledChange ? (
          <div className="mb-2 flex w-full flex-wrap items-center justify-center gap-2 px-1">
            <button
              type="button"
              onClick={() => setRefreshNonce(Date.now())}
              className="rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 py-1.5 text-xs font-semibold text-semantic-text-primary hover:bg-brand-porcelain/60"
            >
              Refresh
            </button>
            {typeof syncEnabled === 'boolean' && onSyncEnabledChange ? (
              <button
                type="button"
                onClick={() => onSyncEnabledChange(!syncEnabled)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                  syncEnabled
                    ? 'border-semantic-legacy-brand-cocoa/40 bg-white text-semantic-text-primary'
                    : 'border-semantic-legacy-brand-blush/60 bg-white text-semantic-text-primary/70'
                } hover:bg-brand-porcelain/60`}
                aria-pressed={syncEnabled}
              >
                Sync {syncEnabled ? 'On' : 'Off'}
              </button>
            ) : null}
            {onJumpToEditorSection ? (
              <button
                type="button"
                onClick={onJumpToEditorSection}
                className="rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 py-1.5 text-xs font-semibold text-semantic-text-primary hover:bg-brand-porcelain/60"
                title={activeSectionLabel ? `Jump to ${activeSectionLabel}` : 'Jump to editor section'}
              >
                {activeSectionLabel ? `Jump · ${activeSectionLabel}` : 'Jump'}
              </button>
            ) : null}
            {onCopyEditorLink ? (
              <button
                type="button"
                onClick={onCopyEditorLink}
                className="rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 py-1.5 text-xs font-semibold text-semantic-text-primary hover:bg-brand-porcelain/60"
              >
                Copy link
              </button>
            ) : null}
          </div>
        ) : null}

        <div
          className={[
            'flex w-full justify-center overflow-x-hidden px-1.5',
            'motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-out',
            deviceVisible ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          style={{ willChange: 'opacity' }}
        >
          {device === 'desktop' ? (
            (() => {
              const maxWidth = deviceMaxWidthPx ?? 620
              const desiredWidth = 700
              const maxWidthByHeight =
                deviceMaxHeightPx != null
                  ? deviceMaxHeightPx / (MACBOOK_BASE_HEIGHT / MACBOOK_BASE_WIDTH)
                  : Number.POSITIVE_INFINITY

              const macbookWidth = Math.max(0, Math.floor(Math.min(desiredWidth, maxWidth, maxWidthByHeight)))
              const macbookHeight = Math.round((macbookWidth * MACBOOK_BASE_HEIGHT) / MACBOOK_BASE_WIDTH)
              const screenWidthPx = (macbookWidth * MACBOOK_SCREEN.width) / MACBOOK_BASE_WIDTH
              const screenHeightPx = (macbookHeight * MACBOOK_SCREEN.height) / MACBOOK_BASE_HEIGHT
              const scaleToFit = Math.min(screenWidthPx / viewport.width, screenHeightPx / viewport.height)

              const leftPct = `${(MACBOOK_SCREEN.x / MACBOOK_BASE_WIDTH) * 100}%`
              const topPct = `${(MACBOOK_SCREEN.y / MACBOOK_BASE_HEIGHT) * 100}%`
              const widthPct = `${(MACBOOK_SCREEN.width / MACBOOK_BASE_WIDTH) * 100}%`
              const heightPct = `${(MACBOOK_SCREEN.height / MACBOOK_BASE_HEIGHT) * 100}%`
              const radiusPx = Math.max(0, (macbookWidth * MACBOOK_SCREEN.radius) / MACBOOK_BASE_WIDTH)

              return (
                <div style={{ width: macbookWidth, height: macbookHeight, position: 'relative' }}>
                  <MacbookPro width={macbookWidth} height={macbookHeight} className="text-white" />
                  <div
                    style={{
                      position: 'absolute',
                      left: leftPct,
                      top: topPct,
                      width: widthPct,
                      height: heightPct,
                      overflow: 'hidden',
                      borderRadius: radiusPx,
                      background: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                      {!iframeLoaded ? (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 text-xs font-semibold text-semantic-text-primary/50">
                          Loading…
                        </div>
                      ) : null}
	                    <ScaledIframe
	                        src={srcForIframe}
	                        title={iframeTitle}
	                        iframeRef={iframeRef}
	                        width={viewport.width}
	                        height={viewport.height}
	                        scale={scaleToFit}
	                        onLoad={handleIframeLoad}
	                      />
                    </div>
                  </div>
                </div>
              )
            })()
          ) : device === 'tablet' ? (
            <TabletMockup scale={tabletScale}>
              <div className="relative h-full w-full">
                {!iframeLoaded ? (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 text-xs font-semibold text-semantic-text-primary/50">
                    Loading…
                  </div>
                ) : null}
	                <iframe
	                  ref={iframeRef}
	                  title={iframeTitle}
	                  src={srcForIframe}
	                  style={{ width: '100%', height: '100%', border: 0, display: 'block', background: '#fff' }}
	                  onLoad={handleIframeLoad}
	                  scrolling="yes"
	                />
              </div>
            </TabletMockup>
          ) : (
            <IPhoneMockup
              model="14"
              color="starlight"
              scale={phoneScale}
              bezel={PHONE_BEZEL_PX}
              safeArea={false}
              showNotch={false}
              showDynamicIsland={false}
              showHomeIndicator={false}
              style={{ display: 'block' }}
              screenStyle={{ background: '#fff' }}
            >
              <div className="relative h-full w-full">
                {!iframeLoaded ? (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 text-xs font-semibold text-semantic-text-primary/50">
                    Loading…
                  </div>
                ) : null}
	                <iframe
	                  ref={iframeRef}
	                  title={iframeTitle}
	                  src={srcForIframe}
	                  style={{ width: '100%', height: '100%', border: 0, display: 'block', background: '#fff' }}
	                  onLoad={handleIframeLoad}
	                  scrolling="yes"
	                />
              </div>
            </IPhoneMockup>
          )}
        </div>
      </div>
    </div>
  )
}
