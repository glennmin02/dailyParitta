export type PrayerType = 'morning' | 'evening' | 'general' | 'special'

export type ContentBlockType = 'verse' | 'heading' | 'instruction' | 'pause'

export interface PrayerContent {
  id: string
  order: number
  burmese: string
  romanization?: string // Pali romanization
  burmeseRomanization?: string // Burmese phonetic pronunciation
  translation?: string
  type: ContentBlockType
  notes?: string
}

export interface CounterConfig {
  enabled: boolean
  defaultCount: number
  maxCount: number
  allowCustomCount?: boolean
}

export interface PrayerMetadata {
  author?: string
  source?: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  tags?: string[]
}

export interface Prayer {
  id: string
  title: string
  type: PrayerType
  content: PrayerContent[]
  counterConfig?: CounterConfig
  metadata?: PrayerMetadata
  createdAt?: string
  updatedAt?: string
}

export interface PrayerManifest {
  prayers: Array<{
    id: string
    file: string
    type: PrayerType
  }>
  version: string
  lastUpdated: string
}
