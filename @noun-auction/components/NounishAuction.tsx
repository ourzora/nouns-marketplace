import { Accordion, Separator, Stack, FlexProps } from '@zoralabs/zord'
import { NounishAuctionProvider, ClassifierPrefixProps } from '@noun-auction/providers'
import { ActiveAuction } from './ActiveAuction'
import { AuctionHistory } from './AuctionHistory'
import { AuctionDebugger } from './Debuggers'

export interface TokenInfoConfig extends FlexProps {
  hideThumbnail?: boolean
  hideTitle?: boolean
  hideCollectionTitle?: boolean
  thumbnailSize?: 'lg' | 'xxs' | 'xs' | 'sm' | 'md' | '100%' | undefined
  routePrefix?: string
}

export interface NounishAuctionProps extends TokenInfoConfig {
  contractAddress: string
  tokenId?: string
  /* View Config */
  showBidHistory?: boolean
  useInlineBid?: boolean
  debug?: boolean

  flexDirection?: 'row' | 'column'
  wrapperDirection?: 'row' | 'column'

  marketType: string
  classifierPrefix?: ClassifierPrefixProps

  showLabels?: boolean
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
  hideCollectionTitle = false,
  routePrefix = 'collections',
  flexDirection = 'row',
  wrapperDirection = 'row',
  thumbnailSize = '100%',
  classifierPrefix = undefined,
  showLabels = false,
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
            showLabels={showLabels}
          />
          {showBidHistory && (
            <Stack>
              <Separator mt="x4" />
              <AuctionHistory mt="x2" />
            </Stack>
          )}
          {debug && (
            <Stack py="x2" mb="x2">
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
