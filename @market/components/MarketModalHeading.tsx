import React from 'react'

import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Flex, Heading } from '@zord'

interface MarketModalHeadingProps {
  nftObj: NFTObject
  action?: string
}

export function MarketModalHeading({ nftObj, action }: MarketModalHeadingProps) {
  const { nft } = nftObj
  return (
    <Flex w="100%" justify="space-between" textAlign="left" gap="x6">
      <Heading as="h2" size="md">
        {`${action} ${nftObj.nft?.contract.name} #${nft?.tokenId}`}
      </Heading>
      {/* @BJ TODO: This component causes 500 error when it hits the useNounsToken contract call? */}
      {nft?.contract?.address && (
        <CollectionThumbnail collectionAddress={nft?.contract.address} />
      )}
    </Flex>
  )
}
