import { useState } from 'react'
import { useStore } from '../../store'
import type { Lead } from './LeadRow'
import { useGetLeadQuery, useUpdateLeadStatusMutation } from '../../graphql/generated'
import { client } from '../../graphql/client'

export function LeadDetailPage() {
  const { selectedLeadId, selectLead } = useStore()
  const [lead, setLead] = useState<Lead | null>(null)
  const [updating, setUpdating] = useState(false)

  useGetLeadQuery(client, { id: selectedLeadId! }, {
    enabled: !!selectedLeadId,
    onSuccess: (data) => setLead(data.lead ?? null),
  })

  const updateLeadStatusMutation = useUpdateLeadStatusMutation(client, {
    onSuccess: (data) => {
      if (data.updateLeadStatus) {
        setLead((l) => l && { ...l, status: data.updateLeadStatus.status })
      }
    },
    onSettled: () => setUpdating(false),
  })

  if (!lead) return null

  const updateStatus = (status: string) => {
    setUpdating(true)
    updateLeadStatusMutation.mutate({ id: lead!.id, status })
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
