interface Props {
  start: string
  end: string
  onChange: (range: { start: string; end: string }) => void
}

export function DateRangeFilter({ start, end, onChange }: Props) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
      <label>
        From:
        <input
          type="date"
          value={start}
          onChange={(e) => onChange({ start: e.target.value, end })}
        />
      </label>
      <label>
        To:
        <input
          type="date"
          value={end}
          onChange={(e) => onChange({ start, end: e.target.value })}
        />
      </label>
    </div>
  )
}
