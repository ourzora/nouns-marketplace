import Link from 'next/link'
import { clickAnimation } from 'styles/styles.css'

import { Flex } from '@zoralabs/zord'

import { nounsCenterLink } from './Header.css'

export function NounsCenterLink() {
  return (
    <Link href="https://nouns.center/" passHref>
      <Flex as="a" className={[nounsCenterLink, clickAnimation]}>
        Nouns Center
      </Flex>
    </Link>
  )
}
