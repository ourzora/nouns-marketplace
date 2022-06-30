import { useMemo } from 'react'
import { Stack, Icon } from '@zoralabs/zord'
import { NounsAuctionProvider } from '@noun-auction/providers'
import { useNounAuctionsHistoryQuery } from '@noun-auction/hooks'
import { CurrentBid } from './CurrentBid'

export type ActiveAuctionProps = {
  auctionRenderer: 'CurrentBid' | 'BidHistory'
}

export function ActiveAuction({ auctionRenderer = 'CurrentBid' }: ActiveAuctionProps) {
  const { loading, activeAuctionToken } = useNounAuctionsHistoryQuery()

  const renderer = useMemo(() => {
    switch (auctionRenderer) {
      case 'CurrentBid':
        return <CurrentBid />
      case 'BidHistory':
        return <div>hello</div>
      default:
        return null
    }
  }, [activeAuctionToken])

  return (
    <Stack>
      {loading ? <Icon id="Spinner" size="lg" /> : null}
      {activeAuctionToken && (
        <NounsAuctionProvider tokenId={activeAuctionToken}>
          {renderer}
        </NounsAuctionProvider>
      )}
    </Stack>
  )
}
