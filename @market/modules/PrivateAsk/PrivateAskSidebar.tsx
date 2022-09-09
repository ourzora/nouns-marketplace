import React from 'react'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Stack, StackProps } from '@zoralabs/zord'
import { NounsGlasses } from 'components'
import { PrivateAskModal } from './PrivateAskModal'

interface PrivateAskSidebarProps extends StackProps {
  nft: NFTObject
}

export function PrivateAskSidebar({ nft, ...props }: PrivateAskSidebarProps) {
  return (
    <Stack {...props}>
      <PrivateAskModal
        modalName="PrivateAskV3"
        nft={nft}
        header={<NounsGlasses w="x13" mb="x4" mt="x1" />}
      />
    </Stack>
  )
}
