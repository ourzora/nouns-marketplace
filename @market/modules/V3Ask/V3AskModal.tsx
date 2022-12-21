import clsx from 'clsx'

import React, { useCallback } from 'react'

import { Modal, ModalContent, useModal } from '@modal'
import { customBackground, customContent } from '@modal/Modal.css'

import { V3AskFlow } from './V3AskFlow'
import * as styles from './V3AskModal.css'
import { V3AskTrigger } from './V3AskTrigger'
import { V3AskStateProvider } from './providers/V3AskStateProvider'

interface V3AskModalProps {
  modalName: string
  disableCloseOnClickOutside?: boolean
  isOwner: boolean
}

export function V3AskModal({
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
          <V3AskFlow />
        </ModalContent>
      </Modal>
    </V3AskStateProvider>
  )
}
