import React, { useEffect, useRef, useState } from 'react'

interface ProgressRingProps {
  current: number
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  current,
}) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const prevValueRef = useRef(current)

  useEffect(() => {
    if (prevValueRef.current !== current) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 200)
      prevValueRef.current = current
      return () => clearTimeout(timer)
    }
  }, [current])

  return (
    <div className="flex items-center justify-center">
      <div
        className={`text-4xl font-bold text-[var(--color-accent)] transition-transform ${
          isAnimating ? 'animate-counter-pulse' : ''
        }`}
      >
        {current}
      </div>
    </div>
  )
}
