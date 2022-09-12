import React, { useCallback } from 'react'
import { PrivateAskTrigger } from './PrivateAskTrigger'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Box, StackProps } from '@zoralabs/zord'

import { PrivateAskFlow } from './PrivateAskFlow'
import { ModalComposition, useModal } from '@modal'
import { PrivateAskStateProvider } from './providers/PrivateAskStateProvider'

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
  const {
    // requestClose,
    requestOpen,
  } = useModal()
  const modalHandler = useCallback(() => {
    requestOpen(modalName)
  }, [modalName, requestOpen])
  const { nft } = nftObj

  if (!nft) {
    return null
  }

  return (
    <PrivateAskStateProvider>
      <ModalComposition
        modalName={`list-${nft.tokenId}${nft.contract.address}`}
        trigger={<PrivateAskTrigger nft={nftObj} openModal={modalHandler} />}
        content={
          <Box p="x8">
            <PrivateAskFlow header={header} nft={nftObj} />
          </Box>
        }
      />
    </PrivateAskStateProvider>
  )
}
