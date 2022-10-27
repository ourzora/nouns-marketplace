import { ImageWithNounFallback } from 'components'
import { Link } from 'components/Link'

import { useToken } from 'hooks/useToken'

import { useMemo } from 'react'
import { TypeSafeToken } from 'validators/token'

import { NFTCardMarket } from '@market'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import {
  cardImageWrapper,
  cardWrapper,
  titleHeading,
  titleScroll,
  titleWrapper,
} from '@media/NftMedia.css'
import { useOptionalImageURIDecode } from '@media/hooks/useImageURIDecode'
import { useIsOwner, useNFTProvider } from '@shared'
import { Box, Flex, Heading, Separator, Stack } from '@zoralabs/zord'

type Props = {
  collectionAddress: string
}

export function NFTCard({ collectionAddress }: Props) {
  const { nft } = useNFTProvider()
  const tokenId = nft?.nft?.tokenId

  if (!tokenId || !collectionAddress) return null

  return <NFTCardOuterComponent tokenId={tokenId} collectionAddress={collectionAddress} />
}

export function NFTCardOuterComponent({
  collectionAddress,
  tokenId,
}: Props & { tokenId: string }) {
  const { token } = useToken({ collectionAddress, tokenId })

  if (!token || !collectionAddress) return null

  return <NFTCardComponent token={token} collectionAddress={collectionAddress} />
}

export function NFTCardComponent({
  collectionAddress,
  token,
}: Props & { token: TypeSafeToken }) {
  const { isOwner } = useIsOwner(token)
  const fallbackTitle = token.collectionName ?? '..'
  const srcImg = useOptionalImageURIDecode(token) // Handle non-base64 SVGs by decoding URI. This should be replaced when handled properly API-side
  const tokenId = token.tokenId

  const useTitleScroll = useMemo(() => {
    if (token?.metadata?.name) {
      return token?.metadata?.name.split('').length > 25
    }
  }, [token?.metadata?.name])

  return (
    <Stack w="100%" position="relative" overflow="hidden" className={cardWrapper}>
      <Link href={`/collections/${collectionAddress}/${tokenId}`}>
        <Box w="100%" className={cardImageWrapper} backgroundColor="background2">
          {collectionAddress && tokenId && (
            <ImageWithNounFallback
              tokenContract={collectionAddress}
              tokenId={tokenId}
              srcImg={srcImg}
            />
          )}
        </Box>
      </Link>
      <Stack gap="x2" mt="x2" px="x4" pb="x4" flex={1}>
        <Flex
          className={[titleWrapper, useTitleScroll && titleScroll]}
          style={{
            /* @ts-ignore */
            '--titlePad': titleScroll ? '40px' : '0px',
          }}
        >
          <Heading as="h4" size="sm" className={titleHeading}>
            {fallbackTitle}
          </Heading>
        </Flex>
        <Flex align="center" gap="x2" justify="space-between">
          <Link href={`/collections/${collectionAddress}`}>
            <Flex align="center" gap="x2">
              <CollectionThumbnail
                collectionAddress={collectionAddress}
                radius="round"
                size="xs"
              />
              <Heading size="xs">{token.collectionName}</Heading>
            </Flex>
          </Link>
        </Flex>
        {isOwner && (
          <>
            <Separator mt="x1" />
            <NFTCardMarket />
          </>
        )}
      </Stack>
    </Stack>
  )
}
