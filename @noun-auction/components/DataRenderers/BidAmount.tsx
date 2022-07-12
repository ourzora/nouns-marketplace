import { Flex, BoxProps } from '@zoralabs/zord'
import { formatCryptoVal } from '@market/utils'
import { useMemo } from 'react'

interface BidAmountProps extends BoxProps {
  bidAmount: string
}

export function BidAmount({ bidAmount, ...props }: BidAmountProps) {
  const formattedBidAmount = useMemo(() => formatCryptoVal(bidAmount), [bidAmount])

  return <Flex {...props}>{formattedBidAmount} Ξ</Flex>
}
