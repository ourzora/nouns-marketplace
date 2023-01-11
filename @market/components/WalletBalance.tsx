import { useMemo } from 'react'

import { roundFourDecimals, useAuth } from '@shared'
import { Paragraph } from '@zord'

export function WalletBalance({ address }: { address: string }) {
  const { balance: data } = useAuth()

  const balance = useMemo(() => {
    if (data) return roundFourDecimals(parseFloat(data?.formatted))
  }, [data])

  return (
    <Paragraph color="text3">
      Your balance: {balance} {data?.symbol}
    </Paragraph>
  )
}
