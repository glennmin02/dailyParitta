import React from 'react'

interface ProgressRingProps {
  current: number
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  current,
}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-4xl font-bold text-[var(--color-accent)]">
        {current}
      </div>
    </div>
  )
}
