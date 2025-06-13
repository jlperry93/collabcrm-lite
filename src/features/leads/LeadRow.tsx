import { useStore } from '../../store'

export interface Lead {
  id: string
  name: string
  status: string
  lastContact: string
  rep: string
}

const statusColors: Record<string, string> = {
  New: 'gray',
  Contacted: 'blue',
  Qualified: 'green',
  Lost: 'red',
}

export function LeadRow({ lead }: { lead: Lead }) {
  const { selectLead } = useStore()
  return (
    <tr onClick={() => selectLead(lead.id)} style={{ cursor: 'pointer' }}>
      <td>{lead.name}</td>
      <td>
        <span style={{ color: statusColors[lead.status] || 'inherit' }}>{lead.status}</span>
      </td>
      <td>{lead.lastContact}</td>
      <td>{lead.rep}</td>
    </tr>
  )
}
