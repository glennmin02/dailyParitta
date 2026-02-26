import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePrayerStore } from '../store'
import { ScrollViewer } from '../components/prayer/ScrollViewer'
import { CounterPanel } from '../components/prayer/Counter/CounterPanel'
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
      {/* Back Button */}
      <div className="bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] px-4 py-3">
        <Button
          onClick={() => navigate('/prayers')}
          variant="secondary"
          className="text-sm"
        >
          ← Back to Prayers
        </Button>
      </div>

      {/* Scroll Viewer */}
      <div className="flex-1 overflow-hidden">
        <ScrollViewer prayer={currentPrayer} />
      </div>

      {/* Counter Panel */}
      <CounterPanel prayer={currentPrayer} />
    </div>
  )
}
