import React from 'react'

import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Flex, Heading } from '@zoralabs/zord'

interface MarketModalHeadingProps {
  nftObj: NFTObject
  action?: string
}

export function MarketModalHeading({ nftObj, action }: MarketModalHeadingProps) {
  const { nft } = nftObj
  return (
    <Flex w="100%" justify="space-between" textAlign="left" gap="x6">
      <Heading as="h2" size="md">
        {`${action} ${nft?.contract.name} #${nft?.tokenId}`}
      </Heading>
      {/* @BJ TODO: This component causes 500 error when it hits the useNounsToken contract call? */}
      <CollectionThumbnail
        initialNFT={nftObj}
        collectionAddress={nft?.contract.address}
        tokenId={nft?.tokenId}
      />
    </Flex>
  )
}
