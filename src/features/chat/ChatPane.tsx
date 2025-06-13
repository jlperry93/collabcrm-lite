import { MessageBubble } from './MessageBubble'

interface Message {
  id: string
  from: string
  text: string
}

export function ChatPane({ messages }: { messages: Message[] }) {
  return (
    <div style={{ height: 200, overflowY: 'auto', border: '1px solid', padding: '0.5rem' }}>
      {messages.map((m) => (
        <MessageBubble key={m.id} message={m} />
      ))}
    </div>
  )
}
