import { useEnsName } from 'wagmi'

import { AddressWithLink } from '@market'
import { useShortAddress } from '@shared'
import { Heading, Stack } from '@zord'

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
      <Heading as="h1" size="xl" textAlign="center">
        {ensName ? ensName : shortAddress}
      </Heading>
      <AddressWithLink
        address={ownerAddress}
        useEns={false}
        backgroundColor="background2"
        px="x4"
        py="x2"
        borderRadius="curved"
      />
    </Stack>
  )
}
