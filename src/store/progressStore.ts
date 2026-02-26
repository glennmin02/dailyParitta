import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ReadingProgress, CounterState } from '../types/progress'

interface ProgressState {
  readingProgress: Record<string, ReadingProgress>
  counters: Record<string, CounterState>

  // Reading progress actions
  updateReadingProgress: (prayerId: string, progress: Partial<ReadingProgress>) => void
  getReadingProgress: (prayerId: string) => ReadingProgress | undefined
  markAsCompleted: (prayerId: string) => void
  clearReadingProgress: (prayerId: string) => void

  // Counter actions
  incrementCounter: (prayerId: string) => void
  decrementCounter: (prayerId: string) => void
  setCounterTarget: (prayerId: string, target: number) => void
  resetCounter: (prayerId: string) => void
  getCounter: (prayerId: string) => CounterState | undefined

  // General actions
  clearAllProgress: () => void
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      readingProgress: {},
      counters: {},

      // Reading progress
      updateReadingProgress: (prayerId, progress) =>
        set(state => ({
          readingProgress: {
            ...state.readingProgress,
            [prayerId]: {
              ...state.readingProgress[prayerId],
              prayerId,
              ...progress,
              lastReadAt: new Date().toISOString(),
            },
          },
        })),

      getReadingProgress: prayerId => get().readingProgress[prayerId],

      markAsCompleted: prayerId =>
        set(state => ({
          readingProgress: {
            ...state.readingProgress,
            [prayerId]: {
              ...state.readingProgress[prayerId],
              prayerId,
              completed: true,
              scrollPercentage: 100,
              lastReadAt: new Date().toISOString(),
            },
          },
        })),

      clearReadingProgress: prayerId =>
        set(state => {
          const { [prayerId]: _, ...rest } = state.readingProgress
          return { readingProgress: rest }
        }),

      // Counter actions
      incrementCounter: prayerId =>
        set(state => {
          const current = state.counters[prayerId]
          const newCurrent = (current?.current || 0) + 1
          const target = current?.target || 3

          return {
            counters: {
              ...state.counters,
              [prayerId]: {
                prayerId,
                current: newCurrent,
                target,
                lastUpdated: new Date().toISOString(),
              },
            },
          }
        }),

      decrementCounter: prayerId =>
        set(state => {
          const current = state.counters[prayerId]
          if (!current || current.current === 0) return state

          return {
            counters: {
              ...state.counters,
              [prayerId]: {
                ...current,
                current: current.current - 1,
                lastUpdated: new Date().toISOString(),
              },
            },
          }
        }),

      setCounterTarget: (prayerId, target) =>
        set(state => {
          const current = state.counters[prayerId]
          return {
            counters: {
              ...state.counters,
              [prayerId]: {
                prayerId,
                current: current?.current || 0,
                target,
                lastUpdated: new Date().toISOString(),
              },
            },
          }
        }),

      resetCounter: prayerId =>
        set(state => {
          const current = state.counters[prayerId]

          return {
            counters: {
              ...state.counters,
              [prayerId]: {
                prayerId,
                current: 0,
                target: current?.target || 3,
                lastUpdated: new Date().toISOString(),
              },
            },
          }
        }),

      getCounter: prayerId => get().counters[prayerId],

      // General
      clearAllProgress: () =>
        set({
          readingProgress: {},
          counters: {},
        }),
    }),
    {
      name: 'buddha-rites-progress',
    }
  )
)
