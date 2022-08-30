import React, { useCallback } from 'react'
import clsx from 'clsx'
import {
  APPROVE_MODULE_FOR_FILL,
  APPROVE_MODULE_FOR_CREATE,
  APPROVE_TRANSFER,
  CREATE,
  CREATE_SUCCESS,
  UPDATE,
  UPDATE_SUCCESS,
  LIST,
  RESET,
  CANCEL,
  CANCEL_SUCCESS,
  FILLASK,
  FILLASK_SUCCESS,
  usePrivateAskStateContext,
} from './providers/'
import { PrivateAskApproveModule } from './PrivateAskApproveModule'
import { PrivateAskApproveTransferHelper } from './PrivateAskApproveTransferHelper'
import { PrivateAskCreate, PrivateAskCreateSuccess } from './create/'
// import { PrivateAskCreateSuccess } from './create/PrivateAskCreateSuccess'
import { PrivateAskUpdate, PrivateAskUpdateSuccess } from './update/'
// import { PrivateAskUpdateSuccess } from './update/'
import { PrivateAskCancel, PrivateAskCancelSuccess } from './cancel/'
// import { PrivateAskCancelSuccess } from './cancel/PrivateAskCancelSuccess'
import { PrivateAskFillAsk, PrivateAskFillAskSuccess } from './fill/'
// import { PrivateAskFillAskSuccess } from './fill/PrivateAskFillAskSuccess'
import { PrivateAskListForSale } from './PrivateAskListForSale'
import { PrivateAskTrigger } from './PrivateAskTrigger'
import { useToggle } from '@shared/hooks'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Flex, Modal, ModalContent, Stack, StackProps } from '@zoralabs/zord'
// import { AnimatePresence } from 'framer-motion'

import * as styles from './PrivateAskModal.css'

const componentMap = {
  [LIST]: PrivateAskListForSale,
  [APPROVE_MODULE_FOR_CREATE]: PrivateAskApproveModule,
  [APPROVE_TRANSFER]: PrivateAskApproveTransferHelper,
  [CREATE]: PrivateAskCreate,
  [CREATE_SUCCESS]: PrivateAskCreateSuccess,
  [UPDATE]: PrivateAskUpdate,
  [UPDATE_SUCCESS]: PrivateAskUpdateSuccess,
  [CANCEL]: PrivateAskCancel,
  [CANCEL_SUCCESS]: PrivateAskCancelSuccess,
  [APPROVE_MODULE_FOR_FILL]: PrivateAskApproveModule,
  [FILLASK]: PrivateAskFillAsk,
  [FILLASK_SUCCESS]: PrivateAskFillAskSuccess,
}

interface PrivateAskModalProps {
  header: React.ReactNode
  nft: NFTObject
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
}: // open
PrivateAskModalProps) {
  const [isOpen, toggleModalOpen] = useToggle()
  const { state, dispatch } = usePrivateAskStateContext()

  const Component = componentMap[state.status]
  const next = state.next as string | undefined

  const handleNext = useCallback(() => {
    if (next) {
      if (dispatch) {
        dispatch({ type: next })
      }
    } else {
      toggleModalOpen(false)
      if (dispatch) dispatch({ type: RESET })
    }
  }, [dispatch, next, toggleModalOpen])

  const handleClose = useCallback(() => toggleModalOpen(), [toggleModalOpen])

  return (
    <Modal
      open={isOpen}
      onOpenChange={toggleModalOpen}
      trigger={
        <PrivateAskTrigger nft={nft} openModal={toggleModalOpen} dispatch={dispatch} />
      }
    >
      <ModalContent className={clsx(styles.content, styles.modalBackground)}>
        <Stack justify="center">
          <Flex justify="center" mb="x4" mt="x1" width="100%">
            {header}
          </Flex>

          {/* <AnimatePresence exitBeforeEnter={isOpen}> */}
          <Component
            key={state.status}
            nft={nft}
            onNext={handleNext}
            handleClose={handleClose}
          />
          {/* </AnimatePresence> */}
        </Stack>
      </ModalContent>
    </Modal>
  )
}