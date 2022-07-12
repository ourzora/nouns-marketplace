import { useMemo } from 'react'
import { Stack, Icon, StackProps, Separator, Box } from '@zoralabs/zord'
import { NounsAuctionProvider } from '@noun-auction/providers'
import { useNounAuctionsHistoryQuery } from '@noun-auction/hooks'
import { AuctionComposition } from './AuctionComposition'
import { BidHistory } from './BidHistory'

export interface ActiveAuctionProps extends StackProps {
  showBidHistory?: boolean
  useInlineBid?: boolean
  hideThumbnail?: boolean
  hideCollectionTitle?: boolean
  hideTitle?: boolean
  flexDirection?: 'row' | 'column'
  wrapperDirection?: 'row' | 'column'
  thumbnailSize?: 'lg' | 'xxs' | 'xs' | 'sm' | 'md' | undefined
  routePrefix?: string
}

export function ActiveAuction({
  showBidHistory = false,
  useInlineBid = false,
  hideThumbnail = false,
  hideTitle = false,
  hideCollectionTitle = true,
  routePrefix = 'collections',
  flexDirection = 'column',
  wrapperDirection = 'row',
  thumbnailSize = 'lg',
  ...props
}: ActiveAuctionProps) {
  const { loading, activeAuctionToken } = useNounAuctionsHistoryQuery()

  return (
    <Stack {...props}>
      {loading ? <Icon id="Spinner" size="lg" /> : null}
      {activeAuctionToken && (
        <NounsAuctionProvider tokenId={activeAuctionToken}>
          <Stack>
            <AuctionComposition
              wrapperDirection={useInlineBid ? 'column' : 'row'}
              flexDirection={flexDirection}
              hideThumbnail={hideThumbnail}
              hideTitle={hideTitle}
              hideCollectionTitle={hideCollectionTitle}
              thumbnailSize={thumbnailSize}
              routePrefix={routePrefix}
              useModal={!useInlineBid}
            />
            {showBidHistory && <BidHistory px="x4" pb="x4" />}
          </Stack>
        </NounsAuctionProvider>
      )}
    </Stack>
  )
}
