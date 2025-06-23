import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { StoreProvider } from './store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser')
  worker.start()
}

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StoreProvider>
  </StrictMode>,
)
