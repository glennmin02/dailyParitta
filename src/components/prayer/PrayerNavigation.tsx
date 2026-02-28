import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePrayerStore } from '../../store'
import type { Prayer } from '../../types/prayer'

interface PrayerNavigationProps {
  currentPrayer: Prayer
}

export const PrayerNavigation: React.FC<PrayerNavigationProps> = ({
  currentPrayer,
}) => {
  const navigate = useNavigate()
  const { prayers, getAdjacentPrayers, loadPrayers } = usePrayerStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prayers.length === 0) {
      loadPrayers()
    }
  }, [prayers.length, loadPrayers])

  const adjacent = getAdjacentPrayers(currentPrayer.id)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' && adjacent.prev) {
        navigate(`/prayer/${adjacent.prev.id}`)
      } else if (event.key === 'ArrowRight' && adjacent.next) {
        navigate(`/prayer/${adjacent.next.id}`)
      } else if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [adjacent.prev, adjacent.next, navigate])
  const totalPrayers = prayers.length
  const currentNumber = adjacent.currentIndex + 1

  const handleNavigate = (prayerId: string) => {
    setIsMenuOpen(false)
    navigate(`/prayer/${prayerId}`)
  }

  return (
    <div className="relative bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)]">
      {/* Prayer Menu Dropdown */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute bottom-full left-0 right-0 max-h-[60vh] overflow-y-auto bg-[var(--color-bg-primary)] border border-[var(--color-border)] border-b-0 rounded-t-lg shadow-lg animate-slide-up"
        >
          <div className="p-2">
            <div className="text-xs text-[var(--color-text-secondary)] px-3 py-2 font-medium">
              All Prayers
            </div>
            {prayers.map((prayer: Prayer, index: number) => (
              <button
                key={prayer.id}
                onClick={() => handleNavigate(prayer.id)}
                className={`w-full text-left px-3 py-3 rounded-lg transition-colors duration-150 flex items-center gap-3 ${
                  prayer.id === currentPrayer.id
                    ? 'bg-[var(--color-accent)] bg-opacity-20 text-[var(--color-accent)]'
                    : 'hover:bg-[var(--color-bg-secondary)]'
                }`}
              >
                <span className="text-sm text-[var(--color-text-secondary)] w-6">
                  {index + 1}.
                </span>
                <span className="font-burmese text-sm md:text-base truncate">
                  {prayer.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <div className="flex items-center justify-between px-2 py-2 md:px-4 md:py-3">
        {/* Previous Button */}
        <button
          onClick={() => adjacent.prev && handleNavigate(adjacent.prev.id)}
          disabled={!adjacent.prev}
          className={`flex items-center gap-1 px-3 py-2 md:px-4 md:py-2 rounded-lg text-sm md:text-base transition-all duration-150 ${
            adjacent.prev
              ? 'hover:bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] active:scale-95'
              : 'text-[var(--color-text-secondary)] opacity-40 cursor-not-allowed'
          }`}
          title={adjacent.prev?.title || 'No previous prayer'}
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-150"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Center: Progress & Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--color-bg-primary)] transition-all duration-150 active:scale-95"
        >
          <span className="text-sm md:text-base text-[var(--color-text-secondary)]">
            {currentNumber} / {totalPrayers}
          </span>
          <svg
            className={`w-4 h-4 text-[var(--color-text-secondary)] transition-transform duration-200 ${
              isMenuOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={() => adjacent.next && handleNavigate(adjacent.next.id)}
          disabled={!adjacent.next}
          className={`flex items-center gap-1 px-3 py-2 md:px-4 md:py-2 rounded-lg text-sm md:text-base transition-all duration-150 ${
            adjacent.next
              ? 'hover:bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] active:scale-95'
              : 'text-[var(--color-text-secondary)] opacity-40 cursor-not-allowed'
          }`}
          title={adjacent.next?.title || 'No next prayer'}
        >
          <span className="hidden sm:inline">Next</span>
          <svg
            className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-150"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
