import { ContractTransaction } from '@ethersproject/contracts'
import React, { createContext, useContext, useMemo, useReducer, useState } from 'react'
interface PrivateAskProps {
  children: React.ReactNode
}

type PrivateAskTxDetails = {
  // price: number
  price: string
  buyerAddress: string
}

export const LIST: string = 'listForSale'
export const APPROVE: string = 'approveModule'
export const CREATE: string = 'createPrivateAsk'
export const SUCCESS: string = 'privateAskSuccess'
export const UPDATE: string = 'updatePrivateAsk'
export const UPDATE_SUCCESS: string = 'updatePrivateAskSuccess'
export const CANCEL: string = 'cancelPrivateAsk'
export const CANCEL_SUCCESS: string = 'cancelPrivateAskSuccess'
export const RESET: string = 'resetPrivateAsk'

export const initialState = {
  next: APPROVE,
  status: LIST,
}

interface State {
  next?: string
  status: string
}

export type PrivateAskAction =
  | { type: typeof LIST }
  | { type: typeof APPROVE }
  | { type: typeof CREATE }
  | { type: typeof SUCCESS }
  | { type: typeof UPDATE }
  | { type: typeof UPDATE_SUCCESS }
  | { type: typeof CANCEL }
  | { type: typeof CANCEL_SUCCESS }
  | { type: typeof RESET }

export function reducer(_state: State, action: PrivateAskAction): State {
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
    case UPDATE:
      return { status: UPDATE, next: UPDATE_SUCCESS }
    case CANCEL:
      return { status: CANCEL, next: CANCEL_SUCCESS }
    case CANCEL_SUCCESS:
      return { status: CANCEL_SUCCESS }
    default:
      throw new Error()
  }
}

export interface PrivateAskProviderState {
  state: State
  dispatch: React.Dispatch<PrivateAskAction>
  // finalizedPrivateAskTx?: ContractTransaction
  finalizedPrivateAskTx?: PrivateAskTxDetails
  // setFinalizedPrivateAskTx: (value: ContractTransaction) => void
  setFinalizedPrivateAskTx: (value: PrivateAskTxDetails) => void
}

export const PrivateAskContext = createContext<PrivateAskProviderState>({
  state: initialState,
  dispatch: (_action: PrivateAskAction) => {},
  finalizedPrivateAskTx: undefined,
  // setFinalizedPrivateAskTx: (_value: ContractTransaction) => {},
  setFinalizedPrivateAskTx: (_value: PrivateAskTxDetails) => {},
} as PrivateAskProviderState)

export function PrivateAskProvider({ children }: PrivateAskProps) {
  const [state, dispatch] = useReducer(reducer, initialState)
  // const [finalizedPrivateAskTx, setFinalizedPrivateAskTx] = useState<
  //   ContractTransaction | undefined
  // >(undefined)
  const [finalizedPrivateAskTx, setFinalizedPrivateAskTx] = useState<
    PrivateAskTxDetails | undefined
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
