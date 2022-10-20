import { Stack, Button } from '@zoralabs/zord'
import { NounsBidForm } from './NounsBidForm'
import {
  auctionWrapperVariants,
  placeBidTrigger,
} from '@noun-auction/styles/NounishStyles.css'
import { ModalComposition } from '@modal'

// Imports from @markets
import { NftInfo } from '@market'
import { NounsBuilderAuction } from 'types/zora.api.generated'

type PlaceNounsBidProps = {
  useModal?: boolean
  activeAuction: NounsBuilderAuction
  layout: keyof typeof auctionWrapperVariants['layout']
}

export function PlaceNounsBid({
  layout,
  activeAuction,
  useModal = true,
}: PlaceNounsBidProps) {
  const { tokenId, collectionAddress } = activeAuction
  return (
    <>
      {useModal ? (
        <ModalComposition
          modalName={`nouns-bid-${tokenId}`}
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
              <NftInfo collectionAddress={collectionAddress} tokenId={tokenId} />
              <NounsBidForm layout={layout} mt="x4" />
            </Stack>
          }
        />
      ) : (
        <NounsBidForm layout={layout} mt="x4" w="100%" />
      )}
    </>
  )
}
