// src/pages/SignupPage.jsx

import { useState } from 'react'
import Icon from '../components/Icon'

const ROLES = ['Student', 'Teaching Assistant', 'Lecturer', 'Researcher']

const DEPARTMENTS = [
  'Computer Science',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Engineering',
  'English & Literature',
  'Economics',
  'Psychology',
  'Other',
]

export default function SignupPage({ onSignup, onGoLogin }) {
  const [focused, setFocused] = useState(null)
  const [form, setForm] = useState({
    name:            '',
    email:           '',
    password:        '',
    confirmPassword: '',
    role:            '',
    department:      '',
  })
  const [errors, setErrors] = useState({})

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  // Very light client-side validation
  const validate = () => {
    const errs = {}
    if (!form.name.trim())            errs.name            = 'Full name is required'
    if (!form.email.includes('@'))    errs.email           = 'Enter a valid email'
    if (form.password.length < 8)     errs.password        = 'At least 8 characters'
    if (form.password !== form.confirmPassword)
                                      errs.confirmPassword = 'Passwords do not match'
    if (!form.role)                   errs.role            = 'Select a role'
    if (!form.department)             errs.department      = 'Select a department'
    return errs
  }

  const handleSubmit = () => {
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    onSignup(form)
  }

  // Shared input class builder
  const inputCls = (field) =>
    `w-full px-3.5 py-2.5 rounded-lg text-md text-ink bg-white font-sans
     border outline-none transition-colors duration-150
     ${focused === field ? 'border-accent' : errors[field] ? 'border-red-300' : 'border-border'}
     placeholder:text-ink-muted placeholder:opacity-60`

  const selectCls = (field) =>
    `w-full px-3.5 py-2.5 rounded-lg text-md bg-white font-sans
     border outline-none transition-colors duration-150 cursor-pointer
     ${focused === field ? 'border-accent' : errors[field] ? 'border-red-300' : 'border-border'}
     ${form[field] ? 'text-ink' : 'text-ink-muted'}`

  const FieldError = ({ field }) =>
    errors[field]
      ? <p className="text-xs text-red-500 mt-1">{errors[field]}</p>
      : null

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center px-4 py-12">

      {/* Brand mark */}
      <div className="mb-7 text-center">
        <div className="w-11 h-11 bg-accent rounded-xl flex items-center justify-center mx-auto mb-3">
          <Icon name="book" size={20} className="text-white" />
        </div>
        <h1 className="text-2xl font-semibold text-ink tracking-tighter">StudyFlow</h1>
        <p className="text-xs text-ink-muted mt-1">Your intelligent study companion</p>
      </div>

      {/* Card — wider than login to breathe with 6 fields */}
      <div className="bg-white border border-border rounded-3xl p-8 w-full max-w-md shadow-login">

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-ink tracking-tight">Create your account</h2>
          <p className="text-xs text-ink-muted mt-1">Join StudyFlow and start studying smarter</p>
        </div>

        <div className="flex flex-col gap-4">

          {/* Full name */}
          <div>
            <label className="block text-xs font-medium text-ink-muted mb-1.5 tracking-label">
              Full name
            </label>
            <input
              type="text"
              placeholder="Alex Chen"
              value={form.name}
              onChange={set('name')}
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused(null)}
              className={inputCls('name')}
            />
            <FieldError field="name" />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-ink-muted mb-1.5 tracking-label">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@university.edu"
              value={form.email}
              onChange={set('email')}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
              className={inputCls('email')}
            />
            <FieldError field="email" />
          </div>

          {/* Password + Confirm — side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-ink-muted mb-1.5 tracking-label">
                Password
              </label>
              <input
                type="password"
                placeholder="Min. 8 chars"
                value={form.password}
                onChange={set('password')}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused(null)}
                className={inputCls('password')}
              />
              <FieldError field="password" />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-muted mb-1.5 tracking-label">
                Confirm password
              </label>
              <input
                type="password"
                placeholder="Repeat password"
                value={form.confirmPassword}
                onChange={set('confirmPassword')}
                onFocus={() => setFocused('confirmPassword')}
                onBlur={() => setFocused(null)}
                className={inputCls('confirmPassword')}
              />
              <FieldError field="confirmPassword" />
            </div>
          </div>

          {/* Role + Department — side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-ink-muted mb-1.5 tracking-label">
                Role
              </label>
              <select
                value={form.role}
                onChange={set('role')}
                onFocus={() => setFocused('role')}
                onBlur={() => setFocused(null)}
                className={selectCls('role')}
              >
                <option value="" disabled>Select role</option>
                {ROLES.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <FieldError field="role" />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-muted mb-1.5 tracking-label">
                Department
              </label>
              <select
                value={form.department}
                onChange={set('department')}
                onFocus={() => setFocused('department')}
                onBlur={() => setFocused(null)}
                className={selectCls('department')}
              >
                <option value="" disabled>Select dept.</option>
                {DEPARTMENTS.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <FieldError field="department" />
            </div>
          </div>

          {/* Terms note */}
          <p className="text-xs text-ink-muted leading-relaxed">
            By creating an account you agree to our{' '}
            <span className="text-accent cursor-pointer hover:underline">Terms of Service</span>
            {' '}and{' '}
            <span className="text-accent cursor-pointer hover:underline">Privacy Policy</span>.
          </p>

          <button
            onClick={handleSubmit}
            className="btn-primary w-full text-center py-2.5"
          >
            Create account
          </button>
        </div>

        <p className="mt-5 text-center text-xs text-ink-muted">
          Already have an account?{' '}
          <span
            onClick={onGoLogin}
            className="text-accent font-medium cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </p>
      </div>

      <p className="mt-6 text-xs text-ink-muted">© 2025 StudyFlow. All rights reserved.</p>
    </div>
  )
}
