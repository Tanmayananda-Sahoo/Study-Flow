// src/components/DashboardCard.jsx
// Compact stat card used in the dashboard overview row.

export default function DashboardCard({ label, value, sub }) {
  return (
    <div className="bg-white border border-border rounded-xl p-5">
      <p className="text-2xs font-semibold text-ink-muted uppercase tracking-label mb-1.5">
        {label}
      </p>
      <p className="text-2xl font-semibold text-ink tracking-tighter leading-none">
        {value}
      </p>
      <p className="text-xs text-ink-muted mt-1">{sub}</p>
    </div>
  )
}
