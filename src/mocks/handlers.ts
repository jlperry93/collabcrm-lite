import { graphql, http, HttpResponse } from 'msw'

interface Lead {
  id: string
  name: string
  status: string
  lastContact: string
  rep: string
}

const leads: Lead[] = [
  {
    id: '1',
    name: 'Acme Corp',
    status: 'Contacted',
    lastContact: '2024-05-10',
    rep: 'Alice',
  },
  {
    id: '2',
    name: 'Globex',
    status: 'New',
    lastContact: '2024-05-09',
    rep: 'Bob',
  },
  {
    id: '3',
    name: 'Soylent',
    status: 'Qualified',
    lastContact: '2024-05-05',
    rep: 'Alice',
  },
  {
    id: '4',
    name: 'Initech',
    status: 'Lost',
    lastContact: '2024-04-20',
    rep: 'Bob',
  },
]

let messages = [
  { id: '1', user: 'Alice', text: 'Hello!', createdAt: new Date().toISOString() },
]

export const handlers = [
  graphql.query('GetLeads', () => {
    return HttpResponse.json({ leads })
  }),
  graphql.query('GetLead', ({ variables }) => {
    const { id } = variables as { id: string }
    const lead = leads.find((l) => l.id === id)
    return HttpResponse.json({ lead })
  }),
  graphql.mutation('UpdateLeadStatus', ({ variables }) => {
    const { id, status } = variables as { id: string; status: string }
    const lead = leads.find((l) => l.id === id)
    if (lead) lead.status = status
    return HttpResponse.json({ lead })
  }),
  http.get('/api/messages', () => {
    return HttpResponse.json(messages)
  }),
  http.post('/api/messages', async ({ request }) => {
    const { text } = await request.json()
    const msg = {
      id: String(messages.length + 1),
      user: 'You',
      text,
      createdAt: new Date().toISOString(),
    }
    messages = [...messages, msg]
    return HttpResponse.json({}, { status: 201 })
  }),
  http.post('/api/summarize', async ({ request }) => {
    const { transcript } = await request.json()
    return HttpResponse.json({ summary: transcript.slice(0, 50) + '...' })
  }),
  http.get('/api/analytics', () => {
    const data = [
      { label: 'Jan', value: 5 },
      { label: 'Feb', value: 8 },
      { label: 'Mar', value: 3 },
    ]
    return HttpResponse.json({ data })
  }),
]
