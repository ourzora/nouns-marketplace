import Link from 'next/link'
import { Flex } from '@zoralabs/zord'
import { clickAnimation } from 'styles/styles.css'
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
