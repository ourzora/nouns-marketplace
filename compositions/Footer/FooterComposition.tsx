import { Flex, Stack, Label, Icon, Grid, Box } from '@zoralabs/zord'
import Link from 'next/link'
import { PoweredByZora } from '@zora-brand'
import { footerCol, footerWrapper } from './Footer.css'
import { useWindowWidth } from '@shared'

export function FooterComposition() {
  const { isLarge } = useWindowWidth()

  return (
    <Grid as="footer" className={footerWrapper}>
      <Box gap="x2" className={[footerCol({ variant: 'left' })]}>
        <Label px="x4" as="a" size="lg" href="/docs" passhref>
          Docs
        </Label>
        <Label px="x4" as="a" size="lg" href="#">
          About
        </Label>
      </Box>

      <Box className={[footerCol()]}>
        <PoweredByZora size={isLarge ? 48 : 32} />
      </Box>

      <Box className={[footerCol({ variant: 'right' })]}>
        <Label
          px="x4"
          as="a"
          href="https://twitter.com/nounsdao"
          target="_blank"
          size="lg"
          rel="noreferrer"
        >
          Twitter
        </Label>

        <Label
          px="x4"
          size="lg"
          rel="noreferrer"
          as="a"
          href="https://github.com/ourzora/nouns-marketplace"
          target="_blank"
        >
          GitHub
        </Label>
      </Box>
    </Grid>
  )
}
