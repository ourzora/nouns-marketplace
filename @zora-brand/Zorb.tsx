import { useMemo } from 'react'

import { Box } from '@zoralabs/zord'

import { gradientForAddress } from './utils/gradient'

export interface ZorbProps {
  address?: string
  size?: number | '100%'
  greyscale?: boolean
  pixelate?: boolean
  vertical?: boolean
  className?: string
}

export const primaryGradient = `radial-gradient(75.29% 75.29% at 64.96% 24.36%, #dcc8d0 15.62%, #78c8cf 30.21%, #4d959e 42.71%, #305eb9 55.73%, #311f12 79.69%, #684232 90.62%, #2d1c13 100%)`
export const greyscaleGradient = `radial-gradient(75.29% 75.29% at 64.96% 24.36%, #FFFFFF 0.52%, #FAFBFF 31.25%, #F1F3FA 51.56%, #E2E6F2 65.62%, #BFC2D8 82.29%, #EEEFF0 100%)`

export const Zorb = ({ address, greyscale = false, className, size = 35 }: ZorbProps) => {
  const background = useMemo(() => {
    if (address) {
      const gradient = gradientForAddress(address)
      return `radial-gradient(75.29% 75.29% at 64.96% 24.36%, ${gradient[0]} 15.62%, ${gradient[1]} 39.58%, ${gradient[2]} 72.92%, ${gradient[3]} 90.62%, ${gradient[4]} 100%)`
    } else {
      return !greyscale ? primaryGradient : 'transparent'
    }
  }, [address, greyscale])

  const returnSize = size === '100%' ? '100%' : `${size}px`

  return (
    <Box
      borderRadius="round"
      overflow="hidden"
      inset="x0"
      style={{
        height: returnSize,
        width: returnSize,
        background: background,
      }}
    />
  )
}
