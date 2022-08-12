import { Flex, Stack, Label, Separator, Icon } from '@zoralabs/zord'
import Link from 'next/link'
import { PoweredByZora } from '@zora-brand'
import { footerWrapper } from './Footer.css'
import { useWindowWidth } from '@shared'

export function FooterComposition() {
  const { isLarge } = useWindowWidth()

  return (
    <Flex as="footer" className={footerWrapper}>
      <Stack align="center" gap="x3">
        <PoweredByZora size={isLarge ? 48 : 32} />
        <Separator />
        <Flex align="center" gap="x2">
          <Link href="/docs" passHref>
            <Label as="a" size="lg">
              Docs
            </Label>
          </Link>
          |
          <Flex align="center" gap="x2">
            <Label
              as="a"
              size="lg"
              href="https://github.com/ourzora/nouns-marketplace"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </Label>
            <Icon id="ArrowRightAngle" size="sm" />
          </Flex>
        </Flex>
      </Stack>
    </Flex>
  )
}
