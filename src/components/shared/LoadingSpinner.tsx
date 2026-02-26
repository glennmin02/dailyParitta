import React from 'react'

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  message?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  message,
}) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <div
        className={`${sizeClasses[size]} border-4 border-[var(--color-border)] border-t-[var(--color-accent)] rounded-full animate-spin`}
      />
      {message && (
        <p className="text-[var(--color-text-secondary)] text-center">
          {message}
        </p>
      )}
    </div>
  )
}
