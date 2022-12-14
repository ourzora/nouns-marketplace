import { useMemo } from 'react'
import { TypeSafeToken } from 'validators/token'

import { useRelevantMarket } from '@market/hooks'
import { useNounishAuctionQuery } from '@noun-auction'
import { shortenAddress } from '@shared'
import { DataTableItemProps } from '@shared/components/DataTable/DataTableItem'
import { useNFT } from '@zoralabs/nft-hooks'

interface NounishAuctionInfoProps {
  token: TypeSafeToken
  primarySalePrice: string
}

export const usePrimaryAuctionDataTable = ({
  token,
  primarySalePrice,
}: NounishAuctionInfoProps) => {
  const { data: nftObj } = useNFT(token.collectionAddress, token.tokenId)

  const nft = nftObj?.nft
  const markets = nftObj?.markets
  const { ask } = useRelevantMarket(markets)

  const { auctionContractAddress } = useNounishAuctionQuery({
    collectionAddress: token.collectionAddress,
  })
  const askPrice = useMemo(() => ask?.amount?.eth?.value, [ask?.amount?.eth?.value])

  const askPriceSummary = useMemo(
    () =>
      askPrice
        ? {
            label: 'Price',
            value: `${askPrice} ETH`,
          }
        : null,
    [askPrice]
  )

  const formattedAuctionDataTable = useMemo<DataTableItemProps[] | undefined>(() => {
    const summary = [
      {
        label: 'Owned by',
        value: shortenAddress(nft?.owner?.address),
        url: {
          href: `https://market.zora.co/${nft?.owner?.address}`,
          target: '_blank',
          rel: 'noreferrer',
        },
      },
      {
        label: 'Minted by',
        value: shortenAddress(nft?.minted.address),
        url: {
          href: `https://market.zora.co/${nft?.minted?.address}`,
          target: '_blank',
          rel: 'noreferrer',
        },
      },
    ]

    if (primarySalePrice) {
      const primarySummary = {
        label: 'Auctioned for',
        value: `${primarySalePrice} ETH`,
        url: {
          href: `https://etherscan.io/address/${auctionContractAddress}`,
          target: '_blank',
          rel: 'noreferrer',
        },
      }
      summary.push(primarySummary)
    }

    return summary
  }, [nft?.owner?.address, nft?.minted.address, primarySalePrice, auctionContractAddress])

  const copyableValue = useMemo(() => {
    if (!formattedAuctionDataTable) return ''

    return formattedAuctionDataTable
      .map(({ label, copyValue }) => `${label}: ${copyValue}`)
      .join('\r\n')
  }, [formattedAuctionDataTable])

  return {
    formattedAuctionDataTable,
    copyableValue,
    askPriceSummary,
  }
}
