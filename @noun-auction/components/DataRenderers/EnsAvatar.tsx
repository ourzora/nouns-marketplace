import { Flex, FlexProps, Box } from '@zoralabs/zord'
import { useEnsAvatar } from 'wagmi'
import { Zorb } from '@zora-brand'
import { pixelate } from '@noun-auction/styles/NounishStyles.css'
import { ImageElement, fullSizeImage } from '@shared'

export interface EnsAvatarProps extends FlexProps {
  address: string
}

export function EnsAvatar({ address, ...props }: EnsAvatarProps) {
  const { data: ensAvatar } = useEnsAvatar({
    addressOrName: address,
  })

  return (
    <Flex
      w="x7"
      h="x7"
      borderRadius="round"
      overflow="hidden"
      position="relative"
      backgroundColor="tertiary"
      {...props}
    >
      {ensAvatar ? (
        <ImageElement src={ensAvatar} />
      ) : (
        <Box className={[fullSizeImage, pixelate]}>
          <Zorb size="100%" address={address} />
        </Box>
      )}
    </Flex>
  )
}
