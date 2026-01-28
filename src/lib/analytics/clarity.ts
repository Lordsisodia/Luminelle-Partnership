/**
 * Microsoft Clarity Analytics Integration
 *
 * Provides heatmaps and session replay capabilities.
 * Free, unlimited, and privacy-focused.
 *
 * Uses the official @microsoft/clarity NPM package.
 * https://www.npmjs.com/package/@microsoft/clarity
 *
 * https://clarity.microsoft.com/
 */

import Clarity from '@microsoft/clarity'

let isInitialized = false

function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

function envBool(key: string): boolean {
  try {
    return (import.meta as any).env?.[key] === 'true'
  } catch {
    return false
  }
}

function getClarityProjectId(): string | undefined {
  try {
    const projectId = (import.meta as any).env?.VITE_CLARITY_PROJECT_ID as string | undefined
    return projectId?.trim() || undefined
  } catch {
    return undefined
  }
}

/**
 * Initialize Microsoft Clarity
 * Must be called after consent is granted
 */
export async function initClarity(): Promise<void> {
  if (!isBrowser()) return
  if (!envBool('VITE_HEATMAP_ENABLED')) return
  if (isInitialized) return

  const projectId = getClarityProjectId()
  if (!projectId) {
    console.debug('Clarity: VITE_CLARITY_PROJECT_ID not set, skipping initialization')
    return
  }

  // Check for consent before loading
  try {
    const { hasTrackingConsent } = await import('@/lib/cookieConsent')
    if (!hasTrackingConsent()) {
      console.debug('Clarity: Tracking consent not granted, skipping initialization')
      return
    }
  } catch {
    // If consent module isn't available, proceed anyway
    console.debug('Clarity: Consent module not available, proceeding')
  }

  // Initialize Clarity using the official NPM package
  try {
    Clarity.init(projectId)
    isInitialized = true
    console.debug('Clarity: Initialized with project ID', projectId)
  } catch (error) {
    console.warn('Clarity: Failed to initialize', error)
  }
}

/**
 * Check if Clarity is available and initialized
 */
export function clarityReady(): boolean {
  return isBrowser() && isInitialized
}

/**
 * Identify the user with custom identifiers
 * This helps search and filter sessions in Clarity dashboard
 *
 * @param customId - Unique identifier for the user (e.g., anon_id)
 * @param sessionId - Optional session identifier
 * @param pageId - Optional page identifier
 * @param friendlyName - Optional friendly name for the user
 */
export function identifyClaritySession(customId: string, sessionId?: string, pageId?: string, friendlyName?: string): void {
  if (!clarityReady()) return

  try {
    Clarity.identify(customId, sessionId, pageId, friendlyName)
    console.debug('Clarity: Identified session', { customId, sessionId, pageId, friendlyName })
  } catch (error) {
    console.warn('Clarity: Failed to identify session', error)
  }
}

/**
 * Tag the session with experiment variant
 * This allows filtering recordings by experiment in Clarity dashboard
 *
 * @param experimentKey - The experiment identifier (e.g., 'hero_cta_copy')
 * @param variant - The variant assigned (e.g., 'control', 'bold')
 */
export function tagExperimentVariant(experimentKey: string, variant: string): void {
  if (!clarityReady()) return

  try {
    Clarity.setTag(`exp_${experimentKey}`, variant)
    console.debug(`Clarity: Tagged session with exp_${experimentKey}=${variant}`)
  } catch (error) {
    console.warn('Clarity: Failed to tag experiment variant', error)
  }
}

/**
 * Tag the session with multiple experiment variants at once
 *
 * @param experiments - Record of experimentKey -> variant
 */
export function tagExperimentVariants(experiments: Record<string, string>): void {
  if (!clarityReady()) return

  for (const [key, variant] of Object.entries(experiments)) {
    tagExperimentVariant(key, variant)
  }
}

/**
 * Set a custom tag for the session
 *
 * @param key - Tag key
 * @param value - Tag value (can be string or array of strings)
 */
export function setClarityTag(key: string, value: string | string[]): void {
  if (!clarityReady()) return

  try {
    Clarity.setTag(key, value)
    console.debug(`Clarity: Set tag ${key}=${value}`)
  } catch (error) {
    console.warn('Clarity: Failed to set tag', error)
  }
}

/**
 * Track a custom event in Clarity
 *
 * @param eventName - Name of the event
 */
export function trackClarityEvent(eventName: string): void {
  if (!clarityReady()) return

  try {
    Clarity.event(eventName)
    console.debug(`Clarity: Tracked event ${eventName}`)
  } catch (error) {
    console.warn('Clarity: Failed to track event', error)
  }
}

/**
 * Upgrade the current session to prioritize it for recording
 * Use this for important sessions (e.g., users who add to cart)
 *
 * @param reason - Reason for upgrade
 */
export function upgradeClaritySession(reason: string): void {
  if (!clarityReady()) return

  try {
    Clarity.upgrade(reason)
    console.debug(`Clarity: Upgraded session: ${reason}`)
  } catch (error) {
    console.warn('Clarity: Failed to upgrade session', error)
  }
}

/**
 * Grant cookie consent (v2 API - recommended)
 * Call this after user accepts cookies
 *
 * @param adStorage - Consent for ad storage (default: 'granted')
 * @param analyticsStorage - Consent for analytics storage (default: 'granted')
 */
export function grantClarityConsent(
  adStorage: 'granted' | 'denied' = 'granted',
  analyticsStorage: 'granted' | 'denied' = 'granted'
): void {
  if (!clarityReady()) return

  try {
    Clarity.consentV2({ ad_Storage: adStorage, analytics_Storage: analyticsStorage })
    console.debug('Clarity: Consent granted', { adStorage, analyticsStorage })
  } catch (error) {
    console.warn('Clarity: Failed to grant consent', error)
  }
}

/**
 * Revoke cookie consent
 * Call this after user withdraws consent
 */
export function revokeClarityConsent(): void {
  if (!clarityReady()) return

  try {
    Clarity.consentV2({ ad_Storage: 'denied', analytics_Storage: 'denied' })
    console.debug('Clarity: Consent revoked')
  } catch (error) {
    console.warn('Clarity: Failed to revoke consent', error)
  }
}
