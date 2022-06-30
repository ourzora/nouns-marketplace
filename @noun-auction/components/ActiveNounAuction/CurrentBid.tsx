import { useMemo } from 'react'
import { Stack, Flex, Label, Grid } from '@zoralabs/zord'
import { RawDisplayer } from 'components/utils'
import { useNounsAuctionProvider } from '@noun-auction/providers'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { numberFormatter } from 'utils/numbers'
import { roundTwoDecimals } from 'utils/math'

export function CurrentBid() {
  const { data } = useNounsAuctionProvider()

  const auctionData = useMemo(() => {
    const marketData = data?.markets?.nodes[0]?.market
    const marketProperties = marketData?.properties
    return {
      collectionAddress: marketData?.collectionAddress,
      tokenId: marketData?.tokenId,
      auctionInfo: [
        {
          key: 'highestBidder',
          title: 'Top Bidder',
          value: marketProperties?.highestBidder,
        },
        {
          key: 'highestBidPrice',
          title: 'Current Bid',
          value: `
            ${marketProperties?.highestBidPrice?.chainTokenPrice?.decimal} Ξ 
            / 
            $${numberFormatter(
              roundTwoDecimals(marketProperties?.highestBidPrice?.usdcPrice?.decimal)
            )}
          `,
        },
        {
          key: 'time',
          title: 'Ends in',
          value: `
            Started: ${marketProperties?.startTime}
            Ends: ${marketProperties?.endTime}`,
        },
      ],
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
        <Stack gap="x1">
          {auctionData.auctionInfo.map((data) => (
            <Grid style={{ gridTemplateColumns: '1.125fr 4fr' }} key={data.key}>
              <Label>{data.title}:</Label>
              <Label>{data.value}</Label>
            </Grid>
          ))}
        </Stack>
      </Flex>
      <RawDisplayer data={data} />
    </Stack>
  )
}
