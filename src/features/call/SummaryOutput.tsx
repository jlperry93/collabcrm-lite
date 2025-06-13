import type { ChangeEvent } from 'react'

export function SummaryOutput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  if (!value) return null
  return (
    <>
      <h3>Summary</h3>
      <textarea
        rows={5}
        style={{ width: '100%' }}
        value={value}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
      />
    </>
  )
}
