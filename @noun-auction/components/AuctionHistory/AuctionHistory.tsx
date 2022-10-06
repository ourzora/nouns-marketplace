import { ReactNode, useMemo } from 'react'
import { Stack, StackProps, Box, Flex, Paragraph } from '@zoralabs/zord'

// @noun-auction
import { useNounishAuctionProvider } from '@noun-auction/providers'
import { AuctionEvents, BidTransactionEvent, EventWithTimestamp } from '@noun-auction'
import { auctionEventRow, lightFont } from '@noun-auction/styles/NounishStyles.css'

interface BidHistoryProps extends StackProps {
  children?: ReactNode
}

export function AuctionHistory({ children, ...props }: BidHistoryProps) {
  const {
    data,
    daoConfig: { classifierPrefix },
    noAuctionHistory,
  } = useNounishAuctionProvider()

  const events = useMemo(() => data?.events?.nodes, [data?.events?.nodes])
  const hasEvents = useMemo(() => events?.length > 0, [events?.length])

  const auctionEventTypeKey = () =>
    classifierPrefix !== null
      ? `${classifierPrefix?.keyPrefix}NounsAuctionEventType`
      : 'nounsAuctionEventType'

  if (!hasEvents || noAuctionHistory) {
    return (
      <Flex>
        <Paragraph size="sm" className={lightFont}>
          No history found
        </Paragraph>
      </Flex>
    )
  }

  return (
    <Stack {...props} as="ul">
      {children}
      {events.map((event: any) => {
        const { transactionInfo, properties } = event
        const { transactionHash } = transactionInfo
        return (
          <Box as="li" className={auctionEventRow} key={transactionHash}>
            <AuctionEvents
              key={`${transactionHash}-${properties[`${auctionEventTypeKey()}`]}`}
              auctionEvent={properties[`${auctionEventTypeKey()}`]}
              extendedRenderer={
                <EventWithTimestamp
                  transactionInfo={transactionInfo}
                  label="Auction Extended"
                />
              }
              settledRenderer={
                <EventWithTimestamp
                  transactionInfo={transactionInfo}
                  label="Auction Settled"
                />
              }
              createdRenderer={
                <EventWithTimestamp
                  transactionInfo={transactionInfo}
                  label={`${classifierPrefix?.keyPrefix ?? ''}Noun Born`}
                />
              }
              bidRenderer={
                <BidTransactionEvent
                  transactionInfo={transactionInfo}
                  sender={properties.properties.sender}
                  message={'placed a bid'}
                  value={properties.properties.value}
                />
              }
            />
          </Box>
        )
      })}
    </Stack>
  )
}
