import React from 'react'
// import { PrivateAskStateProvider } from './providers'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Stack, StackProps } from '@zoralabs/zord'
// import { NounsGlasses } from 'components'
// import { PrivateAskModal } from './PrivateAskModal'

interface PrivateAskSidebarProps extends StackProps {
  nft: NFTObject
}

export function PrivateAskSidebar({ nft, ...props }: PrivateAskSidebarProps) {
  return (
    <Stack {...props}>
      {/* <PrivateAskStateProvider> */}
      <p>test</p>
      {/* <PrivateAskModal nft={nft} header={<NounsGlasses w="x13" mb="x4" mt="x1" />} /> */}
      {/* </PrivateAskStateProvider> */}
    </Stack>
  )
}
