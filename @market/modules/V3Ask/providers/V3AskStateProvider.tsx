import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from 'react'

import { useModal } from '@modal'

interface V3AskProps {
  children: React.ReactNode
}

type V3AskTxDetails = {
  price: string
  buyerAddress: string
  rawBuyerAddress: string
}

export const VIEW_V3ASK_LISTING = 'viewListing'
export const APPROVE_MODULE_FOR_CREATE_V3ASK = 'approveModuleForSale'
export const APPROVE_MODULE_FOR_FILL_V3ASK = 'approveModuleForFill'
export const APPROVE_TRANSFER_FOR_V3ASK = 'approveTransferHelper'
export const CREATE_V3ASK = 'createV3Ask'
export const CREATE_V3ASK_SUCCESS = 'createV3AskSuccess'
export const UPDATE_V3ASK = 'updateV3Ask'
export const UPDATE_V3ASK_SUCCESS = 'updateV3AskSuccess'
export const CANCEL_V3ASK = 'cancelV3Ask'
export const CANCEL_V3ASK_SUCCESS = 'cancelV3AskSuccess'
export const FILL_V3ASK = 'fillV3Ask'
export const FILL_V3ASK_SUCCESS = 'fillV3AskSuccess'
export const RESET_V3ASK = 'RESET_V3ASKV3Ask'

export type PossibleV3AskState =
  | typeof VIEW_V3ASK_LISTING
  | typeof APPROVE_MODULE_FOR_CREATE_V3ASK
  | typeof APPROVE_TRANSFER_FOR_V3ASK
  | typeof CREATE_V3ASK
  | typeof CREATE_V3ASK_SUCCESS
  | typeof UPDATE_V3ASK
  | typeof UPDATE_V3ASK_SUCCESS
  | typeof CANCEL_V3ASK
  | typeof CANCEL_V3ASK_SUCCESS
  | typeof APPROVE_MODULE_FOR_FILL_V3ASK
  | typeof FILL_V3ASK
  | typeof FILL_V3ASK_SUCCESS
  | typeof RESET_V3ASK

export const initialV3AskState = {
  next: 'approveTransferHelper' as const,
  status: 'approveModuleForSale' as const,
}

interface State {
  next?: PossibleV3AskState
  status: PossibleV3AskState
}

export type V3AskAction =
  | { type: typeof VIEW_V3ASK_LISTING }
  | { type: typeof APPROVE_MODULE_FOR_CREATE_V3ASK }
  | { type: typeof APPROVE_TRANSFER_FOR_V3ASK }
  | { type: typeof CREATE_V3ASK }
  | { type: typeof CREATE_V3ASK_SUCCESS }
  | { type: typeof UPDATE_V3ASK }
  | { type: typeof UPDATE_V3ASK_SUCCESS }
  | { type: typeof CANCEL_V3ASK }
  | { type: typeof CANCEL_V3ASK_SUCCESS }
  | { type: typeof APPROVE_MODULE_FOR_FILL_V3ASK }
  | { type: typeof FILL_V3ASK }
  | { type: typeof FILL_V3ASK_SUCCESS }
  | { type: typeof RESET_V3ASK }

export function v3AskStateReducer(_state: State, action: V3AskAction): State {
  switch (action.type) {
    case RESET_V3ASK:
    case APPROVE_MODULE_FOR_CREATE_V3ASK:
      return initialV3AskState
    case APPROVE_TRANSFER_FOR_V3ASK:
      return { status: APPROVE_TRANSFER_FOR_V3ASK, next: CREATE_V3ASK }
    case CREATE_V3ASK:
      return { status: CREATE_V3ASK, next: CREATE_V3ASK_SUCCESS }
    case CREATE_V3ASK_SUCCESS:
      return { status: CREATE_V3ASK_SUCCESS }
    case UPDATE_V3ASK:
      return { status: UPDATE_V3ASK, next: UPDATE_V3ASK_SUCCESS }
    case UPDATE_V3ASK_SUCCESS:
      return { status: UPDATE_V3ASK_SUCCESS }
    case CANCEL_V3ASK:
      return { status: CANCEL_V3ASK, next: CANCEL_V3ASK_SUCCESS }
    case CANCEL_V3ASK_SUCCESS:
      return { status: CANCEL_V3ASK_SUCCESS }
    case APPROVE_MODULE_FOR_FILL_V3ASK:
      return { status: APPROVE_MODULE_FOR_FILL_V3ASK, next: FILL_V3ASK }
    case FILL_V3ASK:
      return { status: FILL_V3ASK, next: FILL_V3ASK_SUCCESS }
    case FILL_V3ASK_SUCCESS:
      return { status: FILL_V3ASK_SUCCESS }
    case VIEW_V3ASK_LISTING:
      return { status: VIEW_V3ASK_LISTING }
    default:
      throw new Error()
  }
}

export interface V3AskProviderState {
  state: State
  dispatch: React.Dispatch<V3AskAction>
  finalizedV3AskDetails?: V3AskTxDetails
  setFinalizedV3AskDetails: (value: V3AskTxDetails) => void
  handleNext: () => void
}

export const V3AskStateContext = createContext<V3AskProviderState>({
  state: initialV3AskState,
  dispatch: (_action: V3AskAction) => {},
  finalizedV3AskDetails: undefined,
  setFinalizedV3AskDetails: (_value: V3AskTxDetails) => {},
  handleNext: () => {},
} as V3AskProviderState)

export function V3AskStateProvider({ children }: V3AskProps) {
  const [state, dispatch] = useReducer(v3AskStateReducer, initialV3AskState)
  const [finalizedV3AskDetails, setFinalizedV3AskDetails] = useState<
    V3AskTxDetails | undefined
  >(undefined)
  const { requestClose } = useModal()

  const next = state.next as PossibleV3AskState

  const handleNext = useCallback(() => {
    if (next) {
      if (dispatch) {
        dispatch({ type: next })
      }
    } else {
      // @BJ todo: add modal close functionality here
      requestClose()
      if (dispatch) dispatch({ type: RESET_V3ASK })
    }
  }, [next, requestClose])

  const value = useMemo(
    () => ({
      state,
      handleNext,
      finalizedV3AskDetails,
      setFinalizedV3AskDetails,
    }),
    [state, handleNext, finalizedV3AskDetails]
  )

  return (
    <V3AskStateContext.Provider value={{ ...value, dispatch }}>
      {children}
    </V3AskStateContext.Provider>
  )
}

export const useV3AskStateContext = () => useContext(V3AskStateContext)
