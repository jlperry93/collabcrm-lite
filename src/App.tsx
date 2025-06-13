import './App.css'
import { useStore } from './store'
import { LeadDashboard } from './features/leads/LeadDashboard'
import { Chat } from './features/chat/Chat'
import { CallSummary } from './features/call/CallSummary'
import { Analytics } from './features/analytics/Analytics'

export default function App() {
  const { route, navigate } = useStore()

  return (
    <div className="app">
      <nav>
        {(
          [
            { id: 'leads', label: 'Leads', icon: '📋' },
            { id: 'chat', label: 'Chat', icon: '💬' },
            { id: 'call', label: 'Call', icon: '📞' },
            { id: 'analytics', label: 'Analytics', icon: '📊' },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            className={route === t.id ? 'active' : undefined}
            onClick={() => navigate(t.id as any)}
          >
            <span>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </nav>
      <main>
        {route === 'leads' && <LeadDashboard />}
        {route === 'chat' && <Chat />}
        {route === 'call' && <CallSummary />}
        {route === 'analytics' && <Analytics />}
      </main>
    </div>
  )
}
