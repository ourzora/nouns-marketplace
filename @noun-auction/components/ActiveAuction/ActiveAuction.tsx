import { Stack, StackProps } from '@zoralabs/zord'
import { NounishAuctionProvider } from '@noun-auction/providers'
import { AuctionComposition } from './AuctionComposition'
import { BidHistory } from './BidHistory'

export interface ActiveAuctionProps extends StackProps {
  marketType: string
  contractAddress: string
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
  marketType,
  contractAddress,
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
  return (
    <Stack {...props}>
      <NounishAuctionProvider
        auctionConfigParams={{
          contractAddress: contractAddress,
          marketType: marketType,
        }}
      >
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
      </NounishAuctionProvider>
    </Stack>
  )
}
