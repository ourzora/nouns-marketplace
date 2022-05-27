import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Box, Flex, Heading } from '@zoralabs/zord/elements'
import Link from 'next/link'
import { SITE_TITLE } from 'utils/env-vars'

export function HeaderNav() {
  return (
    <Flex align="center" justify="space-between" w="100%" px="x6">
      <Flex align="center" gap="x8">
        <Link passHref href="/">
          <Heading as="a" size="md">
            {SITE_TITLE}
          </Heading>
        </Link>
      </Flex>
      <Box>
        <ConnectButton showBalance={false} />
      </Box>
    </Flex>
  )
}
