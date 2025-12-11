export type VariantSplit = { variant: string; weight: number }

export type ExperimentConfig = {
  key: string
  status: 'draft' | 'live' | 'paused' | 'archived'
  default_split: VariantSplit[]
  targeting?: Record<string, unknown>
  start_at?: string
  end_at?: string
}

export type Assignment = {
  experimentKey: string
  variant: string
}

export type ExposurePayload = {
  type: 'exposure'
  experiment_key: string
  variant: string
  anon_id: string
  session_id: string
  page_path?: string
  user_id?: string
  user_agent?: string
}

export type EventPayload = {
  type: 'event'
  name: string
  experiment_key?: string
  variant?: string
  anon_id: string
  session_id: string
  cart_value?: number
  metadata?: Record<string, unknown>
  user_id?: string
}

export type TrackPayload = ExposurePayload | EventPayload
