import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { usePreferencesStore } from '../../store'

export const Header: React.FC = () => {
  const location = useLocation()
  const { theme, setTheme } = usePreferencesStore()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] safe-top">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🙏</span>
          <h1 className="text-xl font-bold text-[var(--color-accent)]">
            Daily Paritta
          </h1>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            to="/prayers"
            className={`px-3 py-2 rounded-lg transition-colors ${
              isActive('/prayers')
                ? 'bg-[var(--color-accent)] text-white'
                : 'hover:bg-[var(--color-bg-primary)]'
            }`}
          >
            Prayers
          </Link>
          <Link
            to="/settings"
            className={`px-3 py-2 rounded-lg transition-colors ${
              isActive('/settings')
                ? 'bg-[var(--color-accent)] text-white'
                : 'hover:bg-[var(--color-bg-primary)]'
            }`}
          >
            Settings
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-[var(--color-bg-primary)] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  )
}
