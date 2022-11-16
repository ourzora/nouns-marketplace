import { Button } from 'components/Button'

import { NFTSummary } from '@market'
import { ModalComposition } from '@modal'
import {
  auctionWrapperVariants,
  placeBidTrigger,
} from '@noun-auction/styles/NounishStyles.css'
import { Stack } from '@zoralabs/zord'

import { NounsBidForm } from './NounsBidForm'

type PlaceNounsBidProps = {
  useModal?: boolean
  tokenId: string
  collectionAddress: string
  layout: keyof typeof auctionWrapperVariants['layout']
}

export function PlaceNounsBid({
  layout,
  tokenId,
  collectionAddress,
  useModal = true,
}: PlaceNounsBidProps) {
  return (
    <>
      {useModal ? (
        <ModalComposition
          modalName={`nouns-bid-${tokenId}`}
          modalBehaviorRequiresAuth={true}
          trigger={
            <Button
              as="span"
              className={placeBidTrigger}
              size="md"
              variant={layout === 'sideBarBid' ? 'secondary' : 'primary'}
              w={layout === 'sideBarBid' || layout === 'row' ? '100%' : 'auto'}
            >
              Place Bid
            </Button>
          }
          content={
            <Stack p="x8">
              <NFTSummary collectionAddress={collectionAddress} tokenId={tokenId} />
              <NounsBidForm
                collectionAddress={collectionAddress}
                layout={layout}
                mt="x4"
              />
            </Stack>
          }
        />
      ) : (
        <NounsBidForm
          collectionAddress={collectionAddress}
          layout={layout}
          mt="x4"
          w="100%"
        />
      )}
    </>
  )
}
