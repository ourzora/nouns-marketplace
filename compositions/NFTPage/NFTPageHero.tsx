import { Box, BoxProps } from '@zoralabs/zord'
import { cardImageWrapper } from '@media/NftMedia.css'
import { nftPageHero } from './NFTPage.css'
import { useSourceImage } from '@media/hooks/useSrcImage'
import { useNFTProvider } from '@shared/providers/NFTProvider'
import { ImageWithNounFallback } from 'components'

export interface NFTPageHeroProps extends BoxProps {}

export function NFTPageHero({ className, ...props }: NFTPageHeroProps) {
  const { nft, tokenId, contractAddress } = useNFTProvider()
  const { srcImg } = useSourceImage(nft?.media)

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
