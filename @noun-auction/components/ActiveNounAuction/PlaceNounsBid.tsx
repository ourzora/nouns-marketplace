import { useMemo, useCallback } from 'react'
import { Stack } from '@zoralabs/zord'
import { ModalComposition } from '@modal'
import { useNounsAuctionProvider } from '@noun-auction/providers'
import { CardMarketTrigger, NftInfo, BigNumberField } from '@market'
import { NounsBidForm } from './NounsBidForm'
import { ContractProvider } from 'providers/ContractProvider'
import { useContractABI } from 'hooks'

const NOUN_AUCTION_ADDRESS = '0x830BD73E4184ceF73443C15111a1DF14e495C706'

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

  const { contractABI } = useContractABI(NOUN_AUCTION_ADDRESS)

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
    <ContractProvider contractAddress={NOUN_AUCTION_ADDRESS} abi={contractABI}>
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
    </ContractProvider>
  )
}
