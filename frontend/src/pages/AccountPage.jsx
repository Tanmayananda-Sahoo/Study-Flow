import { useEffect, useState } from 'react'
import Icon from '../components/Icon'
import { fetchUser } from '../utils/userFunctionality.js'
// Reusable labelled field row
function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-ink-muted tracking-label">{label}</label>
      {children}
    </div>
  )
}

// Section card wrapper with title
function Section({ title, description, children }) {
  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden">
      <div className="px-6 py-5 border-b border-border-soft">
        <h2 className="text-lg font-semibold text-ink tracking-tight">{title}</h2>
        {description && (
          <p className="text-xs text-ink-muted mt-0.5">{description}</p>
        )}
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  )
}

const ACADEMIC_YEARS = ['1', '2', '3', '4']
const DEPARTMENTS = [
  'Computer Science', 'Mathematics', 'Physics', 'Chemistry',
  'Biology', 'Engineering', 'English & Literature', 'Economics', 'Psychology', 'Other',
]

// Stat pill used in the profile header
function StatPill({ value, label }) {
  return (
    <div className="flex flex-col items-center px-5 py-3 bg-paper rounded-xl border border-border">
      <span className="text-xl font-semibold text-ink tracking-tighter">{value}</span>
      <span className="text-xs text-ink-muted mt-0.5">{label}</span>
    </div>
  )
}

export default function AccountPage() {
  const [focused, setFocused] = useState(null)
  const [saved,   setSaved]   = useState(false)
  const [profile, setProfile] = useState({})
  useEffect(() => {
    async function loadData() {
      const userRes = await fetchUser();
      console.log('Use effect user: ', userRes);
      setProfile(userRes.data.user);
      console.log(profile);
    }
    loadData();
  },[])
  

  const [passwords, setPasswords] = useState({
    current:  '',
    next:     '',
    confirm:  '',
  })

  const setP   = (f) => (e) => setProfile  (prev => ({ ...prev, [f]: e.target.value }))
  const setPwd = (f) => (e) => setPasswords(prev => ({ ...prev, [f]: e.target.value }))

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const inputCls = (field) =>
    `w-full px-3.5 py-2.5 rounded-lg text-md text-ink bg-white font-sans
     border outline-none transition-colors duration-150
     ${focused === field ? 'border-accent' : 'border-border'}
     placeholder:text-ink-muted placeholder:opacity-60`

  const selectCls = (field) =>
    `w-full px-3.5 py-2.5 rounded-lg text-md bg-white font-sans
     border outline-none transition-colors duration-150 cursor-pointer
     ${focused === field ? 'border-accent' : 'border-border'}
     ${profile[field] ? 'text-ink' : 'text-ink-muted'}`

  const yearLabel = profile.academicYear ? `Year ${profile.academicYear}` : ''

  const initials = 'SF';

  return (
    <div>
      {/* Page header */}
      <h1 className="text-3xl font-semibold text-ink tracking-tighter mb-0.5">Account</h1>
      <p className="text-md text-ink-muted mb-8">Manage your profile and preferences</p>

      <div className="flex flex-col gap-5 max-w-2xl">

        {/* ── Profile header card ─────────────────────────────── */}
        <div className="bg-white border border-border rounded-2xl px-6 py-6">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl bg-accent-light flex items-center justify-center text-md font-semibold text-accent shrink-0">
              {initials}
            </div>

            {/* Name / role */}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-semibold text-ink tracking-tight">{profile.name}</h2>
              <p className="text-xs text-ink-muted mt-0.5">
                Year {profile.academicYear} · {profile.department}
              </p>
              <p className="text-xs text-ink-muted mt-0.5">{profile.email}</p>
            </div>

            {/* Edit avatar button */}
            <button className="btn-ghost flex items-center gap-1.5 shrink-0">
              <Icon name="user" size={13} />
              Change photo
            </button>
          </div>

          {/* Mini stats */}
          <div className="flex gap-3 mt-5 pt-5 border-t border-border-soft">
            <StatPill value="18.5h" label="This week"   />
            <StatPill value="7"     label="Day streak"  />
            <StatPill value="84%"   label="Goal hit"    />
            <StatPill value="12"    label="Sessions"    />
          </div>
        </div>

        {/* ── Personal information ─────────────────────────────── */}
        {/* <Section title="Personal Information" description="Update your name, email and bio.">
          <div className="flex flex-col gap-4"> */}

            {/* Name + Email side by side */}
            {/* <div className="grid grid-cols-2 gap-3">
              <Field label="Full name">
                <input
                  type="text"
                  value={profile.name}
                  onChange={setP('name')}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  className={inputCls('name')}
                />
              </Field> */}
              {/* <Field label="Email address">
                <input
                  type="email"
                  value={profile.email}
                  onChange={setP('email')}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  className={inputCls('email')}
                />
              </Field> */}
            </div>

            {/* Academic Year + Department */}
            {/* <div className="grid grid-cols-2 gap-3">
              <Field label="Academic Year">
                <select
                  value={profile.academicYear}
                  onChange={setP('academicYear')}
                  onFocus={() => setFocused('academicYear')}
                  onBlur={() => setFocused(null)}
                  className={selectCls('academicYear')}
                >
                  {ACADEMIC_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </Field>
              <Field label="Department">
                <select
                  value={profile.department}
                  onChange={setP('department')}
                  onFocus={() => setFocused('department')}
                  onBlur={() => setFocused(null)}
                  className={selectCls('department')}
                >
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </Field>
            </div> */}

            {/* Bio */}
            {/* <Field label="Short bio">
              <textarea
                rows={3}
                value={profile.bio}
                onChange={setP('bio')}
                onFocus={() => setFocused('bio')}
                onBlur={() => setFocused(null)}
                placeholder="Tell us a little about yourself..."
                className={`${inputCls('bio')} resize-none leading-relaxed`}
              />
            </Field> */}

            {/* Save row */}
            {/* <div className="flex items-center gap-3 pt-1">
              <button onClick={handleSave} className="btn-primary px-6">
                Save changes
              </button>
              {saved && (
                <span className="flex items-center gap-1.5 text-xs text-green-700">
                  <Icon name="check" size={13} className="text-green-600" />
                  Saved successfully
                </span>
              )}
            </div>
          </div>
        </Section> */}

        {/* ── Change password ───────────────────────────────────── */}
        <Section title="Change Password" description="Use a strong password you don't use elsewhere.">
          <div className="flex flex-col gap-4">
            <Field label="Current password">
              <input
                type="password"
                placeholder="••••••••"
                value={passwords.current}
                onChange={setPwd('current')}
                onFocus={() => setFocused('pwd-current')}
                onBlur={() => setFocused(null)}
                className={inputCls('pwd-current')}
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="New password">
                <input
                  type="password"
                  placeholder="Min. 8 chars"
                  value={passwords.next}
                  onChange={setPwd('next')}
                  onFocus={() => setFocused('pwd-next')}
                  onBlur={() => setFocused(null)}
                  className={inputCls('pwd-next')}
                />
              </Field>
              <Field label="Confirm new password">
                <input
                  type="password"
                  placeholder="Repeat password"
                  value={passwords.confirm}
                  onChange={setPwd('confirm')}
                  onFocus={() => setFocused('pwd-confirm')}
                  onBlur={() => setFocused(null)}
                  className={inputCls('pwd-confirm')}
                />
              </Field>
            </div>

            <div className="pt-1">
              <button className="btn-primary px-6">Update password</button>
            </div>
          </div>
        </Section>

        {/* ── Preferences ───────────────────────────────────────── */}
        <Section title="Preferences" description="Customise how StudyFlow works for you.">
          <div className="flex flex-col divide-y divide-border-soft">
            {[
              { label: 'Email notifications',    sub: 'Receive study reminders via email' },
              { label: 'Smart suggestions',      sub: 'Let AI suggest optimal study sessions' },
            ].map((pref, i) => (
              <div key={i} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                <div>
                  <p className="text-md font-medium text-ink">{pref.label}</p>
                  <p className="text-xs text-ink-muted mt-0.5">{pref.sub}</p>
                </div>
                {/* Toggle pill */}
                <ToggleSwitch defaultOn={i < 2} />
              </div>
            ))}
          </div>
        </Section>

        {/* ── Danger zone ───────────────────────────────────────── */}
        <div className="bg-white border border-red-100 rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-red-100">
            <h2 className="text-lg font-semibold text-red-600 tracking-tight">Danger Zone</h2>
            <p className="text-xs text-ink-muted mt-0.5">These actions are permanent and cannot be undone.</p>
          </div>
          <div className="px-6 py-5 flex items-center justify-between">
            <div>
              <p className="text-md font-medium text-ink">Delete account</p>
              <p className="text-xs text-ink-muted mt-0.5">Permanently remove your account and all study data.</p>
            </div>
            <button
              className="
                text-xs font-medium text-red-600 border border-red-200
                bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg
                transition-colors duration-150 cursor-pointer shrink-0
              "
            >
              Delete account
            </button>
          </div>
        </div>

      </div>
    // </div>
  )
}

// Small self-contained toggle switch
function ToggleSwitch({ defaultOn = false }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <button
      onClick={() => setOn(v => !v)}
      className={`
        relative w-10 h-5 rounded-full border transition-colors duration-200 shrink-0
        ${on ? 'bg-accent border-accent' : 'bg-paper border-border'}
      `}
    >
      <span
        className={`
          absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm
          transition-transform duration-200
          ${on ? 'translate-x-5' : 'translate-x-0.5'}
        `}
      />
    </button>
  )
}
