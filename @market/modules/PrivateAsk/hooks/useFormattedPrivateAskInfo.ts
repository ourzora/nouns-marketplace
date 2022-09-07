import { isAddress, resolvePossibleENSAddress, shortenAddress } from '@shared'
import { useMemo } from 'react'
// import { NFTObject } from '@zoralabs/nft-hooks'
import { usePrivateAskContractContext } from '../providers/PrivateAskContractProvider'
import { usePrivateAskStateContext } from '../providers/PrivateAskStateProvider'
import { DataTableItemProps } from '@shared/components/DataTable/DataTable'
// import { useRelevantMarket } from '@market/hooks'
import { FixedPriceLike } from '@zoralabs/nft-hooks/dist/types'

interface PrivateAskInfoProps {
  // nft: NFTObject
  ask: FixedPriceLike
  tokenId: string
}

// export const useFormattedPrivateAskInfo = ({ nft: nftData }: PrivateAskInfoProps) => {
export const useFormattedPrivateAskInfo = ({ ask, tokenId }: PrivateAskInfoProps) => {
  const { PrivateAsks } = usePrivateAskContractContext()
  const { finalizedPrivateAskDetails } = usePrivateAskStateContext()
  const contractAddress = useMemo(
    () => ask?.raw.collectionAddress,
    [ask?.raw.collectionAddress]
  )

  // const { nft, markets } = nftData

  // Prioritize data from a just-created ask, or fall back to the relevant ask in the NFT's market obj
  // const { ask } = useRelevantMarket(markets)
  // console.log('ASK', ask)
  const nftPrice = useMemo(
    () => finalizedPrivateAskDetails?.price ?? ask?.amount?.eth?.value,
    [ask?.amount?.eth, finalizedPrivateAskDetails]
  )
  const possibleENSBuyerAddress = useMemo(
    () => finalizedPrivateAskDetails?.rawBuyerAddress ?? ask?.raw.properties.buyer,
    [ask?.raw.properties.buyer, finalizedPrivateAskDetails]
  )

  // Format data for use as an address + for clean output
  const buyerAddressAsAddress = useMemo(
    () =>
      isAddress(possibleENSBuyerAddress)
        ? possibleENSBuyerAddress
        : resolvePossibleENSAddress(possibleENSBuyerAddress),
    [possibleENSBuyerAddress]
  )
  const buyerAsENSorShortenedAddress = useMemo(
    () =>
      isAddress(possibleENSBuyerAddress)
        ? shortenAddress(buyerAddressAsAddress)
        : possibleENSBuyerAddress,
    [buyerAddressAsAddress, possibleENSBuyerAddress]
  )

  const formattedAskDetails = useMemo<DataTableItemProps[] | null>(
    () =>
      ask
        ? [
            {
              label: 'Private Asks contract address',
              value: shortenAddress(PrivateAsks.address),
              copyValue: PrivateAsks.address,
              url: {
                href: `https://etherscan.io/address/${PrivateAsks.address}`,
                target: '_blank',
                rel: 'noreferrer',
              },
            },
            {
              label: 'Token contract',
              value: shortenAddress(contractAddress),
              copyValue: contractAddress,
              url: {
                href: `https://etherscan.io/address/${contractAddress}`,
                target: '_blank',
                rel: 'noreferrer',
              },
            },
            {
              label: 'Token ID',
              value: tokenId,
              copyValue: tokenId,
              url: {
                href: `https://zora.co/collections/${contractAddress}/${tokenId}`,
                target: '_blank',
                rel: 'noreferrer',
              },
            },
            {
              label: 'Price',
              value: `${nftPrice} ETH`,
              copyValue: `${nftPrice} ETH`,
              url: {
                href: '',
                target: '_blank',
                rel: 'noreferrer',
              },
            },
            {
              label: 'Buyer',
              value: buyerAsENSorShortenedAddress!,
              copyValue: possibleENSBuyerAddress,
              url: {
                href: `https://zora.co/${possibleENSBuyerAddress}`,
                target: '_blank',
                rel: 'noreferrer',
              },
              address: finalizedPrivateAskDetails?.buyerAddress,
            },
            // @BJ TODO: Should we also add seller data to this table?
          ]
        : null,
    [
      ask,
      PrivateAsks.address,
      contractAddress,
      tokenId,
      nftPrice,
      buyerAsENSorShortenedAddress,
      possibleENSBuyerAddress,
      finalizedPrivateAskDetails?.buyerAddress,
    ]
  )

  const copyableValue = useMemo(
    () =>
      formattedAskDetails
        ? formattedAskDetails
            .map(({ label, copyValue }) => `${label}: ${copyValue}`)
            .join('\r\n')
        : null,
    [formattedAskDetails]
  )

  return {
    formattedAskDetails,
    copyableValue,
  }
}
