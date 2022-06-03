import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Box, Flex, Heading } from '@zoralabs/zord'
import Link from 'next/link'
import { NOUNS_GLASSES } from 'styles/style-constants'
import { SITE_TITLE } from 'utils/env-vars'
import { nounsGlasses } from './Header.css'
import { CollectionMenu } from './CollectionMenu'
// import { CollectionLinks } from './CollectionLinks'

export function HeaderNav() {
  return (
    <Flex align="center" justify="space-between" w="100%" px="x6">
      <Flex align="center" gap="x8">
        <Link passHref href="/">
          <Box as="img" className={nounsGlasses} src={NOUNS_GLASSES} alt={SITE_TITLE} />
        </Link>
        <CollectionMenu />
      </Flex>
      <Box>
        <ConnectButton showBalance={false} />
      </Box>
    </Flex>
  )
}
