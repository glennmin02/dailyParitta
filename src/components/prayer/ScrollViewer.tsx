import React, { useEffect, useRef } from 'react'
import type { Prayer } from '../../types/prayer'
import { ContentBlock } from './ContentBlock'
import { useProgressStore } from '../../store'

interface ScrollViewerProps {
  prayer: Prayer
}

export const ScrollViewer: React.FC<ScrollViewerProps> = ({ prayer }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const { updateReadingProgress, getReadingProgress } = useProgressStore()

  useEffect(() => {
    // Restore scroll position
    const progress = getReadingProgress(prayer.id)
    if (progress && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = progress.scrollPosition
    }
  }, [prayer.id, getReadingProgress])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollTop = container.scrollTop
      const scrollHeight = container.scrollHeight - container.clientHeight
      const scrollPercentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0

      // Save progress
      updateReadingProgress(prayer.id, {
        scrollPosition: scrollTop,
        scrollPercentage: Math.round(scrollPercentage),
        completed: scrollPercentage >= 95,
      })
    }

    // Throttle scroll events
    let timeoutId: ReturnType<typeof setTimeout>
    const throttledScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleScroll, 500)
    }

    container.addEventListener('scroll', throttledScroll)
    return () => {
      container.removeEventListener('scroll', throttledScroll)
      clearTimeout(timeoutId)
    }
  }, [prayer.id, updateReadingProgress])

  return (
    <div
      ref={scrollContainerRef}
      className="h-full overflow-y-auto px-3 md:px-6 py-4 md:py-6 scroll-smooth"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-burmese mb-4 md:mb-6 text-[var(--color-accent)] leading-tight">
          {prayer.title}
        </h1>

        {prayer.metadata?.source && (
          <p className="text-xs md:text-sm text-[var(--color-text-secondary)] mb-4 md:mb-6 italic">
            Source: {prayer.metadata.source}
          </p>
        )}

        <div className="space-y-3 md:space-y-4 pb-24">
          {prayer.content
            .sort((a, b) => a.order - b.order)
            .map(content => (
              <ContentBlock key={content.id} content={content} />
            ))}
        </div>

        <div className="mt-8 md:mt-12 pt-4 md:pt-6 border-t border-[var(--color-border)] text-center text-sm text-[var(--color-text-secondary)]">
          <p>🙏 May all beings be happy 🙏</p>
        </div>
      </div>
    </div>
  )
}
