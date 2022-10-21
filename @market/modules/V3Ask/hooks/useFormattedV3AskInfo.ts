import { useMemo } from 'react'

import { useAskHelper, useRelevantMarket } from '@market/hooks'
import { isAddress, shortenAddress } from '@shared'
import { DataTableItemProps } from '@shared/components/DataTable/DataTableItem'
import { resolvePossibleENSAddress } from '@shared/utils/resolvePossibleENSAddress'
import { NFTObject } from '@zoralabs/nft-hooks'

import { useV3AskContractContext } from '../providers/V3AskContractProvider'
import { useV3AskStateContext } from '../providers/V3AskStateProvider'

interface V3AskInfoProps {
  nft: NFTObject
}

export const useFormattedV3AskInfo = ({ nft: nftObj }: V3AskInfoProps) => {
  const { V3Asks } = useV3AskContractContext()
  const { finalizedV3AskDetails } = useV3AskStateContext()
  const { nft, markets } = nftObj

  // Prioritize data from a just-created ask, or fall back to the relevant ask in the NFT's market obj
  const { ask } = useRelevantMarket(markets)
  const { hasActiveV3Ask } = useAskHelper({ ask })
  const hasRelevantV3Ask = useMemo(
    () => finalizedV3AskDetails || hasActiveV3Ask,
    [finalizedV3AskDetails, hasActiveV3Ask]
  )

  const askPrice = useMemo(() => {
    if (!hasRelevantV3Ask) return '...'
    return finalizedV3AskDetails?.price ?? ask?.amount?.eth?.value
  }, [ask?.amount?.eth?.value, finalizedV3AskDetails?.price, hasRelevantV3Ask])
  const possibleENSBuyerAddress = useMemo(() => {
    if (!hasRelevantV3Ask) return null
    return finalizedV3AskDetails?.rawBuyerAddress ?? ask?.raw.properties.buyer
  }, [
    ask?.raw.properties.buyer,
    finalizedV3AskDetails?.rawBuyerAddress,
    hasRelevantV3Ask,
  ])
  // Format data for use as an address + for clean output
  const buyerAddressAsAddress = useMemo(() => {
    if (!possibleENSBuyerAddress) return undefined

    return isAddress(possibleENSBuyerAddress)
      ? possibleENSBuyerAddress
      : resolvePossibleENSAddress(possibleENSBuyerAddress)
  }, [possibleENSBuyerAddress])
  const buyerAsENSorShortenedAddress = useMemo(() => {
    if (!possibleENSBuyerAddress) return undefined

    return isAddress(possibleENSBuyerAddress)
      ? shortenAddress(buyerAddressAsAddress)
      : possibleENSBuyerAddress
  }, [buyerAddressAsAddress, possibleENSBuyerAddress])

  const formattedAskDetails = useMemo<DataTableItemProps[] | undefined>(() => {
    if (!hasRelevantV3Ask) return undefined

    return [
      {
        label: 'Private Asks contract address',
        value: shortenAddress(V3Asks.address),
        copyValue: V3Asks.address,
        url: {
          href: `https://etherscan.io/address/${V3Asks.address}`,
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
        value: `${askPrice} ETH`,
        copyValue: `${askPrice} ETH`,
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
        address: finalizedV3AskDetails?.buyerAddress,
      },
    ]
  }, [
    hasRelevantV3Ask,
    V3Asks.address,
    nft?.contract.address,
    nft?.tokenId,
    askPrice,
    buyerAsENSorShortenedAddress,
    possibleENSBuyerAddress,
    finalizedV3AskDetails?.buyerAddress,
  ])

  const copyableValue = useMemo(() => {
    if (!formattedAskDetails) return ''

    return formattedAskDetails
      .map(({ label, copyValue }) => `${label}: ${copyValue}`)
      .join('\r\n')
  }, [formattedAskDetails])

  return {
    formattedAskDetails,
    copyableValue,
  }
}
