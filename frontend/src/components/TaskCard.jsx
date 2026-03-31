// src/components/TaskCard.jsx
// Single task row with checkbox, priority tag, duration, and due date.

import Icon from './Icon'

const tagClass = {
  high: 'tag-high',
  med:  'tag-med',
  low:  'tag-low',
}

const tagLabel = {
  high: 'High Priority',
  med:  'Medium',
  low:  'Low',
}

export default function TaskCard({ task }) {
  const { name, subject, priority, duration, due, done } = task

  return (
    <div
      className={`
        flex items-center gap-4
        bg-white border border-border rounded-xl px-5 py-4
        shadow-card transition-all duration-150 hover:shadow-card-hover
        ${done ? 'opacity-50' : ''}
      `}
    >
      {/* Checkbox */}
      <div
        className={`
          w-5 h-5 rounded-md shrink-0 flex items-center justify-center
          border-[1.5px] cursor-pointer transition-colors duration-150
          ${done
            ? 'bg-accent border-accent'
            : 'bg-transparent border-border hover:border-accent-mid'
          }
        `}
      >
        {done && <Icon name="check" size={11} className="text-white" />}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-md font-medium text-ink leading-snug ${
            done ? 'line-through' : ''
          }`}
        >
          {name}
        </p>
        <p className="text-xs text-ink-muted mt-0.5">{subject}</p>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2 shrink-0">
        <span className={tagClass[priority]}>{tagLabel[priority]}</span>

        <span className="flex items-center gap-1 bg-paper border border-border rounded-full px-2.5 py-0.5 text-xs text-ink-muted">
          <Icon name="clock" size={11} />
          {duration}
        </span>

        <span className="text-xs text-ink-muted w-20 text-right">{due}</span>
      </div>
    </div>
  )
}
