import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePrayerStore } from '../store'
import { ScrollViewer } from '../components/prayer/ScrollViewer'
import { CounterPanel } from '../components/prayer/Counter/CounterPanel'
import { PrayerNavigation } from '../components/prayer/PrayerNavigation'
import { LoadingSpinner } from '../components/shared/LoadingSpinner'
import { Button } from '../components/shared/Button'

export const PrayerViewerPage: React.FC = () => {
  const { prayerId } = useParams<{ prayerId: string }>()
  const navigate = useNavigate()
  const { currentPrayer, isLoading, error, loadPrayer } = usePrayerStore()

  useEffect(() => {
    if (prayerId) {
      loadPrayer(prayerId)
    }
  }, [prayerId, loadPrayer])

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner message="Loading prayer..." />
      </div>
    )
  }

  if (error || !currentPrayer) {
    return (
      <div className="h-screen flex items-center justify-center p-4">
        <div className="card max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            {error || 'Prayer not found'}
          </h2>
          <Button onClick={() => navigate('/prayers')}>
            Back to Prayer Library
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      {/* Minimal Top Bar */}
      <div className="bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] px-3 py-2 flex items-center justify-between">
        <button
          onClick={() => navigate('/prayers')}
          className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all duration-150 active:scale-95"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <span className="hidden sm:inline">All Prayers</span>
        </button>

        <h2 className="font-burmese text-sm md:text-base font-medium text-center flex-1 px-2 truncate">
          {currentPrayer.title}
        </h2>

        <div className="w-16 sm:w-20" /> {/* Spacer for balance */}
      </div>

      {/* Scroll Viewer */}
      <div className="flex-1 overflow-hidden">
        <ScrollViewer prayer={currentPrayer} />
      </div>

      {/* Counter Panel */}
      <CounterPanel prayer={currentPrayer} />

      {/* Navigation */}
      <PrayerNavigation currentPrayer={currentPrayer} />
    </div>
  )
}
