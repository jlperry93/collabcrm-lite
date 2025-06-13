import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

interface DataPoint {
  date: string
  contacted: number
}

export function SalesBarChart({ data }: { data: DataPoint[] }) {
  return (
    <BarChart width={400} height={200} data={data} style={{ marginBottom: '2rem' }}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="contacted" fill="teal" />
    </BarChart>
  )
}
