import React from 'react'

import {
  APPROVE_MODULE_FOR_CREATE,
  APPROVE_MODULE_FOR_FILL,
  APPROVE_TRANSFER,
  CANCEL,
  CANCEL_SUCCESS,
  CREATE,
  CREATE_SUCCESS,
  FILLASK,
  FILLASK_SUCCESS,
  RESET,
  UPDATE,
  UPDATE_SUCCESS,
  VIEW_LISTING,
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
  [APPROVE_MODULE_FOR_CREATE]: PrivateAskApproveModule,
  [APPROVE_TRANSFER]: PrivateAskApproveTransferHelper,
  // // [APPROVE_CURRENCY]: PrivateAskApproveERC20Currency, // TODO, not used in Noun.Market but should be available for non-nouns implementations
  [CREATE]: PrivateAskCreate,
  [CREATE_SUCCESS]: PrivateAskCreateSuccess,
  [UPDATE]: PrivateAskUpdate,
  [UPDATE_SUCCESS]: PrivateAskUpdateSuccess,
  [CANCEL]: PrivateAskCancel,
  [CANCEL_SUCCESS]: PrivateAskCancelSuccess,
  [APPROVE_MODULE_FOR_FILL]: PrivateAskApproveModule,
  [FILLASK]: PrivateAskFillAsk,
  [FILLASK_SUCCESS]: PrivateAskFillAskSuccess,
  [VIEW_LISTING]: PrivateAskViewListing,
  [RESET]: () => null,
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
