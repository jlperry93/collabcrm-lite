interface Message {
  id: string
  from: string
  text: string
}

export function MessageBubble({ message }: { message: Message }) {
  const isMe = message.from === 'You'
  return (
    <div style={{ textAlign: isMe ? 'right' : 'left', margin: '0.25rem 0' }}>
      <div
        style={{
          display: 'inline-block',
          background: isMe ? '#3e3e3e' : '#2a2a2a',
          color: '#fff',
          padding: '0.25rem 0.5rem',
          borderRadius: 4,
        }}
      >
        {!isMe && <strong>{message.from}: </strong>}
        {message.text}
      </div>
    </div>
  )
}
