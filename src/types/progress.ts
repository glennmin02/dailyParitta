export interface CounterState {
  prayerId: string
  current: number
  target: number
  lastUpdated: string
}

export interface ReadingProgress {
  prayerId: string
  scrollPosition: number
  scrollPercentage: number
  lastContentId?: string
  lastReadAt: string
  completed: boolean
  totalReadTime?: number // in seconds
}

export interface SessionProgress {
  prayerId: string
  startedAt: string
  lastActiveAt: string
  counter?: CounterState
  reading?: ReadingProgress
}
