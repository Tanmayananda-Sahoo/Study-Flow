// src/pages/LoginPage.jsx

import { useState } from 'react'
import Icon from '../components/Icon'
import { login } from '../utils/userFunctionality.js'

export default function LoginPage({ onLogin, onGoSignup }) {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [focused,  setFocused]  = useState(null)

  const handleSubmit = async() => {
    const userData = {
      email,
      password
    }

    await login(userData);
    onLogin();
  }

  const inputCls = (field) =>
    `w-full px-3.5 py-2.5 rounded-lg text-md text-ink bg-white font-sans
     border outline-none transition-colors duration-150
     ${focused === field ? 'border-accent' : 'border-border'}
     placeholder:text-ink-muted placeholder:opacity-60`

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center px-4">

      {/* Brand mark */}
      <div className="mb-8 text-center">
        <div className="w-11 h-11 bg-accent rounded-xl flex items-center justify-center mx-auto mb-3">
          <Icon name="book" size={20} className="text-white" />
        </div>
        <h1 className="text-2xl font-semibold text-ink tracking-tighter">StudyFlow</h1>
        <p className="text-xs text-ink-muted mt-1">Your intelligent study companion</p>
      </div>

      {/* Card */}
      <div className="bg-white border border-border rounded-3xl p-8 w-full max-w-sm shadow-login">

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-ink tracking-tight">Welcome back</h2>
          <p className="text-xs text-ink-muted mt-1">Sign in to continue learning</p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-ink-muted mb-1.5 tracking-label">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@university.edu"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
              className={inputCls('email')}
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between mb-1.5">
              <label className="text-xs font-medium text-ink-muted tracking-label">Password</label>
              <span className="text-xs text-accent cursor-pointer hover:underline">Forgot password?</span>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={() => setFocused('password')}
              onBlur={() => setFocused(null)}
              className={inputCls('password')}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="btn-primary w-full text-center py-2.5 mt-1"
          >
            Sign in
          </button>
        </div>

        <p className="mt-5 text-center text-xs text-ink-muted">
          Don&apos;t have an account?{' '}
          <span onClick={onGoSignup} className="text-accent font-medium cursor-pointer hover:underline">Create one</span>
        </p>
      </div>

      <p className="mt-6 text-xs text-ink-muted">© 2025 StudyFlow. All rights reserved.</p>
    </div>
  )
}
