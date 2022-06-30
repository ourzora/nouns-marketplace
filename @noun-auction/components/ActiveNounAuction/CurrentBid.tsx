import { useMemo } from 'react'
import { Stack, Flex, Heading } from '@zoralabs/zord'
import { useNounsAuctionProvider } from '@noun-auction/providers'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { numberFormatter } from 'utils/numbers'
import { roundTwoDecimals } from 'utils/math'
import { AuctionCountdown, AuctionBidder, AuctionHighBid } from '../DataRenderers'
import { RawDisplayer } from 'components/utils'
import { useNFT } from '@zoralabs/nft-hooks'

export function CurrentBid() {
  const { data, tokenId } = useNounsAuctionProvider()

  if (!data) return null

  console.log(tokenId)

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
    <Stack gap="x6">
      <Flex p="x4" gap="x4" backgroundColor="tertiary" borderRadius="phat">
        <CollectionThumbnail
          collectionAddress={auctionData.collectionAddress}
          tokenId={auctionData.tokenId}
          size="lg"
        />
        <Stack justify="space-between">
          {tokenData && (
            <Heading size="sm" aa="h3">
              {tokenData?.metadata?.name}
            </Heading>
          )}
          {data && (
            <Stack gap="x0">
              <AuctionBidder
                address={auctionData.bidder.address}
                txHash={auctionData.bidder.txHash}
              />
              <AuctionCountdown
                startTime={auctionData.countdown.startTime}
                endTime={auctionData.countdown.endTime}
              />
              <AuctionHighBid
                ethValue={auctionData.highBid.ethValue}
                usdcValue={auctionData.highBid.usdcValue}
              />
            </Stack>
          )}
        </Stack>
      </Flex>
      <RawDisplayer data={data} />
    </Stack>
  )
}
