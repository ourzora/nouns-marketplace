import { NounsGlasses } from 'components'
import Link from 'next/link'

import { Flex } from '@zord'

import { nounsGlassesLink } from './Header.css'

export function NounsLink() {
  return (
    <Link href="/" passHref>
      <Flex as="a" className={[nounsGlassesLink]}>
        <NounsGlasses alignSelf="flex-start" />
      </Flex>
    </Link>
  )
}
