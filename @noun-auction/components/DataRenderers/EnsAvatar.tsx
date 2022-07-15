import { Flex, Box } from '@zoralabs/zord'
import { useEnsAvatar } from 'wagmi'
import { Zorb } from '@zora-brand'

export function EnsAvatar({ address }: { address: string }) {
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
    >
      {ensAvatar ? <Box as="img" src={ensAvatar} /> : <Zorb address={address} />}
    </Flex>
  )
}
