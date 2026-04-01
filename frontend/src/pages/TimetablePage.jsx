// src/pages/TimetablePage.jsx

import TimetableGrid from '../components/TimetableGrid'

const TimetablePage = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-ink tracking-tighter mb-0.5">Timetable</h1>
      <p className="text-md text-ink-muted mb-8">Spring Semester 2026 · Week 12</p>
      <TimetableGrid />
    </div>
  )
}

export default TimetablePage;