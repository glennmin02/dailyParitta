import type { Prayer, PrayerManifest } from '../types/prayer'

export class PrayerService {
  private static BASE_PATH = '/data/prayers'
  private static MANIFEST_FILE = '/data/manifest.json'

  static async loadManifest(): Promise<PrayerManifest> {
    try {
      const response = await fetch(this.MANIFEST_FILE)
      if (!response.ok) {
        throw new Error(`Failed to load manifest: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error loading prayer manifest:', error)
      throw error
    }
  }

  static async loadPrayer(prayerId: string): Promise<Prayer> {
    try {
      const manifest = await this.loadManifest()
      const prayerEntry = manifest.prayers.find(p => p.id === prayerId)

      if (!prayerEntry) {
        throw new Error(`Prayer not found: ${prayerId}`)
      }

      const response = await fetch(`${this.BASE_PATH}/${prayerEntry.file}`)
      if (!response.ok) {
        throw new Error(`Failed to load prayer: ${response.statusText}`)
      }

      const prayer: Prayer = await response.json()
      return prayer
    } catch (error) {
      console.error(`Error loading prayer "${prayerId}":`, error)
      throw error
    }
  }

  static async loadAllPrayers(): Promise<Prayer[]> {
    try {
      const manifest = await this.loadManifest()
      const prayers = await Promise.all(
        manifest.prayers.map(entry => this.loadPrayer(entry.id))
      )
      return prayers
    } catch (error) {
      console.error('Error loading all prayers:', error)
      throw error
    }
  }

  static async searchPrayers(query: string): Promise<Prayer[]> {
    try {
      const allPrayers = await this.loadAllPrayers()
      const lowercaseQuery = query.toLowerCase()

      return allPrayers.filter(
        prayer =>
          prayer.title.toLowerCase().includes(lowercaseQuery) ||
          prayer.type.toLowerCase().includes(lowercaseQuery) ||
          prayer.metadata?.tags?.some(tag =>
            tag.toLowerCase().includes(lowercaseQuery)
          )
      )
    } catch (error) {
      console.error('Error searching prayers:', error)
      return []
    }
  }
}
