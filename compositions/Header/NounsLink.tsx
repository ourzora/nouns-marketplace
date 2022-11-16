import { NounsGlasses } from 'components'
import Link from 'next/link'

import { Flex } from '@zoralabs/zord'

import { nounsGlassesLink } from './Header.css'

export function NounsLink() {
  return (
    <Link href="/" passHref>
      <Flex as="a" className={[nounsGlassesLink]}>
        <NounsGlasses w="100%" alignSelf="flex-start" />
      </Flex>
    </Link>
  )
}
