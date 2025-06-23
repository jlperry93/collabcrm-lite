import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface StatusData {
  status: string
  count: number
}

export function StatusPieChart({ data }: { data: StatusData[] }) {
  const colorMap: Record<string, string> = {
    New: '#007bff',
    Contacted: '#fd7e14',
    Closed: '#28a745',
  }
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={80}>
          {data.map((d, i) => (
            <Cell key={i} fill={colorMap[d.status] ?? '#8884d8'} />
          ))}
        </Pie>
        <Legend layout="vertical" align="right" verticalAlign="middle" />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}
