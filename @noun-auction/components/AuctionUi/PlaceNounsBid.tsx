import { useMemo, useCallback } from 'react'
import { Stack, Button } from '@zoralabs/zord'
import { useNounishAuctionProvider } from '@noun-auction/providers'
import { NounsBidForm } from './NounsBidForm'
import { placeBidTrigger } from '@noun-auction/styles/NounishStyles.css'
import { ModalComposition } from '@modal'

// Imports from @markets
import { NftInfo } from '@market'

export function PlaceNounsBid({ useModal = true }: { useModal?: boolean }) {
  const { tokenId, layout, activeAuction } = useNounishAuctionProvider()

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
              <NftInfo
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
