import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from 'react'

import { useModal } from '@modal'

interface PrivateAskProps {
  children: React.ReactNode
}

type PrivateAskTxDetails = {
  price: string
  buyerAddress: string
  rawBuyerAddress: string
}

export const VIEW_PRIVATEASK_LISTING = 'viewListing'
export const APPROVE_MODULE_FOR_CREATE_PRIVATEASK = 'approveModuleForSale'
export const APPROVE_MODULE_FOR_FILL_PRIVATEASK = 'approveModuleForFill'
export const APPROVE_TRANSFER_FOR_PRIVATEASK = 'approveTransferHelper'
export const CREATE_PRIVATEASK = 'createPrivateAsk'
export const CREATE_PRIVATEASK_SUCCESS = 'createPrivateAskSuccess'
export const UPDATE_PRIVATEASK = 'updatePrivateAsk'
export const UPDATE_PRIVATEASK_SUCCESS = 'updatePrivateAskSuccess'
export const CANCEL_PRIVATEASK = 'cancelPrivateAsk'
export const CANCEL_PRIVATEASK_SUCCESS = 'cancelPrivateAskSuccess'
export const FILL_PRIVATEASK = 'fillPrivateAsk'
export const FILL_PRIVATEASK_SUCCESS = 'fillPrivateAskSuccess'
export const RESET_PRIVATEASK = 'resetPrivateAsk'

export type PossibleState =
  | typeof VIEW_PRIVATEASK_LISTING
  | typeof APPROVE_MODULE_FOR_CREATE_PRIVATEASK
  | typeof APPROVE_TRANSFER_FOR_PRIVATEASK
  | typeof CREATE_PRIVATEASK
  | typeof CREATE_PRIVATEASK_SUCCESS
  | typeof UPDATE_PRIVATEASK
  | typeof UPDATE_PRIVATEASK_SUCCESS
  | typeof CANCEL_PRIVATEASK
  | typeof CANCEL_PRIVATEASK_SUCCESS
  | typeof APPROVE_MODULE_FOR_FILL_PRIVATEASK
  | typeof FILL_PRIVATEASK
  | typeof FILL_PRIVATEASK_SUCCESS
  | typeof RESET_PRIVATEASK

export const initialState = {
  next: 'approveTransferHelper' as const,
  status: 'approveModuleForSale' as const,
}

interface State {
  next?: PossibleState
  status: PossibleState
}

export type PrivateAskAction =
  | { type: typeof VIEW_PRIVATEASK_LISTING }
  | { type: typeof APPROVE_MODULE_FOR_CREATE_PRIVATEASK }
  | { type: typeof APPROVE_TRANSFER_FOR_PRIVATEASK }
  | { type: typeof CREATE_PRIVATEASK }
  | { type: typeof CREATE_PRIVATEASK_SUCCESS }
  | { type: typeof UPDATE_PRIVATEASK }
  | { type: typeof UPDATE_PRIVATEASK_SUCCESS }
  | { type: typeof CANCEL_PRIVATEASK }
  | { type: typeof CANCEL_PRIVATEASK_SUCCESS }
  | { type: typeof APPROVE_MODULE_FOR_FILL_PRIVATEASK }
  | { type: typeof FILL_PRIVATEASK }
  | { type: typeof FILL_PRIVATEASK_SUCCESS }
  | { type: typeof RESET_PRIVATEASK }

export function privateAskStateReducer(_state: State, action: PrivateAskAction): State {
  switch (action.type) {
    case RESET_PRIVATEASK:
    case APPROVE_MODULE_FOR_CREATE_PRIVATEASK:
      return initialState
    case APPROVE_TRANSFER_FOR_PRIVATEASK:
      return { status: APPROVE_TRANSFER_FOR_PRIVATEASK, next: CREATE_PRIVATEASK }
    case CREATE_PRIVATEASK:
      return { status: CREATE_PRIVATEASK, next: CREATE_PRIVATEASK_SUCCESS }
    case CREATE_PRIVATEASK_SUCCESS:
      return { status: CREATE_PRIVATEASK_SUCCESS }
    case UPDATE_PRIVATEASK:
      return { status: UPDATE_PRIVATEASK, next: UPDATE_PRIVATEASK_SUCCESS }
    case UPDATE_PRIVATEASK_SUCCESS:
      return { status: UPDATE_PRIVATEASK_SUCCESS }
    case CANCEL_PRIVATEASK:
      return { status: CANCEL_PRIVATEASK, next: CANCEL_PRIVATEASK_SUCCESS }
    case CANCEL_PRIVATEASK_SUCCESS:
      return { status: CANCEL_PRIVATEASK_SUCCESS }
    case APPROVE_MODULE_FOR_FILL_PRIVATEASK:
      return { status: APPROVE_MODULE_FOR_FILL_PRIVATEASK, next: FILL_PRIVATEASK }
    case FILL_PRIVATEASK:
      return { status: FILL_PRIVATEASK, next: FILL_PRIVATEASK_SUCCESS }
    case FILL_PRIVATEASK_SUCCESS:
      return { status: FILL_PRIVATEASK_SUCCESS }
    case VIEW_PRIVATEASK_LISTING:
      return { status: VIEW_PRIVATEASK_LISTING }
    default:
      throw new Error()
  }
}

export interface PrivateAskProviderState {
  state: State
  dispatch: React.Dispatch<PrivateAskAction>
  finalizedPrivateAskDetails?: PrivateAskTxDetails
  setFinalizedPrivateAskDetails: (value: PrivateAskTxDetails) => void
  handleNext: () => void
}

export const PrivateAskStateContext = createContext<PrivateAskProviderState>({
  state: initialState,
  dispatch: (_action: PrivateAskAction) => {},
  finalizedPrivateAskDetails: undefined,
  setFinalizedPrivateAskDetails: (_value: PrivateAskTxDetails) => {},
  handleNext: () => {},
} as PrivateAskProviderState)

export function PrivateAskStateProvider({ children }: PrivateAskProps) {
  const [state, dispatch] = useReducer(privateAskStateReducer, initialState)
  const [finalizedPrivateAskDetails, setFinalizedPrivateAskDetails] = useState<
    PrivateAskTxDetails | undefined
  >(undefined)
  const { requestClose } = useModal()

  const next = state.next as PossibleState

  const handleNext = useCallback(() => {
    if (next) {
      if (dispatch) {
        dispatch({ type: next })
      }
    } else {
      // @BJ todo: add modal close functionality here
      requestClose()
      if (dispatch) dispatch({ type: RESET_PRIVATEASK })
    }
  }, [next, requestClose])

  const value = useMemo(
    () => ({
      state,
      handleNext,
      finalizedPrivateAskDetails,
      setFinalizedPrivateAskDetails,
    }),
    [state, handleNext, finalizedPrivateAskDetails]
  )

  return (
    <PrivateAskStateContext.Provider value={{ ...value, dispatch }}>
      {children}
    </PrivateAskStateContext.Provider>
  )
}

export const usePrivateAskStateContext = () => useContext(PrivateAskStateContext)
