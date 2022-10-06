import React from 'react'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Stack, StackProps } from '@zoralabs/zord'
import { PrivateAskModal } from './PrivateAskModal'

interface PrivateAskSidebarProps extends StackProps {
  nftObj: NFTObject
}

export function PrivateAskSidebar({
  nftObj,
  className,
  ...props
}: PrivateAskSidebarProps) {
  return (
    <Stack {...props} className={className}>
      <PrivateAskModal modalName="PrivateAskV3" nftObj={nftObj} />
    </Stack>
  )
}
