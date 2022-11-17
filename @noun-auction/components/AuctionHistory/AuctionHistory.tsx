import { ReactNode } from 'react'

import { AuctionEvents, BidTransactionEvent, EventWithTimestamp } from '@noun-auction'
import { auctionEventRow } from '@noun-auction/styles/NounishStyles.css'
import { Box, Stack, StackProps } from '@zoralabs/zord'

interface BidHistoryProps extends StackProps {
  children?: ReactNode
}

export function AuctionHistory({ children, ...props }: BidHistoryProps) {
  // const {
  //   data,
  //   dao: { classifierPrefix },
  //   noAuctionHistory,
  // } = useNounishAuctionProvider()

  // FIXME
  const classifierPrefix = {
    keyPrefix: '',
  }
  const events = { nodes: [] }

  const auctionEventTypeKey = () =>
    classifierPrefix !== null
      ? `${classifierPrefix?.keyPrefix}NounsAuctionEventType`
      : 'nounsAuctionEventType'

  return (
    <Stack {...props} as="ul">
      {children}
      {events.nodes.length &&
        events.nodes.map((event: any) => (
          <Box
            as="li"
            className={auctionEventRow}
            key={event?.transactionInfo?.transactionHash}
          >
            <AuctionEvents
              key={`${event.transactionInfo.transactionHash}-${
                event.properties[`${auctionEventTypeKey()}`]
              }`}
              auctionEvent={event.properties[`${auctionEventTypeKey()}`]}
              extendedRenderer={
                <EventWithTimestamp
                  transactionInfo={event.transactionInfo}
                  label="Auction Extended"
                />
              }
              settledRenderer={
                <EventWithTimestamp
                  transactionInfo={event.transactionInfo}
                  label="Auction Settled"
                />
              }
              createdRenderer={
                <EventWithTimestamp
                  transactionInfo={event.transactionInfo}
                  label={`${
                    classifierPrefix?.keyPrefix ? classifierPrefix?.keyPrefix : ''
                  }Noun Born`}
                />
              }
              bidRenderer={
                <BidTransactionEvent
                  transactionInfo={event.transactionInfo}
                  sender={event.properties.properties.sender}
                  message={'placed a bid'}
                  value={event.properties.properties.value}
                />
              }
            />
          </Box>
        ))}
    </Stack>
  )
}
