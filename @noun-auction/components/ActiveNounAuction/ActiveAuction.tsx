import { useMemo } from 'react'
import { Stack, Icon, StackProps } from '@zoralabs/zord'
import { NounsAuctionProvider } from '@noun-auction/providers'
import { useNounAuctionsHistoryQuery } from '@noun-auction/hooks'
import { CurrentBid } from './CurrentBid'

export interface ActiveAuctionProps extends StackProps {
  auctionRenderer: 'CurrentBid' | 'BidHistory'
  tokenId?: string
  hideThumbnail?: boolean
  hideTitle?: boolean
  flexDirection?: 'row' | 'column'
}

export function ActiveAuction({
  auctionRenderer = 'CurrentBid',
  tokenId,
  hideThumbnail = false,
  hideTitle = false,
  flexDirection = 'column',
  ...props
}: ActiveAuctionProps) {
  const { loading, activeAuctionToken } = useNounAuctionsHistoryQuery()

  const renderer = useMemo(() => {
    switch (auctionRenderer) {
      case 'CurrentBid':
        return (
          <CurrentBid
            flexDirection={flexDirection}
            hideThumbnail={hideThumbnail}
            hideTitle={hideTitle}
          />
        )
      case 'BidHistory':
        return <div>hello</div>
      default:
        return null
    }
  }, [activeAuctionToken])

  return (
    <Stack {...props}>
      {loading ? <Icon id="Spinner" size="lg" /> : null}
      {activeAuctionToken && (
        <NounsAuctionProvider tokenId={activeAuctionToken}>
          {renderer}
        </NounsAuctionProvider>
      )}
    </Stack>
  )
}
