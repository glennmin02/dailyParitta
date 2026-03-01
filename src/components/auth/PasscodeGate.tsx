import React, { useState, useCallback, useSyncExternalStore } from 'react'
import { useAuthStore } from '../../store'
import { AUTH_CONSTANTS } from '../../types/auth'
import { PasscodeInput } from './PasscodeInput'
import { LockoutNotice } from './LockoutNotice'

// Track initialization outside React
let initialized = false
const initializeAuth = () => {
  if (!initialized) {
    useAuthStore.getState().checkSession()
    initialized = true
  }
  return initialized
}
const subscribe = () => () => {}

interface PasscodeGateProps {
  children: React.ReactNode
}

export const PasscodeGate: React.FC<PasscodeGateProps> = ({ children }) => {
  const {
    isAuthenticated,
    failedAttempts,
    lockoutUntil,
    authenticate,
    isLocked,
  } = useAuthStore()

  const [error, setError] = useState<string | null>(null)

  // Initialize auth synchronously on first render
  const isReady = useSyncExternalStore(subscribe, initializeAuth, () => false)

  const handleSubmit = useCallback(
    async (passcode: string) => {
      setError(null)
      const success = await authenticate(passcode)

      if (!success) {
        const attemptsLeft =
          AUTH_CONSTANTS.MAX_FAILED_ATTEMPTS - (failedAttempts + 1)
        if (attemptsLeft > 0) {
          setError(`Incorrect passcode. ${attemptsLeft} attempts remaining.`)
        }
      }
    },
    [authenticate, failedAttempts]
  )

  const handleLockoutEnd = useCallback(() => {
    setError(null)
  }, [])

  // Show loading state
  if (!isReady) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Show children if authenticated
  if (isAuthenticated) {
    return <>{children}</>
  }

  // Show passcode gate
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm flex flex-col items-center gap-8">
        {/* App title */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-[var(--color-accent)] mb-2">
            Daily Paritta
          </h1>
          <p className="text-[var(--color-text-secondary)]">
            Enter your passcode
          </p>
        </div>

        {/* Show lockout or passcode input */}
        {isLocked() && lockoutUntil ? (
          <LockoutNotice
            lockoutUntil={lockoutUntil}
            onLockoutEnd={handleLockoutEnd}
          />
        ) : (
          <PasscodeInput
            onSubmit={handleSubmit}
            error={error}
            disabled={isLocked()}
          />
        )}
      </div>
    </div>
  )
}
