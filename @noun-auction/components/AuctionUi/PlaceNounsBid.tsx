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
  contractAddress: string
  layout: keyof typeof auctionWrapperVariants['layout']
}

export function PlaceNounsBid({
  layout,
  tokenId,
  contractAddress,
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
              <NFTSummary collectionAddress={contractAddress} tokenId={tokenId} />
              <NounsBidForm collectionAddress={contractAddress} layout={layout} mt="x4" />
            </Stack>
          }
        />
      ) : (
        <NounsBidForm
          collectionAddress={contractAddress}
          layout={layout}
          mt="x4"
          w="100%"
        />
      )}
    </>
  )
}
