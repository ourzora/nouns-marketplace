import { useMemo, useCallback } from 'react'
import { Stack, Button } from '@zoralabs/zord'
import { useNounishAuctionProvider } from '@noun-auction/providers'
import { NounsBidForm } from './NounsBidForm'
import { placeBidTrigger } from '@noun-auction/styles/NounishStyles.css'
import { ModalComposition } from '@modal'

// Imports from @markets
import { NftInfo } from '@market'

export function PlaceNounsBid({ useModal = true }: { useModal?: boolean }) {
  const { data, tokenId, layout } = useNounishAuctionProvider()

  if (!data) return null

  const tokenInfo = useMemo(() => {
    const currentBidAmount =
      data.markets?.nodes[0]?.market?.properties?.highestBidPrice?.chainTokenPrice
    return {
      collectionAddress: data?.markets.nodes[0].market.collectionAddress,
      currentBidAmount: currentBidAmount?.decimal,
      rawCurrentBidAmount: currentBidAmount?.raw,
    }
  }, [data, data?.markets])

  const handleOnConfirmation = useCallback((hash: string, amount: string) => {
    console.log('confirmed')
  }, [])

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
                collectionAddress={tokenInfo.collectionAddress}
                tokenId={tokenId}
              />
              <NounsBidForm
                mt="x4"
                tokenAddress={tokenInfo.collectionAddress}
                currentBidAmount={tokenInfo.currentBidAmount}
                rawCurrentBidAmount={tokenInfo.rawCurrentBidAmount}
                onConfirmation={handleOnConfirmation}
              />
            </Stack>
          }
        />
      ) : (
        <NounsBidForm
          mt="x4"
          w="100%"
          tokenAddress={tokenInfo.collectionAddress}
          currentBidAmount={tokenInfo.currentBidAmount}
          rawCurrentBidAmount={tokenInfo.rawCurrentBidAmount}
          onConfirmation={handleOnConfirmation}
        />
      )}
    </>
  )
}
