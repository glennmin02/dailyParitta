const STORAGE_KEYS = {
  PREFERENCES: 'buddha-rites-preferences',
  PROGRESS: 'buddha-rites-progress',
  COUNTERS: 'buddha-rites-counters',
} as const

export class StorageService {
  private static isStorageAvailable(): boolean {
    try {
      const test = '__storage_test__'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch (e) {
      return false
    }
  }

  static get<T>(key: string, defaultValue: T): T {
    if (!this.isStorageAvailable()) {
      return defaultValue
    }

    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error)
      return defaultValue
    }
  }

  static set<T>(key: string, value: T): boolean {
    if (!this.isStorageAvailable()) {
      return false
    }

    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error)
      return false
    }
  }

  static remove(key: string): boolean {
    if (!this.isStorageAvailable()) {
      return false
    }

    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
      return false
    }
  }

  static clear(): boolean {
    if (!this.isStorageAvailable()) {
      return false
    }

    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.error('Error clearing localStorage:', error)
      return false
    }
  }

  static getPreferences<T>(defaultValue: T): T {
    return this.get(STORAGE_KEYS.PREFERENCES, defaultValue)
  }

  static setPreferences<T>(value: T): boolean {
    return this.set(STORAGE_KEYS.PREFERENCES, value)
  }

  static getProgress<T>(defaultValue: T): T {
    return this.get(STORAGE_KEYS.PROGRESS, defaultValue)
  }

  static setProgress<T>(value: T): boolean {
    return this.set(STORAGE_KEYS.PROGRESS, value)
  }

  static getCounters<T>(defaultValue: T): T {
    return this.get(STORAGE_KEYS.COUNTERS, defaultValue)
  }

  static setCounters<T>(value: T): boolean {
    return this.set(STORAGE_KEYS.COUNTERS, value)
  }
}
