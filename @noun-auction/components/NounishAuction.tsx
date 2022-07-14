import { Accordion, Separator, Stack, StackProps } from '@zoralabs/zord'
import { NounishAuctionProvider, ClassifierPrefixProps } from '@noun-auction/providers'
import { ActiveAuction } from './ActiveAuction'
import { AuctionHistory } from './AuctionHistory'
import { AuctionDebugger } from './Debuggers'

export interface NounishAuctionProps extends StackProps {
  marketType: string
  tokenId?: string
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

export function NounishAuction({
  marketType,
  contractAddress,
  tokenId,
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
}: NounishAuctionProps) {
  return (
    <Stack {...props}>
      <NounishAuctionProvider
        classifierPrefix={classifierPrefix}
        auctionConfigParams={{
          contractAddress: contractAddress,
          marketType: marketType,
          tokenId: tokenId,
        }}
      >
        <Stack>
          <ActiveAuction
            wrapperDirection={useInlineBid ? 'column' : 'row'}
            flexDirection={flexDirection}
            hideThumbnail={hideThumbnail}
            hideTitle={hideTitle}
            hideCollectionTitle={hideCollectionTitle}
            thumbnailSize={thumbnailSize}
            routePrefix={routePrefix}
            useModal={!useInlineBid}
          />
          {showBidHistory && <AuctionHistory px="x4" pb="x4" />}
          {debug && (
            <Stack p="x4" mb="x3">
              <Separator mb="x4" />
              <Accordion label="Api Data">
                <AuctionDebugger />
              </Accordion>
            </Stack>
          )}
        </Stack>
      </NounishAuctionProvider>
    </Stack>
  )
}
