import { useToken } from 'hooks/useToken'

import { useMemo } from 'react'
import { TypeSafeToken } from 'validators/token'

import { useRelevantMarket } from '@market/hooks'
import { shortenAddress } from '@shared'
import { DataTableItemProps } from '@shared/components/DataTable/DataTableItem'

interface NounishAuctionInfoProps {
  token: TypeSafeToken
  primarySalePrice: string
}

export const usePrimaryAuctionDataTable = ({
  token: t,
  primarySalePrice,
}: NounishAuctionInfoProps) => {
  const { collectionAddress, tokenId } = t
  const { token, markets } = useToken({
    collectionAddress: collectionAddress,
    tokenId: tokenId,
  })

  // const nft = nftObj?.nft
  // const markets = nftObj?.markets
  const { ask } = useRelevantMarket(markets)

  const askPrice = useMemo(
    () => ask?.price?.nativePrice.decimal,
    [ask?.price?.nativePrice.decimal]
  )

  const auctionContractAddress = useMemo(
    () => () => t?.collectionAddress,
    [t?.collectionAddress]
  )
  //   () => (nft ? returnDaoAuctionContract(nft?.contract.address) : null),
  //   [nft]
  // )

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
        value: shortenAddress(t?.owner),
        url: {
          href: `https://market.zora.co/${t?.owner}`,
          target: '_blank',
          rel: 'noreferrer',
        },
      },
      {
        label: 'Minted by',
        value: shortenAddress(t?.mintInfo?.toAddress),
        url: {
          href: `https://market.zora.co/${t?.mintInfo?.toAddress}`,
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
  }, [t?.owner, t?.mintInfo?.toAddress, primarySalePrice, auctionContractAddress])

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
