import { isAddress, resolvePossibleENSAddress, shortenAddress } from '@shared'
import { useMemo } from 'react'
import { NFTObject } from '@zoralabs/nft-hooks'
import { usePrivateAskContractContext } from '../providers/PrivateAskContractProvider'
import { usePrivateAskStateContext } from '../providers/PrivateAskStateProvider'
import { DataTableItemProps } from '@shared/components/DataTable/DataTable'
import { useRelevantMarket } from '@market/hooks'

interface PrivateAskInfoProps {
  nft: NFTObject
}

export const useFormattedPrivateAskInfo = ({ nft: nftData }: PrivateAskInfoProps) => {
  const { PrivateAsks } = usePrivateAskContractContext()
  const { finalizedPrivateAskDetails } = usePrivateAskStateContext()
  const { nft, markets } = nftData

  // Prioritize data from a just-created ask, or fall back to the relevant ask in the NFT's market obj
  const { ask } = useRelevantMarket(markets)
  const nftPrice = useMemo(
    () => finalizedPrivateAskDetails?.price ?? ask.amount?.eth?.value,
    [ask.amount?.eth, finalizedPrivateAskDetails]
  )
  const possibleENSBuyerAddress = useMemo(
    () => finalizedPrivateAskDetails?.rawBuyerAddress ?? ask.raw.properties.buyer,
    [ask.raw.properties.buyer, finalizedPrivateAskDetails]
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

  const formattedAskDetails = useMemo<DataTableItemProps[]>(
    () => [
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
        value: shortenAddress(nft?.contract.address),
        copyValue: nft?.contract.address!,
        url: {
          href: `https://etherscan.io/address/${nft?.contract.address}`,
          target: '_blank',
          rel: 'noreferrer',
        },
      },
      {
        label: 'Token ID',
        value: nft?.tokenId!,
        copyValue: nft?.tokenId!,
        url: {
          href: `https://zora.co/collections/${nft?.contract.address}/${nft?.tokenId}`,
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
    ],
    [
      PrivateAsks.address,
      buyerAsENSorShortenedAddress,
      finalizedPrivateAskDetails?.buyerAddress,
      nft?.contract.address,
      nft?.tokenId,
      nftPrice,
      possibleENSBuyerAddress,
    ]
  )

  const copyableValue = useMemo(
    () =>
      formattedAskDetails
        .map(({ label, copyValue }) => `${label}: ${copyValue}`)
        .join('\r\n'),
    [formattedAskDetails]
  )

  return {
    formattedAskDetails,
    copyableValue,
  }
}
