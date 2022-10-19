import { ImageWithNounFallback } from 'components'
import { Link } from 'components/Link'

import {
  cardImageWrapper,
  cardWrapper,
  titleHeading,
  titleWrapper,
} from '@media/NftMedia.css'
import {
  NounishAuctionProvider,
  useNounishAuctionProvider,
} from '@noun-auction/providers'
import { activeAuctionCardData } from '@noun-auction/styles/NounishStyles.css'
import { DaoConfigProps } from '@noun-auction/typings'
import { useTitleWithFallback } from '@shared'
import { Box, Flex, Grid, Heading, Separator, Stack } from '@zoralabs/zord'

import { AuctionCountdown } from './ActiveAuction'
import { PlaceNounsBid, SettleAuction } from './AuctionUi'
import { AuctionBidder, AuctionHighBid } from './DataRenderers'

function CardContents() {
  const {
    daoConfig: { contractAddress },
    tokenId,
    timerComplete,
  } = useNounishAuctionProvider()

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
      <Link href={`/collections/${contractAddress}/${tokenId}`}>
        <Box w="100%" className={cardImageWrapper} backgroundColor="background2">
          {tokenId && (
            <ImageWithNounFallback tokenContract={contractAddress} tokenId={tokenId} />
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
          {timerComplete ? <SettleAuction /> : <PlaceNounsBid useModal />}
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

export function ActiveAuctionCard({ daoConfig }: { daoConfig: DaoConfigProps }) {
  return (
    <NounishAuctionProvider daoConfig={daoConfig}>
      <CardContents />
    </NounishAuctionProvider>
  )
}
