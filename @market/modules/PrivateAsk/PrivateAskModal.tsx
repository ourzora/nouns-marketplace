import React, { useCallback } from 'react'
import clsx from 'clsx'
import {
  PrivateAskStateProvider,
  // APPROVE_MODULE_FOR_FILL,
  // APPROVE_MODULE_FOR_CREATE,
  // APPROVE_TRANSFER,
  // CREATE,
  // CREATE_SUCCESS,
  // UPDATE,
  // UPDATE_SUCCESS,
  // LIST,
  // RESET,
  // CANCEL,
  // CANCEL_SUCCESS,
  // FILLASK,
  // FILLASK_SUCCESS,
  usePrivateAskStateContext,
} from '@market/modules/PrivateAsk/providers/PrivateAskStateProvider'
// import { PrivateAskApproveModule } from './PrivateAskApproveModule'
// import { PrivateAskApproveTransferHelper } from './PrivateAskApproveTransferHelper'
// import { PrivateAskCreate } from './create/PrivateAskCreate'
// import { PrivateAskCreateSuccess } from './create/PrivateAskCreateSuccess'
// import { PrivateAskUpdate } from './update/PrivateAskUpdate'
// import { PrivateAskUpdateSuccess } from './update/PrivateAskUpdateSuccess'
// import { PrivateAskCancel } from './cancel/PrivateAskCancel'
// import { PrivateAskCancelSuccess } from './cancel/PrivateAskCancelSuccess'
// import { PrivateAskFillAsk } from './fill/PrivateAskFillAsk'
// import { PrivateAskFillAskSuccess } from './fill/PrivateAskFillAskSuccess'
// import { PrivateAskListForSale } from './PrivateAskListForSale'
import { PrivateAskTrigger } from './PrivateAskTrigger'
// import { useToggle } from '@shared/hooks/useToggle'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Modal, ModalContent, StackProps } from '@zoralabs/zord'
// import { AnimatePresence } from 'framer-motion'

import * as styles from './PrivateAskModal.css'
import { PrivateAskFlow } from './PrivateAskFlow'
import { useModal } from '@modal'

// const componentMap = {
//   [LIST]: PrivateAskListForSale,
//   [APPROVE_MODULE_FOR_CREATE]: PrivateAskApproveModule,
//   [APPROVE_TRANSFER]: PrivateAskApproveTransferHelper,
//   // [APPROVE_CURRENCY]: PrivateAskApproveERC20Currency, // TODO
//   [CREATE]: PrivateAskCreate,
//   [CREATE_SUCCESS]: PrivateAskCreateSuccess,
//   [UPDATE]: PrivateAskUpdate,
//   [UPDATE_SUCCESS]: PrivateAskUpdateSuccess,
//   [CANCEL]: PrivateAskCancel,
//   [CANCEL_SUCCESS]: PrivateAskCancelSuccess,
//   [APPROVE_MODULE_FOR_FILL]: PrivateAskApproveModule,
//   [FILLASK]: PrivateAskFillAsk,
//   [FILLASK_SUCCESS]: PrivateAskFillAskSuccess,
// }

interface PrivateAskModalProps {
  header: React.ReactNode
  nft: NFTObject
  modalName: string
  // open?: boolean
}

export interface CommonPrivateAskComponentProps extends StackProps {
  nft: NFTObject
  onNext?: () => void
  handleClose?: () => void
}

export function PrivateAskModal({
  header,
  nft,
  modalName,
}: // open
PrivateAskModalProps) {
  const { modalType, requestClose, requestOpen } = useModal()
  const modalHandler = useCallback(() => {
    console.log('MODAL HANDLER!')
    requestOpen(modalName)
  }, [modalName, requestOpen])
  return (
    <Modal
      open={modalType === modalName}
      onOpenChange={requestClose}
      trigger={<PrivateAskTrigger nft={nft} openModal={modalHandler} />}
    >
      <ModalContent className={clsx(styles.content, styles.modalBackground)}>
        <PrivateAskFlow header={header} nft={nft} />
      </ModalContent>
    </Modal>
  )
}
