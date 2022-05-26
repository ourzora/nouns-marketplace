import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Box, Flex, Paragraph } from '@zoralabs/zord/elements'
import Link from 'next/link'
import { SITE_TITLE } from 'utils/env-vars'

export function HeaderNav() {
  return (
    <Flex
      align="center"
      justify="space-between"
      w="100%"
    >
      <Flex align="center" gap="x8">
        <Link passHref href="/">
          <Paragraph as="a" size="md">
            {SITE_TITLE}
          </Paragraph>
        </Link>
      </Flex>
      <Box>
        <ConnectButton showBalance={false} />
      </Box>
    </Flex>
  )
}
