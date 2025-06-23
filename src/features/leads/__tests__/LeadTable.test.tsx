import { render, screen, fireEvent, within } from '@testing-library/react'
import { beforeEach, afterEach, vi, it, expect } from 'vitest'
import { LeadTable } from '../LeadTable'
import { StoreProvider, useStore } from '../../../store'

const leads = [
  { id: '1', name: 'Acme Corp', status: 'Contacted', lastContact: '2024-05-10', rep: 'Alice' },
  { id: '2', name: 'Globex', status: 'New', lastContact: '2024-05-09', rep: 'Bob' },
  { id: '3', name: 'Soylent', status: 'Qualified', lastContact: '2024-05-05', rep: 'Alice' },
  { id: '4', name: 'Initech', status: 'Lost', lastContact: '2024-04-20', rep: 'Bob' },
]

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var fetch: any
}

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ data: { leads } }),
    }),
  ))
})

afterEach(() => {
  vi.restoreAllMocks()
})

function renderWithStore(ui: React.ReactElement) {
  return render(<StoreProvider>{ui}</StoreProvider>)
}

it('filters leads by status', async () => {
  renderWithStore(<LeadTable />)

  await screen.findByText('Acme Corp')

  const statusSelect = screen.getAllByRole('combobox')[0]
  fireEvent.change(statusSelect, { target: { value: 'New' } })

  expect(screen.getByText('Globex')).toBeInTheDocument()
  expect(screen.queryByText('Acme Corp')).toBeNull()
})

it('sorts leads by name when header clicked', async () => {
  renderWithStore(<LeadTable />)

  await screen.findByText('Acme Corp')

  const nameHeader = screen.getByText('Name')
  fireEvent.click(nameHeader)

  const rows = screen.getAllByRole('row')
  const firstRow = within(rows[1]).getByText(/.*/)
  expect(firstRow.textContent).toBe('Soylent')
})

function SelectedDisplay() {
  const { selectedLeadId } = useStore()
  return <div data-testid="selected">{selectedLeadId}</div>
}

it('selects a lead when a row is clicked', async () => {
  render(
    <StoreProvider>
      <SelectedDisplay />
      <LeadTable />
    </StoreProvider>,
  )

  await screen.findByText('Acme Corp')

  fireEvent.click(screen.getByText('Acme Corp'))

  expect(screen.getByTestId('selected').textContent).toBe('1')
})
