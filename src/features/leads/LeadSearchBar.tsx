import type { ChangeEvent } from 'react'

export function LeadSearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      placeholder="Search by name, email, company…"
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      style={{
        width: '100%',
        marginBottom: '0.5rem',
        padding: '0.5rem',
        borderRadius: '0.5rem',
        border: `1px solid var(--border)`,
        background: '#2a2a2a',
        color: 'inherit',
      }}
    />
  )
}
