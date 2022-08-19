import Link from 'next/link'
import { Box, Flex } from '@zoralabs/zord'
import { NOUNS_GLASSES } from 'styles/style-constants'
import { APP_TITLE } from 'utils/env-vars'
import { nounsGlasses, nounsGlassesLink } from './Header.css'
import { clickAnimation } from 'styles/styles.css'

export function NounsLink() {
  return (
    <Link href="/" passHref>
      <Flex as="a" className={[clickAnimation, nounsGlassesLink]}>
        <Box as="img" className={[nounsGlasses]} src={NOUNS_GLASSES} alt={APP_TITLE} />
      </Flex>
    </Link>
  )
}
