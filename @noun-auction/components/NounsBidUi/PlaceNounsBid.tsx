import { useMemo, useCallback } from 'react'
import { Stack } from '@zoralabs/zord'
import { ModalComposition } from '@modal'
import { useNounsAuctionProvider } from '@noun-auction/providers'
import { CardMarketTrigger, NftInfo } from '@market'
import { NounsBidForm } from './NounsBidForm'
import { NounishAuctionContractProvider } from '@noun-auction/providers'

export function PlaceNounsBid({
  useModal = true,
  auctionContractAddress = '0x830BD73E4184ceF73443C15111a1DF14e495C706',
}: {
  useModal?: boolean
  auctionContractAddress?: string
}) {
  const { data, tokenId } = useNounsAuctionProvider()

  if (!data) return null

  const tokenInfo = useMemo(() => {
    const currentBidAmount =
      data.markets?.nodes[0]?.market?.properties?.highestBidPrice?.chainTokenPrice
    console.log(currentBidAmount?.raw)
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
    <NounishAuctionContractProvider auctionContractAddress={auctionContractAddress}>
      {useModal ? (
        <ModalComposition
          modalName={`nouns-bid-${tokenId}`}
          trigger={<CardMarketTrigger cta="Place Bid" />}
          content={
            <Stack p="x8">
              <NftInfo
                collectionAddress={tokenInfo.collectionAddress}
                tokenId={tokenId}
              />
              <NounsBidForm
                mt="x4"
                tokenAddress={tokenInfo.collectionAddress}
                tokenId={tokenId}
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
          tokenId={tokenId}
          currentBidAmount={tokenInfo.currentBidAmount}
          rawCurrentBidAmount={tokenInfo.rawCurrentBidAmount}
          onConfirmation={handleOnConfirmation}
        />
      )}
    </NounishAuctionContractProvider>
  )
}
