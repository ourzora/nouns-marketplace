import { ImageWithNounFallback } from 'components'

import { useToken } from 'hooks/useToken'

import { TypeSafeNounsAuction } from 'validators/auction'

import { AddressWithLink } from '@market'
import { useNounishAuctionHelper } from '@market/hooks/useNounishAuctionHelper'
import { AuctionCountdown, PlaceNounsBid } from '@noun-auction'
import { useIsAuctionCompleted } from '@noun-auction/hooks/useIsAuctionCompleted'
import { useWindowWidth } from '@shared'
import { Flex, Grid, Heading, Paragraph, Stack } from '@zord'

import * as styles from './CollectionHeader.css'

interface HeroProps {
  activeAuction: TypeSafeNounsAuction
}

export function CollectionHero({ activeAuction, ...props }: HeroProps) {
  const { isLarge } = useWindowWidth()
  const { token } = useToken({
    collectionAddress: activeAuction.collectionAddress,
    tokenId: activeAuction.tokenId,
  })
  const { isEnded: auctionCompleted } = useIsAuctionCompleted({
    activeAuction,
  })
  const { formattedCryptoHighestBidPrice, highestBidder } = useNounishAuctionHelper({
    auction: activeAuction,
  })

  return (
    <Grid
      className={['collectionPage-hero', styles.collectionGrid]}
      borderColor="negative"
      w="100%"
      {...props}
    >
      <Grid className={[styles.activeAuction]}>
        <Flex className={[styles.activeAuctionImage]}>
          {token && (
            <ImageWithNounFallback token={token} pos="relative" borderRadius="phat" />
          )}
        </Flex>
        <Stack className={[styles.activeAuctionForm]} justify="center" gap="x6">
          <Heading size={isLarge ? 'lg' : 'md'} as="h2">
            {token?.name}
          </Heading>
          <Flex gap="x8">
            <Stack gap="x2">
              <Paragraph color="text3">Current bid</Paragraph>
              <Heading size="xs">
                {`${formattedCryptoHighestBidPrice} ${activeAuction.highestBidPrice?.nativePrice.currency.name}`}
              </Heading>
            </Stack>
            <Stack gap="x2">
              <Paragraph color="text3">Auction ends in</Paragraph>

              <AuctionCountdown
                auctionEndTime={activeAuction.endTime}
                auctionStartTime={activeAuction.startTime}
                auctionCompleted={auctionCompleted}
              />
            </Stack>
            {highestBidder && (
              <Stack gap="x2">
                <Paragraph color="text3">Top bidder</Paragraph>
                <AddressWithLink address={highestBidder} />
              </Stack>
            )}
          </Flex>
          <PlaceNounsBid
            layout="collectionHero"
            collectionAddress={activeAuction.collectionAddress}
            tokenId={activeAuction.tokenId}
          />
          {!activeAuction.firstBidTime && (
            <Paragraph color="text3">No bids yet</Paragraph>
          )}
        </Stack>
      </Grid>
    </Grid>
  )
}
