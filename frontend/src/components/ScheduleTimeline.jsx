// // src/components/ScheduleTimeline.jsx
// // Vertical timeline list for the Smart Schedule page.

// import Icon from './Icon'

// const typeConfig = {
//   class: {
//     bg:     'bg-accent-light',
//     border: 'border-accent-mid',
//     text:   'text-accent',
//     dot:    'bg-accent',
//   },
//   task: {
//     bg:     'bg-green-50',
//     border: 'border-green-200',
//     text:   'text-green-700',
//     dot:    'bg-green-500',
//   },
//   break: {
//     bg:     'bg-paper',
//     border: 'border-border',
//     text:   'text-ink-muted',
//     dot:    'bg-border',
//   },
// }

// function TimelineEvent({ event, isLast }) {
//   const cfg = typeConfig[event.type.toLowerCase()]

//   return (
//     <div className="flex gap-4 items-stretch">
//       {/* Time label */}
//       <div className="w-20 text-right pt-3.5 shrink-0">
//         <span className="text-xs font-medium text-ink-muted">{event.startTime}</span>
//       </div>

//       {/* Dot + connector line */}
//       <div className="flex flex-col items-center shrink-0">
//         <div className={`w-2.5 h-2.5 rounded-full mt-4 shrink-0 z-10 ${cfg.dot}`} />
//         {!isLast && (
//           <div className="w-px flex-1 bg-border mt-0.5" />
//         )}
//       </div>

//       {/* Event card */}
//       <div className="flex-1 pb-2">
//         <div
//           className={`
//             flex items-center justify-between
//             ${cfg.bg} border ${cfg.border}
//             rounded-xl px-3.5 py-2.5
//           `}
//         >
//           <div>
//             <p className="text-md font-medium text-ink leading-snug">{event.title}</p>
//             {event.subject && (
//               <p className={`text-xs mt-0.5 ${cfg.text}`}>{event.subject}</p>
//             )}
//           </div>
//           <span className="flex items-center gap-1 text-xs text-ink-muted shrink-0">
//             <Icon name="clock" size={11} />
//             {event.duration}
//           </span>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default function ScheduleTimeline({ events }) {
//   return (
//     <div className="flex flex-col">
//       {events.map((event, i) => (
//         <TimelineEvent key={i} event={event} isLast={i === events.length - 1} />
//       ))}
//     </div>
//   )
// }


import Icon from './Icon'

const typeConfig = {
  class: {
    bg: 'bg-accent-light',
    border: 'border-accent-mid',
    text: 'text-accent',
    dot: 'bg-accent',
  },
  task: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-700',
    dot: 'bg-green-500',
  },
  break: {
    bg: 'bg-paper',
    border: 'border-border',
    text: 'text-ink-muted',
    dot: 'bg-border',
  },
}

// Convert HH:MM → minutes
const toMinutes = (time) => {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

// Calculate duration
const getDuration = (start, end) => {
  const mins = toMinutes(end) - toMinutes(start)
  return `${mins} min`
}

function TimelineEvent({ event, isLast }) {

  const cfg = typeConfig[event.type?.toLowerCase()] || typeConfig.task
  const duration = getDuration(event.startTime, event.endTime)

  return (
    <div className="flex gap-4 items-stretch">

      {/* Start Time */}
      <div className="w-20 text-right pt-3.5 shrink-0">
        <span className="text-xs font-medium text-ink-muted">
          {event.startTime}
        </span>
      </div>

      {/* Dot + Line */}
      <div className="flex flex-col items-center shrink-0">
        <div className={`w-2.5 h-2.5 rounded-full mt-4 z-10 ${cfg.dot}`} />
        {!isLast && (
          <div className="w-px flex-1 bg-border mt-0.5" />
        )}
      </div>

      {/* Card */}
      <div className="flex-1 pb-2">
        <div
          className={`flex items-center justify-between ${cfg.bg} border ${cfg.border} rounded-xl px-3.5 py-2.5`}
        >

          <div>
            <p className="text-md font-medium text-ink leading-snug">
              {event.title}
            </p>

            {event.type == "class" && event.venue && (
              <p className={`text-xs mt-0.5 ${cfg.text}`}>
                Venue: {event.venue}
              </p>
            )}

            {event.type === "task" && event.subject && (
              <p className={`text-xs mt-0.5 ${cfg.text}`}>
                {event.subject}
              </p>
            )}
          </div>

          <span className="flex items-center gap-1 text-xs text-ink-muted shrink-0">
            <Icon name="clock" size={11} />
            {duration}
          </span>

        </div>
      </div>

    </div>
  )
}

export default function ScheduleTimeline({ events }) {

  const sortedEvents = [...events].sort(
    (a, b) => toMinutes(a.startTime) - toMinutes(b.startTime)
  )

  return (
    <div className="flex flex-col">
      {sortedEvents.map((event, i) => (
        <TimelineEvent
          key={event.taskId || i}
          event={event}
          isLast={i == sortedEvents.length - 1}
        />
      ))}
    </div>
  )
}