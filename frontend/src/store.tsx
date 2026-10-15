import { createContext, useContext, useEffect, useMemo, useState, type Dispatch, type PropsWithChildren, type SetStateAction } from 'react'
import { initialState } from './data'
import type { AppState } from './types'

type StoreValue = { state: AppState; setState: Dispatch<SetStateAction<AppState>> }
const StoreContext = createContext<StoreValue | null>(null)
const STORAGE_KEY = 'branch-demo-state-v1'

function readState(): AppState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return initialState
    const parsed = JSON.parse(saved) as Partial<AppState> & {
      company?: Partial<AppState['company']> & { email?: string }
      buyerRequests?: Array<AppState['buyerRequests'][number] & { email?: string }>
    }
    const company = { ...initialState.company, ...parsed.company }
    delete (company as typeof company & { email?: unknown }).email
    const buyerRequests = (parsed.buyerRequests ?? []).map((request) => {
      const migrated = { ...request }
      delete (migrated as typeof migrated & { email?: unknown }).email
      return migrated
    })
    return {
      ...initialState,
      ...parsed,
      products: parsed.products ?? initialState.products,
      suppliers: parsed.suppliers ?? initialState.suppliers,
      cart: parsed.cart ?? [],
      compareIds: parsed.compareIds ?? [],
      supplierOrders: parsed.supplierOrders ?? initialState.supplierOrders,
      buyerRequests,
      company,
    }
  } catch {
    return initialState
  }
}

export function StoreProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<AppState>(readState)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const value = useMemo(() => ({ state, setState }), [state])
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useApp() {
  const value = useContext(StoreContext)
  if (!value) throw new Error('useApp must be used inside StoreProvider')
  return value
}
