import { ImageWithNounFallback } from 'components'

import { useToken } from 'hooks/useToken'

import { TypeSafeDao } from 'validators/dao'
import { TypeSafeToken } from 'validators/token'

import { cardImageWrapper } from '@media/NftMedia.css'
import { useOptionalImageURIDecode } from '@media/hooks/useImageURIDecode'
import { Box, BoxProps } from '@zoralabs/zord'

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
  const srcImg = useOptionalImageURIDecode(token) // Handle non-base64 SVGs by decoding URI. This should be replaced when handled properly API-side

  return (
    <Box
      w="100%"
      className={[cardImageWrapper, nftPageHero, props.className]}
      backgroundColor="background2"
      overflow="hidden"
      {...props}
    >
      <ImageWithNounFallback
        tokenContract={token.collectionAddress}
        tokenId={token.tokenId}
        srcImg={srcImg}
      />
    </Box>
  )
}
