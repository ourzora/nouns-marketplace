import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { utils, BigNumber as EthersBN, BigNumberish } from 'ethers'

export function useNounBidIncrement(
  rawCurrentBidAmount: string,
  minBidIncrementPercentage: number,
  reservePrice: BigNumberish
) {
  /*
  console.log({
    minBidIncrementPercentage: minBidIncrementPercentage,
    raw: reservePrice.valueOf(),
    pretty: reservePrice.toString(),
  })
  */
  const computeMinBid = useMemo(() => {
    // const reserveBn = new BigNumber(reservePrice.toString())

    if (!minBidIncrementPercentage || !rawCurrentBidAmount) {
      return {
        raw: reservePrice.valueOf(),
        pretty: reservePrice.toString(),
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
  }, [minBidIncrementPercentage, rawCurrentBidAmount, reservePrice])

  return {
    minBidAmount: computeMinBid,
  }
}
