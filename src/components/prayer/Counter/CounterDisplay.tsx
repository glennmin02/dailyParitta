import React from 'react'

interface CounterDisplayProps {
  current: number
  target: number
  completedSessions: number
}

export const CounterDisplay: React.FC<CounterDisplayProps> = ({
  current,
  target,
  completedSessions,
}) => {
  const isCompleted = current >= target

  return (
    <div className="text-center">
      <div className="text-4xl font-bold mb-2">
        {current} <span className="text-2xl text-[var(--color-text-secondary)]">/ {target}</span>
      </div>
      {isCompleted && (
        <div className="text-green-600 font-semibold mb-2 animate-pulse">
          ✓ Completed!
        </div>
      )}
      {completedSessions > 0 && (
        <div className="text-sm text-[var(--color-text-secondary)]">
          Total sessions: {completedSessions}
        </div>
      )}
    </div>
  )
}
