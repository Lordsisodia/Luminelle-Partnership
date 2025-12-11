import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { fetchExperiments } from './config'
import { pickVariant } from './hash'
import { enqueueTrack } from './track'
import { getOrCreateAnonId, getOrCreateSessionId } from './identity'
import type { Assignment, ExperimentConfig, TrackPayload } from './types'

type Ctx = {
  assignments: Record<string, Assignment>
  trackEvent: (name: string, metadata?: Record<string, unknown>) => void
  getVariant: (key: string, fallback?: string) => string
}

const ExperimentContext = createContext<Ctx | null>(null)

export const ExperimentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [configs, setConfigs] = useState<ExperimentConfig[]>([])
  const anonId = useMemo(getOrCreateAnonId, [])
  const sessionId = useMemo(getOrCreateSessionId, [])

  useEffect(() => {
    fetchExperiments().then(setConfigs).catch((err) => console.error('Experiment config error', err))
  }, [])

  const assignments = useMemo(() => {
    const res: Record<string, Assignment> = {}
    for (const cfg of configs) {
      if (cfg.status !== 'live') continue
      const variant = pickVariant(`${cfg.key}:${anonId}`, cfg.default_split)
      res[cfg.key] = { experimentKey: cfg.key, variant }
    }
    return res
  }, [configs, anonId])

  // Send exposures once on mount per experiment
  useEffect(() => {
    Object.values(assignments).forEach((assign) => {
      const payload: TrackPayload = {
        type: 'exposure',
        experiment_key: assign.experimentKey,
        variant: assign.variant,
        anon_id: anonId,
        session_id: sessionId,
        page_path: typeof window !== 'undefined' ? window.location.pathname : undefined,
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      }
      enqueueTrack(payload)
    })
  }, [assignments, anonId, sessionId])

  const trackEvent = (name: string, metadata?: Record<string, unknown>) => {
    Object.values(assignments).forEach((assign) => {
      const payload: TrackPayload = {
        type: 'event',
        name,
        experiment_key: assign.experimentKey,
        variant: assign.variant,
        anon_id: anonId,
        session_id: sessionId,
        metadata,
      }
      enqueueTrack(payload)
    })
  }

  const getVariant = (key: string, fallback = 'control') => assignments[key]?.variant ?? fallback

  const value: Ctx = { assignments, trackEvent, getVariant }

  return <ExperimentContext.Provider value={value}>{children}</ExperimentContext.Provider>
}

export function useExperiment(key: string, fallback?: string) {
  const ctx = useContext(ExperimentContext)
  const variant = ctx?.getVariant(key, fallback)
  return {
    variant: variant ?? fallback ?? 'control',
    trackEvent: ctx?.trackEvent ?? (() => {}),
  }
}
