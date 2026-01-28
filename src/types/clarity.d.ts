/**
 * Microsoft Clarity type definitions
 *
 * The official @microsoft/clarity NPM package provides its own types.
 * This file extends the global namespace if needed for compatibility.
 *
 * See: https://www.npmjs.com/package/@microsoft/clarity
 */

declare global {
  interface Window {
    /**
     * Microsoft Clarity global (if using script tag method)
     * Not needed when using NPM package, but kept for reference
     */
    clarity?: ClarityAPI
  }
}

/**
 * Microsoft Clarity API interface (script tag method)
 * Note: When using the NPM package, you import Clarity directly
 */
interface ClarityAPI {
  (method: 'start', projectId: string): void
  (method: 'identify', userId: string, sessionId?: string, pageId?: string, friendlyName?: string): void
  (method: 'set', key: string, value: string | string[]): void
  (method: 'event', eventName: string): void
  (method: 'consent', granted: boolean): void
  (method: 'consentV2', consent: { ad_Storage: 'granted' | 'denied'; analytics_Storage: 'granted' | 'denied' }): void
  (method: 'upgrade', reason: string): void
}

export {}
