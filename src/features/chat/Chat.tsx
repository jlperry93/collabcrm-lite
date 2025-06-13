import { useEffect, useState } from 'react'
import { ChatSidebar } from './ChatSidebar'
import { ChatPane } from './ChatPane'
import { MessageInput } from './MessageInput'

interface Message {
  id: string
  from: string
  text: string
  createdAt: string
  contact: string
}

const contacts = ['Alice', 'Bob', 'Charlie', 'Dana', 'Eve']

export function Chat() {
  const [current, setCurrent] = useState(contacts[0])
  const [conversations, setConversations] = useState<Record<string, Message[]>>(
    () => Object.fromEntries(contacts.map((c) => [c, []])),
  )
  const [input, setInput] = useState('')
  const [online, setOnline] = useState<string[]>([])

  // random online contacts
  useEffect(() => {
    const pick = () => {
      const shuffled = [...contacts].sort(() => Math.random() - 0.5)
      setOnline(shuffled.slice(0, 3))
    }
    pick()
    const id = setInterval(pick, 5000)
    return () => clearInterval(id)
  }, [])

  // simulated incoming messages
  useEffect(() => {
    let timeout: NodeJS.Timeout
    const schedule = () => {
      const delay = 5000 + Math.random() * 5000
      timeout = setTimeout(() => {
        const msg: Message = {
          id: Date.now().toString(),
          from: current,
          text: `Auto message from ${current}`,
          createdAt: new Date().toISOString(),
          contact: current,
        }
        setConversations((c) => ({
          ...c,
          [current]: [...c[current], msg],
        }))
        schedule()
      }, delay)
    }
    schedule()
    return () => clearTimeout(timeout)
  }, [current])

  const send = () => {
    if (!input) return
    const msg: Message = {
      id: Date.now().toString(),
      from: 'You',
      text: input,
      createdAt: new Date().toISOString(),
      contact: current,
    }
    setConversations((c) => ({
      ...c,
      [current]: [...c[current], msg],
    }))
    setInput('')
  }

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <ChatSidebar
        contacts={contacts}
        current={current}
        online={online}
        onSelect={setCurrent}
      />
      <div style={{ flex: 1 }}>
        <h2>Chat - {current}</h2>
        <ChatPane messages={conversations[current]} />
        <MessageInput value={input} onChange={setInput} onSend={send} />
      </div>
    </div>
  )
}
