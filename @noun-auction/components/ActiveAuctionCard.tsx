import { ImageWithNounFallback } from 'components'
import { Link } from 'components/Link'

import { useToken } from 'hooks/useToken'

import { useMemo } from 'react'
import { TypeSafeNounsAuction } from 'validators/auction'

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

  const compo = useMemo(
    () =>
      activeAuction ? (
        <ActiveAuctionCardComponent
          activeAuction={activeAuction}
          tokenId={activeAuction.tokenId}
          {...props}
        />
      ) : null,
    [
      activeAuction?.tokenId,
      activeAuction?.startTime,
      activeAuction?.endTime,
      activeAuction?.highestBidPrice?.nativePrice.raw,
    ]
  )

  return compo
}

export function ActiveAuctionCardComponent({
  tokenId,
  layout,
  activeAuction,
}: {
  tokenId: string
  layout: keyof typeof auctionWrapperVariants['layout']
  activeAuction: TypeSafeNounsAuction
}) {
  const { collectionAddress, startTime, endTime } = activeAuction
  const { isEnded: auctionCompleted, countdownText } = useIsAuctionCompleted({
    activeAuction,
  })

  const { token } = useToken({ collectionAddress, tokenId })
  const fallbackTitle = `${token?.collectionName} #${token?.tokenId}`

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
          <ImageWithNounFallback
            srcImg={token?.image.url?.toString()}
            tokenContract={collectionAddress}
            tokenId={tokenId}
          />
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
            countdownText={countdownText}
            startTime={startTime}
            endTime={endTime}
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
            layout={layout}
            activeAuction={activeAuction}
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
