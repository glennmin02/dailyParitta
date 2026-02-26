import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePrayerStore } from '../store'
import { Card } from '../components/shared/Card'
import { LoadingSpinner } from '../components/shared/LoadingSpinner'
import type { Prayer } from '../types/prayer'

export const PrayerListPage: React.FC = () => {
  const navigate = useNavigate()
  const { prayers, isLoading, error, loadPrayers } = usePrayerStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredPrayers, setFilteredPrayers] = useState<Prayer[]>([])

  useEffect(() => {
    loadPrayers()
  }, [loadPrayers])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPrayers(prayers)
    } else {
      const query = searchQuery.toLowerCase()
      setFilteredPrayers(
        prayers.filter(
          prayer =>
            prayer.title.toLowerCase().includes(query) ||
            prayer.type.toLowerCase().includes(query) ||
            prayer.metadata?.tags?.some(tag =>
              tag.toLowerCase().includes(query)
            )
        )
      )
    }
  }, [searchQuery, prayers])

  const handlePrayerClick = (prayerId: string) => {
    navigate(`/prayer/${prayerId}`)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner message="Loading prayers..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="text-center border-red-500">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-[var(--color-text-secondary)]">{error}</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--color-accent)]">
        Daily Prayers
      </h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search prayers..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="input w-full"
        />
      </div>

      {filteredPrayers.length === 0 ? (
        <div className="text-center text-[var(--color-text-secondary)] py-8">
          No prayers found
        </div>
      ) : (
        <div className="space-y-2">
          {filteredPrayers.map(prayer => (
            <div
              key={prayer.id}
              onClick={() => handlePrayerClick(prayer.id)}
              className="p-4 border border-[var(--color-border)] rounded hover:border-[var(--color-accent)] cursor-pointer transition-colors"
            >
              <h3 className="text-lg md:text-xl font-burmese font-semibold">
                {prayer.title}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
