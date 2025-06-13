import { useEffect, useMemo, useState } from 'react'
import { useStore } from '../../store'

interface Lead {
  id: string
  name: string
  status: string
}

export function LeadList() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [statusFilter, setStatusFilter] = useState('All')
  const { selectLead } = useStore()

  useEffect(() => {
    fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: 'query GetLeads { leads { id name status } }' }),
    })
      .then((res) => res.json())
      .then((res) => setLeads(res.data.leads))
  }, [])

  const statuses = useMemo(
    () => Array.from(new Set(leads.map((l) => l.status))),
    [leads],
  )
  const filtered =
    statusFilter === 'All'
      ? leads
      : leads.filter((l) => l.status === statusFilter)

  return (
    <div>
      <h2>Leads</h2>
      <label>
        Status:
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <table style={{ width: '100%', marginTop: '0.5rem' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td>{lead.status}</td>
              <td>
                <button onClick={() => selectLead(lead.id)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
