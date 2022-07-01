import { Flex, BoxProps } from '@zoralabs/zord'

interface BidAmountProps extends BoxProps {
  bidAmount: string
}

export function BidAmount({ bidAmount, ...props }: BidAmountProps) {
  return <Flex {...props}>{bidAmount}</Flex>
}
