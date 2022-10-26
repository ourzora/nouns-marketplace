import React from 'react'
import { TypeSafeToken } from 'validators/token'

import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { Flex, Heading } from '@zoralabs/zord'

interface PrivateAskModalHeadingProps {
  token: TypeSafeToken
  action?: string
}

export function PrivateAskModalHeading({ token, action }: PrivateAskModalHeadingProps) {
  return (
    <Flex w="100%" justify="space-between" textAlign="left" gap="x6">
      <Heading as="h2" size="md">
        {`${action} ${token.collectionName} #${token.tokenId}`}
      </Heading>
      {/* @BJ TODO: This component causes 500 error when it hits the useNounsToken contract call? */}
      <CollectionThumbnail collectionAddress={token.collectionAddress} />
    </Flex>
  )
}
