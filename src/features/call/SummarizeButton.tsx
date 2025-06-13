export function SummarizeButton({ loading, onClick }: { loading: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} disabled={loading}>
      {loading ? 'Summarizing...' : 'Summarize'}
    </button>
  )
}
