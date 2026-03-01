import { create } from 'zustand'
import type { AuthState } from '../types/auth'
import { AUTH_CONSTANTS } from '../types/auth'
import { verifyPasscode, isPasscodeEnabled } from '../utils/authUtils'

interface AuthStore extends AuthState {
  authenticate: (passcode: string) => Promise<boolean>
  logout: () => void
  checkSession: () => void
  isLocked: () => boolean
  getRemainingLockoutTime: () => number
}

const getInitialState = (): AuthState => ({
  isAuthenticated: false,
  failedAttempts: 0,
  lockoutUntil: null,
})

export const useAuthStore = create<AuthStore>()((set, get) => ({
  ...getInitialState(),

  authenticate: async (passcode: string) => {
    const state = get()

    // Check if locked out
    if (state.lockoutUntil && Date.now() < state.lockoutUntil) {
      return false
    }

    // Clear expired lockout
    if (state.lockoutUntil && Date.now() >= state.lockoutUntil) {
      set({ lockoutUntil: null, failedAttempts: 0 })
    }

    const isValid = await verifyPasscode(passcode)

    if (isValid) {
      set({ isAuthenticated: true, failedAttempts: 0, lockoutUntil: null })
      sessionStorage.setItem(AUTH_CONSTANTS.SESSION_KEY, 'true')
      return true
    }

    // Failed attempt
    const newFailedAttempts = get().failedAttempts + 1
    const shouldLockout = newFailedAttempts >= AUTH_CONSTANTS.MAX_FAILED_ATTEMPTS

    set({
      failedAttempts: newFailedAttempts,
      lockoutUntil: shouldLockout
        ? Date.now() + AUTH_CONSTANTS.LOCKOUT_DURATION_MS
        : null,
    })

    return false
  },

  logout: () => {
    sessionStorage.removeItem(AUTH_CONSTANTS.SESSION_KEY)
    set(getInitialState())
  },

  checkSession: () => {
    // If passcode is not configured, auto-authenticate
    if (!isPasscodeEnabled()) {
      set({ isAuthenticated: true })
      return
    }

    const session = sessionStorage.getItem(AUTH_CONSTANTS.SESSION_KEY)
    if (session === 'true') {
      set({ isAuthenticated: true })
    }
  },

  isLocked: () => {
    const { lockoutUntil } = get()
    return lockoutUntil !== null && Date.now() < lockoutUntil
  },

  getRemainingLockoutTime: () => {
    const { lockoutUntil } = get()
    if (!lockoutUntil) return 0
    return Math.max(0, lockoutUntil - Date.now())
  },
}))
