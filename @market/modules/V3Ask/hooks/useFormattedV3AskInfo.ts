import { useToken } from 'hooks/useToken'

import { useEffect, useMemo, useState } from 'react'
import { isV3Ask } from 'validators/isV3Ask'
import { TypeSafeMarket } from 'validators/market'

import { useRelevantMarket } from '@market/hooks'
import { isAddress, shortenAddress } from '@shared'
import { DataTableItemProps } from '@shared/components/DataTable/DataTableItem'
import { resolvePossibleENSAddress } from '@shared/utils/resolvePossibleENSAddress'

import { useV3AskContractContext } from '../providers/V3AskContractProvider'
import { useV3AskStateContext } from '../providers/V3AskStateProvider'

interface V3AskInfoProps {
  contractAddress: string
  tokenId: string
  markets: TypeSafeMarket[]
}

export const useFormattedV3AskInfo = ({
  contractAddress,
  tokenId,
  markets,
}: V3AskInfoProps) => {
  const { V3Asks, PrivateAsks } = useV3AskContractContext()
  const { finalizedV3AskDetails } = useV3AskStateContext()
  const [buyerAddressAsAddress, setBuyerAddressAsAddress] = useState<string | undefined>(
    undefined
  )

  // Prioritize data from a just-created ask, or fall back to the relevant ask in the NFT's market obj
  const { ask, hasActivePrivateAsk, isActiveAsk } = useRelevantMarket(markets)
  const hasRelevantV3Ask = useMemo(
    // () => finalizedV3AskDetails || hasActiveV3Ask,
    () => finalizedV3AskDetails || isActiveAsk,
    [finalizedV3AskDetails, isActiveAsk]
  )

  const askPrice = useMemo(() => {
    if (!hasRelevantV3Ask) return '...'
    return finalizedV3AskDetails?.price ?? ask?.price?.nativePrice?.decimal
  }, [ask?.price?.nativePrice?.decimal, finalizedV3AskDetails?.price, hasRelevantV3Ask])

  const possibleENSBuyerAddress = useMemo(() => {
    if (!isV3Ask(ask?.properties) || !hasRelevantV3Ask || !hasActivePrivateAsk)
      return undefined
    return finalizedV3AskDetails?.rawBuyerAddress ?? ask?.properties?.buyer ?? undefined
  }, [
    ask?.properties,
    finalizedV3AskDetails?.rawBuyerAddress,
    hasRelevantV3Ask,
    hasActivePrivateAsk,
  ])

  useEffect(() => {
    ;(async () => {
      if (!possibleENSBuyerAddress) return undefined
      if (isAddress(possibleENSBuyerAddress))
        setBuyerAddressAsAddress(possibleENSBuyerAddress)

      if (possibleENSBuyerAddress) {
        const buyerAddressAsAddress = await resolvePossibleENSAddress(
          possibleENSBuyerAddress
        )
        buyerAddressAsAddress && setBuyerAddressAsAddress(buyerAddressAsAddress)
      }
    })()
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
      copyValue: possibleENSBuyerAddress!,
      url: {
        href: `https://zora.co/${possibleENSBuyerAddress}`,
        target: '_blank',
        rel: 'noreferrer',
      },
      address: finalizedV3AskDetails?.buyerAddress,
    }

    possibleENSBuyerAddress &&
      buyerAsENSorShortenedAddress &&
      hasActivePrivateAsk &&
      askDetails.push(askBuyer)

    return askDetails
  }, [
    hasRelevantV3Ask,
    asksContractAddressLabel,
    asksContractAddress,
    contractAddress,
    tokenId,
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
