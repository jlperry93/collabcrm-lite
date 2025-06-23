import { useMemo, useState } from 'react'
import { analyticsData } from './data'
import { SalesBarChart } from './SalesBarChart'
import { StatusPieChart } from './StatusPieChart'
import { DateRangeFilter } from './DateRangeFilter'
import './AnalyticsDashboard.css'

export function AnalyticsDashboard() {
  const [range, setRange] = useState({ start: '', end: '' })

  const filtered = useMemo(() => {
    const start = range.start ? new Date(range.start) : undefined
    const end = range.end ? new Date(range.end) : undefined
    return analyticsData.filter((d) => {
      const date = new Date(d.date)
      if (start && date < start) return false
      if (end && date > end) return false
      return true
    })
  }, [range])

  const barData = useMemo(
    () => filtered.map((d) => ({ date: d.date.slice(5), contacted: d.contacted })),
    [filtered],
  )

  const pieData = useMemo(() => {
    const totals: Record<string, number> = {}
    filtered.forEach((d) => {
      Object.entries(d.statuses).forEach(([status, count]) => {
        totals[status] = (totals[status] ?? 0) + count
      })
    })
    return Object.entries(totals).map(([status, count]) => ({ status, count }))
  }, [filtered])

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Analytics Dashboard</h1>
        <p>Track activity by date and lead status.</p>
        <DateRangeFilter
          start={range.start}
          end={range.end}
          onChange={setRange}
        />
      </div>
      <div className="charts">
        <section className="chart-section">
          <h3>Daily Leads Contacted</h3>
          <SalesBarChart data={barData} />
        </section>
        <section className="chart-section">
          <h3>Lead Status Distribution</h3>
          <StatusPieChart data={pieData} />
        </section>
      </div>
    </div>
  )
}
