import {
  APPROVE,
  CREATE,
  CREATE_SUCCESS,
  LIST,
  RESET,
  CANCEL,
  CANCEL_SUCCESS,
  FILLASK,
  FILLASK_SUCCESS,
  usePrivateAskContext,
} from '@market/providers/PrivateAskProvider'
import useToggle from '@shared/hooks/useToggle'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Flex, Modal, ModalContent, StackProps } from '@zoralabs/zord'
import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import React, { useCallback } from 'react'

import {
  PrivateAskApproveModule,
  PrivateAskListForSale,
  PrivateAskCreate,
  PrivateAskCreateSuccess,
  PrivateAskCancel,
  PrivateAskCancelSuccess,
  PrivateAskFillAsk,
  PrivateAskFillAskSuccess,
  PrivateAskTrigger,
} from '@market/components/PrivateAsk'
import * as styles from './PrivateAskModal.css'

const componentMap = {
  [LIST]: PrivateAskListForSale,
  [APPROVE]: PrivateAskApproveModule,
  [CREATE]: PrivateAskCreate,
  [CREATE_SUCCESS]: PrivateAskCreateSuccess,
  [CANCEL]: PrivateAskCancel,
  [CANCEL_SUCCESS]: PrivateAskCancelSuccess,
  [FILLASK]: PrivateAskFillAsk,
  [FILLASK_SUCCESS]: PrivateAskFillAskSuccess,
}

interface PrivateAskModalProps {
  header: React.ReactNode
  nft: NFTObject
}

export interface CommonPrivateAskComponentProps extends StackProps {
  nft: NFTObject
  onNext?: () => void
  handleClose?: () => void
}

export function PrivateAskModal({ header, nft }: PrivateAskModalProps) {
  const [isOpen, toggleModalOpen] = useToggle()
  const { state, dispatch } = usePrivateAskContext()

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
        <>
          <Flex justify="center" mb="x4" mt="x1" width="100%">
            {header}
          </Flex>
          <AnimatePresence exitBeforeEnter={isOpen}>
            <Component
              key={state.status}
              nft={nft}
              onNext={handleNext}
              handleClose={handleClose}
            />
          </AnimatePresence>
        </>
      </ModalContent>
    </Modal>
  )
}
