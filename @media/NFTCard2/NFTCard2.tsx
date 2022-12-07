import { ImageElement } from 'components'
import { Link } from 'components/Link'
import {
  ImageEncodingTypes,
  NounsTokensByOwnerAddressQuery,
} from 'types/zora.api.generated'

import { useMemo } from 'react'

import { NFTCardMarket } from '@market'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import {
  cardImageWrapper,
  cardWrapper,
  titleHeading,
  titleScroll,
  titleWrapper,
} from '@media/NftMedia.css'
import { useRawImageTransform } from '@media/hooks/useRawImageTransform'
import { FallbackThumbnail } from '@noun-auction'
import { useIsOwner } from '@shared'
import { Box, Flex, Heading, Separator, Stack } from '@zoralabs/zord'

/** 
  tokenId
  collectionAddress
  collectionName
  tokenOwner 
  token?.image?.url or token?.image?.mediaEncoding?.poster
*/

type ImageType = NounsTokensByOwnerAddressQuery['tokens']['nodes'][0]['token']['image']
type Props = {
  collectionAddress: string
  tokenId: string
  collectionName?: string
  tokenName?: string
  // optionally set this as flag for /manage page (where we know for sure that user is owner)
  isOwner?: boolean
  image: ImageType
}

export function NFTCard2({
  collectionAddress,
  tokenId,
  collectionName,
  image,
  tokenName,
}: Props) {
  console.log('NFTCard2', collectionAddress, tokenId, collectionName)
  // maybe it makes sense to have fallback for image here
  if (!tokenId || !collectionAddress || !image) return null

  return (
    <NFTCardComponent
      tokenId={tokenId}
      collectionAddress={collectionAddress}
      collectionName={collectionName}
      image={image}
      tokenName={tokenName}
    />
  )
}

type ImageWithFallbackProps = {
  collectionAddress: string
  tokenId: string
  image: any // very bad type from api, FIXME later
}

export function ImageWithNounFallback({
  collectionAddress,
  tokenId,
  image,
}: ImageWithFallbackProps) {
  const { image: rawImageFallback } = useRawImageTransform(image?.url ?? undefined)

  const decodedImgSrc = useMemo(() => {
    const imageUrl = image?.url
    if (image?.mimeType === 'image/svg+xml') {
      return imageUrl?.includes('data:image/svg+xml') ||
        imageUrl?.includes('https://api.zora.co')
        ? imageUrl
        : `data:image/svg+xml,${imageUrl}` // proper handling of URI-encoded SVG
    } else {
      return image?.mediaEncoding?.poster ?? imageUrl
    }
  }, [image])

  const srcImg = useMemo(
    () => decodedImgSrc ?? rawImageFallback,
    [decodedImgSrc, rawImageFallback]
  )

  if (srcImg) {
    return (
      <ImageElement
        src={srcImg}
        w="100%"
        h="100%"
        position="absolute"
        inset="x0"
        objectFit="cover"
      />
    )
  }

  return <FallbackThumbnail tokenContract={collectionAddress} tokenId={tokenId} />
}

export function NFTCardComponent({
  collectionAddress,
  collectionName,
  tokenId,
  isOwner,
  tokenName,
  image,
}: Props) {
  const fallbackTitle = collectionName ?? '..'

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
        {/* <Separator mt="x1" />
        <NFTCardMarket /> */}
      </Stack>
    </Stack>
  )
}
