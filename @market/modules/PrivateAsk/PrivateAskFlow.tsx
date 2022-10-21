import React from 'react'

import {
  APPROVE_MODULE_FOR_CREATE_PRIVATEASK,
  APPROVE_MODULE_FOR_FILL_PRIVATEASK,
  APPROVE_TRANSFER_FOR_PRIVATEASK,
  CANCEL_PRIVATEASK,
  CANCEL_PRIVATEASK_SUCCESS,
  CREATE_PRIVATEASK,
  CREATE_PRIVATEASK_SUCCESS,
  FILL_PRIVATEASK,
  FILL_PRIVATEASK_SUCCESS,
  RESET_PRIVATEASK,
  UPDATE_PRIVATEASK,
  UPDATE_PRIVATEASK_SUCCESS,
  VIEW_PRIVATEASK_LISTING,
  usePrivateAskStateContext,
} from '@market/modules/PrivateAsk/providers/PrivateAskStateProvider'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Stack, StackProps } from '@zoralabs/zord'

import { PrivateAskApproveModule } from './PrivateAskApproveModule'
import { PrivateAskApproveTransferHelper } from './PrivateAskApproveTransferHelper'
import { PrivateAskCancel } from './cancel/PrivateAskCancel'
import { PrivateAskCancelSuccess } from './cancel/PrivateAskCancelSuccess'
import { PrivateAskCreate } from './create/PrivateAskCreate'
import { PrivateAskCreateSuccess } from './create/PrivateAskCreateSuccess'
import { PrivateAskFillAsk } from './fill/PrivateAskFillAsk'
import { PrivateAskFillAskSuccess } from './fill/PrivateAskFillAskSuccess'
import { PrivateAskUpdate } from './update/PrivateAskUpdate'
import { PrivateAskUpdateSuccess } from './update/PrivateAskUpdateSuccess'
import { PrivateAskViewListing } from './view'

const componentMap = {
  [APPROVE_MODULE_FOR_CREATE_PRIVATEASK]: PrivateAskApproveModule,
  [APPROVE_TRANSFER_FOR_PRIVATEASK]: PrivateAskApproveTransferHelper,
  // // [APPROVE_CURRENCY]: PrivateAskApproveERC20Currency, // TODO, not used in Noun.Market but should be available for non-nouns implementations
  [CREATE_PRIVATEASK]: PrivateAskCreate,
  [CREATE_PRIVATEASK_SUCCESS]: PrivateAskCreateSuccess,
  [UPDATE_PRIVATEASK]: PrivateAskUpdate,
  [UPDATE_PRIVATEASK_SUCCESS]: PrivateAskUpdateSuccess,
  [CANCEL_PRIVATEASK]: PrivateAskCancel,
  [CANCEL_PRIVATEASK_SUCCESS]: PrivateAskCancelSuccess,
  [APPROVE_MODULE_FOR_FILL_PRIVATEASK]: PrivateAskApproveModule,
  [FILL_PRIVATEASK]: PrivateAskFillAsk,
  [FILL_PRIVATEASK_SUCCESS]: PrivateAskFillAskSuccess,
  [VIEW_PRIVATEASK_LISTING]: PrivateAskViewListing,
  [RESET_PRIVATEASK]: () => null,
}

interface PrivateAskModalProps {
  nft: NFTObject
}

export interface CommonPrivateAskComponentProps extends StackProps {
  nft: NFTObject
  onNext?: () => void
}

export function PrivateAskFlow({ nft }: PrivateAskModalProps) {
  const { state, handleNext } = usePrivateAskStateContext()
  const Component = componentMap[state.status]

  return (
    <Stack justify="center">
      <Component key={state.status} nft={nft} onNext={handleNext} />
    </Stack>
  )
}
