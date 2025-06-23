interface Props {
  start: string
  end: string
  onChange: (range: { start: string; end: string }) => void
}

export function DateRangeFilter({ start, end, onChange }: Props) {
  return (
    <div className="date-range">
      <label>
        <span>From:</span>
        <input
          type="date"
          value={start}
          onChange={(e) => onChange({ start: e.target.value, end })}
        />
      </label>
      <label>
        <span>To:</span>
        <input
          type="date"
          value={end}
          onChange={(e) => onChange({ start, end: e.target.value })}
        />
      </label>
    </div>
  )
}
