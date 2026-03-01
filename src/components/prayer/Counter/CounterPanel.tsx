import React, { useEffect } from 'react'
import { useProgressStore } from '../../../store'
import { ProgressRing } from './ProgressRing'
import { Button } from '../../shared/Button'
import type { Prayer } from '../../../types/prayer'

interface CounterPanelProps {
  prayer: Prayer
}

export const CounterPanel: React.FC<CounterPanelProps> = ({ prayer }) => {
  const {
    incrementCounter,
    decrementCounter,
    resetCounter,
    setCounterTarget,
    getCounter,
  } = useProgressStore()

  const counter = getCounter(prayer.id)
  const current = counter?.current || 0

  useEffect(() => {
    // Initialize counter if not exists
    if (!counter) {
      setCounterTarget(prayer.id, prayer.counterConfig?.defaultCount || 3)
    }
  }, [prayer.id, counter, setCounterTarget, prayer.counterConfig])

  const handleIncrement = () => {
    incrementCounter(prayer.id)
    navigator.vibrate?.(50)
  }

  const handleDecrement = () => {
    if (current > 0) {
      decrementCounter(prayer.id)
      navigator.vibrate?.(30)
    }
  }

  const handleReset = () => {
    resetCounter(prayer.id)
  }

  if (!prayer.counterConfig?.enabled) {
    return null
  }

  return (
    <div className="sticky bottom-0 bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] safe-bottom">
      <div className="container mx-auto px-3 md:px-6 py-2 md:py-3">
        <div className="flex items-center justify-center gap-4 max-w-4xl mx-auto">
          <ProgressRing current={current} />

          <div className="flex gap-2">
            <Button
              onClick={handleDecrement}
              variant="secondary"
              disabled={current === 0}
              className="w-12 h-12 text-xl"
              aria-label="Decrement"
            >
              −
            </Button>
            <Button
              onClick={handleIncrement}
              variant="primary"
              className="w-12 h-12 text-xl"
              aria-label="Increment"
            >
              +
            </Button>
            <Button
              onClick={handleReset}
              variant="secondary"
              className="px-3 h-12 text-sm"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
