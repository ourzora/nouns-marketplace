import clsx from 'clsx'

import { useToken } from 'hooks/useToken'

import React, { useCallback } from 'react'

import { Modal, ModalContent, useModal } from '@modal'
import { customBackground, customContent } from '@modal/Modal.css'

import { V3AskFlow } from './V3AskFlow'
import * as styles from './V3AskModal.css'
import { V3AskTrigger } from './V3AskTrigger'
import { V3AskStateProvider } from './providers/V3AskStateProvider'

interface V3AskModalProps {
  tokenId: string
  contractAddress: string
  collectionName: string
  modalName: string
  disableCloseOnClickOutside?: boolean
  markets: ReturnType<typeof useToken>['markets']
  isOwner: boolean
}

export function V3AskModal({
  tokenId,
  contractAddress,
  collectionName,
  markets,
  isOwner,
  modalName,
  disableCloseOnClickOutside = false,
}: V3AskModalProps) {
  const { modalType, requestClose, requestOpen } = useModal()
  const modalHandler = useCallback(() => {
    requestOpen(modalName)
  }, [modalName, requestOpen])

  return (
    <V3AskStateProvider>
      <Modal
        open={modalType === modalName}
        onOpenChange={requestClose}
        trigger={
          <V3AskTrigger
            isOwner={isOwner}
            modalName={modalName}
            tokenId={tokenId}
            contractAddress={contractAddress}
            collectionName={collectionName}
            markets={markets}
            openModal={modalHandler}
          />
        }
      >
        <ModalContent
          className={clsx(styles.content, styles.modalBackground)}
          modalContentOverrides={customContent}
          modalBackgroundOverrides={customBackground}
          disableCloseOnClickOutside={disableCloseOnClickOutside}
          showClose={false}
          padding="x8"
        >
          <V3AskFlow
            tokenId={tokenId}
            contractAddress={contractAddress}
            collectionName={collectionName}
            markets={markets}
          />
        </ModalContent>
      </Modal>
    </V3AskStateProvider>
  )
}
