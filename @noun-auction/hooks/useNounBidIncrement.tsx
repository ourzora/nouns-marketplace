/**
 * Get Current Bid / Bid increment percentage to compute min bid
 */

import { useMemo } from 'react'
import { useContractRead } from 'wagmi'
import BigNumber from 'bignumber.js'
import { utils, BigNumber as EthersBN } from 'ethers'

export function useNounBidIncrement(
  abi: any[],
  auctionContractAddress: string,
  rawCurrentBidAmount: string
) {
  const { data: minBidIncrementPercentage } = useContractRead({
    addressOrName: auctionContractAddress as string,
    contractInterface: abi,
    functionName: 'minBidIncrementPercentage',
  })

  const computeMinBid = useMemo(() => {
    if (!minBidIncrementPercentage) {
      return {
        raw: new BigNumber(0),
        pretty: 0,
      }
    }
    const minBidIncrement = new BigNumber(minBidIncrementPercentage.toString())
    const currentBid = new BigNumber(rawCurrentBidAmount)

    const minBidRaw = currentBid
      .times(minBidIncrement.div(100).plus(1))
      .decimalPlaces(0, BigNumber.ROUND_UP)

    const eth = utils.formatEther(EthersBN.from(minBidRaw.toString()))
    const minBidPretty = new BigNumber(eth).toFixed(2, BigNumber.ROUND_CEIL)

    return {
      raw: minBidRaw,
      pretty: minBidPretty,
    }
  }, [minBidIncrementPercentage, rawCurrentBidAmount])

  return {
    minBidAmount: computeMinBid,
  }
}
