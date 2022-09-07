import { isAddress, resolvePossibleENSAddress, shortenAddress } from '@shared'
import { useMemo } from 'react'
import { NFTObject } from '@zoralabs/nft-hooks'
import { usePrivateAskContractContext } from '../providers/PrivateAskContractProvider'
import { usePrivateAskStateContext } from '../providers/PrivateAskStateProvider'
import { DataTableItemProps } from '@shared/components/DataTable/DataTable'
import { useAskHelper, useRelevantMarket } from '@market/hooks'

interface PrivateAskInfoProps {
  nft: NFTObject
}

export const useFormattedPrivateAskInfo = ({ nft: nftData }: PrivateAskInfoProps) => {
  let formattedAskDetails: DataTableItemProps[] | undefined
  let copyableValue: string
  const { PrivateAsks } = usePrivateAskContractContext()
  const { finalizedPrivateAskDetails } = usePrivateAskStateContext()
  const { nft, markets } = nftData

  // Prioritize data from a just-created ask, or fall back to the relevant ask in the NFT's market obj
  const { ask } = useRelevantMarket(markets)
  const { hasActivePrivateAsk } = useAskHelper({ ask })
  const hasRelevantPrivateAsk = finalizedPrivateAskDetails || hasActivePrivateAsk

  console.log('ASK', ask)

  const askPrice = useMemo(() => {
    if (hasRelevantPrivateAsk) {
      return finalizedPrivateAskDetails?.price ?? ask?.amount?.eth?.value
    }
    return '...'
  }, [ask?.amount?.eth?.value, finalizedPrivateAskDetails?.price, hasRelevantPrivateAsk])
  const possibleENSBuyerAddress = useMemo(() => {
    if (hasRelevantPrivateAsk) {
      return finalizedPrivateAskDetails?.rawBuyerAddress ?? ask?.raw.properties.buyer
    }
    return null
  }, [
    ask?.raw.properties.buyer,
    finalizedPrivateAskDetails?.rawBuyerAddress,
    hasRelevantPrivateAsk,
  ])

  // console.log('finalizedPrivateAskDetails',finalizedPrivateAskDetails)
  console.log('possibleENSBuyerAddress', possibleENSBuyerAddress)

  if (!possibleENSBuyerAddress)
    return {
      formattedAskDetails,
      copyableValue: '',
    }

  // Format data for use as an address + for clean output
  const buyerAddressAsAddress = isAddress(possibleENSBuyerAddress)
    ? possibleENSBuyerAddress
    : resolvePossibleENSAddress(possibleENSBuyerAddress)

  const buyerAsENSorShortenedAddress = isAddress(possibleENSBuyerAddress)
    ? shortenAddress(buyerAddressAsAddress)
    : possibleENSBuyerAddress

  formattedAskDetails = [
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
    // @BJ TODO: Should we also add seller data to this table?
  ]

  copyableValue = formattedAskDetails
    .map(({ label, copyValue }) => `${label}: ${copyValue}`)
    .join('\r\n')

  return {
    formattedAskDetails,
    copyableValue,
  }
}
