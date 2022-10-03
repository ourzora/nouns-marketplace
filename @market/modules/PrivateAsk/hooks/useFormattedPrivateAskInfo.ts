import { isAddress, shortenAddress } from '@shared'
import { useMemo } from 'react'
import { NFTObject } from '@zoralabs/nft-hooks'
import { usePrivateAskContractContext } from '../providers/PrivateAskContractProvider'
import { usePrivateAskStateContext } from '../providers/PrivateAskStateProvider'
import { useAskHelper, useRelevantMarket } from '@market/hooks'
import { resolvePossibleENSAddress } from '@shared/utils/resolvePossibleENSAddress'
import { DataTableItemProps } from '@shared/components/DataTable/DataTableItem'

interface PrivateAskInfoProps {
  nft: NFTObject
}

export const useFormattedPrivateAskInfo = ({ nft: nftObj }: PrivateAskInfoProps) => {
  const { PrivateAsks } = usePrivateAskContractContext()
  const { finalizedPrivateAskDetails } = usePrivateAskStateContext()
  const { nft, markets } = nftObj

  // Prioritize data from a just-created ask, or fall back to the relevant ask in the NFT's market obj
  const { ask } = useRelevantMarket(markets)
  const { hasActivePrivateAsk } = useAskHelper({ ask })
  const hasRelevantPrivateAsk = useMemo(
    () => finalizedPrivateAskDetails || hasActivePrivateAsk,
    [finalizedPrivateAskDetails, hasActivePrivateAsk]
  )

  const askPrice = useMemo(() => {
    if (!hasRelevantPrivateAsk) return '...'
    return finalizedPrivateAskDetails?.price ?? ask?.amount?.eth?.value
  }, [ask?.amount?.eth?.value, finalizedPrivateAskDetails?.price, hasRelevantPrivateAsk])
  const possibleENSBuyerAddress = useMemo(() => {
    if (!hasRelevantPrivateAsk) return null
    return finalizedPrivateAskDetails?.rawBuyerAddress ?? ask?.raw.properties.buyer
  }, [
    ask?.raw.properties.buyer,
    finalizedPrivateAskDetails?.rawBuyerAddress,
    hasRelevantPrivateAsk,
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
    if (!hasRelevantPrivateAsk) return undefined

    return [
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
        address: finalizedPrivateAskDetails?.buyerAddress,
      },
    ]
  }, [
    hasRelevantPrivateAsk,
    PrivateAsks.address,
    nft?.contract.address,
    nft?.tokenId,
    askPrice,
    buyerAsENSorShortenedAddress,
    possibleENSBuyerAddress,
    finalizedPrivateAskDetails?.buyerAddress,
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
