import React from 'react'
import { TypeSafeMarket } from 'validators/market'

import {
  APPROVE_MODULE_FOR_CREATE_PRIVATEASK,
  APPROVE_MODULE_FOR_CREATE_V3ASK,
  APPROVE_MODULE_FOR_FILL_PRIVATEASK,
  APPROVE_MODULE_FOR_FILL_V3ASK,
  APPROVE_TRANSFER_FOR_PRIVATEASK,
  APPROVE_TRANSFER_FOR_V3ASK,
  CANCEL_PRIVATEASK,
  CANCEL_PRIVATEASK_SUCCESS,
  CANCEL_V3ASK,
  CANCEL_V3ASK_SUCCESS,
  CREATE_PRIVATEASK,
  CREATE_PRIVATEASK_SUCCESS,
  CREATE_V3ASK,
  CREATE_V3ASK_SUCCESS,
  FILL_PRIVATEASK,
  FILL_PRIVATEASK_SUCCESS,
  FILL_V3ASK,
  FILL_V3ASK_SUCCESS,
  RESET_V3ASK,
  UPDATE_PRIVATEASK,
  UPDATE_PRIVATEASK_SUCCESS,
  UPDATE_V3ASK,
  UPDATE_V3ASK_SUCCESS,
  VIEW_V3ASK_LISTING,
  useV3AskStateContext,
} from '@market/modules/V3Ask/providers/V3AskStateProvider'
import { useNftMarketContext } from '@market/providers/NftMarketContextProvider'
import { Stack, StackProps } from '@zoralabs/zord'

import { PrivateAskApproveModule } from './PrivateAskApproveModule'
import { V3AskApproveModule } from './V3AskApproveModule'
import { V3AskApproveTransferHelper } from './V3AskApproveTransferHelper'
import { V3AskCancel } from './cancel/V3AskCancel'
import { V3AskCancelSuccess } from './cancel/V3AskCancelSuccess'
import { PrivateAskCreate } from './create/PrivateAskCreate'
import { V3AskCreate } from './create/V3AskCreate'
import { V3AskCreateSuccess } from './create/V3AskCreateSuccess'
import { V3AskFillAsk } from './fill/V3AskFillAsk'
import { V3AskFillAskSuccess } from './fill/V3AskFillAskSuccess'
import { PrivateAskUpdate } from './update/PrivateAskUpdate'
import { V3AskUpdate } from './update/V3AskUpdate'
import { V3AskUpdateSuccess } from './update/V3AskUpdateSuccess'
import { V3AskViewListing } from './view'

const componentMap = {
  [APPROVE_MODULE_FOR_CREATE_V3ASK]: V3AskApproveModule,
  [APPROVE_TRANSFER_FOR_V3ASK]: V3AskApproveTransferHelper,

  // [APPROVE_CURRENCY]: V3AskApproveERC20Currency, // TODO, not used in Noun.Market but should be available for non-nouns implementations
  [CREATE_V3ASK]: V3AskCreate,
  [CREATE_V3ASK_SUCCESS]: V3AskCreateSuccess,
  [UPDATE_V3ASK]: V3AskUpdate,
  [UPDATE_V3ASK_SUCCESS]: V3AskUpdateSuccess,
  [CANCEL_V3ASK]: V3AskCancel,
  [CANCEL_V3ASK_SUCCESS]: V3AskCancelSuccess,
  [APPROVE_MODULE_FOR_FILL_V3ASK]: V3AskApproveModule,
  [FILL_V3ASK]: V3AskFillAsk,
  [FILL_V3ASK_SUCCESS]: V3AskFillAskSuccess,

  // PRIVATE ASKS:
  [APPROVE_MODULE_FOR_CREATE_PRIVATEASK]: PrivateAskApproveModule,
  [APPROVE_TRANSFER_FOR_PRIVATEASK]: V3AskApproveTransferHelper,
  [CREATE_PRIVATEASK]: PrivateAskCreate,
  [CREATE_PRIVATEASK_SUCCESS]: V3AskCreateSuccess,
  [UPDATE_PRIVATEASK]: PrivateAskUpdate,
  [UPDATE_PRIVATEASK_SUCCESS]: V3AskUpdateSuccess,
  [CANCEL_PRIVATEASK]: V3AskCancel,
  [CANCEL_PRIVATEASK_SUCCESS]: V3AskCancelSuccess,
  [APPROVE_MODULE_FOR_FILL_PRIVATEASK]: PrivateAskApproveModule,
  [FILL_PRIVATEASK]: V3AskFillAsk,
  [FILL_PRIVATEASK_SUCCESS]: V3AskFillAskSuccess,

  [VIEW_V3ASK_LISTING]: V3AskViewListing,
  [RESET_V3ASK]: () => null,
}

export interface CommonV3AskComponentProps extends StackProps {
  onNext?: () => void
  tokenId: string
  contractAddress: string
  collectionName: string
  markets: TypeSafeMarket[]
}

export function V3AskFlow() {
  const { markets, tokenId, collectionAddress, collectionName } = useNftMarketContext()
  const { state, handleNext } = useV3AskStateContext()
  const Component = componentMap[state.status]

  return (
    <Stack justify="center">
      <Component
        key={state.status}
        onNext={handleNext}
        tokenId={tokenId}
        contractAddress={collectionAddress}
        collectionName={collectionName}
        markets={markets}
      />
    </Stack>
  )
}
