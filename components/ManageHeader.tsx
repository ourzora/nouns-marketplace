import { useEnsName } from 'wagmi'

import { pageHeadline } from 'styles/styles.css'

import { AddressWithLink } from '@market'
import { useShortAddress } from '@shared'
import { Stack, Text } from '@zoralabs/zord'

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
      <Text textAlign="center" className={[pageHeadline]} as="h1">
        {ensName ? ensName : shortAddress}
      </Text>
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
