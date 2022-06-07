import { Stack, Display, Paragraph } from '@zoralabs/zord'
import { useEnsName } from 'wagmi'
import { useShortAddress } from 'hooks/useShortAddress'
import { AddressWithLink } from '@market'

export function ManageHeader({ ownerAddress }: { ownerAddress: string }) {
  const { data: ensName } = useEnsName({
    address: ownerAddress,
  })

  const shortAddress = useShortAddress(ownerAddress)

  return (
    <Stack align="center" mb="x12" gap="x2">
      <Display as="h1">{ensName ? ensName : shortAddress}</Display>
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
