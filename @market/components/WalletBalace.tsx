import { useMemo } from 'react'
import { roundFourDecimals } from 'utils/math'
import { Paragraph } from '@zoralabs/zord'
import { useBalance } from 'wagmi'

export function WalletBalance({ address }: { address: string }) {
  const { data } = useBalance({
    addressOrName: address,
  })

  const balance = useMemo(() => {
    if (data) return roundFourDecimals(parseFloat(data?.formatted))
  }, [data])

  return (
    <Paragraph>
      Your balance: {balance} {data?.symbol}
    </Paragraph>
  )
}
