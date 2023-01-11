import { useMemo } from 'react'

import { Flex, FlexProps, Icon, Label } from '@zord'

interface AddressWithLinkProps extends FlexProps {
  address: string
  useEns?: boolean
}

export function DAOBuilderLink({
  address,
  useEns = true,
  ...props
}: AddressWithLinkProps) {
  const builderLink = useMemo(() => `https://nouns.build/dao/${address}`, [address])

  return (
    <Flex
      align="center"
      gap="x2"
      as="a"
      href={builderLink}
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      <Label className="zora-market-addressWithLink">View on Nouns Builder</Label>
      <Icon id="ArrowRightAngle" />
    </Flex>
  )
}
