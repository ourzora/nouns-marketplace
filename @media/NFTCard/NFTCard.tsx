import { ImageWithNounFallback } from 'components'
import { Link } from 'components/Link'
import { NounsTokensByOwnerAddressQuery } from 'types/zora.api.generated'

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
import { useIsOwner, useNFTProvider } from '@shared'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Box, Flex, Heading, Separator, Stack } from '@zoralabs/zord'

type Props = {
  collectionAddress: string
}

export function NFTCard({ collectionAddress }: Props) {
  const { nft } = useNFTProvider()
  const tokenId = nft?.nft?.tokenId

  if (!tokenId || !collectionAddress) return null

  return (
    <NFTCardOuterComponent
      nft={nft}
      tokenId={tokenId}
      collectionAddress={collectionAddress}
    />
  )
}

export function NFTCardOuterComponent({
  collectionAddress,
  tokenId,
  nft,
}: Props & { tokenId: string; nft: NFTObject }) {
  const { token, markets } = useToken({ collectionAddress, tokenId })

  if (!token || !collectionAddress) return null

  return (
    <NFTCardComponent
      markets={markets}
      token={token}
      collectionAddress={collectionAddress}
    />
  )
}

export function NFTCardComponent({
  collectionAddress,
  token,
  markets,
}: Props & {
  token: TypeSafeToken
  markets: ReturnType<typeof useToken>['markets']
}) {
  const { isOwner } = useIsOwner(token)
  const fallbackTitle = token.collectionName ?? '..'
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
          {collectionAddress && tokenId && <ImageWithNounFallback token={token} />}
        </Box>
      </Link>
      <Stack gap="x2" px="x4" py="x4" flex={1}>
        <Flex
          className={[titleWrapper, useTitleScroll && titleScroll]}
          style={{
            /* @ts-ignore */
            '--titlePad': titleScroll ? '40px' : '0px',
          }}
        >
          <Heading as="h4" size="sm" className={titleHeading}>
            {fallbackTitle} #{token.tokenId}
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
        <Separator mt="x1" />
        <NFTCardMarket
          isOwner={isOwner}
          ownerAddress={token.owner}
          tokenId={tokenId}
          contractAddress={token.collectionAddress}
          collectionName={token.collectionName}
          markets={markets}
        />
      </Stack>
    </Stack>
  )
}
