// src/components/HoverCard.jsx
// Wrapper that applies card base styles + hover lift via Tailwind.

export default function HoverCard({ children, className = '' }) {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  )
}
