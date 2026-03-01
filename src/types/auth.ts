export interface AuthState {
  isAuthenticated: boolean
  failedAttempts: number
  lockoutUntil: number | null
}

export const AUTH_CONSTANTS = {
  MAX_FAILED_ATTEMPTS: 5,
  LOCKOUT_DURATION_MS: 5 * 60 * 1000, // 5 minutes
  PASSCODE_LENGTH: 4,
  SESSION_KEY: 'daily-paritta-auth',
} as const
