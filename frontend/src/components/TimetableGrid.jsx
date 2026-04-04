// src/components/TimetableGrid.jsx
// 5-day timetable grid. Accepts a `classes` array as prop for dynamic entries.

const DAYS  = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const HOURS = ['8:00','9:00','10:00','11:00','12:00','1:00','2:00','3:00','4:00','5:00','6:00']

// Rotate through these colors for new entries
export const COLOR_CYCLE = ['blue', 'orange', 'green', 'purple', 'rose']

// Tailwind-safe static map — no dynamic class construction
const colorMap = {
  blue:   { bg: 'bg-accent-light', border: 'border-accent-mid',   text: 'text-accent'       },
  orange: { bg: 'bg-orange-50',    border: 'border-orange-200',   text: 'text-orange-700'   },
  green:  { bg: 'bg-green-50',     border: 'border-green-200',    text: 'text-green-700'    },
  purple: { bg: 'bg-purple-50',    border: 'border-purple-200',   text: 'text-purple-700'   },
  rose:   { bg: 'bg-rose-50',      border: 'border-rose-200',     text: 'text-rose-700'     },
}

// Convert "HH:MM" time string → index into HOURS array (0-based from 8:00)
function timeToIndex(timeStr) {
  if (!timeStr) return -1
  const [h, m] = timeStr.split(':').map(Number)
  return h - 8 + (m >= 30 ? 0.5 : 0)   // 8:00 → 0, 9:00 → 1, etc.
}

function spanFromTimes(start, end) {
  const s = timeToIndex(start)
  const e = timeToIndex(end)
  return Math.max(1, Math.round(e - s))
}

export default function TimetableGrid({ classes = [] }) {
  return (
    <div className="bg-white border border-border rounded-3xl overflow-hidden">

      {/* Header row */}
      <div className="grid bg-paper border-b border-border" style={{ gridTemplateColumns: '64px repeat(5, 1fr)' }}>
        <div className="p-3" />
        {DAYS.map(d => (
          <div key={d} className="p-3 text-center text-2xs font-semibold text-ink-muted uppercase tracking-label border-l border-border">
            {d}
          </div>
        ))}
      </div>

      {/* Time rows */}
      {HOURS.map((h, hi) => (
        <div
          key={h}
          className="grid border-b border-border-soft last:border-b-0"
          style={{ gridTemplateColumns: '64px repeat(5, 1fr)', minHeight: '64px' }}
        >
          {/* Hour label */}
          <div className="px-2 pt-2 text-2xs font-medium text-ink-muted shrink-0">{h}</div>

          {/* Day cells */}
          {DAYS.map(day => {
            const cls = classes.find(c => c.day === day && Math.round(timeToIndex(c.start)) === hi)
            const occupied = !cls && classes.find(c => {
              const s = Math.round(timeToIndex(c.start))
              const span = spanFromTimes(c.start, c.end)
              return c.day === day && s < hi && s + span > hi
            })

            if (cls) {
              const col = colorMap[cls.color] || colorMap.blue
              const span = spanFromTimes(cls.start, cls.end)
              return (
                <div key={day} className="border-l border-border p-1 relative">
                  <div
                    className={`${col.bg} border ${col.border} rounded-lg px-2.5 py-2 overflow-hidden`}
                    style={{ height: `${span * 64 - 10}px` }}
                  >
                    <p className={`text-xs font-semibold ${col.text} leading-tight`}>{cls.name}</p>
                    <p className={`text-2xs mt-0.5 ${col.text} opacity-70`}>{cls.venue}</p>
                    <p className={`text-2xs mt-0.5 ${col.text} opacity-55`}>{cls.start} – {cls.end}</p>
                    {cls.repeats && (
                      <p className={`text-2xs mt-1 ${col.text} opacity-50 italic`}>Repeats weekly</p>
                    )}
                  </div>
                </div>
              )
            }

            if (occupied) return <div key={day} className="border-l border-border" />
            return <div key={day} className="border-l border-border" />
          })}
        </div>
      ))}

      {/* Empty state */}
      {classes.length === 0 && (
        <div className="text-center py-10 text-ink-muted text-md border-t border-border-soft">
          No classes added yet. Use "Add Class" to populate your timetable.
        </div>
      )}
    </div>
  )
}
