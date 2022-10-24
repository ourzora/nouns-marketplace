import { useMemo } from 'react'

import { formatCryptoVal } from '@shared'
import { Label, LabelProps } from '@zoralabs/zord'

interface EthAmountProps extends LabelProps {
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
    <Label {...props}>
      {formattedEthAmount} {ethSymbol}
    </Label>
  )
}
