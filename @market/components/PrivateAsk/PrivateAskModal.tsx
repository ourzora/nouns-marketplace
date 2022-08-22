import React, { useCallback } from 'react'
import clsx from 'clsx'
import {
  APPROVE_FOR_FILL,
  APPROVE_FOR_CREATE,
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
import { PrivateAskApproveModule } from './PrivateAskApproveModule'
import { PrivateAskCreate } from './create/PrivateAskCreate'
import { PrivateAskCreateSuccess } from './create/PrivateAskCreateSuccess'
import { PrivateAskCancel } from './cancel/PrivateAskCancel'
import { PrivateAskCancelSuccess } from './cancel/PrivateAskCancelSuccess'
import { PrivateAskFillAsk } from './fill/PrivateAskFillAsk'
import { PrivateAskFillAskSuccess } from './fill/PrivateAskFillAskSuccess'
import { PrivateAskListForSale } from './PrivateAskListForSale'
import { PrivateAskTrigger } from './PrivateAskTrigger'
import useToggle from '@shared/hooks/useToggle'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Flex, Modal, ModalContent, Paragraph, StackProps } from '@zoralabs/zord'
// import { AnimatePresence } from 'framer-motion'

import * as styles from './PrivateAskModal.css'
import { useContractContext } from '@market/providers'
import { useZoraV3ModuleApproval } from '@market/hooks'

const componentMap = {
  [LIST]: PrivateAskListForSale,
  [APPROVE_FOR_CREATE]: PrivateAskApproveModule,
  [CREATE]: PrivateAskCreate,
  [CREATE_SUCCESS]: PrivateAskCreateSuccess,
  [CANCEL]: PrivateAskCancel,
  [CANCEL_SUCCESS]: PrivateAskCancelSuccess,
  [APPROVE_FOR_FILL]: PrivateAskApproveModule,
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
  const { PrivateAsks } = useContractContext() // Should this all be moved to usePrivateAskContext?
  const { approved: isZoraV3ModuleApproved } = useZoraV3ModuleApproval(
    PrivateAsks.address
  )

  const Component = componentMap[state.status]

  // useMemo(() => {
  //   console.log('initiallyOpen?', initialOpen)
  //   console.log('isOpen?', isOpen)
  //   // console.log('isZoraV3ModuleApproved', isZoraV3ModuleApproved)
  //   // console.log('state.status', state.status)
  //   // state.status && console.log('typeof componentMap[state.status]', typeof Component) // <-- PrivateAskApproveModule was undefined
  //   // console.log(Component)
  // }, [
  //   // Component, isZoraV3ModuleApproved, state.status,
  //   initialOpen,
  //   isOpen,
  // ])

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
          <Paragraph size="xs">
            isZoraV3ModuleApproved? {isZoraV3ModuleApproved ? 'YES' : 'NO'}
          </Paragraph>
          {/* <AnimatePresence exitBeforeEnter={isOpen}> */}
          <Component
            key={state.status}
            nft={nft}
            onNext={handleNext}
            handleClose={handleClose}
          />
          {/* </AnimatePresence> */}
        </>
      </ModalContent>
    </Modal>
  )
}
