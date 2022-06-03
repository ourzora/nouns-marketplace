import { useMemo } from 'react'
import { gradientForAddress } from './utils/gradient'
import { Box } from '@zoralabs/zord'

const defaultGradient = ['#f2f2f2', '#bfbfbf', '#a6a6a6', '#474747', '#262626']

export const Zorb = ({ address, size = 35 }) => {
  const background = useMemo(() => {
    if (address) {
      const gradient = gradientForAddress(address)
      return `radial-gradient(75.29% 75.29% at 64.96% 24.36%, ${gradient[0]} 15.62%, ${gradient[1]} 39.58%, ${gradient[2]} 72.92%, ${gradient[3]} 90.62%, ${gradient[4]} 100%)`
    } else {
      return `radial-gradient(75.29% 75.29% at 64.96% 24.36%, ${defaultGradient[0]} 15.62%, ${defaultGradient[1]} 39.58%, ${defaultGradient[2]} 72.92%, ${defaultGradient[3]} 90.62%, ${defaultGradient[4]} 100%)`
    }
  }, [address])

  return (
    <Box
      style={{
        height: `${size}px`,
        width: `${size}px`,
        background: background,
        overflow: 'hidden',
        borderRadius: 300,
        display: 'block',
      }}
    />
  )
}
