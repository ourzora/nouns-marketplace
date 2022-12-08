import React from 'react'

import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { Flex, Heading } from '@zoralabs/zord'

interface MarketModalHeadingProps {
  action?: string
  tokenId: string
  contractAddress: string
  collectionName: string
}

export function MarketModalHeading({
  tokenId,
  contractAddress,
  collectionName,
  action,
}: MarketModalHeadingProps) {
  return (
    <Flex w="100%" justify="space-between" textAlign="left" gap="x6">
      <Heading as="h2" size="md">
        {`${action} ${collectionName} #${tokenId}`}
      </Heading>
      {/* @BJ TODO: This component causes 500 error when it hits the useNounsToken contract call? */}
      {contractAddress && <CollectionThumbnail collectionAddress={contractAddress} />}
    </Flex>
  )
}
