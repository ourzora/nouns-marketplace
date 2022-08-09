import { useMemo } from 'react'
import { roundFourDecimals } from 'utils/math'
import { Paragraph } from '@zoralabs/zord'
import { useAuth } from '@market/hooks'

export function WalletBalance({ address }: { address: string }) {
  const { balance: data } = useAuth()

  const balance = useMemo(() => {
    if (data) return roundFourDecimals(parseFloat(data?.formatted))
  }, [data])

  return (
    <Paragraph color="tertiary">
      Your balance: {balance} {data?.symbol}
    </Paragraph>
  )
}
