import { useToken } from 'hooks/useToken'

import React from 'react'

import { Stack, StackProps } from '@zoralabs/zord'

import { V3AskModal } from './V3AskModal'

interface V3AskSidebarProps extends StackProps {
  tokenId: string
  contractAddress: string
  collectionName: string
  markets: ReturnType<typeof useToken>['markets']
  isOwner: boolean
}

export function V3AskSidebar({
  tokenId,
  contractAddress,
  collectionName,
  markets,
  className,
  isOwner,
  ...props
}: V3AskSidebarProps) {
  return (
    <Stack {...props} className={className}>
      <V3AskModal
        isOwner={isOwner}
        modalName="V3AskV3"
        tokenId={tokenId}
        contractAddress={contractAddress}
        collectionName={collectionName}
        markets={markets}
      />
    </Stack>
  )
}
