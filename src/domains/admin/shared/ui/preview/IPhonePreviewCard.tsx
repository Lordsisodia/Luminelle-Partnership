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
}

const DEVICE_VIEWPORTS: Record<DeviceMode, { width: number; height: number }> = {
  // Slightly smaller phone viewport to add breathing room in the preview column.
  phone: { width: 370, height: 812 },
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
      // Keep a stable sticky top so the preview controls sit neatly beneath the admin top bar.
      // (Measured offsets were causing excessive top whitespace and odd jumps on the products editor.)
      setStickyTopPx((prev) => prev ?? 72)
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

  const srcForIframe = srcWithDevice

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
    // Nudge smaller to keep breathing room top/bottom.
    return clamp(Math.min(byWidth, byHeight) * 0.9, 0, 1)
  })()

  // Cap default phone scale further to keep full device in view.
  const phoneScale = typeof scale === 'number' ? scale : Math.min(autoPhoneScale, 0.9)

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
      style={stickyTopPx != null ? { top: `${(stickyTopPx ?? 0) + 12}px` } : undefined}
    >
      <div ref={cardRef} className={`${cardWidthClassName} flex flex-col items-start`}>
        {enableDeviceToggle ? (
          <div ref={controlsRef} className="mb-1.5 flex w-full justify-center px-1">
            <DeviceToggle device={device} onChange={setDevice} />
          </div>
        ) : null}

        <div
          className={[
            'flex w-full justify-center overflow-x-hidden px-1.5',
            'motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-out',
            deviceVisible ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          style={{ willChange: 'opacity', filter: 'drop-shadow(0 10px 24px rgba(0,0,0,0.18)) drop-shadow(0 0 12px rgba(0,0,0,0.08))' }}
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
