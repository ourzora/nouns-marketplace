import { ImageWithNounFallback } from 'components'

import { useToken } from 'hooks/useToken'

import { TypeSafeToken } from 'validators/token'

import { cardImageWrapper } from '@media/mediaStyles.css'
import { Box, BoxProps } from '@zord'

import { nftPageHero } from './NFTPage.css'

export interface NFTPageHeroProps extends BoxProps {
  collectionAddress: string
  tokenId: string
}

export function NFTPageHero({
  className,
  collectionAddress,
  tokenId,
  ...props
}: NFTPageHeroProps) {
  const { token } = useToken({ tokenId, collectionAddress })

  if (!token) return null

  return <NFTPageHeroComponent token={token} {...props} />
}

export function NFTPageHeroComponent({
  token,
  ...props
}: Omit<NFTPageHeroProps, 'collectionAddress' | 'tokenId'> & { token: TypeSafeToken }) {
  return (
    <Box
      w="100%"
      className={[cardImageWrapper, nftPageHero, props.className]}
      backgroundColor="background2"
      overflow="hidden"
      {...props}
    >
      <ImageWithNounFallback token={token} />
    </Box>
  )
}
