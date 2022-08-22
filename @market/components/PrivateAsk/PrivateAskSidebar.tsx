import { PrivateAskProvider } from '@market/providers/PrivateAskProvider'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Stack, StackProps } from '@zoralabs/zord'
import { NounsGlasses } from 'components'
import React from 'react'
import { PrivateAskModal } from './PrivateAskModal'
interface PrivateAskSidebarProps extends StackProps {
  nft: NFTObject
}

export function PrivateAskSidebar({ nft, ...props }: PrivateAskSidebarProps) {
  // @BJ todo: enable passing of trigger from outside of the PrivateAskModal component?
  return (
    <Stack {...props}>
      <PrivateAskProvider>
        <PrivateAskModal nft={nft} header={<NounsGlasses w="x13" mb="x4" mt="x1" />} />
      </PrivateAskProvider>
    </Stack>
  )
}
