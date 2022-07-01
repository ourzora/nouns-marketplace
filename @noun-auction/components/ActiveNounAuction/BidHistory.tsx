import { Stack, StackProps, Flex, Label } from '@zoralabs/zord'
import { RawDisplayer } from 'components/utils'
import { useNounsAuctionProvider } from '@noun-auction/providers'
import { AuctionBidder, BidAmount } from './../DataRenderers'

interface BidHistoryProps extends StackProps {}

export enum NounAuctionEvents {
  auctionCreated = 'NOUNS_AUCTION_HOUSE_AUCTION_CREATED_EVENT',
  bidPlaced = 'NOUNS_AUCTION_HOUSE_AUCTION_BID_EVENT',
}

export function BidHistory({ ...props }: BidHistoryProps) {
  const { data, tokenId } = useNounsAuctionProvider()

  if (!data) return null

  return (
    <Stack {...props}>
      {data.events.nodes.length &&
        data.events.nodes.map((event: any) => (
          <Stack key={event.transactionInfo.transactionHash}>
            <Flex py="x4" gap="x4" w="100%" justify="space-between">
              {event.properties.nounsAuctionEventType === NounAuctionEvents.bidPlaced ? (
                <>
                  <AuctionBidder
                    address={event.properties.properties.sender}
                    txHash={event.transactionInfo.transactionHash}
                    label="Bidder"
                  />
                  <BidAmount bidAmount={event.properties.properties.value} />
                </>
              ) : (
                <Label>Noun Born</Label>
              )}
            </Flex>
            {/*<RawDisplayer data={event} />*/}
          </Stack>
        ))}
    </Stack>
  )
}
