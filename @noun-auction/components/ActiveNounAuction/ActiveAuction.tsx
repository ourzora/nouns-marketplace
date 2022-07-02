import { useMemo } from 'react'
import { Stack, Icon, StackProps } from '@zoralabs/zord'
import { NounsAuctionProvider } from '@noun-auction/providers'
import { useNounAuctionsHistoryQuery } from '@noun-auction/hooks'
import { CurrentBid } from './CurrentBid'
import { BidHistory } from './BidHistory'

export interface ActiveAuctionProps extends StackProps {
  auctionRenderer: 'CurrentBid' | 'BidHistory'
  collectionAddress?: string
  tokenId?: string
  hideThumbnail?: boolean
  hideTitle?: boolean
  flexDirection?: 'row' | 'column'
  wrapperDirection?: 'row' | 'column'
  thumbnailSize?: 'lg' | 'xxs' | 'xs' | 'sm' | 'md' | undefined
}

export function ActiveAuction({
  auctionRenderer = 'CurrentBid',
  collectionAddress,
  tokenId,
  hideThumbnail = false,
  hideTitle = false,
  flexDirection = 'column',
  wrapperDirection = 'row',
  thumbnailSize = 'lg',
  ...props
}: ActiveAuctionProps) {
  const { loading, activeAuctionToken } = useNounAuctionsHistoryQuery()

  const renderer = useMemo(() => {
    switch (auctionRenderer) {
      case 'CurrentBid':
        return (
          <CurrentBid
            wrapperDirection={wrapperDirection}
            flexDirection={flexDirection}
            hideThumbnail={hideThumbnail}
            hideTitle={hideTitle}
            thumbnailSize={thumbnailSize}
          />
        )
      case 'BidHistory':
        return (
          <Stack>
            <CurrentBid
              wrapperDirection={wrapperDirection}
              flexDirection={flexDirection}
              hideThumbnail={hideThumbnail}
              hideTitle={hideTitle}
              thumbnailSize={thumbnailSize}
            />
            <BidHistory px="x4" pb="x4" />
          </Stack>
        )
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
