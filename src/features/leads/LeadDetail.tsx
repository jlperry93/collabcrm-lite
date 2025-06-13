import { useStore } from '../../store'
import { useEffect } from 'react'

export function LeadDetail() {
  const { selectedLeadId, selectLead } = useStore()
  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') selectLead()
    }
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [])

  if (!selectedLeadId) return <p>Select a lead</p>
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ background: '#fff', padding: '1rem', minWidth: 200 }}>
        <h3>Lead {selectedLeadId}</h3>
        <p>Details for lead {selectedLeadId}</p>
        <button onClick={() => selectLead()}>Close</button>
      </div>
    </div>
  )
}
