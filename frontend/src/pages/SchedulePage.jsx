// src/pages/SchedulePage.jsx

import ScheduleTimeline from '../components/ScheduleTimeline'
import Icon from '../components/Icon'

const EVENTS = [
  { time: '8:00 AM',  end: '9:00 AM',   label: 'Morning Review',     type: 'study', subject: 'Mathematics', duration: '60 min'  },
  { time: '9:00 AM',  end: '10:30 AM',  label: 'Advanced Mathematics',type: 'class', subject: 'Lecture',     duration: '90 min'  },
  { time: '10:30 AM', end: '11:00 AM',  label: 'Break',               type: 'break', subject: '',            duration: '30 min'  },
  { time: '11:00 AM', end: '12:30 PM',  label: 'Organic Chemistry',   type: 'class', subject: 'Lab',         duration: '90 min'  },
  { time: '12:30 PM', end: '1:30 PM',   label: 'Lab Report Writing',  type: 'study', subject: 'Chemistry',   duration: '60 min'  },
  { time: '1:30 PM',  end: '2:00 PM',   label: 'Lunch Break',         type: 'break', subject: '',            duration: '30 min'  },
  { time: '2:00 PM',  end: '3:30 PM',   label: 'English Literature',  type: 'class', subject: 'Seminar',     duration: '90 min'  },
  { time: '3:30 PM',  end: '5:00 PM',   label: 'Problem Set Practice',type: 'study', subject: 'Mathematics', duration: '90 min'  },
  { time: '5:00 PM',  end: '6:00 PM',   label: 'Physics Review',      type: 'study', subject: 'Physics',     duration: '60 min'  },
]

const LEGEND = [
  { type: 'class', dot: 'bg-accent',     label: 'Class'  },
  { type: 'study', dot: 'bg-green-500',  label: 'Study'  },
  { type: 'break', dot: 'bg-border',     label: 'Break'  },
]

const SchedulePage = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-0.5">
        <h1 className="text-3xl font-semibold text-ink tracking-tighter">Smart Schedule</h1>
      </div>
      <p className="text-md text-ink-muted mb-6">Monday, 30 March 2026 · AI-optimised study plan</p>

      {/* Legend */}
      <div className="flex gap-5 mb-6">
        {LEGEND.map(l => (
          <div key={l.type} className="flex items-center gap-2 text-xs text-ink-muted">
            <div className={`w-2 h-2 rounded-full ${l.dot}`} />
            {l.label}
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="bg-white border border-border rounded-3xl p-6">
        <ScheduleTimeline events={EVENTS} />
      </div>
    </div>
  )
}

export default SchedulePage