import React from 'react'

import { NFTObject } from '@zoralabs/nft-hooks'
import { Stack, StackProps } from '@zord'

import { V3AskModal } from './V3AskModal'

interface V3AskSidebarProps extends StackProps {
  nftObj: NFTObject
}

export function V3AskSidebar({ nftObj, className, ...props }: V3AskSidebarProps) {
  return (
    <Stack {...props} className={className}>
      <V3AskModal modalName="V3AskV3" nftObj={nftObj} />
    </Stack>
  )
}
