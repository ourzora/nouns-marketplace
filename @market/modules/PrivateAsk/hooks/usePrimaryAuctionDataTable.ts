import { shortenAddress } from '@shared'
import { useMemo } from 'react'
import { NFTObject } from '@zoralabs/nft-hooks'
import { DataTableItemProps } from '@shared/components/DataTable/DataTable'
import { useRelevantMarket } from '@market/hooks'
import { useNounishAuctionProvider } from '@noun-auction'

interface NounishAuctionInfoProps {
  nft: NFTObject
}

export const usePrimaryAuctionDataTable = ({ nft: nftObj }: NounishAuctionInfoProps) => {
  const { nft, markets } = nftObj
  const { primarySalePrice } = useNounishAuctionProvider()

  // Prioritize data from a just-created ask, or fall back to the relevant ask in the NFT's market obj
  const { ask } = useRelevantMarket(markets)
  const askPrice = useMemo(() => ask?.amount?.eth?.value, [ask?.amount?.eth?.value])

  const askPriceSummary = useMemo(
    () =>
      askPrice
        ? {
            label: 'Price',
            value: `${ask?.amount?.eth?.value} ETH`,
          }
        : null,
    [ask?.amount?.eth?.value, askPrice]
  )

  const formattedAuctionDataTable = useMemo<DataTableItemProps[] | undefined>(() => {
    const summary = [
      {
        label: 'Owned by',
        value: shortenAddress(nft?.owner?.address),
        // copyValue: nft?.owner?.address,
        // url: {
        //   href: `https://zora.co/${nft?.owner?.address}`,
        //   target: '_blank',
        //   rel: 'noreferrer',
        // },
      },
      {
        label: 'Minted by',
        value: shortenAddress(nft?.minted.address),
        // copyValue: nft?.minted.address,
        // url: {
        //   href: `https://zora.co/${nft?.minted.address}`,
        //   target: '_blank',
        //   rel: 'noreferrer',
        // },
      },
      // @BJ TODO: Should we also add seller data to this table?
    ]

    if (primarySalePrice) {
      const primarySummary = {
        label: 'Auctioned for',
        value: `${primarySalePrice} ETH`,
        // copyValue: `${primarySalePrice} ETH`,
        // url: {
        //   href: '',
        //   target: '_blank',
        //   rel: 'noreferrer',
        // },
      }
      summary.push(primarySummary)
    }

    return summary
  }, [nft?.owner?.address, nft?.minted.address, primarySalePrice])

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
