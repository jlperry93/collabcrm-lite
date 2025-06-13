import type { ChangeEvent } from 'react'

export function TranscriptInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <textarea
      rows={5}
      style={{ width: '100%' }}
      value={value}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
    />
  )
}
