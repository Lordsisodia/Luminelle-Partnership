export type PortErrorCode =
  | 'NOT_CONFIGURED'
  | 'UNAVAILABLE'
  | 'NOT_FOUND'
  | 'INVALID_INPUT'
  | 'RATE_LIMITED'
  | 'UNKNOWN'

export class PortError extends Error {
  public readonly code: PortErrorCode
  public readonly cause?: unknown
  public readonly details?: Record<string, unknown>

  constructor(code: PortErrorCode, message: string, opts?: { cause?: unknown; details?: Record<string, unknown> }) {
    super(message)
    this.name = 'PortError'
    this.code = code
    this.cause = opts?.cause
    this.details = opts?.details
  }
}

