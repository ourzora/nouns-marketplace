import { useMemo } from 'react'
import { Label, Icon, Flex, FlexProps } from '@zoralabs/zord'
import { useEnsName } from 'wagmi'
import { useShortAddress } from '@shared'

interface AddressWithLinkProps extends FlexProps {
  address: string
  useEns?: boolean
}

export function AddressWithLink({
  address,
  useEns = true,
  ...props
}: AddressWithLinkProps) {
  const { data: ensName } = useEnsName({
    address: address,
  })

  const shortAddress = useShortAddress(address)

  const buildTokenInfoLink = useMemo(
    () => `https://etherscan.io/address/${address}`,
    [address]
  )

  return (
    <Flex
      align="center"
      gap="x2"
      as="a"
      href={buildTokenInfoLink}
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      <Label className="zora-market-addressWithLink">
        {ensName && useEns ? ensName : shortAddress}
      </Label>
      <Icon id="ArrowRightAngle" />
    </Flex>
  )
}
