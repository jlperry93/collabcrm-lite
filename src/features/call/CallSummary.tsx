import { useState } from 'react'
import { TranscriptInput } from './TranscriptInput'
import { SummarizeButton } from './SummarizeButton'
import { SummaryOutput } from './SummaryOutput'
import { ExportButton } from './ExportButton'

export function CallSummary() {
  const [transcript, setTranscript] = useState('')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState('')

  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => setToast(''), 3000)
  }

  const summarize = async () => {
    setLoading(true)
    setSummary('')
    try {
      await new Promise((r) => setTimeout(r, 1000))
      if (Math.random() < 0.2) throw new Error('mock')
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript }),
      })
      const data = await res.json()
      setSummary(data.summary)
    } catch {
      showToast('Failed to summarize. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>AI Call Summary (Simulated)</h2>
      <TranscriptInput value={transcript} onChange={setTranscript} />
      <SummarizeButton loading={loading} onClick={summarize} />
      <SummaryOutput value={summary} onChange={setSummary} />
      <ExportButton summary={summary} />
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: 10,
            right: 10,
            background: '#333',
            color: '#fff',
            padding: '0.5rem 1rem',
          }}
        >
          {toast}
        </div>
      )}
    </div>
  )
}
