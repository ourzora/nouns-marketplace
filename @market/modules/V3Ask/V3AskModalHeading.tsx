import React from 'react'

import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Flex, Heading } from '@zoralabs/zord'

interface V3AskModalHeadingProps {
  nftObj: NFTObject
  action?: string
}

export function V3AskModalHeading({ nftObj, action }: V3AskModalHeadingProps) {
  return (
    <Flex w="100%" justify="space-between" textAlign="left" gap="x6">
      <Heading as="h2" size="md">
        {`${action} ${nftObj.metadata?.name} #${nftObj.nft?.tokenId}`}
      </Heading>
      {/* @BJ TODO: This component causes 500 error when it hits the useNounsToken contract call? */}
      {nftObj.nft?.contract?.address && (
        <CollectionThumbnail collectionAddress={nftObj.nft?.contract.address} />
      )}
    </Flex>
  )
}
