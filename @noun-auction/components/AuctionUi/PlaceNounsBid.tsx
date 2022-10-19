import { Button } from 'components/Button'

import { NFTSummary } from '@market'
import { ModalComposition } from '@modal'
import { useNounishAuctionProvider } from '@noun-auction'
import { placeBidTrigger } from '@noun-auction/styles/NounishStyles.css'
import { Stack } from '@zoralabs/zord'

import { NounsBidForm } from './NounsBidForm'

export function PlaceNounsBid({ useModal = true }: { useModal?: boolean }) {
  const { tokenId, layout, activeAuction } = useNounishAuctionProvider()

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
              <NFTSummary
                collectionAddress={activeAuction?.collectionAddress}
                tokenId={tokenId}
              />
              <NounsBidForm mt="x4" />
            </Stack>
          }
        />
      ) : (
        <NounsBidForm mt="x4" w="100%" />
      )}
    </>
  )
}
