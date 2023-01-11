import { useMemo } from 'react'

import { formatCryptoVal } from '@shared'
import { Heading, HeadingProps } from '@zord'

interface EthAmountProps extends HeadingProps {
  ethAmount: string
  ethSymbol?: 'Ξ' | 'ETH'
}

export function EthAmount({ ethAmount, ethSymbol = 'ETH', ...props }: EthAmountProps) {
  const formattedEthAmount = useMemo(
    () => (ethAmount ? formatCryptoVal(ethAmount) : null),
    [ethAmount]
  )
  if (!ethAmount) return null

  return (
    <Heading size="xs" inline {...props}>
      {formattedEthAmount} {ethSymbol}
    </Heading>
  )
}
