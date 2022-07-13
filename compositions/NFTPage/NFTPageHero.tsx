import { Box, BoxProps } from '@zoralabs/zord'
import { cardImageWrapper } from '@media/NftMedia.css'
import { nftPageHero } from './NFTPage.css'
import { useSourceImage } from '@media/hooks/useSrcImage'
import { useNFTProvider } from '@shared/providers/NFTProvider'

export interface NFTPageHeroProps extends BoxProps {}

export function NFTPageHero({ ...props }: NFTPageHeroProps) {
  const { initialData: nft } = useNFTProvider()
  const { srcImg } = useSourceImage(nft?.media)

  return (
    <Box
      w="100%"
      className={[cardImageWrapper, nftPageHero]}
      backgroundColor="tertiary"
      overflow="hidden"
      {...props}
    >
      <Box
        as="img"
        src={srcImg}
        w="100%"
        h="100%"
        position="absolute"
        inset="x0"
        objectFit="cover"
      />
    </Box>
  )
}
