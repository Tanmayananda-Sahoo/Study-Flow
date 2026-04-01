// src/components/ScheduleTimeline.jsx
// Vertical timeline list for the Smart Schedule page.

import Icon from './Icon'

const typeConfig = {
  class: {
    bg:     'bg-accent-light',
    border: 'border-accent-mid',
    text:   'text-accent',
    dot:    'bg-accent',
  },
  study: {
    bg:     'bg-green-50',
    border: 'border-green-200',
    text:   'text-green-700',
    dot:    'bg-green-500',
  },
  break: {
    bg:     'bg-paper',
    border: 'border-border',
    text:   'text-ink-muted',
    dot:    'bg-border',
  },
}

function TimelineEvent({ event, isLast }) {
  const cfg = typeConfig[event.type]

  return (
    <div className="flex gap-4 items-stretch">
      {/* Time label */}
      <div className="w-20 text-right pt-3.5 shrink-0">
        <span className="text-xs font-medium text-ink-muted">{event.time}</span>
      </div>

      {/* Dot + connector line */}
      <div className="flex flex-col items-center shrink-0">
        <div className={`w-2.5 h-2.5 rounded-full mt-4 shrink-0 z-10 ${cfg.dot}`} />
        {!isLast && (
          <div className="w-px flex-1 bg-border mt-0.5" />
        )}
      </div>

      {/* Event card */}
      <div className="flex-1 pb-2">
        <div
          className={`
            flex items-center justify-between
            ${cfg.bg} border ${cfg.border}
            rounded-xl px-3.5 py-2.5
          `}
        >
          <div>
            <p className="text-md font-medium text-ink leading-snug">{event.label}</p>
            {event.subject && (
              <p className={`text-xs mt-0.5 ${cfg.text}`}>{event.subject}</p>
            )}
          </div>
          <span className="flex items-center gap-1 text-xs text-ink-muted shrink-0">
            <Icon name="clock" size={11} />
            {event.duration}
          </span>
        </div>
      </div>
    </div>
  )
}

const ScheduleTimeline = ({ events }) => {
  return (
    <div className="flex flex-col">
      {events.map((event, i) => (
        <TimelineEvent key={i} event={event} isLast={i === events.length - 1} />
      ))}
    </div>
  )
}

export default ScheduleTimeline;