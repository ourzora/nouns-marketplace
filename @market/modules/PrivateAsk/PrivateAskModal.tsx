import React, { useCallback } from 'react'
import clsx from 'clsx'
import { PrivateAskTrigger } from './PrivateAskTrigger'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Modal, ModalContent, useModal } from '@modal'
import { PrivateAskFlow } from './PrivateAskFlow'

import { PrivateAskStateProvider } from './providers/PrivateAskStateProvider'
import * as styles from './PrivateAskModal.css'
import { customContent, customBackground } from '@modal/Modal.css'

interface PrivateAskModalProps {
  nftObj: NFTObject
  modalName: string
}

export function PrivateAskModal({ nftObj, modalName }: PrivateAskModalProps) {
  const { modalType, requestClose, requestOpen } = useModal()
  const modalHandler = useCallback(() => {
    requestOpen(modalName)
  }, [modalName, requestOpen])
  const { nft } = nftObj

  if (!nft) {
    return null
  }

  return (
    <PrivateAskStateProvider>
      <Modal
        open={modalType === modalName}
        onOpenChange={requestClose}
        trigger={<PrivateAskTrigger nft={nftObj} openModal={modalHandler} />}
      >
        <ModalContent
          className={clsx(styles.content, styles.modalBackground)}
          modalContentOverrides={customContent}
          modalBackgroundOverrides={customBackground}
          showClose={false}
          padding="x8"
        >
          <PrivateAskFlow nft={nftObj} />
        </ModalContent>
      </Modal>
    </PrivateAskStateProvider>
  )
}
