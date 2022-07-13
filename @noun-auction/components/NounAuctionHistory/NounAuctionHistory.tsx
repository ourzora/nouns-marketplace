/*
import { NounsAuctionHistoryProvider } from '@noun-auction/providers/NounsAuctionHistoryProvider'
import { HistoryLayout } from './HistoryLayout'
*/
import { Box, BoxProps } from '@zoralabs/zord'

export interface NounAuctionHistoryProps extends BoxProps {}

export function NounAuctionHistory({ ...props }: NounAuctionHistoryProps) {
  return (
    <Box {...props}>
      {/* 
        <NounsAuctionHistoryProvider>
          <HistoryLayout />
        </NounsAuctionHistoryProvider>
      */}
    </Box>
  )
}
