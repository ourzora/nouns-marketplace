import { Flex, Stack, Label, Icon, Grid, Box } from '@zoralabs/zord'
import Link from 'next/link'
import { PoweredByZora } from '@zora-brand'
import { footerCol, footerWrapper } from './Footer.css'
import { useWindowWidth } from '@shared'

export function FooterComposition() {
  const { isLarge } = useWindowWidth()

  return (
    <Grid as="footer" className={footerWrapper}>
      <Box className={[footerCol({ variant: 'left' })]} as="a" href="/docs" passHref>
        <Label as="a" size="lg">
          Docs
        </Label>
      </Box>

      <Box className={[footerCol()]}>
        <PoweredByZora size={isLarge ? 48 : 32} />
      </Box>

      <Box className={[footerCol({ variant: 'right' })]}>
        <Flex>
          <Flex
            align="center"
            p="x4"
            gap="x2"
            as="a"
            href="https://twitter.com/nounsdao"
            target="_blank"
          >
            <Label size="lg" rel="noreferrer">
              Twitter
            </Label>
            <Icon id="ArrowRightAngle" size="sm" />
          </Flex>

          <Flex
            align="center"
            gap="x2"
            as="a"
            href="https://github.com/ourzora/nouns-marketplace"
            target="_blank"
          >
            <Label size="lg" rel="noreferrer">
              GitHub
            </Label>
            <Icon id="ArrowRightAngle" size="sm" />
          </Flex>
        </Flex>
      </Box>
    </Grid>
  )
}
