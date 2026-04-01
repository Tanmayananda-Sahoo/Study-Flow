// src/App.jsx
// Root component — handles auth state and page routing.

import { useState } from 'react'

import Navbar    from './layout/Navbar'
import Sidebar   from './layout/Sidebar'

import LoginPage     from './pages/LoginPage'
import SignupPage    from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import TimetablePage from './pages/TimetablePage'
import TasksPage     from './pages/TasksPage'
import SchedulePage  from './pages/SchedulePage'
import AccountPage   from './pages/AccountPage'

function renderPage(page) {
  switch (page) {
    case 'dashboard': return <DashboardPage />
    case 'timetable': return <TimetablePage />
    case 'tasks':     return <TasksPage />
    case 'schedule':  return <SchedulePage />
    case 'account':   return <AccountPage />
    default:          return <DashboardPage />
  }
}

export default function App() {
  const [screen,     setScreen]     = useState('login')
  const [activePage, setActivePage] = useState('dashboard')

  if (screen === 'login') {
    return (
      <LoginPage
        onLogin={() => setScreen('app')}
        onGoSignup={() => setScreen('signup')}
      />
    )
  }

  if (screen === 'signup') {
    return (
      <SignupPage
        onSignup={() => setScreen('app')}
        onGoLogin={() => setScreen('login')}
      />
    )
  }

  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        onLogout={() => { setScreen('login'); setActivePage('dashboard') }}
      />

      <div className="flex min-h-content">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />

        <main className="flex-1 px-10 py-8 overflow-y-auto">
          {renderPage(activePage)}
        </main>
      </div>
    </div>
  )
}
