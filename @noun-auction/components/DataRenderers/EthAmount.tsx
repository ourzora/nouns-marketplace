import { Label, LabelProps } from '@zoralabs/zord'
import { useMemo } from 'react'

// @shared
import { formatCryptoVal } from '@market/utils'

interface EthAmountProps extends LabelProps {
  ethAmount: string
  ethSymbol?: 'Ξ' | 'ETH'
}

export function EthAmount({ ethAmount, ethSymbol = 'ETH', ...props }: EthAmountProps) {
  if (!ethAmount) return null

  const formattedEthAmount = useMemo(() => formatCryptoVal(ethAmount), [ethAmount])

  return (
    <Label {...props}>
      {formattedEthAmount} {ethSymbol}
    </Label>
  )
}
