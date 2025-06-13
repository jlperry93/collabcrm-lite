interface MessageInputProps {
  value: string
  onChange: (v: string) => void
  onSend: () => void
}

export function MessageInput({ value, onChange, onSend }: MessageInputProps) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
      <input
        style={{ flex: 1 }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSend()
        }}
      />
      <button onClick={onSend}>Send</button>
    </div>
  )
}
