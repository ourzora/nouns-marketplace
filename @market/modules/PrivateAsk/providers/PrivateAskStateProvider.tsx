import React, { createContext, useContext, useMemo, useReducer, useState } from 'react'
interface PrivateAskProps {
  children: React.ReactNode
}

type PrivateAskTxDetails = {
  price: string
  buyerAddress: string
  rawBuyerAddress: string
}

export const LIST: string = 'listForSale'
export const APPROVE_MODULE_FOR_CREATE: string = 'approveModuleForSale'
export const APPROVE_MODULE_FOR_FILL: string = 'approveModuleForFill'
export const APPROVE_TRANSFER: string = 'approveTransferHelper'
export const CREATE: string = 'createPrivateAsk'
export const CREATE_SUCCESS: string = 'privateAskCreateSuccess'
export const CANCEL: string = 'cancelPrivateAsk'
export const CANCEL_SUCCESS: string = 'cancelPrivateAskSuccess'
export const FILLASK: string = 'fillPrivateAsk'
export const FILLASK_SUCCESS: string = 'fillPrivateAskSuccess'
export const RESET: string = 'resetPrivateAsk'

export const initialState = {
  next: APPROVE_MODULE_FOR_CREATE,
  status: LIST,
}

interface State {
  next?: string
  status: string
}

export type PrivateAskAction =
  | { type: typeof LIST }
  | { type: typeof APPROVE_MODULE_FOR_CREATE }
  | { type: typeof APPROVE_TRANSFER }
  | { type: typeof CREATE }
  | { type: typeof CREATE_SUCCESS }
  | { type: typeof CANCEL }
  | { type: typeof CANCEL_SUCCESS }
  | { type: typeof APPROVE_MODULE_FOR_FILL }
  | { type: typeof FILLASK }
  | { type: typeof FILLASK_SUCCESS }
  | { type: typeof RESET }

export function reducer(_state: State, action: PrivateAskAction): State {
  switch (action.type) {
    case RESET:
    case LIST:
      return initialState
    case APPROVE_MODULE_FOR_CREATE:
      return { status: APPROVE_MODULE_FOR_CREATE, next: APPROVE_TRANSFER }
    case APPROVE_TRANSFER:
      return { status: APPROVE_TRANSFER, next: CREATE }
    case CREATE:
      return { status: CREATE, next: CREATE_SUCCESS }
    case CREATE_SUCCESS:
      return { status: CREATE_SUCCESS }
    case CANCEL:
      return { status: CANCEL, next: CANCEL_SUCCESS }
    case CANCEL_SUCCESS:
      return { status: CANCEL_SUCCESS }
    case APPROVE_MODULE_FOR_FILL:
      return { status: APPROVE_MODULE_FOR_FILL, next: FILLASK }
    case FILLASK:
      return { status: FILLASK, next: FILLASK_SUCCESS }
    case FILLASK_SUCCESS:
      return { status: FILLASK_SUCCESS }
    default:
      throw new Error()
  }
}

export interface PrivateAskProviderState {
  state: State
  dispatch: React.Dispatch<PrivateAskAction>
  finalizedPrivateAskDetails?: PrivateAskTxDetails
  setFinalizedPrivateAskDetails: (value: PrivateAskTxDetails) => void
}

export const PrivateAskStateContext = createContext<PrivateAskProviderState>({
  state: initialState,
  dispatch: (_action: PrivateAskAction) => {},
  finalizedPrivateAskDetails: undefined,
  setFinalizedPrivateAskDetails: (_value: PrivateAskTxDetails) => {},
} as PrivateAskProviderState)

export function PrivateAskStateProvider({ children }: PrivateAskProps) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [finalizedPrivateAskDetails, setFinalizedPrivateAskDetails] = useState<
    PrivateAskTxDetails | undefined
  >(undefined)

  const value = useMemo(
    () => ({
      state,
      finalizedPrivateAskDetails,
      setFinalizedPrivateAskDetails,
    }),
    [finalizedPrivateAskDetails, state, setFinalizedPrivateAskDetails]
  )

  return (
    <PrivateAskStateContext.Provider value={{ ...value, dispatch }}>
      {children}
    </PrivateAskStateContext.Provider>
  )
}

export const usePrivateAskStateContext = () => useContext(PrivateAskStateContext)
