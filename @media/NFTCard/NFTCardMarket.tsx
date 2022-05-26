import { useMemo } from 'react'
import { formatCryptoVal } from 'utils/numbers'
import { Text } from '@zoralabs/zord/elements'
import { useRelevantMarket } from '@media/hooks/useRelevantMarket'

/* MARKETS_SUMMARY TYPE? */

export function NFTCardMarket({ marketsSummary }: { marketsSummary: any }) {
  const { ask } = useRelevantMarket(marketsSummary)
  const cryptoVal = useMemo(() => `${formatCryptoVal(ask?.price?.ethPrice?.raw)} Ξ`, [])

  return (
    <Text>
      {ask.status === 'ACTIVE' ? `Buy for ${cryptoVal}` : `Sold for ${cryptoVal}`}
    </Text>
  )
}
