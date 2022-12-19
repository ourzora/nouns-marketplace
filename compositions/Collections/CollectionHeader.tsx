import { ImageWithNounFallback } from 'components'
import * as siteStyles from 'styles/styles.css'

import { useToken } from 'hooks/useToken'

import { TypeSafeNounsAuction } from 'validators/auction'

import { AddressWithLink } from '@market'
import { useNounishAuctionHelper } from '@market/hooks/useNounishAuctionHelper'
import { AuctionCountdown, PlaceNounsBid, useNounishAuctionQuery } from '@noun-auction'
import { useIsAuctionCompleted } from '@noun-auction/hooks/useIsAuctionCompleted'
import { lightFont, useWindowWidth } from '@shared'
import { Collection } from '@zoralabs/zdk/dist/queries/queries-sdk'
import { Flex, Grid, GridProps, Heading, Paragraph, Stack } from '@zoralabs/zord'

import * as styles from './CollectionHeader.css'

export interface CollectionHeaderProps extends GridProps {
  collection: Collection
  children?: JSX.Element
  currentAuction?: JSX.Element | null
}

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
          <Heading size={isLarge ? 'xl' : 'lg'} as="h2">
            {token?.name}
          </Heading>
          <Flex gap="x8">
            <Stack gap="x2">
              <Paragraph className={[lightFont]} color="text3">
                Current bid
              </Paragraph>
              <Paragraph>
                {`${formattedCryptoHighestBidPrice} ${activeAuction.highestBidPrice?.nativePrice.currency.name}`}
              </Paragraph>
            </Stack>
            <Stack gap="x2">
              <Paragraph className={[lightFont]} color="text3">
                Auction ends in
              </Paragraph>

              <AuctionCountdown
                auctionEndTime={activeAuction.endTime}
                auctionStartTime={activeAuction.startTime}
                auctionCompleted={auctionCompleted}
              />
            </Stack>
            {highestBidder && (
              <Stack gap="x2">
                <Paragraph className={[lightFont]} color="text3">
                  Top bidder
                </Paragraph>
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
            <Paragraph className={[lightFont]} color="text3">
              No bids yet
            </Paragraph>
          )}
        </Stack>
      </Grid>
    </Grid>
  )
}

export function CollectionHeader({
  collection,
  children,
  currentAuction,
  className,
  ...props
}: CollectionHeaderProps) {
  const { activeAuction } = useNounishAuctionQuery({
    collectionAddress: collection.address,
  })

  return (
    <Grid
      className={[siteStyles.pageGrid]}
      px={{ '@initial': 'x0', '@1024': 'x4' }}
      alignSelf="center"
    >
      <Stack
        w="100%"
        className={[styles.collectionGrid, className]}
        display="grid"
        mt={{ '@initial': 'x6', '@1024': 'x8' }}
        px={{
          '@initial': 'x4',
          '@1024': 'x0',
        }}
      >
        {activeAuction && <CollectionHero activeAuction={activeAuction} />}
      </Stack>
    </Grid>
  )
}
