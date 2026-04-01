// src/pages/TasksPage.jsx

import { useState } from 'react'
import TaskCard from '../components/TaskCard'
import Icon from '../components/Icon'

const ALL_TASKS = [
  { name: 'Calculus Problem Set 4',       subject: 'Mathematics',       priority: 'high', duration: '90 min',  due: 'Tomorrow',   done: false },
  { name: 'Lab Report: Esterification',   subject: 'Organic Chemistry', priority: 'high', duration: '120 min', due: 'Tomorrow',   done: false },
  { name: 'Read Chapter 9–11',            subject: 'English Literature',priority: 'med',  duration: '60 min',  due: 'In 3 days',  done: false },
  { name: 'Statistics Assignment 3',      subject: 'Statistics',        priority: 'med',  duration: '45 min',  due: 'In 4 days',  done: true  },
  { name: 'Physics Midterm Review',       subject: 'Physics',           priority: 'high', duration: '150 min', due: 'In 5 days',  done: false },
  { name: 'Data Science Project Proposal',subject: 'Data Science',      priority: 'low',  duration: '60 min',  due: 'In 1 week',  done: false },
  { name: 'Essay: Romanticism',           subject: 'English Literature',priority: 'med',  duration: '90 min',  due: 'In 1 week',  done: true  },
]

const FILTERS = [
  { id: 'all',     label: 'All tasks'      },
  { id: 'pending', label: 'Pending'        },
  { id: 'high',    label: 'High priority'  },
  { id: 'done',    label: 'Completed'      },
]

const TasksPage = () => {
  const [filter, setFilter] = useState('all')

  const filtered = ALL_TASKS.filter(t => {
    if (filter === 'pending') return !t.done
    if (filter === 'done')    return  t.done
    if (filter === 'high')    return  t.priority === 'high' && !t.done
    return true
  })

  const pendingCount   = ALL_TASKS.filter(t => !t.done).length
  const completedCount = ALL_TASKS.filter(t =>  t.done).length

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-0.5">
        <h1 className="text-3xl font-semibold text-ink tracking-tighter">Study Tasks</h1>
        <button className="btn-primary flex items-center gap-1.5">
          <Icon name="plus" size={14} className="text-white" />
          Add Task
        </button>
      </div>
      <p className="text-md text-ink-muted mb-6">
        {pendingCount} pending · {completedCount} completed
      </p>

      {/* Filter pills */}
      <div className="flex gap-2 mb-6">
        {FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`
              px-3.5 py-1.5 rounded-full text-xs font-medium
              border transition-all duration-150 cursor-pointer
              ${filter === f.id
                ? 'bg-accent-light text-accent border-accent-mid'
                : 'bg-white text-ink-muted border-border hover:bg-paper hover:text-ink'}
            `}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Task list */}
      <div className="flex flex-col gap-2">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-ink-muted text-md">
            No tasks match this filter.
          </div>
        ) : (
          filtered.map(task => <TaskCard key={task.name} task={task} />)
        )}
      </div>
    </div>
  )
}

export default TasksPage