import { ImageWithNounFallback } from 'components'
import { Link } from 'components/Link'

import { useAuctionCountdown } from 'hooks/useAuctionCountdown'

import {
  cardImageWrapper,
  cardWrapper,
  titleHeading,
  titleWrapper,
} from '@media/NftMedia.css'
import {
  activeAuctionCardData,
  auctionWrapperVariants,
} from '@noun-auction/styles/NounishStyles.css'
import { useTitleWithFallback } from '@shared'
import { Box, Flex, Grid, Heading, Separator, Stack } from '@zoralabs/zord'

import { AuctionCountdown } from './ActiveAuction'
import { PlaceNounsBid, SettleAuction } from './AuctionUi'
import { AuctionBidder, AuctionHighBid } from './DataRenderers'

export function ActiveAuctionCard({
  tokenId,
  collectionAddress,
  startTime,
  endTime,
  layout,
}: {
  tokenId: string
  collectionAddress: string
  startTime: string
  endTime: string
  layout: keyof typeof auctionWrapperVariants['layout']
}) {
  // FIXME: remove useNFT from useTitleWithFallback
  const { fallbackTitle } = useTitleWithFallback({ collectionAddress, tokenId })
  const { auctionCompleted } = useAuctionCountdown({
    startTime,
    endTime,
  })

  return (
    <Stack
      w="100%"
      position="relative"
      overflow="hidden"
      className={cardWrapper}
      style={{ maxWidth: '500px' }}
    >
      <Link href={`/collections/${collectionAddress}/${tokenId}`}>
        <Box w="100%" className={cardImageWrapper} backgroundColor="tertiary">
          {tokenId && (
            <ImageWithNounFallback tokenContract={collectionAddress} tokenId={tokenId} />
          )}
        </Box>
      </Link>
      <Stack gap="x2" mt="x4" px="x4" pb="x4">
        <Flex
          pb="x1"
          gap={{
            '@initial': 'x2',
            '@1024': 'x0',
          }}
          justify={{
            '@initial': 'flex-start',
            '@1024': 'space-between',
          }}
          align={{
            '@initial': 'flex-start',
            '@1024': 'center',
          }}
          direction={{
            '@initial': 'column',
            '@1024': 'row',
          }}
        >
          <Flex className={[titleWrapper]}>
            <Heading as="h4" size="sm" className={titleHeading}>
              {fallbackTitle}
            </Heading>
          </Flex>
          {auctionCompleted ? (
            <SettleAuction />
          ) : (
            <PlaceNounsBid
              tokenId={tokenId}
              collectionAddress={collectionAddress}
              layout={layout}
            />
          )}
        </Flex>
        <Separator mt="x1" />
        <Grid className={activeAuctionCardData}>
          <AuctionCountdown
            startTime={startTime}
            endTime={endTime}
            showLabels
            styles={{ align: 'flex-start', direction: 'column' }}
          />
          <AuctionHighBid showLabels align="flex-start" direction="column" />
          <AuctionBidder
            layout={layout}
            tokenId={tokenId}
            collectionAddress={collectionAddress}
            align="flex-start"
            direction="column"
            showLabels
            useAvatar={false}
          />
        </Grid>
      </Stack>
    </Stack>
  )
}
