// src/App.jsx
// Root component — handles auth state and page routing.

import { useState } from 'react'

import Navbar   from './layout/Navbar'
import Sidebar  from './layout/Sidebar'

import LoginPage    from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import TimetablePage from './pages/TimetablePage'
import TasksPage     from './pages/TasksPage'
import SchedulePage  from './pages/SchedulePage'

function renderPage(page) {
  switch (page) {
    case 'dashboard': return <DashboardPage />
    case 'timetable': return <TimetablePage />
    case 'tasks':     return <TasksPage />
    case 'schedule':  return <SchedulePage />
    default:          return <DashboardPage />
  }
}

export default function App() {
  const [loggedIn,   setLoggedIn]   = useState(false)
  const [activePage, setActivePage] = useState('dashboard')

  if (!loggedIn) {
    return <LoginPage onLogin={() => setLoggedIn(true)} />
  }

  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        onLogout={() => setLoggedIn(false)}
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
