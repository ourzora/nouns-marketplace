import { shortenAddress } from '@shared'
import { useMemo } from 'react'
import { NFTObject } from '@zoralabs/nft-hooks'
import {
  usePrivateAskStateContext,
  usePrivateAskContractContext,
} from '@market/modules/PrivateAsk/'

interface PrivateAskInfoProps {
  nft: NFTObject
}

export const useFormattedPrivateAskInfo = ({ nft: nftData }: PrivateAskInfoProps) => {
  const { PrivateAsks } = usePrivateAskContractContext()
  const { finalizedPrivateAskDetails } = usePrivateAskStateContext()
  const { nft } = nftData

  const formattedAskDetails = useMemo(
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
        copyValue: nft?.contract.address,
        url: {
          href: `https://etherscan.io/address/${nft?.contract.address}`,
          target: '_blank',
          rel: 'noreferrer',
        },
      },
      {
        label: 'Token ID',
        value: nft?.tokenId,
        copyValue: nft?.tokenId,
        url: {
          href: `https://zora.co/collections/${nft?.contract.address}/${nft?.tokenId}`,
          target: '_blank',
          rel: 'noreferrer',
        },
      },
      {
        label: 'Price',
        value: `${finalizedPrivateAskDetails?.price} ETH`,
        copyValue: `${finalizedPrivateAskDetails?.price} ETH`,
        url: {
          href: '',
          target: '_blank',
          rel: 'noreferrer',
        },
      },
      {
        label: 'Buyer',
        value: finalizedPrivateAskDetails?.rawBuyerAddress,
        copyValue: finalizedPrivateAskDetails?.rawBuyerAddress,
        url: {
          href: `https://zora.co/${finalizedPrivateAskDetails?.rawBuyerAddress}`,
          target: '_blank',
          rel: 'noreferrer',
        },
        address: finalizedPrivateAskDetails?.buyerAddress,
      },
    ],
    [
      PrivateAsks.address,
      finalizedPrivateAskDetails?.buyerAddress,
      finalizedPrivateAskDetails?.price,
      finalizedPrivateAskDetails?.rawBuyerAddress,
      nft?.contract.address,
      nft?.tokenId,
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
