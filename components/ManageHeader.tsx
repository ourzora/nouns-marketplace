import { Stack, Display, Text } from '@zoralabs/zord'
import { useEnsName } from 'wagmi'
import { useShortAddress } from '@shared'
import { AddressWithLink } from '@market'
import { textCenter, pageHeadline } from 'styles/styles.css'

export function ManageHeader({ ownerAddress }: { ownerAddress: string }) {
  const { data: ensName } = useEnsName({
    address: ownerAddress,
  })

  const shortAddress = useShortAddress(ownerAddress)

  return (
    <Stack
      align="center"
      mb={{
        '@initial': 'x0',
        '@1024': 'x2',
      }}
      mt={{
        '@initial': 'x6',
        '@1024': 'x0',
      }}
      gap="x2"
    >
      <Text className={[textCenter, pageHeadline]} as="h1">
        {ensName ? ensName : shortAddress}
      </Text>
      <AddressWithLink
        address={ownerAddress}
        useEns={false}
        backgroundColor="secondary"
        px="x4"
        py="x2"
        borderRadius="curved"
      />
    </Stack>
  )
}
