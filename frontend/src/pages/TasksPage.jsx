// src/pages/TasksPage.jsx

import { useState } from 'react'
import TaskCard from '../components/TaskCard'
import Icon from '../components/Icon'

const INITIAL_TASKS = [
  { id: 1, name: 'Calculus Problem Set 4',        subject: 'Mathematics',        priority: 'high', duration: '90 min',  due: 'Tomorrow',   done: false },
  { id: 2, name: 'Lab Report: Esterification',    subject: 'Organic Chemistry',  priority: 'high', duration: '120 min', due: 'Tomorrow',   done: false },
  { id: 3, name: 'Read Chapter 9–11',             subject: 'English Literature', priority: 'med',  duration: '60 min',  due: 'In 3 days',  done: false },
  { id: 4, name: 'Statistics Assignment 3',       subject: 'Statistics',         priority: 'med',  duration: '45 min',  due: 'In 4 days',  done: true  },
  { id: 5, name: 'Physics Midterm Review',        subject: 'Physics',            priority: 'high', duration: '150 min', due: 'In 5 days',  done: false },
  { id: 6, name: 'Data Science Project Proposal', subject: 'Data Science',       priority: 'low',  duration: '60 min',  due: 'In 1 week',  done: false },
  { id: 7, name: 'Essay: Romanticism',            subject: 'English Literature', priority: 'med',  duration: '90 min',  due: 'In 1 week',  done: true  },
]

const FILTERS = [
  { id: 'all',     label: 'All tasks'     },
  { id: 'pending', label: 'Pending'       },
  { id: 'high',    label: 'High priority' },
  { id: 'done',    label: 'Completed'     },
]

const PRIORITIES = ['high', 'med', 'low']

const EMPTY_FORM = { title: '', start: '', end: '', subject: '', deadline: '' }

export default function TasksPage() {
  const [tasks,     setTasks]     = useState(INITIAL_TASKS)
  const [filter,    setFilter]    = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [form,      setForm]      = useState(EMPTY_FORM)
  const [priority,  setPriority]  = useState('med')
  const [errors,    setErrors]    = useState({})
  const [focused,   setFocused]   = useState(null)

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const inputCls = (field) =>
    `w-full px-3.5 py-2.5 rounded-lg text-md text-ink bg-white font-sans
     border outline-none transition-colors duration-150
     ${focused === field ? 'border-accent' : errors[field] ? 'border-red-300' : 'border-border'}
     placeholder:text-ink-muted placeholder:opacity-60`

  const validate = () => {
    const e = {}
    if (!form.title.trim())   e.title   = 'Title is required'
    if (!form.start.trim())   e.start   = 'Start time required'
    if (!form.end.trim())     e.end     = 'End time required'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (!form.deadline || isNaN(Number(form.deadline)) || Number(form.deadline) <= 0)
      e.deadline = 'Enter a positive number'
    return e
  }

  const handleAdd = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }

    const newTask = {
      id:       Date.now(),
      name:     form.title,
      subject:  form.subject,
      priority,
      duration: `${form.start} – ${form.end}`,
      due:      `${form.deadline}h deadline`,
      done:     false,
    }
    setTasks(prev => [newTask, ...prev])
    setForm(EMPTY_FORM)
    setPriority('med')
    setErrors({})
    setShowModal(false)
  }

  const closeModal = () => { setShowModal(false); setErrors({}) }

  const filtered = tasks.filter(t => {
    if (filter === 'pending') return !t.done
    if (filter === 'done')    return  t.done
    if (filter === 'high')    return  t.priority === 'high' && !t.done
    return true
  })

  const pendingCount   = tasks.filter(t => !t.done).length
  const completedCount = tasks.filter(t =>  t.done).length

  return (
    <>
      {/* ── Backdrop blur overlay ─────────────────────────── */}
      {showModal && (
        <div
          className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-sm"
          onClick={closeModal}
        />
      )}

      {/* ── Add Task Modal ────────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 pointer-events-none">
          <div
            className="bg-white border border-border rounded-2xl shadow-login w-full max-w-md pointer-events-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border-soft">
              <div>
                <h2 className="text-lg font-semibold text-ink tracking-tight">New Study Task</h2>
                <p className="text-xs text-ink-muted mt-0.5">Fill in the details below to add a task</p>
              </div>
              <button
                onClick={closeModal}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-ink-muted hover:bg-paper hover:text-ink transition-colors duration-150"
              >
                ✕
              </button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5 flex flex-col gap-4">

              {/* Title */}
              <div>
                <label className="block text-xs font-medium text-ink-muted mb-1.5 tracking-label">Task title</label>
                <input
                  type="text"
                  placeholder="e.g. Calculus Problem Set 5"
                  value={form.title}
                  onChange={set('title')}
                  onFocus={() => setFocused('title')}
                  onBlur={() => setFocused(null)}
                  className={inputCls('title')}
                />
                {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
              </div>

              {/* Start + End side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-ink-muted mb-1.5 tracking-label">Start time</label>
                  <input
                    type="time"
                    value={form.start}
                    onChange={set('start')}
                    onFocus={() => setFocused('start')}
                    onBlur={() => setFocused(null)}
                    className={inputCls('start')}
                  />
                  {errors.start && <p className="text-xs text-red-500 mt-1">{errors.start}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-muted mb-1.5 tracking-label">End time</label>
                  <input
                    type="time"
                    value={form.end}
                    onChange={set('end')}
                    onFocus={() => setFocused('end')}
                    onBlur={() => setFocused(null)}
                    className={inputCls('end')}
                  />
                  {errors.end && <p className="text-xs text-red-500 mt-1">{errors.end}</p>}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-medium text-ink-muted mb-1.5 tracking-label">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Mathematics"
                  value={form.subject}
                  onChange={set('subject')}
                  onFocus={() => setFocused('subject')}
                  onBlur={() => setFocused(null)}
                  className={inputCls('subject')}
                />
                {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
              </div>

              {/* Deadline */}
              <div>
                <label className="block text-xs font-medium text-ink-muted mb-1.5 tracking-label">Deadline</label>
                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 48  (hours from now)"
                  value={form.deadline}
                  onChange={set('deadline')}
                  onFocus={() => setFocused('deadline')}
                  onBlur={() => setFocused(null)}
                  className={inputCls('deadline')}
                />
                {errors.deadline
                  ? <p className="text-xs text-red-500 mt-1">{errors.deadline}</p>
                  : <p className="text-xs text-ink-muted mt-1">Enter number of hours until deadline</p>
                }
              </div>

              {/* Priority selector */}
              <div>
                <label className="block text-xs font-medium text-ink-muted mb-2 tracking-label">Priority</label>
                <div className="flex gap-2">
                  {PRIORITIES.map(p => (
                    <button
                      key={p}
                      onClick={() => setPriority(p)}
                      className={`
                        flex-1 py-2 rounded-lg text-xs font-medium border
                        transition-all duration-150 cursor-pointer capitalize
                        ${priority === p
                          ? p === 'high'
                            ? 'bg-orange-50 border-orange-200 text-orange-700'
                            : p === 'med'
                            ? 'bg-accent-light border-accent-mid text-accent'
                            : 'bg-green-50 border-green-200 text-green-700'
                          : 'bg-paper border-border text-ink-muted hover:border-accent-mid'}
                      `}
                    >
                      {p === 'med' ? 'Medium' : p === 'high' ? 'High' : 'Low'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex gap-3 px-6 py-4 border-t border-border-soft">
              <button onClick={closeModal} className="btn-ghost flex-1">Cancel</button>
              <button onClick={handleAdd}  className="btn-primary flex-1">Add Task</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Page content ──────────────────────────────────── */}
      <div>
        {/* Header */}
        <div className="flex items-start justify-between mb-0.5">
          <h1 className="text-3xl font-semibold text-ink tracking-tighter">Study Tasks</h1>
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center gap-1.5"
          >
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
            filtered.map(task => <TaskCard key={task.id} task={task} />)
          )}
        </div>
      </div>
    </>
  )
}
