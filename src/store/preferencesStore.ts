import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserPreferences, Theme, FontSize } from '../types/preferences'
import { DEFAULT_PREFERENCES } from '../types/preferences'

interface PreferencesState extends UserPreferences {
  setTheme: (theme: Theme) => void
  setFontSize: (fontSize: FontSize) => void
  toggleBurmese: () => void
  toggleRomanization: () => void
  toggleTranslation: () => void
  resetPreferences: () => void
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    set => ({
      ...DEFAULT_PREFERENCES,

      setTheme: (theme: Theme) => set({ theme }),

      setFontSize: (fontSize: FontSize) => set({ fontSize }),

      toggleBurmese: () =>
        set(state => ({
          language: { ...state.language, showBurmese: !state.language.showBurmese },
        })),

      toggleRomanization: () =>
        set(state => ({
          language: {
            ...state.language,
            showRomanization: !state.language.showRomanization,
          },
        })),

      toggleTranslation: () =>
        set(state => ({
          language: {
            ...state.language,
            showTranslation: !state.language.showTranslation,
          },
        })),

      resetPreferences: () => set(DEFAULT_PREFERENCES),
    }),
    {
      name: 'buddha-rites-preferences',
    }
  )
)
