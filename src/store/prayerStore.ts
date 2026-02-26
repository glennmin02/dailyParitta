import { create } from 'zustand'
import type { Prayer } from '../types/prayer'
import { PrayerService } from '../services/prayerService'

interface PrayerState {
  prayers: Prayer[]
  currentPrayer: Prayer | null
  isLoading: boolean
  error: string | null

  // Actions
  loadPrayers: () => Promise<void>
  loadPrayer: (prayerId: string) => Promise<void>
  setCurrentPrayer: (prayer: Prayer | null) => void
  searchPrayers: (query: string) => Promise<Prayer[]>
  clearError: () => void
}

export const usePrayerStore = create<PrayerState>(set => ({
  prayers: [],
  currentPrayer: null,
  isLoading: false,
  error: null,

  loadPrayers: async () => {
    set({ isLoading: true, error: null })
    try {
      const prayers = await PrayerService.loadAllPrayers()
      set({ prayers, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to load prayers',
        isLoading: false,
      })
    }
  },

  loadPrayer: async (prayerId: string) => {
    set({ isLoading: true, error: null })
    try {
      const prayer = await PrayerService.loadPrayer(prayerId)
      set({ currentPrayer: prayer, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to load prayer',
        isLoading: false,
        currentPrayer: null,
      })
    }
  },

  setCurrentPrayer: (prayer: Prayer | null) => {
    set({ currentPrayer: prayer })
  },

  searchPrayers: async (query: string) => {
    try {
      return await PrayerService.searchPrayers(query)
    } catch (error) {
      console.error('Search error:', error)
      return []
    }
  },

  clearError: () => set({ error: null }),
}))
