// src/pages/DashboardPage.jsx

import DashboardCard from '../components/DashboardCard'
import HoverCard     from '../components/HoverCard'
import Icon          from '../components/Icon'

const STATS = [
  { label: 'This Week', value: '18.5h',  sub: 'study hours' },
  { label: 'Sessions',  value: '12',     sub: 'completed'   },
  { label: 'Streak',    value: '7 days', sub: 'current'     },
  { label: 'Goal',      value: '84%',    sub: 'achieved'    },
]

const CLASSES = [
  { name: 'Advanced Mathematics', time: '9:00 – 10:30',  room: 'Hall A-204', status: 'upcoming' },
  { name: 'Organic Chemistry',    time: '11:00 – 12:30', room: 'Lab B-108',  status: 'ongoing'  },
  { name: 'English Literature',   time: '2:00 – 3:30',   room: 'Room C-301', status: 'upcoming' },
]

const FREE_SLOTS = ['10:30 – 11:00', '12:30 – 2:00', '3:30 – 5:00']

const SUGGESTIONS = [
  { subject: 'Mathematics',      reason: 'Exam in 3 days',      duration: '90 min', icon: 'brain' },
  { subject: 'Chemistry Report', reason: 'Due tomorrow',         duration: '60 min', icon: 'book'  },
  { subject: 'Literature Essay', reason: 'Recommended review',   duration: '45 min', icon: 'book'  },
]

const WEEK_BARS = [
  { day: 'Mon', h: 3.5 }, { day: 'Tue', h: 4.0 }, { day: 'Wed', h: 2.5 },
  { day: 'Thu', h: 4.5 }, { day: 'Fri', h: 3.0 }, { day: 'Sat', h: 1.5 },
  { day: 'Sun', h: 0   },
]

const DashboardPage = () => {
  return (
    <div>
      {/* Page header */}
      <div className="flex items-center gap-2 mb-0.5">
        <Icon name="sun" size={18} className="text-accent" />
        <h1 className="text-3xl font-semibold text-ink tracking-tighter">Good morning, Alex</h1>
      </div>
      <p className="text-md text-ink-muted mb-8">Monday, 30 March 2026 · 3 classes scheduled today</p>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {STATS.map(s => <DashboardCard key={s.label} {...s} />)}
      </div>

      {/* Today's Classes + Free Slots */}
      <div className="grid grid-cols-[1.4fr_1fr] gap-4 mb-4">

        {/* Today's Classes */}
        <HoverCard>
          <p className="card-label">Today's Classes</p>
          <div className="flex flex-col gap-3">
            {CLASSES.map(c => (
              <div
                key={c.name}
                className="flex items-center gap-3 p-3 bg-paper rounded-xl border border-border-soft"
              >
                <div
                  className={`
                    w-9 h-9 rounded-lg flex items-center justify-center shrink-0
                    border transition-colors
                    ${c.status === 'ongoing'
                      ? 'bg-accent-light border-accent-mid'
                      : 'bg-white border-border'}
                  `}
                >
                  <Icon
                    name="book"
                    size={15}
                    className={c.status === 'ongoing' ? 'text-accent' : 'text-ink-muted'}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-md font-medium text-ink">{c.name}</p>
                  <p className="text-xs text-ink-muted mt-0.5">{c.time} · {c.room}</p>
                </div>
                {c.status === 'ongoing' && <span className="badge-live shrink-0">Live</span>}
              </div>
            ))}
          </div>
        </HoverCard>

        {/* Free Slots */}
        <HoverCard>
          <p className="card-label">Free Time Slots</p>
          <div className="flex flex-col gap-2">
            {FREE_SLOTS.map(slot => (
              <div
                key={slot}
                className="flex items-center justify-between px-4 py-3 bg-accent-light rounded-xl border border-accent-mid"
              >
                <div className="flex items-center gap-2">
                  <Icon name="clock" size={14} className="text-accent" />
                  <span className="text-base font-medium text-accent">{slot}</span>
                </div>
                <button className="text-xs font-medium text-accent border border-accent-mid bg-white rounded-full px-3 py-1 hover:bg-accent-light transition-colors">
                  Schedule
                </button>
              </div>
            ))}
            <p className="text-center text-xs text-ink-muted mt-2">4.5 hrs of free time today</p>
          </div>
        </HoverCard>
      </div>

      {/* Smart Suggestions */}
      <HoverCard className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <p className="card-label mb-0">Smart Study Suggestions</p>
          <span className="badge-ai">AI Powered</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {SUGGESTIONS.map(s => (
            <div key={s.subject} className="p-4 bg-paper rounded-xl border border-border-soft">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-accent-light flex items-center justify-center">
                  <Icon name={s.icon} size={13} className="text-accent" />
                </div>
                <p className="text-base font-medium text-ink">{s.subject}</p>
              </div>
              <p className="text-xs text-ink-muted mb-2">{s.reason}</p>
              <p className="text-xs font-medium text-accent">{s.duration}</p>
            </div>
          ))}
        </div>
      </HoverCard>

      {/* Weekly bar chart */}
      <HoverCard>
        <div className="flex items-center justify-between mb-4">
          <p className="card-label mb-0">Weekly Study Hours</p>
          <div className="flex items-center gap-1.5">
            <Icon name="trending" size={14} className="text-green-600" />
            <span className="text-xs font-medium text-green-700">+2.3h vs last week</span>
          </div>
        </div>
        <div className="flex gap-2 items-end h-20">
          {WEEK_BARS.map(({ day, h }) => (
            <div key={day} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-full rounded-md transition-all ${day === 'Mon' ? 'bg-accent' : 'bg-accent-mid'}`}
                style={{ height: `${(h / 5) * 64}px` }}
              />
              <span className="text-xs text-ink-muted">{day}</span>
            </div>
          ))}
        </div>
      </HoverCard>
    </div>
  )
}

export default DashboardPage;