export type Theme = 'light' | 'dark' | 'auto'

export type FontSize = 'small' | 'medium' | 'large' | 'xlarge'

export interface LanguagePreferences {
  showBurmese: boolean
  showRomanization: boolean
  showTranslation: boolean
}

export interface UserPreferences {
  theme: Theme
  fontSize: FontSize
  language: LanguagePreferences
  hapticFeedback: boolean
  wakeLock: boolean
  autoSaveProgress: boolean
  soundEnabled: boolean
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'auto',
  fontSize: 'medium',
  language: {
    showBurmese: true,
    showRomanization: true,
    showTranslation: true,
  },
  hapticFeedback: true,
  wakeLock: false,
  autoSaveProgress: true,
  soundEnabled: true,
}
