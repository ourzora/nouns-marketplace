import { useMemo } from 'react'
import { Stack, Flex, Heading, FlexProps } from '@zoralabs/zord'
import { useNounsAuctionProvider } from '@noun-auction/providers'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { numberFormatter } from 'utils/numbers'
import { roundTwoDecimals } from 'utils/math'
import { AuctionCountdown, AuctionBidder, AuctionHighBid } from '../DataRenderers'
import { useNFT } from '@zoralabs/nft-hooks'
import { Link } from 'components'
import { PlaceNounsBid } from './PlaceNounsBid'

interface CurrentBidProps extends FlexProps {
  hideThumbnail: boolean
  hideTitle: boolean
  flexDirection: 'row' | 'column'
  wrapperDirection: 'row' | 'column'
  thumbnailSize?: 'lg' | 'xxs' | 'xs' | 'sm' | 'md' | undefined
}

export function CurrentBid({
  hideThumbnail,
  hideTitle,
  flexDirection,
  wrapperDirection,
  thumbnailSize,
  ...props
}: CurrentBidProps) {
  const { data, tokenId } = useNounsAuctionProvider()

  if (!data) return null

  const marketData = data.markets?.nodes[0]?.market
  const marketProperties = marketData?.properties

  const { data: tokenData } = useNFT(marketData.collectionAddress, tokenId)

  const auctionData = useMemo(() => {
    return {
      collectionAddress: marketData?.collectionAddress,
      tokenId: marketData?.tokenId,
      countdown: {
        startTime: marketProperties?.startTime,
        endTime: marketProperties?.endTime,
      },
      highBid: {
        ethValue: marketProperties?.highestBidPrice?.chainTokenPrice?.decimal,
        usdcValue: numberFormatter(
          roundTwoDecimals(marketProperties?.highestBidPrice?.usdcPrice?.decimal)
        ),
      },
      bidder: {
        address: marketProperties?.highestBidder,
        txHash: marketData?.transactionInfo.transactionHash,
      },
    }
  }, [data])

  return (
    <Flex p="x4" gap="x4" direction={wrapperDirection} justify="space-between" {...props}>
      <Flex gap="x4">
        {!hideThumbnail && (
          <Link href={`/collections/${auctionData.collectionAddress}/${tokenId}`}>
            <CollectionThumbnail
              collectionAddress={auctionData.collectionAddress}
              tokenId={auctionData.tokenId}
              size={thumbnailSize}
            />
          </Link>
        )}
        <Stack justify="space-between">
          {tokenData && !hideTitle && (
            <Heading size="sm" aa="h3">
              {tokenData?.metadata?.name}
            </Heading>
          )}
          {data && (
            <Flex
              gap={hideTitle || flexDirection === 'row' ? 'x4' : 'x0'}
              direction={flexDirection}
            >
              <AuctionBidder
                address={auctionData.bidder.address}
                txHash={auctionData.bidder.txHash}
                layoutDirection={flexDirection === 'row' ? 'column' : 'row'}
              />
              <AuctionCountdown
                startTime={auctionData.countdown.startTime}
                endTime={auctionData.countdown.endTime}
                layoutDirection={flexDirection === 'row' ? 'column' : 'row'}
              />
              <AuctionHighBid
                ethValue={auctionData.highBid.ethValue}
                usdcValue={auctionData.highBid.usdcValue}
                layoutDirection={flexDirection === 'row' ? 'column' : 'row'}
              />
            </Flex>
          )}
        </Stack>
      </Flex>
      <Flex align="flex-end" justify="flex-end">
        <PlaceNounsBid />
      </Flex>
    </Flex>
  )
}
