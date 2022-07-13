import { Stack, StackProps } from '@zoralabs/zord'
import { NounishAuctionProvider, ClassifierPrefixProps } from '@noun-auction/providers'
import { AuctionComposition } from './AuctionComposition'
import { BidHistory } from './BidHistory'
import { AuctionDebugger } from '../Debuggers'

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
  debug?: boolean
  classifierPrefix?: ClassifierPrefixProps
}

export function ActiveAuction({
  marketType,
  contractAddress,
  showBidHistory = false,
  useInlineBid = false,
  hideThumbnail = false,
  hideTitle = false,
  debug = false,
  hideCollectionTitle = true,
  routePrefix = 'collections',
  flexDirection = 'column',
  wrapperDirection = 'row',
  thumbnailSize = 'lg',
  classifierPrefix = undefined,
  ...props
}: ActiveAuctionProps) {
  return (
    <Stack {...props}>
      <NounishAuctionProvider
        classifierPrefix={classifierPrefix}
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
          {debug && <AuctionDebugger />}
        </Stack>
      </NounishAuctionProvider>
    </Stack>
  )
}
