import React, { useCallback } from 'react'
import clsx from 'clsx'
import { PrivateAskTrigger } from './PrivateAskTrigger'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Modal, ModalContent, StackProps } from '@zoralabs/zord'

import { PrivateAskFlow } from './PrivateAskFlow'
import { useModal } from '@modal'
import { PrivateAskStateProvider } from './providers/PrivateAskStateProvider'
import * as styles from './PrivateAskModal.css'

interface PrivateAskModalProps {
  header: React.ReactNode
  nftObj: NFTObject
  modalName: string
}

export interface CommonPrivateAskComponentProps extends StackProps {
  nft: NFTObject
  onNext?: () => void
  handleClose?: () => void
}

export function PrivateAskModal({ header, nftObj, modalName }: PrivateAskModalProps) {
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
        <ModalContent className={clsx(styles.content, styles.modalBackground)}>
          <PrivateAskFlow header={header} nft={nftObj} />
        </ModalContent>
      </Modal>
    </PrivateAskStateProvider>
  )
}
