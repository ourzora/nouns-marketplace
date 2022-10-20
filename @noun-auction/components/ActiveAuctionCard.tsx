import { ImageWithNounFallback } from 'components'
import { Link } from 'components/Link'

import {
  cardImageWrapper,
  cardWrapper,
  titleHeading,
  titleWrapper,
} from '@media/NftMedia.css'
import { useNounishAuctionQuery } from '@noun-auction'
import {
  activeAuctionCardData,
  auctionWrapperVariants,
} from '@noun-auction/styles/NounishStyles.css'
import { DaoConfigProps } from '@noun-auction/typings'
import { useTitleWithFallback } from '@shared'
import { Box, Flex, Grid, Heading, Separator, Stack } from '@zoralabs/zord'

import { AuctionCountdown } from './ActiveAuction'
import { PlaceNounsBid, SettleAuction } from './AuctionUi'
import { AuctionBidder, AuctionHighBid } from './DataRenderers'

export function ActiveAuctionCard({
  dao,
  timerComplete,
  layout,
}: {
  dao: DaoConfigProps
  timerComplete: boolean
  layout: keyof typeof auctionWrapperVariants['layout']
}) {
  const { collectionAddress } = dao
  const { activeNounishAuction: activeAuction } = useNounishAuctionQuery({
    collectionAddress,
  })
  const tokenId = activeAuction && activeAuction.tokenId
  const contractAddress = activeAuction && activeAuction.collectionAddress

  // FIXME: remove useNFT from useTitleWithFallback
  const { fallbackTitle } = useTitleWithFallback({ contractAddress, tokenId })

  if (!tokenId) return null

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
          {timerComplete ? (
            <SettleAuction />
          ) : (
            <PlaceNounsBid activeAuction={activeAuction!} layout={layout} />
          )}
        </Flex>
        <Separator mt="x1" />
        <Grid className={activeAuctionCardData}>
          <AuctionCountdown showLabels align="flex-start" direction="column" />
          <AuctionHighBid showLabels align="flex-start" direction="column" />
          <AuctionBidder
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
