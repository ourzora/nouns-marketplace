import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Box, Flex, Label, Icon } from '@zoralabs/zord'
import Link from 'next/link'
import { NOUNS_GLASSES } from 'styles/style-constants'
import { APP_TITLE } from 'utils/env-vars'
import { nounsGlasses } from './Header.css'
import { CollectionMenu } from './CollectionMenu'
import { ManageLink } from './ManageLink'
import { BetaTag } from './BetaTag'

export function HeaderNav() {
  return (
    <Flex align="center" justify="space-between" w="100%" px="x6">
      <Flex align="center" gap="x8">
        <Link passHref href="/">
          <Box as="img" className={nounsGlasses} src={NOUNS_GLASSES} alt={APP_TITLE} />
        </Link>
        <BetaTag />
        <CollectionMenu />
      </Flex>
      <Flex align="center" gap="x6">
        <Flex
          as="a"
          align="center"
          gap="x2"
          href="https://nouns.wtf/"
          target="_blank"
          rel="noreferrer"
        >
          <Label size="lg">Nouns Center</Label>
          <Icon id="ArrowRightAngle" size="sm" />
        </Flex>
        <ManageLink />
        <Box>
          <ConnectButton showBalance={false} />
        </Box>
      </Flex>
    </Flex>
  )
}
