import { useEffect, useState } from 'react'
import { useStore } from '../../store'
import type { Lead } from './LeadRow'

export function LeadDetailPage() {
  const { selectedLeadId, selectLead } = useStore()
  const [lead, setLead] = useState<Lead | null>(null)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (!selectedLeadId) return
    fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: 'query GetLead($id: ID!) { lead(id: $id) { id name status lastContact rep } }', variables: { id: selectedLeadId } }),
    })
      .then((r) => r.json())
      .then((r) => setLead(r.data.lead))
  }, [selectedLeadId])

  if (!lead) return null

  const updateStatus = (status: string) => {
    setUpdating(true)
    fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: 'mutation UpdateLeadStatus($id: ID!, $status: String!) { updateLeadStatus(id: $id, status: $status) { id status } }', variables: { id: lead.id, status } }),
    })
      .then((r) => r.json())
      .then((r) => setLead({ ...lead, status: r.data.updateLeadStatus.status }))
      .finally(() => setUpdating(false))
  }

  return (
    <div>
      <button onClick={() => selectLead(undefined)}>Back</button>
      <h3>{lead.name}</h3>
      <p>Rep: {lead.rep}</p>
      <p>Last Contact: {lead.lastContact}</p>
      <label>
        Status:
        <select value={lead.status} disabled={updating} onChange={(e) => updateStatus(e.target.value)}>
          {['New', 'Contacted', 'Qualified', 'Lost'].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
    </div>
  )
}
