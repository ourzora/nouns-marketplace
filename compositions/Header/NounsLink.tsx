import { NounsGlasses } from 'components'
import Link from 'next/link'
import { clickAnimation } from 'styles/styles.css'

import { Flex } from '@zoralabs/zord'

import { nounsGlassesLink } from './Header.css'

export function NounsLink() {
  return (
    <Link href="/" passHref>
      <Flex as="a" className={[clickAnimation, nounsGlassesLink]}>
        <NounsGlasses w="100%" />
      </Flex>
    </Link>
  )
}
