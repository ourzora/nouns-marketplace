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
  titlePadding,
  titleScroll,
  titleWrapper,
} from '@media/mediaStyles.css'
import { useNFTProvider } from '@shared'
import { Box, Flex, Heading, Label, Separator, Stack } from '@zord'

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
  const fallbackTitle = token.collectionName ?? '..'
  const tokenId = token.tokenId

  const enableTitleScroll = useMemo(() => {
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
        <Flex className={[titleWrapper, enableTitleScroll && titleScroll]}>
          <Heading as="h4" size="sm" className={[enableTitleScroll && titlePadding]}>
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
              <Label size="lg" color="text1">
                {token.collectionName}
              </Label>
            </Flex>
          </Link>
        </Flex>
        <Separator mt="x1" />
        <NFTCardMarket />
      </Stack>
    </Stack>
  )
}
