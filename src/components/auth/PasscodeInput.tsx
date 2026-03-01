import React, { useState, useCallback, useEffect } from 'react'
import { AUTH_CONSTANTS } from '../../types/auth'

interface PasscodeInputProps {
  onSubmit: (passcode: string) => void
  error?: string | null
  disabled?: boolean
}

export const PasscodeInput: React.FC<PasscodeInputProps> = ({
  onSubmit,
  error,
  disabled = false,
}) => {
  const [digits, setDigits] = useState<string[]>([])
  const [isShaking, setIsShaking] = useState(false)

  const triggerHaptic = useCallback(() => {
    navigator.vibrate?.(10)
  }, [])

  const handleDigitPress = useCallback(
    (digit: string) => {
      if (disabled || digits.length >= AUTH_CONSTANTS.PASSCODE_LENGTH) return

      triggerHaptic()
      const newDigits = [...digits, digit]
      setDigits(newDigits)

      if (newDigits.length === AUTH_CONSTANTS.PASSCODE_LENGTH) {
        onSubmit(newDigits.join(''))
      }
    },
    [digits, disabled, onSubmit, triggerHaptic]
  )

  const handleDelete = useCallback(() => {
    if (disabled || digits.length === 0) return
    triggerHaptic()
    setDigits(prev => prev.slice(0, -1))
  }, [digits.length, disabled, triggerHaptic])

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return

      if (e.key >= '0' && e.key <= '9') {
        handleDigitPress(e.key)
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        handleDelete()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [disabled, handleDigitPress, handleDelete])

  // Shake animation on error
  useEffect(() => {
    if (error) {
      setIsShaking(true)
      setDigits([])
      const timer = setTimeout(() => setIsShaking(false), 500)
      return () => clearTimeout(timer)
    }
  }, [error])

  const numberPad = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del']

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Dots display */}
      <div
        className={`flex gap-4 ${isShaking ? 'animate-shake' : ''}`}
        role="status"
        aria-label={`${digits.length} of ${AUTH_CONSTANTS.PASSCODE_LENGTH} digits entered`}
      >
        {Array.from({ length: AUTH_CONSTANTS.PASSCODE_LENGTH }).map((_, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
              i < digits.length
                ? 'bg-[var(--color-accent)] border-[var(--color-accent)]'
                : 'border-[var(--color-border)]'
            }`}
          />
        ))}
      </div>

      {/* Error message */}
      {error && (
        <p className="text-red-500 text-sm text-center" role="alert">
          {error}
        </p>
      )}

      {/* Number pad */}
      <div className="grid grid-cols-3 gap-4">
        {numberPad.map((item, index) => {
          if (item === '') {
            return <div key={index} className="w-16 h-16" />
          }

          if (item === 'del') {
            return (
              <button
                key={index}
                onClick={handleDelete}
                disabled={disabled || digits.length === 0}
                className="w-16 h-16 rounded-full flex items-center justify-center
                  text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]
                  active:bg-[var(--color-border)] transition-colors
                  disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Delete"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                  <line x1="18" y1="9" x2="12" y2="15" />
                  <line x1="12" y1="9" x2="18" y2="15" />
                </svg>
              </button>
            )
          }

          return (
            <button
              key={index}
              onClick={() => handleDigitPress(item)}
              disabled={disabled}
              className="w-16 h-16 rounded-full bg-[var(--color-bg-secondary)]
                text-2xl font-medium text-[var(--color-text-primary)]
                hover:bg-[var(--color-border)] active:scale-95
                transition-all duration-100
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {item}
            </button>
          )
        })}
      </div>
    </div>
  )
}
