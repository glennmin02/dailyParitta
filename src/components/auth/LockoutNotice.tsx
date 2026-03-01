import React, { useState, useEffect } from 'react'
import { formatLockoutTime } from '../../utils/authUtils'

interface LockoutNoticeProps {
  lockoutUntil: number
  onLockoutEnd: () => void
}

export const LockoutNotice: React.FC<LockoutNoticeProps> = ({
  lockoutUntil,
  onLockoutEnd,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(
    formatLockoutTime(lockoutUntil)
  )

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = lockoutUntil - Date.now()

      if (remaining <= 0) {
        clearInterval(interval)
        onLockoutEnd()
        return
      }

      setTimeRemaining(formatLockoutTime(lockoutUntil))
    }, 1000)

    return () => clearInterval(interval)
  }, [lockoutUntil, onLockoutEnd])

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-red-500"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
          Too Many Attempts
        </h2>
        <p className="text-[var(--color-text-secondary)]">
          Please try again in
        </p>
      </div>

      <div
        className="text-4xl font-mono font-bold text-[var(--color-accent)]"
        role="timer"
        aria-live="polite"
      >
        {timeRemaining}
      </div>

      <p className="text-sm text-[var(--color-text-secondary)] max-w-xs">
        For your security, the app has been temporarily locked after multiple
        failed attempts.
      </p>
    </div>
  )
}
