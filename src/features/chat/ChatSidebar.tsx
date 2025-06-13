import { ChatContact } from './ChatContact'

interface ChatSidebarProps {
  contacts: string[]
  current: string
  online: string[]
  onSelect: (name: string) => void
}

export function ChatSidebar({ contacts, current, online, onSelect }: ChatSidebarProps) {
  return (
    <aside style={{ width: 150, border: '1px solid' }}>
      <h4>Chats</h4>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {contacts.map((c) => (
          <li key={c}>
            <ChatContact
              name={c}
              online={online.includes(c)}
              selected={current === c}
              onClick={() => onSelect(c)}
            />
          </li>
        ))}
      </ul>
    </aside>
  )
}
