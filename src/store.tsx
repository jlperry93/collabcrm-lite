import { createContext, useContext, useState, type ReactNode } from 'react'

export type Route = 'leads' | 'chat' | 'call' | 'analytics' | 'components'

interface Store {
  route: Route
  navigate: (r: Route) => void
  selectedLeadId?: string
  selectLead: (id?: string) => void
}

const StoreContext = createContext<Store | undefined>(undefined)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>('leads')
  const [selectedLeadId, setSelectedLeadId] = useState<string | undefined>()

  return (
    <StoreContext.Provider
      value={{
        route,
        navigate: setRoute,
        selectedLeadId,
        selectLead: setSelectedLeadId,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('StoreProvider missing')
  return ctx
}
