import { ImageWithNounFallback } from 'components'
import { Link } from 'components/Link'

import { useToken } from 'hooks/useToken'

import { useMemo } from 'react'
import { TypeSafeNounsAuction } from 'validators/auction'
import { TypeSafeToken } from 'validators/token'

import {
  cardImageWrapper,
  cardWrapper,
  titleHeading,
  titleWrapper,
} from '@media/NftMedia.css'
import { useNounishAuctionQuery } from '@noun-auction/hooks'
import { useIsAuctionCompleted } from '@noun-auction/hooks/useIsAuctionCompleted'
import {
  activeAuctionCardData,
  auctionWrapperVariants,
} from '@noun-auction/styles/NounishStyles.css'
import { Box, Flex, Grid, Heading, Separator, Stack } from '@zoralabs/zord'

import { AuctionCountdown } from './ActiveAuction'
import { PlaceNounsBid, SettleAuction } from './AuctionUi'
import { AuctionBidder, AuctionHighBid } from './DataRenderers'

export function ActiveAuctionCard({
  collectionAddress,
  ...props
}: {
  collectionAddress: string
  layout: keyof typeof auctionWrapperVariants['layout']
}) {
  const { activeAuction } = useNounishAuctionQuery({
    collectionAddress,
  })

  const { token } = useToken({ collectionAddress, tokenId: activeAuction?.tokenId ?? '' })

  const compo = useMemo(
    () =>
      activeAuction && token ? (
        <ActiveAuctionCardComponent
          activeAuction={activeAuction}
          tokenId={activeAuction.tokenId}
          token={token}
          {...props}
        />
      ) : null,
    [activeAuction, token, props]
  )

  return compo
}

export function ActiveAuctionCardComponent({
  tokenId,
  layout,
  activeAuction,
  token,
}: {
  tokenId: string
  layout: keyof typeof auctionWrapperVariants['layout']
  activeAuction: TypeSafeNounsAuction
  token: TypeSafeToken
}) {
  const { collectionAddress, endTime } = activeAuction
  const { isEnded: auctionCompleted } = useIsAuctionCompleted({
    activeAuction,
  })

  const fallbackTitle = useMemo(
    () => (token ? `${token?.collectionName} #${token?.tokenId}` : '...'),
    [token]
  )

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
          <ImageWithNounFallback token={token} />
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
            <SettleAuction
              auctionContractAddress={activeAuction.auction}
              layout={layout}
            />
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
            auctionCompleted={auctionCompleted}
            auctionEndTime={endTime}
            showLabels
            styles={{ align: 'flex-start', direction: 'column' }}
          />
          <AuctionHighBid
            auctionCompleted={auctionCompleted}
            highestBid={activeAuction.highestBidPrice?.nativePrice?.raw}
            collectionAddress={activeAuction.collectionAddress}
            showLabels
            layout={layout}
            styles={{
              align: 'flex-start',
              direction: 'column',
            }}
          />
          <AuctionBidder
            highestBidder={activeAuction.highestBidder}
            layout={layout}
            styles={{
              align: 'flex-start',
              direction: 'column',
            }}
            showLabels
            useAvatar={false}
          />
        </Grid>
      </Stack>
    </Stack>
  )
}
