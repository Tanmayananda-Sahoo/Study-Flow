// src/layout/Sidebar.jsx

import Icon from '../components/Icon'

const SIDEBAR_ITEMS = [
  { id: 'dashboard',     label: 'Dashboard',      icon: 'dashboard' },
  { id: 'timetable',     label: 'Timetable',       icon: 'timetable' },
  { id: 'tasks',         label: 'Study Tasks',     icon: 'tasks'     },
  { id: 'schedule',      label: 'Smart Schedule',  icon: 'schedule'  },
  { id: 'notifications', label: 'Notifications',   icon: 'bell'      },
]

export default function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="w-sidebar shrink-0 bg-white border-r border-border flex flex-col gap-1 p-4 min-h-content">

      {/* User profile chip */}
      <div className="flex items-center gap-2.5 p-2.5 bg-paper rounded-xl border border-border mb-3">
        <div className="w-8 h-8 rounded-lg bg-accent-light flex items-center justify-center text-base font-semibold text-accent shrink-0">
          A
        </div>
        <div>
          <p className="text-base font-medium text-ink leading-none">Alex Chen</p>
          <p className="text-xs text-ink-muted mt-0.5">Year 3 · CS</p>
        </div>
      </div>

      {/* Section label */}
      <p className="text-2xs font-semibold text-ink-muted uppercase tracking-caps px-2 pt-2 pb-1">
        Navigation
      </p>

      {/* Nav items */}
      {SIDEBAR_ITEMS.map(item => (
        <button
          key={item.id}
          onClick={() => setActivePage(item.id)}
          className={`sidebar-item ${activePage === item.id ? 'active' : ''}`}
        >
          <Icon name={item.icon} size={15} />
          {item.label}
        </button>
      ))}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Weekly goal widget */}
      <div className="p-4 bg-accent-light rounded-xl border border-accent-mid mt-4">
        <p className="text-xs font-semibold text-accent mb-1">Weekly Goal</p>
        <p className="text-xs text-accent opacity-80 mb-2">18.5 / 22 hours</p>
        <div className="bg-accent-mid rounded-full h-1 overflow-hidden">
          <div className="bg-accent h-full rounded-full" style={{ width: '84%' }} />
        </div>
        <p className="text-xs text-accent opacity-70 mt-1.5">84% achieved</p>
      </div>
    </aside>
  )
}
