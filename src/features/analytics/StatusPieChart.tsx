import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts'

interface StatusData {
  status: string
  count: number
}

export function StatusPieChart({ data }: { data: StatusData[] }) {
  const colors = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28']
  return (
    <PieChart width={400} height={300}>
      <Pie data={data} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={80}>
        {data.map((_, i) => (
          <Cell key={i} fill={colors[i % colors.length]} />
        ))}
      </Pie>
      <Legend />
      <Tooltip />
    </PieChart>
  )
}
