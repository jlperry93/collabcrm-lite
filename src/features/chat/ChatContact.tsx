import type { MouseEventHandler } from 'react'

interface ChatContactProps {
  name: string
  online: boolean
  selected: boolean
  onClick: MouseEventHandler<HTMLDivElement>
}

export function ChatContact({
  name,
  online,
  selected,
  onClick,
}: ChatContactProps) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '0.25rem 0.5rem',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        background: selected ? '#444' : undefined,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: online ? 'limegreen' : 'gray',
          marginRight: '0.5rem',
        }}
      />
      <span>{name}</span>
    </div>
  )
}
