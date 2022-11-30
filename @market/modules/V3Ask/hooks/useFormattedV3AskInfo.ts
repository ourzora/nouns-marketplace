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
  const { V3Asks, PrivateAsks } = useV3AskContractContext()
  const { finalizedV3AskDetails } = useV3AskStateContext()
  const { nft, markets } = nftObj

  // Prioritize data from a just-created ask, or fall back to the relevant ask in the NFT's market obj
  const { ask } = useRelevantMarket(markets)
  const { hasActiveV3Ask, hasActivePrivateAsk, isActiveAsk } = useAskHelper({ ask })
  const hasRelevantV3Ask = useMemo(
    // () => finalizedV3AskDetails || hasActiveV3Ask,
    () => finalizedV3AskDetails || isActiveAsk,
    [finalizedV3AskDetails, isActiveAsk]
  )

  const askPrice = useMemo(() => {
    if (!hasRelevantV3Ask) return '...'
    return finalizedV3AskDetails?.price ?? ask?.amount?.eth?.value
  }, [ask?.amount?.eth?.value, finalizedV3AskDetails?.price, hasRelevantV3Ask])
  const possibleENSBuyerAddress = useMemo(() => {
    if (!hasRelevantV3Ask || !hasActivePrivateAsk) return null
    return finalizedV3AskDetails?.rawBuyerAddress ?? ask?.raw.properties.buyer
  }, [
    ask?.raw.properties.buyer,
    finalizedV3AskDetails?.rawBuyerAddress,
    hasRelevantV3Ask,
    hasActivePrivateAsk,
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

  const asksContractAddressLabel = useMemo(
    () =>
      hasActivePrivateAsk ? `Private Asks contract address` : ` Asks contract address`,
    [hasActivePrivateAsk]
  )
  const asksContractAddress = useMemo(
    () => (hasActivePrivateAsk ? PrivateAsks.address : V3Asks.address),
    [PrivateAsks.address, V3Asks.address, hasActivePrivateAsk]
  )

  const formattedAskDetails = useMemo<DataTableItemProps[] | undefined>(() => {
    if (!hasRelevantV3Ask) return undefined

    const askDetails = [
      {
        label: asksContractAddressLabel,
        value: shortenAddress(asksContractAddress),
        copyValue: asksContractAddress,
        url: {
          href: `https://etherscan.io/address/${asksContractAddress}`,
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
    ]

    const askBuyer = {
      label: 'Buyer',
      value: buyerAsENSorShortenedAddress!,
      copyValue: possibleENSBuyerAddress,
      url: {
        href: `https://zora.co/${possibleENSBuyerAddress}`,
        target: '_blank',
        rel: 'noreferrer',
      },
      address: finalizedV3AskDetails?.buyerAddress,
    }

    hasActivePrivateAsk && askDetails.push(askBuyer)

    return askDetails
  }, [
    hasRelevantV3Ask,
    asksContractAddressLabel,
    asksContractAddress,
    nft?.contract.address,
    nft?.tokenId,
    askPrice,
    buyerAsENSorShortenedAddress,
    possibleENSBuyerAddress,
    finalizedV3AskDetails?.buyerAddress,
    hasActivePrivateAsk,
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
