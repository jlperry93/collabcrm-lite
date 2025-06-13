export function ExportButton({ summary }: { summary: string }) {
  const exportFile = () => {
    const blob = new Blob([summary], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'summary.txt'
    a.click()
    URL.revokeObjectURL(url)
  }
  if (!summary) return null
  return <button onClick={exportFile}>Export</button>
}
