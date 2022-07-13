import { Stack, StackProps, Flex, Label } from '@zoralabs/zord'
import { useNounishAuctionProvider } from '@noun-auction/providers'
import { AuctionBidder, BidAmount } from '@noun-auction'

interface BidHistoryProps extends StackProps {}

export enum NounAuctionEvents {
  auctionCreated = 'NOUNS_AUCTION_HOUSE_AUCTION_CREATED_EVENT',
  bidPlaced = 'NOUNS_AUCTION_HOUSE_AUCTION_BID_EVENT',
}

export function BidHistory({ ...props }: BidHistoryProps) {
  const { data, classifierPrefix } = useNounishAuctionProvider()

  if (!data) return null

  const auctionEventTypeKey = () =>
    classifierPrefix !== null
      ? `${classifierPrefix?.keyPrefix}NounsAuctionEventType`
      : 'nounsAuctionEventType'

  return (
    <Stack {...props} gap="x2">
      {data.events.nodes.length &&
        data.events.nodes.map((event: any) => {
          return (
            <Stack key={`${event.transactionInfo.transactionHash}`}>
              {event.properties[`${auctionEventTypeKey()}`] ===
              `${classifierPrefix !== null ? classifierPrefix?.typePrefix : ''}${
                NounAuctionEvents.bidPlaced
              }` ? (
                <Flex w="100%" justify="space-between">
                  <AuctionBidder
                    address={event.properties.properties.sender}
                    txHash={event.transactionInfo.transactionHash}
                    label="Bidder"
                  />
                  <BidAmount bidAmount={event.properties.properties.value} />
                </Flex>
              ) : (
                <Label>Auction {event.properties[`${auctionEventTypeKey()}`]}</Label>
              )}
            </Stack>
          )
        })}
    </Stack>
  )
}
