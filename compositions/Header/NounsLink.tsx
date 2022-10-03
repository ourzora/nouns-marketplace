import Link from 'next/link'
import { Flex } from '@zoralabs/zord'
import { nounsGlassesLink } from './Header.css'
import { clickAnimation } from 'styles/styles.css'
import { NounsGlasses } from 'components'

export function NounsLink() {
  return (
    <Link href="/" passHref>
      <Flex as="a" className={[clickAnimation, nounsGlassesLink]}>
        <NounsGlasses w="100%" />
      </Flex>
    </Link>
  )
}
