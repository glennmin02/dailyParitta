import React from 'react'
import type { PrayerContent } from '../../types/prayer'
import { usePreferencesStore } from '../../store'

interface ContentBlockProps {
  content: PrayerContent
}

export const ContentBlock: React.FC<ContentBlockProps> = ({ content }) => {
  const { fontSize, language } = usePreferencesStore()

  const getFontSizeClass = () => {
    // Mobile-optimized font sizes
    switch (fontSize) {
      case 'small':
        return 'text-base md:text-lg'
      case 'large':
        return 'text-xl md:text-2xl'
      case 'xlarge':
        return 'text-2xl md:text-3xl'
      default:
        return 'text-lg md:text-xl'
    }
  }

  const renderByType = () => {
    switch (content.type) {
      case 'heading':
        return (
          <div className="mb-4 md:mb-6 mt-6">
            {language.showBurmese && (
              <h2 className={`text-xl md:text-2xl lg:text-3xl font-bold font-burmese ${getFontSizeClass()} mb-2 leading-relaxed`}>
                {content.burmese}
              </h2>
            )}
            {language.showRomanization && content.romanization && (
              <p className="text-base md:text-lg italic text-[var(--color-text-secondary)] mb-1">
                {content.romanization}
              </p>
            )}
            {language.showTranslation && content.translation && (
              <p className="text-base md:text-lg text-[var(--color-text-secondary)]">
                {content.translation}
              </p>
            )}
          </div>
        )

      case 'instruction':
        return (
          <div className="my-3 md:my-4 p-3 md:p-4 bg-[var(--color-accent)]/10 border-l-4 border-[var(--color-accent)] rounded">
            {language.showBurmese && (
              <p className={`font-burmese ${getFontSizeClass()} mb-1 leading-relaxed`}>
                {content.burmese}
              </p>
            )}
            {language.showRomanization && content.romanization && (
              <p className="text-sm md:text-base italic text-[var(--color-text-secondary)] mb-1">
                {content.romanization}
              </p>
            )}
            {language.showTranslation && content.translation && (
              <p className="text-sm md:text-base text-[var(--color-accent)] font-medium">
                {content.translation}
              </p>
            )}
          </div>
        )

      case 'pause':
        return (
          <div className="my-6 text-center">
            <div className="inline-block p-3 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border)]">
              <span className="text-2xl">⏸️</span>
              {language.showTranslation && content.translation && (
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                  {content.translation}
                </p>
              )}
            </div>
          </div>
        )

      case 'verse':
      default:
        return (
          <div className="mb-3 md:mb-4 p-2 md:p-3 hover:bg-[var(--color-bg-secondary)]/50 rounded transition-colors duration-150">
            {language.showBurmese && (
              <p className={`font-burmese ${getFontSizeClass()} leading-loose md:leading-relaxed mb-2`}>
                {content.burmese}
              </p>
            )}
            {language.showRomanization && content.romanization && (
              <p className="text-sm md:text-base italic text-[var(--color-text-secondary)] mb-1">
                {content.romanization}
              </p>
            )}
            {language.showTranslation && content.translation && (
              <p className="text-sm md:text-base text-[var(--color-text-secondary)]">
                {content.translation}
              </p>
            )}
            {content.notes && (
              <p className="text-xs md:text-sm text-[var(--color-text-secondary)] mt-2 italic bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
                📌 {content.notes}
              </p>
            )}
          </div>
        )
    }
  }

  return <div id={`content-${content.id}`}>{renderByType()}</div>
}
