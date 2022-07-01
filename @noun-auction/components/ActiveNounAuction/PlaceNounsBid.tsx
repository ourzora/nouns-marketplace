import { useMemo, useCallback } from 'react'
import { Stack } from '@zoralabs/zord'
import { ModalComposition } from '@modal'
import { useNounsAuctionProvider } from '@noun-auction/providers'
import { CardMarketTrigger, NftInfo, BigNumberField } from '@market'
import { NounsBidForm } from './NounsBidForm'

export function PlaceNounsBid() {
  const { data, tokenId } = useNounsAuctionProvider()

  if (!data) return null

  console.log(tokenId, data)

  const tokenInfo = useMemo(() => {
    console.log(data?.markets.nodes[0].market.collectionAddress)
    return {
      collectionAddress: data?.markets.nodes[0].market.collectionAddress,
    }
  }, [data?.markets])

  const handleOnConfirmation = useCallback(
    (hash: string, amount: string, currency: string) => {
      console.log('confirmed')
      // setTxHash(hash)
      //
      // setWizardStep('Confirmation')
    },
    []
  )

  return (
    <ModalComposition
      modalName={`nouns-bid-${tokenId}`}
      trigger={<CardMarketTrigger cta="Place Bid" />}
      content={
        <Stack p="x8">
          <NftInfo collectionAddress={tokenInfo.collectionAddress} tokenId={tokenId} />
          <NounsBidForm
            mt="x4"
            tokenAddress={tokenInfo.collectionAddress}
            tokenId={tokenId}
            onConfirmation={handleOnConfirmation}
          />
        </Stack>
      }
    />
  )
}
