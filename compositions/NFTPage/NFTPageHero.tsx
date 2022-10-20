import { ImageWithNounFallback } from 'components'

import { cardImageWrapper } from '@media/NftMedia.css'
import { useOptionalImageURIDecode } from '@media/hooks/useImageURIDecode'
import { useNFTProvider } from '@shared/providers/NFTProvider'
import { Box, BoxProps } from '@zoralabs/zord'

import { nftPageHero } from './NFTPage.css'

export interface NFTPageHeroProps extends BoxProps {}

export function NFTPageHero({ className, ...props }: NFTPageHeroProps) {
  const { nft, tokenId, contractAddress } = useNFTProvider()
  const srcImg = useOptionalImageURIDecode(nft!) // Handle non-base64 SVGs by decoding URI. This should be replaced when handled properly API-side

  return (
    <Box
      w="100%"
      className={[cardImageWrapper, nftPageHero, className]}
      backgroundColor="background2"
      overflow="hidden"
      {...props}
    >
      {contractAddress && tokenId && (
        <ImageWithNounFallback
          tokenContract={contractAddress}
          tokenId={tokenId}
          srcImg={srcImg}
        />
      )}
    </Box>
  )
}
