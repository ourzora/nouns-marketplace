import { Flex, FlexProps, Box } from '@zoralabs/zord'
import { useEnsAvatar } from 'wagmi'
import { Zorb } from '@zora-brand'

export interface EnsAvatarProps extends FlexProps {
  address: string
}

export function EnsAvatar({ address, ...props }: EnsAvatarProps) {
  const {
    data: ensAvatar,
    isError,
    isLoading,
  } = useEnsAvatar({
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
        <Box as="img" src={ensAvatar} />
      ) : (
        <Zorb size="100%" address={address} pixelate />
      )}
    </Flex>
  )
}
