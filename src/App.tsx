import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { ErrorBoundary } from './components/shared/ErrorBoundary'
import { PasscodeGate } from './components/auth'
import { HomePage } from './pages/HomePage'
import { PrayerListPage } from './pages/PrayerListPage'
import { PrayerViewerPage } from './pages/PrayerViewerPage'
import { SettingsPage } from './pages/SettingsPage'

function App() {
  return (
    <ErrorBoundary>
      <PasscodeGate>
        <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/prayers" element={<PrayerListPage />} />
            <Route path="/prayer/:prayerId" element={<PrayerViewerPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
        </BrowserRouter>
      </PasscodeGate>
    </ErrorBoundary>
  )
}

export default App
