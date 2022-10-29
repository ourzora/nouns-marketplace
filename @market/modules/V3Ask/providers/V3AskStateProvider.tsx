import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from 'react'

import { useModal } from '@modal'

import { AskType, PRIVATE_ASK, V3_ASK } from '../hooks/useV3AskTransaction'

interface V3AskProps {
  children: React.ReactNode
}

type V3AskTxDetails = {
  price: string
  buyerAddress?: string
  rawBuyerAddress?: string
}

export const VIEW_V3ASK_LISTING = 'viewListing'
// V3 Asks
export const APPROVE_MODULE_FOR_CREATE_V3ASK = 'approveModuleForSale'
export const APPROVE_MODULE_FOR_FILL_V3ASK = 'approveModuleForFill'
export const APPROVE_TRANSFER_FOR_V3ASK = 'approveTransferHelperForV3Ask'
export const CREATE_V3ASK = 'createV3Ask'
export const CREATE_V3ASK_SUCCESS = 'createV3AskSuccess'
export const UPDATE_V3ASK = 'updateV3Ask'
export const UPDATE_V3ASK_SUCCESS = 'updateV3AskSuccess'
export const CANCEL_V3ASK = 'cancelV3Ask'
export const CANCEL_V3ASK_SUCCESS = 'cancelV3AskSuccess'
export const FILL_V3ASK = 'fillV3Ask'
export const FILL_V3ASK_SUCCESS = 'fillV3AskSuccess'
// Private Asks
export const APPROVE_MODULE_FOR_CREATE_PRIVATEASK = 'approveModuleForPrivateSale'
export const APPROVE_MODULE_FOR_FILL_PRIVATEASK = 'approveModuleForPrivateFill'
export const APPROVE_TRANSFER_FOR_PRIVATEASK = 'approveTransferHelperForPrivateAsk'
export const CREATE_PRIVATEASK = 'createPrivateAsk'
export const CREATE_PRIVATEASK_SUCCESS = 'createPrivateAskSuccess'
export const UPDATE_PRIVATEASK = 'updatePrivateAsk'
export const UPDATE_PRIVATEASK_SUCCESS = 'updatePrivateAskSuccess'
export const CANCEL_PRIVATEASK = 'cancelPrivateAsk'
export const CANCEL_PRIVATEASK_SUCCESS = 'cancelPrivateAskSuccess'
export const FILL_PRIVATEASK = 'fillPrivateAsk'
export const FILL_PRIVATEASK_SUCCESS = 'fillPrivateAskSuccess'
export const RESET_V3ASK = 'resetV3Ask'

export type PossibleV3AskState =
  // Reset
  | typeof RESET_V3ASK
  // Universal View:
  | typeof VIEW_V3ASK_LISTING
  // V3 Ask States:
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
  // Private Ask States:
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

export const initialV3AskState = {
  status: 'approveModuleForSale' as const,
  next: 'approveTransferHelperForV3Ask' as const,
  flow: undefined,
}

interface State {
  status: PossibleV3AskState
  next?: PossibleV3AskState
  flow?: AskType
}

export type V3AskAction =
  | { type: typeof VIEW_V3ASK_LISTING }
  // NORMAL V3 ASK FLOW:
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
  // PRIVATE ASK FLOW:
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
  // RESET
  | { type: typeof RESET_V3ASK }

export function v3AskStateReducer(_state: State, action: V3AskAction): State {
  switch (action.type) {
    case RESET_V3ASK:
      return initialV3AskState

    // V3 ASK FLOW:
    case APPROVE_MODULE_FOR_CREATE_V3ASK:
      return {
        status: APPROVE_MODULE_FOR_CREATE_V3ASK,
        next: CREATE_V3ASK,
        flow: V3_ASK,
      }
    case APPROVE_TRANSFER_FOR_V3ASK:
      return {
        status: APPROVE_TRANSFER_FOR_V3ASK,
        next: CREATE_V3ASK,
        flow: V3_ASK || PRIVATE_ASK,
      }
    case CREATE_V3ASK:
      return { status: CREATE_V3ASK, next: CREATE_V3ASK_SUCCESS, flow: V3_ASK }
    case CREATE_V3ASK_SUCCESS:
      return { status: CREATE_V3ASK_SUCCESS, flow: V3_ASK }
    case UPDATE_V3ASK:
      return { status: UPDATE_V3ASK, next: UPDATE_V3ASK_SUCCESS, flow: V3_ASK }
    case UPDATE_V3ASK_SUCCESS:
      return { status: UPDATE_V3ASK_SUCCESS, flow: V3_ASK }
    case CANCEL_V3ASK:
      return { status: CANCEL_V3ASK, next: CANCEL_V3ASK_SUCCESS, flow: V3_ASK }
    case CANCEL_V3ASK_SUCCESS:
      return { status: CANCEL_V3ASK_SUCCESS, flow: V3_ASK }
    case APPROVE_MODULE_FOR_FILL_V3ASK:
      return {
        status: APPROVE_MODULE_FOR_FILL_V3ASK,
        next: FILL_V3ASK,
        flow: V3_ASK,
      }
    case FILL_V3ASK:
      return { status: FILL_V3ASK, next: FILL_V3ASK_SUCCESS, flow: V3_ASK }
    case FILL_V3ASK_SUCCESS:
      return { status: FILL_V3ASK_SUCCESS, flow: V3_ASK }

    // PRIVATE ASK FLOW:
    case APPROVE_MODULE_FOR_CREATE_PRIVATEASK:
      return {
        status: APPROVE_MODULE_FOR_CREATE_PRIVATEASK,
        next: CREATE_PRIVATEASK,
        flow: PRIVATE_ASK,
      }
    case CREATE_PRIVATEASK:
      return {
        status: CREATE_PRIVATEASK,
        next: CREATE_PRIVATEASK_SUCCESS,
        flow: PRIVATE_ASK,
      }
    case CREATE_PRIVATEASK_SUCCESS:
      return { status: CREATE_PRIVATEASK_SUCCESS, flow: PRIVATE_ASK }
    case UPDATE_PRIVATEASK:
      return {
        status: UPDATE_PRIVATEASK,
        next: UPDATE_PRIVATEASK_SUCCESS,
        flow: PRIVATE_ASK,
      }
    case UPDATE_PRIVATEASK_SUCCESS:
      return { status: UPDATE_PRIVATEASK_SUCCESS, flow: PRIVATE_ASK }
    case CANCEL_PRIVATEASK:
      return {
        status: CANCEL_PRIVATEASK,
        next: CANCEL_PRIVATEASK_SUCCESS,
        flow: PRIVATE_ASK,
      }
    case CANCEL_PRIVATEASK_SUCCESS:
      return { status: CANCEL_PRIVATEASK_SUCCESS, flow: PRIVATE_ASK }
    case APPROVE_MODULE_FOR_FILL_PRIVATEASK:
      return {
        status: APPROVE_MODULE_FOR_FILL_PRIVATEASK,
        next: FILL_PRIVATEASK,
        flow: PRIVATE_ASK,
      }
    case FILL_PRIVATEASK:
      return {
        status: FILL_PRIVATEASK,
        next: FILL_PRIVATEASK_SUCCESS,
        flow: PRIVATE_ASK,
      }
    case FILL_PRIVATEASK_SUCCESS:
      return { status: FILL_PRIVATEASK_SUCCESS, flow: PRIVATE_ASK }
    // VIEW
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
  resetState: () => void
}

export const V3AskStateContext = createContext<V3AskProviderState>({
  state: initialV3AskState,
  dispatch: (_action: V3AskAction) => {},
  finalizedV3AskDetails: undefined,
  setFinalizedV3AskDetails: (_value: V3AskTxDetails) => {},
  handleNext: () => {},
  resetState: () => {},
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
      requestClose()
      if (dispatch) dispatch({ type: RESET_V3ASK })
    }
  }, [next, requestClose])

  const resetState = useCallback(() => {
    requestClose()
    if (dispatch) dispatch({ type: RESET_V3ASK })
  }, [requestClose])

  const value = useMemo(
    () => ({
      state,
      handleNext,
      finalizedV3AskDetails,
      setFinalizedV3AskDetails,
      resetState,
    }),
    [state, handleNext, finalizedV3AskDetails, resetState]
  )

  return (
    <V3AskStateContext.Provider value={{ ...value, dispatch }}>
      {children}
    </V3AskStateContext.Provider>
  )
}

export const useV3AskStateContext = () => useContext(V3AskStateContext)
