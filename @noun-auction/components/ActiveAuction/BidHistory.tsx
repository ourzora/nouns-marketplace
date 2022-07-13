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

  console.log(classifierPrefix)

  const auctionEventTypeKey = () => {
    if (classifierPrefix !== null) {
      return `${classifierPrefix?.keyPrefix}NounsAuctionEventType`
    } else {
      return 'nounsAuctionEventType'
    }
  }

  return (
    <Stack {...props}>
      {data.events.nodes.length &&
        data.events.nodes.map((event: any) => {
          return (
            <Stack key={`${event.transactionInfo.transactionHash}`}>
              <Flex py="x4" gap="x4" w="100%" justify="space-between">
                {event.properties[`${auctionEventTypeKey()}`] ===
                `${classifierPrefix !== null ? classifierPrefix?.typePrefix : ''}${
                  NounAuctionEvents.bidPlaced
                }` ? (
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
            </Stack>
          )
        })}
    </Stack>
  )
}
