import {
  APPROVE,
  CREATE,
  LIST,
  RESET,
  SUCCESS,
  usePrivateAskContext,
} from '@market/providers/PrivateAskProvider'
import useToggle from '@shared/hooks/useToggle'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Button, Flex, Modal, ModalContent } from '@zoralabs/zord'
import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import React, { useCallback } from 'react'

import {
  PrivateAskApproveModule,
  PrivateAskCreate,
  PrivateAskListForSale,
  PrivateAskSuccess,
} from '@market/components/PrivateAsk'
import * as styles from './PrivateAskModal.css'

const componentMap = {
  [LIST]: PrivateAskListForSale,
  [APPROVE]: PrivateAskApproveModule,
  [CREATE]: PrivateAskCreate,
  [SUCCESS]: PrivateAskSuccess,
}

interface PrivateAskModalProps {
  header: React.ReactNode
  nft: NFTObject
}

export function PrivateAskModal({ header, nft }: PrivateAskModalProps) {
  const [isOpen, toggleModalOpen] = useToggle()
  const { state, dispatch } = usePrivateAskContext()

  const Component = componentMap[state.status]
  const next = state.next as string | undefined

  const handleNext = useCallback(() => {
    if (next) {
      console.log('NEXT', next)
      if (dispatch) {
        console.log('DISPATCHING')
        dispatch({ type: next })
      } else {
        console.log('NO DISPATCH')
      }
    } else {
      toggleModalOpen(false)
      if (dispatch) dispatch({ type: RESET })
    }
  }, [dispatch, next, toggleModalOpen])

  return (
    <Modal
      open={isOpen}
      onOpenChange={toggleModalOpen}
      trigger={
        <Button w="100%" onClick={toggleModalOpen}>
          Private Ask
        </Button>
      }
    >
      <ModalContent className={clsx(styles.content, styles.modalBackground)}>
        <>
          <Flex justify="center" mb="x4" mt="x1" width="100%">
            {header}
          </Flex>
          <AnimatePresence exitBeforeEnter={isOpen}>
            <Component key={state.status} nft={nft} onNext={handleNext} />
          </AnimatePresence>
        </>
      </ModalContent>
    </Modal>
  )
}
