import { Link } from 'components/Link'
import { NounsTokensByOwnerAddressQuery } from 'types/zora.api.generated'

import { useMemo } from 'react'
import { TypeSafeMarket } from 'validators/market'

import { NFTCardMarket } from '@market'
import { NftMarketContext } from '@market/providers/NftMarketContextProvider'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import {
  cardImageWrapper,
  cardWrapper,
  titleHeading,
  titleScroll,
  titleWrapper,
} from '@media/NftMedia.css'
import { Box, Flex, Heading, Separator, Stack } from '@zoralabs/zord'

import { ImageWithNounFallback } from '../ImageWithNounFallback'

type ImageType = NounsTokensByOwnerAddressQuery['tokens']['nodes'][0]['token']['image']
type Props = {
  collectionAddress: string
  tokenId: string
  collectionName?: string
  tokenName?: string
  // optionally set this as flag for /manage page (where we know for sure that user is owner)
  isOwner?: boolean
  image: ImageType
  ownerAddress?: string
  markets: TypeSafeMarket[]
}

export function NFTCard2({
  collectionAddress,
  collectionName,
  tokenId,
  isOwner,
  tokenName,
  image,
  ownerAddress,
  markets,
}: Props) {
  const fallbackTitle = `${collectionName} #${tokenId}` ?? '..'

  const useTitleScroll = useMemo(() => {
    if (tokenName) {
      return tokenName.split('').length > 25
    }
  }, [tokenName])

  return (
    <Stack w="100%" position="relative" overflow="hidden" className={cardWrapper}>
      <Link href={`/collections/${collectionAddress}/${tokenId}`}>
        <Box w="100%" className={cardImageWrapper} backgroundColor="background2">
          <ImageWithNounFallback
            collectionAddress={collectionAddress}
            tokenId={tokenId}
            image={image}
          />
        </Box>
      </Link>
      <Stack gap="x2" px="x4" py="x4" flex={1}>
        <Flex
          className={[titleWrapper, useTitleScroll && titleScroll]}
          style={{
            /* @ts-ignore-next-line */
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
              <Heading size="xs">{collectionName}</Heading>
            </Flex>
          </Link>
        </Flex>
        <Separator mt="x1" />
        <NftMarketContext.Provider
          value={{
            tokenId,
            collectionAddress,
            markets,
            collectionName: collectionName ?? '..',
          }}
        >
          <NFTCardMarket ownerAddress={ownerAddress} isOwner={isOwner} />
        </NftMarketContext.Provider>
      </Stack>
    </Stack>
  )
}
