// src/components/TimetableGrid.jsx
// 5-day timetable grid with colored class blocks.

const DAYS  = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const HOURS = ['8:00','9:00','10:00','11:00','12:00','1:00','2:00','3:00','4:00','5:00']

// Color variants — tailwind-safe (no dynamic construction)
const colorMap = {
  blue:   { bg: 'bg-accent-light', border: 'border-accent-mid',  text: 'text-accent' },
  orange: { bg: 'bg-orange-50',    border: 'border-orange-200',  text: 'text-orange-700' },
  green:  { bg: 'bg-green-50',     border: 'border-green-200',   text: 'text-green-700' },
  purple: { bg: 'bg-purple-50',    border: 'border-purple-200',  text: 'text-purple-700' },
}

const CLASSES = [
  { day: 'Monday',    start: 1, span: 2, name: 'Advanced Math',  room: 'A-204',   color: 'blue'   },
  { day: 'Monday',    start: 6, span: 2, name: 'Physics Lab',    room: 'Lab D-1', color: 'orange' },
  { day: 'Tuesday',   start: 2, span: 2, name: 'Organic Chem',   room: 'B-108',   color: 'green'  },
  { day: 'Tuesday',   start: 5, span: 1, name: 'Statistics',     room: 'A-101',   color: 'blue'   },
  { day: 'Wednesday', start: 0, span: 2, name: 'Calculus',       room: 'C-203',   color: 'orange' },
  { day: 'Wednesday', start: 4, span: 2, name: 'English Lit',    room: 'C-301',   color: 'green'  },
  { day: 'Thursday',  start: 1, span: 3, name: 'Research Lab',   room: 'Lab E-2', color: 'purple' },
  { day: 'Thursday',  start: 6, span: 2, name: 'Seminar',        room: 'Hall B',  color: 'blue'   },
  { day: 'Friday',    start: 2, span: 2, name: 'Data Science',   room: 'Lab C-3', color: 'orange' },
  { day: 'Friday',    start: 5, span: 1, name: 'Office Hours',   room: 'Prof.Rm', color: 'green'  },
]

export default function TimetableGrid() {
  return (
    <div className="bg-white border border-border rounded-3xl overflow-hidden">
      {/* Header row */}
      <div className="grid bg-paper border-b border-border" style={{ gridTemplateColumns: '60px repeat(5, 1fr)' }}>
        <div className="p-3" />
        {DAYS.map(d => (
          <div
            key={d}
            className="p-3 text-center text-2xs font-semibold text-ink-muted uppercase tracking-label border-l border-border"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Time rows */}
      {HOURS.map((h, hi) => (
        <div
          key={h}
          className="grid border-b border-border-soft last:border-b-0"
          style={{ gridTemplateColumns: '60px repeat(5, 1fr)', minHeight: '60px' }}
        >
          {/* Hour label */}
          <div className="px-2 pt-2 text-2xs font-medium text-ink-muted">{h}</div>

          {/* Day cells */}
          {DAYS.map(d => {
            const cls = CLASSES.find(c => c.day === d && c.start === hi)
            const occupied = !cls && CLASSES.find(c => c.day === d && c.start < hi && c.start + c.span > hi)

            if (cls) {
              const col = colorMap[cls.color]
              return (
                <div key={d} className="border-l border-border p-1 relative">
                  <div
                    className={`
                      ${col.bg} border ${col.border}
                      rounded-lg px-2.5 py-2 overflow-hidden
                    `}
                    style={{ height: `${cls.span * 60 - 10}px` }}
                  >
                    <p className={`text-xs font-semibold ${col.text} leading-tight`}>{cls.name}</p>
                    <p className={`text-2xs mt-0.5 ${col.text} opacity-70`}>{cls.room}</p>
                  </div>
                </div>
              )
            }

            if (occupied) {
              return <div key={d} className="border-l border-border" />
            }

            return <div key={d} className="border-l border-border" />
          })}
        </div>
      ))}
    </div>
  )
}
