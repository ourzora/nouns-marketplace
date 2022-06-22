import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Box, Flex, Label, Icon } from '@zoralabs/zord'
import Link from 'next/link'
import { NOUNS_GLASSES } from 'styles/style-constants'
import { APP_TITLE } from 'utils/env-vars'
import { nounsGlasses } from './Header.css'
import { CollectionMenu } from './CollectionMenu'
import { ManageLink } from './ManageLink'
import { BetaTag } from './BetaTag'
import { noTextWrap } from 'styles/styles.css'

export function HeaderNav() {
  return (
    <Flex
      w="100%"
      align={{
        '@initial': 'start',
        '@1024': 'center',
      }}
      direction={{
        '@initial': 'column-reverse',
        '@1024': 'row',
      }}
      justify={{
        '@initial': 'flex-end',
        '@1024': 'space-between',
      }}
      gap="x4"
    >
      <Flex
        align="center"
        justify={{
          '@initial': 'space-between',
          '@1024': 'flex-start',
        }}
        w={{
          '@initial': '100%',
          '@1024': 'auto',
        }}
        gap={{
          '@initial': 'x2',
          '@1024': 'x8',
        }}
      >
        <Link passHref href="/">
          <Box
            as="img"
            className={nounsGlasses}
            src={NOUNS_GLASSES}
            alt={APP_TITLE}
            display={{
              '@initial': 'none',
              '@1024': 'block',
            }}
          />
        </Link>
        <BetaTag />
        <CollectionMenu />
        <Flex
          as="a"
          align="center"
          href="https://nouns.wtf/"
          target="_blank"
          rel="noreferrer"
          display={{
            '@initial': 'block',
            '@1024': 'none',
          }}
        >
          <Flex h="100%" align="center" gap="x2">
            <Label size="lg" className={noTextWrap}>
              Nouns Center
            </Label>
            <Icon id="ArrowRightAngle" size="sm" />
          </Flex>
        </Flex>
      </Flex>
      <Flex
        align="center"
        justify={{
          '@initial': 'space-between',
          '@1024': 'flex-end',
        }}
        w="100%"
        gap={{
          '@initial': 'x4',
          '@1024': 'x6',
        }}
      >
        <Link passHref href="/">
          <Box
            as="a"
            display={{
              '@initial': 'block',
              '@1024': 'none',
            }}
          >
            <Box as="img" className={nounsGlasses} src={NOUNS_GLASSES} alt={APP_TITLE} />
          </Box>
        </Link>
        <Flex gap="x4" align="center">
          <Flex
            as="a"
            align="center"
            href="https://nouns.wtf/"
            target="_blank"
            rel="noreferrer"
            display={{
              '@initial': 'none',
              '@1024': 'block',
            }}
          >
            <Flex h="100%" align="center" gap="x2">
              <Label size="lg">Nouns Center</Label>
              <Icon id="ArrowRightAngle" size="sm" />
            </Flex>
          </Flex>
          <ManageLink />
          <Box>
            <ConnectButton showBalance={false} />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}
