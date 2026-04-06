// src/layout/Navbar.jsx

import Icon from '../components/Icon'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'timetable', label: 'Timetable' },
  { id: 'tasks',     label: 'Tasks'     },
  { id: 'schedule',  label: 'Schedule'  },
]

export default function Navbar({ activePage, setActivePage, onLogout }) {
  return (
    <nav className="sticky top-0 z-50 h-navbar flex items-center justify-between px-8 border-b border-border bg-paper/90 backdrop-blur-lg">

      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center">
          <Icon name="book" size={14} className="text-white" />
        </div>
        <span className="text-lg font-semibold text-ink tracking-tight">StudyFlow</span>
      </div>

      {/* Centre nav links */}
      <div className="flex items-center gap-1">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`nav-link ${activePage === item.id ? 'active' : ''}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1">
        <button onClick={onLogout} className="nav-link p-1.5">
          <Icon name="logout" size={16} />
        </button>
      </div>
    </nav>
  )
}
