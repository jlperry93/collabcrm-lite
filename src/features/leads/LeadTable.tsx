import { useMemo, useState } from 'react'
import { LeadRow, type Lead } from './LeadRow'
import { LeadSearchBar } from './LeadSearchBar'
import { LeadFilters } from './LeadFilters'
import './LeadTable.css'
import { useStore } from '../../store'
import { useGetLeadsQuery } from '../../graphql/generated'
import { client } from '../../graphql/client'

interface Sort { key: keyof Lead; dir: 'asc' | 'desc' }

export function LeadTable() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [rep, setRep] = useState('')
  const [sort, setSort] = useState<Sort>({ key: 'name', dir: 'asc' })
  const { selectLead } = useStore()

  useGetLeadsQuery(client, undefined, {
    onSuccess: (data) => setLeads(data.leads),
  })

  const statuses = useMemo(() => Array.from(new Set(leads.map((l) => l.status))), [leads])
  const reps = useMemo(() => Array.from(new Set(leads.map((l) => l.rep))), [leads])

  const filtered = leads
    .filter((l) => (status ? l.status === status : true))
    .filter((l) => (rep ? l.rep === rep : true))
    .filter((l) => l.name.toLowerCase().includes(search.toLowerCase()))

  const sorted = [...filtered].sort((a, b) => {
    const v1 = a[sort.key]
    const v2 = b[sort.key]
    if (v1 < v2) return sort.dir === 'asc' ? -1 : 1
    if (v1 > v2) return sort.dir === 'asc' ? 1 : -1
    return 0
  })

  const toggleSort = (key: keyof Lead) => {
    setSort((s) => ({ key, dir: s.key === key && s.dir === 'asc' ? 'desc' : 'asc' }))
  }

  const LeadCard = ({ lead }: { lead: Lead }) => (
    <div className="lead-card">
      <div><strong>{lead.name}</strong></div>
      <div>
        Status:{' '}
        <span style={{ color: lead.status === 'Contacted' ? 'blue' : lead.status === 'Qualified' ? 'green' : lead.status === 'Lost' ? 'red' : 'gray' }}>
          {lead.status}
        </span>
      </div>
      <div>Last Contact: {lead.lastContact}</div>
      <div>Rep: {lead.rep}</div>
      <button onClick={() => selectLead(lead.id)}>View Details</button>
    </div>
  )

  return (
    <div className="leads-container">
      <h1 style={{ fontSize: '32px', margin: 0 }}>Leads</h1>
      <LeadSearchBar value={search} onChange={setSearch} />
      <LeadFilters
        statuses={statuses}
        reps={reps}
        status={status}
        rep={rep}
        onStatusChange={setStatus}
        onRepChange={setRep}
      />

      <table className="lead-table">
        <thead>
          <tr>
            <th onClick={() => toggleSort('name')}>Name {sort.key === 'name' ? (sort.dir === 'asc' ? '🔼' : '🔽') : ''}</th>
            <th onClick={() => toggleSort('status')}>Status {sort.key === 'status' ? (sort.dir === 'asc' ? '🔼' : '🔽') : ''}</th>
            <th onClick={() => toggleSort('lastContact')}>Last Contact {sort.key === 'lastContact' ? (sort.dir === 'asc' ? '🔼' : '🔽') : ''}</th>
            <th onClick={() => toggleSort('rep')}>Rep {sort.key === 'rep' ? (sort.dir === 'asc' ? '🔼' : '🔽') : ''}</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((lead) => (
            <LeadRow key={lead.id} lead={lead} />
          ))}
        </tbody>
      </table>

      {sorted.length === 0 && <p style={{ padding: '1rem' }}>🛈 No leads found. Adjust filters or search.</p>}

      <div className="lead-cards">
        {sorted.map((lead) => (
          <LeadCard key={lead.id} lead={lead} />
        ))}
        {sorted.length === 0 && <p>🛈 No leads found. Adjust filters or search.</p>}
      </div>
    </div>
  )
}
