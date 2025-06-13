interface FilterProps {
  statuses: string[]
  reps: string[]
  status: string
  rep: string
  onStatusChange: (s: string) => void
  onRepChange: (r: string) => void
}

export function LeadFilters({ statuses, reps, status, rep, onStatusChange, onRepChange }: FilterProps) {
  return (
    <div className="lead-filters">
      <label>
        <span role="img" aria-label="status">⬇️</span>
        <select value={status} onChange={(e) => onStatusChange(e.target.value)}>
          <option value="">All</option>
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <label>
        <span role="img" aria-label="rep">⬇️</span>
        <select value={rep} onChange={(e) => onRepChange(e.target.value)}>
          <option value="">All</option>
          {reps.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </label>
    </div>
  )
}
