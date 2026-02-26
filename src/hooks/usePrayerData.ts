import { useEffect } from 'react'
import { usePrayerStore } from '../store'

export const usePrayerData = () => {
  const { prayers, isLoading, error, loadPrayers } = usePrayerStore()

  useEffect(() => {
    if (prayers.length === 0 && !isLoading && !error) {
      loadPrayers()
    }
  }, [prayers.length, isLoading, error, loadPrayers])

  return { prayers, isLoading, error }
}
