import clsx from 'clsx'

import React, { useCallback } from 'react'

import { Modal, ModalContent, useModal } from '@modal'
import { customBackground, customContent } from '@modal/Modal.css'
import { NFTObject } from '@zoralabs/nft-hooks'

import { PrivateAskFlow } from './PrivateAskFlow'
import * as styles from './PrivateAskModal.css'
import { PrivateAskTrigger } from './PrivateAskTrigger'
import { PrivateAskStateProvider } from './providers/PrivateAskStateProvider'

interface PrivateAskModalProps {
  nftObj: NFTObject
  modalName: string
  disableCloseOnClickOutside?: boolean
}

export function PrivateAskModal({
  nftObj,
  modalName,
  disableCloseOnClickOutside = false,
}: PrivateAskModalProps) {
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
          disableCloseOnClickOutside={disableCloseOnClickOutside}
          showClose={false}
          padding="x8"
        >
          <PrivateAskFlow nft={nftObj} />
        </ModalContent>
      </Modal>
    </PrivateAskStateProvider>
  )
}
