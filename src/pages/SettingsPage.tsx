import React from 'react'
import { usePreferencesStore } from '../store'
import { Card } from '../components/shared/Card'
import type { Theme, FontSize } from '../types/preferences'

export const SettingsPage: React.FC = () => {
  const {
    theme,
    fontSize,
    language,
    hapticFeedback,
    wakeLock,
    soundEnabled,
    setTheme,
    setFontSize,
    toggleBurmese,
    toggleRomanization,
    toggleTranslation,
    toggleHapticFeedback,
    toggleWakeLock,
    toggleSound,
    resetPreferences,
  } = usePreferencesStore()

  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
    title,
    children,
  }) => (
    <Card className="mb-6">
      <h2 className="text-xl font-semibold mb-4 text-[var(--color-accent)]">
        {title}
      </h2>
      {children}
    </Card>
  )

  const Toggle: React.FC<{
    label: string
    checked: boolean
    onChange: () => void
    description?: string
  }> = ({ label, checked, onChange, description }) => (
    <div className="flex items-center justify-between py-3 border-b border-[var(--color-border)] last:border-b-0">
      <div className="flex-1">
        <div className="font-medium">{label}</div>
        {description && (
          <div className="text-sm text-[var(--color-text-secondary)] mt-1">
            {description}
          </div>
        )}
      </div>
      <button
        onClick={onChange}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          checked ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border)]'
        }`}
        aria-label={label}
      >
        <div
          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
            checked ? 'translate-x-7' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-[var(--color-accent)]">
        Settings
      </h1>

      <Section title="Appearance">
        <div className="space-y-3">
          <div>
            <label className="block font-medium mb-2">Theme</label>
            <div className="flex gap-2">
              {(['light', 'dark', 'auto'] as Theme[]).map(t => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                    theme === t
                      ? 'bg-[var(--color-accent)] text-white'
                      : 'bg-[var(--color-bg-secondary)] hover:bg-[var(--color-border)]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">Font Size</label>
            <div className="flex gap-2">
              {(['small', 'medium', 'large', 'xlarge'] as FontSize[]).map(
                size => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`px-3 py-2 rounded-lg capitalize transition-colors ${
                      fontSize === size
                        ? 'bg-[var(--color-accent)] text-white'
                        : 'bg-[var(--color-bg-secondary)] hover:bg-[var(--color-border)]'
                    }`}
                  >
                    {size === 'xlarge' ? 'XL' : size}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Language Display">
        <div>
          <Toggle
            label="Show Burmese"
            checked={language.showBurmese}
            onChange={toggleBurmese}
            description="Display prayers in Burmese script"
          />
          <Toggle
            label="Show Romanization"
            checked={language.showRomanization}
            onChange={toggleRomanization}
            description="Display phonetic romanization"
          />
          <Toggle
            label="Show English Translation"
            checked={language.showTranslation}
            onChange={toggleTranslation}
            description="Display English translations"
          />
        </div>
      </Section>

      <Section title="Interaction">
        <div>
          <Toggle
            label="Haptic Feedback"
            checked={hapticFeedback}
            onChange={toggleHapticFeedback}
            description="Vibrate on counter interactions"
          />
          <Toggle
            label="Sound Effects"
            checked={soundEnabled}
            onChange={toggleSound}
            description="Play sounds for completion"
          />
          <Toggle
            label="Keep Screen Awake"
            checked={wakeLock}
            onChange={toggleWakeLock}
            description="Prevent screen from sleeping during prayers"
          />
        </div>
      </Section>

      <Section title="About">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2">
            <span className="text-[var(--color-text-secondary)]">Version</span>
            <span className="font-medium">1.0.0</span>
          </div>
          <div className="py-2 border-t border-[var(--color-border)]">
            <p className="text-[var(--color-text-secondary)] mb-2">
              Daily Paritta is a Progressive Web App for Myanmar Buddhist
              daily prayers.
            </p>
            <p className="text-[var(--color-text-secondary)]">
              Built with love for the Buddhist community 🙏
            </p>
          </div>
        </div>
      </Section>

      <Card className="border-red-300">
        <button
          onClick={resetPreferences}
          className="w-full text-red-600 font-medium hover:text-red-700"
        >
          Reset All Settings
        </button>
      </Card>
    </div>
  )
}
