import { Label, Grid, Box, Flex } from '@zoralabs/zord'
import { PoweredByZora } from '@zora-brand'
import { footerCol, footerWrap, footerWrapper } from './Footer.css'
import { useWindowWidth } from '@shared'

export function FooterComposition() {
  const { isLarge } = useWindowWidth()

  return (
    <Flex className={footerWrap}>
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
    </Flex>
  )
}
