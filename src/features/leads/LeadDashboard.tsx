import { useStore } from '../../store'
import { LeadTable } from './LeadTable'
import { LeadDetailPage } from './LeadDetailPage'

export function LeadDashboard() {
  const { selectedLeadId } = useStore()
  return selectedLeadId ? <LeadDetailPage /> : <LeadTable />
}
