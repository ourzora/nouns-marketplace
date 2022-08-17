import { ContractTransaction } from '@ethersproject/contracts'
import React, { createContext, useContext, useMemo, useReducer, useState } from 'react'
interface PrivateAskProps {
  children: React.ReactNode
}

export const LIST: string = 'listForSale'
export const APPROVE: string = 'approveModule'
export const CREATE: string = 'createPrivateAsk'
export const SUCCESS: string = 'privateAskSuccess'
export const RESET: string = 'resetPrivateAsk'

export const initialState = {
  next: APPROVE,
  status: LIST,
}

interface State {
  next?: string
  status: string
}

type Action =
  | { type: typeof LIST }
  | { type: typeof APPROVE }
  | { type: typeof CREATE }
  | { type: typeof SUCCESS }
  | { type: typeof RESET }

export function reducer(_state: State, action: Action): State {
  console.log('REDUCING', action.type)

  switch (action.type) {
    case RESET:
    case LIST:
      return initialState
    case APPROVE:
      return { status: APPROVE, next: CREATE }
    case CREATE:
      return { status: CREATE, next: SUCCESS }
    case SUCCESS:
      return { status: SUCCESS }
    default:
      throw new Error()
  }
}

export interface PrivateAskProviderState {
  state: State
  dispatch: React.Dispatch<Action>
  finalizedPrivateAskTx?: ContractTransaction
  setFinalizedPrivateAskTx: (value: ContractTransaction) => void
}

export const PrivateAskContext = createContext<PrivateAskProviderState>({
  state: initialState,
  dispatch: (_action: Action) => {},
  finalizedPrivateAskTx: undefined,
  setFinalizedPrivateAskTx: (_value: ContractTransaction) => {},
} as PrivateAskProviderState)

export function PrivateAskProvider({ children }: PrivateAskProps) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [finalizedPrivateAskTx, setFinalizedPrivateAskTx] = useState<
    ContractTransaction | undefined
  >(undefined)

  console.log('PrivateAskState', state)

  const value = useMemo(
    () => ({
      state,
      finalizedPrivateAskTx,
      setFinalizedPrivateAskTx,
    }),
    [finalizedPrivateAskTx, state, setFinalizedPrivateAskTx]
  )

  return (
    <PrivateAskContext.Provider value={{ ...value, dispatch }}>
      {children}
    </PrivateAskContext.Provider>
  )
}

export const usePrivateAskContext = () => useContext(PrivateAskContext)
