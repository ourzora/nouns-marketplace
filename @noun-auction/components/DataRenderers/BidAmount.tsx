import { Flex, BoxProps } from '@zoralabs/zord'
import { useMemo } from 'react'

// @shared
import { formatCryptoVal } from '@market/utils'

interface BidAmountProps extends BoxProps {
  bidAmount: string
}

export function BidAmount({ bidAmount, ...props }: BidAmountProps) {
  const formattedBidAmount = useMemo(() => formatCryptoVal(bidAmount), [bidAmount])

  return <Flex {...props}>{formattedBidAmount} Ξ</Flex>
}
