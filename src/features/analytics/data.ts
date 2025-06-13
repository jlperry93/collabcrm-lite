export interface DailyAnalytics {
  date: string
  contacted: number
  statuses: Record<string, number>
}

export const analyticsData: DailyAnalytics[] = [
  { date: '2024-05-01', contacted: 2, statuses: { New: 1, Contacted: 1 } },
  { date: '2024-05-02', contacted: 5, statuses: { New: 2, Contacted: 2, Closed: 1 } },
  { date: '2024-05-03', contacted: 3, statuses: { New: 1, Contacted: 1, Closed: 1 } },
  { date: '2024-05-04', contacted: 4, statuses: { New: 1, Contacted: 3 } },
  { date: '2024-05-05', contacted: 1, statuses: { Closed: 1 } },
  { date: '2024-05-06', contacted: 6, statuses: { New: 2, Contacted: 2, Closed: 2 } },
  { date: '2024-05-07', contacted: 2, statuses: { Contacted: 1, Closed: 1 } },
]
